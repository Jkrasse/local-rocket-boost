import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  niche_id: z.string().uuid(),
  city_id: z.string().uuid(),
  plan: z.enum(["premium", "growth"]),
  environment: z.enum(["sandbox", "live"]),
  return_url: z.string().url(),
});

const PRICE_BY_PLAN = {
  premium: "premium_monthly",
  growth: "growth_monthly",
} as const;

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email: string; userId: string; companyName?: string },
): Promise<string> {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error("Invalid userId");

  const found = await stripe.customers.search({
    query: `metadata['userId']:'${options.userId}'`,
    limit: 1,
  });
  if (found.data.length) return found.data[0].id;

  const existing = await stripe.customers.list({ email: options.email, limit: 1 });
  if (existing.data.length) {
    const c = existing.data[0];
    if (c.metadata?.userId !== options.userId) {
      await stripe.customers.update(c.id, {
        metadata: { ...c.metadata, userId: options.userId },
      });
    }
    return c.id;
  }

  const created = await stripe.customers.create({
    email: options.email,
    ...(options.companyName && { name: options.companyName }),
    metadata: { userId: options.userId },
  });
  return created.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token);
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = parsed.data;
    const env: StripeEnv = body.environment;
    const priceLookupKey = PRICE_BY_PLAN[body.plan];

    // Slot availability check (server-side)
    const { data: available, error: slotErr } = await supabaseAdmin.rpc("is_slot_available", {
      _niche_id: body.niche_id,
      _city_id: body.city_id,
      _env: env,
    });
    if (slotErr) throw slotErr;
    if (!available) {
      return new Response(
        JSON.stringify({ error: "Platsen är tyvärr inte längre tillgänglig." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get/create customer row
    const { data: customerRow } = await supabaseAdmin
      .from("customers")
      .select("id, company_name, email")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!customerRow) {
      return new Response(JSON.stringify({ error: "Customer not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(env);

    const prices = await stripe.prices.list({ lookup_keys: [priceLookupKey], limit: 1 });
    if (!prices.data.length) throw new Error(`Price ${priceLookupKey} not found`);
    const stripePrice = prices.data[0];

    const customerId = await resolveOrCreateCustomer(stripe, {
      email: user.email ?? customerRow.email,
      userId: user.id,
      companyName: customerRow.company_name,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: body.return_url,
      automatic_tax: { enabled: true },
      customer_update: { address: "auto", name: "auto" },
      metadata: {
        userId: user.id,
        customer_row_id: customerRow.id,
        niche_id: body.niche_id,
        city_id: body.city_id,
        plan: body.plan,
        environment: env,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          customer_row_id: customerRow.id,
          niche_id: body.niche_id,
          city_id: body.city_id,
          plan: body.plan,
          environment: env,
        },
      },
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error", e);
    const message = e instanceof Error ? e.message : "Server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { createClient } from "npm:@supabase/supabase-js@2";
import { verifyWebhook, type StripeEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function priceLookupToPlan(item: any): string | null {
  const lk = item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id;
  if (!lk) return null;
  if (lk.startsWith("premium")) return "premium";
  if (lk.startsWith("growth")) return "growth";
  return null;
}

async function upsertSubscription(subscription: any, env: StripeEnv) {
  const md = subscription.metadata || {};
  const customerRowId = md.customer_row_id;
  const nicheId = md.niche_id;
  const cityId = md.city_id;
  const item = subscription.items?.data?.[0];
  const plan = md.plan || priceLookupToPlan(item) || "premium";
  const priceId = item?.price?.id;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  if (!customerRowId || !nicheId || !cityId) {
    console.error("Missing metadata on subscription", subscription.id, md);
    return;
  }

  // Update stripe_customer_id on customer record
  await supabase
    .from("customers")
    .update({ stripe_customer_id: subscription.customer })
    .eq("id", customerRowId);

  await supabase.from("subscriptions").upsert(
    {
      stripe_subscription_id: subscription.id,
      customer_id: customerRowId,
      niche_id: nicheId,
      city_id: cityId,
      plan,
      status: subscription.status,
      stripe_price_id: priceId,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  // Drop any slot reservation now that subscription exists
  await supabase
    .from("slot_reservations")
    .delete()
    .eq("niche_id", nicheId)
    .eq("city_id", cityId);
}

async function markCanceled(subscription: any, env: StripeEnv) {
  await supabase
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);
}

async function recordPayment(invoice: any, env: StripeEnv, status: string) {
  if (!invoice?.subscription) return;
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", invoice.subscription)
    .eq("environment", env)
    .maybeSingle();
  if (!sub) return;

  await supabase.from("payments").insert({
    subscription_id: sub.id,
    stripe_invoice_id: invoice.id,
    amount: invoice.amount_paid ?? invoice.amount_due ?? 0,
    currency: invoice.currency ?? "sek",
    status,
    paid_at: status === "paid" ? new Date().toISOString() : null,
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await upsertSubscription(event.data.object, env);
        break;
      case "customer.subscription.deleted":
        await markCanceled(event.data.object, env);
        break;
      case "invoice.paid":
      case "invoice.payment_succeeded":
        await recordPayment(event.data.object, env, "paid");
        break;
      case "invoice.payment_failed":
        await recordPayment(event.data.object, env, "failed");
        break;
      default:
        console.log("Unhandled event:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});

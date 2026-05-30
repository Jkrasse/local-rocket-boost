import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Rocket, Plus, ExternalLink, Calendar, MapPin, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type SubRow = {
  id: string;
  status: string;
  plan: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string | null;
  niche: { name: string; slug: string } | null;
  city: { name: string; slug: string } | null;
};

type PaymentRow = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  created_at: string;
};

const STATUS_LABEL: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktiv", variant: "default" },
  trialing: { label: "Provperiod", variant: "secondary" },
  past_due: { label: "Förfallen betalning", variant: "destructive" },
  canceled: { label: "Uppsagd", variant: "outline" },
  incomplete: { label: "Ofullständig", variant: "outline" },
  unpaid: { label: "Obetald", variant: "destructive" },
  paused: { label: "Pausad", variant: "secondary" },
};

const PLAN_LABEL: Record<string, string> = {
  growth: "Growth",
  premium: "Premium",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("sv-SE", { year: "numeric", month: "long", day: "numeric" });
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("sv-SE", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

const Dashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

  const env = getStripeEnvironment();

  const { data: customer } = useQuery({
    queryKey: ["customer", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("id, company_name, contact_name, email, stripe_customer_id")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: subs, isLoading: subsLoading } = useQuery({
    queryKey: ["subscriptions", customer?.id, env],
    enabled: !!customer?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select(
          "id, status, plan, current_period_end, cancel_at_period_end, stripe_subscription_id, niche:niches(name,slug), city:cities(name,slug)",
        )
        .eq("customer_id", customer!.id)
        .eq("environment", env)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as SubRow[];
    },
  });

  const subIds = (subs ?? []).map((s) => s.id);

  const { data: payments } = useQuery({
    queryKey: ["payments", subIds],
    enabled: subIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("id, amount, currency, status, paid_at, created_at")
        .in("subscription_id", subIds)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return (data ?? []) as PaymentRow[];
    },
  });

  async function openPortal() {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: { environment: env, return_url: window.location.href },
      });
      if (error) throw error;
      if (!data?.url) throw new Error("Ingen portallänk returnerades");
      window.open(data.url, "_blank");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kunde inte öppna kundportalen");
    } finally {
      setPortalLoading(false);
    }
  }

  const hasActive = (subs ?? []).some((s) => ["active", "trialing", "past_due"].includes(s.status));

  return (
    <div className="min-h-screen bg-warm/40 flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto max-w-container flex items-center justify-between h-16 px-4">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-[22px]">
            <Rocket className="h-5 w-5 text-primary" />
            <span>
              Local<span className="font-semibold">Rocket</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-soft hidden sm:inline">{user?.email}</span>
            {isAdmin && (
              <Link to="/admin" className="text-sm text-primary hover:underline">
                Admin
              </Link>
            )}
            <Button variant="outline" size="sm" onClick={signOut}>
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-container px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-4xl tracking-tightest mb-1">Min portal</h1>
            <p className="text-ink-soft">
              {customer?.company_name
                ? `Välkommen tillbaka, ${customer.company_name}.`
                : "Välkommen tillbaka."}
            </p>
          </div>
          <div className="flex gap-2">
            {customer?.stripe_customer_id && (
              <Button variant="outline" onClick={openPortal} disabled={portalLoading}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {portalLoading ? "Öppnar…" : "Hantera prenumeration"}
              </Button>
            )}
            <Button asChild>
              <Link to="/onboarding">
                <Plus className="h-4 w-4 mr-2" />
                Ny prenumeration
              </Link>
            </Button>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="font-serif text-2xl mb-4">Prenumerationer</h2>
          {subsLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          ) : !subs || subs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-ink-soft mb-4">Du har inga prenumerationer ännu.</p>
                <Button asChild>
                  <Link to="/onboarding">
                    <Plus className="h-4 w-4 mr-2" />
                    Kom igång
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {subs.map((s) => {
                const meta = STATUS_LABEL[s.status] ?? { label: s.status, variant: "outline" as const };
                return (
                  <Card key={s.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="font-serif text-xl">
                          {PLAN_LABEL[s.plan] ?? s.plan}
                        </CardTitle>
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-ink-soft">
                        <Briefcase className="h-4 w-4" />
                        {s.niche?.name ?? "—"}
                      </div>
                      <div className="flex items-center gap-2 text-ink-soft">
                        <MapPin className="h-4 w-4" />
                        {s.city?.name ?? "—"}
                      </div>
                      <div className="flex items-center gap-2 text-ink-soft">
                        <Calendar className="h-4 w-4" />
                        {s.cancel_at_period_end
                          ? `Avslutas ${formatDate(s.current_period_end)}`
                          : `Förnyas ${formatDate(s.current_period_end)}`}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl mb-4">Senaste betalningar</h2>
          <Card>
            <CardContent className="p-0">
              {!payments || payments.length === 0 ? (
                <div className="py-10 text-center text-ink-soft text-sm">
                  Inga betalningar registrerade ännu.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-3 text-sm">
                      <div>
                        <div className="font-medium">{formatAmount(p.amount, p.currency)}</div>
                        <div className="text-ink-soft text-xs">
                          {formatDate(p.paid_at ?? p.created_at)}
                        </div>
                      </div>
                      <Badge variant={p.status === "paid" ? "default" : "outline"}>
                        {p.status === "paid" ? "Betald" : p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {!hasActive && subs && subs.length > 0 && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-6">
              <p className="text-sm">
                Du har inga aktiva prenumerationer just nu.{" "}
                <Link to="/onboarding" className="text-primary underline">
                  Starta en ny här
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

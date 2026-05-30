import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Rocket, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { isStripeConfigured } from "@/lib/stripe";

type Niche = { id: string; name: string; slug: string; icon: string | null };
type City = { id: string; name: string; slug: string };
type Plan = "premium" | "growth";

const STEPS = ["Bransch", "Stad", "Plan", "Betalning"] as const;

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  features: string[];
}[] = [
  {
    id: "premium",
    name: "Premium",
    price: "5 000 kr/mån",
    features: [
      "Exklusiv Rekommenderad partner-plats",
      "2 000 kr/mån i Google Ads-spend",
      "2 000 kr/mån i Meta Ads-spend",
      "Månadsrapport i dashboard",
      "Leads direkt till dig",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "8 000 kr/mån",
    features: [
      "Exklusiv Rekommenderad partner-plats",
      "4 000 kr/mån i Google Ads-spend",
      "4 000 kr/mån i Meta Ads-spend",
      "Månadsrapport i dashboard",
      "Leads direkt till dig",
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);

  const [niches, setNiches] = useState<Niche[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [cityAvailability, setCityAvailability] = useState<Record<string, boolean>>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const [nicheId, setNicheId] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan>("premium");

  useEffect(() => {
    Promise.all([
      supabase.from("niches").select("id,name,slug,icon").eq("is_active", true).order("name"),
      supabase.from("cities").select("id,name,slug").order("name"),
    ]).then(([n, c]) => {
      if (n.data) setNiches(n.data);
      if (c.data) setCities(c.data);
    });
  }, []);

  // When entering step 2 (city), pre-load availability for currently filtered cities
  useEffect(() => {
    if (step !== 1 || !nicheId) return;
    setLoadingAvailability(true);
    supabase
      .from("subscriptions")
      .select("city_id")
      .eq("niche_id", nicheId)
      .in("status", ["active", "trialing", "past_due"])
      .then(({ data }) => {
        const taken = new Set((data ?? []).map((r) => r.city_id));
        const map: Record<string, boolean> = {};
        for (const c of cities) map[c.id] = !taken.has(c.id);
        setCityAvailability(map);
        setLoadingAvailability(false);
      });
  }, [step, nicheId, cities]);

  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    return q ? cities.filter((c) => c.name.toLowerCase().includes(q)) : cities;
  }, [cities, citySearch]);

  const selectedNiche = niches.find((n) => n.id === nicheId);
  const selectedCity = cities.find((c) => c.id === cityId);
  const selectedPlan = PLANS.find((p) => p.id === plan)!;

  const canNext =
    (step === 0 && !!nicheId) ||
    (step === 1 && !!cityId && cityAvailability[cityId!] !== false) ||
    (step === 2 && !!plan);

  function next() {
    setStep((s) => Math.min(s + 1, 3));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const returnUrl = `${window.location.origin}/onboarding/klar?session_id={CHECKOUT_SESSION_ID}`;

  return (
    <div className="min-h-screen bg-warm/40">
      <PaymentTestModeBanner />

      <header className="border-b border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-[20px]">
            <Rocket className="h-5 w-5 text-primary" />
            Local<span className="font-semibold">Rocket</span>
          </Link>
          <div className="text-sm text-ink-soft hidden sm:block">
            Inloggad som <span className="text-foreground">{user?.email}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Step indicator */}
        <ol className="flex items-center gap-2 mb-8 text-sm">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-full border ${
                  i < step
                    ? "bg-primary text-primary-foreground border-primary"
                    : i === step
                      ? "border-primary text-primary"
                      : "border-border text-ink-mute"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={i === step ? "font-medium" : "text-ink-soft"}>{label}</span>
              {i < STEPS.length - 1 && <span className="w-6 h-px bg-border mx-1" />}
            </li>
          ))}
        </ol>

        <div className="bg-background rounded-[20px] border border-border shadow-sm p-6 md:p-8">
          {step === 0 && (
            <section>
              <h1 className="font-serif text-2xl md:text-3xl mb-1.5">Vilken bransch är du i?</h1>
              <p className="text-ink-soft text-sm mb-6">
                En partner per stad och bransch — välj din nisch.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {niches.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNicheId(n.id)}
                    className={`text-left rounded-xl border p-4 transition ${
                      nicheId === n.id
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="text-lg mb-1">{n.icon ?? "•"}</div>
                    <div className="font-medium">{n.name}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h1 className="font-serif text-2xl md:text-3xl mb-1.5">Vilken stad?</h1>
              <p className="text-ink-soft text-sm mb-6">
                {selectedNiche?.name}. Endast lediga städer kan väljas.
              </p>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-mute" />
                <Input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Sök stad..."
                  className="pl-9"
                />
              </div>
              <div className="max-h-[420px] overflow-y-auto border border-border rounded-xl divide-y divide-border">
                {loadingAvailability ? (
                  <div className="p-6 text-center text-sm text-ink-soft">Hämtar tillgänglighet…</div>
                ) : (
                  filteredCities.slice(0, 200).map((c) => {
                    const available = cityAvailability[c.id] !== false;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        disabled={!available}
                        onClick={() => setCityId(c.id)}
                        className={`w-full px-4 py-3 flex items-center justify-between text-left transition ${
                          cityId === c.id ? "bg-primary/10" : "hover:bg-warm/40"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <span className="font-medium">{c.name}</span>
                        {available ? (
                          cityId === c.id ? (
                            <Badge className="bg-primary">Vald</Badge>
                          ) : (
                            <span className="text-xs text-ink-mute">Ledig</span>
                          )
                        ) : (
                          <Badge variant="secondary">Upptagen</Badge>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h1 className="font-serif text-2xl md:text-3xl mb-1.5">Välj plan</h1>
              <p className="text-ink-soft text-sm mb-6">
                {selectedNiche?.name} i {selectedCity?.name}. Du kan byta plan när som helst.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`text-left rounded-2xl border p-6 transition ${
                      plan === p.id
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-serif text-xl">{p.name}</h2>
                      {plan === p.id && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="font-semibold text-2xl mb-4">{p.price}</div>
                    <ul className="space-y-1.5 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
              <p className="text-xs text-ink-mute mt-4">
                Priser exkl. moms. 25% moms läggs på vid betalning.
              </p>
            </section>
          )}

          {step === 3 && (
            <section>
              <h1 className="font-serif text-2xl md:text-3xl mb-1.5">Slutför beställning</h1>
              <p className="text-ink-soft text-sm mb-6">
                {selectedPlan.name} — {selectedPlan.price} för {selectedNiche?.name} i{" "}
                {selectedCity?.name}.
              </p>

              {!isStripeConfigured() ? (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
                  Betalningar är inte färdigkonfigurerade ännu. Kontakta oss för att starta din partnerplats.
                </div>
              ) : nicheId && cityId ? (
                <StripeEmbeddedCheckout
                  niche_id={nicheId}
                  city_id={cityId}
                  plan={plan}
                  return_url={returnUrl}
                />
              ) : null}
            </section>
          )}

          {step < 3 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={back} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Tillbaka
              </Button>
              <Button
                variant="hero"
                onClick={() => {
                  if (!canNext) {
                    toast.error(
                      step === 1 && cityId
                        ? "Den staden är tyvärr upptagen för den här branschen."
                        : "Gör ett val för att gå vidare.",
                    );
                    return;
                  }
                  next();
                }}
                disabled={!canNext}
              >
                Nästa <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-ink-soft mt-4">
          Behöver du en skräddarsydd lösning?{" "}
          <Link to="/#kontakt" className="text-primary hover:underline">
            Kontakta oss
          </Link>
        </div>
      </main>
    </div>
  );
}

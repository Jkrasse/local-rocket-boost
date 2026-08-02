import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Premium",
    monthly: "5 000",
    annual: "3 850",
    description: "Allt du behöver för att börja generera leads i en stad.",
    features: [
      "1 stad + alla undersidor",
      "Google Ads (inkl. 1 000 kr spend)",
      "Meta Ads (inkl. 1 000 kr spend)",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering",
    ],
    featured: false,
    custom: false,
  },
  {
    name: "Growth",
    monthly: "8 000",
    annual: "6 160",
    description: "Dubbel annonsbudget för dig som vill växa snabbare.",
    features: [
      "1 stad + alla undersidor",
      "Google Ads (inkl. 2 000 kr spend)",
      "Meta Ads (inkl. 2 000 kr spend)",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering",
    ],
    featured: true,
    custom: false,
  },
  {
    name: "Skräddarsydd",
    monthly: null,
    annual: null,
    description: "För dig som vill synas i flera städer eller bestämma egen annonsspend.",
    features: [
      "Flera städer eller regioner",
      "Egen vald annonsspend",
      "Anpassat upplägg",
      "Dedikerad kontaktperson",
      "Prioriterad support",
    ],
    featured: false,
    custom: true,
  },
];

const PricingSection = ({ showHeader = true }: { showHeader?: boolean }) => {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className={showHeader ? "py-24 md:py-32" : "pb-24 md:pb-32"}>
      <div className="container mx-auto px-4 max-w-container">
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-5">Priser</div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
              Ett fast pris, allt <span className="italic-accent">ingår</span>
            </h2>
            <p className="text-ink-soft text-lg">
              Fast månadspris med annonsbudget inkluderad. Du betalar aldrig per lead.
            </p>
          </div>
        )}

        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center bg-warm rounded-pill p-1.5 border border-border/60">
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-pill text-sm transition-all ${annual ? "bg-foreground text-background shadow-sm" : "text-ink-soft hover:text-foreground"}`}
            >
              Årsvis
              <span className={`ml-2 font-mono text-[10px] tracking-eyebrow px-2 py-0.5 rounded-pill ${annual ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"}`}>
                −23%
              </span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-pill text-sm transition-all ${!annual ? "bg-foreground text-background shadow-sm" : "text-ink-soft hover:text-foreground"}`}
            >
              Månadsvis
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[28px] p-8 border transition-all duration-300 ${
                plan.featured
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_32px_64px_-24px_rgba(42,93,58,0.5)] md:-translate-y-3"
                  : "bg-background-elevated border-border/70 hover:shadow-lg hover:-translate-y-1"
              }`}
              style={!plan.featured ? { backgroundColor: "hsl(var(--background-elevated))" } : undefined}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-eyebrow bg-background text-foreground border border-border/60 px-4 py-1.5 rounded-pill shadow-sm">
                  POPULÄRAST
                </div>
              )}
              <h3 className="font-serif text-3xl mb-2">{plan.name}</h3>
              <p className={`text-sm mb-7 ${plan.featured ? "text-primary-foreground/75" : "text-ink-soft"}`}>
                {plan.description}
              </p>
              {plan.custom ? (
                <>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-serif text-5xl tracking-tightest">Offert</span>
                  </div>
                  <p className="text-xs mb-8 text-ink-mute">anpassat upplägg</p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-serif text-[52px] leading-none tracking-tightest">
                      {annual ? plan.annual : plan.monthly}
                    </span>
                    <span className={`text-sm ${plan.featured ? "text-primary-foreground/70" : "text-ink-mute"}`}>
                      kr/mån
                    </span>
                  </div>
                  <p className={`text-xs mb-8 ${plan.featured ? "text-primary-foreground/60" : "text-ink-mute"}`}>
                    exkl. moms{annual ? " · faktureras årsvis" : ""}
                  </p>
                </>
              )}
              <ul className={`space-y-3.5 mb-9 ${plan.featured ? "" : ""}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 mt-[-1px] ${
                        plan.featured ? "bg-primary-foreground/15" : "bg-primary-soft"
                      }`}
                    >
                      <Check className={`h-3 w-3 ${plan.featured ? "text-primary-foreground" : "text-primary"}`} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  asChild
                  variant={plan.featured ? "dark" : "outline"}
                  className={`w-full ${plan.featured ? "bg-background text-foreground hover:bg-background/90" : ""}`}
                  size="lg"
                >
                  <Link to={plan.custom ? "/#contact" : "/onboarding"}>
                    {plan.custom ? "Kontakta oss" : "Kom igång"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-ink-mute mt-10">
          Ingen startavgift. Ingen bindningstid utöver vald period. Säg upp inför nästa period.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;

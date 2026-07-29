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

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-5">Priser</div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
            Ett fast pris, allt <span className="italic-accent">ingår</span>
          </h2>
          <p className="text-ink-soft text-lg">
            Fast månadspris med annonsbudget inkluderad. Du betalar aldrig per lead.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-warm rounded-pill p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-pill text-sm transition-colors ${!annual ? "bg-primary text-primary-foreground" : "text-ink-soft"}`}
            >
              Månadsvis
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-pill text-sm transition-colors ${annual ? "bg-primary text-primary-foreground" : "text-ink-soft"}`}
            >
              Årsvis · spara 23%
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[24px] p-8 border transition-all ${
                plan.featured
                  ? "bg-foreground text-background border-foreground shadow-lg md:-translate-y-3"
                  : "bg-background-elevated border-border hover:shadow-md"
              }`}
              style={!plan.featured ? { backgroundColor: "hsl(var(--background-elevated))" } : undefined}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-eyebrow bg-primary text-primary-foreground px-3 py-1.5 rounded-pill">
                  POPULÄR
                </div>
              )}
              <h3 className="font-serif text-3xl mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-background/70" : "text-ink-soft"}`}>
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
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-serif text-5xl tracking-tightest">{annual ? plan.annual : plan.monthly}</span>
                    <span className={`text-sm ${plan.featured ? "text-background/70" : "text-ink-mute"}`}>kr/mån</span>
                  </div>
                  <p className={`text-xs mb-8 ${plan.featured ? "text-background/60" : "text-ink-mute"}`}>
                    exkl. moms{annual && " · faktureras årsvis"}
                  </p>
                </>
              )}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-primary" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.featured ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                <Link to={plan.custom ? "/#kontakt" : "/onboarding"}>
                  {plan.custom ? "Kontakta oss" : "Kom igång"} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

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
    <section id="pricing" className={showHeader ? "section" : "pb-20 md:pb-[120px]"}>
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        {showHeader && (
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <div className="eyebrow">Priser</div>
            <h2 className="section-h2 mt-[18px] mb-[18px]">
              Ett fast pris, allt <span className="italic-accent">ingår</span>
            </h2>
            <p className="text-ink-soft text-lg leading-[1.55]">
              Fast månadspris med annonsbudget inkluderad. Du betalar aldrig per lead.
            </p>
          </div>
        )}

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-warm p-1 rounded-pill border border-line">
            {[
              [true, "Årsvis"],
              [false, "Månadsvis"],
            ].map(([val, label]) => {
              const on = annual === val;
              return (
                <button
                  key={String(label)}
                  onClick={() => setAnnual(val as boolean)}
                  className={`flex items-center gap-2 px-[18px] py-[9px] rounded-pill text-sm font-semibold transition-all ${
                    on ? "bg-foreground text-white" : "text-ink-soft hover:text-foreground"
                  }`}
                >
                  {label}
                  {val && (
                    <span className="bg-primary text-white text-[10px] font-bold tracking-[.04em] px-[7px] py-[3px] rounded-pill">
                      −23%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan) => {
            const f = plan.featured;
            const mute = f ? "text-background/70" : "text-ink-mute";
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col gap-7 rounded-xl px-7 py-9 md:px-9 md:py-10 border transition-all duration-300 ${
                  f
                    ? "bg-primary text-background border-primary md:-my-4 shadow-[0_32px_64px_-24px_rgba(38,90,57,.5)]"
                    : "bg-background-elevated border-line hover:shadow-card"
                }`}
              >
                {f && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-background-elevated text-foreground border border-line px-3.5 py-1.5 rounded-pill text-[10px] font-bold tracking-[.14em] uppercase">
                    Populärast
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-[32px] md:text-[34px]">{plan.name}</h3>
                  <p className={`mt-2.5 text-[15px] leading-[1.5] ${f ? "text-background/80" : "text-ink-soft"}`}>
                    {plan.description}
                  </p>
                </div>

                <div>
                  {plan.custom ? (
                    <>
                      <div className="font-serif text-[60px] tracking-[-0.04em] leading-none">Offert</div>
                      <div className={`text-[13px] mt-2 ${mute}`}>anpassat upplägg</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-[60px] tracking-[-0.04em] leading-none">
                          {annual ? plan.annual : plan.monthly}
                        </span>
                        <span className={`text-[15px] ${mute}`}>kr/mån</span>
                      </div>
                      <div className={`text-[13px] mt-2 ${mute}`}>
                        exkl. moms · {annual ? "faktureras årsvis" : "faktureras månadsvis"}
                      </div>
                    </>
                  )}
                </div>

                <ul className="flex flex-col gap-[13px] flex-1">
                  {plan.features.map((x) => (
                    <li key={x} className="flex items-center gap-3 text-[15px]">
                      <span
                        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full shrink-0 ${
                          f ? "bg-background/15 text-white" : "bg-primary-mist text-primary"
                        }`}
                      >
                        <Check className="h-[11px] w-[11px]" strokeWidth={2.4} />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>

                <Button asChild variant={f ? "light" : "outline"} className="w-full">
                  <Link to={plan.custom ? "/#contact" : "/onboarding"}>
                    {plan.custom ? "Kontakta oss" : "Kom igång"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-ink-mute mt-10">
          Ingen startavgift. Ingen bindningstid utöver vald period. Säg upp inför nästa period.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;

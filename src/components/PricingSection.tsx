import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";

type Plan = {
  name: string;
  description: string;
  annual?: number;
  monthly?: number;
  features: string[];
  hot?: boolean;
  to: string;
};

const plans: Plan[] = [
  {
    name: "Premium",
    description: "Allt du behöver för att börja generera leads i en stad.",
    annual: 3850,
    monthly: 5000,
    features: ["1 stad + alla undersidor", "Google Ads (inkl. 1 000 kr spend)", "Meta Ads (inkl. 1 000 kr spend)", "Månadsrapporter", "A/B-testning", "Löpande optimering"],
    to: "/onboarding",
  },
  {
    name: "Growth",
    description: "Dubbel annonsbudget för dig som vill växa snabbare.",
    annual: 6160,
    monthly: 8000,
    features: ["1 stad + alla undersidor", "Google Ads (inkl. 2 000 kr spend)", "Meta Ads (inkl. 2 000 kr spend)", "Månadsrapporter", "A/B-testning", "Löpande optimering"],
    hot: true,
    to: "/onboarding",
  },
  {
    name: "Skräddarsydd",
    description: "För dig som vill synas i flera städer eller bestämma egen annonsspend.",
    features: ["Flera städer eller regioner", "Egen vald annonsspend", "Anpassat upplägg", "Dedikerad kontaktperson", "Prioriterad support"],
    to: "/#kontakt",
  },
];

const PricingSection = ({ showHeader = true }: { showHeader?: boolean }) => {
  const [annual, setAnnual] = useState(true);

  const toggle = (
    <div className="inline-flex p-1 rounded-pill border border-line">
      {([
        [true, "Årsvis −23 %"],
        [false, "Månadsvis"],
      ] as [boolean, string][]).map(([v, l]) => (
        <button
          key={l}
          onClick={() => setAnnual(v)}
          className={`h-10 px-[18px] rounded-pill text-[15px] font-medium transition-colors ${
            annual === v ? "bg-foreground text-background" : "text-ink-soft hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <section id="priser" className={showHeader ? "section" : "pb-[84px] md:pb-[128px]"}>
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        {showHeader ? (
          <div className="head">
            <div>
              <div className="label mb-6">Priser</div>
              <h2 className="h-l">Ett fast pris. Allt ingår.</h2>
            </div>
            <div className="grid gap-5 md:justify-items-end md:justify-self-end">
              <p className="lede md:text-right">Fast månadspris med annonsbudget inkluderad. Du betalar aldrig per lead.</p>
              {toggle}
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-12">{toggle}</div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((t) => {
            const h = !!t.hot;
            const price = t.annual ? (annual ? t.annual : t.monthly) : null;
            return (
              <div
                key={t.name}
                className={`rounded-xl p-7 md:p-9 flex flex-col gap-8 border ${
                  h ? "bg-primary text-background border-primary" : "bg-background-elevated text-foreground border-line-soft"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="h-s">{t.name}</h3>
                  {h && (
                    <span className="text-[13px] font-semibold bg-background text-primary-hover px-[11px] py-[5px] rounded-pill">
                      Populärast
                    </span>
                  )}
                </div>

                <div>
                  <div className="num text-[56px] md:text-[64px] font-semibold tracking-[-0.05em] leading-none">
                    {price ? price.toLocaleString("sv-SE") : "Offert"}
                    {price && <span className="text-[17px] font-medium tracking-normal ml-2 opacity-70">kr/mån</span>}
                  </div>
                  <div className="text-sm mt-2.5 opacity-70">
                    {price ? `exkl. moms · faktureras ${annual ? "årsvis" : "månadsvis"}` : "anpassat upplägg"}
                  </div>
                </div>

                <p className="text-base opacity-[.85]">{t.description}</p>

                <div className="grid gap-3 flex-1 content-start">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-base">
                      <Check className={`w-4 h-4 shrink-0 ${h ? "text-background" : "text-primary"}`} />
                      {f}
                    </div>
                  ))}
                </div>

                <Button asChild variant={h ? "light" : "outline"} className="w-full">
                  {t.to.startsWith("/#") ? (
                    <a href={t.to}>
                      Kontakta oss <Arrow />
                    </a>
                  ) : (
                    <Link to={t.to}>
                      Kom igång <Arrow />
                    </Link>
                  )}
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

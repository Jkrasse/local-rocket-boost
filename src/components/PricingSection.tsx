import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";
import { SERVICES } from "@/data/services";

type Plan = {
  name: string;
  description: string;
  monthly?: number;
  features: string[];
  to: string;
};

export const ANNUAL_DISCOUNT = 0.1;
const annualPrice = (monthly: number) => Math.round(monthly * (1 - ANNUAL_DISCOUNT));

const plans: Plan[] = [
  {
    name: "Starter",
    description: "Allt du behöver för att börja få leads i en stad.",
    monthly: 5000,
    features: [
      "1 stad + alla undersidor",
      "Google Ads (inkl. 1 000 kr spend)",
      "Meta Ads (inkl. 1 000 kr spend)",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering",
    ],
    to: "/#kontakt",
  },
  {
    name: "Premium",
    description: "Dubbel annonsbudget och en egen sökordsdomän för din tjänst i din stad.",
    monthly: 8000,
    features: [
      "1 stad + alla undersidor",
      "Google Ads (inkl. 2 000 kr spend)",
      "Meta Ads (inkl. 2 000 kr spend)",
      "Sökordsdomän med innehåll, t.ex. elektrikermalmo.se",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering",
    ],
    to: "/#kontakt",
  },
  {
    name: "Skräddarsydd",
    description: "För dig som vill synas i flera städer eller bestämma egen annonsspend.",
    features: ["Flera städer eller regioner", "Egen vald annonsspend", "Anpassat upplägg", "Dedikerad kontaktperson", "Prioriterad support"],
    to: "/#kontakt",
  },
];

const PricingSection = ({ showHeader = true }: { showHeader?: boolean }) => {
  const [annual, setAnnual] = useState(false);

  const toggle = (
    <div className="inline-flex w-fit p-1 rounded-pill border border-line">
      {([
        [false, "Månadsvis"],
        [true, "Årsvis −10 %"],
      ] as [boolean, string][]).map(([v, l]) => (
        <button
          key={l}
          onClick={() => setAnnual(v)}
          aria-pressed={annual === v}
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
              <div className="label mb-6">Priser för leads-generering</div>
              <h2 className="h-l">Leads-generering till fast pris.</h2>
            </div>
            <div className="grid gap-5 md:justify-items-end md:justify-self-end">
              <p className="lede md:text-right">
                Fast månadspris med annonsbudget inkluderad. Du betalar aldrig per lead.
              </p>
              {toggle}
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-12">{toggle}</div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((t) => {
            const price = t.monthly ? (annual ? annualPrice(t.monthly) : t.monthly) : null;
            return (
              <div
                key={t.name}
                className="rounded-xl p-7 md:p-9 flex flex-col gap-8 border bg-background-elevated text-foreground border-line-soft"
              >
                <h3 className="h-s">{t.name}</h3>

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
                    <div key={f} className="flex items-start gap-3 text-base">
                      <Check className="w-4 h-4 shrink-0 mt-[5px] text-primary" />
                      {f}
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full">
                  <a href={t.to}>
                    {t.monthly ? "Boka demo" : "Kontakta oss"} <Arrow />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-ink-mute mt-10">
          Ingen startavgift. Ingen bindningstid utöver vald period. Säg upp inför nästa period.
        </p>
        <p className="text-center text-sm text-ink-mute mt-2">
          Priserna gäller leads-generering. Byråtjänsterna{" "}
          {SERVICES.map((s, i) => (
            <span key={s.slug}>
              <Link to={`/byratjanster/${s.slug}`} className="text-primary hover:text-primary-hover underline underline-offset-4">
                {s.name}
              </Link>
              {i < SERVICES.length - 2 ? ", " : i === SERVICES.length - 2 ? " och " : ""}
            </span>
          ))}{" "}
          prissätts efter en kostnadsfri genomgång.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;

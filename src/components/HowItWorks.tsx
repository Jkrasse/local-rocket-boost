import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Du blir rekommenderad partner",
    desc: "Ditt företag listas som rekommenderad partner i din stad på vår etablerade directory-sajt, med logotyp, beskrivning och kontaktvägar. Vi har bara en partner per bransch och stad.",
  },
  {
    title: "Vi driver trafiken",
    desc: "Vi kör Google Ads, Meta Ads och SEO mot directory-sajten. All trafik som söker efter din tjänst i ditt område hittar dig först.",
  },
  {
    title: "Leads landar hos dig",
    desc: "Varje lead, oavsett om den kommer via formulär, samtal eller e-post, skickas direkt till ditt företag. Du missar aldrig en potentiell kund.",
  },
  {
    title: "Rapportering via dashboard",
    desc: "Du får full insyn i din egen dashboard med leads, klick, konverteringar och kostnad per lead. Vi optimerar löpande månad för månad.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="eyebrow">Så fungerar det</div>
          <h2 className="section-h2 mt-[18px] mb-[18px]">
            Fyra steg från <span className="italic-accent">noll</span> till stadigt leadflöde
          </h2>
          <p className="text-ink-soft text-lg leading-[1.55]">
            Vi bygger systemet, sköter trafiken och levererar leads direkt till dig. Du fokuserar på att stänga affärer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-background-elevated border border-line rounded-lg px-7 py-8 md:px-9 md:pt-9 md:pb-10 grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 hover:shadow-card transition-shadow"
            >
              <h3 className="font-serif text-[24px] md:text-[26px] self-end leading-[1.1]">{step.title}</h3>
              <div className="font-serif text-[64px] md:text-[84px] leading-[0.8] tracking-[-0.05em] text-primary row-span-2 self-start opacity-90">
                0{i + 1}
              </div>
              <p className="text-ink-soft text-base leading-[1.6] max-w-[480px]">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-11">
          <Button variant="outline" asChild>
            <Link to="/sa-fungerar-det">
              Läs hela processen <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

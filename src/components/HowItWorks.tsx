import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Du blir rekommenderad partner",
    desc: "Ditt företag listas som rekommenderad partner i din stad på vår etablerade directory-sajt, med logotyp, beskrivning och kontaktvägar. Vi har bara en partner per bransch och stad.",
  },
  {
    n: "02",
    title: "Vi driver trafiken",
    desc: "Vi kör Google Ads, Meta Ads och SEO mot directory-sajten. All trafik som söker efter din tjänst i ditt område hittar dig först.",
  },
  {
    n: "03",
    title: "Leads landar hos dig",
    desc: "Varje lead, oavsett om den kommer via formulär, samtal eller e-post, skickas direkt till ditt företag. Du missar aldrig en potentiell kund.",
  },
  {
    n: "04",
    title: "Rapportering via dashboard",
    desc: "Du får full insyn i din egen dashboard med leads, klick, konverteringar och kostnad per lead. Vi optimerar löpande månad för månad.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-5">Så fungerar det</div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
            Fyra steg från <span className="italic-accent">noll</span> till stadigt leadflöde
          </h2>
          <p className="text-ink-soft text-lg">
            Vi bygger systemet, sköter trafiken och levererar leads direkt till dig. Du fokuserar på att stänga affärer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.n}
              className="group relative overflow-hidden bg-background-elevated border border-border/70 rounded-[24px] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: "hsl(var(--background-elevated))" }}
            >
              <div className="absolute -top-4 right-4 font-serif text-[96px] leading-none text-primary-soft/70 select-none pointer-events-none group-hover:text-primary-soft transition-colors">
                {step.n}
              </div>
              <div className="relative">
                <h3 className="font-serif text-2xl mb-3 max-w-[80%]">{step.title}</h3>
                <p className="text-ink-soft leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/sa-fungerar-det">
            <Button variant="outline" size="lg">
              Läs hela processen <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

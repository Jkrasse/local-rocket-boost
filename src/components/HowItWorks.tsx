import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Vi väljer din nisch",
    desc: "Vi analyserar din bransch och region — identifierar sökvolym, konkurrens och var pengarna finns. Du får en rapport med exakt vilken directory-sajt vi listar dig på.",
  },
  {
    n: "02",
    title: "Du blir rekommenderad partner",
    desc: "Ditt företag listas som rekommenderad partner i din stad på vår etablerade directory-sajt — med logotyp, beskrivning och kontaktvägar.",
  },
  {
    n: "03",
    title: "Vi driver trafiken",
    desc: "Vi kör Google Ads, Meta Ads och SEO mot directory-sajten. All trafik som söker efter din tjänst i ditt område hittar dig först.",
  },
  {
    n: "04",
    title: "Leads landar hos dig",
    desc: "Varje lead — formulär, samtal, e-post — skickas direkt till ditt företag. Vi optimerar löpande och rapporterar varje månad.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-5">Så funkar det</div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
            Fyra steg från <span className="italic-accent">noll</span> till stadig leadflöde
          </h2>
          <p className="text-ink-soft text-lg">
            Vi bygger systemet, sköter trafiken och levererar leads direkt till dig. Du fokuserar på att stänga affärer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.n}
              className="bg-background-elevated border border-border rounded-[20px] p-8 hover:shadow-md transition-shadow"
              style={{ backgroundColor: "hsl(var(--background-elevated))" }}
            >
              <div className="font-mono text-xs tracking-eyebrow text-ink-mute pb-3 border-b border-border mb-5">
                {step.n}
              </div>
              <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
              <p className="text-ink-soft leading-relaxed">{step.desc}</p>
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Search, PhoneIncoming, TrendingUp, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Handshake,
    number: "01",
    title: "Bli rekommenderad partner i din stad",
    description:
      "Vi har redan etablerade directory-sidor inom olika branscher. När du blir partner listas ditt företag som rekommenderad i din stad. Det innebär att alla besökare som söker efter tjänster i ditt område ser ditt företag först — med logotyp, beskrivning och direktlänk till kontakt.",
    note: "Vi är inte en byrå. Vi fokuserar enbart på att generera leads till lokala företag genom våra egna plattformar.",
    imagePlaceholder: "Screenshot: Så ser det ut när ditt företag visas som rekommenderad partner på vår directory-sida.",
  },
  {
    icon: Search,
    number: "02",
    title: "Vi driver kvalificerad trafik",
    description:
      "Vi investerar i Google Ads och Meta Ads för att driva potentiella kunder till directory-sidan i din stad. Det betyder att personer som aktivt letar efter din typ av tjänst hittar sidan — och ditt företag.",
    note: "Annonsbudget ingår i din plan. Du behöver inte hantera några annonser själv.",
    imagePlaceholder: "Screenshot: Exempel på Google Ads-annons som driver trafik till directory-sidan.",
  },
  {
    icon: Globe,
    number: "03",
    title: "Synlighet via Meta Ads",
    description:
      "Utöver Google Ads kör vi riktade kampanjer på Facebook och Instagram för att nå potentiella kunder i ditt område. Annonserna leder direkt till directory-sidan där ditt företag är listat som rekommenderad partner.",
    imagePlaceholder: "Screenshot: Exempel på Meta Ads-annons (Facebook/Instagram) som promotar directory-sidan.",
  },
  {
    icon: PhoneIncoming,
    number: "04",
    title: "Alla leads pekas till dig",
    description:
      "Varje lead som kommer in via directory-sidan skickas direkt till ditt företag. Det kan vara via kontaktformulär, klick på telefonnummer, e-post eller andra kontaktvägar. Du missar aldrig en potentiell kund.",
    imagePlaceholder: "Screenshot: Kontaktformulär och klick-att-ringa på directory-sidan.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Du växer — vi optimerar",
    description:
      "Vi analyserar löpande vilka annonser och landningssidor som presterar bäst och optimerar för att maximera antalet leads. Du får regelbundna rapporter skickade så du alltid har koll på resultaten.",
    imagePlaceholder: "Screenshot: Exempel på månadsrapport med leads, klick och konverteringar.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight leading-[1.1] mb-6">
            Så fungerar <span className="text-gradient">Local Rocket</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Vi är inte en traditionell byrå. Vi bygger egna plattformar och genererar leads som vi skickar direkt till dig som rekommenderad partner.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Ditt företag blir listat och promotat på våra directory-sidor — du betalar bara för resultatet.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
              >
                {/* Text */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="font-heading font-extrabold text-sm text-muted-foreground tracking-widest uppercase">
                      Steg {step.number}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {step.note && (
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm text-muted-foreground">
                      💡 {step.note}
                    </div>
                  )}
                </div>

                {/* Image placeholder */}
                <div className="flex-1 w-full">
                  <div className="bg-secondary/50 border border-border rounded-2xl aspect-[4/3] flex items-center justify-center p-8">
                    <p className="text-muted-foreground text-sm text-center">
                      {step.imagePlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <BarChart3 className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Redo att få fler kunder?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Bli rekommenderad partner i din stad och börja ta emot leads redan idag.
          </p>
          <Link to="/#pricing">
            <Button variant="hero" size="xl">
              Se priser & kom igång
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;

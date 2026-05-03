import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Bli rekommenderad partner i din stad",
    description:
      "Vi har redan etablerade directory-sajter inom olika branscher. När du blir partner listas ditt företag som rekommenderad i din stad — med logotyp, beskrivning och direktlänk till kontakt.",
    note: "Vi är inte en byrå. Vi fokuserar enbart på att generera leads till lokala företag genom våra egna plattformar.",
    imagePlaceholder: "Screenshot: Så ser det ut när ditt företag visas som rekommenderad partner.",
  },
  {
    number: "02",
    title: "Vi driver kvalificerad trafik via Google Ads",
    description:
      "Vi investerar i Google Ads för att driva personer som aktivt söker efter din typ av tjänst till directory-sajten i din stad.",
    note: "Annonsbudget ingår i din plan. Du behöver inte hantera några annonser själv.",
    imagePlaceholder: "Screenshot: Exempel på Google Ads-annons som driver trafik.",
  },
  {
    number: "03",
    title: "Synlighet via Meta Ads",
    description:
      "Vi kör riktade kampanjer på Facebook och Instagram för att nå potentiella kunder i ditt område. Annonserna leder direkt till directory-sajten där du är listad.",
    imagePlaceholder: "Screenshot: Exempel på Meta Ads-annons (Facebook/Instagram).",
  },
  {
    number: "04",
    title: "Alla leads pekas till dig",
    description:
      "Varje lead som kommer in via directory-sidan skickas direkt till ditt företag — via formulär, telefon, e-post eller andra kontaktvägar. Du missar aldrig en potentiell kund.",
    imagePlaceholder: "Screenshot: Kontaktformulär och klick-att-ringa.",
  },
  {
    number: "05",
    title: "Du växer — vi optimerar",
    description:
      "Vi analyserar löpande vilka annonser och landningssidor som presterar bäst och optimerar för att maximera antalet leads. Du får regelbundna rapporter med fullt insyn.",
    imagePlaceholder: "Screenshot: Månadsrapport med leads, klick och konverteringar.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 max-w-container text-center">
          <div className="eyebrow mb-5">Så fungerar det</div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tightest leading-[1.05] mb-8 max-w-3xl mx-auto">
            Vi genererar <span className="italic-accent">leads</span> — inte byråtjänster.
          </h1>
          <p className="text-lg md:text-xl text-ink-soft max-w-2xl mx-auto">
            Vi är inte en traditionell byrå. Vi bygger egna plattformar och skickar leads direkt till dig som rekommenderad partner i din stad.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-container">
          <div className="space-y-20 md:space-y-28 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}
              >
                <div className="flex-1 space-y-5">
                  <div className="font-mono text-xs tracking-eyebrow text-ink-mute">
                    STEG {step.number}
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl tracking-tightest leading-[1.1]">
                    {step.title}
                  </h2>
                  <p className="text-ink-soft text-lg leading-relaxed">
                    {step.description}
                  </p>
                  {step.note && (
                    <div className="bg-warm border border-border/60 rounded-[16px] p-5 text-sm text-ink-soft">
                      💡 {step.note}
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="bg-warm border border-border/60 rounded-[24px] aspect-[4/3] flex items-center justify-center p-8">
                    <p className="font-mono text-xs tracking-eyebrow text-ink-mute text-center uppercase">
                      {step.imagePlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-container">
          <div className="max-w-4xl mx-auto bg-dark-section rounded-[28px] p-10 md:p-16">
            <div className="font-mono text-xs tracking-eyebrow text-background/60 uppercase mb-5">
              🎁 Bonus
            </div>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-6">
              Syns mer — även i <span className="italic-accent">AI och sökmotorer</span>
            </h2>
            <p className="text-background/80 text-lg leading-relaxed mb-4">
              Förutom leads får du en extra fördel: bättre synlighet online. När ditt företag listas som rekommenderad partner stärks din närvaro i både Google och AI-drivna tjänster som ChatGPT och Gemini.
            </p>
            <p className="text-background/80 text-lg leading-relaxed">
              Ju fler trovärdiga källor som nämner ditt företag som det bästa alternativet i ditt område, desto större chans att AI-chattbotar citerar just dig när någon frågar efter rekommendationer.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-warm">
        <div className="container mx-auto px-4 max-w-container text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
            Redo att få fler <span className="italic-accent">kunder</span>?
          </h2>
          <p className="text-ink-soft text-lg mb-10 max-w-xl mx-auto">
            Bli rekommenderad partner i din stad och börja ta emot leads redan idag.
          </p>
          <Link to="/#pricing">
            <Button variant="hero" size="lg">
              Se priser & kom igång <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Hur snabbt får jag mina första leads?",
    a: "I snitt levererar vi första kvalificerade lead inom 23 dagar från avtal. Sajten lanseras inom 14 dagar och därefter ramper trafik och konvertering snabbt upp.",
  },
  {
    q: "Vad är en \"kvalificerad lead\"?",
    a: "En lead som matchar din bransch, region och tjänst — inkommen via formulär, samtal eller e-post från en person med faktisk köpintention.",
  },
  {
    q: "Måste jag ha ett befintligt varumärke eller hemsida?",
    a: "Nej. Vi listar dig på vår etablerade directory-sajt — du behöver ingen egen hemsida för att börja få leads.",
  },
  {
    q: "Är jag bunden till något avtal?",
    a: "Nej, ingen bindningstid. Vi tror på att leverera resultat månad för månad.",
  },
  {
    q: "Vad händer om jag inte är nöjd med leadkvaliteten?",
    a: "Vi optimerar löpande och har en transparent dialog. Om en lead är uppenbart felaktig krediteras den.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-5">FAQ</div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05]">
            Vanliga <span className="italic-accent">frågor</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-background-elevated rounded-[20px] border border-border/60"
                style={{ backgroundColor: "hsl(var(--background-elevated))" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 md:p-7 text-left"
                >
                  <span className="font-serif text-xl md:text-2xl">{faq.q}</span>
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full bg-primary-soft text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 md:px-7 pb-6 md:pb-7 -mt-2 text-ink-soft leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

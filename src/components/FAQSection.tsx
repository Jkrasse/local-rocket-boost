import { useState } from "react";
import { Plus } from "lucide-react";

export const faqs = [
  {
    q: "Hur snabbt får jag mina första leads?",
    a: "Sajten och annonserna lanseras inom 14 dagar från avtal. Därefter brukar de första förfrågningarna komma inom de närmaste veckorna, beroende på bransch och stad.",
  },
  {
    q: "Vad är en \"kvalificerad lead\"?",
    a: "En lead som matchar din bransch, region och tjänst, inkommen via formulär, samtal eller e-post från en person med faktisk köpintention.",
  },
  {
    q: "Måste jag ha ett befintligt varumärke eller hemsida?",
    a: "Nej. Vi listar dig på vår etablerade directory-sajt. Du behöver ingen egen hemsida för att börja få leads.",
  },
  {
    q: "Är jag bunden till något avtal?",
    a: "Nej, ingen bindningstid. Vi tror på att leverera resultat månad för månad.",
  },
  {
    q: "Vad händer om jag inte är nöjd med leadkvaliteten?",
    a: "Vi optimerar löpande och har en transparent dialog. Ser vi att förfrågningarna inte håller måttet justerar vi annonser, formulär och målgrupper tills de gör det.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="section bg-warm">
      <div className="container mx-auto px-5 md:px-8 max-w-[860px]">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-h2 mt-[18px]">
            Vanliga <span className="italic-accent">frågor</span>
          </h2>
        </div>

        <div className="bg-background-elevated border border-line rounded-lg overflow-hidden">
          {faqs.map((faq, i) => {
            const on = open === i;
            return (
              <div key={faq.q} className={i < faqs.length - 1 ? "border-b border-line" : ""}>
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  className="w-full px-5 py-5 md:px-7 md:py-6 flex items-center justify-between gap-5 text-left"
                  aria-expanded={on}
                >
                  <span className="font-serif text-[19px] md:text-[21px] text-foreground">{faq.q}</span>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200 ${
                      on ? "bg-primary text-white rotate-45" : "bg-warm text-foreground"
                    }`}
                  >
                    <Plus className="h-3 w-3" strokeWidth={2} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: on ? 260 : 0, opacity: on ? 1 : 0 }}
                >
                  <div className="px-5 pb-6 md:pl-7 md:pr-20 md:pb-[26px] text-base text-ink-soft leading-[1.6]">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

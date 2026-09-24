import { useState } from "react";

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Hur snabbt får jag mina första leads?",
    a: "Sajten och annonserna lanseras inom 14 dagar från avtal. Därefter brukar de första förfrågningarna komma inom de närmaste veckorna, beroende på bransch och stad.",
  },
  {
    q: "Vad är en \"kvalificerad lead\"?",
    a: "En person som aktivt sökt efter din typ av tjänst, fyllt i kontaktformulär med beskrivning, lämnat telefonnummer eller e-post och matchar din geografiska region.",
  },
  {
    q: "Måste jag ha ett befintligt varumärke eller hemsida?",
    a: "Nej. Vi bygger din synlighet på våra directory-sajter, så även små lokala aktörer kan konkurrera med de stora. Din egen hemsida är en bonus, inte ett krav.",
  },
  {
    q: "Hur skiljer ni er från offertplattformar?",
    a: "De stora offertplattformarna säljer samma förfrågan till flera företag som sedan tävlar om kunden. Hos oss får ett enda företag per bransch och stad alla förfrågningar, exklusivt.",
  },
  {
    q: "Är jag bunden till något avtal?",
    a: "Nej, ingen bindningstid utöver vald period. Vid månadsbetalning förnyas avtalet månad för månad och du kan säga upp inför nästa period.",
  },
  {
    q: "Vad händer om jag inte är nöjd med leadkvaliteten?",
    a: "Vi optimerar löpande och har en transparent dialog. Ser vi att förfrågningarna inte håller måttet justerar vi annonser, formulär och målgrupper tills de gör det.",
  },
];

type Props = {
  items?: FaqItem[];
  title?: string;
  id?: string;
};

const FAQSection = ({ items = faqs, title = "Vanliga frågor", id = "faq" }: Props) => {
  const [open, setOpen] = useState(0);

  return (
    <section id={id} className="section">
      <div className="container mx-auto px-5 md:px-10 max-w-container split">
        <div className="md:sticky md:top-[120px]">
          <div className="label mb-6">FAQ</div>
          <h2 className="h-l">{title}</h2>
          <p className="muted mt-6 max-w-[380px]">
            Hittar du inte svaret? Mejla oss på{" "}
            <a href="mailto:kontakt@localrocket.agency" className="text-primary hover:text-primary-hover">
              kontakt@localrocket.agency
            </a>
            .
          </p>
        </div>

        <div>
          {items.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-t border-line last:border-b">
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left font-semibold text-[19px] md:text-[22px] leading-[1.25] tracking-[-0.025em] text-foreground"
                >
                  {f.q}
                  <span
                    className={`w-9 h-9 rounded-full border grid place-items-center shrink-0 transition-all duration-200 ${
                      on ? "bg-primary border-primary text-white rotate-45" : "border-line text-foreground"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-a ${on ? "on" : ""}`}>
                  <div>
                    <p className="pr-4 md:pr-16 pb-7 text-ink-soft max-w-[760px]">{f.a}</p>
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

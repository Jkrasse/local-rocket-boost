const STEPS: [string, string][] = [
  [
    "Du blir rekommenderad partner",
    "Ditt företag listas som rekommenderad partner i din stad på vår etablerade directory-sajt, med logotyp, beskrivning och kontaktvägar. Vi har bara en partner per bransch och stad.",
  ],
  [
    "Vi driver trafiken",
    "Vi kör Google Ads, Meta Ads och SEO mot directory-sajten. All trafik som söker efter din tjänst i ditt område hittar dig först.",
  ],
  [
    "Leads landar hos dig",
    "Varje lead, oavsett om den kommer via formulär, samtal eller e-post, skickas direkt till ditt företag. Du missar aldrig en potentiell kund.",
  ],
  [
    "Rapportering via dashboard",
    "Du får full insyn i din egen dashboard med leads, klick, konverteringar och kostnad per lead. Vi optimerar löpande månad för månad.",
  ],
];

const StepsSection = ({ title = "Fyra steg till ett stadigt leadflöde." }: { title?: string }) => (
  <section id="how-it-works" className="section bg-background-elevated border-y border-line-soft">
    <div className="container mx-auto px-5 md:px-10 max-w-container">
      <div className="head">
        <div>
          <div className="label mb-6">Så fungerar det</div>
          <h2 className="h-l">{title}</h2>
        </div>
        <p className="lede">
          Vi bygger systemet, sköter trafiken och levererar leads direkt till dig. Du fokuserar
          på att stänga affärer.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map(([t, b], i) => (
          <div key={t} className="border-t-2 border-foreground pt-6">
            <div className="num text-[15px] font-semibold text-primary mb-14">0{i + 1}</div>
            <h3 className="h-s mb-3.5">{t}</h3>
            <p className="muted text-base">{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StepsSection;

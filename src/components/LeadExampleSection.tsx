const rows: [string, string][] = [
  ["Telefon", "070-123 45 67"],
  ["E-post", "anna.e@exempel.se"],
  ["Område", "Stockholm, Södermalm"],
  ["Önskat datum", "Inom 2 veckor"],
];

const LeadExampleSection = () => (
  <section className="section bg-dark-section">
    <div className="container mx-auto px-5 md:px-10 max-w-container split md:items-center">
      <div>
        <div className="label mb-6">Vad du får</div>
        <h2 className="h-l text-background">Så ser en lead ut.</h2>
        <p className="lede mt-7">
          Varje förfrågan innehåller namn, kontaktuppgifter, tjänst och område. Den skickas
          direkt till din mejl eller telefon i samma sekund som kunden skickar formuläret.
        </p>
        <p className="lede mt-4">
          Inga delade listor. Ingen budgivning om samma kund. Leaden är din och bara din.
        </p>
      </div>

      <div className="bg-background text-foreground rounded-xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)]">
        <div className="flex items-center gap-3.5 px-5 md:px-7 py-5 border-b border-line">
          <span className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center font-bold shrink-0">S</span>
          <div className="min-w-0">
            <div className="font-semibold text-base truncate">Ny lead från Stadfirmor.nu</div>
            <div className="text-[13px] text-ink-mute">till dig · nu</div>
          </div>
          <span className="ml-auto text-xs font-semibold text-ink-mute border border-line rounded-pill px-2.5 py-1 shrink-0">
            Exempel
          </span>
        </div>
        <div className="p-5 md:p-7">
          <div className="text-[13px] text-ink-mute font-semibold">Tjänst</div>
          <div className="h-m mt-1.5 mb-6">Flyttstädning, 3 rok</div>
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr] md:grid-cols-[130px_1fr] py-[13px] border-t border-line text-base">
              <span className="text-ink-mute">{k}</span>
              <b className="font-semibold truncate">{v}</b>
            </div>
          ))}
          <p className="mt-5 p-[18px] bg-background-elevated rounded-md text-base text-ink-soft">
            "Hej! Vi flyttar ut den 15:e och behöver flyttstädning med garanti. Kan ni lämna pris?"
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default LeadExampleSection;

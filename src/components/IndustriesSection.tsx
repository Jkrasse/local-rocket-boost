const industries = [
  { title: "Hantverkare", count: 12, sites: "bästatakläggaren.se · plattsättarna.se · elproffs.nu" },
  { title: "Bygg & renovering", count: 8, sites: "köksrenovering.se · badrumsbygg.se" },
  { title: "Hus & trädgård", count: 6, sites: "trädgårdsproffs.se · stenläggarna.se" },
  { title: "Bil & fordon", count: 5, sites: "bilskadereparation.se · däckmästaren.se" },
  { title: "Hem & städ", count: 9, sites: "städfirmor.nu · flyttstäd.se" },
  { title: "Juridik", count: 4, sites: "advokatbyrån.se · familjerätt.nu" },
  { title: "Hälsa & skönhet", count: 7, sites: "frisörguide.se · hudvårdscentret.se" },
  { title: "Event & fest", count: 6, sites: "bröllopsfotografer.se · djförfest.se" },
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-5">Branscher</div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
            Vi finns där dina kunder <span className="italic-accent">söker</span>
          </h2>
          <p className="text-ink-soft text-lg">
            57 directory-sajter över 8 branscher — och vi lanserar 3–5 nya varje månad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="bg-background-elevated rounded-[20px] p-5 sm:p-7 flex justify-between items-start gap-4 sm:gap-6 border border-border/60 hover:shadow-md transition-shadow"
              style={{ backgroundColor: "hsl(var(--background-elevated))" }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl sm:text-2xl mb-2 sm:mb-3 leading-tight">{ind.title}</h3>
                <p className="font-mono text-[11px] sm:text-xs text-ink-mute truncate">{ind.sites}</p>
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] tracking-eyebrow text-ink-soft bg-primary-soft/60 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md whitespace-nowrap text-center shrink-0">
                {ind.count} <br /> sajter
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

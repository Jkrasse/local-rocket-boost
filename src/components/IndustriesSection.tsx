const industries = [
  "Städfirmor",
  "Tandläkare",
  "Bilfirmor",
  "Takläggare",
  "Mäklare",
  "Flyttfirmor",
  "Elektriker",
  "VVS",
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
            En dedikerad directory-sajt per bransch — och vi lanserar nya löpande.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {industries.map((title) => (
            <div
              key={title}
              className="bg-background-elevated rounded-[20px] p-5 sm:p-7 flex items-center justify-center text-center border border-border/60 hover:shadow-md transition-shadow min-h-[110px]"
              style={{ backgroundColor: "hsl(var(--background-elevated))" }}
            >
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl leading-tight">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

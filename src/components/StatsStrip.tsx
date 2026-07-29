const stats = [
  { value: "1", label: "Partner per bransch och stad" },
  { value: "100%", label: "Av dina leads är exklusiva" },
  { value: "14 dgr", label: "Från avtal till lansering" },
  { value: "0 kr", label: "Startavgift, ingen bindningstid" },
];

const StatsStrip = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/60">
      <div className="container mx-auto px-4 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tightest mb-2">{s.value}</div>
              <div className="eyebrow">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;

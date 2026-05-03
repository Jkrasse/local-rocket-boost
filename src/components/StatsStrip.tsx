const stats = [
  { value: "14 000+", label: "Leads / månad" },
  { value: "87", label: "Kunder i Sverige" },
  { value: "4.2×", label: "ROI i snitt" },
  { value: "23 dgr", label: "Tid till första leaden" },
];

const StatsStrip = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/60">
      <div className="container mx-auto px-4 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-5xl md:text-6xl tracking-tightest mb-2">{s.value}</div>
              <div className="eyebrow">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;

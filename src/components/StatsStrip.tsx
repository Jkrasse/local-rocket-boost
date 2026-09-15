const stats = [
  { value: "1", label: "Partner per bransch och stad" },
  { value: "100%", label: "Av dina leads är exklusiva" },
  { value: "14 dgr", label: "Från avtal till lansering" },
  { value: "0 kr", label: "Startavgift, ingen bindningstid" },
];

const StatsStrip = () => {
  return (
    <section className="py-[56px] md:py-[72px] border-y border-line">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.value}</div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;

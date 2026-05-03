const testimonials = [
  {
    stat: "+850%",
    statLabel: "Fler offerter",
    quote:
      "Vi gick från 4 till 38 offerter i månaden på fyra månader. ROI:n är inte ens jämförbar med andra kanaler vi testat.",
    name: "Anna Lindqvist",
    role: "VD, Nordic Tak AB",
  },
  {
    stat: "23 dgr",
    statLabel: "Till första leaden",
    quote:
      "Tre veckor efter avtal hade vi vår första bokning. Inom ett kvartal var vi fullbokade två månader framåt.",
    name: "Marcus Berg",
    role: "Grundare, Berg Bygg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-dark-section">
      <div className="container mx-auto px-4 max-w-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="font-mono text-xs tracking-eyebrow text-background/60 uppercase mb-5">Kunder</div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05]">
            Företag som <span className="italic-accent">växer</span> med oss
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-background/10 rounded-[24px] p-8 md:p-10">
              <div className="font-serif text-5xl md:text-6xl tracking-tightest text-primary mb-2">
                {t.stat}
              </div>
              <div className="font-mono text-[11px] tracking-eyebrow text-background/60 uppercase mb-7">
                {t.statLabel}
              </div>
              <p className="text-lg text-background/90 leading-relaxed mb-8 border-t border-background/10 pt-7">
                "{t.quote}"
              </p>
              <div>
                <div className="text-background font-medium">{t.name}</div>
                <div className="text-sm text-background/60">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

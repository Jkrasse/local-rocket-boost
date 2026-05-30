import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { niches } from "@/data/niches";

const list = Object.values(niches);

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
          {list.map((n) => (
            <Link
              key={n.slug}
              to={`/leadsgenerering/${n.slug}`}
              className="group bg-background-elevated rounded-[20px] p-5 sm:p-7 flex items-center justify-between text-left border border-border/60 hover:shadow-md hover:border-primary/40 transition-all min-h-[110px]"
            >
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl leading-tight">{n.name}</h3>
              <ArrowUpRight className="w-5 h-5 text-ink-mute group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

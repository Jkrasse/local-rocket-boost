import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { niches } from "@/data/niches";

const list = Object.values(niches);

const IndustriesSection = () => {
  return (
    <section id="industries" className="section bg-warm">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="eyebrow">Branscher</div>
          <h2 className="section-h2 mt-[18px] mb-[18px]">
            Vi finns där dina kunder <span className="italic-accent">söker</span>
          </h2>
          <p className="text-ink-soft text-lg leading-[1.55]">
            En dedikerad directory-sajt per bransch, och vi lanserar nya löpande.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {list.map((n) => (
            <Link
              key={n.slug}
              to={`/leadsgenerering/${n.slug}`}
              className="group flex items-center justify-between gap-3 px-7 py-7 lg:py-[34px] bg-background-elevated border border-line rounded-md text-foreground hover:border-primary hover:-translate-y-0.5 hover:shadow-card transition-all duration-200"
            >
              <span className="font-serif text-[24px] lg:text-[26px]">{n.name}</span>
              <ArrowUpRight
                className="w-4 h-4 text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <a href="/#contact">
              Saknar du din bransch? Hör av dig <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

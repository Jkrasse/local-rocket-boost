import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-[168px] pb-10 md:pt-[176px] overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <div
            className="inline-flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-pill bg-primary-mist text-primary text-[11px] font-semibold tracking-[0.14em] uppercase mb-8 animate-fade-in-up"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            En partner per bransch och stad
          </div>

          <h1
            className="font-serif text-[clamp(48px,7.4vw,100px)] leading-[0.96] tracking-[-0.04em] mb-[30px] text-balance animate-fade-in-up"
            style={{ animationDelay: "0.08s" }}
          >
            Kvalificerade leads,
            <br />
            <span className="italic-accent">på autopilot</span>.
          </h1>

          <p
            className="text-[17px] md:text-[19px] text-ink-soft max-w-[660px] mb-10 leading-[1.55] text-pretty animate-fade-in-up"
            style={{ animationDelay: "0.16s" }}
          >
            Vi bygger nischade directory-sajter och driver kvalificerad trafik via
            Google Ads, Meta Ads och SEO. Ditt företag blir vår rekommenderade
            partner och tar emot alla förfrågningar i din stad.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="/#contact">
                Boka demo <ArrowRight />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sa-fungerar-det">Se hur det funkar</Link>
            </Button>
          </div>

          <div
            className="flex flex-wrap gap-x-6 gap-y-2 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.32s" }}
          >
            {["Exklusiva leads", "Fast månadspris", "Ingen bindningstid"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.2} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

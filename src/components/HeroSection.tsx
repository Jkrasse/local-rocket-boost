import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/40 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 max-w-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-primary-soft/60 mb-8 animate-fade-in-up">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[12px] tracking-eyebrow text-ink-soft">
              EN PARTNER PER BRANSCH OCH STAD
            </span>
          </div>

          <h1
            className="font-serif text-[40px] sm:text-5xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tightest mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Kvalificerade leads,<br />
            <span className="italic-accent">på autopilot</span>.
          </h1>

          <p
            className="text-lg md:text-xl text-ink-soft max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Vi bygger nischade directory-sajter och driver kvalificerad trafik via
            Google Ads, Meta Ads och SEO. Ditt företag blir vår rekommenderade
            partner och tar emot alla förfrågningar i din stad.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="/#contact">
                Boka demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sa-fungerar-det">Se hur det funkar</Link>
            </Button>
          </div>

          <div
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-ink-mute animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Exklusiva leads</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Fast månadspris</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Ingen bindningstid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

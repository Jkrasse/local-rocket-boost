import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/40 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 max-w-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-primary-soft/60 mb-8 animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[12px] tracking-eyebrow text-ink-soft">
              12 NYA DIRECTORY-SIDOR LANSERADE I MARS
            </span>
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tightest mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Kvalificerade leads,<br />
            <span className="italic-accent">på autopilot</span>.
          </h1>

          <p
            className="text-lg md:text-xl text-ink-soft max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Vi bygger nischade directory-sidor och driver kvalificerad trafik via
            Google Ads, Meta Ads och SEO — direkt till ditt lokala företag.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="lg">
              Boka demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Se hur det funkar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

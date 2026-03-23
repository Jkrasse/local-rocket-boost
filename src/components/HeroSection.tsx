import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in-up">
            🚀 Fler leads till lokala företag
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Få fler kunder med{" "}
            <span className="text-gradient">Local Rocket</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Vi bygger nischade directory-sidor och driver kvalificerad trafik via Google Ads, Meta Ads och SEO — direkt till ditt lokala företag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Kom igång nu
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl">
              Se hur det funkar
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img
              src={heroDashboard}
              alt="Local Rocket dashboard visar lead-generering för lokala företag"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

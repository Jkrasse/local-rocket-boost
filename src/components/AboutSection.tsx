import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-container">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-5">Om oss</div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-10">
            Vi är ett team av <span className="italic-accent">performance-marknadsförare</span> och utvecklare.
          </h2>

          <div className="space-y-5 text-lg text-ink-soft leading-relaxed mb-10 max-w-3xl">
            <p>
              Local Rocket grundades 2022 av personer som tröttnade på att se lokala företag betala för dåliga
              leads från generella plattformar.
            </p>
            <p>
              Idag driver vi 57 nischade directory-sajter och levererar 14 000+ kvalificerade leads varje månad
              till lokala företag i hela Sverige.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg">
              Träffa teamet
            </Button>
            <Button variant="outline" size="lg">
              Vår story <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

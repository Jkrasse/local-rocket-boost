import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-container">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-5">Om oss</div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-10">
            Byggt av <span className="italic-accent">performance-marknadsförare</span>, för lokala företag.
          </h2>

          <div className="space-y-5 text-lg text-ink-soft leading-relaxed mb-10 max-w-3xl">
            <p>
              Local Rocket startades av marknadsförare som tröttnat på att se lokala
              företag betala dyrt för delade leads från stora plattformar, där samma
              förfrågan säljs till fem konkurrenter samtidigt.
            </p>
            <p>
              Därför gör vi tvärtom. Vi bygger egna nischade directory-sajter, driver
              trafiken med Google Ads, Meta Ads och SEO, och låter ett enda företag
              per bransch och stad ta emot alla förfrågningar. Exklusivt, transparent
              och till fast pris.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" asChild>
              <a href="/#contact">
                Boka demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sa-fungerar-det">Så jobbar vi</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

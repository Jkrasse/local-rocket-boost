import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container mx-auto px-5 md:px-8 max-w-[1040px]">
        <div className="eyebrow mb-5">Om oss</div>
        <h2 className="font-serif text-[clamp(38px,5.2vw,72px)] tracking-[-0.03em] leading-[1.02] mb-10 max-w-[1000px] text-balance">
          Byggt av <span className="italic-accent">performance-marknadsförare</span>, för lokala företag.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <p className="text-lg text-ink-soft leading-[1.65]">
            Local Rocket startades av marknadsförare som tröttnat på att se lokala
            företag betala dyrt för delade leads från stora plattformar, där samma
            förfrågan säljs till fem konkurrenter samtidigt.
          </p>
          <div>
            <p className="text-lg text-ink-soft leading-[1.65] mb-8">
              Därför gör vi tvärtom. Vi bygger egna nischade directory-sajter, driver
              trafiken med Google Ads, Meta Ads och SEO, och låter ett enda företag
              per bransch och stad ta emot alla förfrågningar. Exklusivt, transparent
              och till fast pris.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <a href="/#contact">
                  Boka demo <ArrowRight />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sa-fungerar-det">Så jobbar vi</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

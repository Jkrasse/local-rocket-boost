import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";
import Showcase from "@/components/DirectoryPreview";

const HeroSection = () => {
  return (
    <section className="pt-12 md:pt-[72px] pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="max-w-[980px]">
          <h1 className="h-xl" style={{ fontSize: "clamp(50px, 7.2vw, 112px)" }}>
            Kvalificerade leads, <span className="text-primary">på autopilot.</span>
          </h1>
          <p className="lede mt-7 md:mt-9 max-w-[620px]">
            Vi bygger nischade directory-sajter och driver kvalificerad trafik via Google Ads,
            Meta Ads och SEO. Ditt företag blir vår rekommenderade partner och tar emot alla
            förfrågningar i din stad.
          </p>
          <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
            <Button asChild>
              <a href="/#kontakt">
                Boka demo <Arrow />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/leadsgenerering">Se hur det funkar</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-[26px] gap-y-2.5 mt-7 text-[15px] font-medium text-ink-soft">
            {["Exklusiva leads", "Fast månadspris", "Ingen bindningstid"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Check className="w-[15px] h-[15px] text-primary" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-[88px]">
          <Showcase />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

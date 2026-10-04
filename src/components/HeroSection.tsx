import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Arrow, ServiceIcon } from "@/components/icons";
import { Mark } from "@/components/Logo";
import { SERVICES } from "@/data/services";
import Showcase from "@/components/DirectoryPreview";

const chip =
  "inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-pill border border-line bg-background-elevated text-[15px] font-semibold tracking-[-0.01em] text-foreground hover:border-primary hover:text-primary transition-colors";

const HeroSection = () => {
  return (
    <section className="pt-12 md:pt-[72px] pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="max-w-[1100px]">
          <h1 className="h-xl" style={{ fontSize: "clamp(33px, 6vw, 88px)", lineHeight: 0.96 }}>
            Digital marknadsföringsbyrå <span className="text-primary block">för lokala företag.</span>
          </h1>
          <p className="lede mt-7 md:mt-9 max-w-[660px]">
            Vi bygger nischade directory-sajter och driver kvalificerad trafik till dem, så att
            förfrågningarna i din stad landar hos dig. Vi gör också SEO, Google Ads och Meta Ads
            som konsulttjänster för ditt eget företag.
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
          <div className="mt-10 md:mt-12 grid sm:grid-cols-[auto_1fr] gap-x-10 gap-y-6 pt-6 border-t border-line max-w-[820px]">
            <div>
              <div className="text-[13px] font-semibold text-ink-mute mb-3">Leads till fast pris</div>
              <Link to="/leadsgenerering" className={chip}>
                <span className="text-primary flex">
                  <Mark size={17} />
                </span>
                Leads-generering
              </Link>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-ink-mute mb-3">Konsulttjänster</div>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Link key={s.slug} to={`/byratjanster/${s.slug}`} className={chip}>
                    <span className="text-primary flex">
                      <ServiceIcon k={s.k} size={17} />
                    </span>
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
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

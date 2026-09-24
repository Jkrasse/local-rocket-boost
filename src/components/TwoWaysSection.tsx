import { Link } from "react-router-dom";
import { Diag, ServiceIcon } from "@/components/icons";
import { SERVICES } from "@/data/services";

const TwoWaysSection = () => (
  <section className="section !pt-0">
    <div className="container mx-auto px-5 md:px-10 max-w-container">
      <div className="head">
        <div>
          <div className="label mb-6">Två sätt att växa</div>
          <h2 className="h-l">Välj leads, en byrå, eller båda.</h2>
        </div>
        <p className="lede">
          Leads-generering ger dig färdiga förfrågningar till fast pris. Byråtjänsterna
          bygger synligheten för ditt eget varumärke.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          to="/leadsgenerering"
          className="group rounded-2xl p-7 md:p-10 flex flex-col justify-between gap-12 md:min-h-[520px] bg-primary text-background hover:-translate-y-[3px] transition-transform duration-[250ms]"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold opacity-75">01</span>
            <Diag className="w-[22px] h-[22px] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
          </div>
          <div>
            <h3 className="h-m mb-4">Leads-generering</h3>
            <p className="opacity-[.82] max-w-[440px]">
              Bli rekommenderad partner på vår directory-sajt i din bransch och stad. Vi driver
              trafiken, du tar emot förfrågningarna.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["En partner per stad", "Från 3 850 kr/mån", "Ingen bindningstid"].map((t) => (
              <span key={t} className="text-sm font-medium px-3.5 py-2 rounded-pill border border-background/30">
                {t}
              </span>
            ))}
          </div>
        </Link>

        <div className="rounded-2xl p-7 md:p-10 flex flex-col justify-between gap-12 md:min-h-[520px] bg-background-elevated border border-line-soft">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-mute">02</span>
          </div>
          <div>
            <h3 className="h-m mb-4">Byråtjänster</h3>
            <p className="muted max-w-[440px]">
              Vi sköter marknadsföringen för ditt eget företag, med samma metoder som driver
              våra directory-sajter.
            </p>
          </div>
          <div className="grid">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/byratjanster/${s.slug}`}
                className="group flex items-center justify-between py-[18px] border-t border-line text-foreground text-xl font-semibold tracking-[-0.02em] hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-3.5 whitespace-nowrap">
                  <span className="text-primary flex">
                    <ServiceIcon k={s.k} />
                  </span>
                  {s.name}
                </span>
                <Diag className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TwoWaysSection;

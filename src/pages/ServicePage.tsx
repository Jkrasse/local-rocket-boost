import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import { Mark } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Arrow, Check, Diag, ServiceIcon } from "@/components/icons";
import { SERVICES, SERVICE_CONTENT, getService } from "@/data/services";

const BASE_URL = "https://localrocket.se";

const PROCESS: [string, string][] = [
  ["Genomgång", "Vi analyserar din synlighet idag och dina konkurrenter."],
  ["Förslag", "Du får en plan och ett fast månadspris."],
  ["Uppstart", "Vi sätter upp allt inom två veckor."],
  ["Löpande", "Optimering varje vecka, rapport varje månad."],
];

const ServicePage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const meta = getService(slug);
  const s = SERVICE_CONTENT[slug];
  if (!meta || !s) return <Navigate to="/" replace />;

  const others = SERVICES.filter((x) => x.slug !== slug);
  const url = `${BASE_URL}/byratjanster/${slug}`;
  const faqItems = s.faq.map(([q, a]) => ({ q, a }));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: meta.name,
    serviceType: meta.name,
    provider: { "@type": "Organization", name: "Local Rocket", url: BASE_URL },
    areaServed: { "@type": "Country", name: "Sverige" },
    description: s.metaDescription,
    url,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const scrollToIncl = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("inkl");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title={s.metaTitle} description={s.metaDescription} canonical={url} jsonLd={[serviceLd, faqLd]} />
      <Navbar />

      <PageHero crumbs={["Byråtjänster", meta.name]} label={`Byråtjänster · ${meta.name}`} title={s.title} lede={s.lede}>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="/#kontakt">
              Boka genomgång <Arrow />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#inkl" onClick={scrollToIncl}>Vad ingår?</a>
          </Button>
        </div>
      </PageHero>

      {/* Det här ingår */}
      <section id="inkl" className="section bg-background-elevated border-y border-line-soft">
        <div className="container mx-auto px-5 md:px-10 max-w-container">
          <div className="head">
            <div>
              <div className="label mb-6">Det här ingår</div>
              <h2 className="h-l">{meta.name}, från start till rapport.</h2>
            </div>
            <p className="lede">Vi sätter upp allt, sköter det löpande och visar varje månad vad det har gett.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
            {s.incl.map(([t, b], i) => (
              <div key={t} className="pt-8 pb-10 pr-4 md:pr-8 border-t border-line">
                <div className="num text-sm font-semibold text-primary mb-8">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h-s mb-3">{t}</h3>
                <p className="muted text-base">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passar dig som */}
      <section className="section">
        <div className="container mx-auto px-5 md:px-10 max-w-container split">
          <div>
            <div className="label mb-6">Passar dig som</div>
            <h2 className="h-l">Är {meta.name} rätt för dig?</h2>
          </div>
          <div className="grid">
            {s.fit.map((x) => (
              <div key={x} className="flex items-center gap-[18px] py-6 border-t border-line text-lg md:text-[22px] font-semibold tracking-[-0.02em]">
                <span className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upplägg */}
      <section className="section bg-warm">
        <div className="container mx-auto px-5 md:px-10 max-w-container">
          <div className="head">
            <div>
              <div className="label mb-6">Upplägg</div>
              <h2 className="h-l">Fast pris, anpassat efter dig.</h2>
            </div>
            <p className="lede">
              Priset beror på hur många orter och tjänster du vill synas för. Du får ett fast
              månadspris efter första genomgången. Ingen bindningstid.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map(([t, b], i) => (
              <div key={t} className="bg-background-elevated border border-line-soft rounded-lg p-7">
                <div className="num text-sm font-semibold text-primary mb-10">0{i + 1}</div>
                <h3 className="h-s mb-2.5">{t}</h3>
                <p className="muted text-base">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} />

      {/* Fler byråtjänster */}
      <section className="pb-[84px] md:pb-[128px]">
        <div className="container mx-auto px-5 md:px-10 max-w-container">
          <div className="label mb-6">Fler byråtjänster</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ...others.map((o) => ({ to: `/byratjanster/${o.slug}`, name: o.name, desc: o.short, k: o.k as string | null })),
              { to: "/leadsgenerering", name: "Leads-generering", desc: "Färdiga förfrågningar via våra directory-sajter.", k: null },
            ].map((c) => (
              <Link
                key={c.name}
                to={c.to}
                className="group bg-background-elevated border border-line-soft rounded-lg p-7 flex flex-col gap-10 text-foreground hover:border-primary hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
              >
                <span className="flex items-center justify-between">
                  <span className="text-primary flex">{c.k ? <ServiceIcon k={c.k as "seo" | "google" | "meta"} /> : <Mark size={22} />}</span>
                  <Diag className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                </span>
                <span>
                  <h3 className="h-s mb-2">{c.name}</h3>
                  <span className="muted text-base">{c.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        title={`Boka en genomgång av din ${slug === "lokal-seo" ? "lokala synlighet." : "annonsering."}`}
        body="Vi tittar på var du syns idag, vad konkurrenterna gör och vad som är rimligt att förvänta sig. 30 minuter, kostnadsfritt."
        defaultInterest={meta.name}
      />
      <Footer />
    </div>
  );
};

export default ServicePage;

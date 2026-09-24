import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Showcase from "@/components/DirectoryPreview";
import StepsSection from "@/components/StepsSection";
import IndustriesSection from "@/components/IndustriesSection";
import LeadExampleSection from "@/components/LeadExampleSection";
import PricingSection from "@/components/PricingSection";
import FAQSection, { faqs } from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";

const BASE_URL = "https://localrocket.se";
const TITLE = "Leadsgenerering för lokala företag: exklusiva förfrågningar i din stad | Local Rocket";
const DESCRIPTION =
  "Bli rekommenderad partner på vår directory-sajt i din bransch och stad. Vi driver trafiken via Google Ads, Meta Ads och SEO, du tar emot alla förfrågningar. Fast pris, ingen bindningstid.";

const COMPARISON: [string, string, string][] = [
  ["Leads per förfrågan", "Bara till dig", "Delas med flera företag"],
  ["Prismodell", "Fast månadspris", "Betalt per lead eller budgivning"],
  ["Annonsbudget", "Ingår", "Egen kostnad"],
  ["Bindningstid", "Ingen", "Varierar"],
  ["Rapportering", "Egen dashboard", "Begränsad"],
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Leadsgenerering för lokala företag",
  serviceType: "Lead generation",
  provider: { "@type": "Organization", name: "Local Rocket", url: BASE_URL },
  areaServed: { "@type": "Country", name: "Sverige" },
  description: DESCRIPTION,
  url: `${BASE_URL}/leadsgenerering`,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const LeadsPage = () => (
  <div className="min-h-screen bg-background">
    <Seo title={TITLE} description={DESCRIPTION} canonical={`${BASE_URL}/leadsgenerering`} jsonLd={[serviceLd, faqLd]} />
    <Navbar />

    <PageHero
      crumbs={["Leads-generering"]}
      label="Leads-generering"
      title="Bli den enda i din stad som får förfrågningarna."
      lede="Vi bygger nischade directory-sajter och driver kvalificerad trafik via Google Ads, Meta Ads och SEO. Ditt företag blir vår rekommenderade partner och tar emot alla förfrågningar i din stad."
    >
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="/#kontakt">
            Boka demo <Arrow />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/priser">Se priser</Link>
        </Button>
      </div>
    </PageHero>

    <section className="pb-[84px] md:pb-[128px]">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <Showcase />
      </div>
    </section>

    <StepsSection title="Så fungerar leads-generering." />

    <section className="section">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="head">
          <div>
            <div className="label mb-6">Jämförelse</div>
            <h2 className="h-l">Exklusivt, inte delat.</h2>
          </div>
          <p className="lede">
            Stora offertplattformar säljer samma förfrågan till flera företag. Hos oss finns bara en
            partner per bransch och stad.
          </p>
        </div>
        <div className="bg-background-elevated border border-line-soft rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] px-5 md:px-8 py-5 bg-background text-sm md:text-base font-semibold">
            <span className="text-ink-mute" />
            <span>Local Rocket</span>
            <span>Offertplattformar</span>
          </div>
          {COMPARISON.map(([k, a, b]) => (
            <div key={k} className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 px-5 md:px-8 py-5 border-t border-line-soft text-sm md:text-base">
              <span className="text-ink-mute">{k}</span>
              <span className="flex items-center gap-2.5 font-semibold text-primary">
                <Check className="w-[15px] h-[15px] shrink-0" />
                {a}
              </span>
              <span className="text-ink-soft">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <IndustriesSection />
    <LeadExampleSection />
    <PricingSection />
    <FAQSection />
    <ContactSection />
    <Footer />
  </div>
);

export default LeadsPage;

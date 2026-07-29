import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import DirectoryPreview from "@/components/DirectoryPreview";
import HowItWorks from "@/components/HowItWorks";
import IndustriesSection from "@/components/IndustriesSection";
import PricingSection from "@/components/PricingSection";
import LeadExampleSection from "@/components/LeadExampleSection";
import AboutSection from "@/components/AboutSection";
import FAQSection, { faqs } from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const BASE_URL = "https://localrocket.se";
const TITLE = "Local Rocket: Leadsgenerering för lokala företag i hela Sverige";
const DESCRIPTION =
  "Local Rocket ger lokala företag fler kunder via nischade directory-sajter och annonsering. En partner per bransch och stad, exklusiva leads och fast månadspris.";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Local Rocket",
  legalName: "J.Krasse Marketing AB",
  url: BASE_URL,
  email: "kontakt@localrocket.agency",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ätrastigen 5",
    postalCode: "311 38",
    addressLocality: "Falkenberg",
    addressCountry: "SE",
  },
  description: DESCRIPTION,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Local Rocket",
  url: BASE_URL,
  inLanguage: "sv-SE",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        canonical={`${BASE_URL}/`}
        jsonLd={[organizationLd, websiteLd, faqLd]}
      />
      <Navbar />
      <HeroSection />
      <DirectoryPreview />
      <StatsStrip />
      <HowItWorks />
      <IndustriesSection />
      <LeadExampleSection />
      <PricingSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

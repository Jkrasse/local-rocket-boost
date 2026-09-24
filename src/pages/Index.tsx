import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TwoWaysSection from "@/components/TwoWaysSection";
import StepsSection from "@/components/StepsSection";
import IndustriesSection from "@/components/IndustriesSection";
import LeadExampleSection from "@/components/LeadExampleSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import FAQSection, { faqs } from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const BASE_URL = "https://localrocket.se";
const TITLE = "Local Rocket: Leadsgenerering och digital marknadsföring för lokala företag";
const DESCRIPTION =
  "Local Rocket ger lokala företag fler kunder via nischade directory-sajter, Google Ads, Meta Ads och lokal SEO. En partner per bransch och stad, exklusiva leads och fast månadspris.";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Local Rocket",
  legalName: "J.Krasse Marketing AB",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon-app.svg`,
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

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo title={TITLE} description={DESCRIPTION} canonical={`${BASE_URL}/`} jsonLd={[organizationLd, websiteLd, faqLd]} />
    <Navbar />
    <HeroSection />
    <TwoWaysSection />
    <StepsSection />
    <IndustriesSection />
    <LeadExampleSection />
    <PricingSection />
    <AboutSection />
    <FAQSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;

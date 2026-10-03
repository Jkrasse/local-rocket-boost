import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Globe, Megaphone, Search } from "lucide-react";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE_URL = "https://localrocket.se";
const TITLE = "Priser för leadsgenerering: fast månadspris | Local Rocket";
const DESCRIPTION =
  "Två fasta paket för leadsgenerering med annonsbudget inkluderad: Starter 5 000 kr/mån och Premium 8 000 kr/mån. 10 % rabatt vid årsbetalning. Ingen startavgift, ingen bindningstid, aldrig betala per lead.";

const inAllPlans = [
  { icon: Globe, label: "Plats som rekommenderad partner", detail: "på en etablerad nischsajt i din bransch och stad" },
  { icon: Megaphone, label: "Google Ads och Meta Ads", detail: "annonsbudget ingår i månadspriset" },
  { icon: Search, label: "SEO", detail: "sökoptimerad sajt som byggs ut löpande" },
  { icon: BarChart3, label: "Partnerportal", detail: "leads, klick och rapporter samlade på ett ställe" },
];

const priceFaq = [
  {
    q: "Betalar jag något per lead?",
    a: "Nej, aldrig. Du betalar ett fast månadspris och alla leads som kommer in i din stad är dina, oavsett hur många de blir.",
  },
  {
    q: "Vad är skillnaden mellan Starter och Premium?",
    a: "Premium har dubbel annonsbudget, 2 000 kr Google Ads och 2 000 kr Meta Ads per månad i stället för 1 000 kr vardera, och en exakt matchad domän med innehåll för din tjänst i din stad. Mer budget och fler ingångar betyder mer trafik och fler förfrågningar.",
  },
  {
    q: "Vad är en exakt matchad domän?",
    a: "En domän som exakt matchar det dina kunder söker på, till exempel elektrikermalmo.se. Vi sätter upp den med innehåll om din tjänst i din stad, och alla förfrågningar därifrån går direkt till dig. Den ingår i Premium.",
  },
  {
    q: "Finns det någon bindningstid eller startavgift?",
    a: "Ingen startavgift och ingen bindningstid vid månadsbetalning – avtalet löper tillsvidare med en månads uppsägningstid. Betalar du årsvis får du 10 % rabatt och avtalet gäller i tolv månader.",
  },
  {
    q: "Kan jag byta paket senare?",
    a: "Ja. Du kan byta mellan Starter och Premium när du vill. Vill du synas i flera städer eller sätta en egen annonsbudget tar vi fram ett skräddarsytt upplägg.",
  },
  {
    q: "Gäller priserna även byråtjänsterna?",
    a: "Nej. Priserna på den här sidan gäller leadsgenerering via våra directory-sajter. Lokal SEO, Google Ads och Meta Ads för ditt eget företag prissätts efter en kostnadsfri genomgång.",
  },
  {
    q: "Tillkommer moms?",
    a: "Ja, priserna är angivna exklusive moms eftersom tjänsten riktar sig till företag.",
  },
];

const offerCatalogLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Leadsgenerering för lokala företag",
  provider: { "@type": "Organization", name: "Local Rocket", url: BASE_URL },
  areaServed: { "@type": "Country", name: "Sverige" },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "5000",
      priceCurrency: "SEK",
      description: "Fast månadspris exkl. moms. 4 500 kr/mån vid årsbetalning.",
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: "8000",
      priceCurrency: "SEK",
      description: "Fast månadspris exkl. moms, inklusive exakt matchad domän med innehåll. 7 200 kr/mån vid årsbetalning.",
    },
  ],
  url: `${BASE_URL}/priser`,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: priceFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        canonical={`${BASE_URL}/priser`}
        jsonLd={[offerCatalogLd, faqLd]}
      />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="pt-10 pb-12 md:pt-16 md:pb-16">
          <div className="container mx-auto px-5 md:px-10 max-w-container text-center">
            <div className="label mb-6 justify-center">Priser för leads-generering</div>
            <h1 className="h-xl mb-6 max-w-[900px] mx-auto text-balance" style={{ fontSize: "clamp(44px, 6vw, 92px)" }}>
              Leads-generering till <span className="text-primary">fast pris.</span>
            </h1>
            <p className="lede mx-auto text-center">
              Plats som rekommenderad partner, annonser, SEO och rapportering i ett
              månadspris. Ingen startavgift och du betalar aldrig per lead.
            </p>
          </div>
        </section>

        <PricingSection showHeader={false} />

        {/* INGÅR I ALLA PAKET */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="eyebrow mb-5">Alltid inkluderat</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Det här ingår i <span className="italic-accent">alla paket</span>.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {inAllPlans.map((item) => (
                <div
                  key={item.label}
                  className="bg-background-elevated rounded-[24px] p-7 border border-border/60 text-center"
                  style={{ backgroundColor: "hsl(var(--background-elevated))" }}
                >
                  <div className="mx-auto w-11 h-11 rounded-full bg-primary-soft flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2 leading-tight">{item.label}</h3>
                  <p className="text-sm text-ink-soft">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container max-w-3xl">
            <div className="text-center mb-12">
              <div className="eyebrow mb-5">Vanliga frågor</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Frågor om <span className="italic-accent">priset</span>.
              </h2>
            </div>
            <Accordion
              type="single"
              collapsible
              className="bg-background-elevated rounded-[24px] border border-border/60 px-6"
              style={{ backgroundColor: "hsl(var(--background-elevated))" }}
            >
              {priceFaq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                  <AccordionTrigger className="font-serif text-lg text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-ink-soft text-base">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4 max-w-container">
            <div className="bg-dark-section rounded-[32px] p-10 md:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-5 max-w-2xl mx-auto">
                Osäker på vilket paket som <span className="italic-accent">passar</span>?
              </h2>
              <p className="text-lg opacity-80 max-w-xl mx-auto mb-8">
                Boka en demo så visar vi sajten i din bransch och räknar på vad som ger
                mest i din stad.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                  <a href="/#kontakt">
                    Boka demo <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-background/30 bg-transparent text-background hover:bg-background/10">
                  <Link to="/leadsgenerering">Så fungerar det</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

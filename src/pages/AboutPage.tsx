import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Arrow, Diag } from "@/components/icons";
import { INDUSTRIES } from "@/data/sites";

const BASE_URL = "https://localrocket.se";
const TITLE = "Om oss: marknadsförare som bygger leadflöden åt lokala företag | Local Rocket";
const DESCRIPTION =
  "Local Rocket drivs av J.Krasse Marketing AB i Falkenberg. Vi bygger nischade directory-sajter, driver trafiken och låter ett företag per bransch och stad ta emot förfrågningarna.";

const PRINCIPLES: [string, string][] = [
  [
    "En partner per bransch och stad",
    "Vi rekommenderar ett företag per bransch och stad. Förfrågningarna som kommer in där går till det företaget och ingen annan.",
  ],
  [
    "Fast månadspris",
    "Du betalar samma summa varje månad, med annonsbudgeten inräknad. Du betalar aldrig per lead och det finns ingen startavgift.",
  ],
  [
    "Egna sajter som redan har trafik",
    "Vi äger och driver sajterna själva. De är indexerade och får besökare, så ditt företag syns från första dagen.",
  ],
  [
    "Raka besked",
    "Du ser vilka leads som kommit in och vad vi gör med annonserna. Fungerar något inte säger vi det och justerar.",
  ],
];

const FACTS: [string, string][] = [
  ["Bolag", "J.Krasse Marketing AB"],
  ["Adress", "Ätrastigen 5, 311 38 Falkenberg"],
  ["E-post", "kontakt@localrocket.se"],
  ["Verksamhet", "Leads-generering, lokal SEO, Google Ads och Meta Ads"],
];

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Om Local Rocket",
  url: `${BASE_URL}/om-oss`,
  description: DESCRIPTION,
  mainEntity: {
    "@type": "Organization",
    name: "Local Rocket",
    legalName: "J.Krasse Marketing AB",
    url: BASE_URL,
    email: "kontakt@localrocket.se",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ätrastigen 5",
      postalCode: "311 38",
      addressLocality: "Falkenberg",
      addressCountry: "SE",
    },
  },
};

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Seo title={TITLE} description={DESCRIPTION} canonical={`${BASE_URL}/om-oss`} jsonLd={[aboutLd]} />
    <Navbar />

    <PageHero
      crumbs={["Om oss"]}
      label="Om oss"
      title="Vi ser till att lokala företag blir hittade."
      lede="Local Rocket är en liten byrå med performance-marknadsföring som hantverk. Vi bygger nischade sajter, driver trafiken och skickar förfrågningarna vidare till ett företag per bransch och stad."
    >
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="#kontakt">
            Boka demo <Arrow />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/leadsgenerering">Så fungerar det</Link>
        </Button>
      </div>
    </PageHero>

    <section className="section bg-warm">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="label mb-7">Det här gör vi</div>
        <h2 className="h-l max-w-[1100px] text-balance">
          Vi sköter marknadsföringen. <span className="italic-accent">Ni stänger affärerna.</span>
        </h2>
        <div className="split mt-10 md:mt-14">
          <p className="lede !max-w-none">
            Local Rocket är en digital marknadsföringsbyrå för lokala företag. Vi bygger och
            driver egna directory-sajter, en per bransch, och gör SEO, Google Ads och Meta Ads
            åt företag som vill synas bättre under eget namn.
          </p>
          <p className="lede !max-w-none">
            Vi tar hand om sajterna, annonserna och tekniken, och följer upp vad som ger
            förfrågningar. Ni får samtalen och mejlen direkt och kan lägga tiden på kunderna
            i stället för på annonskonton.
          </p>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="head">
          <div>
            <div className="label mb-6">Så jobbar vi</div>
            <h2 className="h-l">Fyra saker vi håller fast vid.</h2>
          </div>
          <p className="lede">
            Upplägget är enkelt med flit. Du ska veta vad du betalar, vad du får och vem som
            gör jobbet.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map(([t, b], i) => (
            <div key={t} className="border-t-2 border-foreground pt-6">
              <div className="num text-[15px] font-semibold text-primary mb-14">0{i + 1}</div>
              <h3 className="h-s mb-3.5">{t}</h3>
              <p className="muted text-base">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section bg-background-elevated border-y border-line-soft">
      <div className="container mx-auto px-5 md:px-10 max-w-container split">
        <div>
          <div className="label mb-6">Våra sajter</div>
          <h2 className="h-l">En sajt per bransch.</h2>
          <p className="lede mt-7">
            Varje sajt handlar om en enda bransch och har en sida per stad. Där visas företagens
            omdömen från Google och vilket företag vi rekommenderar. Fler branscher är på väg.
          </p>
        </div>
        <div>
          {INDUSTRIES.map((s) => (
            <Link key={s.nicheSlug} to={`/leadsgenerering/${s.nicheSlug}`} className="ind group">
              <span>
                {s.label}
                <small className="block mt-1.5">{s.text}</small>
              </span>
              <Diag />
            </Link>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container mx-auto px-5 md:px-10 max-w-container split">
        <div>
          <div className="label mb-6">Bolaget</div>
          <h2 className="h-l">Vilka som står bakom.</h2>
          <p className="lede mt-7">
            Local Rocket drivs av J.Krasse Marketing AB, grundat av Jesper Krasse. Vi är ett
            litet team, så du pratar med den som faktiskt sköter dina annonser.
          </p>
        </div>
        <div className="bg-background-elevated border border-line-soft rounded-lg px-6 md:px-8 py-2">
          {FACTS.map(([k, v], i) => (
            <div
              key={k}
              className={`flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6 py-5 ${i ? "border-t border-line-soft" : ""}`}
            >
              <span className="text-ink-mute shrink-0">{k}</span>
              <span className="font-semibold sm:text-right">
                {v.includes("@") ? (
                  <a href={`mailto:${v}`} className="text-primary hover:text-primary-hover transition-colors">
                    {v}
                  </a>
                ) : (
                  v
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ContactSection />
    <Footer />
  </div>
);

export default AboutPage;

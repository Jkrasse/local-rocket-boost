import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, MapPin, Megaphone, Search, Share2, ShieldCheck, Zap } from "lucide-react";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getNiche, legacySlugRedirects } from "@/data/niches";

const BASE_URL = "https://localrocket.se";

const NicheLanding = () => {
  const { slug = "" } = useParams<{ slug: string }>();

  if (legacySlugRedirects[slug]) {
    return <Navigate to={`/leadsgenerering/${legacySlugRedirects[slug]}`} replace />;
  }

  const niche = getNiche(slug);

  if (!niche) return <Navigate to="/" replace />;

  const url = `${BASE_URL}/leadsgenerering/${niche.slug}`;
  const nameLower = niche.name === "VVS" ? "VVS" : niche.name.toLowerCase();
  const title = `Leadsgenerering för ${nameLower}: exklusiva förfrågningar | Local Rocket`;
  const description = `Få kvalificerade kundförfrågningar varje vecka. Local Rocket levererar exklusiva leads till ${niche.audienceTitle} i Sverige. En kund per stad, fast pris, ingen bindningstid.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Leadsgenerering för ${niche.name.toLowerCase()}`,
    serviceType: `Lead generation för ${niche.audienceTitle}`,
    provider: { "@type": "Organization", name: "Local Rocket", url: BASE_URL },
    areaServed: { "@type": "Country", name: "Sverige" },
    description,
    url,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo title={title} description={description} canonical={url} jsonLd={[jsonLd, faqLd]} />

      <Navbar />

      <main>
        {/* HERO */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
          <div className="container mx-auto px-4 max-w-container">
            <div className="max-w-3xl">
              <div className="eyebrow mb-5 inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Leadsgenerering för {niche.audienceTitle}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tightest leading-[1.02] mb-6">
                Leadsgenerering för {nameLower}: <span className="italic-accent">exklusiva förfrågningar</span> i din stad.
              </h1>
              <p className="text-ink-soft text-lg md:text-xl max-w-2xl mb-8">
                Bli {niche.nameSingularDef} som syns när kunderna i din stad söker.
                Local Rocket driver trafik via Google Ads, Meta Ads och SEO till en optimerad
                sajt i din nisch, och du får kvalificerade förfrågningar för {niche.service} direkt
                till mejl eller telefon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/signup">
                    Säkra din stad <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/sa-fungerar-det">Så fungerar det</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-mute">
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> En per stad</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Fast månadspris</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Ingen bindningstid</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Säg upp när du vill</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH SHOWCASE */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="eyebrow mb-4">Sökningar vi fångar</div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-6">
                  Dina nästa kunder googlar <span className="italic-accent">just nu</span>.
                </h2>
                <p className="text-ink-soft text-lg">
                  Vi placerar dig högst upp i resultaten på de sökningar som faktiskt leder till bokningar, inte vaga klick.
                </p>
              </div>
              <div className="space-y-3">
                {niche.searchPhrases.map((phrase) => (
                  <div key={phrase} className="bg-background-elevated rounded-2xl px-5 py-4 border border-border/60 flex items-center gap-3">
                    <Search className="w-4 h-4 text-ink-mute shrink-0" />
                    <span className="text-base md:text-lg">{phrase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KANALER / UNDERTJÄNSTER */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Det här ingår</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Tre kanaler, <span className="italic-accent">ett paket</span>.
              </h2>
              <p className="text-ink-soft text-lg mt-6">
                Din leadsgenerering drivs av Google Ads, Meta Ads och SEO tillsammans.
                Allt ingår i månadspriset och sköts av oss.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background-elevated rounded-[20px] p-7 border border-border/60" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-3 leading-tight">Google Ads</h3>
                <p className="text-ink-soft">
                  Annonser på sökningar som "{niche.searchPhrases[0]}" fångar kunder med
                  köpintention samma dag som kampanjen lanseras. Annonsbudget ingår.
                </p>
              </div>
              <div className="bg-background-elevated rounded-[20px] p-7 border border-border/60" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-3 leading-tight">Meta Ads</h3>
                <p className="text-ink-soft">
                  Riktade kampanjer på Facebook och Instagram når kunder i ditt område
                  innan de ens börjat googla. Även här ingår budgeten.
                </p>
              </div>
              <div className="bg-background-elevated rounded-[20px] p-7 border border-border/60" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-3 leading-tight">SEO</h3>
                <p className="text-ink-soft mb-3">
                  Nischsajten är sökoptimerad och byggs ut löpande, så att den organiska
                  synligheten växer månad för månad.
                </p>
                <Link to={`/seo/${niche.slug}`} className="text-primary underline underline-offset-4 hover:no-underline text-sm">
                  Läs mer om SEO för {nameLower}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Varför {niche.audienceTitle} väljer oss</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Tre saker som <span className="italic-accent">flyttar nålen</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {niche.benefits.map((b, i) => {
                const Icon = [Zap, ShieldCheck, MapPin][i];
                return (
                  <div key={b.title} className="bg-background-elevated rounded-[20px] p-7 border border-border/60">
                    <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 leading-tight">{b.title}</h3>
                    <p className="text-ink-soft">{b.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Så fungerar det</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Från avtal till leads på <span className="italic-accent">14 dagar</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { n: "01", t: "Du säkrar staden", d: "Välj din stad i checkout. Platsen reserveras till dig direkt." },
                { n: "02", t: "Vi bygger sajten", d: `En lokal sajt för ${niche.nameSingular} i ${niche.city}, designad för konvertering.` },
                { n: "03", t: "Annonser lanseras", d: "Google Ads och Meta Ads sätts upp och optimeras varje vecka." },
                { n: "04", t: "Leads till dig", d: "Förfrågningar mejlas eller skickas via SMS direkt när de kommer in." },
              ].map((s) => (
                <div key={s.n} className="bg-background-elevated rounded-[20px] p-7 border border-border/60">
                  <div className="text-ink-mute font-mono text-sm mb-4">{s.n}</div>
                  <h3 className="font-serif text-xl mb-2 leading-tight">{s.t}</h3>
                  <p className="text-ink-soft text-sm">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container">
            <div className="bg-dark-section text-dark-section-foreground rounded-[28px] p-10 md:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-5 max-w-2xl mx-auto">
                Bara <span className="italic-accent">en {niche.nameSingular}</span> per stad. Är du den?
              </h2>
              <p className="text-lg opacity-80 max-w-xl mx-auto mb-8">
                Vi släpper bara in ett företag per ort. När platsen är tagen är konkurrenterna utestängda.
              </p>
              <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                <Link to="/signup">
                  Kolla om din stad är ledig <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container max-w-3xl">
            <div className="text-center mb-12">
              <div className="eyebrow mb-5">Vanliga frågor</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Det du <span className="italic-accent">undrar över</span>.
              </h2>
            </div>
            <Accordion type="single" collapsible className="bg-background-elevated rounded-[20px] border border-border/60 px-6">
              {niche.faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                  <AccordionTrigger className="font-serif text-lg text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-ink-soft text-base">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="text-center text-ink-soft mt-10">
              Vill du hellre läsa om hur vi jobbar med synlighet i Google?{" "}
              <Link to={`/seo/${niche.slug}`} className="text-primary underline underline-offset-4 hover:no-underline">
                SEO för {nameLower}
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NicheLanding;

import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, Clock, Globe, Search, Sparkles, TrendingUp } from "lucide-react";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getNiche, legacySlugRedirects } from "@/data/niches";

const BASE_URL = "https://localrocket.se";

const SeoNiche = () => {
  const { slug = "" } = useParams<{ slug: string }>();

  if (legacySlugRedirects[slug]) {
    return <Navigate to={`/seo/${legacySlugRedirects[slug]}`} replace />;
  }

  const niche = getNiche(slug);

  if (!niche) return <Navigate to="/" replace />;

  const url = `${BASE_URL}/seo/${niche.slug}`;
  const title = `SEO för ${niche.audienceTitle}: syns i Google utan eget SEO-arbete | Local Rocket`;
  const description = `SEO för ${niche.audienceTitle} utan månader av eget arbete. Ditt företag listas som rekommenderad partner på vår sökoptimerade nischsajt och tar emot förfrågningarna i din stad.`;

  const seoFaq = [
    {
      q: `Gör ni SEO på min egen webbplats?`,
      a: `Nej. Vi driver synlighet via våra egna nischade directory-sajter som är byggda och optimerade för sökningar efter ${niche.service}. Ditt företag listas som rekommenderad partner och tar emot förfrågningarna, helt utan att du behöver röra din egen webbplats.`,
    },
    {
      q: `Hur lång tid tar det innan jag syns?`,
      a: `Sajten i din nisch är redan byggd och optimerad. Du listas som partner inom 14 dagar från avtal, och medan den organiska synligheten växer driver vi trafik med Google Ads och Meta Ads från start.`,
    },
    {
      q: `Vad kostar det jämfört med att anlita en SEO-byrå?`,
      a: `Vi har två fasta paket: Premium från 3 850 kr/mån och Growth från 6 160 kr/mån vid årsbetalning, med annonsbudget inkluderad. Ingen startavgift och ingen bindningstid utöver perioden.`,
    },
    {
      q: `Kan jag kombinera det här med egen SEO eller en byrå?`,
      a: `Ja. Vår kanal är helt fristående från din egen webbplats. Många partners ser oss som ett komplement: din egen SEO bygger ditt varumärke långsiktigt, medan vi levererar förfrågningar här och nu.`,
    },
    {
      q: `Syns jag även i AI-tjänster som ChatGPT?`,
      a: `När ditt företag lyfts fram som rekommenderad partner på en trovärdig nischsajt ökar chansen att AI-tjänster som ChatGPT och Gemini nämner just dig när någon ber om rekommendationer i din stad.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `SEO för ${niche.audienceTitle}`,
    serviceType: `Sökmotorsynlighet för ${niche.audienceTitle}`,
    provider: { "@type": "Organization", name: "Local Rocket", url: BASE_URL },
    areaServed: { "@type": "Country", name: "Sverige" },
    description,
    url,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoFaq.map((f) => ({
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
                <Search className="w-3.5 h-3.5" /> SEO för {niche.audienceTitle}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tightest leading-[1.02] mb-6">
                Syns i Google, <span className="italic-accent">utan att göra jobbet själv</span>.
              </h1>
              <p className="text-ink-soft text-lg md:text-xl max-w-2xl mb-8">
                Egen SEO tar månader av innehåll, länkar och teknik. Vi har redan byggt en
                sökoptimerad sajt i din nisch. Du listas som rekommenderad partner i din stad
                och tar emot förfrågningarna för {niche.service}.
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
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Färdigbyggd nischsajt</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> En partner per stad</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Fast månadspris</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH SHOWCASE */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="eyebrow mb-4">Sökningar vi optimerar för</div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-6">
                  Det här googlar dina <span className="italic-accent">nästa kunder</span>.
                </h2>
                <p className="text-ink-soft text-lg">
                  Vår nischsajt är byggd sida för sida runt de sökningar som leder till
                  riktiga förfrågningar. När kunderna hittar sajten är det ditt företag
                  som lyfts fram.
                </p>
              </div>
              <div className="space-y-3">
                {niche.searchPhrases.map((phrase) => (
                  <div key={phrase} className="bg-background-elevated rounded-2xl px-5 py-4 border border-border/60 flex items-center gap-3" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                    <Search className="w-4 h-4 text-ink-mute shrink-0" />
                    <span className="text-base md:text-lg">{phrase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS INSTEAD OF DIY */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Varför {niche.audienceTitle} väljer oss</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                SEO-resultaten, utan <span className="italic-accent">SEO-projektet</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Hoppa över uppbyggnadsfasen",
                  body: "Att ranka en egen webbplats tar ofta månader av innehåll, teknik och länkarbete. Vår nischsajt är redan byggd och optimerad. Du kliver in som partner och drar nytta av den direkt.",
                },
                {
                  icon: TrendingUp,
                  title: "SEO och annonser tillsammans",
                  body: "Medan den organiska synligheten arbetar långsiktigt driver vi trafik med Google Ads och Meta Ads. Du får förfrågningar från start, inte om ett halvår.",
                },
                {
                  icon: Sparkles,
                  title: "Synlighet även i AI-svar",
                  body: "När en trovärdig nischsajt lyfter fram ditt företag som rekommenderad partner ökar chansen att AI-tjänster som ChatGPT nämner dig när någon söker hjälp i din stad.",
                },
              ].map((c) => (
                <div key={c.title} className="bg-background-elevated rounded-[20px] p-7 border border-border/60" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                  <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3 leading-tight">{c.title}</h3>
                  <p className="text-ink-soft">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Så fungerar det</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Tre steg till <span className="italic-accent">synlighet</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: "01", t: "Du säkrar din stad", d: `Bara en ${niche.nameSingular} per stad blir partner. När platsen är din är den låst.` },
                { n: "02", t: "Vi sköter synligheten", d: "Nischsajten optimeras löpande för sökningar i din bransch. Annonser driver trafik parallellt." },
                { n: "03", t: "Du tar emot förfrågningarna", d: "Varje lead skickas direkt till din mejl eller telefon, exklusivt för dig." },
              ].map((s) => (
                <div key={s.n} className="bg-background-elevated rounded-[20px] p-7 border border-border/60" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
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
            <div className="bg-dark-section rounded-[28px] p-10 md:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-5 max-w-2xl mx-auto">
                Slipp SEO-jobbet. Behåll <span className="italic-accent">resultaten</span>.
              </h2>
              <p className="text-lg opacity-80 max-w-xl mx-auto mb-8">
                En {niche.nameSingular} per stad får platsen som rekommenderad partner.
                Kolla om din stad fortfarande är ledig.
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
            <Accordion type="single" collapsible className="bg-background-elevated rounded-[20px] border border-border/60 px-6" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
              {seoFaq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                  <AccordionTrigger className="font-serif text-lg text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-ink-soft text-base">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="text-center text-ink-soft mt-10 inline-flex items-center gap-2 w-full justify-center">
              <Globe className="w-4 h-4 text-primary shrink-0" />
              <span>
                Vill du veta mer om själva leadsen?{" "}
                <Link to={`/leadsgenerering/${niche.slug}`} className="text-primary underline underline-offset-4 hover:no-underline">
                  Leadsgenerering för {niche.audienceTitle}
                </Link>
              </span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SeoNiche;

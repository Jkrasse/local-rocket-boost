import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, Clock, FileText, Globe, MapPin, Search, Settings, Sparkles, TrendingUp } from "lucide-react";
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
  const nameLower = niche.name === "VVS" ? "VVS" : niche.name.toLowerCase();
  const title = `SEO för ${nameLower}: syns i Google och få fler kunder | Local Rocket`;
  const description = `SEO för ${nameLower} som ger förfrågningar, inte bara trafik. Syns på sökningar som "${niche.searchPhrases[0]}" via vår sökoptimerade nischsajt. En partner per stad, fast pris.`;

  const included = [
    {
      icon: FileText,
      title: "Sökordsoptimerat innehåll",
      body: `Sidor byggda runt sökningar som "${niche.searchPhrases[0]}" och "${niche.searchPhrases[1]}", skrivna för att både ranka och konvertera.`,
    },
    {
      icon: MapPin,
      title: "Lokala landningssidor",
      body: `Egna sidor per stad och tjänst, så att sajten fångar sökningar efter ${niche.service} exakt där dina kunder finns.`,
    },
    {
      icon: Settings,
      title: "Teknisk SEO",
      body: "Snabb sajt, korrekt struktur, schema-markup och sitemaps. Grunderna som gör att Google förstår och litar på innehållet.",
    },
    {
      icon: TrendingUp,
      title: "Löpande optimering",
      body: "Vi följer sökdata varje månad och bygger ut det som fungerar: nya sidor, bättre innehåll, starkare positioner.",
    },
    {
      icon: Sparkles,
      title: "Synlighet i AI-svar",
      body: "En trovärdig nischsajt som lyfter fram dig ökar chansen att AI-tjänster som ChatGPT och Gemini rekommenderar just ditt företag.",
    },
    {
      icon: Globe,
      title: "SEO på din egen webbplats",
      body: "Vill du även stärka din egen sajt? Vi erbjuder SEO där som tilläggstjänst för partners. Ta upp det i demon.",
    },
  ];

  const seoFaq = [
    {
      q: `Vad ingår i SEO för ${nameLower} hos Local Rocket?`,
      a: `Du listas som rekommenderad partner på vår sökoptimerade nischsajt för ${niche.service}. Vi sköter innehåll, lokala landningssidor, teknisk SEO och löpande optimering. Dessutom driver vi trafik med Google Ads och Meta Ads så att du får förfrågningar redan innan de organiska positionerna byggts upp.`,
    },
    {
      q: `Gör ni SEO på min egen webbplats?`,
      a: `Grundupplägget är att du syns via vår färdigbyggda nischsajt, så att du får effekten av SEO utan eget arbete. Vill du även stärka din egen webbplats erbjuder vi SEO där som tilläggstjänst för partners. Ta upp det i demon så tittar vi på vad som ger mest effekt i din stad.`,
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
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `SEO för ${nameLower}`,
    serviceType: `Sökmotoroptimering för ${nameLower}`,
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
                <Search className="w-3.5 h-3.5" /> Undertjänst till leadsgenerering
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tightest leading-[1.02] mb-6">
                SEO för {nameLower} som ger <span className="italic-accent">kunder</span>, inte bara klick.
              </h1>
              <p className="text-ink-soft text-lg md:text-xl max-w-2xl mb-8">
                Att lyckas med SEO för {nameLower} kräver månader av innehåll,
                länkar och teknik. Vi har redan gjort jobbet: en sökoptimerad nischsajt
                som fångar sökningarna efter {niche.service}. Du listas som rekommenderad
                partner i din stad och tar emot förfrågningarna.
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
                  Lokal SEO för {nameLower} handlar om att äga sökningarna med
                  köpintention. Vår nischsajt är byggd sida för sida runt exakt de
                  sökningarna, och när kunderna hittar dit är det ditt företag som lyfts fram.
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

        {/* WHAT'S INCLUDED */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-5">Vad som ingår</div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                Det här ingår i SEO för <span className="italic-accent">{nameLower}</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {included.map((c) => (
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

        {/* WHY IT WORKS */}
        <section className="py-20 md:py-28 bg-warm">
          <div className="container mx-auto px-4 max-w-container">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="eyebrow mb-4">Därför fungerar det</div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-6">
                  SEO-resultaten, utan <span className="italic-accent">SEO-projektet</span>.
                </h2>
                <p className="text-ink-soft text-lg mb-4">
                  En egen webbplats som ska ranka på "{niche.searchPhrases[0]}" konkurrerar
                  med etablerade sajter som byggt innehåll och länkar i åratal. Det går,
                  men det tar ofta sex till tolv månader innan det ger affärer.
                </p>
                <p className="text-ink-soft text-lg mb-4">
                  Vi vänder på upplägget. Nischsajten är redan byggd, optimerad och
                  fokuserad på en enda sak: sökningar efter {niche.service}. Som
                  rekommenderad partner kliver du in i en position i stället för att
                  bygga en från noll.
                </p>
                <p className="text-ink-soft text-lg">
                  Och medan den organiska synligheten arbetar långsiktigt driver vi
                  trafik med Google Ads och Meta Ads, så att förfrågningarna börjar
                  komma från start.
                </p>
              </div>
              <div className="space-y-4 md:pt-10">
                {[
                  { icon: Clock, t: "Hoppa över uppbyggnadsfasen", d: "Du drar nytta av en färdig, optimerad sajt från dag ett." },
                  { icon: TrendingUp, t: "SEO och annonser tillsammans", d: "Organisk synlighet på sikt, annonstrafik direkt. Båda ingår." },
                  { icon: Check, t: "Exklusivt i din stad", d: `Bara en ${niche.nameSingular} per stad blir partner. Din plats är låst för konkurrenter.` },
                ].map((c) => (
                  <div key={c.t} className="bg-background-elevated rounded-[20px] p-6 border border-border/60 flex gap-4" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
                    <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl mb-1 leading-tight">{c.t}</h3>
                      <p className="text-ink-soft text-sm">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                Frågor om SEO för <span className="italic-accent">{nameLower}</span>.
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
                SEO är en del av vårt leadspaket. Läs mer om{" "}
                <Link to={`/leadsgenerering/${niche.slug}`} className="text-primary underline underline-offset-4 hover:no-underline">
                  leadsgenerering för {nameLower}
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

import { useEffect, useMemo, useState } from "react";
import { Crown, Check, Award, Quote, ChevronDown } from "lucide-react";

type Niche = {
  domain: string;
  domainShort: string;
  brand: string;
  initial: string;
  category: string;
  city: string;
  partner: string;
  intro: string;
  introShort: string;
  description: string;
  phone: string;
  address: string;
  reviews: string;
};

const NICHES: Niche[] = [
  {
    domain: "städfirmor.nu",
    domainShort: "Städfirmor.nu",
    brand: "Städfirmor",
    initial: "S",
    category: "städfirman",
    city: "Stockholm",
    partner: "Freska Sweden AB",
    intro:
      "Letar du efter en pålitlig städfirma? Vi hjälper dig hitta kvalitetsgranskade städföretag — från hemstäd till kontorsstäd.",
    introShort:
      "Pålitliga, kvalitetsgranskade städföretag — hem, flytt och kontor.",
    description:
      "Pålitlig städfirma i Stockholm med erfaren personal och fokus på kvalitet och kundnöjdhet.",
    phone: "+46 20 10 00 15",
    address: "Kungsgatan 12, Stockholm",
    reviews: "3 564",
  },
  {
    domain: "bästatandläkaren.se",
    domainShort: "Bästatandläkaren.se",
    brand: "Tandläkare",
    initial: "T",
    category: "tandläkaren",
    city: "Göteborg",
    partner: "Smile Dental AB",
    intro:
      "Söker du en tandläkare i Göteborg? Vi listar de mest betrodda klinikerna med modern utrustning och hög patientnöjdhet.",
    introShort:
      "Trygga tandläkare i Göteborg — moderna kliniker, goda omdömen.",
    description:
      "Modern tandvårdsklinik i centrala Göteborg med specialister inom estetik och implantat.",
    phone: "+46 31 12 34 56",
    address: "Avenyn 22, Göteborg",
    reviews: "2 187",
  },
  {
    domain: "bilhandlaren.nu",
    domainShort: "Bilhandlaren.nu",
    brand: "Bilhandlare",
    initial: "B",
    category: "bilhandlaren",
    city: "Umeå",
    partner: "Norrlands Bil AB",
    intro:
      "Letar du efter en pålitlig bilhandlare i Umeå? Vi listar auktoriserade aktörer med transparenta priser och garanti.",
    introShort:
      "Auktoriserade bilhandlare i Umeå — transparenta priser, garanti.",
    description:
      "Auktoriserad bilhandlare med över 200 begagnade bilar och fullständig kvalitetsgaranti.",
    phone: "+46 90 18 22 00",
    address: "Industrivägen 8, Umeå",
    reviews: "942",
  },
  {
    domain: "bästatakläggaren.se",
    domainShort: "Bästatakläggaren.se",
    brand: "Takläggare",
    initial: "T",
    category: "takläggaren",
    city: "Malmö",
    partner: "Skåne Tak AB",
    intro:
      "Behöver du lägga om taket? Vi hjälper dig hitta certifierade takläggare i Malmö med försäkring och dokumenterad erfarenhet.",
    introShort:
      "Certifierade takläggare i Malmö — försäkrade och erfarna.",
    description:
      "Certifierad takläggare med 15+ års erfarenhet av tegel-, plåt- och papptak i Skåne.",
    phone: "+46 40 55 11 22",
    address: "Industrigatan 14, Malmö",
    reviews: "1 421",
  },
];

/* ---------- Typewriter ---------- */
const useTypewriter = (text: string, speed = 35) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
};

const useNicheRotation = (intervalMs = 5000) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % NICHES.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return NICHES[idx];
};

/* ---------- Site content ---------- */
const SiteContent = ({ compact = false, niche }: { compact?: boolean; niche: Niche }) => {
  const headline = `Bästa ${niche.category} i ${niche.city} 2026`;
  const typed = useTypewriter(headline, compact ? 28 : 22);
  const intro = compact ? niche.introShort : niche.intro;

  return (
    <>
      {/* Site header */}
      <div className={`flex items-center justify-between border-b border-border ${compact ? "px-3 py-2.5" : "px-6 py-4"}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className={`rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0 ${compact ? "h-5 w-5 text-[10px]" : "h-7 w-7 text-xs"}`}>
            {niche.initial}
          </div>
          <span className={`font-semibold truncate ${compact ? "text-xs" : "text-sm"}`}>{niche.domainShort}</span>
        </div>
        {!compact ? (
          <div className="hidden md:flex items-center gap-5 text-xs text-ink-soft">
            <span>{niche.brand}</span>
            <span>Tjänster</span>
            <span>Om oss</span>
            <span>FAQ</span>
            <span className="bg-[#FF5A1F] text-white px-3 py-1.5 rounded-pill text-xs">Få gratis offert →</span>
          </div>
        ) : (
          <span className="bg-[#FF5A1F] text-white px-2.5 py-1 rounded-pill text-[9px] shrink-0">Offert →</span>
        )}
      </div>

      {/* Hero band */}
      <div className={`bg-warm ${compact ? "px-3.5 py-3.5" : "px-6 py-7"}`}>
        <div className={`font-mono text-ink-mute mb-2 ${compact ? "text-[8px]" : "text-[10px]"}`}>
          Hem › {niche.brand} › {niche.city}
        </div>
        <h3 className={`font-sans font-bold text-foreground leading-tight mb-2 min-h-[2.4em] ${compact ? "text-[15px]" : "text-2xl md:text-3xl mb-3"}`}>
          {typed}
          <span className="inline-block w-[2px] h-[0.9em] bg-foreground align-middle ml-0.5 animate-pulse" />
        </h3>
        <p className={`text-ink-soft ${compact ? "text-[10px] leading-snug mb-2.5" : "text-sm mb-4"}`}>
          {intro}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className={`bg-[#FF5A1F] text-white rounded-pill ${compact ? "text-[9px] px-2.5 py-1" : "text-xs px-4 py-2"}`}>Få gratis offert →</span>
          <span className={`bg-background border border-border rounded-pill text-ink-soft ${compact ? "text-[9px] px-2.5 py-1" : "text-xs px-4 py-2"}`}>
            ★ {niche.reviews} omdömen
          </span>
        </div>
      </div>

      {/* Recommended partner */}
      <div className={compact ? "px-3.5 pt-3 pb-3" : "px-6 py-6"}>
        <div className={`flex items-center gap-1.5 mb-2 text-[#FF5A1F] font-mono tracking-eyebrow uppercase ${compact ? "text-[8px]" : "text-[10px] mb-3"}`}>
          <Crown className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} /> Vår rekommenderade partner
        </div>
        <div className={`border-2 border-[#FF5A1F]/60 rounded-[12px] ${compact ? "p-2.5" : "p-4 flex flex-col md:flex-row gap-4 items-start"}`}>
          {compact ? (
            <>
              <div className="flex gap-2.5">
                <div className="rounded-md border-2 border-dashed border-border flex items-center justify-center font-mono text-[8px] text-ink-mute shrink-0 h-14 w-14">
                  LOGO
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1 mb-1">
                    <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] rounded text-[8px] px-1.5 py-0.5 font-medium">♦ Rekommenderad</span>
                    <span className="bg-primary-soft text-primary rounded text-[8px] px-1.5 py-0.5 font-medium flex items-center gap-0.5">
                      <Check className="h-2 w-2" /> Verifierad
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-[13px] leading-tight truncate">{niche.partner}</h4>
                  <div className="text-ink-soft text-[9px]">
                    ★★★★☆ <span className="font-semibold text-foreground">4.3</span> (611)
                  </div>
                </div>
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-border/60 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-ink-soft">
                <span>📞 {niche.phone}</span>
                <span>📍 {niche.address}</span>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-md border-2 border-dashed border-border flex items-center justify-center font-mono text-[10px] text-ink-mute shrink-0 h-20 w-24">
                LOGO
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] rounded-md text-[10px] px-2 py-1 font-medium">♦ Rekommenderad</span>
                  <span className="bg-primary-soft text-primary rounded-md text-[10px] px-2 py-1 font-medium flex items-center gap-1">
                    <Check className="h-2.5 w-2.5" /> Verifierad
                  </span>
                </div>
                <h4 className="font-sans font-bold text-lg mb-1">{niche.partner}</h4>
                <div className="text-ink-soft text-xs mb-2">
                  ★★★★☆ <span className="font-semibold text-foreground">4.3</span> (611)
                </div>
                <p className="text-xs text-ink-soft mb-2">{niche.description}</p>
                <div className="flex flex-wrap gap-4 text-[11px] text-ink-soft">
                  <span>📞 {niche.phone}</span>
                  <span>📍 {niche.address}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                <span className="bg-[#FF5A1F] text-white text-xs px-4 py-2 rounded-pill text-center">→ Få offert</span>
                <span className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-pill text-center">📞 Ring nu</span>
                <span className="bg-background border border-border text-xs px-4 py-2 rounded-pill text-center text-ink-soft">🌐 Webbplats</span>
              </div>
            </>
          )}
        </div>

        {compact && (
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            <span className="bg-[#FF5A1F] text-white text-[9px] px-1 py-1.5 rounded-pill text-center">Få offert</span>
            <span className="bg-primary text-primary-foreground text-[9px] px-1 py-1.5 rounded-pill text-center">📞 Ring</span>
            <span className="bg-background border border-border text-[9px] px-1 py-1.5 rounded-pill text-center text-ink-soft">🌐 Webb</span>
          </div>
        )}
      </div>

      {/* Compact-only: FAQ-stil + footer */}
      {compact && (
        <>
          <div className="px-3.5 pb-3 space-y-1.5">
            <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-border/60 bg-background-elevated" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
              <div className="flex items-center gap-1.5 min-w-0">
                <Award className="h-3 w-3 text-[#FF5A1F] shrink-0" />
                <span className="text-[9px] font-medium truncate">
                  Varför är {niche.partner} bäst i {niche.city}?
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-ink-mute shrink-0" />
            </div>
            <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-border/60 bg-background-elevated" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
              <div className="flex items-center gap-1.5 min-w-0">
                <Quote className="h-3 w-3 text-ink-mute shrink-0" />
                <span className="text-[9px] font-medium truncate">
                  Vad säger användare om {niche.partner}?
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-ink-mute shrink-0" />
            </div>
            <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-border/60 bg-background-elevated" style={{ backgroundColor: "hsl(var(--background-elevated))" }}>
              <div className="flex items-center gap-1.5 min-w-0">
                <Check className="h-3 w-3 text-primary shrink-0" />
                <span className="text-[9px] font-medium truncate">Hur väljer ni rekommenderad partner?</span>
              </div>
              <ChevronDown className="h-3 w-3 text-ink-mute shrink-0" />
            </div>
          </div>

          <div className="px-3.5 py-2 bg-warm border-t border-border/60 flex items-center justify-around text-[8px] text-ink-soft">
            <span>✓ Gratis offert</span>
            <span>✓ Snabb match</span>
            <span>✓ Trygg partner</span>
          </div>

          <div className="px-3.5 py-2.5 bg-foreground text-background flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded bg-primary flex items-center justify-center text-primary-foreground text-[7px] font-bold">
                {niche.initial}
              </div>
              <span className="text-[9px] font-semibold">{niche.domainShort}</span>
            </div>
            <span className="font-mono text-[7px] text-background/50">© 2026</span>
          </div>
        </>
      )}
    </>
  );
};

const BrowserBar = ({ niche }: { niche: Niche }) => {
  const url = useMemo(() => `${niche.domain} / ${niche.city.toLowerCase()}`, [niche]);
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-warm">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 ml-4 font-mono text-xs text-ink-soft truncate">{url}</div>
    </div>
  );
};

const DirectoryPreview = () => {
  const niche = useNicheRotation(5000);

  return (
    <section className="pb-16 md:pb-28">
      <div className="container mx-auto px-4 max-w-container">
        {/* Mobile: phone frame */}
        <div className="md:hidden max-w-[300px] mx-auto">
          <div className="relative bg-foreground rounded-[44px] p-[10px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-foreground/40">
            <span className="absolute left-[-2px] top-[110px] h-8 w-[3px] rounded-l-sm bg-foreground/80" />
            <span className="absolute left-[-2px] top-[160px] h-12 w-[3px] rounded-l-sm bg-foreground/80" />
            <span className="absolute left-[-2px] top-[220px] h-12 w-[3px] rounded-l-sm bg-foreground/80" />
            <span className="absolute right-[-2px] top-[140px] h-16 w-[3px] rounded-r-sm bg-foreground/80" />

            <div className="relative bg-background rounded-[36px] overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[26px] w-[90px] bg-foreground rounded-full z-20" />
              <div className="h-9" />
              <div className="overflow-hidden pb-4">
                <SiteContent compact niche={niche} />
              </div>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 bg-foreground/30 rounded-full z-20" />
            </div>
          </div>
        </div>

        {/* Desktop: laptop frame */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-foreground rounded-t-[20px] p-3 shadow-2xl">
              <div className="bg-background rounded-[12px] overflow-hidden">
                <BrowserBar niche={niche} />
                <SiteContent niche={niche} />
              </div>
            </div>
            <div className="h-3 bg-foreground/90 rounded-b-[6px] mx-[-12px]" />
            <div className="h-1.5 bg-foreground/60 rounded-b-[20px] mx-[-24px]" />
          </div>
        </div>

        <p className="text-center font-mono text-[11px] md:text-xs tracking-eyebrow text-ink-mute uppercase mt-8 md:mt-10 px-4">
          Så ser det ut när ditt företag listas som rekommenderad partner
        </p>
      </div>
    </section>
  );
};

export default DirectoryPreview;

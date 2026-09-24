import { useEffect, useState } from "react";
import { Phone, Mail, Globe, MapPin, ShieldCheck, BadgeCheck, Star, ChevronDown } from "lucide-react";

/* Mockup av en Local Rocket-nischsajt (samma stil som tandläkarkollen.nu m.fl.) */

type Review = { name: string; initial: string; color: string; date: string; text: string };

type Site = {
  key: string;
  domain: string;
  brand: string;
  theme: { primary: string; accent: string }; // HSL-tokens från nischsajtens site_settings
  category: string; // "städfirman"
  categoryPlural: string; // "Städfirmor" (nav)
  city: string;
  cta: string; // "Boka tid" / "Få gratis offert"
  intro: string;
  rating: string;
  ratingCount: string;
  totalReviews: string;
  description: string;
  reviews: Review[];
};

const PARTNER = "Ditt Företag AB";

const SITES: Site[] = [
  {
    key: "Städfirmor",
    domain: "stadfirmor.nu",
    brand: "Stadfirmor.nu",
    theme: { primary: "160 79% 27%", accent: "25 95% 53%" },
    category: "städfirman",
    categoryPlural: "Städfirmor",
    city: "Stockholm",
    cta: "Få gratis offert",
    intro: "Letar du efter den bästa städfirman i Stockholm? Vi har granskat 20 städfirmor i Stockholm och rekommenderar Ditt Företag AB, med betyget 4,8 av 5 från 190 kunder.",
    rating: "4,8",
    ratingCount: "190",
    totalReviews: "3 564",
    description: "Här visas din beskrivning: vad ni gör, vad ni är bäst på och varför kunderna i Stockholm ska välja er.",
    reviews: [
      { name: "Anna E.", initial: "A", color: "#4C8BD9", date: "juni 2026", text: "Supersnabb service och trevlig personal. Lägenheten var skinande ren efter flyttstädningen." },
      { name: "Johan S.", initial: "J", color: "#2E9E6B", date: "maj 2026", text: "Punktliga, noggranna och rimligt pris. Vi använder dem varannan vecka nu." },
      { name: "Peter L.", initial: "P", color: "#D9822B", date: "april 2026", text: "Bokade kontorsstäd för hela våningen. Tydlig offert och samma team varje gång." },
    ],
  },
  {
    key: "Tandläkare",
    domain: "tandlakarkollen.nu",
    brand: "Tandläkarkollen.nu",
    theme: { primary: "205 75% 38%", accent: "168 55% 42%" },
    category: "tandläkarkliniken",
    categoryPlural: "Tandläkarkliniker",
    city: "Göteborg",
    cta: "Boka tid",
    intro: "Letar du efter den bästa tandläkarkliniken i Göteborg? Vi har granskat 20 tandläkarkliniker i Göteborg och rekommenderar Ditt Företag AB, med betyget 4,8 av 5 från 190 kunder.",
    rating: "4,8",
    ratingCount: "190",
    totalReviews: "3 602",
    description: "Här visas din beskrivning: er klinik, era behandlingar och varför patienterna i Göteborg ska boka hos er.",
    reviews: [
      { name: "Nina H.", initial: "N", color: "#4C8BD9", date: "juni 2026", text: "Supersnabb service och trevlig tandläkare. Kände mig trygg genom hela besöket." },
      { name: "Maria L.", initial: "M", color: "#C24B7A", date: "juni 2026", text: "Vänligt bemötande och snabb hjälp trots semestertider. Rekommenderas varmt." },
      { name: "Cia K.", initial: "C", color: "#2E9E6B", date: "maj 2026", text: "Lagade två hål helt utan obehag. Lugn och noggrann tandläkare, rekommenderas." },
    ],
  },
  {
    key: "Bilhandlare",
    domain: "bilhandlarkollen.se",
    brand: "Bilhandlarkollen.se",
    theme: { primary: "215 70% 30%", accent: "25 95% 53%" },
    category: "bilhandlaren",
    categoryPlural: "Bilhandlare",
    city: "Uppsala",
    cta: "Få gratis offert",
    intro: "Letar du efter den bästa bilhandlaren i Uppsala? Vi har granskat 20 bilhandlare i Uppsala och rekommenderar Ditt Företag AB, med betyget 4,8 av 5 från 190 kunder.",
    rating: "4,8",
    ratingCount: "190",
    totalReviews: "1 402",
    description: "Här visas din beskrivning: ert utbud, era garantier och varför bilköparna i Uppsala ska välja er.",
    reviews: [
      { name: "Erik P.", initial: "E", color: "#2E9E6B", date: "maj 2026", text: "Ärlig affär utan påtryckningar. Bilen var precis som beskriven och garantin gav trygghet." },
      { name: "Sara K.", initial: "S", color: "#D9822B", date: "april 2026", text: "Fick bra betalt för inbytet och hela processen tog under en timme." },
      { name: "Anna R.", initial: "A", color: "#4C8BD9", date: "mars 2026", text: "Hjälpsam personal och bra finansieringsupplägg. Vi kommer tillbaka nästa gång." },
    ],
  },
  {
    key: "Takläggare",
    domain: "takläggarkollen.se",
    brand: "Takläggarkollen.se",
    theme: { primary: "20 55% 30%", accent: "38 92% 50%" },
    category: "takläggaren",
    categoryPlural: "Takläggare",
    city: "Malmö",
    cta: "Få gratis offert",
    intro: "Letar du efter den bästa takläggaren i Malmö? Vi har granskat 20 takläggare i Malmö och rekommenderar Ditt Företag AB, med betyget 4,8 av 5 från 190 kunder.",
    rating: "4,8",
    ratingCount: "190",
    totalReviews: "987",
    description: "Här visas din beskrivning: era takarbeten, era certifikat och varför husägarna i Malmö ska anlita er.",
    reviews: [
      { name: "Lars B.", initial: "L", color: "#4C8BD9", date: "juni 2026", text: "Takbytet gick snabbare än planerat och de städade efter sig varje dag. Mycket nöjd." },
      { name: "Karin O.", initial: "K", color: "#C24B7A", date: "maj 2026", text: "Tydlig offert, inga överraskningar och ett riktigt fint resultat." },
      { name: "Mats E.", initial: "M", color: "#D9822B", date: "april 2026", text: "Ny plåt på hela garaget på två dagar. Proffsigt och prisvärt." },
    ],
  },
];

/* Nischsajternas gemensamma palett; primär/accent kommer per sajt */
const ST = "#F28C28"; // stjärnor
const INK = "#111827";
const MUTE = "#6B7280";
const GRAY = "#F2F4F5";
const LINE = "#E5E7EB";

const Stars = ({ size = 9 }: { size?: number }) => (
  <span className="inline-flex gap-[1px]" style={{ color: ST }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} style={{ width: size, height: size }} fill="currentColor" strokeWidth={0} />
    ))}
  </span>
);

const Pill = ({ bg, color, border, children, size }: { bg: string; color: string; border?: string; children: React.ReactNode; size: number }) => (
  <span
    className="inline-flex items-center justify-center gap-1 rounded-pill font-semibold whitespace-nowrap"
    style={{ background: bg, color, border: border ? `1px solid ${border}` : "none", fontSize: size, padding: `${size * 0.55}px ${size * 1.2}px` }}
  >
    {children}
  </span>
);

/* Skrivmaskinseffekt: skriver rubriken, pausar, suddar och byter sajt */
const useTypewriter = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");
  const full = `Bästa ${SITES[idx].category} i ${SITES[idx].city} 2026`;

  useEffect(() => {
    let t: number;
    if (phase === "typing") {
      if (text.length < full.length) t = window.setTimeout(() => setText(full.slice(0, text.length + 1)), 42);
      else t = window.setTimeout(() => setPhase("hold"), 3200);
    } else if (phase === "hold") {
      t = window.setTimeout(() => setPhase("deleting"), 10);
    } else {
      if (text.length > 0) t = window.setTimeout(() => setText(text.slice(0, -1)), 22);
      else {
        setIdx((i) => (i + 1) % SITES.length);
        setPhase("typing");
      }
    }
    return () => window.clearTimeout(t);
  }, [phase, text, full]);

  return { site: SITES[idx], heading: text };
};

/* ---------- Sajtinnehåll ---------- */
const SiteContent = ({ site, heading, compact = false }: { site: Site; heading: string; compact?: boolean }) => {
  const fs = compact ? 9 : 10.5;
  const T = `hsl(${site.theme.accent})`;
  const BL = `hsl(${site.theme.primary})`;
  const pad = compact ? "10px 12px" : "14px 24px";

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: "#fff", color: INK, fontFamily: "var(--font-body)", fontSize: fs }}>
      {/* Sajtens meny */}
      <div className="flex items-center justify-between border-b" style={{ padding: compact ? "8px 12px" : "10px 24px", borderColor: LINE }}>
        <div className="flex items-center gap-1.5">
          <div className="rounded-full grid place-items-center text-white font-bold" style={{ width: compact ? 16 : 20, height: compact ? 16 : 20, background: BL, fontSize: fs - 1 }}>
            {site.brand[0]}
          </div>
          <b style={{ fontSize: fs + 1.5, letterSpacing: "-.02em" }}>{site.brand}</b>
        </div>
        {!compact && (
          <div className="flex items-center gap-3 font-medium" style={{ fontSize: fs - 0.5, color: "#374151" }}>
            <span>{site.categoryPlural}</span>
            <span>Tjänster</span>
            <span>Guider</span>
            <span>Om oss</span>
            <Pill bg={T} color="#fff" size={fs - 1.5}>{site.cta} →</Pill>
          </div>
        )}
        {compact && <Pill bg={T} color="#fff" size={fs - 1.5}>{site.cta} →</Pill>}
      </div>

      {/* Hero */}
      <div style={{ background: GRAY, padding: pad }}>
        <div style={{ fontSize: fs - 2.5, color: MUTE, marginBottom: 4 }}>Hem › {site.categoryPlural} › {site.city}</div>
        <div className="font-bold" style={{ fontSize: compact ? 15 : 22, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 5, minHeight: compact ? 17 : 24 }}>{heading}<span className="inline-block align-middle ml-[2px] animate-pulse" style={{ width: 2, height: compact ? 13 : 19, background: INK }} /></div>
        <p style={{ margin: "0 0 8px", color: "#374151", lineHeight: 1.45, maxWidth: compact ? "100%" : "72%", fontSize: fs - 0.5 }}>{site.intro}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill bg={T} color="#fff" size={fs - 1}>{site.cta} →</Pill>
          <Pill bg="#fff" color={BL} border={BL} size={fs - 1}><ChevronDown style={{ width: fs - 1, height: fs - 1 }} /> Se vår rekommendation</Pill>
        </div>
        {!compact && (
          <div className="flex gap-4 mt-2.5" style={{ fontSize: fs - 2.5, color: "#4B5563" }}>
            <span className="inline-flex items-center gap-1"><ShieldCheck style={{ width: 9, height: 9, color: BL }} /> Kostnadsfritt & obindande</span>
            <span className="inline-flex items-center gap-1"><BadgeCheck style={{ width: 9, height: 9, color: BL }} /> Kvalitetsgranskad partner</span>
            <span className="inline-flex items-center gap-1"><Star style={{ width: 9, height: 9, color: BL }} /> {site.totalReviews} verifierade omdömen</span>
          </div>
        )}
      </div>

      {/* Rekommenderad partner */}
      <div style={{ padding: compact ? "10px 12px 0" : "12px 24px 0" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="inline-flex items-center gap-1 font-bold uppercase" style={{ fontSize: fs - 2.5, letterSpacing: ".1em", color: T }}>
            <BadgeCheck style={{ width: 9, height: 9 }} /> Vår rekommenderade partner
          </span>
          {!compact && <span style={{ fontSize: fs - 3, color: MUTE }}>Senast granskad 24 juli 2026</span>}
        </div>
        <div className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${T}`, padding: compact ? 10 : 12, boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
          <div className={compact ? "" : "flex gap-4 items-start"}>
            <div className="flex-1 min-w-0">
              <Pill bg={T} color="#fff" size={fs - 2.5}><BadgeCheck style={{ width: 8, height: 8 }} /> Rekommenderad partner</Pill>
              <div className="font-bold" style={{ fontSize: compact ? 13 : 15, letterSpacing: "-.02em", marginTop: 5 }}>{PARTNER}</div>
              <div className="flex items-center gap-1.5" style={{ marginTop: 2 }}>
                <Stars size={compact ? 8 : 10} />
                <b style={{ fontSize: fs - 0.5 }}>{site.rating}</b>
                <span style={{ color: MUTE, fontSize: fs - 2 }}>({site.ratingCount} omdömen)</span>
              </div>
              <p style={{ margin: "5px 0 0", color: "#374151", lineHeight: 1.45, fontSize: fs - 1 }}>{site.description}</p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: 6, fontSize: fs - 2.5, color: MUTE }}>
                <span className="inline-flex items-center gap-1"><MapPin style={{ width: 8, height: 8 }} /> Din adress, {site.city}</span>
                <span className="inline-flex items-center gap-1"><Phone style={{ width: 8, height: 8 }} /> 070-123 45 67</span>
              </div>
            </div>
            <div className={compact ? "grid grid-cols-3 gap-1.5 mt-2.5" : "flex flex-col gap-1.5 shrink-0"} style={{ minWidth: compact ? 0 : 118 }}>
              <Pill bg={T} color="#fff" size={fs - 1.5}><Phone style={{ width: 8, height: 8 }} /> Ring nu</Pill>
              <Pill bg={BL} color="#fff" size={fs - 1.5}><Mail style={{ width: 8, height: 8 }} /> Mejla</Pill>
              <Pill bg={GRAY} color={INK} size={fs - 1.5}><Globe style={{ width: 8, height: 8 }} /> {compact ? "Webb" : "Besök webbplats"}</Pill>
            </div>
          </div>
        </div>
      </div>

      {/* Varför rekommenderar vi */}
      {!compact && (
        <div style={{ padding: "10px 24px 0" }}>
          <div className="rounded-[8px] bg-white" style={{ border: `1px solid ${LINE}`, padding: "10px 14px" }}>
            <div className="font-semibold" style={{ fontSize: fs, marginBottom: 5 }}>Varför rekommenderar vi {PARTNER} som {site.category} i {site.city}?</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ fontSize: fs - 1.5, color: "#374151" }}>
              {[`Betyg ${site.rating} av 5 från ${site.ratingCount} kunder, bland de högst betygsatta i ${site.city}`, "F-skattsedel och ansvarsförsäkring, ett krav för alla våra partners", `Utvald efter granskning av betyg, omdömen och verksamhet`, "Du kontaktar företaget direkt: ring, mejla eller boka via webben"].map((t) => (
                <span key={t} className="inline-flex items-start gap-1"><BadgeCheck style={{ width: 9, height: 9, marginTop: 2, color: BL, flexShrink: 0 }} /> {t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Omdömen */}
      <div className="flex-1 min-h-0" style={{ padding: compact ? "8px 12px 10px" : "10px 24px 14px" }}>
        <div className="rounded-[8px] bg-white h-full overflow-hidden" style={{ border: `1px solid ${LINE}`, padding: compact ? "8px 10px" : "10px 14px" }}>
          <div className="font-semibold" style={{ fontSize: fs, marginBottom: 6 }}>Vad säger användare om {PARTNER}?</div>
          <div className="flex flex-col" style={{ gap: compact ? 6 : 8 }}>
            {site.reviews.map((r) => (
              <div key={r.name} className="flex gap-2">
                <div className="rounded-full grid place-items-center text-white font-semibold shrink-0" style={{ width: compact ? 16 : 20, height: compact ? 16 : 20, background: r.color, fontSize: fs - 2 }}>
                  {r.initial}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <b style={{ fontSize: fs - 1 }}>{r.name}</b>
                    <span style={{ fontSize: fs - 3, color: MUTE }}>· {r.date}</span>
                  </div>
                  <Stars size={compact ? 7 : 8} />
                  <p style={{ margin: "2px 0 0", color: "#374151", lineHeight: 1.4, fontSize: fs - 1.5 }}>"{r.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowserBar = ({ site }: { site: Site }) => (
  <div className="flex items-center gap-1.5 px-3.5 py-2 border-b" style={{ background: "#EFECE5", borderColor: "#E6E3DC" }}>
    <div className="flex gap-1">
      {["#FF5F57", "#FEBC2E", "#28C841"].map((c) => (
        <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
      ))}
    </div>
    <span className="ml-2.5 text-[9.5px] tracking-[.02em]" style={{ color: "#6B7069" }}>
      {site.domain} / {site.city.toLowerCase()}
    </span>
    <span className="ml-auto text-[8.5px] font-semibold tracking-[.1em] text-primary">● LIVE</span>
  </div>
);

/* Showcase: en enda mockup där rubriken skrivs om automatiskt */
const Showcase = () => {
  const { site, heading } = useTypewriter();

  return (
    <div>
      <p className="text-[15px] text-ink-soft max-w-[520px] mb-6">
        Så ser det ut när ditt företag är rekommenderad partner på en av våra sajter.
      </p>

      <div className="bg-foreground rounded-[24px] p-2 md:p-3 shadow-float">
        {/* Desktop */}
        <div className="hidden md:flex flex-col bg-white rounded-[14px] overflow-hidden" style={{ aspectRatio: "16 / 9.9" }}>
          <BrowserBar site={site} />
          <div className="flex-1 min-h-0">
            <SiteContent site={site} heading={heading} />
          </div>
        </div>
        {/* Mobil */}
        <div className="md:hidden flex flex-col bg-white rounded-[14px] overflow-hidden">
          <BrowserBar site={site} />
          <div className="flex-1 min-h-0">
            <SiteContent site={site} heading={heading} compact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;

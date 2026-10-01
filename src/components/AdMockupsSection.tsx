import { BadgeCheck, Globe, MessageCircle, MoreHorizontal, Search, Share2, Star, ThumbsUp, X } from "lucide-react";

const PARTNER = "Ditt Företag AB";
const NAVY = "#1E3354";

/** Bilhandlarkollens runda märke (ratt) som används i annonserna */
const SiteBadge = ({ size = 28 }: { size?: number }) => (
  <span
    className="shrink-0 rounded-full border border-[#e3e5e8] bg-white grid place-items-center"
    style={{ width: size, height: size }}
  >
    <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1F4E79" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M5.8 12h12.4M12 12v6.2" stroke="#fff" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.3" fill="#F28C28" />
    </svg>
  </span>
);

const Skeleton = () => (
  <div className="px-5 py-5 border-t-[6px] border-[#f1f3f4]">
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-full bg-[#e8e8e8]" />
      <div className="flex-1 grid gap-1.5">
        <span className="h-2.5 w-[45%] rounded-sm bg-[#e8e8e8]" />
        <span className="h-2 w-[70%] rounded-sm bg-[#efefef]" />
      </div>
    </div>
    <div className="grid gap-2.5">
      <span className="h-3.5 w-[78%] rounded-sm bg-[#e8e8e8]" />
      <span className="h-2.5 w-full rounded-sm bg-[#efefef]" />
      <span className="h-2.5 w-[60%] rounded-sm bg-[#efefef]" />
    </div>
  </div>
);

const GoogleAd = () => (
  <div className="mx-auto w-full max-w-[400px] rounded-[44px] border-[5px] border-[#d2d2d2] bg-white p-2.5 shadow-card">
    <div
      className="rounded-[32px] border border-[#e6e6e6] bg-white overflow-hidden text-left"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="flex items-center justify-between px-5 pt-6">
        <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
          <path d="M0 1.5h22M0 8h22M0 14.5h22" stroke="#202124" strokeWidth="2" />
        </svg>
        <span className="text-[30px] leading-none tracking-[-0.03em]" style={{ fontFamily: "Arial, sans-serif" }}>
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </span>
        <span className="w-8 h-8 rounded-full bg-[#e8eaed]" />
      </div>

      <div className="mx-5 mt-5 flex items-center gap-3 rounded-pill border border-[#eceef1] px-4 h-12 text-[16px] text-[#202124] shadow-[0_1px_6px_rgba(32,33,36,.18)]">
        <Search className="w-[18px] h-[18px] text-[#9aa0a6]" />
        bilhandlare uppsala
      </div>

      <div className="mx-5 mt-4 flex gap-5 border-b border-[#e3e5e8] text-[13.5px] text-[#5f6368]">
        {["Alla", "Kartor", "Bilder", "Nyheter", "Videor"].map((t, i) => (
          <span key={t} className={`pb-2.5 ${i === 0 ? "font-bold text-[#202124] border-b-[3px] border-[#202124]" : ""}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="text-[13.5px] font-bold text-[#202124] mb-2.5">Sponsrad</div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <SiteBadge />
          <div className="leading-tight min-w-0">
            <div className="text-[14.5px] text-[#202124]">Bilhandlarkollen</div>
            <div className="text-[12px] text-[#4d5156] truncate">https://bilhandlarkollen.se › bilhandlare › uppsala</div>
          </div>
          <span className="ml-auto text-[#5f6368] text-lg leading-none">⋮</span>
        </div>
        <div className="text-[20px] leading-[1.25] text-[#1a0dab] mb-2">Bilhandlare Uppsala | {PARTNER}</div>
        <p className="text-[14px] leading-[1.5] text-[#4d5156]">
          {PARTNER} är vår rekommenderade bilhandlare i Uppsala. Betyg 4,8 av 5 från 190 omdömen. Se
          bilar i lager och boka provkörning.
        </p>
        <div className="flex flex-wrap gap-2 mt-3.5">
          {["Bilar i lager", "Inbyte", "Boka provkörning"].map((c) => (
            <span key={c} className="rounded-pill border border-[#dadce0] px-3 py-1.5 text-[13px] text-[#1a0dab]">
              {c}
            </span>
          ))}
        </div>
      </div>

      <Skeleton />
      <Skeleton />
    </div>
  </div>
);

const MetaAd = () => (
  <div
    className="mx-auto w-full max-w-[460px] rounded-lg border border-line-soft bg-white overflow-hidden shadow-card text-left"
    style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
  >
    <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
      <SiteBadge size={40} />
      <div className="leading-tight">
        <div className="text-[15px] font-bold text-[#050505]">Bilhandlarkollen.se</div>
        <div className="text-[12.5px] text-[#65676b] flex items-center gap-1">
          Sponsrad · <Globe className="w-3 h-3" />
        </div>
      </div>
      <MoreHorizontal className="w-5 h-5 text-[#65676b] ml-auto" />
      <X className="w-5 h-5 text-[#65676b]" />
    </div>
    <p className="px-4 pb-3 text-[14.5px] leading-[1.4] text-[#050505]">
      Dags för ny bil i Uppsala? 🚗 {PARTNER} är Bilhandlarkollens rekommenderade bilhandlare i
      Uppsala, med betyget 4,8 från 190 kundomdömen. Kika in och boka provkörning.
    </p>

    <div className="grid grid-cols-[41%_1fr] aspect-square">
      <div className="flex flex-col items-center justify-center text-center px-3" style={{ background: NAVY }}>
        <BadgeCheck className="w-10 h-10 text-[#8FB4F0]" strokeWidth={1.4} />
        <div className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.22em] leading-[1.7] text-[#F1B45B]">
          Rekommenderad
          <br />
          partner
        </div>
        <div className="mt-3 text-white text-[20px] sm:text-[23px] leading-[1.15]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {PARTNER}
        </div>
        <span className="inline-flex gap-0.5 mt-3.5 text-[#F1B45B]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <div className="mt-2 text-[11.5px] text-white/85">4,8 · 190 omdömen</div>
      </div>
      <div className="flex flex-col justify-center px-[7%] bg-[#F2F0EB]">
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#1F4E79]">Bilhandlarkollen.se</div>
        <div
          className="mt-3 text-[#16181d] text-[27px] sm:text-[34px] leading-[1.05] tracking-[-0.02em]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Letar du efter en bilhandlare du kan lita på i Uppsala?
        </div>
        <div className="mt-4 text-[13.5px] leading-[1.45] text-[#4a4f57]">Vi rekommenderar {PARTNER}.</div>
        <span className="mt-5 inline-flex w-fit items-center gap-2 px-4 py-2.5 text-white text-[13px] font-medium" style={{ background: NAVY }}>
          Se vår partner →
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#f0f2f5]">
      <div className="min-w-0">
        <div className="text-[12px] uppercase text-[#65676b]">bilhandlarkollen.se</div>
        <div className="text-[15.5px] font-bold text-[#050505] leading-snug">{PARTNER}</div>
        <div className="text-[13.5px] text-[#65676b]">Rekommenderad bilhandlare i Uppsala</div>
      </div>
      <span className="shrink-0 rounded-md bg-[#e4e6eb] px-3.5 py-2 text-[14px] font-semibold text-[#050505]">Läs mer</span>
    </div>
    <div className="flex items-center justify-between px-4 py-2.5 text-[13.5px] text-[#65676b]">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-[18px] h-[18px] rounded-full bg-[#1877F2] grid place-items-center">
          <ThumbsUp className="w-2.5 h-2.5 text-white" fill="currentColor" />
        </span>
        18
      </span>
      <span>7 delningar</span>
    </div>
    <div className="flex justify-around border-t border-[#e4e6eb] px-4 py-2.5 text-[13.5px] font-semibold text-[#65676b]">
      <span className="inline-flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Gilla</span>
      <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> Kommentera</span>
      <span className="inline-flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Dela</span>
    </div>
  </div>
);

const AdMockupsSection = () => (
  <section className="section bg-background-elevated border-y border-line-soft">
    <div className="container mx-auto px-5 md:px-10 max-w-container">
      <div className="head">
        <div>
          <div className="label mb-6">Så driver vi trafiken</div>
          <h2 className="h-l">
            Vi annonserar. <span className="italic-accent">Du</span> får kunderna.
          </h2>
        </div>
        <p className="lede">
          Vi kör Google Ads och Meta Ads för directory-sajten i din stad. Annonserna lyfter fram ditt
          företag som rekommenderad partner, med namn och betyg.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-8 items-center">
        <div>
          <div className="eyebrow mb-4 justify-center">Google Ads · sökannons</div>
          <GoogleAd />
        </div>
        <div>
          <div className="eyebrow mb-4 justify-center">Meta Ads · Facebook och Instagram</div>
          <MetaAd />
        </div>
      </div>

      <p className="text-center text-sm text-ink-mute mt-10">
        Exempel med en bilhandlare i Uppsala. Texter och bilder anpassas efter din bransch och stad.
      </p>
    </div>
  </section>
);

export default AdMockupsSection;

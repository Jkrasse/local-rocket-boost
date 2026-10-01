import { BadgeCheck, Globe, MessageCircle, MoreHorizontal, Search, Share2, Star, ThumbsUp } from "lucide-react";

const PARTNER = "Ditt Företag AB";
const SITE = "bilhandlarkollen.se";
const HEADLINE = "Bästa bilhandlaren i Uppsala 2026 – Ditt Företag AB";

const GoogleAd = () => (
  <div className="rounded-lg border border-line-soft bg-white overflow-hidden shadow-card text-left" style={{ fontFamily: "Arial, system-ui, sans-serif" }}>
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#ebebeb]">
      <span className="text-[17px] font-bold tracking-tight">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
      <div className="flex-1 flex items-center gap-2 rounded-pill border border-[#dfe1e5] px-3.5 py-2 text-[13px] text-[#202124]">
        <Search className="w-3.5 h-3.5 text-[#9aa0a6]" />
        bilhandlare uppsala
      </div>
    </div>
    <div className="px-4 py-4">
      <div className="text-[12px] font-bold text-[#202124] mb-1.5">Sponsrad</div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-[#2E5FB0] text-white text-[11px] font-bold grid place-items-center">B</span>
        <div className="leading-tight">
          <div className="text-[12.5px] text-[#202124]">Bilhandlarkollen.se</div>
          <div className="text-[11px] text-[#4d5156]">https://www.{SITE} › uppsala</div>
        </div>
      </div>
      <div className="text-[17px] leading-snug text-[#1a0dab] mb-1">{HEADLINE}</div>
      <p className="text-[12.5px] leading-relaxed text-[#4d5156]">
        Vi har granskat 20 bilhandlare i Uppsala och rekommenderar {PARTNER}, med betyget 4,8 av 5
        från 190 kunder. Ring, mejla eller boka provkörning direkt.
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-[13px] text-[#1a0dab]">
        <span>Se vår rekommendation</span>
        <span>Omdömen från kunder</span>
        <span>Boka provkörning</span>
        <span>Ring direkt</span>
      </div>
    </div>
    <div className="px-4 py-3 border-t border-[#ebebeb] opacity-45">
      <div className="text-[12px] text-[#4d5156]">www.exempelsajt.se › bilar</div>
      <div className="text-[15px] text-[#1a0dab]">Begagnade bilar i Uppsala – hundratals annonser</div>
    </div>
  </div>
);

const MetaAd = () => (
  <div className="rounded-lg border border-line-soft bg-white overflow-hidden shadow-card text-left" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
    <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
      <span className="w-9 h-9 rounded-full bg-[#2E5FB0] text-white text-sm font-bold grid place-items-center">B</span>
      <div className="leading-tight">
        <div className="text-[14px] font-semibold text-[#050505]">Bilhandlarkollen.se</div>
        <div className="text-[12px] text-[#65676b] flex items-center gap-1">
          Sponsrad · <Globe className="w-3 h-3" />
        </div>
      </div>
      <MoreHorizontal className="w-5 h-5 text-[#65676b] ml-auto" />
    </div>
    <p className="px-4 pb-3 text-[14px] leading-snug text-[#050505]">
      Letar du efter en pålitlig bilhandlare i Uppsala? Vi har granskat 20 bilhandlare. Se vem vi
      rekommenderar.
    </p>
    <div className="px-6 py-7" style={{ background: "linear-gradient(135deg, #1F4C30 0%, #265A39 55%, #3d7a52 100%)" }}>
      <div className="bg-white rounded-lg p-4 shadow-float">
        <div className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[#3E9B7A] flex items-center gap-1 mb-2">
          <BadgeCheck className="w-3 h-3" /> Vår rekommenderade partner
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 shrink-0 rounded-md border-[1.5px] border-dashed border-[#cfc9bb] grid place-items-center text-[8px] font-semibold text-[#8c887d] text-center leading-tight">
            DIN<br />LOGO
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-bold text-[#111827] leading-tight">{PARTNER}</div>
            <div className="flex items-center gap-1 text-[12px] text-[#111827] mt-0.5">
              <span className="inline-flex gap-px text-[#F28C28]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3 h-3" fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <b>4,8</b>
              <span className="text-[#6b7280]">(190 omdömen)</span>
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-pill text-white text-[12px] font-bold text-center py-2" style={{ background: "#3E9B7A" }}>
          Boka provkörning →
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#f0f2f5]">
      <div className="min-w-0">
        <div className="text-[11.5px] uppercase text-[#65676b]">{SITE}</div>
        <div className="text-[14.5px] font-semibold text-[#050505] leading-snug">
          {PARTNER} – rekommenderad partner i Uppsala
        </div>
      </div>
      <span className="shrink-0 rounded-md bg-[#e4e6eb] px-3 py-2 text-[13.5px] font-semibold text-[#050505]">Läs mer</span>
    </div>
    <div className="flex justify-around border-t border-[#e4e6eb] px-4 py-2 text-[12.5px] font-semibold text-[#65676b]">
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
          Vi kör Google Ads och Meta Ads för directory-sajten i din stad. Annonserna leder till sidan
          där ditt företag är rekommenderad partner.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div>
          <div className="eyebrow mb-3">Google Ads · sökannons</div>
          <GoogleAd />
        </div>
        <div>
          <div className="eyebrow mb-3">Meta Ads · Facebook och Instagram</div>
          <MetaAd />
        </div>
      </div>

      <p className="text-center text-sm text-ink-mute mt-10">
        Exempel på annonser. Texter och bilder anpassas efter din bransch och stad.
      </p>
    </div>
  </section>
);

export default AdMockupsSection;

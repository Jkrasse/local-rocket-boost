import { Crown, Check } from "lucide-react";

const SiteContent = ({ compact = false }: { compact?: boolean }) => (
  <>
    {/* Site header */}
    <div className={`flex items-center justify-between border-b border-border ${compact ? "px-3 py-2.5" : "px-6 py-4"}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={`rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0 ${compact ? "h-5 w-5 text-[10px]" : "h-7 w-7 text-xs"}`}>S</div>
        <span className={`font-semibold truncate ${compact ? "text-xs" : "text-sm"}`}>Städfirmor.nu</span>
      </div>
      {!compact ? (
        <div className="hidden md:flex items-center gap-5 text-xs text-ink-soft">
          <span>Städfirmor</span>
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
    <div className={`bg-warm ${compact ? "px-3 py-4" : "px-6 py-7"}`}>
      <div className={`font-mono text-ink-mute mb-2 ${compact ? "text-[8px]" : "text-[10px]"}`}>
        Hem › Städfirmor › Stockholm
      </div>
      <h3 className={`font-sans font-bold text-foreground leading-tight mb-2 ${compact ? "text-base" : "text-2xl md:text-3xl mb-3"}`}>
        Bästa städfirman i Stockholm 2026
      </h3>
      {!compact && (
        <p className="text-sm text-ink-soft mb-4">
          Letar du efter en pålitlig städfirma? Vi hjälper dig hitta kvalitetsgranskade städföretag — från hemstäd till kontorsstäd.
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        <span className={`bg-[#FF5A1F] text-white rounded-pill ${compact ? "text-[9px] px-2.5 py-1" : "text-xs px-4 py-2"}`}>Få gratis offert →</span>
        {!compact && (
          <span className="bg-background border border-border text-xs px-4 py-2 rounded-pill text-ink-soft">▾ Se rekommendation</span>
        )}
      </div>
    </div>

    {/* Recommended partner */}
    <div className={compact ? "px-3 py-3" : "px-6 py-6"}>
      <div className={`flex items-center gap-1.5 mb-2 text-[#FF5A1F] font-mono tracking-eyebrow uppercase ${compact ? "text-[8px]" : "text-[10px] mb-3"}`}>
        <Crown className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} /> Vår rekommenderade partner
      </div>
      <div className={`border-2 border-[#FF5A1F]/60 rounded-[12px] flex flex-col md:flex-row gap-3 items-start ${compact ? "p-2.5" : "p-4 gap-4"}`}>
        <div className={`rounded-md border-2 border-dashed border-border flex items-center justify-center font-mono text-ink-mute shrink-0 ${compact ? "h-12 w-14 text-[8px]" : "h-20 w-24 text-[10px]"}`}>
          LOGO
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-1.5">
            <span className={`bg-[#FF5A1F]/10 text-[#FF5A1F] rounded-md font-medium ${compact ? "text-[8px] px-1.5 py-0.5" : "text-[10px] px-2 py-1"}`}>♦ Rekommenderad</span>
            <span className={`bg-primary-soft text-primary rounded-md font-medium flex items-center gap-1 ${compact ? "text-[8px] px-1.5 py-0.5" : "text-[10px] px-2 py-1"}`}>
              <Check className={compact ? "h-2 w-2" : "h-2.5 w-2.5"} /> Verifierad
            </span>
          </div>
          <h4 className={`font-sans font-bold mb-1 ${compact ? "text-sm" : "text-lg"}`}>{"{Ditt företag}"}</h4>
          <div className={`text-ink-soft ${compact ? "text-[9px] mb-1" : "text-xs mb-2"}`}>
            ★★★★☆ <span className="font-semibold text-foreground">4.3</span> (611)
          </div>
          {!compact && (
            <p className="text-xs text-ink-soft mb-2">
              Pålitlig städfirma i Stockholm med erfaren personal och fokus på kvalitet.
            </p>
          )}
          <div className={`flex flex-wrap gap-2 text-ink-soft ${compact ? "text-[8px]" : "text-[11px] gap-4"}`}>
            <span>📞 +46 20 10 00 15</span>
            <span>📍 Kungsgatan 12, Stockholm</span>
          </div>
        </div>
        {!compact && (
          <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
            <span className="bg-[#FF5A1F] text-white text-xs px-4 py-2 rounded-pill text-center">→ Få offert</span>
            <span className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-pill text-center">📞 Ring nu</span>
            <span className="bg-background border border-border text-xs px-4 py-2 rounded-pill text-center text-ink-soft">🌐 Webbplats</span>
          </div>
        )}
      </div>
      {compact && (
        <div className="flex gap-1.5 mt-2">
          <span className="flex-1 bg-[#FF5A1F] text-white text-[9px] px-2 py-1.5 rounded-pill text-center">Få offert</span>
          <span className="flex-1 bg-primary text-primary-foreground text-[9px] px-2 py-1.5 rounded-pill text-center">Ring</span>
        </div>
      )}
    </div>
  </>
);

const BrowserBar = () => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-warm">
    <div className="flex gap-1.5">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
    <div className="flex-1 ml-4 font-mono text-xs text-ink-soft truncate">
      städfirmor.nu / stockholm
    </div>
  </div>
);

const DirectoryPreview = () => {
  return (
    <section className="pb-16 md:pb-28">
      <div className="container mx-auto px-4 max-w-container">
        {/* Mobile: phone frame */}
        <div className="md:hidden max-w-[320px] mx-auto">
          <div className="relative bg-foreground rounded-[40px] p-2.5 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 bg-foreground rounded-b-[14px] z-10" />
            <div className="bg-background rounded-[32px] overflow-hidden">
              <div className="pt-6">
                <SiteContent compact />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: laptop frame */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-foreground rounded-t-[20px] p-3 shadow-2xl">
              <div className="bg-background rounded-[12px] overflow-hidden">
                <BrowserBar />
                <SiteContent />
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

import { Phone, Globe, Crown, Check } from "lucide-react";

const DirectoryPreview = () => {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container mx-auto px-4 max-w-container">
        <div className="max-w-5xl mx-auto">
          {/* Laptop frame */}
          <div className="relative">
            <div className="bg-foreground rounded-t-[20px] p-3 shadow-2xl">
              {/* Browser chrome */}
              <div className="bg-background rounded-[12px] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-warm">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 ml-4 font-mono text-xs text-ink-soft">
                    städfirmor.nu / stockholm
                  </div>
                </div>

                {/* Site header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">S</div>
                    <span className="font-semibold">Städfirmor.nu</span>
                  </div>
                  <div className="hidden md:flex items-center gap-5 text-xs text-ink-soft">
                    <span>Städfirmor</span>
                    <span>Tjänster</span>
                    <span>Om oss</span>
                    <span>FAQ</span>
                    <span>Kontakta oss</span>
                    <span className="bg-[#FF5A1F] text-white px-3 py-1.5 rounded-pill text-xs">Få gratis offert →</span>
                  </div>
                </div>

                {/* Hero band */}
                <div className="bg-warm px-6 py-7">
                  <div className="font-mono text-[10px] text-ink-mute mb-2">Hem › Städfirmor › Stockholm</div>
                  <h3 className="font-sans font-bold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                    Bästa städfirman i Stockholm 2026
                  </h3>
                  <p className="text-sm text-ink-soft mb-4 max-w-3xl">
                    Letar du efter en pålitlig städfirma? Vi hjälper dig hitta kvalitetsgranskade städföretag i hela Sverige — från hemstäd och flyttstäd till kontorsstäd.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#FF5A1F] text-white text-xs px-4 py-2 rounded-pill">Få gratis offert →</span>
                    <span className="bg-background border border-border text-xs px-4 py-2 rounded-pill text-ink-soft">▾ Se vår rekommendation</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[11px] text-ink-soft">
                    <span>⊘ Gratis offert</span>
                    <span>♦ Kvalitetsgranskad partner</span>
                    <span>★ 3 564 verifierade omdömen</span>
                  </div>
                </div>

                {/* Recommended partner */}
                <div className="px-6 py-6">
                  <div className="flex items-center gap-2 mb-3 text-[#FF5A1F] font-mono text-[10px] tracking-eyebrow uppercase">
                    <Crown className="h-3 w-3" /> Vår rekommenderade partner
                  </div>
                  <div className="border-2 border-[#FF5A1F]/60 rounded-[14px] p-4 flex flex-col md:flex-row gap-4 items-start">
                    <div className="h-20 w-24 rounded-md border-2 border-dashed border-border flex items-center justify-center text-[10px] font-mono text-ink-mute shrink-0">
                      LOGO
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] text-[10px] px-2 py-1 rounded-md font-medium">♦ Rekommenderad partner</span>
                        <span className="bg-primary-soft text-primary text-[10px] px-2 py-1 rounded-md font-medium flex items-center gap-1"><Check className="h-2.5 w-2.5" /> Verifierad</span>
                        <span className="bg-warm text-ink-soft text-[10px] px-2 py-1 rounded-md">8+ år i branschen</span>
                      </div>
                      <h4 className="font-sans font-bold text-lg mb-1">{"{Ditt företag}"}</h4>
                      <div className="text-xs text-ink-soft mb-2">★★★★☆ <span className="font-semibold text-foreground">4.3</span> (611)</div>
                      <p className="text-xs text-ink-soft mb-2">
                        Pålitlig städfirma i Stockholm med erfaren personal, professionella tjänster och fokus på kvalitet och kundnöjdhet.
                      </p>
                      <div className="flex flex-wrap gap-4 text-[11px] text-ink-soft">
                        <span>📞 +46 20 10 00 15</span>
                        <span>📍 Kungsgatan 12, 111 43 Stockholm</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <span className="bg-[#FF5A1F] text-white text-xs px-4 py-2 rounded-pill text-center">→ Få offert</span>
                      <span className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-pill text-center">📞 Ring nu</span>
                      <span className="bg-background border border-border text-xs px-4 py-2 rounded-pill text-center text-ink-soft">🌐 Webbplats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* laptop base */}
            <div className="h-3 bg-foreground/90 rounded-b-[6px] mx-[-12px]" />
            <div className="h-1.5 bg-foreground/60 rounded-b-[20px] mx-[-24px]" />
          </div>

          <p className="text-center font-mono text-xs tracking-eyebrow text-ink-mute uppercase mt-10">
            Så ser det ut när ditt företag listas som rekommenderad partner
          </p>
        </div>
      </div>
    </section>
  );
};

export default DirectoryPreview;

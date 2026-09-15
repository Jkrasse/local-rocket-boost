import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const rows = [
  ["Telefon", "070-123 45 67"],
  ["E-post", "anna.e@exempel.se"],
  ["Område", "Stockholm, Södermalm"],
  ["Önskat datum", "Inom 2 veckor"],
];

const LeadExampleSection = () => {
  return (
    <section className="section bg-dark-section overflow-hidden">
      <div
        className="absolute -right-[10%] -top-[20%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(38,90,57,.35), transparent 60%)" }}
      />
      <div className="container mx-auto px-5 md:px-8 max-w-container relative">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <div className="eyebrow mb-5" style={{ color: "rgba(247,245,240,.5)" }}>
              Vad du får
            </div>
            <h2 className="font-serif text-[clamp(40px,5vw,68px)] tracking-[-0.03em] leading-[1.02] mb-7 text-background">
              Så ser en <span className="italic font-normal" style={{ color: "#7FB08F" }}>lead</span> ut
            </h2>
            <p className="text-[17px] leading-[1.65] mb-[18px]" style={{ color: "rgba(247,245,240,.78)" }}>
              Varje förfrågan innehåller namn, kontaktuppgifter, tjänst och område.
              Den skickas direkt till din mejl eller telefon i samma sekund som
              kunden skickar formuläret.
            </p>
            <p className="text-[17px] leading-[1.65] mb-10" style={{ color: "rgba(247,245,240,.78)" }}>
              Inga delade listor. Ingen budgivning om samma kund. Leaden är din
              och bara din.
            </p>
            <Button variant="hero" asChild>
              <a href="/priser">
                Se priser <ArrowRight />
              </a>
            </Button>
          </div>

          <div className="bg-background text-foreground rounded-xl overflow-hidden shadow-float">
            <div className="flex items-center gap-3 px-5 md:px-7 py-5 bg-warm border-b border-line">
              <div className="h-9 w-9 rounded-full bg-primary text-white font-bold text-sm grid place-items-center shrink-0">
                S
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">Ny lead från Städfirmor.nu</div>
                <div className="text-xs text-ink-mute">till dig · nu</div>
              </div>
              <span className="eyebrow ml-auto text-[10px] shrink-0">Exempel</span>
            </div>

            <div className="p-5 md:p-7">
              <div className="eyebrow mb-1.5">Tjänst</div>
              <div className="font-serif text-[26px] md:text-[28px] mb-5">Flyttstädning, 3 rok</div>

              <div className="flex flex-col gap-2">
                {rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[104px_1fr] md:grid-cols-[120px_1fr] gap-4 items-center px-4 md:px-[18px] py-3.5 bg-background-elevated border border-line rounded-[12px]"
                  >
                    <span className="eyebrow text-[10px]">{k}</span>
                    <span className="text-[15px] font-medium truncate">{v}</span>
                  </div>
                ))}
              </div>

              <p className="mt-[22px] text-[15px] text-ink-soft leading-[1.55] italic">
                "Hej! Vi flyttar ut den 15:e och behöver flyttstädning med garanti. Kan ni lämna pris?"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadExampleSection;

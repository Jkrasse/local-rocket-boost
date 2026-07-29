import { Mail, Phone, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fields = [
  { icon: Phone, label: "Telefon", value: "070-123 45 67" },
  { icon: Mail, label: "E-post", value: "anna.e@exempel.se" },
  { icon: MapPin, label: "Område", value: "Stockholm, Södermalm" },
  { icon: Calendar, label: "Önskat datum", value: "Inom 2 veckor" },
];

const LeadExampleSection = () => {
  return (
    <section className="py-24 md:py-32 bg-dark-section">
      <div className="container mx-auto px-4 max-w-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto">
          <div>
            <div className="font-mono text-xs tracking-eyebrow text-background/60 uppercase mb-5">
              Vad du får
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] text-background mb-6">
              Så ser en <span className="italic-accent">lead</span> ut
            </h2>
            <p className="text-lg text-background/80 leading-relaxed mb-6">
              Varje förfrågan innehåller namn, kontaktuppgifter, tjänst och område.
              Den skickas direkt till din mejl eller telefon i samma sekund som
              kunden skickar formuläret.
            </p>
            <p className="text-lg text-background/80 leading-relaxed mb-10">
              Inga delade listor. Ingen budgivning om samma kund. Leaden är din
              och bara din.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="/#pricing">
                Se priser <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="relative bg-background rounded-[20px] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-warm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                    S
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      Ny lead från Städfirmor.nu
                    </div>
                    <div className="text-xs text-ink-mute">till dig · nu</div>
                  </div>
                </div>
                <span className="font-mono text-[9px] tracking-eyebrow uppercase bg-primary-soft text-primary px-2 py-1 rounded-pill shrink-0">
                  Exempel
                </span>
              </div>

              <div className="px-5 py-5">
                <div className="mb-4">
                  <div className="font-mono text-[10px] tracking-eyebrow uppercase text-ink-mute mb-1">
                    Tjänst
                  </div>
                  <div className="font-serif text-xl text-foreground">
                    Flyttstädning, 3 rok
                  </div>
                </div>

                <div className="space-y-2.5">
                  {fields.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 rounded-[12px] border border-border/60 bg-warm px-4 py-3"
                    >
                      <f.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-mono text-[10px] tracking-eyebrow uppercase text-ink-mute w-24 shrink-0">
                        {f.label}
                      </span>
                      <span className="text-sm text-foreground truncate">{f.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[12px] bg-primary-soft/60 px-4 py-3 text-sm text-ink-soft">
                  "Hej! Vi flyttar ut den 15:e och behöver flyttstädning med
                  garanti. Kan ni lämna pris?"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadExampleSection;

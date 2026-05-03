import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-section">
      <div className="container mx-auto px-4 max-w-container">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="font-mono text-xs tracking-eyebrow text-background/60 uppercase mb-5">Kom igång</div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
              Boka en <span className="italic-accent">30-min demo</span>
            </h2>
            <p className="text-lg text-background/80 leading-relaxed mb-10">
              Vi visar exakt hur många leads din bransch och region kan generera — innan du tecknar något avtal.
            </p>

            <div className="space-y-5 font-mono text-sm">
              {[
                ["Genomsnittlig demo", "28 minuter"],
                ["Inga säljpresentationer", "Vi visar dina siffror"],
                ["Kontakta oss direkt", "kontakt@localrocket.agency"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 pb-4 border-b border-background/10">
                  <span className="uppercase tracking-eyebrow text-background/60 text-xs">{k}</span>
                  <span className="text-background text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="bg-background/5 border border-background/10 rounded-[24px] p-8 space-y-5">
            {[
              { id: "name", label: "Namn", type: "text" },
              { id: "company", label: "Företag", type: "text" },
              { id: "email", label: "E-post", type: "email" },
              { id: "phone", label: "Telefon", type: "tel" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block font-mono text-[11px] tracking-eyebrow uppercase text-background/60 mb-2">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  className="w-full bg-background/5 border border-background/15 rounded-md px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <Button variant="hero" size="lg" className="w-full">
              Boka demo <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

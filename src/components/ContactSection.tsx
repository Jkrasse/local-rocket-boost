import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CONTACT_EMAIL = "kontakt@localrocket.agency";

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "" });

  const handleChange = (id: string, value: string) =>
    setValues((v) => ({ ...v, [id]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demoförfrågan: ${values.company || values.name}`);
    const body = encodeURIComponent(
      `Namn: ${values.name}\nFöretag: ${values.company}\nE-post: ${values.email}\nTelefon: ${values.phone}\n\nJag vill boka en demo av Local Rocket.`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-section">
      <div className="container mx-auto px-4 max-w-container">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="font-mono text-xs tracking-eyebrow text-background/60 uppercase mb-5">Kom igång</div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[1.05] mb-6">
              Boka en <span className="italic-accent">30-min demo</span>
            </h2>
            <p className="text-lg text-background/80 leading-relaxed mb-10">
              Vi visar sajten i din bransch, hur annonserna ser ut och om din stad
              fortfarande är ledig. Inga säljmanus och inget krav på avtal.
            </p>

            <div className="space-y-5 font-mono text-sm">
              {[
                ["Digital demo", "Cirka 30 minuter"],
                ["Du får se", "Sajt, annonser och ledig plats i din stad"],
                ["Kontakta oss direkt", CONTACT_EMAIL],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 pb-4 border-b border-background/10">
                  <span className="uppercase tracking-eyebrow text-background/60 text-xs">{k}</span>
                  <span className="text-background text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-background/5 border border-background/10 rounded-[24px] p-8 space-y-5">
            {[
              { id: "name", label: "Namn", type: "text", required: true },
              { id: "company", label: "Företag", type: "text", required: true },
              { id: "email", label: "E-post", type: "email", required: true },
              { id: "phone", label: "Telefon", type: "tel", required: false },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block font-mono text-[11px] tracking-eyebrow uppercase text-background/60 mb-2">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required={f.required}
                  value={values[f.id as keyof typeof values]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  className="w-full bg-background/5 border border-background/15 rounded-md px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Boka demo <ArrowRight className="h-4 w-4" />
            </Button>
            {sent && (
              <p className="flex items-center gap-2 text-sm text-background/80">
                <Check className="h-4 w-4 text-primary" />
                Ditt mejlprogram öppnas med förfrågan. Går det inte, mejla oss direkt på {CONTACT_EMAIL}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { niches } from "@/data/niches";

const CONTACT_EMAIL = "kontakt@localrocket.agency";
const branscher = [...Object.values(niches).map((n) => n.name), "Annat"];
const stader = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Annan"];

const fieldClass =
  "w-full bg-background border border-line rounded-[10px] px-3.5 py-[13px] text-[15px] text-foreground placeholder:text-ink-mute outline-none transition-colors focus:border-primary focus:bg-white";

const Field = ({
  id,
  label,
  type = "text",
  placeholder,
  options,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label htmlFor={id} className="flex flex-col gap-2">
    <span className="eyebrow text-[10px]">{label}</span>
    {options ? (
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass} required={required}>
        <option value="" disabled>
          Välj…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      />
    )}
  </label>
);

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [v, setV] = useState({ name: "", company: "", email: "", phone: "", bransch: "", stad: "" });
  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demoförfrågan: ${v.company || v.name}`);
    const body = encodeURIComponent(
      `Namn: ${v.name}\nFöretag: ${v.company}\nE-post: ${v.email}\nTelefon: ${v.phone}\nBransch: ${v.bransch}\nStad: ${v.stad}\n\nJag vill boka en demo av Local Rocket.`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          <div>
            <div className="eyebrow mb-5">Kom igång</div>
            <h2 className="font-serif text-[clamp(40px,5vw,68px)] tracking-[-0.03em] leading-[1.02] mb-6">
              Boka en <span className="italic-accent">30-minuters demo</span>
            </h2>
            <p className="text-lg text-ink-soft leading-[1.6] mb-10 max-w-[480px]">
              Vi visar sajten i din bransch, hur annonserna ser ut och om platsen
              som rekommenderad partner i din stad fortfarande är ledig. Inga
              säljmanus och inget krav på avtal.
            </p>
            <div className="flex flex-col">
              {[
                ["E-post", CONTACT_EMAIL],
                ["Demo", "Cirka 30 minuter, digitalt"],
                ["Du får se", "Sajt, annonser och ledig plats i din stad"],
              ].map(([k, val]) => (
                <div key={k} className="flex justify-between gap-6 py-4 border-t border-line">
                  <span className="eyebrow shrink-0">{k}</span>
                  <span className="text-[15px] font-medium text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background-elevated border border-line rounded-xl p-6 md:p-10">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary text-white grid place-items-center mx-auto mb-5">
                  <Check className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="font-serif text-[30px] mb-2.5">Tack!</h3>
                <p className="text-ink-soft">
                  Ditt mejlprogram öppnas med förfrågan ifylld. Går det inte, mejla oss
                  direkt på {CONTACT_EMAIL}. Vi hör av oss inom kort.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                <Field id="name" label="Namn" placeholder="Anna Andersson" required value={v.name} onChange={set("name")} />
                <Field id="company" label="Företag" placeholder="Ditt Företag AB" required value={v.company} onChange={set("company")} />
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <Field id="email" label="E-post" type="email" placeholder="anna@foretag.se" required value={v.email} onChange={set("email")} />
                  <Field id="phone" label="Telefon" type="tel" placeholder="070-123 45 67" value={v.phone} onChange={set("phone")} />
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <Field id="bransch" label="Bransch" options={branscher} value={v.bransch} onChange={set("bransch")} />
                  <Field id="stad" label="Stad" options={stader} value={v.stad} onChange={set("stad")} />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
                  Boka demo <ArrowRight />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

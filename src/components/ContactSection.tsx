import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";

const CONTACT_EMAIL = "kontakt@localrocket.agency";
const INTERESTS = ["Leads-generering", "Lokal SEO", "Google Ads", "Meta Ads", "Vet inte än"];

export const ContactForm = ({ defaultInterest = "Leads-generering" }: { defaultInterest?: string }) => {
  const [sent, setSent] = useState(false);
  const [v, setV] = useState({ name: "", company: "", email: "", phone: "", interest: defaultInterest });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demoförfrågan: ${v.company || v.name}`);
    const body = encodeURIComponent(
      `Namn: ${v.name}\nFöretag: ${v.company}\nE-post: ${v.email}\nTelefon: ${v.phone}\nIntresserad av: ${v.interest}\n\nJag vill boka en demo av Local Rocket.`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="bg-background-elevated border border-line-soft rounded-xl p-6 md:p-10 text-foreground">
      {sent ? (
        <div className="py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white grid place-items-center mx-auto mb-5">
            <Check className="w-[22px] h-[22px]" />
          </div>
          <h3 className="h-m">Tack!</h3>
          <p className="muted mt-2.5">
            Ditt mejlprogram öppnas med förfrågan ifylld. Går det inte, mejla oss direkt på {CONTACT_EMAIL}.
            Vi hör av oss inom kort.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <h3 className="h-s mb-2">Boka en 30-minuters demo</h3>
          <div className="grid sm:grid-cols-2 gap-3.5">
            <label className="flabel">
              Namn
              <input className="field" placeholder="Anna Andersson" required value={v.name} onChange={set("name")} autoComplete="name" />
            </label>
            <label className="flabel">
              Företag
              <input className="field" placeholder="Ditt Företag AB" required value={v.company} onChange={set("company")} autoComplete="organization" />
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5">
            <label className="flabel">
              E-post
              <input className="field" type="email" placeholder="anna@foretag.se" required value={v.email} onChange={set("email")} autoComplete="email" />
            </label>
            <label className="flabel">
              Telefon
              <input className="field" type="tel" placeholder="070-123 45 67" value={v.phone} onChange={set("phone")} autoComplete="tel" />
            </label>
          </div>
          <label className="flabel">
            Jag är intresserad av
            <select className="field" value={v.interest} onChange={set("interest")}>
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
          <Button type="submit" size="lg" className="w-full mt-2">
            Boka demo <Arrow />
          </Button>
        </form>
      )}
    </div>
  );
};

type Props = {
  title?: string;
  body?: string;
  defaultInterest?: string;
};

const ContactSection = ({
  title = "Se om din stad är ledig.",
  body = "På 30 minuter visar vi hur många som söker efter din tjänst i din stad idag, och vad det skulle ge dig.",
  defaultInterest,
}: Props) => (
  <section id="kontakt" className="section bg-dark-section overflow-hidden">
    <div className="container mx-auto px-5 md:px-10 max-w-container split md:items-center">
      <div>
        <div className="label mb-7">Kom igång</div>
        <h2 className="h-l text-background text-balance">{title}</h2>
        <p className="lede mt-7">{body}</p>
        <div className="mt-11 grid max-w-[440px]">
          {[
            ["E-post", CONTACT_EMAIL],
            ["Demo", "Cirka 30 minuter, digitalt"],
            ["Kostnad", "Kostnadsfritt och utan krav på avtal"],
          ].map(([k, val]) => (
            <div key={k} className="flex justify-between gap-6 py-3.5 border-t border-background/20 text-[15px]">
              <span className="text-background/60 shrink-0">{k}</span>
              <span className="font-semibold text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <ContactForm defaultInterest={defaultInterest} />
    </div>
  </section>
);

export default ContactSection;

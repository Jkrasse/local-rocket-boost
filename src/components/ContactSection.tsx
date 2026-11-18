import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Arrow, Check } from "@/components/icons";

const CONTACT_EMAIL = "kontakt@localrocket.se";
const UNSURE = "Vet inte än";
const INTERESTS = ["Leads-generering", "Lokal SEO", "Google Ads", "Meta Ads", UNSURE];
// Sparar förfrågan i Local Rockets databas och skickar notismejl (edge-funktionen demo-request)
const DEMO_ENDPOINT = "https://lzefyygjrofswefrhbsd.supabase.co/functions/v1/demo-request";

export const ContactForm = ({ defaultInterest = "Leads-generering" }: { defaultInterest?: string }) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [v, setV] = useState({ name: "", company: "", email: "", phone: "", website: "" });
  const [interests, setInterests] = useState<string[]>([defaultInterest]);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  // Flera tjänster kan väljas. "Vet inte än" står för sig själv.
  const toggle = (i: string) =>
    setInterests((cur) => {
      if (i === UNSURE) return cur.includes(UNSURE) ? [] : [UNSURE];
      const rest = cur.filter((x) => x !== UNSURE);
      return rest.includes(i) ? rest.filter((x) => x !== i) : [...rest, i];
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...v,
          interests: interests.length ? interests : [UNSURE],
          source_path: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-background-elevated border border-line-soft rounded-xl p-6 md:p-10 text-foreground">
      {sent ? (
        <div className="py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white grid place-items-center mx-auto mb-5">
            <Check className="w-[22px] h-[22px]" />
          </div>
          <h3 className="h-m">Tack!</h3>
          <p className="mt-2.5 text-ink-soft">
            Vi har tagit emot din förfrågan och hör av oss inom kort för att boka en tid.
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
          <fieldset className="flabel">
            <legend className="mb-2">
              Jag är intresserad av <span className="font-normal text-ink-mute">(välj en eller flera)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = interests.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(i)}
                    className={`inline-flex items-center gap-2 h-11 px-4 rounded-pill border text-[15px] font-medium transition-colors ${
                      on
                        ? "bg-primary border-primary text-white"
                        : "bg-background border-line text-foreground hover:border-primary"
                    }`}
                  >
                    {on && <Check className="w-3.5 h-3.5" />}
                    {i}
                  </button>
                );
              })}
            </div>
          </fieldset>
          {/* Honungsfälla för botar, osynlig för besökare */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
            value={v.website}
            onChange={set("website")}
          />
          {failed && (
            <p role="alert" className="text-[15px] text-destructive">
              Något gick fel och förfrågan skickades inte. Försök igen eller mejla oss på{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
          <Button type="submit" size="lg" className="w-full mt-2" disabled={sending}>
            {sending ? "Skickar..." : <>Boka demo <Arrow /></>}
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
              <span className="font-semibold text-right">
                {val === CONTACT_EMAIL ? (
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 decoration-background/40 hover:decoration-background">
                    {val}
                  </a>
                ) : (
                  val
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ContactForm defaultInterest={defaultInterest} />
    </div>
  </section>
);

export default ContactSection;

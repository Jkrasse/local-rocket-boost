import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const cols = [
    {
      title: "Produkt",
      links: [
        { label: "Så funkar det", to: "/sa-fungerar-det" },
        { label: "Branscher", to: "/#industries" },
        { label: "Priser", to: "/#pricing" },
        { label: "Resultatgaranti", to: "#" },
      ],
    },
    {
      title: "Företag",
      links: [
        { label: "Om oss", to: "/#about" },
        { label: "Karriär", to: "#" },
        { label: "Kontakt", to: "/#contact" },
        { label: "Press", to: "#" },
      ],
    },
    {
      title: "Resurser",
      links: [
        { label: "Blogg", to: "#" },
        { label: "Case studies", to: "#" },
        { label: "Lead-kalkylator", to: "#" },
        { label: "Hjälpcenter", to: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-20 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-serif text-xl mb-4">
              <Rocket className="h-5 w-5 text-primary" />
              <span>Local<span className="font-semibold">Rocket</span></span>
            </Link>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              Lead generation för lokala företag. Nischade directory-sajter över hela Sverige.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] tracking-eyebrow uppercase text-ink-mute mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border font-mono text-xs text-ink-mute">
          <p>
            © {new Date().getFullYear()} J.Krasse Marketing AB · Ätrastigen 5, 311 38 Falkenberg · kontakt@localrocket.agency
          </p>
          <div className="flex gap-6">
            <Link to="/integritetspolicy" className="hover:text-foreground transition-colors">Integritet</Link>
            <Link to="/villkor" className="hover:text-foreground transition-colors">Villkor</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

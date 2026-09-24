import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { SERVICES } from "@/data/services";
import { niches } from "@/data/niches";

const APP_URL = "https://app.localrocket.se";
const nicheList = Object.values(niches);
const lowerName = (name: string) => (name === "VVS" ? "VVS" : name.toLowerCase());

const flink = "text-[15px] text-ink-soft hover:text-primary transition-colors";

const Footer = () => {
  const cols: [string, { label: string; to: string; external?: boolean }[]][] = [
    [
      "Leads-generering",
      [
        { label: "Så fungerar det", to: "/leadsgenerering" },
        { label: "Branscher", to: "/#branscher" },
        { label: "Priser", to: "/priser" },
      ],
    ],
    ["Byråtjänster", SERVICES.map((s) => ({ label: s.name, to: `/byratjanster/${s.slug}` }))],
    [
      "Företaget",
      [
        { label: "Om oss", to: "/#om-oss" },
        { label: "Kontakt", to: "/#kontakt" },
        { label: "Logga in", to: `${APP_URL}/login`, external: true },
      ],
    ],
  ];

  return (
    <footer className="pt-[64px] md:pt-[88px] pb-9">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-[15px] text-ink-soft max-w-[300px] mt-5 leading-[1.55]">
              Leads och digital marknadsföring för lokala företag i Sverige.
            </p>
          </div>

          {cols.map(([title, links]) => (
            <div key={title}>
              <div className="text-sm font-semibold mb-[18px]">{title}</div>
              <div className="grid gap-2.5">
                {links.map((l) =>
                  l.to.startsWith("/#") || l.external ? (
                    <a key={l.label} href={l.to} className={flink}>
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.label} to={l.to} className={flink}>
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Landningssidor per bransch (intern länkning) */}
        <div className="grid gap-2 mb-10 text-[13px] text-ink-mute">
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-semibold text-ink-soft">Leads per bransch:</span>
            {nicheList.map((n) => (
              <Link key={n.slug} to={`/leadsgenerering/${n.slug}`} className="hover:text-primary transition-colors">
                {n.name}
              </Link>
            ))}
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-semibold text-ink-soft">SEO per bransch:</span>
            {nicheList.map((n) => (
              <Link key={n.slug} to={`/seo/${n.slug}`} className="hover:text-primary transition-colors">
                SEO för {lowerName(n.name)}
              </Link>
            ))}
          </p>
        </div>

        <hr className="border-0 h-px bg-line" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 text-sm text-ink-mute">
          <span>
            © {new Date().getFullYear()} J.Krasse Marketing AB · Ätrastigen 5, 311 38 Falkenberg · kontakt@localrocket.agency
          </span>
          <div className="flex gap-6">
            <Link to="/integritetspolicy" className="hover:text-primary transition-colors">Integritet</Link>
            <Link to="/villkor" className="hover:text-primary transition-colors">Villkor</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

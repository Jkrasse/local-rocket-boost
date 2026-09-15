import { Link } from "react-router-dom";
import { niches } from "@/data/niches";
import Logo from "@/components/Logo";

const nicheList = Object.values(niches);
const lowerName = (name: string) => (name === "VVS" ? "VVS" : name.toLowerCase());

const Footer = () => {
  const cols = [
    {
      title: "Produkt",
      links: [
        { label: "Så fungerar det", to: "/sa-fungerar-det" },
        { label: "Branscher", to: "/#industries" },
        { label: "Priser", to: "/priser" },
        { label: "FAQ", to: "/#faq" },
        { label: "Kontakt", to: "/#contact" },
      ],
    },
    {
      title: "Leadsgenerering",
      links: nicheList.map((n) => ({
        label: `Leads för ${lowerName(n.name)}`,
        to: `/leadsgenerering/${n.slug}`,
      })),
    },
    {
      title: "SEO per bransch",
      links: nicheList.map((n) => ({
        label: `SEO för ${lowerName(n.name)}`,
        to: `/seo/${n.slug}`,
      })),
    },
  ];

  return (
    <footer className="border-t border-line pt-[56px] md:pt-[72px] pb-8">
      <div className="container mx-auto px-5 md:px-8 max-w-container">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-sm text-ink-soft max-w-[280px] mt-[18px] leading-[1.6]">
              Exklusiva leads för lokala företag. En rekommenderad partner per bransch och stad.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="eyebrow mb-[18px]">{col.title}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink-soft hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-0 h-px bg-line" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 text-[13px] text-ink-mute">
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

import { Rocket, Mail, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
              <Rocket className="h-5 w-5 text-primary" />
              <span>Local Rocket</span>
            </Link>
            <p className="text-sm text-accent-foreground/60 leading-relaxed">
              Vi hjälper lokala företag att få fler leads genom nischade directory-sidor och riktad annonsering.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-foreground/80">Sidor</h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link to="/sa-fungerar-det" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Så funkar det
              </Link>
              <a href="/#pricing" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Priser
              </a>
              <a href="/#about" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Om oss
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-foreground/80">Juridiskt</h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link to="/integritetspolicy" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Integritetspolicy
              </Link>
              <Link to="/villkor" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Allmänna villkor
              </Link>
              <Link to="/cookies" className="text-accent-foreground/60 hover:text-accent-foreground transition-colors">
                Cookiepolicy
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-foreground/80">Kontakt</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Building2 className="h-4 w-4 mt-0.5 text-accent-foreground/40 shrink-0" />
                <span className="text-accent-foreground/60">J.Krasse Marketing AB</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-accent-foreground/40 shrink-0" />
                <span className="text-accent-foreground/60">Ätrastigen 5, 311 38 Falkenberg</span>
              </div>
              <a href="mailto:kontakt@localrocket.agency" className="flex items-start gap-2.5 group">
                <Mail className="h-4 w-4 mt-0.5 text-accent-foreground/40 shrink-0" />
                <span className="text-accent-foreground/60 group-hover:text-accent-foreground transition-colors">
                  kontakt@localrocket.agency
                </span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-accent-foreground/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-accent-foreground/40">
          <p>© {new Date().getFullYear()} J.Krasse Marketing AB. Alla rättigheter förbehållna.</p>
          <p>Organisationsnummer anges vid förfrågan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

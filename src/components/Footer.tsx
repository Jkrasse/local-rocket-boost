import { Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2 font-heading font-bold text-lg">
            <Rocket className="h-5 w-5 text-primary" />
            <span>Local Rocket</span>
          </a>
          <div className="flex items-center gap-6 text-sm text-accent-foreground/70">
            <a href="#how-it-works" className="hover:text-accent-foreground transition-colors">
              Så funkar det
            </a>
            <a href="#pricing" className="hover:text-accent-foreground transition-colors">
              Priser
            </a>
            <a href="#about" className="hover:text-accent-foreground transition-colors">
              Om oss
            </a>
          </div>
          <p className="text-sm text-accent-foreground/50">
            © {new Date().getFullYear()} Local Rocket. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

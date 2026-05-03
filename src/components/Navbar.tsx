import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Så funkar det", href: "/sa-fungerar-det", internal: true },
    { label: "Branscher", href: "/#industries" },
    { label: "Priser", href: "/#pricing" },
    { label: "Om oss", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 max-w-container">
        <Link to="/" className="flex items-center gap-2 font-serif text-[22px]">
          <Rocket className="h-5 w-5 text-primary" />
          <span>Local<span className="font-semibold">Rocket</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.internal ? (
              <Link key={link.href} to={link.href} className="text-sm text-ink-soft hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="text-sm text-ink-soft hover:text-foreground transition-colors">
                {link.label}
              </a>
            ),
          )}
          <a href="#" className="text-sm text-ink-soft hover:text-foreground transition-colors">Logga in</a>
          <Button variant="hero">
            Kom igång <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm text-ink-soft hover:text-foreground">
                {link.label}
              </a>
            ))}
            <Button variant="hero" className="w-full">Kom igång</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

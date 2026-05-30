import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Så funkar det", href: "/sa-fungerar-det", internal: true },
    { label: "Branscher", href: "/#industries" },
    { label: "Priser", href: "/#pricing" },
    { label: "Om oss", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ];

  async function handleSignOut() {
    await signOut();
    setIsOpen(false);
    navigate("/");
  }

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
          {loading ? null : user ? (
            <>
              <Link to={isAdmin ? "/admin" : "/dashboard"} className="text-sm text-ink-soft hover:text-foreground transition-colors">
                Min portal
              </Link>
              <button onClick={handleSignOut} className="text-sm text-ink-soft hover:text-foreground transition-colors">
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-ink-soft hover:text-foreground transition-colors">
                Logga in
              </Link>
              <Button variant="hero" asChild>
                <Link to="/signup">
                  Kom igång <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Meny">
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
            {user ? (
              <>
                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)} className="text-sm text-ink-soft">
                  Min portal
                </Link>
                <Button variant="outline" className="w-full" onClick={handleSignOut}>
                  Logga ut
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm text-ink-soft">
                  Logga in
                </Link>
                <Button variant="hero" asChild className="w-full">
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    Kom igång
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Rocket, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { niches } from "@/data/niches";

const APP_URL = "https://app.localrocket.se";
const nicheList = Object.values(niches);

const navLinks = [
  { label: "Så fungerar det", href: "/sa-fungerar-det", internal: true },
  { label: "Priser", href: "/priser", internal: true },
  { label: "Om oss", href: "/#about" },
];

const linkStyle =
  "relative text-sm text-ink-soft hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [branschOpen, setBranschOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openBransch = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setBranschOpen(true);
  };
  const scheduleCloseBransch = () => {
    closeTimer.current = window.setTimeout(() => setBranschOpen(false), 120);
  };

  async function handleSignOut() {
    await signOut();
    setMobileOpen(false);
    navigate("/");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_24px_-20px_rgba(26,22,19,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className={`container mx-auto flex items-center justify-between px-4 max-w-container transition-all duration-300 ${
          scrolled || mobileOpen ? "h-16" : "h-[76px]"
        }`}
        aria-label="Huvudmeny"
      >
        {/* Logotyp */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
            <Rocket className="h-4 w-4" />
          </span>
          <span className="font-serif text-[22px] leading-none">
            Local<span className="font-semibold">Rocket</span>
          </span>
        </Link>

        {/* Desktop-länkar */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/sa-fungerar-det" className={linkStyle}>
            Så fungerar det
          </Link>

          {/* Branscher-dropdown */}
          <div className="relative" onMouseEnter={openBransch} onMouseLeave={scheduleCloseBransch}>
            <button
              className={`${linkStyle} inline-flex items-center gap-1.5 py-2`}
              onClick={openBransch}
              aria-expanded={branschOpen}
              aria-haspopup="true"
            >
              Branscher
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${branschOpen ? "rotate-180" : ""}`}
              />
            </button>

            {branschOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 animate-fade-in">
                <div className="w-[540px] rounded-[20px] border border-border/60 bg-background shadow-[0_32px_64px_-24px_rgba(26,22,19,0.28)] p-5">
                  <div className="eyebrow mb-3 px-3">Leadsgenerering per bransch</div>
                  <div className="grid grid-cols-2 gap-1">
                    {nicheList.map((n) => (
                      <Link
                        key={n.slug}
                        to={`/leadsgenerering/${n.slug}`}
                        onClick={() => setBranschOpen(false)}
                        className="group flex items-center justify-between rounded-[12px] px-3 py-2.5 text-sm text-foreground hover:bg-warm transition-colors"
                      >
                        {n.name}
                        <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between px-3">
                    <span className="text-xs text-ink-mute">En partner per bransch och stad.</span>
                    <a
                      href="/#industries"
                      onClick={() => setBranschOpen(false)}
                      className="text-xs text-primary hover:underline underline-offset-4"
                    >
                      Alla branscher →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) =>
            link.internal ? (
              <Link key={link.href} to={link.href} className={linkStyle}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={linkStyle}>
                {link.label}
              </a>
            ),
          )}
        </div>

        {/* Desktop-knappar */}
        <div className="hidden lg:flex items-center gap-6">
          {loading ? null : user ? (
            <>
              <Link to={isAdmin ? "/admin" : "/dashboard"} className={linkStyle}>
                Min portal
              </Link>
              <button onClick={handleSignOut} className={linkStyle}>
                Logga ut
              </button>
            </>
          ) : (
            <>
              <a
                href={`${APP_URL}/login`}
                className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-foreground transition-colors"
              >
                Logga in
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Button variant="hero" asChild>
                <a href={`${APP_URL}/registrera`}>
                  Registrera <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </>
          )}
        </div>

        {/* Mobilknapp */}
        <button
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Stäng menyn" : "Öppna menyn"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobilmeny */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-4rem)] bg-background overflow-y-auto">
          <div className="container mx-auto px-4 py-10 flex flex-col min-h-full">
            <nav className="flex flex-col" aria-label="Mobilmeny">
              {[
                { label: "Så fungerar det", href: "/sa-fungerar-det", internal: true },
                { label: "Branscher", href: "/#industries", internal: false },
                { label: "Priser", href: "/priser", internal: true },
                { label: "Om oss", href: "/#about", internal: false },
              ].map((link, i) => (
                <div key={link.href} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
                  {link.internal ? (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-serif text-[32px] leading-none py-5 border-b border-border/40"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-serif text-[32px] leading-none py-5 border-b border-border/40"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pb-10 pt-12 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              {user ? (
                <>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setMobileOpen(false)}>
                      Min portal
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleSignOut}>
                    Logga ut
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <a href={`${APP_URL}/registrera`}>
                      Registrera <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full">
                    <a href={`${APP_URL}/login`}>
                      Logga in <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

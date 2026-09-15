import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { niches } from "@/data/niches";
import Logo from "@/components/Logo";

const APP_URL = "https://app.localrocket.se";
const nicheList = Object.values(niches);

const navLinkStyle =
  "inline-flex items-center px-3.5 py-2 rounded-pill text-sm font-medium tracking-[-0.005em] text-ink-soft hover:text-foreground hover:bg-background-warm transition-colors";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [branschOpen, setBranschOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        solid
          ? "bg-background/85 backdrop-blur-xl backdrop-saturate-150 border-line"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-5 md:px-8 max-w-container h-[72px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center"
        aria-label="Huvudmeny"
      >
        <Logo onClick={() => setMobileOpen(false)} />

        {/* Desktop-länkar */}
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/sa-fungerar-det" className={navLinkStyle}>
            Så fungerar det
          </Link>

          <div className="relative" onMouseEnter={openBransch} onMouseLeave={scheduleCloseBransch}>
            <button
              className={`${navLinkStyle} gap-1.5`}
              onClick={openBransch}
              aria-expanded={branschOpen}
              aria-haspopup="true"
            >
              Branscher
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${branschOpen ? "rotate-180" : ""}`}
              />
            </button>

            {branschOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 animate-fade-in">
                <div className="w-[540px] rounded-lg border border-line bg-background-elevated shadow-float p-5">
                  <div className="eyebrow mb-3 px-3">Leadsgenerering per bransch</div>
                  <div className="grid grid-cols-2 gap-1">
                    {nicheList.map((n) => (
                      <Link
                        key={n.slug}
                        to={`/leadsgenerering/${n.slug}`}
                        onClick={() => setBranschOpen(false)}
                        className="group flex items-center justify-between rounded-[10px] px-3 py-2.5 text-sm font-medium text-foreground hover:bg-background-warm transition-colors"
                      >
                        {n.name}
                        <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between px-3">
                    <span className="text-xs text-ink-mute">En partner per bransch och stad.</span>
                    <a
                      href="/#industries"
                      onClick={() => setBranschOpen(false)}
                      className="text-xs font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Alla branscher →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/priser" className={navLinkStyle}>
            Priser
          </Link>
          <a href="/#about" className={navLinkStyle}>
            Om oss
          </a>
        </div>

        {/* Desktop-knappar */}
        <div className="hidden lg:flex items-center justify-end gap-1.5">
          {loading ? null : user ? (
            <>
              <Link to={isAdmin ? "/admin" : "/dashboard"} className={navLinkStyle}>
                Min portal
              </Link>
              <button onClick={handleSignOut} className={navLinkStyle}>
                Logga ut
              </button>
            </>
          ) : (
            <>
              <a href={`${APP_URL}/login`} className={`${navLinkStyle} group gap-1`}>
                Logga in
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Button variant="hero" size="sm" asChild>
                <a href={`${APP_URL}/registrera`}>
                  Registrera <ArrowRight />
                </a>
              </Button>
            </>
          )}
        </div>

        {/* Mobilknapp */}
        <button
          className="lg:hidden justify-self-end flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-background-elevated text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Stäng menyn" : "Öppna menyn"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobilmeny */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-72px)] bg-background overflow-y-auto">
          <div className="container mx-auto px-5 py-10 flex flex-col min-h-full">
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
                      className="block font-serif text-[32px] leading-none py-5 border-b border-line"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-serif text-[32px] leading-none py-5 border-b border-line"
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
                      Registrera <ArrowRight />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full">
                    <a href={`${APP_URL}/login`}>
                      Logga in <ArrowUpRight />
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

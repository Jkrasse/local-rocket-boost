import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Arrow, Caret, ServiceIcon } from "@/components/icons";
import { SERVICES } from "@/data/services";

const APP_URL = "https://app.localrocket.se";

const navLink =
  "inline-flex items-center gap-1.5 h-10 px-[15px] rounded-pill text-[15.5px] font-medium tracking-[-0.01em] text-foreground hover:bg-background-warm transition-colors";

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  const isLeads = pathname === "/leadsgenerering";
  const isService = pathname.startsWith("/byratjanster/");
  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background,border-color] duration-200 ${
        solid ? "bg-background/90 backdrop-blur-[14px] backdrop-saturate-150 border-line" : "bg-transparent border-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-5 md:px-10 max-w-container h-[76px] grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8"
        aria-label="Huvudmeny"
      >
        <Logo onClick={() => setMobileOpen(false)} />

        {/* Desktop-länkar */}
        <div className="hidden lg:flex gap-0.5 justify-self-center">
          <Link to="/leadsgenerering" className={`${navLink} ${isLeads ? "bg-background-warm" : ""}`}>
            Leads-generering
          </Link>

          <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
            <button
              className={`${navLink} ${isService || open ? "bg-background-warm" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="true"
            >
              Byråtjänster
              <Caret className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute left-1/2 top-[calc(100%+10px)] w-[560px] -translate-x-1/2 bg-background-elevated border border-line-soft rounded-[20px] shadow-float p-2.5 grid grid-cols-2 gap-1 transition-[opacity,transform] duration-[180ms] before:content-[''] before:absolute before:inset-x-0 before:-top-3 before:h-3 ${
                open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1.5 pointer-events-none"
              }`}
            >
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to={`/byratjanster/${s.slug}`}
                  className="grid grid-cols-[40px_1fr] gap-x-3.5 gap-y-1 p-3.5 rounded-md text-foreground hover:bg-background transition-colors"
                >
                  <span className="row-span-2 w-10 h-10 rounded-[12px] bg-primary-mist text-primary grid place-items-center">
                    <ServiceIcon k={s.k} />
                  </span>
                  <b className="font-semibold text-[15.5px] tracking-[-0.01em] leading-tight">{s.name}</b>
                  <small className="text-[13.5px] text-ink-mute leading-[1.4]">{s.short}</small>
                </Link>
              ))}
              <a
                href="/#kontakt"
                className="col-start-2 row-start-1 row-span-3 bg-primary text-background rounded-md p-5 flex flex-col justify-between gap-6 hover:bg-primary-hover transition-colors"
              >
                <b className="text-[22px] tracking-[-0.03em] font-semibold leading-[1.1]">Osäker på vad som passar?</b>
                <small className="text-sm opacity-80 leading-[1.45]">
                  Vi går igenom din synlighet idag och föreslår en plan. 30 minuter, kostnadsfritt.
                </small>
                <span className="inline-flex items-center gap-2 font-semibold text-[15px]">
                  Boka genomgång <Arrow className="w-[15px] h-[15px]" />
                </span>
              </a>
            </div>
          </div>

          <a href="/#branscher" className={navLink}>Branscher</a>
          <Link to="/priser" className={`${navLink} ${pathname === "/priser" ? "bg-background-warm" : ""}`}>Priser</Link>
          <a href="/#om-oss" className={navLink}>Om oss</a>
        </div>

        {/* Höger: Logga in + Boka demo + hamburgare */}
        <div className="flex items-center gap-1.5 justify-self-end">
          <a href={`${APP_URL}/login`} className={`${navLink} hidden lg:inline-flex`}>
            Logga in
          </a>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <a href="/#kontakt">
              Boka demo <Arrow />
            </a>
          </Button>
          <button
            className={`${navLink} lg:hidden px-2.5`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Stäng menyn" : "Öppna menyn"}
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d={mobileOpen ? "M5 5l10 10M15 5 5 15" : "M3 7h14M3 13h14"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobilmeny */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-76px)] bg-background z-30 px-5 py-6 flex flex-col gap-1 overflow-y-auto">
          <Link to="/leadsgenerering" className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5 border-b border-line">
            Leads-generering
          </Link>
          <span className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5">Byråtjänster</span>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/byratjanster/${s.slug}`}
              className="text-lg font-medium text-ink-soft py-2.5 pl-[18px] border-b border-line"
            >
              {s.name}
            </Link>
          ))}
          <a href="/#branscher" onClick={() => setMobileOpen(false)} className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5 border-b border-line">Branscher</a>
          <Link to="/priser" className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5 border-b border-line">Priser</Link>
          <a href="/#om-oss" onClick={() => setMobileOpen(false)} className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5 border-b border-line">Om oss</a>
          <a href={`${APP_URL}/login`} className="text-[26px] font-semibold tracking-[-0.03em] text-foreground py-2.5 border-b border-line">Logga in</a>
          <Button asChild className="mt-6 w-full sm:hidden">
            <a href="/#kontakt" onClick={() => setMobileOpen(false)}>
              Boka demo <Arrow />
            </a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

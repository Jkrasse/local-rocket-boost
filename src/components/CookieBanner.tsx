import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, trackPageView } from "@/lib/metaPixel";

/**
 * Cookiebanner + sidvisningar till Meta-pixeln. Pixeln laddas först när
 * besökaren har valt "Godkänn alla". Valet kan ändras via
 * "Cookieinställningar" i sidfoten (eventet open-cookie-settings).
 */
const CookieBanner = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  // En PageView per sida i appen, även efter att besökaren godkänt mitt i besöket
  useEffect(() => {
    const send = () => {
      if (lastPath.current === location.pathname) return;
      if (getConsent() !== "all") return;
      lastPath.current = location.pathname;
      trackPageView();
    };
    send();
    window.addEventListener("cookie-consent-changed", send);
    return () => window.removeEventListener("cookie-consent-changed", send);
  }, [location.pathname]);

  if (!open) return null;

  const choose = (v: "all" | "necessary") => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookieinställningar"
      className="fixed inset-x-0 bottom-0 z-[90] p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-[720px] rounded-xl border border-line-soft bg-background-elevated shadow-card p-5 md:p-6 text-foreground">
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Vi använder kakor för att mäta hur våra annonser på Facebook och Instagram fungerar. Den egna
          besöksstatistiken använder inga kakor. Läs mer i vår{" "}
          <Link to="/cookies" className="text-primary underline underline-offset-2 hover:text-primary-hover">
            cookiepolicy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button variant="outline" onClick={() => choose("necessary")}>
            Bara nödvändiga
          </Button>
          <Button onClick={() => choose("all")}>Godkänn alla</Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

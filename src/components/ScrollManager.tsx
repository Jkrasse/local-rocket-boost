import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ny sida ska alltid börja högst upp. Länkar med ankare (t.ex. /#kontakt)
 * väntar tills sektionen finns i DOM:en och scrollar sedan dit.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        return;
      }
      if (tries++ < 40) timer = window.setTimeout(tick, 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;

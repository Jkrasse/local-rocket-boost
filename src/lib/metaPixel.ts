/**
 * Meta-pixeln för localrocket.se. Laddas bara när besökaren har godkänt
 * marknadsföringskakor i cookiebannern, och aldrig för vår egen trafik
 * (?lr_intern=1 sätter samma flagga som den egna webbanalysen lr.js).
 */

export const META_PIXEL_ID = "2075761000493506";

const CONSENT_KEY = "lr_cookie_consent";
export type Consent = "all" | "necessary";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* privat läge: valet gäller bara den här sidvisningen */
  }
  if (v === "necessary") {
    // Återkallat samtycke: ta bort Metas kakor (pixeln slutar helt vid nästa sidladdning)
    const host = location.hostname.replace(/^www\./, "");
    for (const name of ["_fbp", "_fbc"]) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
    }
  }
  window.dispatchEvent(new Event("cookie-consent-changed"));
}

function isInternal(): boolean {
  try {
    if (new URLSearchParams(location.search).get("lr_intern") === "1") return true;
    return localStorage.getItem("lr_intern") === "1";
  } catch {
    return false;
  }
}

const allowed = () => getConsent() === "all" && !isInternal();

/** Standardkoden från Meta, utan PageView: den skickas per route av appen */
function load() {
  if (window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", META_PIXEL_ID);
}

export function trackPageView() {
  if (!allowed()) return;
  load();
  window.fbq!("track", "PageView");
}

/** Demoförfrågan skickad */
export function trackLead() {
  if (!allowed()) return;
  load();
  window.fbq!("track", "Lead", { content_name: "Demoförfrågan" });
}

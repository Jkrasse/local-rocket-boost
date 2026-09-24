import type { ServiceKey } from "@/data/services";

/* Ikoner från handoff v3 (shared.jsx) */

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M2.5 8h10.5M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Diag = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M3 8.5 6.3 11.8 13 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Caret = ({ className = "" }: { className?: string }) => (
  <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className}>
    <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ServiceIcon = ({ k, size = 20 }: { k: ServiceKey; size?: number }) => {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "seo")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle {...p} cx="12" cy="9.5" r="2.5" />
      </svg>
    );
  if (k === "google")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle {...p} cx="11" cy="11" r="6.5" />
        <path {...p} d="m16 16 4.5 4.5" />
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect {...p} x="4" y="4" width="16" height="16" rx="4.5" />
      <circle {...p} cx="12" cy="12" r="3.5" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  );
};

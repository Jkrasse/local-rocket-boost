import { Link } from "react-router-dom";

/** Märket: uppochnedvänd kartnål som bildar en raket. Alltid upprätt. */
export const Mark = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={`shrink-0 block ${className}`}
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16 1.5C20.6 6 23.5 11.4 23.5 17c0 4.2-3.4 7.5-7.5 7.5S8.5 21.2 8.5 17C8.5 11.4 11.4 6 16 1.5zM16 12.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 1 0 0-6.8z"
    />
    <path d="M9.3 20.2 4.8 27.8l6.9-3.6z" />
    <path d="M22.7 20.2l4.5 7.6-6.9-3.6z" />
    <path d="M13.3 26.3 16 31l2.7-4.7z" />
  </svg>
);

type LogoProps = {
  size?: number;
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

/** Ordmärke: "Local Rocket" i Familjen Grotesk 700, storlek 0.86 × size, märke 1.12 × size. */
const Logo = ({ size = 26, tone = "dark", className = "", onClick }: LogoProps) => {
  const text = tone === "light" ? "text-background" : "text-foreground";
  const mark = tone === "light" ? "text-background" : "text-primary";
  return (
    <Link
      to="/"
      aria-label="Local Rocket"
      onClick={onClick}
      className={`inline-flex items-center ${text} ${className}`}
      style={{ gap: size * 0.3 }}
    >
      <Mark size={size * 1.12} className={mark} />
      <span
        className="font-bold whitespace-nowrap leading-none"
        style={{ fontSize: size * 0.86, letterSpacing: "-0.045em" }}
      >
        Local Rocket
      </span>
    </Link>
  );
};

export default Logo;

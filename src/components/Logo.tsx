import { Link } from "react-router-dom";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const sizes = { sm: "text-[20px]", md: "text-[25px]", lg: "text-[40px]" };

/** Ordmärke enligt brand book v2: "Local" i Newsreader 400, "Rocket" i 600, ingen ikon. */
const Logo = ({ size = "md", className = "", onClick }: LogoProps) => (
  <Link
    to="/"
    aria-label="Local Rocket"
    onClick={onClick}
    className={`inline-flex items-baseline whitespace-nowrap font-serif leading-none tracking-[-0.03em] text-foreground ${sizes[size]} ${className}`}
    style={{ fontOpticalSizing: "auto" }}
  >
    <span className="font-normal">Local</span>
    <span className="font-semibold">Rocket</span>
  </Link>
);

export default Logo;

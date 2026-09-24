import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  crumbs: string[];
  label: string;
  title: string;
  lede: string;
  children?: ReactNode;
};

const PageHero = ({ crumbs, label, title, lede, children }: Props) => (
  <section className="pt-10 md:pt-16 pb-16 md:pb-[88px]">
    <div className="container mx-auto px-5 md:px-10 max-w-container">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-mute mb-10 md:mb-12" aria-label="Brödsmulor">
        <Link to="/" className="hover:text-primary transition-colors">Start</Link>
        {crumbs.map((c) => (
          <Fragment key={c}>
            <span>/</span>
            <span className="text-foreground">{c}</span>
          </Fragment>
        ))}
      </nav>
      <div className="label label-green mb-7">{label}</div>
      <h1 className="h-xl max-w-[1100px] text-balance" style={{ fontSize: "clamp(48px, 7vw, 108px)" }}>
        {title}
      </h1>
      <div className="split mt-10 md:mt-12 md:items-end">
        <p className="lede">{lede}</p>
        {children && <div className="md:justify-self-end">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diag } from "@/components/icons";
import { niches } from "@/data/niches";

const list = Object.values(niches);

// Publika domäner för de nischsajter som är live. Övriga visar ingen domän ännu.
const DOMAINS: Record<string, string> = {
  stadfirmor: "stadfirmor.nu",
  tandlakare: "tandlakarkollen.nu",
  bilhandlare: "bilhandlarkollen.se",
};

const IndustriesSection = () => (
  <section id="branscher" className="section">
    <div className="container mx-auto px-5 md:px-10 max-w-container split">
      <div className="md:sticky md:top-[120px]">
        <div className="label mb-6">Branscher</div>
        <h2 className="h-l">Vi finns där dina kunder söker.</h2>
        <p className="lede mt-7">En dedikerad directory-sajt per bransch, och vi lanserar nya löpande.</p>
        <Button variant="outline" asChild className="mt-9">
          <a href="/#kontakt">Saknar du din bransch?</a>
        </Button>
      </div>

      <div className="border-b border-line">
        {list.map((n) => (
          <Link key={n.slug} to={`/leadsgenerering/${n.slug}`} className="ind">
            <span>{n.name}</span>
            <span className="flex items-center gap-5">
              {DOMAINS[n.slug] && <small>{DOMAINS[n.slug]}</small>}
              <Diag />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesSection;

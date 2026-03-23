import { Search, Globe, TrendingUp, Users } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Vi bygger din nisch-sida",
    description: "Vi skapar en professionell directory-sida inom din bransch — t.ex. städfirmor, flyttfirmor eller bilhandlare i ditt område.",
  },
  {
    icon: Search,
    title: "Vi driver kvalificerad trafik",
    description: "Genom Google Ads, Meta Ads och organisk SEO ser vi till att potentiella kunder hittar din sida.",
  },
  {
    icon: TrendingUp,
    title: "Leads direkt till dig",
    description: "Intresserade kunder kontaktar dig direkt. Du får notiser i realtid via vårt CRM-system.",
  },
  {
    icon: Users,
    title: "Du växer — vi optimerar",
    description: "Vi analyserar och optimerar löpande för att maximera antalet leads och din avkastning.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Så funkar det
          </h2>
          <p className="text-muted-foreground text-lg">
            Fyra enkla steg till fler kunder för ditt lokala företag.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute top-4 right-4 text-5xl font-heading font-extrabold text-muted/60">
                {index + 1}
              </span>
              <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "2 990",
    period: "/mån",
    description: "Perfekt för dig som vill testa och komma igång snabbt.",
    features: [
      "1 directory-sida",
      "Google Ads-kampanj",
      "Grundläggande CRM",
      "Månatlig rapport",
      "E-postsupport",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "5 990",
    period: "/mån",
    description: "För företag som vill skala upp sin leadgenerering.",
    features: [
      "Upp till 3 directory-sidor",
      "Google Ads + Meta Ads",
      "Fullt CRM-system",
      "Veckorapporter",
      "Prioriterad support",
      "A/B-testning",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Offert",
    period: "",
    description: "Skräddarsydd lösning för större organisationer.",
    features: [
      "Obegränsat antal sidor",
      "Alla annonskanaler",
      "White-label CRM",
      "Dedikerad kontaktperson",
      "API-tillgång",
      "Anpassad rapportering",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Enkel & transparent prissättning
          </h2>
          <p className="text-muted-foreground text-lg">
            Välj den plan som passar ditt företag bäst. Inga dolda avgifter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-105"
                  : "border-border hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Populärast
                </div>
              )}
              <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading font-extrabold text-4xl">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm">kr{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
              >
                {plan.price === "Offert" ? "Kontakta oss" : "Kom igång"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Growth",
    price: "5 000",
    period: "/mån",
    vat: "exkl. moms",
    description: "Allt du behöver för att börja generera leads i din stad.",
    features: [
      "1 stad + alla undersidor",
      "Google Ads (inkl. 1 000 kr spend)",
      "Meta Ads (inkl. 1 000 kr spend)",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering av annonser och landningssidor",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "9 000",
    period: "/mån",
    vat: "exkl. moms",
    description: "Allt i Growth plus exklusiv domän och högre annonsbudget.",
    features: [
      "Allt som ingår i Growth",
      "Exaktmatchad domän som promotar ert företag",
      "Google Ads (inkl. 2 000 kr spend)",
      "Meta Ads (inkl. 2 000 kr spend)",
      "Månadsrapporter",
      "A/B-testning",
      "Löpande optimering av annonser och landningssidor",
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10"
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
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-heading font-extrabold text-4xl">{plan.price}</span>
                <span className="text-muted-foreground text-sm">kr{plan.period}</span>
              </div>
              <p className="text-muted-foreground text-xs mb-6">{plan.vat}</p>
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
                Kom igång
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

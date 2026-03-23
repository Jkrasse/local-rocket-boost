import { Target, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Resultatdrivet",
    description: "Allt vi gör mäts och optimeras. Vi fokuserar på det som faktiskt ger resultat — fler leads och fler kunder.",
  },
  {
    icon: Zap,
    title: "Snabb lansering",
    description: "Vi vet att tid är pengar. Därför har vi en streamlinad process som gör att du kan börja få leads inom veckor.",
  },
  {
    icon: Heart,
    title: "Lokalt fokus",
    description: "Vi brinner för lokala företag. Vår mission är att ge er samma digitala verktyg som de stora kedjorna har.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Om Local Rocket
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Local Rocket grundades med en enkel idé: lokala företag förtjänar samma 
            digitala möjligheter som stora koncerner. Vi kombinerar nischade directory-sidor 
            med datadriven annonsering för att leverera kvalificerade leads direkt till ditt företag.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

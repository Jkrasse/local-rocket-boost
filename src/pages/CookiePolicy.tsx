import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Cookiepolicy | Local Rocket" canonical="https://localrocket.se/cookies" />
      <Navbar />
      <main className="pt-10 pb-20 md:pt-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">Cookiepolicy</h1>
          <p className="text-muted-foreground mb-6">Senast uppdaterad: 2026-11-18</p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Vad är cookies?</h2>
              <p>Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. De hjälper oss att förbättra din upplevelse och förstå hur webbplatsen används.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Vilka cookies använder vi?</h2>
              
              <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Nödvändiga cookies</h3>
              <p>Krävs för att webbplatsen ska fungera korrekt. Dessa kan inte stängas av.</p>

              <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Analys-cookies</h3>
              <p>Vår egna besöksstatistik använder inga cookies. Besök räknas på vår server utan att något sparas på din enhet.</p>

              <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Marknadsförings-cookies</h3>
              <p>Vi använder Meta-pixeln för att mäta hur våra annonser på Facebook och Instagram fungerar, till exempel om en annons leder till en demoförfrågan. Pixeln sätter cookies (_fbp och _fbc) och laddas bara om du väljer "Godkänn alla" i cookiebannern.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Hantera cookies</h2>
              <p>Du kan när som helst ändra ditt val via "Cookieinställningar" längst ned på sidan. Du kan också radera cookies via din webbläsares inställningar.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
              <p>Har du frågor om vår cookiepolicy? Kontakta oss på <a href="mailto:kontakt@localrocket.se" className="text-primary underline underline-offset-2 hover:text-primary-hover">kontakt@localrocket.se</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;

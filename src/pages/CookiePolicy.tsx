import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">Cookiepolicy</h1>
          <p className="text-muted-foreground mb-6">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

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
              <p>Hjälper oss förstå hur besökare använder webbplatsen. Vi använder dessa för att förbättra sidans innehåll och funktionalitet.</p>

              <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Marknadsförings-cookies</h3>
              <p>Används för att visa relevanta annonser och mäta effektiviteten av våra annonskampanjer via Google Ads och Meta Ads.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Hantera cookies</h2>
              <p>Du kan hantera och radera cookies via din webbläsares inställningar. Observera att vissa funktioner på webbplatsen kan sluta fungera om du blockerar cookies.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
              <p>Har du frågor om vår cookiepolicy? Kontakta oss på kontakt@localrocket.agency.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;

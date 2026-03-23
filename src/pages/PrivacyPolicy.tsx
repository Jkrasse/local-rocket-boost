import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">Integritetspolicy</h1>
          <p className="text-muted-foreground mb-6">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">1. Ansvarig för behandling av personuppgifter</h2>
              <p>J.Krasse Marketing AB ("Local Rocket", "vi", "oss") är personuppgiftsansvarig för behandlingen av dina personuppgifter. Du kan kontakta oss via:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>E-post: kontakt@localrocket.agency</li>
                <li>Adress: Ätrastigen 5, 311 38 Falkenberg</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">2. Vilka uppgifter samlar vi in?</h2>
              <p>Vi samlar in följande personuppgifter:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kontaktuppgifter (namn, e-post, telefonnummer) när du fyller i formulär</li>
                <li>Företagsinformation som du lämnar i samband med beställning</li>
                <li>Teknisk data som IP-adress, webbläsartyp och besöksbeteende via cookies</li>
                <li>Betalningsinformation som hanteras av vår betalningsleverantör Stripe</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">3. Syfte med behandlingen</h2>
              <p>Vi behandlar dina personuppgifter för att:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Leverera och administrera våra tjänster</li>
                <li>Kommunicera med dig angående din beställning</li>
                <li>Skicka rapporter och uppföljningar</li>
                <li>Förbättra vår webbplats och tjänster</li>
                <li>Uppfylla rättsliga skyldigheter</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">4. Rättslig grund</h2>
              <p>Vi behandlar dina uppgifter baserat på:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fullgörande av avtal — när du köper våra tjänster</li>
                <li>Berättigat intresse — för att förbättra vår verksamhet</li>
                <li>Samtycke — för marknadsföring och cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">5. Lagring och delning</h2>
              <p>Vi lagrar dina uppgifter så länge det krävs för att fullgöra vårt avtal och uppfylla lagkrav. Vi delar inte dina uppgifter med tredje part utöver vad som krävs för att leverera våra tjänster (t.ex. betalningsleverantörer).</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">6. Dina rättigheter</h2>
              <p>Du har rätt att:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Begära tillgång till dina personuppgifter</li>
                <li>Begära rättelse av felaktiga uppgifter</li>
                <li>Begära radering av dina uppgifter</li>
                <li>Återkalla samtycke</li>
                <li>Lämna klagomål till Integritetsskyddsmyndigheten (IMY)</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

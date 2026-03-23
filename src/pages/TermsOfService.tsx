import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-4xl font-bold mb-8">Allmänna villkor</h1>
          <p className="text-muted-foreground mb-6">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/85">
            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">1. Om tjänsten</h2>
              <p>Local Rocket är en tjänst som drivs av J.Krasse Marketing AB (org.nr anges vid förfrågan). Vi hjälper lokala företag att generera leads genom att lista dem som rekommenderade partners på våra nischade directory-sidor samt genom annonsering via Google Ads och Meta Ads.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">2. Avtalets ingående</h2>
              <p>Avtal ingås när du beställer en tjänst via vår webbplats och betalningen har genomförts. Du bekräftar att du har rätt att teckna avtal för det företag du representerar.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">3. Priser och betalning</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Alla priser anges exklusive moms om inget annat anges</li>
                <li>Betalning sker månadsvis via Stripe</li>
                <li>Annonsbudget som ingår i paketet specificeras i respektive paketbeskrivning</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">4. Uppsägning</h2>
              <p>Tjänsten löper tillsvidare med en månads uppsägningstid. Uppsägning sker skriftligen via e-post till kontakt@localrocket.agency.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">5. Ansvarsbegränsning</h2>
              <p>Vi garanterar inte specifika resultat vad gäller antal leads eller placeringar. Vi ansvarar inte för indirekta skador, utebliven vinst eller förlust av data. Vårt ansvar är begränsat till det belopp kunden betalat under de senaste tre månaderna.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">6. Immateriella rättigheter</h2>
              <p>Allt innehåll på webbplatsen, inklusive texter, bilder, logotyper och design, tillhör J.Krasse Marketing AB och får inte kopieras utan skriftligt tillstånd.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">7. Tvister</h2>
              <p>Svensk lag tillämpas på dessa villkor. Tvister ska i första hand lösas genom förhandling. Om parterna inte kan enas ska tvisten avgöras av svensk allmän domstol.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;

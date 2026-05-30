export type NicheContent = {
  slug: string;
  name: string;
  nameSingular: string; // "elektriker" lowercase for sentences
  nameSingularDef: string; // "elektrikern"
  audienceTitle: string; // "elektriker" or plural for headings
  service: string; // "elreparation" — what customers search for
  searchPhrases: string[]; // example searches
  city: string; // default city for examples
  emoji?: string;
  benefits: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

const baseFaq = (n: string, plural: string) => [
  {
    q: `Vad kostar det att få leads via Local Rocket som ${n}?`,
    a: `Vi har två fasta paket: Premium från 3 850 kr/mån (årsbetalning) och Growth från 6 160 kr/mån (årsbetalning). Ingen startavgift, ingen bindningstid utöver perioden – och du betalar aldrig per lead.`,
  },
  {
    q: `Hur snabbt börjar jag få leads?`,
    a: `De flesta ${plural} får sina första förfrågningar inom 2–4 veckor efter lansering. Vi sätter upp annonser, landningssida och spårning samma vecka du tecknar avtal.`,
  },
  {
    q: `Är leadsen exklusiva för mig?`,
    a: `Ja. Vi släpper bara in ETT företag per bransch och stad. När din plats är tagen är konkurrenterna utestängda från vår trafik i det området.`,
  },
  {
    q: `Vad händer om jag inte är nöjd?`,
    a: `Du kan säga upp när som helst inför nästa period. Vi tror på att leverera resultat – inte att låsa in dig.`,
  },
];

export const niches: Record<string, NicheContent> = {
  elektriker: {
    slug: "elektriker",
    name: "Elektriker",
    nameSingular: "elektriker",
    nameSingularDef: "elektrikern",
    audienceTitle: "elektriker",
    service: "elinstallationer och elreparation",
    searchPhrases: ["elektriker stockholm", "akut elektriker", "behörig elektriker nära mig"],
    city: "Stockholm",
    benefits: [
      { title: "Kunder som redan söker", body: "Vi fångar upp människor mitt i Google-sökningen efter en elektriker – inte kalla listor eller massutskick." },
      { title: "ROT-redo förfrågningar", body: "Vårt formulär kvalificerar adress, jobbtyp och tidsfönster så att du kan lämna pris direkt." },
      { title: "En per stad", body: "Bara en elektriker per stad får trafiken. När platsen är din är den låst." },
    ],
    faq: baseFaq("elektriker", "elektriker"),
  },
  vvs: {
    slug: "vvs",
    name: "VVS",
    nameSingular: "VVS-företag",
    nameSingularDef: "VVS-företaget",
    audienceTitle: "VVS-företag",
    service: "rörmokeri, värme och badrumsrenovering",
    searchPhrases: ["rörmokare stockholm", "akut vvs jour", "vvs badrumsrenovering"],
    city: "Stockholm",
    benefits: [
      { title: "Akuta jobb i realtid", body: "När någon googlar 'rörmokare akut' är det du som syns – och får samtalet inom minuter." },
      { title: "Kvalificerade förfrågningar", body: "Vi frågar om jobbtyp, fastighet och adress innan leadet skickas så du slipper tomma offerter." },
      { title: "Geografisk ensamrätt", body: "En VVS-firma per stad. Konkurrenterna är ute." },
    ],
    faq: baseFaq("VVS-företag", "VVS-företag"),
  },
  stadfirmor: {
    slug: "stadfirmor",
    name: "Städfirmor",
    nameSingular: "städfirma",
    nameSingularDef: "städfirman",
    audienceTitle: "städfirmor",
    service: "hemstädning, flyttstäd och företagsstäd",
    searchPhrases: ["städfirma stockholm", "flyttstädning pris", "hemstädning rut"],
    city: "Stockholm",
    benefits: [
      { title: "Trafik från RUT-kunder", body: "Vi når privatpersoner som vill ha hemstädning med RUT – inte tidsslukande kontorsoffert-jakter." },
      { title: "Återkommande kunder", body: "Vårt formulär filtrerar engångsuppdrag från abonnemang så du kan prioritera lönsamma leads." },
      { title: "Endast en städfirma per stad", body: "Du äger trafiken i din stad – konkurrenter syns inte hos oss." },
    ],
    faq: baseFaq("städfirma", "städfirmor"),
  },
  flyttfirmor: {
    slug: "flyttfirmor",
    name: "Flyttfirmor",
    nameSingular: "flyttfirma",
    nameSingularDef: "flyttfirman",
    audienceTitle: "flyttfirmor",
    service: "bohagsflytt, kontorsflytt och magasinering",
    searchPhrases: ["flyttfirma stockholm", "flyttfirma pris", "bohagsflytt"],
    city: "Stockholm",
    benefits: [
      { title: "Förfrågningar med datum", body: "Varje lead har önskat flyttdatum, adresser och rumsantal så du kan offerera direkt." },
      { title: "Hög ordervärde-snitt", body: "Vi prioriterar bohags- och kontorsflytt framför 'flytta en soffa'-frågor." },
      { title: "Ensam i din stad", body: "En flyttfirma per ort. Konkurrenterna har ingen kanal in." },
    ],
    faq: baseFaq("flyttfirma", "flyttfirmor"),
  },
  taklaggare: {
    slug: "taklaggare",
    name: "Takläggare",
    nameSingular: "takläggare",
    nameSingularDef: "takläggaren",
    audienceTitle: "takläggare",
    service: "takläggning, takbyte och takrenovering",
    searchPhrases: ["takläggare stockholm", "takbyte pris", "takrenovering"],
    city: "Stockholm",
    benefits: [
      { title: "Stora jobb, hög marginal", body: "Vi riktar in oss på takbyten och fullrenoveringar – inte småfix." },
      { title: "Förkvalificerade adresser", body: "Vi frågar efter fastighetstyp, takyta och tidsplan så du vet att offerten är värd att räkna på." },
      { title: "En takläggare per stad", body: "Du tar hela trafiken i ditt område." },
    ],
    faq: baseFaq("takläggare", "takläggare"),
  },
  maklare: {
    slug: "maklare",
    name: "Mäklare",
    nameSingular: "mäklare",
    nameSingularDef: "mäklaren",
    audienceTitle: "mäklare",
    service: "värdering och försäljning av bostäder",
    searchPhrases: ["värdering bostad stockholm", "mäklare stockholm", "sälja lägenhet"],
    city: "Stockholm",
    benefits: [
      { title: "Säljklara värderingsleads", body: "Vi når människor som funderar på att sälja – inte de som bara är nyfikna på prisstatistik." },
      { title: "Lokala sökningar", body: "Trafiken riktas på stadsdel så du får relevanta intag för ditt område." },
      { title: "En mäklare per stad", body: "Endast en mäklare per ort får tillgång – konkurrenterna är låsta ute." },
    ],
    faq: baseFaq("mäklare", "mäklare"),
  },
  tandlakare: {
    slug: "tandlakare",
    name: "Tandläkare",
    nameSingular: "tandläkarklinik",
    nameSingularDef: "kliniken",
    audienceTitle: "tandläkarkliniker",
    service: "akuttand, implantat och estetisk tandvård",
    searchPhrases: ["tandläkare stockholm", "akut tandläkare", "tandimplantat pris"],
    city: "Stockholm",
    benefits: [
      { title: "Nya patienter, inte besökare", body: "Vi optimerar för bokade tider, inte för klick eller broschyrnedladdningar." },
      { title: "Hög-värde behandlingar", body: "Vi prioriterar implantat, estetik och akuttand – behandlingar som faktiskt täcker annonskostnaden." },
      { title: "En klinik per stad", body: "Du syns ensam i din stad – konkurrenterna är ute ur vår kanal." },
    ],
    faq: baseFaq("tandläkarklinik", "tandläkarkliniker"),
  },
  bilfirmor: {
    slug: "bilfirmor",
    name: "Bilfirmor",
    nameSingular: "bilfirma",
    nameSingularDef: "bilfirman",
    audienceTitle: "bilfirmor",
    service: "bilförsäljning och bilinköp",
    searchPhrases: ["sälja bil snabbt", "köpa begagnad bil stockholm", "bilfirma värdering"],
    city: "Stockholm",
    benefits: [
      { title: "Säljare som vill bli av med bilen", body: "Vi når privatpersoner som söker efter snabb försäljning – med reg.nr och prisförväntan ifyllt." },
      { title: "Köpare med budget", body: "För dig som säljer riktar vi trafik från köpare med konkret budget och bilmodell i åtanke." },
      { title: "Geografisk ensamrätt", body: "En bilfirma per stad. Konkurrenterna är ute ur vår kanal." },
    ],
    faq: baseFaq("bilfirma", "bilfirmor"),
  },
};

export const allNicheSlugs = Object.keys(niches);
export const getNiche = (slug: string): NicheContent | undefined => niches[slug];

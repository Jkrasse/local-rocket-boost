export type ServiceKey = "seo" | "google" | "meta";

export type Service = {
  slug: string;
  k: ServiceKey;
  name: string;
  short: string;
};

export const SERVICES: Service[] = [
  { slug: "lokal-seo", k: "seo", name: "Lokal SEO", short: "Syns först på Google Maps och i lokala sökningar." },
  { slug: "google-ads", k: "google", name: "Google Ads", short: "Sökannonser som når kunder när de letar." },
  { slug: "meta-ads", k: "meta", name: "Meta Ads", short: "Annonser på Facebook och Instagram i ditt område." },
];

export type ServiceContent = {
  title: string;
  lede: string;
  metaTitle: string;
  metaDescription: string;
  incl: [string, string][];
  fit: string[];
  faq: [string, string][];
};

// Tjänstesidornas copy är utkast enligt handoff v3 och ska granskas innan publicering.
export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "lokal-seo": {
    title: "Syns först när någon söker i din stad.",
    lede: "Vi optimerar din Google-företagsprofil, din hemsida och dina lokala omnämnanden så att du rankar i kartan och i de organiska resultaten där dina kunder bor.",
    metaTitle: "Lokal SEO för lokala företag: syns i Google Maps och lokala sökningar | Local Rocket",
    metaDescription: "Lokal SEO från Local Rocket: Google-företagsprofil, lokala landningssidor, teknisk SEO, omdömen och rankningsrapport. Fast månadspris, ingen bindningstid.",
    incl: [
      ["Google-företagsprofil", "Komplett uppsättning, kategorier, tjänster, bilder och löpande inlägg."],
      ["Lokala landningssidor", "En sida per ort eller stadsdel du vill synas i, skriven för att ranka."],
      ["Teknisk SEO", "Hastighet, struktur, schema-markup och indexering på din sajt."],
      ["Omdömen", "Ett enkelt flöde för att samla fler omdömen från nöjda kunder."],
      ["Lokala länkar och kataloger", "Konsekventa uppgifter i de kataloger och sajter Google litar på."],
      ["Rankningsrapport", "Månadsvis uppföljning av positioner i kartan och i sökresultaten."],
    ],
    fit: [
      "Du har en fysisk plats eller ett tydligt serviceområde",
      "Du vill ha trafik som inte försvinner när annonserna stängs av",
      "Du är beredd att ge arbetet 3–6 månader",
    ],
    faq: [
      ["Hur lång tid tar lokal SEO?", "De första förbättringarna i kartan syns ofta inom några veckor. Stabila topplaceringar tar vanligtvis tre till sex månader beroende på konkurrens."],
      ["Behöver jag en ny hemsida?", "Oftast inte. Vi arbetar med din befintliga sajt och bygger till de sidor som saknas."],
      ["Vad skiljer lokal SEO från vanlig SEO?", "Lokal SEO fokuserar på sökningar med geografisk avsikt, som \"elektriker Uppsala\", och på Google Maps. Företagsprofilen och lokala signaler väger tungt."],
      ["Kan jag kombinera med leads-generering?", "Ja. Många partners kör båda: leads via våra directory-sajter och lokal SEO för det egna varumärket."],
    ],
  },
  "google-ads": {
    title: "Nå kunderna i samma stund som de söker.",
    lede: "Vi bygger och driver sökannonser för lokala företag. Rätt sökord, rätt område och annonser som leder till samtal och förfrågningar, inte bara klick.",
    metaTitle: "Google Ads för lokala företag: sökannonser som ger förfrågningar | Local Rocket",
    metaDescription: "Google Ads från Local Rocket: sökordsanalys, kampanjstruktur per tjänst och ort, konverteringsspårning och löpande optimering. Du äger annonskontot.",
    incl: [
      ["Sökordsanalys", "Vi kartlägger vad dina kunder söker på i ditt område och vad det kostar."],
      ["Kampanjstruktur", "Kampanjer uppdelade per tjänst och ort så att budgeten går dit den ger mest."],
      ["Annonstexter", "Annonser skrivna för att få rätt person att klicka, och fel person att låta bli."],
      ["Konverteringsspårning", "Samtal, formulär och bokningar mäts så att vi vet vad som ger affärer."],
      ["Landningssidor", "Vid behov bygger vi en sida som konverterar bättre än startsidan."],
      ["Löpande optimering", "Bud, sökord och annonser justeras varje vecka. Rapport varje månad."],
    ],
    fit: [
      "Du vill ha förfrågningar redan nästa vecka",
      "Dina kunder söker aktivt efter din tjänst",
      "Du vill kunna skala upp och ner med budgeten",
    ],
    faq: [
      ["Hur mycket annonsbudget behövs?", "Det beror på bransch och ort. Vi går igenom sökvolym och klickpriser på första mötet och föreslår en budget som räcker för att få ut data."],
      ["Äger jag annonskontot?", "Ja. Kontot ligger alltid i ditt namn och du har full åtkomst."],
      ["Hur snabbt ser jag resultat?", "Annonserna kan vara live inom några dagar. De första veckorna används för att samla data och optimera."],
      ["Kör ni även Performance Max och YouTube?", "Ja, när det passar målet. För de flesta lokala företag är sökkampanjer grunden."],
    ],
  },
  "meta-ads": {
    title: "Bli förstahandsvalet innan de ens har börjat söka.",
    lede: "Vi skapar och driver annonser på Facebook och Instagram som når rätt personer i ditt område, bygger igenkänning och fångar in förfrågningar.",
    metaTitle: "Meta Ads för lokala företag: annonser på Facebook och Instagram | Local Rocket",
    metaDescription: "Meta Ads från Local Rocket: geografiska målgrupper, annonsmaterial, lead-formulär, pixel och A/B-testning. Nå kunder i ditt område innan de börjat söka.",
    incl: [
      ["Målgrupper", "Geografiska och intressebaserade målgrupper, plus retargeting av besökare."],
      ["Annonsmaterial", "Bild, video och text anpassat för flödet, med tydlig lokal förankring."],
      ["Lead-formulär", "Formulär direkt i appen, kopplade till din mejl eller ditt CRM."],
      ["Pixel och spårning", "Meta-pixel och konverterings-API uppsatt så att vi mäter rätt."],
      ["A/B-testning", "Vi testar budskap och kreativ löpande och flyttar budget till vinnarna."],
      ["Månadsrapport", "Kostnad per lead, räckvidd och vad som fungerade bäst."],
    ],
    fit: [
      "Din tjänst är visuell eller lätt att visa i bild",
      "Du vill synas för fler än de som redan söker",
      "Du har erbjudanden eller säsonger att lyfta",
    ],
    faq: [
      ["Fungerar Meta Ads för tjänsteföretag?", "Ja, särskilt för tjänster som renovering, städ, flytt och skönhet där bilder och förtroende spelar roll."],
      ["Behöver jag ta fram bilder och video?", "Har du eget material använder vi det. Annars tar vi fram annonsmaterial utifrån det du har."],
      ["Vad är skillnaden mot Google Ads?", "Google Ads når de som redan söker. Meta Ads når personer i ditt område innan de har börjat leta, och bygger kännedom."],
      ["Äger jag annonskontot?", "Ja. Kontot och pixeln ligger i ditt namn."],
    ],
  },
};

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

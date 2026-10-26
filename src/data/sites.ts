/**
 * Branscher där vi har en directory-sajt live. Styr branschlistan på startsidan
 * och leadsidan, sidfotens branschlänkar och "Våra sajter" på om oss-sidan.
 *
 * Nischsajternas namn och domäner skrivs inte ut och länkas inte från
 * localrocket.se (Jespers beslut 2026-10-26). Bara branschnamnet visas.
 * Lägg till en rad här när en ny sajt öppnar.
 */
export type Industry = {
  /** Slug för landningssidorna /leadsgenerering/:slug och /seo/:slug */
  nicheSlug: string;
  /** Branschnamn i listor */
  label: string;
  /** Kort beskrivning till om oss-sidan */
  text: string;
};

export const INDUSTRIES: Industry[] = [
  { nicheSlug: "tandlakare", label: "Tandläkare", text: "Hjälper patienter att hitta en tandläkare i sin stad." },
  { nicheSlug: "bilhandlare", label: "Bilhandlare", text: "Hjälper bilköpare att hitta en bilhandlare i sin stad." },
  { nicheSlug: "taklaggare", label: "Takläggare", text: "Hjälper husägare att hitta en takläggare i sin stad." },
  { nicheSlug: "maklare", label: "Mäklarbyråer", text: "Hjälper bostadssäljare och köpare att hitta en mäklarbyrå i sin stad." },
  { nicheSlug: "stadfirmor", label: "Städfirmor", text: "Hjälper hushåll och företag att hitta en städfirma i sin stad." },
  { nicheSlug: "kiropraktor", label: "Kiropraktorer", text: "Hjälper patienter att hitta en kiropraktor i sin stad." },
  { nicheSlug: "elektriker", label: "Elfirmor", text: "Hjälper hushåll och företag att hitta en elfirma i sin stad." },
  { nicheSlug: "byggfirmor", label: "Byggfirmor", text: "Hjälper husägare att hitta en byggfirma i sin stad." },
  { nicheSlug: "flyttfirmor", label: "Flyttfirmor", text: "Hjälper den som ska flytta att hitta en flyttfirma i sin stad." },
];

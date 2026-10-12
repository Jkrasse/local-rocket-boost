/**
 * Directory-sajterna som är live just nu. Styr branschlistan på startsidan
 * och leadsidan, sidfotens branschlänkar och "Våra sajter" på om oss-sidan.
 * Lägg till en rad här när en ny sajt öppnar.
 */
export type LiveSite = {
  /** Slug för landningssidorna /leadsgenerering/:slug och /seo/:slug */
  nicheSlug: string;
  /** Branschnamn i listor */
  label: string;
  /** Sajtens namn */
  name: string;
  domain: string;
  /** Kort beskrivning till om oss-sidan */
  text: string;
};

export const SITES: LiveSite[] = [
  {
    nicheSlug: "tandlakare",
    label: "Tandläkare",
    name: "Tandläkarkollen.nu",
    domain: "tandlakarkollen.nu",
    text: "Hjälper patienter att hitta en tandläkare i sin stad.",
  },
  {
    nicheSlug: "bilhandlare",
    label: "Bilhandlare",
    name: "Bilhandlarkollen.se",
    domain: "bilhandlarkollen.se",
    text: "Hjälper bilköpare att hitta en bilhandlare i sin stad.",
  },
  {
    nicheSlug: "taklaggare",
    label: "Takläggare",
    name: "Takläggarkollen.se",
    domain: "taklaggarkollen.se",
    text: "Hjälper husägare att hitta en takläggare i sin stad.",
  },
  {
    nicheSlug: "maklare",
    label: "Mäklarbyråer",
    name: "Mäklarbyråkollen.se",
    domain: "maklarbyrakollen.se",
    text: "Hjälper bostadssäljare och köpare att hitta en mäklarbyrå i sin stad.",
  },
  {
    nicheSlug: "stadfirmor",
    label: "Städfirmor",
    name: "Stadfirmor.nu",
    domain: "stadfirmor.nu",
    text: "Hjälper hushåll och företag att hitta en städfirma i sin stad.",
  },
  {
    nicheSlug: "kiropraktor",
    label: "Kiropraktorer",
    name: "Kiropraktorkollen.se",
    domain: "kiropraktorkollen.se",
    text: "Hjälper patienter att hitta en kiropraktor i sin stad.",
  },
];

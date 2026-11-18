import { useEffect, useRef, useState } from "react";
import { Globe, MessageCircle, MoreHorizontal, Search, Share2, ThumbsUp, X } from "lucide-react";

const P = "Ditt Företag AB";
const C = "Uppsala";
const BETYG = "Betyg 4,8 av 5 från 190 omdömen.";
const ASSETS = "https://lzefyygjrofswefrhbsd.supabase.co/storage/v1/object/public/site-assets";

/**
 * En annonsvinkel. Google- och Meta-annonsen byter alltid tillsammans, så att
 * besökaren ser samma budskap i båda kanalerna. Vinklarna motsvarar sajtens
 * undertjänster och följer samma stil som annonsexemplen i partnerportalen.
 */
type Variant = {
  label: string; // knappen, t.ex. "Akut tandvård"
  path: string; // URL-segment i sökannonsen
  query: string; // sökningen
  headline: string; // annonsrubriken före " | Ditt Företag AB"
  desc: string; // sökannonsens beskrivning
  chips: string[];
  fraga: string; // rubriken i Meta-bilden
  meta: string; // inläggstexten
};

type Profile = {
  site: string; // "Tandläkarkollen.nu", visas som avsändare
  domain: string;
  icon?: string; // favicon, annars ritas bilhandlarmärket
  color: string; // sajtens primärfärg, styr Meta-mallarna
  noun: string; // "tandläkarklinik"
  variants: Variant[];
};

const v = (
  label: string,
  path: string,
  query: string,
  headline: string,
  desc: string,
  chips: string[],
  fraga: string,
  meta: string,
): Variant => ({ label, path, query, headline, desc, chips, fraga, meta });

const PROFILES: Record<string, Profile> = {
  tandlakare: {
    site: "Tandläkarkollen.nu", domain: "tandlakarkollen.nu", icon: `${ASSETS}/tandlakare/favicon-192-v1.png`,
    color: "hsl(205 75% 38%)", noun: "tandläkarklinik",
    variants: [
      v("Tandläkare", "tandlakare", "tandläkare uppsala", "Tandläkare Uppsala",
        `${P} är vår rekommenderade tandläkarklinik i ${C}. ${BETYG} Boka tid enkelt.`,
        ["Undersökning", "Tandhygienist", "Boka tid"], `Letar du efter tandläkare i ${C}?`,
        `Letar du efter en ny tandläkare? 🦷 ${P} är Tandläkarkollens rekommenderade tandläkarklinik i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Uppskjutet besök", "tandlakare", "boka tandläkare uppsala", `Boka Tandläkare i ${C}`,
        `Dags för undersökning? Boka tid hos ${P}, vår rekommenderade klinik i ${C}. ${BETYG}`,
        ["Undersökning", "Boka tid"], "Har du skjutit fram ditt tandläkarbesök?",
        `Det är lätt att skjuta upp. Boka en undersökning hos ${P}, vår rekommenderade tandläkarklinik i ${C}.`),
      v("Akut tandvård", "akut-tandvard", "akut tandläkare uppsala", `Akut Tandvård ${C}`,
        `Ont i tanden? Kontakta ${P}, vår rekommenderade klinik i ${C}. ${BETYG}`,
        ["Akut tandvård", "Ring direkt", "Boka tid"], `Behöver du akut tandvård i ${C}?`,
        `Ont i tanden? Kontakta ${P}, Tandläkarkollens rekommenderade klinik för akut tandvård i ${C}.`),
      v("Tandblekning", "tandblekning", "tandblekning uppsala", `Tandblekning i ${C}`,
        `Vill du ha vitare tänder? ${P} är vår rekommenderade klinik i ${C}. Tandblekning, Invisalign och implantat.`,
        ["Tandblekning", "Invisalign", "Tandimplantat"], "Drömmer du om ett vitare leende?",
        `Tandblekning eller Invisalign? ✨ ${P} är vår rekommenderade klinik för estetisk tandvård i ${C}.`),
    ],
  },
  elektriker: {
    site: "Elfirmakollen.se", domain: "elfirmakollen.se", icon: `${ASSETS}/elektriker/favicon-192-v1.png`,
    color: "hsl(220 60% 30%)", noun: "elektriker",
    variants: [
      v("Elektriker", "elektriker", "elektriker uppsala", "Elektriker Uppsala",
        `${P} är vår rekommenderade elektriker i ${C}. ${BETYG} Begär offert direkt.`,
        ["Elinstallation", "Elbesiktning", "Begär offert"], `Behöver du en elektriker i ${C}?`,
        `Behöver du hjälp med elen hemma? ⚡ ${P} är Elfirmakollens rekommenderade elektriker i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Laddbox", "installera-laddbox", "installera laddbox uppsala", `Installera Laddbox i ${C}`,
        `Ska du ladda elbilen hemma? Begär offert från ${P}, vår rekommenderade elektriker i ${C}. ${BETYG}`,
        ["Installera laddbox", "Begär offert"], "Dags att installera laddbox hemma?",
        `Ny elbil? 🔌 Begär offert på laddbox från ${P}, vår rekommenderade elektriker i ${C}.`),
      v("Byta elcentral", "byta-elcentral", "byta elcentral uppsala", `Byta Elcentral i ${C}`,
        `Säkringar som löser ut? Begär offert från ${P}, vår rekommenderade elektriker i ${C}. ${BETYG}`,
        ["Byta elcentral", "Elbesiktning", "Begär offert"], "Är det dags att byta elcentral?",
        `Proppar som går om och om igen? ${P} är Elfirmakollens rekommenderade elektriker i ${C}. Begär offert på ny elcentral.`),
      v("Eljour", "eljour", "eljour uppsala", `Eljour i ${C}`,
        `Elfel som inte kan vänta? Kontakta ${P}, Elfirmakollens rekommenderade elektriker i ${C}. ${BETYG}`,
        ["Eljour", "Ring direkt"], `Strömavbrott eller elfel i ${C}?`,
        `Elfel som inte kan vänta? Kontakta ${P}, vår rekommenderade elektriker för eljour i ${C}.`),
    ],
  },
  stadfirmor: {
    site: "Stadfirmor.nu", domain: "stadfirmor.nu", icon: "https://stadfirmor.nu/apple-touch-icon.png",
    color: "hsl(160 79% 27%)", noun: "städfirma",
    variants: [
      v("Hemstäd", "stadfirmor", "städfirma uppsala", "Städfirma Uppsala",
        `${P} är vår rekommenderade städfirma i ${C}. ${BETYG} Hemstädning med RUT-avdrag.`,
        ["Hemstäd", "Storstäd", "Begär offert"], `Söker du en städfirma i ${C}?`,
        `Mer tid över i vardagen? ✨ ${P} är vår rekommenderade städfirma i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Flyttstäd", "flyttstad", "flyttstädning uppsala", `Flyttstädning i ${C}`,
        `Ska du flytta? Begär offert på flyttstäd från ${P}, vår rekommenderade städfirma i ${C}. ${BETYG}`,
        ["Flyttstäd", "Fönsterputs", "Begär offert"], `Dags för flyttstädning i ${C}?`,
        `Ska du flytta? 📦 Låt ${P} ta flyttstädningen. Vår rekommenderade städfirma i ${C}.`),
      v("Fönsterputs", "fonsterputs", "fönsterputs uppsala", `Fönsterputs i ${C}`,
        `Rena fönster utan besvär. Begär offert från ${P}, vår rekommenderade städfirma i ${C}. ${BETYG}`,
        ["Fönsterputs", "Hemstäd", "Begär offert"], "Vill du ha skinande rena fönster?",
        `Släpp in ljuset ☀️ Begär offert på fönsterputs från ${P}, vår rekommenderade städfirma i ${C}.`),
      v("Kontorsstäd", "kontorsstad", "kontorsstädning uppsala", `Kontorsstäd i ${C}`,
        `Behöver ni regelbunden kontorsstädning? Begär offert från ${P}, vår rekommenderade städfirma i ${C}.`,
        ["Kontorsstäd", "Begär offert"], "Behöver kontoret en ny städfirma?",
        `Ett rent kontor gör skillnad. ${P} är vår rekommenderade städfirma för kontorsstäd i ${C}.`),
    ],
  },
  flyttfirmor: {
    site: "Flyttbolagskollen.se", domain: "flyttbolagskollen.se", icon: `${ASSETS}/flyttfirma/favicon-192-v1.png`,
    color: "hsl(200 55% 30%)", noun: "flyttfirma",
    variants: [
      v("Flyttfirma", "flyttfirma", "flyttfirma uppsala", "Flyttfirma Uppsala",
        `${P} är vår rekommenderade flyttfirma i ${C}. ${BETYG} Begär offert direkt.`,
        ["Bohagsflytt", "Flyttstädning", "Begär offert"], `Ska du flytta i ${C}?`,
        `Ny adress på gång? 📦 ${P} är Flyttbolagskollens rekommenderade flyttfirma i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Flytt och städ", "flyttstadning", "flytt och flyttstädning uppsala", `Flytt & Flyttstädning i ${C}`,
        `Samla flytten och städningen hos en firma. Begär offert från ${P}, vår rekommenderade flyttfirma i ${C}.`,
        ["Flyttstädning", "Magasinering", "Begär offert"], "Vill du slippa flyttstädningen?",
        `Flytt och flyttstäd från samma firma? Begär offert från ${P}, vår rekommenderade flyttfirma i ${C}.`),
      v("Kontorsflytt", "kontorsflytt", "kontorsflytt uppsala", `Kontorsflytt i ${C}`,
        `Planerar ni en kontorsflytt? Begär offert från ${P}, Flyttbolagskollens rekommenderade flyttfirma i ${C}.`,
        ["Kontorsflytt", "Magasinering", "Begär offert"], "Ska företaget byta kontor?",
        `Planerar ni en kontorsflytt? ${P} är vår rekommenderade flyttfirma i ${C}. Begär offert direkt.`),
      v("Dödsbotömning", "dodsbotomning", "dödsbotömning uppsala", `Dödsbotömning i ${C}`,
        `Hjälp med att tömma ett dödsbo. Kontakta ${P}, vår rekommenderade flyttfirma i ${C}. ${BETYG}`,
        ["Dödsbotömning", "Flyttstädning", "Begär offert"], "Behöver du hjälp med ett dödsbo?",
        `Det kan vara tungt att ta hand om ett dödsbo. ${P} hjälper till med dödsbotömning i ${C} och är vår rekommenderade flyttfirma.`),
    ],
  },
  taklaggare: {
    site: "Takläggarkollen.se", domain: "taklaggarkollen.se", icon: `${ASSETS}/taklaggare/favicon-192-v1.png`,
    color: "hsl(215 28% 30%)", noun: "takläggare",
    variants: [
      v("Takläggare", "taklaggare", "takläggare uppsala", "Takläggare Uppsala",
        `${P} är vår rekommenderade takläggare i ${C}. ${BETYG} Begär offert direkt.`,
        ["Takbyte", "Takrenovering", "Begär offert"], `Letar du efter en takläggare i ${C}?`,
        `Dags att se över taket? 🏠 ${P} är Takläggarkollens rekommenderade takläggare i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Takbyte", "takbyte", "takbyte uppsala", `Takbyte i ${C}`,
        `Planerar du takbyte? Begär offert från ${P}, vår rekommenderade takläggare i ${C}. Tegel, plåt och papp.`,
        ["Tegeltak", "Plåttak", "Begär offert"], "Är det dags att byta tak?",
        `Har taket gjort sitt? Begär offert på takbyte från ${P}, vår rekommenderade takläggare i ${C}.`),
      v("Takreparation", "takreparation", "takreparation uppsala", `Takreparation i ${C}`,
        `Läcker taket? Kontakta ${P}, vår rekommenderade takläggare i ${C}. ${BETYG}`,
        ["Takreparation", "Takbesiktning", "Begär offert"], "Läcker det in genom taket?",
        `Fukt eller läckage? 💧 Kontakta ${P}, Takläggarkollens rekommenderade takläggare i ${C}.`),
      v("Takmålning", "takmalning", "takmålning uppsala", `Takmålning i ${C}`,
        `Taktvätt eller takmålning? Begär offert från ${P}, vår rekommenderade takläggare i ${C}. ${BETYG}`,
        ["Takmålning", "Taktvätt", "Begär offert"], "Vill du ge taket nytt liv?",
        `Dags för taktvätt eller takmålning? Begär offert från ${P}, vår rekommenderade takläggare i ${C}.`),
    ],
  },
  maklare: {
    site: "Mäklarbyråkollen.se", domain: "maklarbyrakollen.se", icon: `${ASSETS}/maklarbyra/favicon-192-v1.png`,
    color: "hsl(350 55% 30%)", noun: "mäklare",
    variants: [
      v("Mäklare", "maklarbyra", "mäklare uppsala", "Mäklare Uppsala",
        `${P} är vår rekommenderade mäklare i ${C}. ${BETYG} Boka en värdering av din bostad.`,
        ["Värdera bostad", "Sälja lägenhet", "Boka värdering"], `Letar du efter en mäklare i ${C}?`,
        `Funderar du på att sälja? 🔑 ${P} är Mäklarbyråkollens rekommenderade mäklare i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Sälja lägenhet", "salja-lagenhet", "sälja lägenhet uppsala", `Sälja Lägenhet i ${C}`,
        `Ska du sälja? ${P} är vår rekommenderade mäklare i ${C}. ${BETYG}`,
        ["Sälja lägenhet", "Boka värdering"], `Ska du sälja lägenheten i ${C}?`,
        `Dags för nästa steg? ${P} är vår rekommenderade mäklare i ${C}. Boka en värdering av lägenheten.`),
      v("Värdering", "vardera-bostad", "värdera bostad uppsala", `Värdera Din Bostad i ${C}`,
        `Vad är din bostad värd? Kontakta ${P}, Mäklarbyråkollens rekommenderade mäklare i ${C}. ${BETYG}`,
        ["Värdera bostad", "Boka värdering"], "Vad är din bostad värd?",
        `Nyfiken på vad bostaden är värd? Boka en värdering hos ${P}, Mäklarbyråkollens rekommenderade mäklare i ${C}.`),
      v("Sälja hus", "salja-hus", "sälja hus uppsala", `Sälja Hus i ${C}`,
        `Ska huset säljas? ${P} är vår rekommenderade mäklare i ${C}. ${BETYG}`,
        ["Sälja hus", "Värdera bostad", "Boka värdering"], "Dags att sälja huset?",
        `Ska villan säljas? 🏡 ${P} är vår rekommenderade mäklare för hus i ${C}.`),
    ],
  },
  bilhandlare: {
    site: "Bilhandlarkollen.se", domain: "bilhandlarkollen.se", color: "#1E3354", noun: "bilhandlare",
    variants: [
      v("Bilhandlare", "bilhandlare", "bilhandlare uppsala", "Bilhandlare Uppsala",
        `${P} är vår rekommenderade bilhandlare i ${C}. ${BETYG} Se bilar i lager och boka provkörning.`,
        ["Bilar i lager", "Inbyte", "Boka provkörning"], `Dags för ny bil i ${C}?`,
        `Dags för ny bil i ${C}? 🚗 ${P} är Bilhandlarkollens rekommenderade bilhandlare i ${C}, med betyget 4,8 från 190 kundomdömen.`),
      v("Begagnade bilar", "begagnade-bilar", "begagnade bilar uppsala", `Begagnade Bilar i ${C}`,
        `Letar du efter din nästa bil? ${P} är vår rekommenderade bilhandlare i ${C}. ${BETYG}`,
        ["Bilar i lager", "Boka provkörning"], "Letar du efter en begagnad bil?",
        `Din nästa bil kanske står i ${C}. ${P} är vår rekommenderade bilhandlare för begagnade bilar.`),
      v("Privatleasing", "privatleasing-bil", "privatleasing uppsala", `Privatleasing i ${C}`,
        `Funderar du på privatleasing? Kontakta ${P}, Bilhandlarkollens rekommenderade bilhandlare i ${C}. ${BETYG}`,
        ["Privatleasing", "Företagsleasing", "Kontakta oss"], "Funderar du på privatleasing?",
        `Ny bil till fast månadskostnad? Kontakta ${P}, Bilhandlarkollens rekommenderade bilhandlare i ${C}.`),
      v("Sälja bil", "salja-bil", "sälja bil uppsala", `Sälja Bilen i ${C}?`,
        `Ska du sälja eller byta in bilen? Kontakta ${P}, vår rekommenderade bilhandlare i ${C}. ${BETYG}`,
        ["Sälja bil", "Inbyte", "Kontakta oss"], `Vill du sälja din bil i ${C}?`,
        `Ska bilen säljas eller bytas in? Kontakta ${P}, vår rekommenderade bilhandlare i ${C}.`),
    ],
  },
  byggfirmor: {
    site: "Byggfirmakollen.se", domain: "byggfirmakollen.se", icon: `${ASSETS}/byggforetag/favicon-192-v2.png`,
    color: "hsl(222 22% 26%)", noun: "byggfirma",
    variants: [
      v("Byggfirma", "byggforetag", "byggfirma uppsala", "Byggfirma Uppsala",
        `${P} är vår rekommenderade byggfirma i ${C}. ${BETYG} Begär offert direkt.`,
        ["Renovering", "Tillbyggnad", "Begär offert"], `Söker du en byggfirma i ${C}?`,
        `Planerar du att bygga eller renovera? 🔨 ${P} är Byggfirmakollens rekommenderade byggfirma i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Badrum", "badrumsrenovering", "badrumsrenovering uppsala", `Badrumsrenovering i ${C}`,
        `Drömmer du om ett nytt badrum? Begär offert från ${P}, vår rekommenderade byggfirma i ${C}. ${BETYG}`,
        ["Badrumsrenovering", "Köksrenovering", "Begär offert"], "Dags att renovera badrummet?",
        `Drömmer du om ett nytt badrum? 🛁 Begär offert från ${P}, vår rekommenderade byggfirma i ${C}.`),
      v("Kök", "koksrenovering", "köksrenovering uppsala", `Köksrenovering i ${C}`,
        `Dags för ett nytt kök? Begär offert från ${P}, Byggfirmakollens rekommenderade byggfirma i ${C}. ${BETYG}`,
        ["Köksrenovering", "Begär offert"], "Är det dags för ett nytt kök?",
        `Köket är hemmets hjärta. Begär offert på köksrenovering från ${P}, vår rekommenderade byggfirma i ${C}.`),
      v("Altan", "altanbygge", "bygga altan uppsala", `Altanbygge i ${C}`,
        `Vill du bygga altan? Begär offert från ${P}, vår rekommenderade byggfirma i ${C}. ${BETYG}`,
        ["Altanbygge", "Tillbyggnad", "Begär offert"], "Drömmer du om en ny altan?",
        `Mer plats för umgänge ☀️ Begär offert på altanbygge från ${P}, vår rekommenderade byggfirma i ${C}.`),
    ],
  },
  kiropraktor: {
    site: "Kiropraktorkollen.se", domain: "kiropraktorkollen.se", icon: `${ASSETS}/kiropraktor/favicon-192-v1.png`,
    color: "hsl(232 42% 36%)", noun: "kiropraktor",
    variants: [
      v("Kiropraktor", "kiropraktor", "kiropraktor uppsala", "Kiropraktor Uppsala",
        `${P} är vår rekommenderade kiropraktor i ${C}. ${BETYG} Boka tid direkt.`,
        ["Ryggbesvär", "Massage", "Boka tid"], `Letar du efter en kiropraktor i ${C}?`,
        `Ont i ryggen eller nacken? 💆 ${P} är Kiropraktorkollens rekommenderade kiropraktor i ${C}, med betyget 4,8 från 190 omdömen.`),
      v("Akut kiropraktor", "akut-kiropraktor", "akut kiropraktor uppsala", `Akut Kiropraktor i ${C}`,
        `Ryggskott eller nackspärr? Boka tid hos ${P}, vår rekommenderade kiropraktor i ${C}. ${BETYG}`,
        ["Akut kiropraktor", "Boka tid"], "Har du fått ryggskott?",
        `Ryggskott eller nackspärr? Boka tid hos ${P}, vår rekommenderade kiropraktor i ${C}.`),
      v("Gravida", "kiropraktor-for-gravida", "kiropraktor gravid uppsala", `Kiropraktor för Gravida i ${C}`,
        `Gravid och ont i ryggen? Boka tid hos ${P}, vår rekommenderade kiropraktor i ${C}. ${BETYG}`,
        ["Kiropraktor för gravida", "Boka tid"], "Ont i ryggen under graviditeten?",
        `Gravid och ont i ryggen? ${P} är vår rekommenderade kiropraktor för gravida i ${C}.`),
      v("Nacke och rygg", "kiropraktor", "kiropraktor nacke uppsala", `Nackbesvär? Kiropraktor i ${C}`,
        `Stel efter långa dagar vid skrivbordet? Boka tid hos ${P}, Kiropraktorkollens rekommenderade kiropraktor i ${C}.`,
        ["Nackbesvär", "Massage", "Boka tid"], "Sitter du still hela dagarna?",
        `Stel efter långa dagar vid skrivbordet? Boka tid hos ${P}, Kiropraktorkollens rekommenderade kiropraktor i ${C}.`),
    ],
  },
};

/** Jespers Meta-mallar från Claude Design (public/annonsmallar/fb.html), alla 1080×1080 */
const MALLAR = ["A", "C", "F", "G"];

const SiteBadge = ({ p, size = 28 }: { p: Profile; size?: number }) => (
  <span
    className="shrink-0 rounded-full border border-[#e3e5e8] bg-white grid place-items-center overflow-hidden"
    style={{ width: size, height: size }}
  >
    {p.icon ? (
      <img src={p.icon} alt="" width={size} height={size} loading="lazy" className="w-full h-full object-cover" />
    ) : (
      // Bilhandlarkollens runda märke (ratt)
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#1F4E79" />
        <circle cx="12" cy="12" r="6.2" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M5.8 12h12.4M12 12v6.2" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.3" fill="#F28C28" />
      </svg>
    )}
  </span>
);

const Skeleton = () => (
  <div className="px-5 py-5 border-t-[6px] border-[#f1f3f4]">
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-full bg-[#e8e8e8]" />
      <div className="flex-1 grid gap-1.5">
        <span className="h-2.5 w-[45%] rounded-sm bg-[#e8e8e8]" />
        <span className="h-2 w-[70%] rounded-sm bg-[#efefef]" />
      </div>
    </div>
    <div className="grid gap-2.5">
      <span className="h-3.5 w-[78%] rounded-sm bg-[#e8e8e8]" />
      <span className="h-2.5 w-full rounded-sm bg-[#efefef]" />
      <span className="h-2.5 w-[60%] rounded-sm bg-[#efefef]" />
    </div>
  </div>
);

const GoogleAd = ({ p, a }: { p: Profile; a: Variant }) => (
  <div className="mx-auto w-full max-w-[400px] rounded-[44px] border-[5px] border-[#d2d2d2] bg-white p-2.5 shadow-card">
    <div
      className="rounded-[32px] border border-[#e6e6e6] bg-white overflow-hidden text-left"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="flex items-center justify-between px-5 pt-6">
        <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
          <path d="M0 1.5h22M0 8h22M0 14.5h22" stroke="#202124" strokeWidth="2" />
        </svg>
        <span className="text-[30px] leading-none tracking-[-0.03em]" style={{ fontFamily: "Arial, sans-serif" }}>
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </span>
        <span className="w-8 h-8 rounded-full bg-[#e8eaed]" />
      </div>

      <div className="mx-5 mt-5 flex items-center gap-3 rounded-pill border border-[#eceef1] px-4 h-12 text-[16px] text-[#202124] shadow-[0_1px_6px_rgba(32,33,36,.18)]">
        <Search className="w-[18px] h-[18px] text-[#9aa0a6]" />
        <span className="truncate">{a.query}</span>
      </div>

      <div className="mx-5 mt-4 flex gap-5 border-b border-[#e3e5e8] text-[13.5px] text-[#5f6368]">
        {["Alla", "Kartor", "Bilder", "Nyheter", "Videor"].map((t, i) => (
          <span key={t} className={`pb-2.5 ${i === 0 ? "font-bold text-[#202124] border-b-[3px] border-[#202124]" : ""}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="text-[13.5px] font-bold text-[#202124] mb-2.5">Sponsrad</div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <SiteBadge p={p} />
          <div className="leading-tight min-w-0">
            <div className="text-[14.5px] text-[#202124]">{p.site.replace(/\.(se|nu)$/, "")}</div>
            <div className="text-[12px] text-[#4d5156] truncate">
              https://{p.domain} › {a.path} › uppsala
            </div>
          </div>
          <span className="ml-auto text-[#5f6368] text-lg leading-none">⋮</span>
        </div>
        <div className="text-[20px] leading-[1.25] text-[#1a0dab] mb-2">
          {a.headline} | {P}
        </div>
        <p className="text-[14px] leading-[1.5] text-[#4d5156]">{a.desc}</p>
        <div className="flex flex-wrap gap-2 mt-3.5">
          {a.chips.map((c) => (
            <span key={c} className="rounded-pill border border-[#dadce0] px-3 py-1.5 text-[13px] text-[#1a0dab]">
              {c}
            </span>
          ))}
        </div>
      </div>

      <Skeleton />
      <Skeleton />
    </div>
  </div>
);

/** Mallbilden ritas i 1080 px och skalas ned till kortets bredd */
const MetaImage = ({ src, title }: { src: string; title: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1080));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full aspect-square overflow-hidden bg-[#F0F2F5]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{ width: 1080, height: 1080, transform: `scale(${scale})` }}
      />
    </div>
  );
};

const metaSrc = (p: Profile, a: Variant, mall: string) =>
  `/annonsmallar/fb.html?mall=${mall}&d=${encodeURIComponent(
    JSON.stringify({
      sajt: p.site,
      masthead: p.site.replace(/\.(se|nu)$/, ""),
      plats: C,
      ar: String(new Date().getFullYear()),
      fraga: a.fraga,
      partner: P,
      betyg: "4,8",
      omdomen: "190",
      cta: "Se vår partner",
      theme: { brand: p.color },
    }),
  )}`;

const MetaAd = ({ p, active }: { p: Profile; active: number }) => {
  const a = p.variants[active];
  return (
    <div
      className="mx-auto w-full max-w-[460px] rounded-lg border border-line-soft bg-white overflow-hidden shadow-card text-left"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
        <SiteBadge p={p} size={40} />
        <div className="leading-tight">
          <div className="text-[15px] font-bold text-[#050505]">{p.site}</div>
          <div className="text-[12.5px] text-[#65676b] flex items-center gap-1">
            Sponsrad · <Globe className="w-3 h-3" />
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-[#65676b] ml-auto" />
        <X className="w-5 h-5 text-[#65676b]" />
      </div>
      <p className="px-4 pb-3 text-[14.5px] leading-[1.4] text-[#050505] min-h-[64px]">{a.meta}</p>

      {/* Alla bilder ligger kvar i DOM:en så att byte av vinkel inte laddar om mallen */}
      {p.variants.map((x, i) => (
        <div key={x.label} className={i === active ? "" : "hidden"}>
          <MetaImage src={metaSrc(p, x, MALLAR[i % MALLAR.length])} title={`Facebook-annons: ${x.fraga}`} />
        </div>
      ))}

      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#f0f2f5]">
        <div className="min-w-0">
          <div className="text-[12px] uppercase text-[#65676b]">{p.domain}</div>
          <div className="text-[15.5px] font-bold text-[#050505] leading-snug">{P}</div>
          <div className="text-[13.5px] text-[#65676b]">
            Rekommenderad {p.noun} i {C}
          </div>
        </div>
        <span className="shrink-0 rounded-md bg-[#e4e6eb] px-3.5 py-2 text-[14px] font-semibold text-[#050505]">Läs mer</span>
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 text-[13.5px] text-[#65676b]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-[18px] h-[18px] rounded-full bg-[#1877F2] grid place-items-center">
            <ThumbsUp className="w-2.5 h-2.5 text-white" fill="currentColor" />
          </span>
          18
        </span>
        <span>7 delningar</span>
      </div>
      <div className="flex justify-around border-t border-[#e4e6eb] px-4 py-2.5 text-[13.5px] font-semibold text-[#65676b]">
        <span className="inline-flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4" /> Gilla
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" /> Kommentera
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Share2 className="w-4 h-4" /> Dela
        </span>
      </div>
    </div>
  );
};

/** Exemplet anpassas per nisch; utan profil (t.ex. VVS som saknar egen sajt) visas bilhandlarexemplet. */
const AdMockupsSection = ({ niche }: { niche?: string }) => {
  const p = (niche && PROFILES[niche]) || PROFILES.bilhandlare;
  const [active, setActive] = useState(0);
  const a = p.variants[active];

  return (
    <section className="section bg-background-elevated border-y border-line-soft">
      <div className="container mx-auto px-5 md:px-10 max-w-container">
        <div className="head">
          <div>
            <div className="label mb-6">Så driver vi trafiken</div>
            <h2 className="h-l">
              Vi annonserar. <span className="italic-accent">Du</span> får kunderna.
            </h2>
          </div>
          <p className="lede">
            Vi kör Google Ads och Meta Ads för directory-sajten i din stad. Annonserna lyfter fram ditt
            företag som rekommenderad partner, med namn och betyg, för flera av dina tjänster.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Annonsvinkel">
          {p.variants.map((x, i) => (
            <button
              key={x.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`h-10 px-4 rounded-pill border text-[14.5px] font-medium transition-colors ${
                i === active
                  ? "bg-primary border-primary text-white"
                  : "bg-background border-line text-foreground hover:border-primary"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-8 items-center">
          <div className="min-w-0">
            <div className="eyebrow mb-4 justify-center">Google Ads · sökannons</div>
            <GoogleAd p={p} a={a} />
          </div>
          <div className="min-w-0">
            <div className="eyebrow mb-4 justify-center">Meta Ads · Facebook och Instagram</div>
            <MetaAd p={p} active={active} />
          </div>
        </div>

        <p className="text-center text-sm text-ink-mute mt-10">
          Exempel för en {p.noun} i {C}. Texter och bilder anpassas efter din bransch, dina tjänster och din stad.
        </p>
      </div>
    </section>
  );
};

export default AdMockupsSection;

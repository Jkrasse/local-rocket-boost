import { writeFileSync } from "fs";
import { resolve } from "path";
import { allNicheSlugs } from "../src/data/niches";

const BASE_URL = "https://localrocket.se";

interface Entry {
  path: string;
  changefreq?: string;
  priority?: string;
}

const entries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/sa-fungerar-det", changefreq: "monthly", priority: "0.8" },
  { path: "/integritetspolicy", changefreq: "yearly", priority: "0.3" },
  { path: "/villkor", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  ...allNicheSlugs.map((slug) => ({
    path: `/leadsgenerering/${slug}`,
    changefreq: "weekly",
    priority: "0.9",
  })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);

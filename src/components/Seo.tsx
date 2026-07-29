import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  jsonLd?: object[];
};

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Sätter title, meta-taggar, canonical och JSON-LD för en sida.
 * Ersätter react-helmet-async som inte applicerar taggar i denna setup.
 */
const Seo = ({ title, description, canonical, ogType = "website", jsonLd = [] }: SeoProps) => {
  useEffect(() => {
    document.title = title;
    upsertMeta("property", "og:title", title);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("property", "og:type", ogType);

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    if (canonical) {
      upsertCanonical(canonical);
      upsertMeta("property", "og:url", canonical);
    }

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    jsonLd.forEach((obj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(obj);
      document.head.appendChild(script);
    });

    return () => {
      document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    };
    // JSON-LD jämförs via innehåll, inte referens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, ogType, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;

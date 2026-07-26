import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { cheminLocalise, locales } from "@/i18n/config";
import { routes, site } from "@/lib/site";

/**
 * Plan du site, en trois langues. Chaque URL declare ses equivalents via
 * `alternates.languages` : Google associe ainsi les versions entre elles
 * plutot que de les traiter comme du contenu dupplique.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: routes.home, priority: 1, freq: "monthly" },
    { path: routes.about, priority: 0.8, freq: "monthly" },
    { path: routes.consultations, priority: 0.8, freq: "monthly" },
    { path: routes.certification, priority: 0.6, freq: "yearly" },
    { path: routes.news, priority: 0.7, freq: "weekly" },
    { path: routes.newsCategory, priority: 0.4, freq: "weekly" },
    { path: routes.faq, priority: 0.7, freq: "monthly" },
    { path: routes.gallery, priority: 0.6, freq: "monthly" },
    { path: routes.symbiosteo, priority: 0.6, freq: "monthly" },
    { path: routes.contact, priority: 0.9, freq: "monthly" },
    { path: routes.legal, priority: 0.2, freq: "yearly" },
    { path: routes.privacy, priority: 0.2, freq: "yearly" },
    { path: routes.cookies, priority: 0.2, freq: "yearly" },
  ];

  const absolue = (chemin: string) => new URL(chemin, site.url).toString();

  /** Les trois versions d'un meme chemin, pour la balise `alternates`. */
  const alternatives = (chemin: string) =>
    Object.fromEntries(locales.map((l) => [l, absolue(cheminLocalise(chemin, l))]));

  const now = new Date();
  const statiques: MetadataRoute.Sitemap = pages.flatMap(({ path, priority, freq }) =>
    locales.map((locale) => ({
      url: absolue(cheminLocalise(path, locale)),
      lastModified: now,
      changeFrequency: freq,
      priority: locale === "fr" ? priority : priority * 0.9,
      alternates: { languages: alternatives(path) },
    })),
  );

  const articles: MetadataRoute.Sitemap = getArticles().flatMap((article) =>
    locales.map((locale) => ({
      url: absolue(cheminLocalise(`/${article.slug}`, locale)),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: locale === "fr" ? 0.6 : 0.5,
      alternates: { languages: alternatives(`/${article.slug}`) },
    })),
  );

  return [...statiques, ...articles];
}

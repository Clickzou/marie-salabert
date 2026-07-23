import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { routes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: routes.home, priority: 1, freq: "monthly" },
    { path: routes.about, priority: 0.8, freq: "monthly" },
    { path: routes.consultations, priority: 0.8, freq: "monthly" },
    { path: routes.certification, priority: 0.6, freq: "yearly" },
    { path: routes.news, priority: 0.7, freq: "weekly" },
    { path: routes.newsCategory, priority: 0.4, freq: "weekly" },
    { path: routes.faq, priority: 0.7, freq: "monthly" },
    { path: routes.gallery, priority: 0.6, freq: "monthly" },
    { path: routes.symbiosteo, priority: 0.6, freq: "monthly" },
    { path: routes.booking, priority: 0.9, freq: "monthly" },
    { path: routes.contact, priority: 0.9, freq: "monthly" },
    { path: routes.legal, priority: 0.2, freq: "yearly" },
    { path: routes.privacy, priority: 0.2, freq: "yearly" },
    { path: routes.cookies, priority: 0.2, freq: "yearly" },
  ];

  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = pages.map(({ path, priority, freq }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const articles: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: new URL(`/${article.slug}`, site.url).toString(),
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...articles];
}

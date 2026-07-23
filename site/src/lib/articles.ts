/**
 * Lecture des articles du blog.
 *
 * Les articles vivent dans `src/content/articles/<slug>.mdx` : un bloc de
 * frontmatter YAML minimal (cle: valeur) suivi du corps en Markdown.
 * Tout est lu au moment du build (composants serveur + generateStaticParams),
 * il n'y a donc aucun acces disque a l'execution ni de runtime edge.
 *
 * Aucune dependance externe : le frontmatter et le Markdown employes ici se
 * limitent a des paires cle/valeur et a des paragraphes, un parseur maison
 * suffit et evite d'alourdir le projet.
 */

import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

export type Article = {
  /** Segment d'URL de l'article : /<slug> */
  slug: string;
  title: string;
  description: string;
  /** Date de publication ISO 8601 (sert au tri) */
  date: string;
  /**
   * Libelle libre de la date/periode, tel qu'ecrit dans la source
   * (« 2017 à 2020 », « 23 au 25 octobre 2022 »…). Affiche tel quel.
   */
  dateLabel: string;
  /**
   * Image mise en avant, dans /public/images/... Optionnelle : si vide,
   * un visuel de remplacement (degrade + titre) est affiche a la place.
   */
  image: string;
  imageAlt: string;
  /** Extrait court (25 mots), tel qu'affiche sur les cartes d'Elementor */
  excerpt: string;
  /** Slugs d'articles lies, pour la rubrique « À lire aussi ». */
  related: string[];
  /** Corps de l'article en Markdown */
  body: string;
};

/** Bloc de contenu issu du corps Markdown, pret a etre rendu en JSX. */
export type ArticleBlock =
  | { type: "heading"; level: 2 | 3 | 4; lines: string[] }
  | { type: "paragraph"; lines: string[] };

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const normalised = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = normalised.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: normalised.trim() };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (!pair) continue;
    let value = pair[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[pair[1]] = value;
  }

  return { data, body: normalised.slice(match[0].length).trim() };
}

function readArticle(fileName: string): Article {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const { data, body } = parseFrontmatter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    dateLabel: data.dateLabel ?? "",
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? "",
    excerpt: data.excerpt ?? "",
    related: (data.related ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    body,
  };
}

/** Tous les articles publies, du plus recent au plus ancien. */
export function getArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readArticle)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Un article par son slug, ou `undefined` s'il n'existe pas. */
export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/**
 * Decoupe le corps Markdown en blocs. Les paragraphes sont separes par une
 * ligne vide ; un simple retour a la ligne devient un <br /> (comme le <br>
 * present dans le premier paragraphe de l'article d'origine).
 */
export function toBlocks(body: string): ArticleBlock[] {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): ArticleBlock => {
      const heading = chunk.match(/^(#{2,4})\s+(.*)$/);
      if (heading) {
        return {
          type: "heading",
          level: heading[1].length as 2 | 3 | 4,
          lines: [heading[2]],
        };
      }
      return { type: "paragraph", lines: chunk.split("\n") };
    });
}

/**
 * Extrait long des pages d'archive WordPress : 55 premiers mots du contenu
 * suivis de « […] ». Les retours a la ligne (<br>) sont supprimes sans espace,
 * exactement comme le fait `wp_trim_words` sur le HTML d'origine.
 */
export function archiveExcerpt(body: string, words = 55): string {
  const flat = body
    .split(/\n{2,}/)
    // remplace les liens Markdown [texte](url) par leur seul texte
    .map((chunk) => chunk.replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, "$1"))
    // retire les eventuels titres Markdown (## …)
    .filter((chunk) => !/^#{2,4}\s/.test(chunk.trim()))
    .map((chunk) => chunk.split("\n").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = flat.split(" ");
  if (parts.length <= words) return flat;
  return `${parts.slice(0, words).join(" ")} […]`;
}

/** Date lisible en francais, ex. « 15 mai 2024 ». */
export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

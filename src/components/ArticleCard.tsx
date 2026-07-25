import Image from "next/image";
import Link from "next/link";
import { cheminLocalise, type Locale } from "@/i18n/config";
import type { Article } from "@/lib/articles";

/**
 * Carte d'article : vignette 3/2, date discrete, titre en encre, extrait, puis
 * un lien flechevers l'article. Alignee a gauche et sans couleur de fond, pour
 * laisser la photo porter la carte.
 */
export default function ArticleCard({
  article,
  orientation = "vertical",
  locale = "fr",
  libelle = "Lire l'article",
}: {
  article: Article;
  /** horizontal : vignette a gauche, texte a droite (listes en une colonne) */
  orientation?: "vertical" | "horizontal";
  locale?: Locale;
  /** libelle du lien de lecture, traduit */
  libelle?: string;
}) {
  const href = cheminLocalise(`/${article.slug}`, locale);
  const horizontal = orientation === "horizontal";
  return (
    <article
      className={`card card-hover group/media h-full overflow-hidden ${
        horizontal
          ? "grid sm:grid-cols-[minmax(0,300px)_minmax(0,1fr)]"
          : "flex flex-col"
      }`}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`block overflow-hidden ${horizontal ? "h-full" : ""}`}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={768}
            height={512}
            sizes={
              horizontal
                ? "(max-width: 640px) 100vw, 300px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className={`img-zoom w-full object-cover ${
              horizontal ? "aspect-[3/2] sm:h-full sm:min-h-[220px]" : "aspect-[3/2]"
            }`}
          />
        ) : (
          <ImagePlaceholder title={article.title} className={horizontal ? "h-full" : "aspect-[3/2]"} />
        )}
      </Link>

      <div className={`flex flex-1 flex-col p-7 ${horizontal ? "sm:p-9" : ""}`}>
        {article.dateLabel && (
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
            {article.dateLabel}
          </p>
        )}
        <h3 className={`mt-3 leading-snug text-ink ${horizontal ? "text-[22px]" : "text-[19px]"}`}>
          <Link href={href} className="underline-grow">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-[15px] leading-[1.7] text-body">{article.excerpt}</p>
        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="arrow-link inline-flex items-center gap-2 text-[14px] font-medium text-plum"
          >
            {libelle}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Visuel de remplacement : fond gris tres clair, initiales et mention discrete. */
export function ImagePlaceholder({
  title,
  className = "aspect-[3/2]",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-surface px-6 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-plum/5"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-green/5"
      />
      <p className="relative max-w-[85%] text-[15px] font-medium leading-snug text-ink/70">
        {title}
      </p>
      <p className="relative mt-3 text-[11px] uppercase tracking-[0.18em] text-muted">
        Visuel à venir
      </p>
    </div>
  );
}

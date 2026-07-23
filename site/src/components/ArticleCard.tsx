import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

/**
 * Carte d'article : vignette 3/2 (ou visuel de remplacement si aucune image
 * n'est fournie), titre en prune, date libre, extrait puis lien « Lire la
 * suite ». Filet fin et fond sobre, dans la direction moderne/epuree du site.
 */
export default function ArticleCard({ article }: { article: Article }) {
  const href = `/${article.slug}`;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[10px] border border-ink/10 bg-white transition-shadow hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={768}
            height={512}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="aspect-[3/2] w-full object-cover"
          />
        ) : (
          <ImagePlaceholder title={article.title} />
        )}
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-6 text-center">
        {article.dateLabel && (
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-green">
            {article.dateLabel}
          </p>
        )}
        <h3 className="mt-2 text-[19px] font-bold leading-[1.4] text-plum">
          <Link href={href} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-[14px] leading-[1.7] text-muted">{article.excerpt}</p>
        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="text-[13px] font-medium uppercase tracking-[0.04em] text-plum underline underline-offset-4 hover:no-underline"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Visuel de remplacement : degrade aux couleurs de marque + titre + legende. */
export function ImagePlaceholder({
  title,
  className = "aspect-[3/2]",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-plum via-plum-dark to-green px-6 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/5"
      />
      <p className="relative font-display text-[16px] font-semibold leading-tight text-white sm:text-[18px]">
        {title}
      </p>
      <p className="relative mt-3 text-[11px] uppercase tracking-[0.18em] text-white/70">
        Visuel à venir
      </p>
    </div>
  );
}

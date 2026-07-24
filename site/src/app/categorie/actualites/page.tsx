import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { archiveExcerpt, getArticles } from "@/lib/articles";
import { routes, site } from "@/lib/site";
import { ImagePlaceholder } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: `Archives des Actualités - ${site.name}`,
  alternates: { canonical: routes.newsCategory },
};

/**
 * Archive de la categorie « Actualités ». Cette page n'etait pas construite
 * avec Elementor sur le site d'origine : elle utilisait le gabarit d'archive
 * du theme Astra (grande carte blanche sur fond gris clair).
 */
export default function CategorieActualitesPage() {
  const articles = getArticles();

  return (
    <div className="bg-surface-alt py-10 sm:py-[70px]">
      <div className="mx-auto w-full max-w-[1240px] px-5">
        <div className="bg-white px-5 py-10 sm:px-12 sm:py-12">
          <h1 className="text-[28px] font-bold leading-tight text-plum">Actualités</h1>

          <div className="mt-14 space-y-14 sm:mt-24">
            {articles.map((article) => (
              <article key={article.slug}>
                <Link href={`/${article.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      width={1024}
                      height={683}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="w-full max-w-[1024px] object-cover"
                      priority
                    />
                  ) : (
                    <ImagePlaceholder
                      title={article.title}
                      className="aspect-[3/2] max-w-[1024px] rounded-[10px]"
                    />
                  )}
                </Link>

                <h2 className="font-light uppercase mt-5 text-[22px] font-normal leading-snug text-plum sm:text-[26px] tracking-[0.05em]">
                  <Link href={`/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-2 text-[14px] text-muted">
                  <Link href={routes.newsCategory} className="text-[#046bd2] hover:underline">
                    Actualités
                  </Link>{" "}
                  / <span className="text-[#046bd2]">Marie Salabert</span>
                  {article.dateLabel && (
                    <>
                      {" "}
                      · <span>{article.dateLabel}</span>
                    </>
                  )}
                </p>

                <p className="mt-5 text-[15px] leading-[1.8] text-body sm:text-[16px]">
                  {archiveExcerpt(article.body)}
                </p>

                <p className="mt-6">
                  <Link
                    href={`/${article.slug}`}
                    className="text-[15px] text-[#046bd2] hover:underline"
                  >
                    <span className="sr-only">{article.title} </span>Lire la suite&nbsp;»
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

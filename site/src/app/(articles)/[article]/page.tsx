import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/articles";
import { routes, site } from "@/lib/site";
import { Eyebrow } from "@/components/ui";
import ArticleBody from "@/components/ArticleBody";
import ArticleCard, { ImagePlaceholder } from "@/components/ArticleCard";
import ArticleShare from "@/components/ArticleShare";

/**
 * Page d'article de blog. Les URL sont generees a partir des fichiers MDX de
 * `src/content/articles`, ce qui conserve les permaliens WordPress a la racine
 * (ex. /conference-pour-l-ifce). `dynamicParams = false` garantit qu'aucune
 * autre URL n'est captee par ce segment : les pages statiques du site gardent
 * la priorite et tout slug inconnu renvoie une 404.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ article: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}): Promise<Metadata> {
  const { article: slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      url: `/${article.slug}`,
      ...(article.image ? { images: [article.image] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article: slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${site.url}/${article.slug}`;

  // « À lire aussi » : articles explicitement lies, sinon les plus recents.
  const all = getArticles();
  const related = article.related.length
    ? article.related
        .map((s) => all.find((a) => a.slug === s))
        .filter((a): a is NonNullable<typeof a> => Boolean(a))
    : all.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    ...(article.image ? { image: `${site.url}${article.image}` } : {}),
    author: { "@type": "Person", name: site.practitioner },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-surface-alt">
        {/* Banniere : image mise en avant, ou visuel de remplacement */}
        <div className="relative h-[260px] w-full sm:h-[380px] lg:h-[500px]">
          {article.image ? (
            <Image
              src={article.image}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <ImagePlaceholder title={article.title} className="h-full" />
          )}
        </div>

        {/* Carte blanche chevauchant la banniere */}
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <article className="relative mx-auto -mt-20 max-w-[796px] bg-white px-6 py-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] sm:px-14 sm:py-14 lg:-mt-[218px]">
            <p className="text-center">
              <Link
                href={routes.newsCategory}
                className="text-[13px] font-medium uppercase tracking-[0.18em] text-green-light hover:underline"
              >
                Actualités
              </Link>
            </p>

            <h1 className="mt-6 text-center font-display text-[24px] uppercase leading-[1.25] text-plum sm:text-[30px]">
              {article.title}
            </h1>

            {article.dateLabel && (
              <p className="mt-4 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-green">
                {article.dateLabel}
              </p>
            )}

            <div className="mt-10">
              <ArticleBody body={article.body} />
            </div>

            <h2 className="mt-14 font-display text-[22px] uppercase leading-tight text-plum">
              Vous aimez cet article ?
            </h2>
            <div className="mt-6">
              <ArticleShare
                url={url}
                title={article.title}
                image={article.image ? `${site.url}${article.image}` : ""}
              />
            </div>
          </article>
        </div>

        <div className="h-10 sm:h-14" />
      </div>

      {/* Articles a lire ensuite */}
      {related.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto w-full max-w-[1400px] px-5">
            <Eyebrow>À lire aussi</Eyebrow>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

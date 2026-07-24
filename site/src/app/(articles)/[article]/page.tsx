import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/articles";
import { routes, site } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui";
import ArticleBody from "@/components/ArticleBody";
import { ImagePlaceholder } from "@/components/ArticleCard";
import ArticlesCarousel from "@/components/ArticlesCarousel";
import ArticleShare from "@/components/ArticleShare";
import Reveal from "@/components/Reveal";

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

  /* « À lire aussi » : les articles explicitement lies d'abord, completes par les
     plus recents jusqu'a neuf — le carrousel a ainsi toujours de quoi defiler. */
  const all = getArticles();
  const lies = article.related
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const dejaVus = new Set([article.slug, ...lies.map((a) => a.slug)]);
  const related = [...lies, ...all.filter((a) => !dejaVus.has(a.slug))].slice(0, 9);

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

      {/* Banniere : l'image de l'article en plein ecran, titre en bas a gauche */}
      <header className="relative flex min-h-[440px] items-end overflow-hidden sm:min-h-[560px] lg:min-h-[640px]">
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
          <ImagePlaceholder title={article.title} className="absolute inset-0 h-full" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75"
        />
        <Container width="full" className="relative pb-14 pt-40 sm:pb-20">
          <div className="max-w-4xl">
            <Link
              href={routes.newsCategory}
              className="rise text-[12px] font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Actualités
            </Link>
            <h1
              className="rise mt-5 text-[30px] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px] lg:text-[56px]"
              style={{ animationDelay: "120ms" }}
            >
              {article.title}
            </h1>
            {article.dateLabel && (
              <p
                className="rise mt-6 text-[14px] font-medium uppercase tracking-[0.14em] text-white/75"
                style={{ animationDelay: "280ms" }}
              >
                {article.dateLabel}
              </p>
            )}
          </div>
        </Container>
      </header>

      {/* Carte d'introduction horizontale : visuel de l'article et resume */}
      <Section padding="no-bottom">
        <Container width="default">
          <Reveal className="card group/media overflow-hidden sm:grid sm:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            <div className="overflow-hidden">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={768}
                  height={512}
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="img-zoom aspect-[3/2] w-full object-cover sm:h-full"
                />
              ) : (
                <ImagePlaceholder title={article.title} className="h-full" />
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                {article.dateLabel || "Actualité"}
              </p>
              <p className="mt-4 text-[18px] leading-[1.6] text-ink sm:text-[20px]">
                {article.description}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Corps : colonne de lecture unique, plus large que la mesure standard */}
      <Section>
        <Container width="default">
          <article className="mx-auto max-w-[980px]">
            <ArticleBody body={article.body} />

            <div className="mt-14 border-t border-line pt-10">
              <h2 className="text-[19px] text-ink">Vous aimez cet article&nbsp;?</h2>
              <div className="mt-5">
                <ArticleShare
                  url={url}
                  title={article.title}
                  image={article.image ? `${site.url}${article.image}` : ""}
                />
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* Articles a lire ensuite */}
      {related.length > 0 && (
        <Section tone="surface">
          <Container width="full">
            <Eyebrow>À lire aussi</Eyebrow>
            {/* carrousel : les articles lies restent sur une seule ligne */}
            <div className="mt-10">
              <ArticlesCarousel articles={related} />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

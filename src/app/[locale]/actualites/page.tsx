import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.actualites.meta.titre,
    description: d.actualites.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.news, locale),
      languages: { fr: routes.news, en: `/en${routes.news}`, it: `/it${routes.news}` },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const n = d.actualites;
  const articles = getArticles(locale);

  return (
    <>
      {/* En-tete : titre et propos a gauche, portrait a droite, pleine largeur */}
      <Section>
        <Container width="full">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-24">
            <Reveal>
              <Eyebrow>{n.surTitre}</Eyebrow>
              <SectionTitle as="h1" className="mt-5 max-w-3xl">
                {n.titre}
              </SectionTitle>
              <p className="mt-8 max-w-2xl text-[19px] leading-[1.6] text-ink sm:text-[21px]">
                {n.accroche}
              </p>
              <div className="mt-6 grid max-w-4xl gap-6 text-[16.5px] leading-[1.7] text-body sm:grid-cols-2">
                {n.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>
            </Reveal>

            <Reveal variant="left" delay={140} className="group/media overflow-hidden rounded-lg">
              <Image
                src="/images/2025/05/marie-salabert-osteopathe-animalier.jpg"
                alt={n.photoAlt}
                width={576}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 480px"
                className="img-zoom aspect-[4/5] w-full object-cover object-top"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Liste des articles : pleine largeur, 4 colonnes */}
      <Section tone="surface">
        <Container width="full">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle className="text-[26px] sm:text-[34px]">{n.tousLesArticles}</SectionTitle>
            <p className="text-[14px] text-muted">
              {n.compteur.replace("{n}", String(articles.length))}
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, i) => (
              <Reveal as="li" key={article.slug} delay={(i % 4) * 90} className="flex">
                <ArticleCard article={article} locale={locale} libelle={d.commun.lireArticle} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Invitation a echanger */}
      <Section>
        <Container width="full">
          <Reveal className="flex flex-col items-start justify-between gap-8 rounded-lg bg-green px-8 py-12 text-white sm:px-14 sm:py-16 lg:flex-row lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                {n.cta.surTitre}
              </p>
              <h2 className="uppercase mt-4 max-w-2xl text-[28px] font-light leading-[1.15] tracking-[0.05em] text-white sm:text-[38px]">
                {n.cta.titre}
              </h2>
              <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-white/75">
                {n.cta.texte}
              </p>
            </div>
            <Button href={cheminLocalise(routes.rendezVous, locale)}>{d.commun.meContacter}</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

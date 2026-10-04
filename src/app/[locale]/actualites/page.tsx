import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import { Diaporama } from "@/components/Diaporama";
import { photosParcours } from "@/content/photos";

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
      {/* En-tete : propos a gauche, diaporama du parcours a droite. Conteneur
          « wide » et colonnes proches : en pleine largeur, le texte et la photo
          se retrouvaient aux deux bouts de l'ecran avec un vide entre eux. */}
      <Section>
        <Container width="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20 xl:gap-28">
            <Reveal>
              <Eyebrow>{n.surTitre}</Eyebrow>
              <SectionTitle as="h1" className="mt-5 max-w-3xl">
                {n.titre}
              </SectionTitle>
              <p className="mt-8 max-w-2xl text-[19px] leading-[1.6] text-ink sm:text-[21px]">
                {n.accroche}
              </p>
              {/* Une seule colonne, soulignee d'un filet : sur deux colonnes
                  etroites, ces paragraphes courts se lisaient mal. */}
              <div className="mt-8 max-w-2xl space-y-4 border-l-2 border-plum/25 pl-6 text-[16.5px] leading-[1.7] text-body">
                {n.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>
            </Reveal>

            {/* Photos du parcours a la place du portrait (retour V2), sur un
                cadre decale qui reprend la teinte du site. */}
            <Reveal variant="left" delay={140} className="mx-auto w-full max-w-[560px]">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -right-5 top-5 hidden aspect-[4/5] w-full rounded-lg bg-plum/10 sm:block"
                />
                <Diaporama
                  photos={photosParcours.map((src, i) => ({ src, alt: d.accueil.parcours.photosAlt[i] }))}
                  libelle={d.commun.choisirPhoto}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="relative aspect-[4/5] w-full"
                />
              </div>
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

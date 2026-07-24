import type { Metadata } from "next";
import Image from "next/image";
import { getArticles } from "@/lib/articles";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Découvrez l'actualité de l'ostéopathie animale avec Marie Salabert",
  description:
    "Explorez les dernières avancées en ostéopathie animale avec Marie Salabert. Soins innovants et conseils pour vos animaux.",
  alternates: { canonical: routes.news },
};

export default function ActualitesPage() {
  const articles = getArticles();

  return (
    <>
      {/* En-tete : titre et propos a gauche, portrait a droite, pleine largeur */}
      <Section>
        <Container width="full">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-24">
            <Reveal>
              <Eyebrow>Le journal</Eyebrow>
              <SectionTitle as="h1" className="mt-5 max-w-3xl">
                L&apos;actualité de mon activité en ostéopathie animale
              </SectionTitle>
              <p className="mt-8 max-w-2xl text-[19px] leading-[1.6] text-ink sm:text-[21px]">
                Depuis 2020, cette rubrique me permet de partager les évolutions de mon activité, mes
                projets, ainsi que les différentes innovations et approches que je développe en
                ostéopathie animale.
              </p>
              <div className="mt-6 grid max-w-4xl gap-6 text-[16.5px] leading-[1.7] text-body sm:grid-cols-2">
                <p>
                  Vous y retrouverez des articles autour des études récentes, des conférences
                  effectuées, des cas pratiques, ainsi que des événements et formations qui
                  enrichissent ma pratique au quotidien.
                </p>
                <p>
                  Cet espace a pour objectif de vous faire découvrir les avancées du domaine, de
                  mieux comprendre les méthodes de prise en charge proposées à vos animaux et de
                  suivre l&apos;évolution de mon travail au service de leur santé et de leur
                  bien-être.
                </p>
              </div>
            </Reveal>

            <Reveal variant="left" delay={140} className="group/media overflow-hidden rounded-lg">
              <Image
                src="/images/2025/05/marie-salabert-osteopathe-animalier.jpg"
                alt="Portrait de Marie Salabert, ostéopathe animalière"
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
            <SectionTitle className="text-[26px] sm:text-[34px]">Tous les articles</SectionTitle>
            <p className="text-[14px] text-muted">
              {articles.length} publications depuis 2020
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, i) => (
              <Reveal as="li" key={article.slug} delay={(i % 4) * 90} className="flex">
                <ArticleCard article={article} />
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
                Un conseil ?
              </p>
              <h2 className="mt-4 max-w-2xl text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[38px]">
                Une question sur l&apos;ostéopathie animale&nbsp;?
              </h2>
              <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-white/75">
                Pour en savoir plus sur les soins proposés à votre animal, écrivez-moi ou appelez le
                secrétariat.
              </p>
            </div>
            <Button href={routes.contact}>Me contacter</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

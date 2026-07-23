import type { Metadata } from "next";
import Image from "next/image";
import { getArticles } from "@/lib/articles";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import ArticleCard from "@/components/ArticleCard";

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
      {/* Introduction : portrait a gauche, texte a droite */}
      <Section className="pb-10">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative flex justify-center">
              <Image
                src="/images/2023/05/circle-pattern.png"
                alt=""
                aria-hidden="true"
                width={745}
                height={745}
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[745px] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-0 lg:opacity-70"
              />
              <Image
                src="/images/2025/05/marie-salabert-osteopathe-animalier.jpg"
                alt="Portrait de Marie Salabert, ostéopathe animalière souriante en tenue bleue, sur fond clair."
                width={576}
                height={1024}
                sizes="(max-width: 1024px) 70vw, 260px"
                className="h-[220px] w-[220px] rounded-full object-cover object-top sm:h-[260px] sm:w-[260px]"
              />
            </div>

            <div>
              <Eyebrow>Découvrez</Eyebrow>
              <SectionTitle as="h1" className="mt-3">
                L&apos;actualité de mon activité en ostéopathie animale
              </SectionTitle>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-body">
                <p>
                  Depuis 2020, cette rubrique me permet de partager les évolutions de mon
                  activité, mes projets, ainsi que les différentes innovations et approches que
                  je développe en ostéopathie animale.
                </p>
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
            </div>
          </div>
        </Container>
      </Section>

      {/* Liste des articles : grille 4 colonnes, quasi pleine largeur */}
      <Section className="pt-4">
        <div className="mx-auto w-full max-w-[1358px] px-5">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <li key={article.slug} className="flex">
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Bloc contact */}
      <Section className="relative overflow-hidden pt-6">
        <Image
          src="/images/2023/05/triangle-dots.png"
          alt=""
          aria-hidden="true"
          width={372}
          height={297}
          className="pointer-events-none absolute right-0 top-1/2 max-w-none -translate-y-1/2 select-none opacity-0 lg:opacity-40"
        />
        <Container className="relative">
          <Eyebrow>Un conseil ?</Eyebrow>
          <SectionTitle className="mt-3">Contactez-moi</SectionTitle>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
            Vous avez des question concernant l&apos;ostéopathie animalière
            <br className="hidden lg:inline" /> ou vous souhaitez en savoir plus sur mes soins
            animaliers, n&apos;hésitez pas à me contacter.
          </p>
          <div className="mt-8">
            <Button href={routes.contact}>Contact</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import Reveal from "@/components/Reveal";
import SymbiosteoHero from "@/components/SymbiosteoHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.symbiosteo.meta.titre,
    description: d.symbiosteo.meta.description,
    alternates: {
      canonical: cheminLocalise("/symbiosteo-2", locale),
      languages: { fr: "/symbiosteo-2", en: "/en/symbiosteo-2", it: "/it/symbiosteo-2" },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

const SPOTIFY_URL =
  "https://open.spotify.com/show/5jWkEbD1lZoZgitOLCazY6?si=2ZYJ1ynhT5KqZnQWQIKzOQ";
const APPLE_URL =
  "https://podcasts.apple.com/fr/podcast/symbiosteo-le-podcast/id1724241264";

/** Episodes mis en avant, avec leur titre exact et leur lien Spotify. */
const episodes = [
  {
    number: 2,
    title:
      "DV Raphaël BOILLOT - Un parcours interdisciplinaire - A la croisée des chemins entre ostéopathie, santé et monde animal",
    url: "https://open.spotify.com/episode/1cV4vU4GLKntnxmLtYMhFZ?si=8oWQy5saTNuWXHLsDAK8pw",
  },
  {
    number: 4,
    title:
      "Dr Pierre Luc L'HERMITE - La rencontre entre l'ostéopathie et le monde académique",
    url: "https://open.spotify.com/episode/51hoAg80VtmrkYXmvZ48y8?si=s9DczmMRSZ28S_akKRXjAA",
  },
  {
    number: 6,
    title:
      "DV Jean-Michel CLOBERT - Les médecines complémentaires au cœur du fonctionnement d'une clinique vétérinaire",
    url: "https://open.spotify.com/episode/1FC3oChGDWkFoSjR0T8nwy?si=TlsHpbJNQ4u0znhSjabuuw",
  },
  {
    number: 7,
    title: "Ouvrage « Mythologies ostéopathiques »",
    url: "https://open.spotify.com/episode/12dNNDkN5AjbLsaJARdIqI?si=7r9zUJs0Qze-mdp3_1sQIA",
  },
  {
    number: 10,
    title:
      "Christophe DREYER - (Auto)empathie au service du vivant - Devenir ostéopathe, un chemin vers Soi",
    url: "https://open.spotify.com/episode/2IQiEa6mTj9CZYPdYwlDRO?si=f5HF1QD3SpWF1GQ4PJnQEQ",
  },
  {
    number: 11,
    title:
      "DV Marie-José MAÎTRE - Le taoïsme pour accompagner le thérapeute dans le plaisir de pratiquer",
    url: "https://open.spotify.com/episode/0u7Ji2hX0KnwrVtz1UYTZq?si=ZJQrgo3-S_yrqSe__c7sNg",
  },
  {
    number: 13,
    title:
      "Table ronde : Ostéopathie Bovine - Le métier d'ostéopathe animalier avec Ambre LECOMTE, Mélina DUVAL et Justine RASERA MAGNET",
    url: "https://open.spotify.com/episode/1FdsN5D3vTyqVo0wHy4s2c?si=xwkcIRPNSx-q_YP8UNEp-A",
  },
  {
    number: 16,
    title:
      "Dr Loïc TREFFEL : Esprit critique en ostéopathie : recherche et médecine intégrative, vers une évolution de la discipline",
    url: "https://open.spotify.com/episode/7AfP8G69lmunI2HQOCvirY?si=weY6K3EZTIWkJ8QQrkGd5w",
  },
] as const;

export default async function SymbiosteoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const sy = d.symbiosteo;

  return (
    <>
      <SymbiosteoHero title="SymbiOsteO - Le Podcast" />

      <Section>
        <Container width="full">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
            {/* Colonne image */}
            <Reveal variant="right" className="group/media hidden overflow-hidden rounded-lg md:block">
              <Image
                src="/images/2024/05/podcast.jpg"
                alt={sy.photoAlt}
                width={768}
                height={1152}
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
                className="img-zoom aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={120} className="max-w-2xl text-[16.5px] leading-[1.7] text-body">
              <p className="text-[19px] font-medium leading-[1.6] text-ink sm:text-[21px]">
                {sy.accroche}
              </p>
              <p className="mt-6">{sy.paragraphe}</p>
              <p className="mt-6">
                {sy.contactLibelle}{" "}
                <a
                  href="mailto:symbiosteo3@gmail.com"
                  className="underline-grow font-medium text-plum"
                >
                  symbiosteo3@gmail.com
                </a>
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href={SPOTIFY_URL} variant="green">
                  {sy.ecouterSpotify}
                </Button>
                <Button href={APPLE_URL} variant="outline">
                  {sy.ecouterApple}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Episodes : liste numerotee, sur fond gris pleine largeur */}
      <Section tone="surface">
        <Container width="full">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle className="text-[26px] sm:text-[34px]">{sy.episodesTitre}</SectionTitle>
            <p className="text-[14px] text-muted">
              {sy.episodesCompteur.replace("{n}", String(episodes.length))}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
            {episodes.map((e, i) => (
              <Reveal as="li" key={e.number} delay={(i % 2) * 90}>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover group/media group flex h-full items-center gap-5 overflow-hidden p-4 sm:gap-6 sm:p-5"
                >
                  {/* pochette de l'episode, recuperee sur Spotify */}
                  <span className="relative block shrink-0 overflow-hidden rounded-[6px]">
                    <Image
                      src={`/images/symbiosteo/${e.number}.jpg`}
                      alt=""
                      aria-hidden="true"
                      width={300}
                      height={300}
                      sizes="120px"
                      className="img-zoom h-[104px] w-[104px] object-cover sm:h-[120px] sm:w-[120px]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-plum"
                    >
                      {String(e.number).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 py-1">
                    <span className="block text-[16.5px] font-medium leading-snug text-ink">
                      {e.title}
                    </span>
                    <span className="arrow-link mt-3 inline-flex items-center gap-2 text-[14px] font-medium text-plum">
                      {sy.ecouterEpisode}
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
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 text-center">
            <Button href={SPOTIFY_URL} variant="green">
              {sy.suivreSpotify}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

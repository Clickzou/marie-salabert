import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import Reveal from "@/components/Reveal";
import SymbiosteoHero from "@/components/SymbiosteoHero";

export const metadata: Metadata = {
  title: "SymbiOsteO Le Podcast - Marie Salabert Ostéopathe",
  description:
    "SymbiOsteO Le Podcast, créé en janvier 2024, donne la parole aux acteurs du monde de l'Ostéopathie animale, vétérinaire et humaine, de la santé et aux explorateurs du vivant.",
  alternates: { canonical: "/symbiosteo-2" },
};

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

const formats = [
  "🎤 Interviews",
  "🏵️ Tables rondes",
  "👫 Duo : Amélie & Marie",
  "🧍‍♀️ Solo : Amélie ou Marie",
] as const;

export default function SymbiosteoPage() {
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
                alt="Micro de studio et casque, plateau du podcast SymbiOsteO"
                width={768}
                height={1152}
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
                className="img-zoom aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={120} className="max-w-2xl text-[16.5px] leading-[1.7] text-body">
              <p className="text-[19px] font-medium leading-[1.6] text-ink sm:text-[21px]">
                Créé en janvier 2024, SymbiOsteO Le Podcast est un média qui donne la parole aux
                acteurs du monde de l&apos;Ostéopathie (animale, vétérinaire et humaine), de la
                santé, aux explorateurs du vivant, aux passionnés et curieux.
              </p>
              <p className="mt-6">
                Cet espace de dialogue et d&apos;échanges a pour vocation de recueillir des points de
                vue diversifiés propices à la construction d&apos;une pensée complexe. Nous croyons à
                la vertu du dialogue comme moyen de créer du lien. Nous avons pour objectif au
                travers de ce podcast de structurer une communauté et pour projet d&apos;organiser
                des évènements.
              </p>
              <p className="mt-6">Différents formats d&apos;épisodes :</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {formats.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-[14px] text-body ring-1 ring-line"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                Animés par Amélie Gardelle et Marie Salabert — contact{" "}
                <a
                  href="mailto:symbiosteo3@gmail.com"
                  className="underline-grow font-medium text-plum"
                >
                  symbiosteo3@gmail.com
                </a>
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href={SPOTIFY_URL} variant="green">
                  Écouter sur Spotify
                </Button>
                <Button href={APPLE_URL} variant="outline">
                  Écouter sur Apple Podcasts
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
            <SectionTitle className="text-[26px] sm:text-[34px]">Nos épisodes à écouter</SectionTitle>
            <p className="text-[14px] text-muted">{episodes.length} épisodes disponibles</p>
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
                      Écouter l&apos;épisode
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
              Suivez le podcast sur Spotify
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

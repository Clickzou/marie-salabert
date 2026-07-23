import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
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

      <Section className="pb-0 sm:pb-0">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Colonne image : masquee sur mobile comme sur le site d'origine */}
            <div className="hidden justify-center md:flex">
              <Image
                src="/images/2024/05/podcast.jpg"
                alt="Photo de vue supérieure du concept de podcast - lightbox avec podcast de lettres là-dessus, écouteurs et microphone professionnel"
                width={768}
                height={1152}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="h-auto w-full max-w-[398px] object-cover"
              />
            </div>

            <div className="text-[15px] leading-relaxed text-[#141414]">
              <p className="font-bold">
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
              <p className="mt-6">Nous vous proposerons différents types d&apos;épisodes :</p>
              <ul className="mt-6">
                {formats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="mt-6">Animés par Amélie Gardelle et Marie Salabert</p>
              <p className="mt-6">
                Email :{" "}
                <a
                  href="mailto:symbiosteo3@gmail.com"
                  className="text-plum underline underline-offset-2 hover:text-plum-dark"
                >
                  symbiosteo3@gmail.com
                </a>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={SPOTIFY_URL} variant="green">
                  Écouter sur Spotify
                </Button>
                <Button href={APPLE_URL} variant="outline">
                  Écouter sur Apple Podcasts
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-[100px] pb-0 sm:pt-[100px] sm:pb-0">
        <Container>
          <h2 className="text-center text-[32px] leading-snug text-plum">
            Nos épisodes à écouter
          </h2>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-8">
        <Container>
          <ul className="mx-auto flex max-w-[820px] flex-col gap-4">
            {episodes.map((e) => (
              <li key={e.number}>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-plum/15 bg-surface p-5 transition-all duration-300 hover:border-plum hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum sm:gap-6 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-[26px] font-semibold leading-none text-gold sm:text-[30px]"
                  >
                    #{e.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium leading-snug text-plum sm:text-[16px]">
                      {e.title}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[14px] font-medium text-green transition-colors group-hover:text-plum">
                      Écouter
                      <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Button href={SPOTIFY_URL} variant="green">
              Suivez le podcast sur Spotify
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

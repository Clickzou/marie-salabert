import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { PageHero } from "@/components/sections";
import GalerieLightbox, { type GaleriePhoto } from "@/components/GalerieLightbox";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.galerie.meta.titre,
    description: d.galerie.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.gallery, locale),
      languages: {
        fr: routes.gallery,
        en: `/en${routes.gallery}`,
        it: `/it${routes.gallery}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

const D = "/images/2025/05";
const G = "/images/2026/07/galerie";

/**
 * Photos de la galerie, dans l'ordre du site d'origine.
 *
 * Trois cliches y figuraient deux fois sous des noms differents — IMG_5312,
 * IMG_5213 et endez-vous-osteopathe-animalier doublaient trois entrees deja
 * presentes. Les fichiers restent sur le disque, deux d'entre eux servant
 * ailleurs sur le site ; seules les entrees en double ont disparu.
 *
 * Le lot transmis en juillet 2026 comptait 90 cliches : 17 s'y repetaient et 7
 * figuraient deja dans la galerie sous un autre nom. Le rapprochement a ete
 * fait par empreinte perceptuelle puis verifie sur planche-contact, aucun
 * fichier n'ayant de nom en commun avec les precedents.
 */
const photos: GaleriePhoto[] = [
  { src: `${D}/osteopathie-cheval-01.jpg`, width: 1440, height: 961, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chien-01.jpg`, width: 1440, height: 961, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-02.jpg`, width: 1440, height: 963, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-03.jpg`, width: 1440, height: 961, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chat-01.jpg`, width: 2048, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${D}/osteopathie-cheval-02.jpg`, width: 1440, height: 961, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chat-02.jpg`, width: 1368, height: 1824, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${D}/osteopathie-cheval-03.jpg`, width: 1440, height: 961, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-04.jpg`, width: 1488, height: 1304, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-05.jpg`, width: 1500, height: 2000, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chien-04.jpg`, width: 750, height: 1001, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-05.jpg`, width: 960, height: 640, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-cheval-06.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-07.jpg`, width: 721, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-08.jpg`, width: 718, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-09.jpg`, width: 1532, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-10.jpg`, width: 1532, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-animaux-elevage-01.jpg`, width: 960, height: 720, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${D}/osteopathie-cheval-11.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chien-06.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-lapin-01.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un lapin" },
  { src: `${D}/osteopathie-animaux-elevage-02.jpg`, width: 1032, height: 774, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${D}/osteopathie-chien-07.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-cheval-12.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-13.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-14.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chien-08.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-09.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-10.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-11.jpg`, width: 1184, height: 789, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-chien-12.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${D}/osteopathie-cheval-15.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-chat-03.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${D}/osteopathie-chat-04.jpg`, width: 789, height: 1184, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${D}/osteopathie-cheval-16.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-17.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-18.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-19.jpg`, width: 750, height: 563, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-20.jpg`, width: 750, height: 1008, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-21.jpg`, width: 750, height: 1008, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${D}/osteopathie-cheval-22.jpg`, width: 750, height: 1008, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  {
    src: `${D}/osteopathie-cheval-23.jpg`,
    width: 2000,
    height: 1500,
    alt: "Marie salabert en train de soigner un cheval.",
  },
  {
    src: `${D}/osteopathie-cheval-24.jpg`,
    width: 2000,
    height: 1500,
    alt: "Marie salabert en train de soigner un cheval.",
  },
  {
    src: `${D}/osteopathie-chat-05.jpg`,
    width: 1440,
    height: 961,
    alt: "Marie salabert en train de soigner un chat.",
  },
  { src: `${G}/osteopathie-animaux-elevage-03.jpg`, width: 720, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${G}/osteopathie-animaux-elevage-04.jpg`, width: 720, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${G}/osteopathie-animaux-elevage-05.jpg`, width: 1600, height: 720, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${G}/osteopathie-chat-06.jpg`, width: 1500, height: 2000, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-chien-13.jpg`, width: 1440, height: 1799, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-25.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-14.jpg`, width: 960, height: 720, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-chien-15.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-26.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chat-07.jpg`, width: 1600, height: 1066, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-cheval-27.jpg`, width: 768, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-28.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-29.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-30.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-31.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-32.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-16.jpg`, width: 2000, height: 1500, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-chat-08.jpg`, width: 1600, height: 1066, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-cheval-33.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-34.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-35.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-36.jpg`, width: 960, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-37.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-17.jpg`, width: 538, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-animaux-elevage-06.jpg`, width: 960, height: 720, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${G}/osteopathie-chien-18.jpg`, width: 1600, height: 1066, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-38.jpg`, width: 1200, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-39.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-19.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-40.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-41.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-20.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-42.jpg`, width: 2048, height: 1431, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-43.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-44.jpg`, width: 750, height: 872, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-21.jpg`, width: 750, height: 996, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-45.jpg`, width: 2048, height: 1151, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-22.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-chien-23.jpg`, width: 1600, height: 1200, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-46.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-47.jpg`, width: 960, height: 1280, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chien-24.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-48.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-49.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-50.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-51.jpg`, width: 554, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-52.jpg`, width: 1066, height: 1600, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-53.jpg`, width: 750, height: 1334, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-54.jpg`, width: 1600, height: 1066, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-cheval-55.jpg`, width: 750, height: 565, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chat-09.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-chat-10.jpg`, width: 1536, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-chien-25.jpg`, width: 1600, height: 1200, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-cheval-56.jpg`, width: 1365, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chat-11.jpg`, width: 1368, height: 1824, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-nac-01.jpg`, width: 750, height: 1000, alt: "Marie Salabert en séance d'ostéopathie auprès d'un nouvel animal de compagnie" },
  { src: `${G}/osteopathie-animaux-elevage-07.jpg`, width: 1366, height: 2048, alt: "Marie Salabert en séance d'ostéopathie auprès d'un animal d'élevage" },
  { src: `${G}/marie-salabert-portrait-01.jpg`, width: 1764, height: 2048, alt: "Marie Salabert, ostéopathe animalier à Toulouse" },
  { src: `${G}/osteopathie-cheval-57.jpg`, width: 1668, height: 1668, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
  { src: `${G}/osteopathie-chat-12.jpg`, width: 2048, height: 1536, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-chien-26.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-chien-27.jpg`, width: 720, height: 960, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/osteopathie-chien-28.jpg`, width: 768, height: 1024, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chien" },
  { src: `${G}/marie-salabert-portrait-02.jpg`, width: 1080, height: 1350, alt: "Marie Salabert, ostéopathe animalier à Toulouse" },
  { src: `${G}/osteopathie-chat-13.jpg`, width: 570, height: 350, alt: "Marie Salabert en séance d'ostéopathie auprès d'un chat" },
  { src: `${G}/osteopathie-cheval-58.jpg`, width: 750, height: 1112, alt: "Marie Salabert en séance d'ostéopathie auprès d'un cheval" },
];

export default async function GaleriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);

  return (
    <>
      <PageHero
        image={`${D}/osteopathie-cheval-23.jpg`}
        alt={d.galerie.heroAlt}
        eyebrow={d.galerie.hero.surTitre}
        title={d.galerie.hero.titre}
      />

      {/* Mosaique pleine largeur, marge de 100 px */}
      <Section tone="surface">
        <Container width="full">
          <GalerieLightbox photos={photos} libelles={d.galerie} />
        </Container>
      </Section>

      <Section className="text-center">
        <Container width="full">
          <Button href={cheminLocalise(routes.rendezVous, locale)}>{d.commun.reserverSeance}</Button>
        </Container>
      </Section>
    </>
  );
}

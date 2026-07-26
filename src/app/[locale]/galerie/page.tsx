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
  { src: `${D}/0F5B6603-1F2C-4E03-9DBE-5CB61FAA5728.jpg`, width: 1440, height: 961, alt: "" },
  { src: `${D}/8EA7CB2B-F3F6-43F4-9123-26CD0988B122.jpg`, width: 1440, height: 961, alt: "" },
  { src: `${D}/9F3CC3C6-C8CC-45ED-84F6-D54379C346E8.jpg`, width: 1440, height: 963, alt: "" },
  { src: `${D}/1263AD08-F7DB-4256-AC10-44C276231849.jpg`, width: 1440, height: 961, alt: "" },
  { src: `${D}/b2e4d989-d855-48d1-97ef-fdefede9824b.jpg`, width: 2048, height: 2048, alt: "" },
  { src: `${D}/B8F0133C-B03C-433E-A182-443F72A4644B.jpg`, width: 1440, height: 961, alt: "" },
  { src: `${D}/c96238dd-f7ec-48af-aa1c-168fc97085f7.jpg`, width: 1368, height: 1824, alt: "" },
  { src: `${D}/D2FAB58D-7A14-4998-A8AB-85CCBB71F706.jpg`, width: 1440, height: 961, alt: "" },
  { src: `${D}/decouvrir-osteopathe-animale-1.jpg`, width: 1488, height: 1304, alt: "" },
  { src: `${D}/f054923d-0543-4a49-b053-d6087b4ee958.jpg`, width: 1500, height: 2000, alt: "" },
  { src: `${D}/IMG_0294.jpg`, width: 750, height: 1001, alt: "" },
  { src: `${D}/IMG_0832.jpg`, width: 960, height: 640, alt: "" },
  { src: `${D}/IMG_1122.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_2050.jpg`, width: 721, height: 960, alt: "" },
  { src: `${D}/IMG_2052.jpg`, width: 718, height: 960, alt: "" },
  { src: `${D}/IMG_2053.jpg`, width: 1532, height: 2048, alt: "" },
  { src: `${D}/IMG_2054.jpg`, width: 1532, height: 2048, alt: "" },
  { src: `${D}/IMG_2057.jpg`, width: 960, height: 720, alt: "" },
  { src: `${D}/IMG_3405.jpg`, width: 750, height: 565, alt: "" },
  { src: `${D}/IMG_4326.jpg`, width: 750, height: 565, alt: "" },
  { src: `${D}/IMG_4328.jpg`, width: 750, height: 565, alt: "" },
  { src: `${D}/IMG_5034.jpg`, width: 1032, height: 774, alt: "" },
  { src: `${D}/IMG_5204.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5249.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5278.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5282.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5392.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5407.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5417.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5516.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5617.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5703.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5732.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_5743.jpg`, width: 789, height: 1184, alt: "" },
  { src: `${D}/IMG_7834.jpg`, width: 720, height: 960, alt: "" },
  { src: `${D}/IMG_7837.jpg`, width: 720, height: 960, alt: "" },
  { src: `${D}/IMG_8229.jpg`, width: 720, height: 960, alt: "" },
  { src: `${D}/IMG_8232.jpg`, width: 750, height: 563, alt: "" },
  { src: `${D}/IMG_8248.jpg`, width: 750, height: 1008, alt: "" },
  { src: `${D}/IMG_8250.jpg`, width: 750, height: 1008, alt: "" },
  { src: `${D}/IMG_8260.jpg`, width: 750, height: 1008, alt: "" },
  {
    src: `${D}/IMG_8268.jpg`,
    width: 2000,
    height: 1500,
    alt: "Marie salabert en train de soigner un cheval.",
  },
  {
    src: `${D}/IMG_8271.jpg`,
    width: 2000,
    height: 1500,
    alt: "Marie salabert en train de soigner un cheval.",
  },
  {
    src: `${D}/marie-salabert-osteopathe-animaliere-1.jpg`,
    width: 1440,
    height: 961,
    alt: "Marie salabert en train de soigner un chat.",
  },
  { src: `${G}/galerie-2026-01.jpg`, width: 720, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-02.jpg`, width: 720, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-03.jpg`, width: 1600, height: 720, alt: "" },
  { src: `${G}/galerie-2026-04.jpg`, width: 1500, height: 2000, alt: "" },
  { src: `${G}/galerie-2026-05.jpg`, width: 1440, height: 1799, alt: "" },
  { src: `${G}/galerie-2026-06.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-07.jpg`, width: 960, height: 720, alt: "" },
  { src: `${G}/galerie-2026-08.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-09.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-10.jpg`, width: 1600, height: 1066, alt: "" },
  { src: `${G}/galerie-2026-11.jpg`, width: 768, height: 960, alt: "" },
  { src: `${G}/galerie-2026-12.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-13.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-14.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-15.jpg`, width: 750, height: 565, alt: "" },
  { src: `${G}/galerie-2026-16.jpg`, width: 750, height: 565, alt: "" },
  { src: `${G}/galerie-2026-17.jpg`, width: 2000, height: 1500, alt: "" },
  { src: `${G}/galerie-2026-18.jpg`, width: 1600, height: 1066, alt: "" },
  { src: `${G}/galerie-2026-19.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-20.jpg`, width: 720, height: 960, alt: "" },
  { src: `${G}/galerie-2026-21.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-22.jpg`, width: 960, height: 960, alt: "" },
  { src: `${G}/galerie-2026-23.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-24.jpg`, width: 538, height: 960, alt: "" },
  { src: `${G}/galerie-2026-25.jpg`, width: 960, height: 720, alt: "" },
  { src: `${G}/galerie-2026-26.jpg`, width: 1600, height: 1066, alt: "" },
  { src: `${G}/galerie-2026-27.jpg`, width: 1200, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-28.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-29.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-30.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-31.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-32.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-33.jpg`, width: 2048, height: 1431, alt: "" },
  { src: `${G}/galerie-2026-34.jpg`, width: 750, height: 565, alt: "" },
  { src: `${G}/galerie-2026-35.jpg`, width: 750, height: 872, alt: "" },
  { src: `${G}/galerie-2026-36.jpg`, width: 750, height: 996, alt: "" },
  { src: `${G}/galerie-2026-37.jpg`, width: 2048, height: 1151, alt: "" },
  { src: `${G}/galerie-2026-38.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-39.jpg`, width: 1600, height: 1200, alt: "" },
  { src: `${G}/galerie-2026-40.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-41.jpg`, width: 960, height: 1280, alt: "" },
  { src: `${G}/galerie-2026-42.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-43.jpg`, width: 750, height: 565, alt: "" },
  { src: `${G}/galerie-2026-44.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-45.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-46.jpg`, width: 554, height: 960, alt: "" },
  { src: `${G}/galerie-2026-47.jpg`, width: 1066, height: 1600, alt: "" },
  { src: `${G}/galerie-2026-48.jpg`, width: 750, height: 1334, alt: "" },
  { src: `${G}/galerie-2026-49.jpg`, width: 1600, height: 1066, alt: "" },
  { src: `${G}/galerie-2026-50.jpg`, width: 750, height: 565, alt: "" },
  { src: `${G}/galerie-2026-51.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-52.jpg`, width: 1536, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-53.jpg`, width: 1600, height: 1200, alt: "" },
  { src: `${G}/galerie-2026-54.jpg`, width: 1365, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-55.jpg`, width: 1368, height: 1824, alt: "" },
  { src: `${G}/galerie-2026-56.jpg`, width: 750, height: 1000, alt: "" },
  { src: `${G}/galerie-2026-57.jpg`, width: 1366, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-58.jpg`, width: 1764, height: 2048, alt: "" },
  { src: `${G}/galerie-2026-59.jpg`, width: 1668, height: 1668, alt: "" },
  { src: `${G}/galerie-2026-60.jpg`, width: 2048, height: 1536, alt: "" },
  { src: `${G}/galerie-2026-61.jpg`, width: 720, height: 960, alt: "" },
  { src: `${G}/galerie-2026-62.jpg`, width: 720, height: 960, alt: "" },
  { src: `${G}/galerie-2026-63.jpg`, width: 768, height: 1024, alt: "" },
  { src: `${G}/galerie-2026-64.jpg`, width: 1080, height: 1350, alt: "" },
  { src: `${G}/galerie-2026-65.jpg`, width: 570, height: 350, alt: "" },
  { src: `${G}/galerie-2026-66.jpg`, width: 750, height: 1112, alt: "" },
];

export default async function GaleriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);

  return (
    <>
      <PageHero
        image={`${D}/IMG_8268.jpg`}
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
          <Button href={cheminLocalise(routes.contact, locale)}>{d.commun.reserverSeance}</Button>
        </Container>
      </Section>
    </>
  );
}

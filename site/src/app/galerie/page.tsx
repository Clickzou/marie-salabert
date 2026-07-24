import type { Metadata } from "next";
import { routes } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { PageHero } from "@/components/sections";
import GalerieLightbox, { type GaleriePhoto } from "@/components/GalerieLightbox";

export const metadata: Metadata = {
  title: "Galerie photos - Ostéopathie animale - Marie Salabert",
  description:
    "Bienvenue chez Marie Salabert, spécialiste des soins ostéopathiques pour animaux. Découvrez mon expertise en images.",
  alternates: { canonical: "/galerie" },
};

const D = "/images/2025/05";

/** Les 47 photos de la galerie Elementor, dans l'ordre exact du site d'origine. */
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
  { src: `${D}/IMG_5213.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5249.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5278.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5282.jpg`, width: 1184, height: 789, alt: "" },
  { src: `${D}/IMG_5312.jpg`, width: 1184, height: 789, alt: "" },
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
  {
    src: `${D}/rendez-vous-osteopathe-animalier.jpg`,
    width: 1184,
    height: 789,
    alt: "Marie salabert en train de soigner un chien.",
  },
];

export default function GaleriePage() {
  return (
    <>
      <PageHero
        image={`${D}/IMG_8268.jpg`}
        eyebrow="En images"
        title="Galerie photos"
        subtitle={`${photos.length} photos de consultations : chevaux, chiens, chats, NAC et animaux de ferme.`}
      />

      {/* Mosaique pleine largeur, marge de 100 px */}
      <Section tone="surface">
        <Container width="full">
          <GalerieLightbox photos={photos} />
        </Container>
      </Section>

      <Section className="text-center">
        <Container width="full">
          <Button href={routes.booking}>Réservez une séance d&apos;ostéopathie animale</Button>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { MissingVisual } from "@/components/AProposPlaceholder";

export const metadata: Metadata = {
  title: "Certification RNA & CNOV — Ostéopathe animalier réglementé | Marie Salabert",
  description:
    "Marie Salabert est inscrite au Registre National d’Aptitude (RNA) tenu par le Conseil National de l’Ordre des Vétérinaires (CNOV) sous le numéro 801. Une ostéopathie animale réglementée et encadrée depuis 2011.",
  alternates: { canonical: "/mon-diplome-dosteopathe-animalier" },
};

const RNA_LIST_URL =
  "https://www.veterinaire.fr/annuaires/liste-des-personnes-non-veterinaires-pouvant-realiser-des-actes-dosteopathie-animale/liste-regionale-occitanie";

export default function CertificationPage() {
  return (
    <>
      {/* Hero : titre principal (unique h1 de la page). Taille de titre reduite
          pour un enonce long, dans la nouvelle direction serif epuree. */}
      <div className="[&_h1]:mx-auto [&_h1]:max-w-[860px] [&_h1]:font-display [&_h1]:font-semibold [&_h1]:text-[22px] [&_h1]:leading-snug sm:[&_h1]:text-[28px] lg:[&_h1]:text-[34px]">
        <PageHero
          image="/images/2025/05/certification-osteopathe-animalier-toulouse.jpg"
          title="Inscrite sur le Registre National d’Aptitude (RNA) tenu par le Conseil National de l’Ordre des Vétérinaires (CNOV) au numéro 801"
          height="short"
        />
      </div>

      {/* Cadre reglementaire + verification de l'inscription */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Cadre réglementaire</Eyebrow>
            <SectionTitle className="mt-3">Une profession réglementée</SectionTitle>
            <p className="mt-6 text-[17px] leading-relaxed text-body">
              Depuis 2011, l’ostéopathie animale est réglementée et encadrée par la profession
              vétérinaire ! Pour exercer en France il est donc obligatoire de figurer sur ce
              registre.{" "}
              <Link
                href={`${routes.about}#legislation`}
                className="font-medium text-plum underline decoration-plum/30 underline-offset-4 transition-colors hover:decoration-plum"
              >
                en savoir plus sur la législation
              </Link>
              .
            </p>

            <div className="mt-10">
              <Button href={RNA_LIST_URL} variant="plum">
                Vérifier mon inscription (liste Occitanie)
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Justificatifs */}
      <Section tone="surface" padding="no-top">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Preuve d’inscription</Eyebrow>
            <SectionTitle className="mt-3">Justificatif d’inscription au RNA</SectionTitle>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              Le document officiel attestant de mon inscription au Registre National d’Aptitude,
              accompagné de mon diplôme d’ostéopathe animalier.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl items-start gap-10 md:grid-cols-2">
            {/* Attestation RNA : emplacement provisoire, document a fournir */}
            <figure className="flex flex-col">
              <MissingVisual
                label="Attestation d’inscription au RNA — document à fournir (PDF ou image)"
                className="min-h-[420px] w-full bg-white"
              />
              <figcaption className="mt-4 text-center text-[14px] font-medium text-ink">
                Attestation d’inscription au RNA
                <span className="mt-1 block text-[13px] font-normal text-muted">
                  Document officiel à fournir
                </span>
              </figcaption>
            </figure>

            {/* Justificatif complementaire : diplome deja scanne */}
            <figure className="flex flex-col">
              <div className="overflow-hidden rounded-[6px] border border-black/10 bg-white p-3 shadow-sm">
                <Image
                  src="/images/2023/05/Diplome-osteopathe-animalier-marie-salabert.png"
                  alt="Diplôme d’ostéopathe animalier de Marie Salabert"
                  width={511}
                  height={740}
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="mx-auto h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 text-center text-[14px] font-medium text-ink">
                Diplôme d’ostéopathe animalier
                <span className="mt-1 block text-[13px] font-normal text-muted">
                  Justificatif complémentaire
                </span>
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* Appel a l'action */}
      <Section className="text-center">
        <Container>
          <SectionTitle>Une prise en charge en toute confiance</SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-body">
            Vous souhaitez confier votre animal à une praticienne inscrite et reconnue ?
          </p>
          <div className="mt-8">
            <Button href={routes.contact}>Prendre un rendez-vous</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { PageHero } from "@/components/sections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.certification.meta.titre,
    alternates: {
      canonical: cheminLocalise("/mon-diplome-dosteopathe-animalier", locale),
      languages: {
        fr: "/mon-diplome-dosteopathe-animalier",
        en: `/en/mon-diplome-dosteopathe-animalier`,
        it: `/it/mon-diplome-dosteopathe-animalier`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

/* Annuaire national des osteopathes inscrits au RNA, tenu par l'Ordre. Il
   remplace la liste regionale Occitanie : le libelle du bouton perd donc sa
   mention de region, qui ne correspondrait plus a la page d'arrivee. */
const RNA_LIST_URL = "https://extranet.veterinaire.fr/annuaires/osteopathes";

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
            {/* « Cadre réglementaire » devient le titre : le sur-titre et le
                titre disaient la même chose, l'un au-dessus de l'autre. */}
            <SectionTitle>Cadre réglementaire</SectionTitle>
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
                Vérifier mon inscription
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
              Le document officiel attestant de mon inscription au Registre National d’Aptitude.
            </p>
          </div>

          {/* Un seul justificatif : l'attestation de l'Ordre. Le nom du fichier
              parle de diplome, mais le document scanne est bien l'attestation
              d'inscription au RNA — c'est son intitule qui fait foi ici.
              L'emplacement vide qui l'accompagnait a ete supprime. */}
          <figure className="mx-auto mt-14 flex max-w-[440px] flex-col">
            <div className="overflow-hidden rounded-[6px] border border-black/10 bg-white p-3 shadow-sm">
              <Image
                src="/images/2023/05/Diplome-osteopathe-animalier-marie-salabert.png"
                alt="Attestation d’inscription au Registre National d’Aptitude délivrée à Marie Salabert par le Conseil national de l’Ordre des vétérinaires"
                width={511}
                height={740}
                sizes="(max-width: 768px) 90vw, 440px"
                className="mx-auto h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 text-center text-[14px] font-medium text-ink">
              Attestation d’inscription au RNA
            </figcaption>
          </figure>
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

import type { Metadata } from "next";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";

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
    description: d.certification.meta.description,
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
      {/* En-tete : logo du Conseil national de l'Ordre des veterinaires, a la
          place de la photo du cheval (retour V2 de la praticienne). Le logo
          fourni, 400px de large sur fond blanc, ne supportait ni le plein
          ecran ni le voile sombre d'une banniere : il est pose sur fond clair,
          au-dessus du titre (unique h1 de la page). */}
      <Section padding="no-bottom" className="text-center">
        <Container>
          <Image
            src="/images/2026/10/logo-ordre-national-veterinaires.png"
            /* Cette page n'est pas traduite : son contenu est ecrit en dur,
               le texte de remplacement suit la meme regle. */
            alt="Logo du Conseil national de l’Ordre des vétérinaires"
            width={400}
            height={250}
            priority
            className="mx-auto h-auto w-[240px] sm:w-[300px]"
          />
          <h1 className="mx-auto mt-10 max-w-[860px] font-display text-[22px] leading-snug font-semibold text-ink sm:text-[28px] lg:text-[34px]">
            Inscrite sur le Registre National d’Aptitude (RNA) tenu par le Conseil National de
            l’Ordre des Vétérinaires (CNOV) au numéro 801
          </h1>
        </Container>
      </Section>

      {/* Cadre reglementaire + verification de l'inscription */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* « Cadre réglementaire » devient le titre : le sur-titre et le
                titre disaient la même chose, l'un au-dessus de l'autre. */}
            <SectionTitle>Cadre réglementaire</SectionTitle>
            <p className="mt-6 text-[17px] leading-relaxed text-body">
              Depuis 2011, l’ostéopathie animale est réglementée et encadrée par la profession
              vétérinaire&nbsp;! Pour exercer en France il est donc obligatoire de figurer sur ce
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
          </div>

          {/* Phrase d'introduction et legende retirees a la demande de la
              praticienne : elles repetaient le titre de la section. */}
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
          </figure>
        </Container>
      </Section>

      {/* Appel a l'action */}
      <Section className="text-center">
        <Container>
          {/* Titre « Une prise en charge en toute confiance » retire (retour V2). */}
          <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-body">
            Vous souhaitez confier votre animal à une praticienne inscrite et reconnue ?
          </p>
          <div className="mt-8">
            <Button href={routes.rendezVous}>Prendre un rendez-vous</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

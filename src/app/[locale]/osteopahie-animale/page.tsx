import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { AProposApproches } from "@/components/AProposApproches";
import { AProposLegislation } from "@/components/AProposLegislation";
import Reveal from "@/components/Reveal";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.aPropos.meta.titre,
    description: d.aPropos.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.about, locale),
      languages: {
        fr: routes.about,
        en: `/en${routes.about}`,
        it: `/it${routes.about}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

/** Visuels des cinq approches, dans l'ordre du dictionnaire. */
const photosApproches = [
  "/images/approches/approche-musculosquelettique-cheval.jpg",
  "/images/approches/approche-tissulaire-chien.jpg",
  "/images/approches/approche-fasciale-chien.jpg",
  "/images/approches/approche-viscerale-poulain.jpg",
  "/images/approches/approche-reflexe-chien.jpg",
];

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const a = d.aPropos;

  const approches = a.approches.liste.map((approche, i) => ({
    title: approche.titre,
    image: photosApproches[i],
    alt: approche.alt,
    body: (
      <>
        {approche.paragraphes.map((par) => (
          <p key={par.slice(0, 40)}>{par}</p>
        ))}
      </>
    ),
  }));

  return (
    <>
      <PageHero
        image="/images/2025/05/a-propos-osteopathe-animalier-toulouse.jpg"
        eyebrow={a.hero.surTitre}
        title={a.hero.titre}
        subtitle={a.hero.sousTitre}
      />

      {/* Citation d'ouverture : elle porte seule, en grand, sans encadrement */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <figure>
              <blockquote>
                <p className="text-[26px] font-semibold leading-[1.25] tracking-[-0.025em] text-ink sm:text-[38px]">
                  {a.citation.texte}
                </p>
              </blockquote>
              <figcaption className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">
                {a.citation.source}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Histoire : titre en colonne collante a gauche, recit a droite */}
      <Section tone="surface">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{a.histoire.surTitre}</Eyebrow>
              <SectionTitle className="mt-5">{a.histoire.titre}</SectionTitle>
              {/* Cliche carre a la source : on garde ce format plutot que de le
                  recadrer en 4/3, ce qui amputerait la scene en haut et en bas. */}
              <figure className="group/media mt-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/2025/05/osteopathie-chat-01.jpg"
                  alt={a.histoire.photoAlt}
                  width={2048}
                  height={2048}
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="img-zoom aspect-square w-full object-cover"
                />
              </figure>
            </Reveal>

            {/* Recit decoupe en trois epoques : le repere temporel tient la
                colonne de gauche, le texte reste a une largeur de lecture confortable */}
            <Reveal delay={120}>
              <ol className="divide-y divide-line">
                {a.histoire.chapitres.map((chapitre) => (
                  <li
                    key={chapitre.periode}
                    className="grid gap-4 py-10 first:pt-0 last:pb-10 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
                  >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-plum">
                      {chapitre.periode}
                    </p>
                    <div>
                      <h3 className="text-[19px] leading-snug text-ink">{chapitre.intitule}</h3>
                      <div className="mt-4 max-w-2xl space-y-4 text-[16.5px] leading-[1.7] text-body">
                        {chapitre.paragraphes.map((par) => (
                          <p key={par.slice(0, 40)}>{par}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="max-w-3xl rounded-lg bg-white p-8 text-[19px] font-medium leading-snug text-ink ring-1 ring-line sm:text-[21px]">
                {a.histoire.synthese}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Les differentes approches : pleine largeur d'ecran, marge de 100 px */}
      <Section>
        <Container width="full">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{a.approches.surTitre}</Eyebrow>
            <SectionTitle className="mt-5">{a.approches.titre}</SectionTitle>
          </Reveal>
          <AProposApproches
            items={approches}
            libelles={{
              faitesDefiler: d.commun.faitesDefiler,
              precedente: a.approches.precedente,
              suivante: a.approches.suivante,
            }}
          />
        </Container>
      </Section>

      {/* Legislation */}
      <Section id="legislation" tone="surface" className="scroll-mt-28">
        <Container width="full">
          <Reveal className="max-w-3xl">
            <Eyebrow>{a.legislation.surTitre}</Eyebrow>
            <SectionTitle className="mt-5">{a.legislation.titre}</SectionTitle>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <AProposLegislation textes={a.legislation} />
          </Reveal>
        </Container>
      </Section>

      {/* Interdisciplinarite : parole de la praticienne, avec son portrait */}
      <Section>
        <Container width="wide">
          <figure className="grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20">
            <Reveal variant="right" className="group/media overflow-hidden rounded-lg">
              <Image
                src="/images/2023/05/marie-salabert.jpg"
                alt={a.interdisciplinarite.photoAlt}
                width={900}
                height={900}
                sizes="(max-width: 1024px) 100vw, 440px"
                className="img-zoom aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={120}>
              <span aria-hidden="true" className="block text-[64px] leading-none text-plum/25">
                “
              </span>
              <blockquote className="-mt-6 space-y-6 text-[19px] leading-[1.65] text-ink sm:text-[22px]">
                {a.interdisciplinarite.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </blockquote>
              <figcaption className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-plum">
                {a.interdisciplinarite.signature}
              </figcaption>
            </Reveal>
          </figure>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { CheckList, CtaBand } from "@/components/sections";
import {
  ApprocheGlobale,
  MotifCard,
  NumeroSection,
  RetourConsultations,
} from "@/components/consultations-ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: `${d.consultations.equides.titre} | ${d.consultations.hero.titre}`,
    description: d.consultations.equides.chapo,
    alternates: {
      canonical: cheminLocalise(routes.equides, locale),
      languages: {
        fr: routes.equides,
        en: `/en${routes.equides}`,
        it: `/it${routes.equides}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function EquidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.consultations;
  const L = c.listes;

  return (
    <>

      {/* Bandeau d'ouverture : reprend a l'identique la mise en page qu'avait la
          section sur la page consultations. */}
      <Section tone="plum" padding="none">
        {/* Hauteur minimale commune aux trois bannieres : sans elle chacune
            suit son propre texte, et elles ne s'alignent pas d'une page a
            l'autre quand on navigue par le menu lateral. */}
        <div className="grid items-stretch lg:min-h-[610px] lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[440px]">
            <Image
              src="/images/2025/05/osteopathe-animaliere-toulouse.jpg"
              alt={c.equides.photoAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
            <NumeroSection numero="01" label={c.equides.numero} />
            <h1 className="uppercase mt-3 font-display text-[32px] leading-[1.1] font-light text-white sm:text-[42px] tracking-[0.05em]">
              {c.equides.titre}
            </h1>
            {/* Pas de sous-titre : le titre enonce deja les profils d'equides,
                le repeter en dessous faisait doublon mot pour mot. */}
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">{c.equides.chapo}</p>
            {/* Appel a l'action des la banniere : le visiteur qui arrive
                par le menu n'a pas a parcourir la page pour le trouver. */}
            <div className="mt-8">
              <Button href={cheminLocalise(routes.contact, locale)} variant="gold">
                {d.commun.prendreRdv}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          {/* Encart centre, comme sur les deux autres pages d'especes */}
          <div className="mx-auto max-w-4xl rounded-lg border border-plum/15 bg-plum/[0.04] p-8 sm:p-10">
            {/* Secteur d'intervention en tete de l'encart : le lecteur sait ou
                la prestation est proposee avant d'en lire le detail. */}
            <p className="text-[16px] leading-[1.7] text-body">{c.secteur.phraseEspeces}</p>
            <span aria-hidden="true" className="mt-7 mb-7 block h-px w-full bg-plum/15" />
            <p className="text-[16.5px] leading-[1.7] text-body">{c.equides.etapesIntro}</p>
            <CheckList items={L.equinEtapes} className="mt-5" />
            <p className="mt-6 text-[15px] leading-relaxed text-body">{c.equides.etapesFin}</p>
          </div>

          <div className="mt-12">
            <MotifCard
              title={c.equides.motifsTitre}
              items={L.equinMotifs}
              className="[&_ul]:sm:columns-2 [&_ul]:sm:gap-x-10 [&_li]:sm:mb-3"
            />
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title={c.equides.globaleTitre}
              intro={c.equides.globaleIntro}
              items={L.equinApprocheGlobale}
              conclusion={c.equides.globaleConclusion}
            />
          </div>

          <RetourConsultations
            href={cheminLocalise(routes.consultations, locale)}
            libelle={c.hero.titre}
          />
        </Container>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title={d.accueil.cta}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.contact, locale) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { CtaBand } from "@/components/sections";
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
    title: d.consultations.rente.meta.titre,
    description: d.consultations.rente.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.rente, locale),
      languages: {
        fr: routes.rente,
        en: `/en${routes.rente}`,
        it: `/it${routes.rente}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function RentePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.consultations;
  const L = c.listes;

  return (
    <>

      {/* Bandeau d'ouverture : photo a gauche, texte a droite. */}
      <Section tone="plum" padding="none">
        {/* Hauteur minimale commune aux trois bannieres : sans elle chacune
            suit son propre texte, et elles ne s'alignent pas d'une page a
            l'autre quand on navigue par le menu lateral. */}
        <div className="grid items-stretch lg:min-h-[610px] lg:grid-cols-2">
          <div className="relative order-2 min-h-[280px] lg:order-1 lg:min-h-[440px]">
            <Image
              src="/images/2026/07/osteopathie-animaux-de-rente.jpeg"
              alt={c.rente.photoAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-2 lg:px-14">
            <NumeroSection numero="03" label={c.rente.numero} />
            <h1 className="uppercase mt-3 font-display text-[30px] leading-[1.12] font-light text-white sm:text-[40px] tracking-[0.05em]">
              {c.rente.titre}
            </h1>
            {/* Pas de sous-titre ici : le sur-titre au-dessus enumere deja les
                especes (« ostéopathie bovine, ovine, caprine et porcine »). */}
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">{c.rente.chapo}</p>
            {/* Appel a l'action des la banniere : le visiteur qui arrive
                par le menu n'a pas a parcourir la page pour le trouver. */}
            <div className="mt-8">
              <Button href={cheminLocalise(routes.rendezVous, locale)} variant="gold">
                {d.commun.prendreRdv}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          {/* encart teinte prune, en echo a la couleur du bandeau */}
          <div className="mx-auto max-w-4xl rounded-lg border border-plum/15 bg-plum/[0.04] p-8 text-[16.5px] leading-[1.7] text-body sm:p-10">
            {/* Secteur d'intervention en tete de l'encart : le lecteur sait ou
                la prestation est proposee avant d'en lire le detail. */}
            <p className="text-[16px]">{c.secteur.phraseEspeces}</p>
            <span aria-hidden="true" className="mt-7 mb-7 block h-px w-full bg-plum/15" />
            <div className="space-y-4">
              {c.rente.paragraphes.map((par) => (
                <p key={par.slice(0, 40)}>{par}</p>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <MotifCard
              title={c.rente.motifsTitre}
              note={c.rente.motifsNote}
              items={L.elevageMotifs}
              className="[&_ul]:sm:columns-2 [&_ul]:sm:gap-x-10 [&_li]:sm:mb-3"
            />
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title={c.rente.globaleTitre}
              intro={c.rente.globaleIntro}
              items={L.elevageApprocheGlobale}
              conclusion={c.rente.globaleConclusion}
              photo={{
                src: "/images/2025/05/osteopathie-animaux-elevage-01.avif",
                alt: c.rente.photoGlobaleAlt,
                largeur: 960,
                hauteur: 720,
              }}
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
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.rendezVous, locale) }}
      />
    </>
  );
}

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
  SubHeading,
} from "@/components/consultations-ui";

const CLINIQUE_TEL = "05.63.34.51.52";
const CLINIQUE_HREF = "tel:+33563345152";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: `${d.consultations.compagnie.numero} | ${d.consultations.hero.titre}`,
    description: d.consultations.compagnie.chapo,
    alternates: {
      canonical: cheminLocalise(routes.compagnie, locale),
      languages: {
        fr: routes.compagnie,
        en: `/en${routes.compagnie}`,
        it: `/it${routes.compagnie}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function CompagniePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.consultations;
  const L = c.listes;

  return (
    <>

      {/* Bandeau d'ouverture : photos a gauche, texte a droite, comme les deux
          autres pages d'especes. Le sens de lecture doit etre le meme d'une page
          a l'autre, on passe de l'une a l'autre par le menu lateral. */}
      <Section tone="green" padding="none">
        {/* Hauteur minimale commune aux trois bannieres : sans elle chacune
            suit son propre texte, et elles ne s'alignent pas d'une page a
            l'autre quand on navigue par le menu lateral. */}
        <div className="grid items-stretch lg:min-h-[610px] lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
            <NumeroSection numero="02" label={c.compagnie.numero} />
            <h1 className="uppercase mt-3 font-display text-[30px] leading-[1.12] font-light text-white sm:text-[40px] tracking-[0.05em]">
              {c.sommaire[1].label}
            </h1>
            {/* Pas de sous-titre : le sur-titre au-dessus dit deja
                « chiens · chats · NAC ». */}
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">{c.compagnie.chapo}</p>
            {/* Appel a l'action des la banniere : le visiteur qui arrive
                par le menu n'a pas a parcourir la page pour le trouver. */}
            <div className="mt-8">
              <Button href={cheminLocalise(routes.contact, locale)} variant="gold">
                {d.commun.prendreRdv}
              </Button>
            </div>
          </div>
          {/* Une seule photo, comme sur les deux autres pages d'especes : le
              diptyque decoupait la banniere en trois blocs de largeurs
              inegales. */}
          <div className="relative order-1 min-h-[280px] lg:min-h-[440px]">
            <Image
              src="/images/2026/07/osteopathie-animaux-compagnie.jpeg"
              alt={c.compagnie.photoChienAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          {/* Encart centre, comme sur les deux autres pages d'especes */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border border-green/25 bg-green-soft/10 p-8 sm:p-10">
              {/* Meme phrase de secteur que les deux autres pages d'especes,
                  prise a la meme source : cette page en donnait sa propre
                  version, qui avait deja pris du retard sur la liste des
                  departements. */}
              <p className="text-[16px] leading-[1.7] text-body">{c.secteur.phraseEspeces}</p>
              <span aria-hidden="true" className="mt-7 mb-7 block h-px w-full bg-green/20" />
              <p className="eyebrow text-green">{c.compagnie.lieuFixeTitre}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                {c.compagnie.lieuFixeTexte1}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                {c.compagnie.lieuFixeTexte2}{" "}
                <a href={CLINIQUE_HREF} className="font-semibold text-green hover:underline">
                  {CLINIQUE_TEL}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <MotifCard title={c.compagnie.chienTitre} items={L.chienMotifs} />
            <MotifCard title={c.compagnie.chatTitre} items={L.chatMotifs} />
          </div>
        </Container>
      </Section>

      {/* Fond gris a partir des NAC : il detache la partie consacree aux
          especes moins courantes et l'approche globale qui la conclut. */}
      <Section tone="surface">
        <Container width="full">
          <div>
            {/* Motifs communs a tous les NAC, dans un encart teinte : ils
                chapeautent les deux cartes qui suivent, chacune consacree a une
                famille. La liste est en grille et non en colonnes CSS, qui
                coupaient la serie a un endroit arbitraire et laissaient les deux
                colonnes de hauteurs inegales. */}
            <div className="rounded-lg border border-green/25 bg-green-soft/10 p-8 sm:p-10">
              <SubHeading>{c.compagnie.nacTitre}</SubHeading>
              <CheckList
                items={L.nacMotifs}
                className="mt-7 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4 sm:space-y-0"
              />
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <MotifCard
                title={c.compagnie.lapinsTitre}
                items={L.lapinsRongeurs}
                photo={{
                  src: "/images/2025/05/IMG_4328.jpg",
                  alt: c.compagnie.photoLapinAlt,
                  largeur: 750,
                  hauteur: 565,
                }}
              />
              <MotifCard
                title={c.compagnie.reptilesTitre}
                items={L.reptiles}
                photo={{
                  src: "/images/2026/07/osteopathie-reptile-serpent.jpeg",
                  alt: c.compagnie.photoReptileAlt,
                  largeur: 1080,
                  hauteur: 1350,
                }}
              />
            </div>
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title={c.compagnie.globaleTitre}
              intro={c.compagnie.globaleIntro}
              items={L.compagnieApprocheGlobale}
              conclusion={c.compagnie.globaleConclusion}
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

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import {
  ApprocheGlobale,
  MotifCard,
  NumeroSection,
  RetourConsultations,
  SubHeading,
} from "@/components/consultations-ui";
import { NavEspeces } from "@/components/NavEspeces";

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
      <NavEspeces locale={locale} libelles={c.sommaire} courant="compagnie" />

      {/* Bandeau d'ouverture : texte a gauche, deux photos a droite, comme sur
          la page consultations d'origine. */}
      <Section tone="green" padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:px-14">
            <NumeroSection numero="02" label={c.compagnie.numero} />
            <h1 className="uppercase mt-3 font-display text-[30px] leading-[1.12] font-light text-white sm:text-[40px] tracking-[0.05em]">
              {c.compagnie.titre}
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">{c.compagnie.chapo}</p>
          </div>
          <div className="order-1 grid grid-cols-2 lg:order-2">
            <div className="relative min-h-[220px] lg:min-h-[440px]">
              <Image
                src="/images/2025/05/osteopathe-chien-toulouse.jpg"
                alt={c.compagnie.photoChienAlt}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[220px] lg:min-h-[440px]">
              <Image
                src="/images/2025/05/osteopathe-chat-toulouse.jpg"
                alt={c.compagnie.photoChatAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-green/25 bg-green-soft/10 p-6 sm:p-7">
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

          <div className="mt-12">
            <SubHeading>{c.compagnie.nacTitre}</SubHeading>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <MotifCard title={c.compagnie.nacGeneraux} items={L.nacMotifs} />
              <MotifCard title={c.compagnie.lapinsTitre} items={L.lapinsRongeurs} />
              <MotifCard title={c.compagnie.reptilesTitre} items={L.reptiles} />
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

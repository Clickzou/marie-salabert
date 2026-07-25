import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { avis, googleAvis } from "@/content/avis";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes, site } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import {
  CertificationBadge,
  CheckList,
  CtaBand,
  PageHero,
  Testimonials,
} from "@/components/sections";
import Reveal from "@/components/Reveal";
import SecteurMap from "@/components/SecteurMap";
import { CarrouselPhotos } from "@/components/CarrouselPhotos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.accueil.meta.titre,
    description: d.accueil.meta.description,
    alternates: {
      canonical: cheminLocalise("/", locale),
      languages: { fr: "/", en: "/en", it: "/it" },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

/** Photos de la banniere : identiques dans les trois langues. */
const photosHero = [
  "/images/2025/05/osteopathe-animalier-toulouse.jpg",
  "/images/2025/05/osteopathe-animaliere-toulouse.jpg",
  "/images/2025/05/osteopathe-chien-toulouse.jpg",
  "/images/2025/05/osteopathe-chat-toulouse.jpg",
];

/**
 * Carrousel de la section « Deroulement d'une seance ».
 *
 * Six cliches de la galerie. Le tri s'est fait sur le contenu, pas sur le nom de
 * fichier : la banniere sert les memes photos sous d'autres noms — le poulain,
 * le border collie et le chat noir de la galerie sont exactement les cliches de
 * `osteopathe-animalier-toulouse`, `osteopathe-chien-toulouse` et
 * `osteopathe-chat-toulouse`. Chaque image ci-dessous a donc ete comparee une a
 * une aux quatre vues de la banniere, et les especes sont variees.
 *
 * Les textes alternatifs decrivent la scene : ces photos portent une
 * information, elles ne sont pas decoratives.
 */
const photosSeances = [
  {
    src: "/images/2025/05/9F3CC3C6-C8CC-45ED-84F6-D54379C346E8.jpg",
    largeur: 1440,
    hauteur: 963,
    alt: "Marie Salabert travaille le dos d'un berger allemand assis dans l'herbe.",
  },
  {
    src: "/images/2025/05/marie-salabert-osteopathe-animaliere-1.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert porte un chat siamois contre elle avant une séance.",
  },
  {
    src: "/images/2025/05/B8F0133C-B03C-433E-A182-443F72A4644B.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert mobilise la tête d'un cheval bai dans une écurie.",
  },
  {
    src: "/images/2025/05/D2FAB58D-7A14-4998-A8AB-85CCBB71F706.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert soutient l'encolure d'un poney brun dans un pré fleuri.",
  },
  {
    src: "/images/2025/05/decouvrir-osteopathe-animale-1.jpg",
    largeur: 1488,
    hauteur: 1304,
    alt: "Marie Salabert mobilise l'antérieur d'un cheval bai, au pré.",
  },
  {
    src: "/images/2025/05/IMG_8271.jpg",
    largeur: 2000,
    hauteur: 1500,
    alt: "Marie Salabert examine le dos d'un cheval bai en extérieur, au pré.",
  },
] as const;

/** Visuels des trois publics, dans l'ordre du dictionnaire. */
const photosPublics = [
  "/images/2025/05/IMG_5516.jpg",
  "/images/2025/05/IMG_5249.jpg",
  // meme photo de terrain que la carte « Animaux de rente » des consultations
  "/images/2025/05/IMG_2057.avif",
];

const ARTICLE_HEGEL = "https://stm.cairn.info/revue-hegel-2026-1-page-5?lang=fr";

/** Nombre d'indications affichées d'emblée ; les suivantes sont repliées. */
const INDICATIONS_VISIBLES = 3;

/** Ligne d'indication : puce discrète plutôt qu'une coche, les listes étant longues. */
function Indication({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3.5 text-[14.5px] leading-relaxed text-body">
      <span
        aria-hidden="true"
        className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-plum/45"
      />
      <span>{children}</span>
    </li>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const a = d.accueil;

  return (
    <>
      <PageHero
        images={photosHero}
        title={a.meta.titreHero}
        subtitle={a.heroSousTitre}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.booking, locale) }}
      />
      <CertificationBadge
        href={cheminLocalise(routes.certification, locale)}
        libelle={d.commun.voirCertification}
        surTitre={d.commun.reconnaissance}
        mention={d.commun.registre}
      />

      {/* Parcours personnel. Espacement complet : le « no-top » d'avant
          compensait la pastille de certification et sa marge basse, que le
          bandeau plat ne produit plus. */}
      <Section>
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div className="group/media overflow-hidden rounded-lg">
                <Image
                  src="/images/2023/05/marie-salabert.jpg"
                  alt={a.parcours.alt}
                  width={900}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="img-zoom w-full object-cover"
                />
              </div>
              <Image
                src="/images/2023/05/square-pattern.png"
                alt=""
                aria-hidden="true"
                width={154}
                height={155}
                className="pointer-events-none absolute -bottom-10 -left-8 hidden w-[154px] select-none lg:block"
              />
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{a.parcours.surTitre}</Eyebrow>
              <SectionTitle className="mt-4">{a.parcours.titre}</SectionTitle>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-body">
                {a.parcours.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={ARTICLE_HEGEL}>{a.parcours.lireArticle}</Button>
                <Button href={cheminLocalise(routes.news, locale)} variant="outline">
                  {a.parcours.enSavoirPlus}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* L'ostéopathie animale pour qui ? — pleine largeur, marge de 100 px */}
      <Section tone="surface" padding="no-top" className="pt-24 sm:pt-36">
        <Container width="full">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">{a.pourQui.surTitre}</Eyebrow>
            <SectionTitle className="mt-4">{a.pourQui.titre}</SectionTitle>
          </Reveal>

          {/* Trois cartes illustrees : la photo porte la carte, les listes longues
              sont repliees au-dela de trois lignes. */}
          <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {a.pourQui.liste.map((p, idx) => {
              const visibles = p.indications.slice(0, INDICATIONS_VISIBLES);
              const repliees = p.indications.slice(INDICATIONS_VISIBLES);
              return (
                <Reveal
                  as="li"
                  key={p.titre}
                  delay={idx * 140}
                  className="card card-hover group/media flex flex-col overflow-hidden border-transparent bg-white"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={photosPublics[idx]}
                      alt={p.alt}
                      width={1024}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="img-zoom aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 sm:p-10">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {p.sousTitre}
                    </p>
                    <h3 className="mt-3 text-[24px] leading-snug text-plum">{p.titre}</h3>

                    <ul className="mt-7 space-y-3.5">
                      {visibles.map((item) => (
                        <Indication key={item}>{item}</Indication>
                      ))}
                    </ul>

                    {repliees.length > 0 && (
                      /* mt-auto : le lien se cale en bas, les trois cartes finissent alignees */
                      <details className="disclosure mt-auto pt-6">
                        <summary className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide text-plum transition-colors hover:text-plum-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum">
                          <span className="when-closed">
                            {a.pourQui.voirAutres.replace("{n}", String(repliees.length))}
                          </span>
                          <span className="when-open">{a.pourQui.reduire}</span>
                          <svg
                            className="chevron"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </summary>
                        <ul className="mt-3.5 space-y-3.5">
                          {repliees.map((item) => (
                            <Indication key={item}>{item}</Indication>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 text-center">
            <Button href={cheminLocalise(routes.booking, locale)}>{d.commun.prendreRdv}</Button>
          </Reveal>
        </Container>
      </Section>

      {/* Comment prendre rendez-vous */}
      <Section>
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-20">
            <Reveal className="group/media mx-auto overflow-hidden rounded-full">
              <Image
                src="/images/2023/05/osteopathie-deroule-seance.jpeg"
                alt={a.rendezVous.alt}
                width={400}
                height={400}
                className="img-zoom h-[260px] w-[260px] object-cover"
              />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>{a.rendezVous.surTitre}</Eyebrow>
              <SectionTitle className="mt-4">{a.rendezVous.titre}</SectionTitle>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-body">
                {a.rendezVous.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-3 text-[24px] font-semibold text-green"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
                  </svg>
                  {site.phone}
                </a>
                <p className="text-[15px] text-body">
                  {d.commun.secretariat} :{" "}
                  <a
                    href={`tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`}
                    className="font-semibold text-green hover:underline"
                  >
                    {site.secretariat}
                  </a>
                </p>
              </div>
              <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-body">
                <p>{a.rendezVous.tarif}</p>
                <p className="font-medium text-ink">{a.rendezVous.paiement}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Les lieux de consultation */}
      <Section tone="surface">
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">{a.lieux.surTitre}</Eyebrow>
            <SectionTitle className="mt-4">{a.lieux.titre}</SectionTitle>
          </Reveal>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <h3 className="text-[21px] leading-snug text-plum">{a.lieux.domicileTitre}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-body">{a.lieux.domicileTexte}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {a.lieux.departements.map((dep) => (
                  <li
                    key={dep.code}
                    className="hover-raise inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] text-body ring-1 ring-ink/10"
                  >
                    <span className="font-semibold text-plum">{dep.code}</span>
                    {dep.nom}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-ink/10 pt-8">
                <h3 className="text-[21px] leading-snug text-plum">{a.lieux.cliniqueTitre}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">{a.lieux.cliniqueTexte}</p>
              </div>
            </Reveal>

            <Reveal
              delay={140}
              className="overflow-hidden rounded-lg ring-1 ring-ink/10 [&_iframe]:block"
            >
              <SecteurMap className="h-[340px] sm:h-[460px]" />
            </Reveal>
          </div>

          <Reveal className="mt-14 rounded-lg border border-plum/15 bg-white p-8 sm:p-10">
            <h3 className="text-[21px] leading-snug text-plum">{a.lieux.guyaneTitre}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-body">{a.lieux.guyaneTexte}</p>
            <CheckList className="mt-5" items={a.lieux.guyaneLieux} />
          </Reveal>
        </Container>
      </Section>

      {/* Déroulement d'une séance d'ostéopathie animale */}
      <Section>
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">{a.etapes.surTitre}</Eyebrow>
            <SectionTitle className="mt-4">{a.etapes.titre}</SectionTitle>
          </Reveal>

          {/* Grille editoriale pleine largeur : chiffre fantome, filet fin, pas de carte */}
          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
            {a.etapes.liste.map((e, i) => (
              <Reveal
                as="li"
                key={e.titre}
                delay={(i % 3) * 120}
                className="border-t border-ink/10 pt-7"
              >
                <span
                  aria-hidden="true"
                  className="block font-display text-[44px] font-semibold leading-none text-plum/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[20px] leading-snug text-ink">{e.titre}</h3>
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-body">
                  {e.paragraphes.map((par) => (
                    <p key={par.slice(0, 40)}>{par}</p>
                  ))}
                </div>
                {"lien" in e && e.lien && (
                  <a
                    href={e.lien.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-green transition-colors hover:text-plum"
                  >
                    {e.lien.libelle}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
              </Reveal>
            ))}
          </ol>

        </Container>

        {/* Carrousel de photos, hors grille et hors conteneur pour occuper toute
            la largeur de l'ecran. Les cliches viennent de la galerie et ne sont
            utilises nulle part ailleurs sur l'accueil. */}
        <Reveal variant="fade" className="mt-16">
          <CarrouselPhotos
            photos={photosSeances}
            libelles={{
              titre: d.commun.photosSeances,
              precedent: d.commun.precedent,
              suivant: d.commun.suivant,
            }}
          />
        </Reveal>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title={a.cta}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.booking, locale) }}
      />

      <Testimonials
        items={avis.slice(0, 3)}
        profile={googleAvis}
        title={d.avis.titre}
        libelles={{ avisGoogle: d.avis.avisGoogle, lireTous: d.avis.lireTous }}
        locale={localeTags[locale]}
      />

      <Section className="py-16 text-center">
        <Container width="wide">
          <Reveal>
            <Button href={cheminLocalise(routes.booking, locale)} variant="gold">
              {d.commun.reserverSeance}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

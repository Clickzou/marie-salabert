import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { CheckList, CtaBand, PageHero, Testimonials } from "@/components/sections";
import { avis, googleAvis } from "@/content/avis";
import Reveal from "@/components/Reveal";
import SecteurMap from "@/components/SecteurMap";
import SommaireFlottant from "@/components/SommaireFlottant";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.consultations.meta.titre,
    description: d.consultations.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.consultations, locale),
      languages: {
        fr: routes.consultations,
        en: `/en${routes.consultations}`,
        it: `/it${routes.consultations}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}


/** Visuels de l'aiguillage vers les pages d'especes, dans l'ordre du dictionnaire. */
const photosSommaire = [
  "/images/2025/05/IMG_5249.jpg",
  "/images/2025/05/IMG_5516.jpg",
  // photo de terrain, en bouverie, a la place de l'image d'illustration
  "/images/2025/05/IMG_2057.avif",
];

/* Marge appliquee aux cibles d'ancres : compense header (88px) + sous-nav collante. */
const ANCHOR = "scroll-mt-[150px]";

/* --------------------------------------------------------------------------
 * Donnees de contenu (recopiees a l'identique de la source de verite).
 * Le texte est stocke sous forme de chaines et rendu via des expressions JSX
 * afin de rester fidele a la ponctuation d'origine.
 * ------------------------------------------------------------------------ */

/** Sommaire illustre place sous la banniere. */
/* --------------------------------------------------------------------------
 * Petits composants de mise en page, locaux a la page.
 * ------------------------------------------------------------------------ */

/**
 * Intitule des trois points de la partie « en premiere intention ».
 *
 * Les trois partagent exactement le meme traitement — numero en pastille, meme
 * corps, meme graisse, meme filet — parce que c'est la seule chose qui dit au
 * lecteur qu'ils sont de meme rang. Une difference de taille ou de couleur
 * suffirait a en faire passer un pour le titre des autres.
 */
function PointTitre({ numero, children }: { numero: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 border-t-2 border-plum/20 pt-5">
      <span
        aria-hidden="true"
        className="shrink-0 font-display text-[15px] font-semibold text-plum/50"
      >
        {numero}
      </span>
      <h3 className="font-display text-[24px] leading-tight font-semibold text-ink sm:text-[28px]">
        {children}
      </h3>
    </div>
  );
}

/** Intitule d'une partie de second niveau (B, C, D). */
function PartieTitre({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[26px] leading-tight font-light uppercase tracking-[0.05em] text-ink sm:text-[32px]">
      {children}
    </h2>
  );
}


export default async function ConsultationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.consultations;
  const L = c.listes;

  /* Les trois pages d'especes : servent a la fois au sommaire flottant et aux
     cartes d'aiguillage en bas de page, dans l'ordre du dictionnaire. */
  const liensEspeces = [
    { href: cheminLocalise(routes.equides, locale), label: c.sommaire[0].label },
    { href: cheminLocalise(routes.compagnie, locale), label: c.sommaire[1].label },
    { href: cheminLocalise(routes.rente, locale), label: c.sommaire[2].label },
  ];

  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathe-animalier-toulouse.jpg"
        eyebrow={c.hero.surTitre}
        title={c.hero.titre}
        subtitle={c.hero.sousTitre}
      />

      {/* Sommaire flottant a droite : il mene aux trois pages d'especes, il est
          donc utile d'un bout a l'autre de la page et n'attend plus une section
          declencheuse. */}
      <SommaireFlottant liens={liensEspeces} actifHref="" />

      {/* ================= LES DIFFÉRENTS TYPES DE CONSULTATIONS =================
          Titre de section qui coiffe l'ensemble : partie A et ses trois points,
          puis les parties B, C et D. */}
      <Section id="general" className={ANCHOR} padding="no-bottom">
        <Container width="full">
          <SectionTitle className="max-w-4xl">{c.typesTitre}</SectionTitle>
        </Container>
      </Section>

      <Section padding="no-bottom">
        <Container>
          <div className="max-w-3xl">
            <PartieTitre>{c.general.surTitre}</PartieTitre>
          </div>

          {/* Point 1 */}
          <div className="mt-12 max-w-3xl">
            <PointTitre numero="01">{c.general.titre}</PointTitre>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              {c.general.intro}
            </p>
          </div>

        </Container>

        {/* Frise horizontale : les cinq etapes restent sur une seule ligne, reliees
            par un filet ; la piste defile lateralement sur petits ecrans. */}
        <Container width="full">
          {/* La frise s'anime a l'arrivee : pastille 1 qui se remplit, filet qui se
              trace, puis pastille 2, etc. */}
          <Reveal className="frise no-scrollbar mt-14 overflow-x-auto pb-4">
            <ol className="flex min-w-max lg:min-w-0">
              {c.etapesDeVie.map((e, i) => (
                <li
                  key={e.label}
                  style={{ ["--jalon-delay" as string]: `${i * 420}ms` }}
                  className="relative w-[300px] shrink-0 pr-8 last:pr-0 lg:w-auto lg:flex-1"
                >
                  {/* filet de liaison vers l'etape suivante */}
                  {i < c.etapesDeVie.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="jalon-filet absolute left-[52px] right-0 top-[22px] h-px bg-plum/40"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="jalon-puce relative grid h-11 w-11 place-items-center rounded-full border border-plum/25 bg-white text-[15px] font-semibold text-plum"
                  >
                    {i + 1}
                  </span>
                  <div className="jalon-texte">
                    <h3 className="mt-6 pr-4 text-[18px] leading-snug text-ink">{e.label}</h3>
                    <p className="mt-3 pr-4 text-[15.5px] leading-relaxed text-body">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      {/* Points 2 et 3 de la partie A : meme rang que le point 1, donc meme
          intitule numerote. Chacun garde sa carte illustree d'origine. */}
      <Section tone="surface" padding="no-bottom">
        <Container>
          {[
            {
              numero: "02",
              titre: c.motifs.titre,
              note: null,
              items: L.troublesLocomoteurs,
              icone: "M4 18l4-6 3 3 3-5 6 8",
              fond: "bg-plum/8 ring-plum/15",
              couleur: "text-plum",
            },
            {
              numero: "03",
              titre: c.motifs.emotionnelTitre,
              note: c.motifs.emotionnelNote,
              items: L.accompagnementEmotionnel,
              icone: "M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.33 6C19 16.65 12 21 12 21z",
              fond: "bg-green/8 ring-green/15",
              couleur: "text-green",
            },
          ].map((point) => (
            <div key={point.numero} className="mt-14 max-w-3xl first:mt-0">
              <PointTitre numero={point.numero}>{point.titre}</PointTitre>
              {point.note && (
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{point.note}</p>
              )}
              <div className="mt-6 rounded-lg bg-white p-7 ring-1 ring-line sm:p-9">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full ring-1 ${point.fond} ${point.couleur}`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={point.icone} />
                  </svg>
                </span>
                <CheckList items={point.items} className="mt-6" />
              </div>
            </div>
          ))}
        </Container>
      </Section>

      {/* ================= B ================= */}
      <Section tone="surface">
        <Container>
          <div className="max-w-3xl">
            <PartieTitre>{c.motifs.premiereIntentionTitre}</PartieTitre>
            <p className="mt-6 text-[16px] leading-[1.7] text-body">
              {c.motifs.premiereIntentionTexte1}
            </p>
            <CheckList items={L.premiereIntention} className="mt-7" />
            <p className="mt-7 text-[16px] leading-[1.7] text-body">
              {c.motifs.premiereIntentionTexte2}
            </p>
          </div>
        </Container>
      </Section>

      {/* Affections chroniques — pleine largeur, marge de 100 px.
          L'identifiant ne sert pas d'ancre de navigation : il marque le point a
          partir duquel le sommaire flottant apparait. */}
      <Section id="chroniques">
        <Container width="full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <PartieTitre>{c.chroniques.titre}</PartieTitre>
            {/* rappel important : mis en avant par une pastille et un fond doux */}
            <div className="flex items-start gap-4 rounded-lg bg-surface p-6 sm:p-7">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-plum ring-1 ring-plum/15">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8h.01M11 12h1v4h1" />
                </svg>
              </span>
              <p className="text-[16px] leading-[1.7] text-body">
                L&apos;ostéopathie animale intervient <strong className="text-ink">en complément</strong>{" "}
                du suivi vétérinaire établi. Elle ne remplace ni le diagnostic ni les traitements
                prescrits par votre vétérinaire.
              </p>
            </div>
          </div>

          {/* deux cartes : pastille d'icone, titre, note puis liste */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                titre: c.chroniques.ameliorationTitre,
                note: "Dans certaines situations, l'ostéopathie peut contribuer à améliorer totalement ou partiellement des troubles chroniques dits récidivants.",
                items: L.chroniquesAmelioration,
                icone: "M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.33 6C19 16.65 12 21 12 21z",
                couleur: "text-plum",
                fond: "bg-plum/8 ring-plum/15",
              },
              {
                titre: c.chroniques.confortTitre,
                note: "Troubles chroniques où la séance a pour rôle d'apporter du confort et/ou d'accompagner la prise en charge faite par votre vétérinaire.",
                items: L.chroniquesConfort,
                icone: "M10 3h4v5h5v4h-5v5h-4v-5H5V8h5V3z",
                couleur: "text-green",
                fond: "bg-green/8 ring-green/15",
              },
            ].map((c) => (
              <div key={c.titre} className="card card-hover flex h-full flex-col p-8 sm:p-10">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full ring-1 ${c.fond} ${c.couleur}`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={c.icone} />
                  </svg>
                </span>
                <h3 className="mt-6 text-[21px] leading-snug text-ink">{c.titre}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.note}</p>
                <span aria-hidden="true" className="mt-6 block h-px w-full bg-line" />
                <CheckList items={c.items} className="mt-6" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Approche collaborative + secteur d'intervention : titre et carte a gauche,
          propos, appel a l'action et departements a droite. */}
      <Section tone="surface" padding="no-top">
        <Container width="full">
          <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>{c.collaboration.surTitre}</Eyebrow>
              <div className="mt-5 max-w-xl">
                <PartieTitre>{c.collaboration.titre}</PartieTitre>
              </div>
              <div className="mt-10 overflow-hidden rounded-lg bg-white ring-1 ring-line">
                <SecteurMap className="h-[320px] sm:h-[440px]" />
              </div>
            </div>

            <div>
              <p className="max-w-2xl text-[19px] leading-[1.6] text-ink sm:text-[21px]">
                L&apos;ostéopathe animalier peut échanger avec votre vétérinaire traitant, avec votre
                accord, afin de favoriser une prise en charge cohérente et de lui transmettre ses
                observations.
              </p>
              <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body">
                Chaque animal étant unique, un échange permettra d&apos;évaluer la situation, de
                répondre à vos questions et de vous orienter vers la démarche la plus appropriée pour
                votre compagnon.
              </p>
              <div className="mt-9">
                <Button href={cheminLocalise(routes.contact, locale)}>{d.commun.prendreRdv}</Button>
              </div>

              <div className="mt-12 border-t border-line pt-10">
                <p className="eyebrow text-green">{c.secteur.surTitre}</p>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body">
                  {c.secteur.intro}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {c.departements.map((d) => (
                    <li
                      key={d.code}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] text-body ring-1 ring-line"
                    >
                      <span className="font-semibold text-plum">{d.code}</span>
                      {d.nom}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  {c.secteur.complement}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Aiguillage vers les trois pages d'espèces. La section ferme la page :
          on y arrive après avoir lu ce qui vaut pour toutes les espèces, et elle
          renvoie vers le détail propre à chacune. */}
      <Section id="especes" tone="surface">
        <Container width="full">
          <Eyebrow>{d.commun.sommaire}</Eyebrow>
          <SectionTitle className="mt-5 max-w-3xl">{c.sommaireTitre}</SectionTitle>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.sommaire.map((s, i) => (
              <li key={liensEspeces[i].href} className="flex">
                <Link
                  href={liensEspeces[i].href}
                  className="card card-hover group/media flex w-full flex-col overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={photosSommaire[i]}
                      alt=""
                      aria-hidden="true"
                      width={1024}
                      height={768}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="img-zoom aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[19px] leading-snug text-ink">{s.label}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.detail}</p>
                    <span className="arrow-link mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-plum">
                      {d.commun.voirSection}
                      <svg
                        width="15"
                        height="15"
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
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Testimonials
        items={avis.slice(0, 3)}
        profile={googleAvis}
        title={d.avis.titre}
        libelles={{ avisGoogle: d.avis.avisGoogle, lireTous: d.avis.lireTous }}
        locale={localeTags[locale]}
      />

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title={d.accueil.cta}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.contact, locale) }}
      />
    </>
  );
}

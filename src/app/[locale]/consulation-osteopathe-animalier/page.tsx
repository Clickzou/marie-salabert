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
import { CarrouselPhotos } from "@/components/CarrouselPhotos";
import SecteurMap from "@/components/SecteurMap";

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


/**
 * Carrousel de la section « Deroulement d'une consultation en 6 etapes »,
 * arrive de l'accueil avec elle.
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
    src: "/images/2025/05/osteopathie-chien-02.jpg",
    largeur: 1440,
    hauteur: 963,
    alt: "Marie Salabert travaille le dos d'un berger allemand assis dans l'herbe.",
  },
  {
    src: "/images/2025/05/osteopathie-chat-05.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert porte un chat siamois contre elle avant une séance.",
  },
  {
    src: "/images/2025/05/osteopathie-cheval-02.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert mobilise la tête d'un cheval bai dans une écurie.",
  },
  {
    src: "/images/2025/05/osteopathie-cheval-03.jpg",
    largeur: 1440,
    hauteur: 961,
    alt: "Marie Salabert soutient l'encolure d'un poney brun dans un pré fleuri.",
  },
  {
    src: "/images/2025/05/osteopathie-cheval-04.jpg",
    largeur: 1488,
    hauteur: 1304,
    alt: "Marie Salabert mobilise l'antérieur d'un cheval bai, au pré.",
  },
  {
    src: "/images/2025/05/osteopathie-cheval-24.jpg",
    largeur: 2000,
    hauteur: 1500,
    alt: "Marie Salabert examine le dos d'un cheval bai en extérieur, au pré.",
  },
] as const;

/** Visuels de l'aiguillage vers les pages d'especes, dans l'ordre du dictionnaire. */
const photosSommaire = [
  "/images/2025/05/osteopathie-cheval-12.jpg",
  "/images/2025/05/osteopathie-chien-11.jpg",
  // photo de terrain, en bouverie, a la place de l'image d'illustration
  "/images/2025/05/osteopathie-animaux-elevage-01.avif",
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
function PointTitre({
  numero,
  centre,
  children,
}: {
  numero: string;
  /** Centre le numero et l'intitule, quand le point chapeaute un bloc centre. */
  centre?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-baseline gap-4 border-t-2 border-plum/20 pt-5 ${
        centre ? "justify-center text-center" : ""
      }`}
    >
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

/**
 * Les quatre titres principaux de la page.
 *
 * Bordeaux, gras, 44 px en capitales : aucun autre titre de la page ne reunit
 * ces trois attributs. C'est ce qui les detache des intitules de points, plus
 * petits et en noir. Leur largeur est bornee et le retour a la ligne equilibre
 * (`text-balance`) pour qu'ils tiennent sur deux lignes sur grand ecran.
 *
 * Les quatre sont places en pleine largeur, au-dessus de leur grille : deux
 * d'entre eux vivaient dans une demi-colonne avec un corps reduit, et la
 * praticienne a releve qu'ils n'etaient « pas ecrits de la meme taille ».
 */
function TitrePrincipal({ children }: { children: ReactNode }) {
  return (
    <h2 className="max-w-[1150px] text-balance font-display text-[28px] leading-[1.12] font-semibold uppercase tracking-[0.03em] text-plum sm:text-[38px]">
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
    { href: cheminLocalise(routes.equides, locale), label: d.nav.equine },
    { href: cheminLocalise(routes.compagnie, locale), label: d.nav.compagnie },
    { href: cheminLocalise(routes.rente, locale), label: d.nav.rurale },
  ];

  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathe-animalier-toulouse.jpg"
        alt={c.heroAlt}
        eyebrow={c.hero.surTitre}
        title={c.hero.titre}
        subtitle={c.hero.sousTitre}
      />

      {/* Déroulement d'une consultation en 6 étapes : déplacé depuis la fin de
          l'accueil, en tête de page, à la demande de la praticienne. Fond gris :
          il se détache ainsi de la suite, qui reprend sur fond blanc. */}
      <Section tone="surface">
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">{c.etapes.surTitre}</Eyebrow>
            <SectionTitle className="mt-4">{c.etapes.titre}</SectionTitle>
          </Reveal>

          {/* Grille editoriale pleine largeur : chiffre fantome, filet fin, pas de carte */}
          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
            {c.etapes.liste.map((e, i) => (
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
            la largeur de l'ecran. Les cliches viennent de la galerie. */}
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

      {/* Pas de sommaire flottant ici : la page se termine par les trois cartes
          d'aiguillage, qui remplissent le meme role en plus lisible. Le menu
          lateral reste sur les pages d'especes, ou il sert a passer de l'une a
          l'autre sans revenir en arriere. */}

      {/* Le titre qui coiffait l'ensemble a ete retire : la banniere le porte
          desormais, l'afficher deux fois de suite n'apprenait rien. Les parties
          A a D s'enchainent donc directement sous la banniere. */}
      <Section id="general" className={ANCHOR}>
        <Container width="full">
          {/* Titre des points 1 a 3, demande par la praticienne : il separe le
              deroulement d'une seance, valable pour tous, des cas de consultation. */}
          <TitrePrincipal>{c.typesTitre}</TitrePrincipal>

          {/* Point 1, centre : il annonce la frise qui suit, elle-meme etalee
              sur toute la largeur. Le calage a gauche le laissait pendre d'un
              cote alors qu'il chapeaute l'ensemble. */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <PointTitre numero="01" centre>
              {c.general.titre}
            </PointTitre>
            <p className="mt-6 text-[15px] leading-relaxed text-body">{c.general.intro}</p>
          </div>

        </Container>

        {/* Frise horizontale : les cinq etapes restent sur une seule ligne, reliees
            par un filet ; la piste defile lateralement sur petits ecrans. */}
        <Container width="full">
          {/* La frise s'anime a l'arrivee : pastille 1 qui se remplit, filet qui se
              trace, puis pastille 2, etc. */}
          <Reveal className="frise no-scrollbar mt-16 overflow-x-auto pb-4">
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
      <Section tone="surface">
        <Container width="full">
          {/* Cote a cote : les deux listes se lisent en parallele plutot que
              l'une sous l'autre, et la page y gagne une pleine hauteur d'ecran.
              `items-start` : la carte la plus courte n'est pas etiree. */}
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
            {[
              {
                numero: "02",
                titre: c.motifs.titre,
                note: c.motifs.locomoteursNote,
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
              <div key={point.numero}>
                <PointTitre numero={point.numero}>{point.titre}</PointTitre>
                {point.note && (
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{point.note}</p>
                )}
                <div className="mt-8 rounded-lg bg-white p-7 ring-1 ring-line sm:p-9">
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
          </div>
        </Container>
      </Section>

      {/* ================= B ================= */}
      <Section>
        <Container width="full">
          {/* Photo a droite : la colonne de texte laissait la moitie droite de
              l'ecran vide sur cette section, la seule sans visuel. Le titre
              coiffe les deux colonnes ; `items-center` cale le texte a
              mi-hauteur de la photo. */}
          <TitrePrincipal>{c.motifs.premiereIntentionTitre}</TitrePrincipal>
          <p className="mt-6 max-w-3xl text-[18px] leading-[1.6] font-medium text-ink">
            {c.motifs.premiereIntentionChapo}
          </p>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[16px] leading-[1.7] text-body">
                {c.motifs.premiereIntentionTexte1}
              </p>
              <CheckList items={L.premiereIntention} className="mt-7" />
              <p className="mt-7 text-[16px] leading-[1.7] text-body">
                {c.motifs.premiereIntentionTexte2}
              </p>
            </div>

            {/* Colonnes de largeur egale : la photo occupe toute sa moitie et
                s'etire sur la hauteur du texte, plutot que de flotter dans une
                colonne plus etroite. */}
            <figure className="group/media overflow-hidden rounded-lg">
              <Image
                src="/images/2025/05/osteopathie-chien-02.jpg"
                alt={c.motifs.photoAlt}
                width={1440}
                height={963}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-zoom aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        </Container>
      </Section>

      {/* Affections chroniques — pleine largeur, marge de 100 px.
          L'identifiant ne sert pas d'ancre de navigation : il marque le point a
          partir duquel le sommaire flottant apparait. */}
      <Section id="chroniques" tone="surface">
        <Container width="full">
          {/* Titre hors de la grille : dans une demi-colonne il partait sur
              trois lignes, alors que les autres en tiennent deux. */}
          <TitrePrincipal>{c.chroniques.titre}</TitrePrincipal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
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
              {/* Texte du dictionnaire, coupe autour de la locution mise en gras :
                  il etait ecrit en dur, donc en francais dans les trois langues. */}
              <p className="text-[16px] leading-[1.7] text-body">
                {c.chroniques.avertissement.split(c.chroniques.avertissementFort)[0]}
                <strong className="text-ink">{c.chroniques.avertissementFort}</strong>
                {c.chroniques.avertissement.split(c.chroniques.avertissementFort).slice(1).join(c.chroniques.avertissementFort)}
              </p>
            </div>
          </div>

          {/* deux cartes : pastille d'icone, titre, note puis liste */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                titre: c.chroniques.ameliorationTitre,
                note: c.chroniques.ameliorationNote,
                items: L.chroniquesAmelioration,
                icone: "M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.33 6C19 16.65 12 21 12 21z",
                couleur: "text-plum",
                fond: "bg-plum/8 ring-plum/15",
              },
              {
                titre: c.chroniques.confortTitre,
                note: c.chroniques.confortNote,
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
      <Section>
        <Container width="full">
          {/* Titre au-dessus des deux colonnes, comme les trois autres titres
              principaux. Sur-titre retire : aucun d'eux n'en porte. */}
          <div className="border-t border-line pt-14">
            <TitrePrincipal>{c.collaboration.titre}</TitrePrincipal>
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="overflow-hidden rounded-lg bg-white ring-1 ring-line">
                <SecteurMap
                  className="h-[320px] sm:h-[440px]"
                  legende={{
                    reguliers: d.accueil.lieux.legendeReguliers,
                    ponctuels: d.accueil.lieux.legendePonctuels,
                  }}
                />
              </div>
            </div>

            <div>
              {/* Meme corps que le texte des parties 1 a 3 : le premier
                  paragraphe, en 21px noir, faisait croire a une autre police. */}
              <p className="max-w-2xl text-[16px] leading-[1.7] text-body">
                {c.collaboration.texte1}
              </p>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-body">
                {c.collaboration.texte2}
              </p>
              <div className="mt-9">
                <Button href={cheminLocalise(routes.rendezVous, locale)}>{d.commun.prendreRdv}</Button>
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
          {/* Sur-titre « Sommaire » retire : le titre dit deja de quoi il
              s'agit, et cette section n'est plus un sommaire mais un
              aiguillage en fin de page. */}
          <SectionTitle className="mx-auto max-w-3xl text-center">{c.sommaireTitre}</SectionTitle>
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
        fond="white"
      />

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title={d.accueil.cta}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.rendezVous, locale) }}
      />
    </>
  );
}

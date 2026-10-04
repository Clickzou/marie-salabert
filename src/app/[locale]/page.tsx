import type { Metadata } from "next";
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
import { Approches } from "@/components/Approches";
import { Diaporama } from "@/components/Diaporama";
import { photosParcours } from "@/content/photos";
import { CartesPublics } from "@/components/CartesPublics";

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

/** Visuels des trois publics, dans l'ordre du dictionnaire. */
const photosPublics = [
  "/images/2025/05/osteopathie-chien-11.jpg",
  "/images/2025/05/osteopathie-cheval-12.jpg",
  // meme photo de terrain que la carte « Animaux de rente » des consultations
  "/images/2025/05/osteopathie-animaux-elevage-01.avif",
];

/**
 * Photos des six approches, dans l'ordre du dictionnaire, choisies par la
 * praticienne (retour V2). Leurs textes alternatifs sont dans `photosAlt`.
 */
const photosApproches = (
  [
    ["musculosquelettique", 4],
    ["tissulaire", 4],
    ["fasciale", 4],
    ["viscerale", 4],
    ["reflexe", 3],
    ["cranienne", 4],
  ] as const
).map(([nom, nombre]) =>
  Array.from({ length: nombre }, (_, i) => `/images/2026/10/approches/approche-${nom}-${i + 1}.jpg`),
);

/** Photos des tournees en Guyane, fournies par la praticienne (retour V2). */
const photosGuyane = [
  "/images/2026/10/guyane-osteopathie-1.jpg",
  "/images/2026/10/guyane-osteopathie-2.jpg",
];

/** Drapeau italien en SVG : net a toutes les tailles, sans fichier image. */
function DrapeauItalien({ titre }: { titre: string }) {
  return (
    <svg
      viewBox="0 0 3 2"
      width="30"
      height="20"
      role="img"
      aria-label={titre}
      className="shrink-0 rounded-[3px] ring-1 ring-ink/10"
    >
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

/* Numero de la clinique du Val Dadou. Il est isole du libelle traduit pour
   pouvoir en faire un lien `tel:` sans le dupliquer dans chaque langue. */
const CLINIQUE_TEL = "05 63 34 51 52";

/**
 * Paragraphes du parcours visibles d'emblée ; la suite est repliée.
 *
 * La coupe tombe après l'engagement associatif, avant le détail des mandats :
 * les quatre premiers paragraphes disent qui elle est et où elle exerce, les
 * suivants entrent dans le détail d'un parcours institutionnel. Le découpage
 * est le même dans les trois langues, les dictionnaires ayant été scindés au
 * même endroit.
 */
const PARCOURS_VISIBLE = 4;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const a = d.accueil;

  return (
    <>
      <PageHero
        images={photosHero}
        alt={a.heroAlts}
        title={a.meta.titreHero}
        subtitle={a.heroSousTitre}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.rendezVous, locale) }}
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
            <Reveal>
              {/* Le motif decoratif deborde du portrait : il est ancre a
                  l'image, et non a la colonne, sinon il descendrait se placer
                  derriere le bouton ajoute dessous. */}
              <div className="relative">
                {/* Photos qui defilent, choisies par la praticienne */}
                <Diaporama
                  photos={photosParcours.map((src, i) => ({ src, alt: a.parcours.photosAlt[i] }))}
                  libelle={d.commun.choisirPhoto}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="relative z-10 aspect-square w-full"
                />
                <Image
                  src="/images/2023/05/square-pattern.png"
                  alt=""
                  aria-hidden="true"
                  width={154}
                  height={155}
                  className="pointer-events-none absolute -bottom-10 -left-8 hidden w-[154px] select-none lg:block"
                />
              </div>

              {/* « Pour en savoir plus » accompagne desormais le portrait : il
                  quitte la colonne de texte, ou il entrait en concurrence avec
                  la commande de depliage. La marge haute degage le motif, qui
                  deborde de 40 px sous l'image. */}
              <Button
                href={cheminLocalise(routes.news, locale)}
                variant="outline"
                className="mt-10 lg:mt-16"
              >
                {a.parcours.enSavoirPlus}
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{a.parcours.surTitre}</Eyebrow>
              <SectionTitle className="mt-4">{a.parcours.titre}</SectionTitle>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-body">
                {a.parcours.paragraphes.slice(0, PARCOURS_VISIBLE).map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>

              {/* Repli natif : le texte masque reste dans le document — il est
                  donc indexe et trouvable par la recherche du navigateur — et
                  l'ouverture ne demande aucun JavaScript. */}
              <details className="disclosure mt-3">
                <summary className="inline-flex items-center gap-2 py-2 text-[14.5px] font-medium text-plum">
                  <span className="when-closed">{d.commun.lireSuite}</span>
                  <span className="when-open">{d.commun.reduire}</span>
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
                    className="chevron"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="mt-2 space-y-4 text-[16px] leading-relaxed text-body">
                  {a.parcours.paragraphes.slice(PARCOURS_VISIBLE).map((par) => (
                    <p key={par.slice(0, 40)}>{par}</p>
                  ))}
                </div>
              </details>
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

          {/* Trois cartes illustrees : la photo porte la carte, les listes
              longues sont repliees au-dela de trois lignes. Sur ordinateur les
              trois s'ouvrent d'un seul clic — voir le composant. */}
          <CartesPublics
            items={a.pourQui.liste}
            photos={photosPublics}
            libelles={{ voirAutres: a.pourQui.voirAutres, reduire: a.pourQui.reduire }}
          />

          <Reveal className="mt-12 text-center">
            <Button href={cheminLocalise(routes.rendezVous, locale)}>{d.commun.prendreRdv}</Button>
          </Reveal>
        </Container>
      </Section>

      {/* Les 6 approches : deplacees depuis la page A propos a la demande de
          la praticienne, juste apres les champs d'intervention. Pleine
          largeur d'ecran, comme la section precedente. */}
      <Section>
        <Container width="full">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{a.approches.surTitre}</Eyebrow>
            <SectionTitle className="mt-5">{a.approches.titre}</SectionTitle>
          </Reveal>
          <Approches
            items={a.approches.liste.map((approche, i) => ({
              title: approche.titre,
              photos: photosApproches[i].map((src, j) => ({ src, alt: approche.photosAlt[j] })),
              body: (
                <>
                  {approche.paragraphes.map((par) => (
                    <p key={par.slice(0, 40)}>{par}</p>
                  ))}
                </>
              ),
            }))}
            libelles={{
              faitesDefiler: d.commun.faitesDefiler,
              precedente: a.approches.precedente,
              suivante: a.approches.suivante,
            }}
          />
        </Container>
      </Section>

      {/* Comment prendre rendez-vous. Les fonds alternent blanc et gris d'une
          section a l'autre : depuis l'arrivee des approches (blanc), celle-ci
          passe en gris et les lieux en blanc. */}
      <Section tone="surface">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-20">
            <Reveal className="group/media mx-auto overflow-hidden rounded-full">
              <Image
                src="/images/2026/10/logo-rond-marie-salabert.jpg"
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
              {/* Les deux numeros ont le meme poids : ce sont deux entrees
                  equivalentes, c'est l'intitule qui les distingue. */}
              <ul className="mt-7 space-y-3">
                {[
                  { label: d.commun.joindreOsteopathe, numero: site.phone, href: site.phoneHref },
                  {
                    label: d.commun.numeroSecretariat,
                    numero: site.secretariat,
                    href: `tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`,
                  },
                ].map((ligne) => (
                  <li key={ligne.numero} className="text-[16px] leading-relaxed text-body">
                    {ligne.label} :{" "}
                    <a
                      href={ligne.href}
                      className="text-[20px] font-semibold text-green transition-colors hover:text-green-light"
                    >
                      {ligne.numero}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-body">
                <p>{a.rendezVous.tarif}</p>
                <p className="font-medium text-ink">{a.rendezVous.paiement}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Les lieux de consultation */}
      <Section>
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
                {/* Les rendez-vous a la clinique ne passent pas par le
                    secretariat : le numero doit etre appelable au doigt. */}
                <p className="mt-2 text-[16px] leading-relaxed text-body">
                  {a.lieux.cliniqueContact.replace(CLINIQUE_TEL, "").trimEnd()}{" "}
                  <a
                    href={`tel:+33${CLINIQUE_TEL.replace(/\s/g, "").slice(1)}`}
                    className="font-semibold text-green transition-colors hover:text-green-light"
                  >
                    {CLINIQUE_TEL}
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="overflow-hidden rounded-lg ring-1 ring-ink/10 [&_iframe]:block">
                <SecteurMap
                  className="h-[340px] sm:h-[460px]"
                  legende={{
                    reguliers: a.lieux.legendeReguliers,
                    ponctuels: a.lieux.legendePonctuels,
                  }}
                />
              </div>
              {/* Precision demandee par la praticienne : la carte n'est pas
                  une liste fermee de communes. */}
              <p className="mt-4 text-[14.5px] italic leading-relaxed text-muted">
                {a.lieux.carteNote}
              </p>
            </Reveal>
          </div>

          {/* Deplacements lointains : deux cartes de meme facture, cote a cote
              sur grand ecran. `items-start` et non `items-stretch` : la carte
              italienne est bien plus courte, l'etirer creuserait un vide. */}
          <div className="mt-14 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal className="overflow-hidden rounded-lg border border-plum/15 bg-white">
              {/* Photos de tournee fournies par la praticienne */}
              <div className="grid grid-cols-2 gap-1">
                {photosGuyane.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={a.lieux.guyaneAlts[i]}
                    width={900}
                    height={1200}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="aspect-[4/3] w-full object-cover object-[50%_40%]"
                  />
                ))}
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="text-[21px] leading-snug text-plum">{a.lieux.guyaneTitre}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">{a.lieux.guyaneTexte}</p>
                <CheckList className="mt-5" items={a.lieux.guyaneLieux} />
              </div>
            </Reveal>

            <Reveal delay={140} className="rounded-lg border border-plum/15 bg-white p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-[21px] leading-snug text-plum">
                <DrapeauItalien titre={a.lieux.italieDrapeau} />
                {a.lieux.italieTitre}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-body">{a.lieux.italieTexte}</p>
              <CheckList className="mt-5" items={a.lieux.italieVilles} />
            </Reveal>
          </div>

          {/* Mise au point sur la disponibilite : elle vaut pour les deux
              destinations, elle est donc placee sous la paire et non dans l'une
              des cartes. */}
          <Reveal delay={200} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-[17px] italic leading-relaxed text-body sm:text-[18px]">
              {a.lieux.tourneesNote}
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title={a.cta}
        cta={{ label: d.commun.prendreRdv, href: cheminLocalise(routes.rendezVous, locale) }}
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
            <Button href={cheminLocalise(routes.rendezVous, locale)} variant="gold">
              {d.commun.reserverSeance}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
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

const CLINIQUE_VAL_DADOU_TEL = "05.63.34.51.52";
const CLINIQUE_VAL_DADOU_HREF = "tel:+33563345152";

/** Ancres et visuels du sommaire, dans l'ordre du dictionnaire. */
const ancresSommaire = ["#equides", "#compagnie", "#rente"];
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

/** Numero + intitule en tete de chaque bandeau d'espece. */
function NumeroSection({ numero, label }: { numero: string; label: string }) {
  return (
    <p className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-[15px] font-semibold text-white"
      >
        {numero}
      </span>
      <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
        {label}
      </span>
    </p>
  );
}

/** Lien de retour au sommaire, en fin de section d'espece. */
function RetourSommaire({ libelle }: { libelle: string }) {
  return (
    <p className="mt-14 border-t border-line pt-8">
      <a
        href="#sommaire"
        className="group inline-flex items-center gap-2 text-[14px] font-medium text-plum"
      >
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
          className="transition-transform duration-500 group-hover:-translate-y-1"
        >
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
        {libelle}
      </a>
    </p>
  );
}

/** Titre de sous-partie (h3) sobre, avec filet prune. */
function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-[22px] leading-tight font-semibold text-plum sm:text-[26px]">
      {children}
    </h3>
  );
}

/** Carte sobre a bordure legere regroupant une liste de motifs. */
function MotifCard({
  title,
  items,
  note,
  className,
}: {
  title: string;
  items: readonly string[];
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg border border-black/8 bg-white p-6 sm:p-8 ${className ?? ""}`}
    >
      <SubHeading>{title}</SubHeading>
      {note && <p className="mt-2 text-[14px] leading-relaxed text-muted italic">{note}</p>}
      <CheckList items={items} className="mt-5" />
    </div>
  );
}

/** Bloc « Une approche globale » : intro + liste des partenaires de soin. */
function ApprocheGlobale({
  title,
  intro,
  items,
  conclusion,
}: {
  title: string;
  intro: string;
  items: readonly string[];
  conclusion: string;
}) {
  return (
    <div className="rounded-lg border border-plum/15 bg-plum-soft/10 p-6 sm:p-9">
      <SubHeading>{title}</SubHeading>
      <p className="mt-4 text-[15px] leading-relaxed text-body">{intro}</p>
      <CheckList items={items} className="mt-5 sm:columns-2 sm:gap-x-10 [&>li]:mb-3" />
      <p className="mt-6 text-[15px] leading-relaxed text-body">{conclusion}</p>
    </div>
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

  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathe-animalier-toulouse.jpg"
        eyebrow={c.hero.surTitre}
        title={c.hero.titre}
        subtitle={c.hero.sousTitre}
      />

      {/* Sommaire flottant a droite, cale au milieu de l'ecran (desktop). Il
          n'apparait qu'a partir de la quatrieme section (`#chroniques`), le
          temps que le lecteur ait parcouru l'introduction ; les trois familles
          d'animaux qu'il annonce viennent juste apres. */}
      <SommaireFlottant
        declencheur="#chroniques"
        liens={[
          { href: "#equides", label: "Équidés" },
          { href: "#compagnie", label: "Chiens · Chats · NAC" },
          { href: "#rente", label: "Animaux de rente" },
        ]}
      />

      {/* Sommaire illustre : oriente d'emblee vers la bonne famille d'animaux.
          Il remplace l'ancienne barre d'ancres collante, redondante avec lui. */}
      <Section id="sommaire" tone="surface" className={ANCHOR}>
        <Container width="full">
          <Eyebrow>{d.commun.sommaire}</Eyebrow>
          <SectionTitle className="mt-5 max-w-3xl">
            {c.sommaireTitre}
          </SectionTitle>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.sommaire.map((s, i) => (
              <li key={ancresSommaire[i]} className="flex">
                <a
                  href={ancresSommaire[i]}
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
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ================= GÉNÉRAL ================= */}
      <Section id="general" className={ANCHOR}>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{c.general.surTitre}</Eyebrow>
            <SectionTitle className="mt-3">
              {c.general.titre}
            </SectionTitle>
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

      {/* Motifs de consultation fréquents : deux colonnes separees par un filet,
          sans encadrement, pour alleger la page. */}
      <Section tone="surface">
        <Container width="full">
          <SectionTitle className="mx-auto max-w-3xl text-center">
            {c.motifs.titre}
          </SectionTitle>

          {/* deux cartes larges, avec pastille d'icone */}
          <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                titre: c.motifs.locomoteurs,
                note: null,
                items: L.troublesLocomoteurs,
                icone: "M4 18l4-6 3 3 3-5 6 8",
                fond: "bg-plum/8 ring-plum/15",
                couleur: "text-plum",
              },
              {
                titre: c.motifs.emotionnel,
                note: c.motifs.emotionnelNote,
                items: L.accompagnementEmotionnel,
                icone: "M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.33 6C19 16.65 12 21 12 21z",
                fond: "bg-green/8 ring-green/15",
                couleur: "text-green",
              },
            ].map((c) => (
              <div key={c.titre} className="card card-hover flex h-full flex-col p-9 sm:p-12">
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
                <h3 className="mt-6 text-[22px] leading-snug text-ink">{c.titre}</h3>
                {c.note && <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.note}</p>}
                <span aria-hidden="true" className="mt-6 block h-px w-full bg-line" />
                <CheckList items={c.items} className="mt-6" />
              </div>
            ))}
          </div>

          {/* Première intention selon l'état de l'animal */}
          <div className="mt-16 rounded-lg bg-white p-8 ring-1 ring-line sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h3 className="text-[21px] leading-snug text-ink">
                  {c.motifs.premiereIntentionTitre}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-body">
                  L&apos;ostéopathie animale peut agir en première intention seulement en fonction de
                  l&apos;état de l&apos;animal : un échange téléphonique approfondi vous permettra de
                  vous en assurer ; sinon vous serez réorienté vers votre vétérinaire.
                </p>
                <p className="mt-4 text-[16px] leading-[1.7] text-body">
                  Ces mêmes motifs peuvent être également traités par une séance d&apos;ostéopathie
                  après une visite chez votre vétérinaire. En cas de doute, une évaluation préalable
                  de la douleur est nécessaire pour réaliser la séance dans les meilleures
                  conditions.
                </p>
              </div>
              <CheckList items={L.premiereIntention} className="lg:pt-1" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Affections chroniques — pleine largeur, marge de 100 px.
          L'identifiant ne sert pas d'ancre de navigation : il marque le point a
          partir duquel le sommaire flottant apparait. */}
      <Section id="chroniques">
        <Container width="full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <SectionTitle>{c.chroniques.titre}</SectionTitle>
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
              <SectionTitle className="mt-5 max-w-xl">
                {c.collaboration.titre}
              </SectionTitle>
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

      {/* ================= ÉQUIDÉS ================= */}
      <Section id="equides" tone="plum" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[440px]">
            <Image
              src="/images/2025/05/osteopathe-animaliere-toulouse.jpg"
              alt="Marie Salabert mobilisant le postérieur d'un cheval en écurie"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
            <NumeroSection numero="01" label={c.equides.numero} />
            <h2 className="uppercase mt-3 font-display text-[32px] leading-[1.1] font-light text-white sm:text-[42px] tracking-[0.05em]">
              {c.equides.titre}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">
              L&apos;ostéopathie équine occupe aujourd&apos;hui une place importante dans le suivi
              global des chevaux. De nombreux propriétaires intègrent une ou plusieurs consultations
              annuelles dans la gestion du bien-être et du confort de leur équidé, en fonction de son
              âge, de son activité, de son mode de vie et de ses besoins.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          <div className="max-w-3xl">
            <p className="text-[16.5px] leading-[1.7] text-body">
              Au-delà des motifs de consultation communs à toutes les espèces, l&apos;ostéopathie
              peut accompagner le cheval dans différentes étapes de sa vie, notamment :
            </p>
            <CheckList items={L.equinEtapes} className="mt-5" />
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathie s&apos;adresse à tous les équidés : chevaux de sport, chevaux de
              loisir, chevaux de spectacle, chevaux de travail, chevaux âgés, poulains, ânes et
              mules.
            </p>
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
              intro="La santé et le bien-être du cheval reposent sur une prise en charge globale associant plusieurs compétences complémentaires. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={L.equinApprocheGlobale}
              conclusion="L'objectif est de favoriser une prise en charge cohérente, respectueuse et adaptée aux besoins individuels de chaque cheval."
            />
          </div>

          <RetourSommaire libelle={d.commun.revenirSommaire} />
        </Container>
      </Section>

      {/* ================= CHIENS · CHATS · NAC ================= */}
      <Section id="compagnie" tone="green" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:px-14">
            <NumeroSection numero="02" label={c.compagnie.numero} />
            <h2 className="uppercase mt-3 font-display text-[30px] leading-[1.12] font-light text-white sm:text-[40px] tracking-[0.05em]">
              Ostéopathie canine, féline et pour les nouveaux animaux de compagnie (NAC)
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">
              Après s&apos;être largement développée dans le milieu équin, l&apos;ostéopathie animale
              occupe aujourd&apos;hui une place grandissante dans le suivi des animaux de compagnie.
              Elle peut accompagner les chiens, les chats et les NAC tout au long de leur vie.
            </p>
          </div>
          <div className="order-1 grid grid-cols-2 lg:order-2">
            <div className="relative min-h-[220px] lg:min-h-[440px]">
              <Image
                src="/images/2025/05/osteopathe-chien-toulouse.jpg"
                alt="Marie Salabert avec un chien de type border collie"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[220px] lg:min-h-[440px]">
              <Image
                src="/images/2025/05/osteopathe-chat-toulouse.jpg"
                alt="Marie Salabert portant un chat noir en consultation"
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
                Les zones d&apos;intervention sont identiques à celles proposées pour les équidés :
                31, 81, 82, 47, 32, 09, 11, 12 et 46. Les consultations peuvent être réalisées à
                domicile afin de respecter les habitudes et l&apos;environnement de votre animal.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Depuis 6 ans, je consulte tous les vendredis après-midi à la clinique vétérinaire du
                Val Dadou à Graulhet (81). Pour toute prise de rendez-vous dans ce lieu, merci de
                contacter directement la clinique au{" "}
                <a href={CLINIQUE_VAL_DADOU_HREF} className="font-semibold text-green hover:underline">
                  {CLINIQUE_VAL_DADOU_TEL}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <MotifCard
              title={c.compagnie.chienTitre}
              items={L.chienMotifs}
            />
            <MotifCard title={c.compagnie.chatTitre} items={L.chatMotifs} />
          </div>

          <div className="mt-6">
            <SubHeading>
              Motifs de consultation courants chez les nouveaux animaux de compagnie (NAC)
            </SubHeading>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body">
              Les NAC nécessitent une prise en charge adaptée à leurs particularités anatomiques,
              physiologiques et comportementales. Les consultations peuvent notamment concerner :
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <MotifCard title={c.compagnie.nacGeneraux} items={L.nacMotifs} />
              <MotifCard title={c.compagnie.lapinsTitre} items={L.lapinsRongeurs} />
              <MotifCard title={c.compagnie.reptilesTitre} items={L.reptiles} />
            </div>
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title={c.compagnie.globaleTitre}
              intro="La santé et le bien-être de votre animal reposent sur une vision globale associant différentes compétences et différents facteurs essentiels. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={L.compagnieApprocheGlobale}
              conclusion="L'objectif est de proposer une prise en charge cohérente et personnalisée, en plaçant le confort, la santé et le bien-être de l'animal au centre des priorités."
            />
          </div>

          <RetourSommaire libelle={d.commun.revenirSommaire} />
        </Container>
      </Section>

      {/* ================= ANIMAUX DE RENTE ================= */}
      <Section id="rente" tone="plum" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="relative order-2 min-h-[280px] lg:order-1 lg:min-h-[440px]">
            {/* vraie photo d'un animal de ferme, faute de cliche avec des bovins
                dans la mediatheque (voir note au client) */}
            <Image
              src="/images/2025/05/IMG_5034.jpg"
              alt="Marie Salabert en consultation d'ostéopathie auprès d'un cochon sur la paille"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-2 lg:px-14">
            <NumeroSection numero="03" label={c.rente.numero} />
            <h2 className="uppercase mt-3 font-display text-[30px] leading-[1.12] font-light text-white sm:text-[40px] tracking-[0.05em]">
              {c.rente.titre}
            </h2>
            <p className="mt-3 text-[15px] text-white/70">(Vaches, Moutons, Chèvres, Porcs)</p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90">
              L&apos;ostéopathie animale en milieu rural connaît un développement progressif depuis
              les années 2000. Historiquement, les éleveurs ont toujours eu recours dans les campagnes
              à des pratiques manuelles traditionnelles pour accompagner leurs animaux lors de
              certaines difficultés fonctionnelles.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Container width="full">
          {/* encart teinte prune, en echo a la couleur de la section elevage */}
          <div className="max-w-4xl space-y-4 rounded-lg border border-plum/15 bg-plum/[0.04] p-8 text-[16.5px] leading-[1.7] text-body sm:p-10">
            <p>
              Aujourd&apos;hui, l&apos;ostéopathie animale s&apos;inscrit dans cette continuité en
              proposant une approche manuelle structurée, adaptée aux exigences actuelles du
              bien-être animal et complémentaire au suivi vétérinaire.
            </p>
            <p>
              Ayant grandi dans un environnement rural, j&apos;ai eu la chance d&apos;évoluer au
              contact de différents animaux d&apos;élevage (bovins laitiers, porcins, lapins). Cette
              proximité avec le monde agricole m&apos;a permis de comprendre les réalités du terrain
              et les enjeux quotidiens des éleveurs.
            </p>
            <p>
              À travers l&apos;ostéopathie animale, l&apos;objectif est aujourd&apos;hui de contribuer
              au confort des animaux d&apos;élevage et d&apos;accompagner les professionnels dans une
              démarche globale de bien-être animal.
            </p>
          </div>

          <div className="mt-12">
            <MotifCard
              title={c.rente.motifsTitre}
              note="L'ostéopathie animale intervient toujours en complément de la médecine vétérinaire et ne se substitue pas au diagnostic ou aux traitements prescrits par le vétérinaire. Une consultation peut notamment être envisagée lors de :"
              items={L.elevageMotifs}
              className="[&_ul]:sm:columns-2 [&_ul]:sm:gap-x-10 [&_li]:sm:mb-3"
            />
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title={c.rente.globaleTitre}
              intro="La santé et le bien-être des animaux d'élevage reposent sur une prise en charge globale associant plusieurs facteurs essentiels. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={L.elevageApprocheGlobale}
              conclusion="L'objectif est d'accompagner les éleveurs dans une démarche cohérente, respectueuse et adaptée aux besoins spécifiques de chaque animal et de chaque élevage."
            />
          </div>

          <RetourSommaire libelle={d.commun.revenirSommaire} />
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

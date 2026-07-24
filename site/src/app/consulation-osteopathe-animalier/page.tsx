import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { CheckList, CtaBand, PageHero, Testimonials } from "@/components/sections";
import { avis, googleAvis } from "@/content/avis";
import Reveal from "@/components/Reveal";
import SecteurMap from "@/components/SecteurMap";

export const metadata: Metadata = {
  title:
    "Consultations en ostéopathie animale à Toulouse - cheval, chien, chat, NAC, élevage | Marie Salabert",
  description:
    "Ostéopathie animale à Toulouse et en Occitanie : consultations pour chevaux et équidés, chiens, chats, NAC (lapins, rongeurs, reptiles) et animaux de rente (bovins, ovins, caprins, porcins). Motifs, secteurs d'intervention et approche complémentaire au suivi vétérinaire.",
  alternates: { canonical: "/consulation-osteopathe-animalier" },
};

const CLINIQUE_VAL_DADOU_TEL = "05.63.34.51.52";
const CLINIQUE_VAL_DADOU_HREF = "tel:+33563345152";

/* Marge appliquee aux cibles d'ancres : compense header (88px) + sous-nav collante. */
const ANCHOR = "scroll-mt-[150px]";

/* --------------------------------------------------------------------------
 * Donnees de contenu (recopiees a l'identique de la source de verite).
 * Le texte est stocke sous forme de chaines et rendu via des expressions JSX
 * afin de rester fidele a la ponctuation d'origine.
 * ------------------------------------------------------------------------ */

const etapesDeVie = [
  {
    label: "Pendant la croissance",
    text: "suivi des aplombs et accompagnement du développement, de la mobilité et des adaptations corporelles (1 à 3 consultations par an selon les besoins).",
  },
  {
    label: "À l'âge adulte",
    text: "suivi préventif et maintien du confort fonctionnel (en moyenne 1 consultation annuelle selon le mode de vie).",
  },
  {
    label: "Chez les animaux sportifs",
    text: "de la préparation physique, à la récupération et du suivi des échéances sportives.",
  },
  {
    label: "Chez les animaux âgés",
    text: "soutien du confort, de la mobilité et de la qualité de vie dès l'apparition des premiers signes de vieillissement.",
  },
  {
    label: "Chez les animaux en fin de vie",
    text: "accompagnement du confort et du bien-être.",
  },
] as const;

const troublesLocomoteurs = [
  "Allures irrégulières",
  "Démarche asymétrique",
  "Déplacements de biais",
  "Aplombs défectueux",
  "Raideurs musculaires",
] as const;

const accompagnementEmotionnel = [
  "Changement soudain de comportement",
  "Sensibilité accrue, inquiétude ou réactions inhabituelles",
  "Accompagnement après un événement stressant ou traumatique",
  "Adaptation lors d'un changement de vie",
  "Difficultés liées à la perte d'un congénère ou d'un membre de la famille",
] as const;

const premiereIntention = [
  "Difficultés locomotrices soudaines (dorsalgie, lombalgie)",
  "Irrégularité soudaine sans suppression d'appui",
  "Crise d'arthrose",
  "Post traumatique non lésionnel (chute, bagarre entre congénères)",
] as const;

const chroniquesAmelioration = [
  "Affections digestives (vomissements, diarrhée chroniques)",
  "Affections respiratoires (toux, asthme)",
  "Otites externes",
  "Affections cutanées (dermite, dermatite atopique, dépigmentation localisée, prurit)",
  "Mauvaise cicatrisation (post opératoire, plaies de léchage, automutilation)",
  "Certains cas d'infertilité",
  "Incontinence urinaire (en particulier pour celles suite à une stérilisation)",
] as const;

const chroniquesConfort = [
  "Dysplasie",
  "Entorses et tendinites",
  "Ostéochondrite disséquante",
  "Insuffisance rénale chronique",
  "Affections neurologiques (hernie discale, AVC, ataxie, crise d'épilepsie, embolie fibrocartilagineuse)",
  "Animaux accidentés / amputés",
  "Animaux en fin de vie (perte d'équilibre, refus de prise alimentaire)",
] as const;

const equinEtapes = [
  "l'optimisation du confort locomoteur et de la mobilité",
  "l'accompagnement du cheval sportif dans sa préparation et sa récupération",
  "la réhabilitation fonctionnelle après une période d'arrêt ou de convalescence",
  "l'équilibre fonctionnel du couple cavalier-cheval",
  "l'accompagnement des chevaux sensibles ou présentant des modifications comportementales en complément d'une prise en charge adaptée",
] as const;

const equinMotifs = [
  "Bilan ostéopathique annuel",
  "Suivi du poulain (réflexe de succion, aplombs défectueux)",
  "Préparation d'échéances sportives ou d'une saison de compétition / de course",
  "Accompagnement après un effort intense",
  "Raideurs, perte de souplesse ou difficultés dans le travail monté",
  "Aider dans le cadre d'affections neurologiques (ataxie, wobbler, harper, shivering, headshaking etc..)",
  "Modification des allures ou de la locomotion",
  "Suite à un traumatisme (chute, accident dans le van, conflit entre congénères…)",
  "Aider dans le cadre d'affections métaboliques et/ou endocriniennes (fourbure, Cushing, SME, PSSM, etc..)",
  "Accompagnement après une période de convalescence",
  "Réhabilitation lors d'un changement d'activité ou de mode de vie",
  "Suivi des juments reproductrices (fertilité, gestation, post-mise bas)",
  "Suivi des étalons reproducteurs",
  "Changements comportementaux ou perte de confiance",
  "Difficultés dans la relation cavalier-cheval",
] as const;

const equinApprocheGlobale = [
  "la médecine vétérinaire",
  "la dentisterie équine",
  "la maréchalerie et la podologie",
  "la physiothérapie et les autres thérapies complémentaires adaptées (acupuncture, shiatsu, massages)",
  "le suivi du cavalier et l'équilibre du couple cavalier-cheval",
  "un matériel de travail adapté",
  "un environnement respectant les besoins physiques et sociaux du cheval",
  "une alimentation adaptée",
  "une meilleure compréhension du comportement équin",
] as const;

const chienMotifs = [
  "Bilan ostéopathique annuel",
  "Accompagnement des chiens sportifs, de travail ou pratiquant une activité régulière",
  "Préparation aux échéances sportives et récupération après l'effort",
  "Aider dans le cadre d'affections neurologiques (épilepsie, hernie discale, embolie fibrocartilagineuse, wobbler, syndrome vestibulaire, etc..)",
  "Suite à un traumatisme (chute, accident, altercation entre congénères…)",
  "Accompagnement après un événement stressant ou traumatique",
  "Suite à un changement de vie ou une adoption",
  "Changements de comportement",
  "Difficultés de sociabilité (en complément d'un accompagnement avec un éducateur ou un comportementaliste si nécessaire)",
  "Manifestations liées au stress ou à l'inconfort, telles que des comportements d'automutilation ou un léchage excessif pouvant entraîner des zones de dépilation",
  "Suivi pendant la croissance",
  "Suivi des animaux reproducteurs (fertilité, gestation, post-mise bas)",
  "Affections locomotrices (boiteries, raideurs, compensations fonctionnelles…)",
  "Accompagnement après une intervention chirurgicale",
  "Affections digestives ou respiratoires chroniques, en complément du suivi vétérinaire",
] as const;

const chatMotifs = [
  "Bilan ostéopathique annuel",
  "Suivi pendant la croissance",
  "Suite à un traumatisme",
  "Accompagnement après une intervention chirurgicale",
  "Suite à un changement de vie ou une adoption",
  "Aider dans le cadre d'affections neurologiques (épilepsie, syndrome vestibulaire, etc)",
  "Changements de comportement (chat moins sociable, diminution des interactions, difficultés à sauter ou à se déplacer…)",
  "Manifestations liées au stress ou à l'inconfort, telles que le toilettage excessif pouvant conduire à un léchage compulsif et à des zones de perte de poils",
  "Suivi des femelles reproductrices (gestation et post-mise bas)",
  "Troubles locomoteurs",
  "Troubles digestifs ou respiratoires, en complément du suivi vétérinaire",
] as const;

const nacMotifs = [
  "Changements de comportement",
  "Troubles locomoteurs",
  "Difficultés de mobilité",
  "Aider pour les affections d'ordre digestives, en complément du suivi vétérinaire",
  "Certains troubles spécifiques comme les encéphalitozoonose, affections vestibulaires ou de tête penchée chez le lapin, après évaluation vétérinaire",
] as const;

const lapinsRongeurs = [
  "Changements de comportement",
  "Troubles locomoteurs ou difficultés de déplacement",
  "Troubles digestifs et perturbations du transit, en complément d'une prise en charge vétérinaire",
  "Accompagnement lors de troubles liés aux boules de poils (trichobézoards), en complément des recommandations vétérinaires",
  "Difficultés alimentaires ou suspicion de troubles dentaires nécessitant une évaluation vétérinaire, notamment lors d'une pousse anormale des dents ou des problématiques de malocclusion",
] as const;

const reptiles = [
  "Suites de traumatismes",
  "Changements de comportement",
  "Difficultés locomotrices",
  "Incapacité ou difficultés à s'alimenter",
  "Difficultés liées aux périodes de mue",
  "Accompagnement général du confort et de l'adaptation fonctionnelle, en complément du suivi vétérinaire spécialisé lorsque nécessaire",
] as const;

const compagnieApprocheGlobale = [
  "La médecine vétérinaire",
  "Les soins dentaires adaptés",
  "La physiothérapie et les autres approches complémentaires adaptées (acupuncture, shiatsu, massage)",
  "Le toilettage et les soins d'entretien",
  "Un équipement adapté (harnais, accessoires…)",
  "Un environnement respectant les besoins de l'animal",
  "Des interactions sociales adaptées avec ses congénères",
  "L'éducation et l'accompagnement comportemental",
  "Une alimentation adaptée",
] as const;

const elevageMotifs = [
  "Analyse fonctionnelle du troupeau afin d'identifier les situations pouvant bénéficier d'un accompagnement ostéopathique",
  "Animaux présentant des difficultés à se déplacer ou restant couchés",
  "Affections locomotrices et boiteries",
  "Suites de traumatismes",
  "Problématiques liées à la reproduction (fertilité, suivi des reproducteurs)",
  "Suivi post-mise bas ou post-vêlage",
  "Difficultés d'adaptation du nouveau-né (absence de réflexe de succion, difficultés de démarrage)",
  "Perte d'état général",
  "Baisse de production ou de rendement laitier",
] as const;

const elevageApprocheGlobale = [
  "La médecine vétérinaire",
  "Les soins de pédicurie et de dentisterie adaptés",
  "Un environnement de vie adapté aux besoins des animaux",
  "Des conditions d'élevage favorisant le confort et les comportements naturels",
  "Des interactions sociales respectant les besoins de l'espèce",
  "Un enrichissement du milieu de vie",
  "Une alimentation adaptée",
  "Des approches complémentaires pouvant contribuer au bien-être animal. (Acupuncture, phytothérapie)",
] as const;

/** Sommaire illustre place sous la banniere. */
const sommaire = [
  {
    href: "#equides",
    label: "Équidés",
    detail: "Chevaux de sport, de loisir, poulains, ânes et mules",
    image: "/images/2025/05/IMG_5249.jpg",
  },
  {
    href: "#compagnie",
    label: "Chiens · Chats · NAC",
    detail: "Croissance, sport, vieillissement et convalescence",
    image: "/images/2025/05/IMG_5516.jpg",
  },
  {
    href: "#rente",
    label: "Animaux de rente",
    detail: "Bovins, ovins, caprins et porcins, en élevage",
    image: "/images/publics/rente.jpg",
  },
] as const;

/** Departements d'intervention, code et nom, dans l'ordre du site d'origine. */
const departements = [
  { code: "31", nom: "Haute-Garonne" },
  { code: "81", nom: "Tarn" },
  { code: "82", nom: "Tarn-et-Garonne" },
  { code: "47", nom: "Lot-et-Garonne" },
  { code: "46", nom: "Lot" },
  { code: "32", nom: "Gers" },
  { code: "12", nom: "Aveyron" },
  { code: "09", nom: "Ariège" },
  { code: "11", nom: "Aude" },
] as const;

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
function RetourSommaire() {
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
        Revenir au sommaire
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

export default function ConsultationsPage() {
  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathe-animalier-toulouse.jpg"
        eyebrow="Prestations"
        title="Consultations en ostéopathie animale"
        subtitle="Chevaux, chiens, chats, NAC et animaux de rente, en Occitanie"
      />

      {/* Sommaire illustre : oriente d'emblee vers la bonne famille d'animaux.
          Il remplace l'ancienne barre d'ancres collante, redondante avec lui. */}
      <Section id="sommaire" tone="surface" className={ANCHOR}>
        <Container width="full">
          <Eyebrow>Sommaire</Eyebrow>
          <SectionTitle className="mt-5 max-w-3xl">
            Quel animal souhaitez-vous accompagner&nbsp;?
          </SectionTitle>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sommaire.map((s) => (
              <li key={s.href} className="flex">
                <a
                  href={s.href}
                  className="card card-hover group/media flex w-full flex-col overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={s.image}
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
                      Voir la section
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
            <Eyebrow>Où l&apos;ostéopathie animale peut agir</Eyebrow>
            <SectionTitle className="mt-3">
              Un accompagnement tout au long de la vie de votre animal
            </SectionTitle>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathie animale peut s&apos;intégrer dans le suivi global de votre animal à
              différents moments clés :
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
              {etapesDeVie.map((e, i) => (
                <li
                  key={e.label}
                  style={{ ["--jalon-delay" as string]: `${i * 420}ms` }}
                  className="relative w-[300px] shrink-0 pr-8 last:pr-0 lg:w-auto lg:flex-1"
                >
                  {/* filet de liaison vers l'etape suivante */}
                  {i < etapesDeVie.length - 1 && (
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
                    <p className="mt-3 pr-4 text-[15.5px] leading-relaxed text-body">{e.text}</p>
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
            Motifs de consultation fréquents
          </SectionTitle>

          {/* deux cartes larges, avec pastille d'icone */}
          <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                titre: "Troubles locomoteurs",
                note: null,
                items: troublesLocomoteurs,
                icone: "M4 18l4-6 3 3 3-5 6 8",
                fond: "bg-plum/8 ring-plum/15",
                couleur: "text-plum",
              },
              {
                titre: "Accompagnement émotionnel et comportemental",
                note: "En complément d'un suivi avec un éducateur ou un vétérinaire comportementaliste lorsque cela est nécessaire.",
                items: accompagnementEmotionnel,
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
                  En première intention, selon l&apos;état de votre animal
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
              <CheckList items={premiereIntention} className="lg:pt-1" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Affections chroniques — pleine largeur, marge de 100 px */}
      <Section>
        <Container width="full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <SectionTitle>Ostéopathie et accompagnement des affections chroniques</SectionTitle>
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
                titre: "Vers une amélioration du confort et de la qualité de vie",
                note: "Dans certaines situations, l'ostéopathie peut contribuer à améliorer totalement ou partiellement des troubles chroniques dits récidivants.",
                items: chroniquesAmelioration,
                icone: "M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.33 6C19 16.65 12 21 12 21z",
                couleur: "text-plum",
                fond: "bg-plum/8 ring-plum/15",
              },
              {
                titre: "En accompagnement de la prise en charge vétérinaire",
                note: "Troubles chroniques où la séance a pour rôle d'apporter du confort et/ou d'accompagner la prise en charge faite par votre vétérinaire.",
                items: chroniquesConfort,
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
              <Eyebrow>Avec votre vétérinaire</Eyebrow>
              <SectionTitle className="mt-5 max-w-xl">
                Une approche collaborative pour la santé de votre animal
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
                <Button href={routes.contact}>Prendre un rendez-vous</Button>
              </div>

              <div className="mt-12 border-t border-line pt-10">
                <p className="eyebrow text-green">Secteur d&apos;intervention</p>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body">
                  Interventions principales, environ 1h45 de route autour de Toulouse, sur les
                  départements suivants :
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {departements.map((d) => (
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
                  D&apos;autres départements peuvent être envisagés lors de l&apos;organisation de
                  tournées.
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
            <NumeroSection numero="01" label="Ostéopathie équine" />
            <h2 className="mt-3 font-display text-[32px] leading-[1.1] font-semibold text-white sm:text-[42px]">
              Une approche adaptée à tous les profils d&apos;équidés
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
            <CheckList items={equinEtapes} className="mt-5" />
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathie s&apos;adresse à tous les équidés : chevaux de sport, chevaux de
              loisir, chevaux de spectacle, chevaux de travail, chevaux âgés, poulains, ânes et
              mules.
            </p>
          </div>

          <div className="mt-12">
            <MotifCard
              title="Quelques motifs de consultation spécifiques aux chevaux"
              items={equinMotifs}
              className="[&_ul]:sm:columns-2 [&_ul]:sm:gap-x-10 [&_li]:sm:mb-3"
            />
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title="Une approche globale du bien-être équin"
              intro="La santé et le bien-être du cheval reposent sur une prise en charge globale associant plusieurs compétences complémentaires. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={equinApprocheGlobale}
              conclusion="L'objectif est de favoriser une prise en charge cohérente, respectueuse et adaptée aux besoins individuels de chaque cheval."
            />
          </div>

          <RetourSommaire />
        </Container>
      </Section>

      {/* ================= CHIENS · CHATS · NAC ================= */}
      <Section id="compagnie" tone="green" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:px-14">
            <NumeroSection numero="02" label="Chiens · Chats · NAC" />
            <h2 className="mt-3 font-display text-[30px] leading-[1.12] font-semibold text-white sm:text-[40px]">
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
              <p className="eyebrow text-green">Un lieu de consultation fixe</p>
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
              title="Motifs de consultation courants chez le chien"
              items={chienMotifs}
            />
            <MotifCard title="Motifs de consultation courants chez le chat" items={chatMotifs} />
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
              <MotifCard title="NAC — motifs généraux" items={nacMotifs} />
              <MotifCard title="Lapins et rongeurs" items={lapinsRongeurs} />
              <MotifCard title="Reptiles" items={reptiles} />
            </div>
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title="Une approche globale du bien-être de votre animal"
              intro="La santé et le bien-être de votre animal reposent sur une vision globale associant différentes compétences et différents facteurs essentiels. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={compagnieApprocheGlobale}
              conclusion="L'objectif est de proposer une prise en charge cohérente et personnalisée, en plaçant le confort, la santé et le bien-être de l'animal au centre des priorités."
            />
          </div>

          <RetourSommaire />
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
            <NumeroSection numero="03" label="Ostéopathie bovine, ovine, caprine et porcine" />
            <h2 className="mt-3 font-display text-[30px] leading-[1.12] font-semibold text-white sm:text-[40px]">
              Une approche complémentaire au service des élevages
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
              title="Quelques motifs de consultation courants en élevage"
              note="L'ostéopathie animale intervient toujours en complément de la médecine vétérinaire et ne se substitue pas au diagnostic ou aux traitements prescrits par le vétérinaire. Une consultation peut notamment être envisagée lors de :"
              items={elevageMotifs}
              className="[&_ul]:sm:columns-2 [&_ul]:sm:gap-x-10 [&_li]:sm:mb-3"
            />
          </div>

          <div className="mt-12">
            <ApprocheGlobale
              title="Une approche globale du bien-être des animaux d'élevage"
              intro="La santé et le bien-être des animaux d'élevage reposent sur une prise en charge globale associant plusieurs facteurs essentiels. L'ostéopathie animale s'intègre dans cette démarche aux côtés de :"
              items={elevageApprocheGlobale}
              conclusion="L'objectif est d'accompagner les éleveurs dans une démarche cohérente, respectueuse et adaptée aux besoins spécifiques de chaque animal et de chaque élevage."
            />
          </div>

          <RetourSommaire />
        </Container>
      </Section>

      <Testimonials items={avis.slice(0, 3)} profile={googleAvis} />

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title="À vos côtés pour la santé et le bien-être de votre animal"
        cta={{ label: "Prendre un rendez-vous", href: routes.contact }}
      />
    </>
  );
}

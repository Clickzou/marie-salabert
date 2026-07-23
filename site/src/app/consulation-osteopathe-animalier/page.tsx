import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { routes } from "@/lib/site";
import { Button, Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { CheckList, CtaBand, PageHero } from "@/components/sections";
import { ConsultationsNav } from "@/components/ConsultationsNav";

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

const departements = "31, 81, 82, 47, 46, 32, 12, 09 et 11";

/* --------------------------------------------------------------------------
 * Petits composants de mise en page, locaux a la page.
 * ------------------------------------------------------------------------ */

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
      className={`flex h-full flex-col rounded-2xl border border-black/8 bg-white p-6 sm:p-8 ${className ?? ""}`}
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
    <div className="rounded-2xl border border-plum/15 bg-plum-soft/10 p-6 sm:p-9">
      <SubHeading>{title}</SubHeading>
      <p className="mt-4 text-[15px] leading-relaxed text-body">{intro}</p>
      <CheckList items={items} className="mt-5 sm:columns-2 sm:gap-x-10 [&>li]:mb-3" />
      <p className="mt-6 text-[15px] leading-relaxed text-body">{conclusion}</p>
    </div>
  );
}

/** Bandeau « Secteur d'intervention » commun aux sections espèces. */
function SecteurIntervention() {
  return (
    <div className="rounded-2xl border border-black/8 bg-surface p-6 sm:p-7">
      <p className="eyebrow text-green">Secteur d&apos;intervention</p>
      <p className="mt-4 text-[15px] leading-relaxed text-body">
        Interventions principales dans les départements : {departements}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-body">
        D&apos;autres départements peuvent être envisagés lors de l&apos;organisation de tournées.
      </p>
    </div>
  );
}

/** Emplacement provisoire pour une photo non encore fournie. */
function ImagePlaceholder({ caption, className }: { caption: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-plum/25 bg-surface px-6 py-12 text-center ${className ?? ""}`}
    >
      <span className="max-w-xs text-[14px] leading-relaxed text-muted">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mx-auto mb-3 text-plum/40"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5-5L5 20" />
        </svg>
        {caption}
      </span>
    </div>
  );
}

export default function ConsultationsPage() {
  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathe-animalier-toulouse.jpg"
        title="Consultations en ostéopathie animale"
        subtitle="Chevaux, chiens, chats, NAC et animaux de rente, en Occitanie"
        height="short"
      />

      <ConsultationsNav />

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

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {etapesDeVie.map((e, i) => (
              <li
                key={e.label}
                className="flex flex-col rounded-2xl border border-black/8 bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-plum/10 text-[14px] font-semibold text-plum"
                >
                  {i + 1}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  <strong className="text-ink">{e.label} :</strong> {e.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Motifs de consultation fréquents */}
      <Section tone="surface" padding="no-top">
        <Container>
          <SectionTitle>Motifs de consultation fréquents</SectionTitle>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <MotifCard title="Troubles locomoteurs" items={troublesLocomoteurs} />
            <MotifCard
              title="Accompagnement émotionnel et comportemental"
              note="En complément d'un suivi avec un éducateur ou un vétérinaire comportementaliste lorsque cela est nécessaire."
              items={accompagnementEmotionnel}
            />
          </div>

          {/* Première intention selon l'état de l'animal */}
          <div className="mt-12 rounded-2xl border border-green/20 bg-green-soft/10 p-6 sm:p-9">
            <SubHeading>En première intention, selon l&apos;état de votre animal</SubHeading>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathie animale peut agir en première intention seulement en fonction de
              l&apos;état de l&apos;animal : un échange téléphonique approfondi vous permettra de
              vous en assurer ; sinon vous serez réorienté vers votre vétérinaire.
            </p>
            <CheckList items={premiereIntention} className="mt-6" />
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              Ces mêmes motifs peuvent être également traités par une séance d&apos;ostéopathie après
              une visite chez votre vétérinaire.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              En cas de doute, une évaluation préalable de la douleur de votre animal est nécessaire,
              pour réaliser une séance d&apos;ostéopathie dans les meilleures conditions pour votre
              animal.
            </p>
          </div>
        </Container>
      </Section>

      {/* Affections chroniques */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionTitle>Ostéopathie et accompagnement des affections chroniques</SectionTitle>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathie animale intervient en complément du suivi vétérinaire établi. Elle ne
              remplace pas le diagnostic ni les traitements prescrits par votre vétérinaire.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <MotifCard
              title="Vers une amélioration du confort et de la qualité de vie"
              note="Dans certaines situations, l'ostéopathie peut contribuer à améliorer totalement ou partiellement des troubles chroniques dits récidivants."
              items={chroniquesAmelioration}
            />
            <MotifCard
              title="En accompagnement de la prise en charge vétérinaire"
              note="Troubles chroniques où la séance a pour rôle d'apporter du confort et/ou d'accompagner la prise en charge faite par votre vétérinaire."
              items={chroniquesConfort}
            />
          </div>
        </Container>
      </Section>

      {/* Approche collaborative */}
      <Section tone="surface" padding="no-top">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-black/8 bg-white p-8 text-center sm:p-12">
            <SectionTitle>
              Une approche collaborative pour la santé et le bien-être de votre animal
            </SectionTitle>
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              L&apos;ostéopathe animalier peut échanger avec votre vétérinaire traitant avec votre
              accord afin de favoriser une prise en charge cohérente et adaptée ou de lui transmettre
              ses observations pour optimiser la continuité des soins.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Chaque animal étant unique, un échange permettra d&apos;évaluer la situation, de
              répondre à vos questions et de vous orienter vers la démarche la plus appropriée pour
              votre compagnon.
            </p>
            <div className="mt-8">
              <Button href={routes.contact}>Prendre un rendez-vous</Button>
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
            <p className="eyebrow text-gold">Ostéopathie équine</p>
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
        <Container>
          <SecteurIntervention />

          <div className="mt-12 max-w-3xl">
            <p className="text-[15px] leading-relaxed text-body">
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
        </Container>
      </Section>

      {/* ================= CHIENS · CHATS · NAC ================= */}
      <Section id="compagnie" tone="green" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-1 lg:px-14">
            <p className="eyebrow text-gold">Chiens · Chats · NAC</p>
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
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <SecteurIntervention />
            <div className="rounded-2xl border border-green/25 bg-green-soft/10 p-6 sm:p-7">
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
        </Container>
      </Section>

      {/* ================= ANIMAUX DE RENTE ================= */}
      <Section id="rente" tone="plum" className={ANCHOR} padding="none">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ImagePlaceholder
              caption="Photo à fournir : ostéopathie en élevage (bovins, ovins, caprins, porcins)"
              className="h-full min-h-[280px] rounded-none border-x-0 border-y-0 bg-plum-dark/40 text-white/70 lg:min-h-[440px]"
            />
          </div>
          <div className="order-1 flex flex-col justify-center px-6 py-14 sm:px-10 lg:order-2 lg:px-14">
            <p className="eyebrow text-gold">Ostéopathie Bovine, Ovine, Caprine et Porcine</p>
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
        <Container>
          <SecteurIntervention />

          <div className="mt-12 max-w-3xl space-y-4 text-[15px] leading-relaxed text-body">
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
        </Container>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title="À vos côtés pour la santé et le bien-être de votre animal"
        cta={{ label: "Prendre un rendez-vous", href: routes.contact }}
      />
    </>
  );
}

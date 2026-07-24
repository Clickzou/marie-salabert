import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { avis, googleAvis } from "@/content/avis";
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

export const metadata: Metadata = {
  title: "Ostéopathe animalier Toulouse - Marie Salabert",
  description:
    "Ostéopathe animalier Toulouse : ostéopathe chien, chat, NACS, chevaux (sport, loisir, élevage), âne, animaux de rente, de ferme, exotiques…",
  alternates: { canonical: "/" },
};

const publics = [
  {
    title: "Ostéopathie pour animaux de compagnie",
    subtitle: "Chiens, chats, NAC'S",
    image: "/images/2025/05/IMG_5516.jpg",
    alt: "Séance d'ostéopathie sur un berger allemand",
    items: [
      "Accompagner la croissance, le développement et le vieillissement.",
      "Optimiser la récupération après un traumatisme ou une intervention chirurgicale.",
      "Intervenir suite à un épisode de boiterie afin de restaurer un fonctionnement locomoteur optimal.",
      "Contribuer à la prise en charge globale de certaines affections chroniques ou récidivantes.",
      "Participer au suivi fonctionnel d'animaux présentant certains troubles digestifs chroniques.",
      "S'intégrer au suivi de certains troubles métaboliques.",
      "Concourir à la prise en charge des animaux reproducteurs et des problématiques associées avec les éleveurs et vétérinaires référents.",
      "Assurer le suivi des animaux sportifs.",
      "Accompagner, en complément d'une prise en charge comportementale, aux côtés de vétérinaires et d'éducateurs spécialisés.",
      "Suivre les animaux adoptés et/ou ayant un parcours de vie difficile.",
      "Favoriser le bien-être général.",
    ],
  },
  {
    title: "Ostéopathie pour les équidés",
    subtitle:
      "Pour tous types de chevaux (course, sport équestre, élevage, spectacle, loisir, trait), ânes et mules",
    image: "/images/2025/05/IMG_5249.jpg",
    alt: "Séance d'ostéopathie sur un poney au pré",
    items: [
      "Suivre le poulain pendant sa croissance et contribuer au bon développement de ses aplombs, en collaboration avec des maréchaux-ferrants et des vétérinaires.",
      "Optimiser le suivi et les performances du cheval athlète.",
      "Améliorer la locomotion, la posture et la souplesse.",
      "S'intégrer au suivi global des chevaux atteints de troubles métaboliques ou endocriniens.",
      "Adapter le suivi pour les chevaux présentant des troubles chroniques (neurologiques, cutanés, digestifs).",
      "Participer à la récupération fonctionnelle après un effort intense ou une période de convalescence.",
      "S'inscrire dans le suivi de la reproduction des équidés, en collaboration avec les haras, les éleveurs et les vétérinaires (suivi des étalons, suivi des juments : troubles de la fertilité, gestation, post-mise bas).",
      "Aider pendant les phases de transition.",
      "Contribuer au confort du cheval âgé.",
      "Collaborer, par une approche interdisciplinaire, à une prise en charge globale avec les professionnels de la santé et du bien-être animal.",
    ],
  },
  {
    title: "Ostéopathie pour animaux de rente, ferme et production animale",
    subtitle: "Bovins, Ovins, Caprins et Porcins",
    image: "/images/publics/rente.jpg",
    alt: "Main posée sur une vache dans une étable",
    items: [
      "Favoriser un développement harmonieux des jeunes animaux.",
      "S'intégrer au suivi des animaux reproducteurs (des mâles et des femelles : troubles de la fertilité, gestation, post-mise bas).",
      "Améliorer la locomotion et la posture.",
      "Agir en collaboration avec le vétérinaire lorsque l'animal perd de l'état et ne peut plus se déplacer.",
      "Participer au suivi des animaux de concours.",
      "Contribuer au bien-être des animaux et à leur adaptation aux contraintes d'élevage.",
      "Optimiser la production laitière.",
    ],
  },
] as const;

/** Nombre d'indications affichées d'emblée ; les suivantes sont repliées. */
const INDICATIONS_VISIBLES = 4;

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

const etapes = [
  {
    title: "Anamnèse — recueil des informations sur la santé de votre animal et création de votre dossier",
    paragraphs: [
      "Chaque consultation débute par un temps d'échange afin de recueillir les informations essentielles concernant votre animal et le motif de la séance en ostéopathie. Son historique médical, son mode de vie, son comportement, son alimentation, son activité, son environnement sont abordés afin d'obtenir une vision globale de sa situation.",
      "Cette étape permet à votre ostéopathe de replacer l'animal dans son contexte de vie et d'orienter l'examen clinique et ostéopathique de manière adaptée.",
      "Le dossier de votre animal est ensuite créé et sécurisé via Djooka, le carnet de santé numérique dédié aux animaux. Vous y retrouverez les comptes rendus des consultations ainsi que les factures associées.",
    ],
    link: { label: "Découvrir Djooka", href: "https://djooka.com" },
  },
  {
    title: "Examen locomoteur et statique",
    paragraphs: [
      "La consultation se poursuit par une observation dynamique et statique de votre animal.",
      "L'analyse de la locomotion permet d'évaluer la qualité des déplacements, la symétrie des allures, les amplitudes de mouvement ainsi que l'existence d'éventuelles restrictions de mobilité, compensations ou irrégularités locomotrices.",
      "L'observation statique complète cet examen en recherchant d'éventuels déséquilibres posturaux, reports de poids, attitudes antalgiques ou adaptations corporelles pouvant traduire un inconfort fonctionnel.",
    ],
  },
  {
    title: "Le diagnostic d'opportunité ou d'exclusion",
    paragraphs: [
      "Un examen palpatoire approfondi est ensuite réalisé afin de vérifier que votre animal est bien apte pour une prise en charge ostéopathique.",
      "Cette étape permet d'identifier d'éventuels signes d'alerte nécessitant une orientation préalable ou complémentaire vers votre vétérinaire. L'ostéopathie intervient toujours dans le respect de ses compétences et en complément du suivi vétérinaire lorsque celui-ci est indiqué.",
    ],
  },
  {
    title: "Le diagnostic ostéopathique",
    paragraphs: [
      "À l'aide d'un examen manuel précis, l'ostéopathe évalue la mobilité des articulations, des muscles, des fascias, des viscères, du crâne et des différents tissus de l'organisme.",
      "Cette évaluation globale permet d'identifier les restrictions de mobilité, les adaptations fonctionnelles et les compensations susceptibles de participer aux déséquilibres observés.",
      "Un bilan vous est ensuite présenté et expliqué avant la mise en œuvre du traitement ostéopathique.",
    ],
  },
  {
    title: "Le traitement ostéopathique",
    paragraphs: [
      "Le traitement repose exclusivement sur des techniques manuelles adaptées à chaque animal, à son espèce, à son âge, à son activité et au motif de consultation.",
      "L'objectif est de restaurer une mobilité tissulaire optimale, d'améliorer la qualité du mouvement, de favoriser les capacités d'adaptation de l'organisme et de contribuer au confort fonctionnel de l'animal.",
      "Ma pratique s'appuie sur différentes approches complémentaires : musculo-squelettiques, myofasciales, tissulaires, viscérales, liquidiennes, crâniennes, réflexes et tenségritives.",
    ],
  },
  {
    title: "Les conseils après séance",
    paragraphs: [
      "À l'issue de la séance, un compte rendu vous est transmis, accompagné de recommandations personnalisées, adaptées aux besoins de votre animal.",
      "Ces conseils portent notamment sur la gestion du repos, la reprise progressive de l'activité, les éventuels exercices recommandés ainsi que les points de vigilance à observer dans les jours suivant la consultation.",
      "L'objectif est de favoriser une récupération optimale et d'inscrire la prise en charge dans une démarche globale de santé et de bien-être, en collaboration avec votre vétérinaire lorsque cela est nécessaire.",
    ],
  },
] as const;

/** Departements couverts par les visites a domicile, dans l'ordre du site d'origine. */
const departements = [
  { code: "31", nom: "Haute-Garonne" },
  { code: "81", nom: "Tarn" },
  { code: "82", nom: "Tarn-et-Garonne" },
  { code: "47", nom: "Lot-et-Garonne" },
  { code: "32", nom: "Gers" },
  { code: "46", nom: "Lot" },
  { code: "09", nom: "Ariège" },
  { code: "11", nom: "Aude" },
] as const;

export default function HomePage() {
  return (
    <>
      <PageHero
        images={[
          "/images/2025/05/osteopathe-animalier-toulouse.jpg",
          "/images/2025/05/osteopathe-animaliere-toulouse.jpg",
          "/images/2025/05/osteopathe-chien-toulouse.jpg",
          "/images/2025/05/osteopathe-chat-toulouse.jpg",
        ]}
        title="Marie Salabert Ostéopathie Animale"
        subtitle={site.tagline}
        cta={{ label: "Prendre un rendez-vous", href: routes.booking }}
      />
      <CertificationBadge href={routes.certification} />

      {/* Parcours personnel */}
      <Section padding="no-top">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div className="group/media overflow-hidden rounded-lg">
                <Image
                  src="/images/2023/05/marie-salabert.jpg"
                  alt="Marie Salabert au micro lors d'une conférence sur l'ostéopathie animalière"
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
              <Eyebrow>Qui suis-je ?</Eyebrow>
              <SectionTitle className="mt-4">Parcours personnel</SectionTitle>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body">
                <p>
                  Passionnée par les animaux et les thérapies manuelles depuis toujours, je me suis
                  naturellement orientée vers des études d&apos;ostéopathie animale.
                </p>
                <p>
                  Après cinq années de formation et mon inscription au Registre National
                  d&apos;Aptitude tenu par le CNOV, je me suis installée en région toulousaine, dont
                  je suis originaire, afin d&apos;y exercer depuis 2020.
                </p>
                <p>
                  Le sport, et notamment la pratique de l&apos;athlétisme, a occupé une place
                  importante dans mon parcours. Il m&apos;a transmis des valeurs de rigueur, de
                  persévérance et de discipline qui m&apos;accompagnent aujourd&apos;hui dans ma
                  pratique professionnelle.
                </p>
                <p>
                  Soucieuse de participer à l&apos;évolution et à la reconnaissance de
                  l&apos;ostéopathie animale en France, je me suis engagée pendant plusieurs années
                  au sein d&apos;associations œuvrant pour la structuration de la profession. De 2017
                  à 2020, j&apos;ai notamment assuré la présidence de l&apos;Union Française des
                  Étudiants Ostéopathes Animaliers (UFEOA), avant de co-fonder le Collectif des
                  Ostéopathes Animaliers, au sein duquel je suis restée activement impliquée de 2020
                  à 2025. Celui-ci est devenu aujourd&apos;hui le syndicat national des
                  professionnels inscrits au RNA tenu par le CNOV.
                </p>
                <p>
                  Animée par la volonté de créer du lien entre les différents acteurs de la santé
                  animale, j&apos;ai été à l&apos;initiative de l&apos;organisation des congrès
                  SymbiOsteo en 2019 et 2022, puis j&apos;ai co-créé SymbiOsteo, le podcast en 2024.
                  Ces projets ont pour objectif de favoriser les échanges entre vétérinaires
                  pratiquant l&apos;ostéopathie, ostéopathes animaliers et ostéopathes humains, tout
                  en mettant en lumière les évolutions des pratiques, l&apos;actualité et les
                  perspectives de recherche dans ce domaine.
                </p>
                <p>
                  En 2025, j&apos;ai souhaité approfondir mes connaissances et développer une
                  approche davantage tournée vers la recherche scientifique. J&apos;ai ainsi intégré
                  le Master 2 «&nbsp;Gestion des Établissements de Formation et de Recherche en
                  Santé&nbsp;» à l&apos;Université de Haute-Alsace de Mulhouse. Cette formation a
                  conduit à ma première publication scientifique dans la revue de santé intégrative
                  Hegel : «&nbsp;Ostéopathie, chiropraxie, thérapies manuelles : analyse
                  bibliométrique (1949–2025)&nbsp;».
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="https://stm.cairn.info/revue-hegel-2026-1-page-5?lang=fr">
                  Lire l&apos;article
                </Button>
                <Button href={routes.news} variant="outline">
                  Pour en savoir plus
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
            <Eyebrow className="justify-center">Champs d&apos;intervention</Eyebrow>
            <SectionTitle className="mt-4">L&apos;ostéopathie animale, pour qui ?</SectionTitle>
            <span className="rule-center" />
          </Reveal>

          {/* Trois cartes illustrees : la photo porte la carte, les listes longues
              sont repliees au-dela de quatre lignes. */}
          <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {publics.map((p, idx) => {
              const visibles = p.items.slice(0, INDICATIONS_VISIBLES);
              const repliees = p.items.slice(INDICATIONS_VISIBLES);
              return (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={idx * 140}
                  className="card card-hover flex flex-col overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      width={1024}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="img-zoom aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 sm:p-9">
                    {/* hauteurs figees a partir de lg : les trois listes demarrent
                        alors sur la meme ligne malgre des titres de longueurs differentes */}
                    <h3 className="text-[21px] leading-snug text-plum lg:min-h-[58px]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted lg:min-h-[44px]">
                      {p.subtitle}
                    </p>
                    <span aria-hidden="true" className="mt-6 block h-px w-8 bg-gold" />

                    <ul className="mt-6 space-y-3.5">
                      {visibles.map((item) => (
                        <Indication key={item}>{item}</Indication>
                      ))}
                    </ul>

                    {repliees.length > 0 && (
                      <details className="disclosure mt-5">
                        <summary className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide text-plum transition-colors hover:text-plum-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum">
                          <span className="when-closed">
                            Voir les {repliees.length} autres indications
                          </span>
                          <span className="when-open">Réduire</span>
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
            <Button href={routes.booking}>Prendre un rendez-vous</Button>
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
                alt="Marie Salabert, ostéopathe animalier"
                width={400}
                height={400}
                className="img-zoom h-[260px] w-[260px] object-cover"
              />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Rendez-vous en ostéopathie animale</Eyebrow>
              <SectionTitle className="mt-4">Comment prendre rendez-vous ?</SectionTitle>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body">
                <p>
                  La prise de rendez-vous se fait par téléphone, en cas d&apos;indisponibilité je
                  vous invite à me laisser un SMS avec la raison de votre appel, votre adresse ainsi
                  que vos disponibilités.
                </p>
                <p>
                  Depuis janvier 2025, j&apos;ai délégué mon planning à mon assistante Anne-Sophie.
                  Elle vous recontactera dans les meilleurs délais pour répondre à vos questions et
                  planifier votre rendez-vous. Je reste cependant disponible pour échanger
                  spécifiquement sur votre animal en cas de besoin.
                </p>
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
                  Secrétariat :{" "}
                  <a
                    href={`tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`}
                    className="font-semibold text-green hover:underline"
                  >
                    {site.secretariat}
                  </a>
                </p>
              </div>
              <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-body">
                <p>
                  Le tarif des consultations dépend de votre localisation, pour connaître le montant
                  exact nous vous invitons à le demander au moment de la prise de rendez-vous.
                </p>
                <p className="font-medium text-ink">
                  Moyens de paiement acceptés : chèque, virement ou espèces.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Les lieux de consultation */}
      <Section tone="surface">
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">Secteur d&apos;intervention</Eyebrow>
            <SectionTitle className="mt-4">Les lieux de consultation</SectionTitle>
            <span className="rule-center" />
          </Reveal>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <h3 className="text-[21px] leading-snug text-plum">
                À votre domicile, en Occitanie et Nouvelle-Aquitaine
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Environ 1h45 de route autour de Toulouse, sur les huit départements suivants :
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {departements.map((d) => (
                  <li
                    key={d.code}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] text-body ring-1 ring-ink/10"
                  >
                    <span className="font-semibold text-plum">{d.code}</span>
                    {d.nom}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-ink/10 pt-8">
                <h3 className="text-[21px] leading-snug text-plum">
                  En clinique, tous les vendredis après-midi
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  Clinique vétérinaire du Val Dadou, à Graulhet (81).
                </p>
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
            <h3 className="text-[21px] leading-snug text-plum">
              Tournées en Guyane française, deux fois par an
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              Déplacement à domicile et dans les endroits suivants :
            </p>
            <CheckList
              className="mt-5"
              items={[
                "Clinique vétérinaire de l'Ouest à Saint Laurent du Maroni",
                "Salon de Toilettage la Niche du Bien être à Matoury",
                "Salon de Toilettage Louloustars à Cayenne",
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Déroulement d'une séance d'ostéopathie animale */}
      <Section>
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">Séance d&apos;ostéopathie animale</Eyebrow>
            <SectionTitle className="mt-4">
              Le déroulement d&apos;une consultation en 6 étapes
            </SectionTitle>
            <span className="rule-center" />
          </Reveal>

          {/* Grille editoriale pleine largeur : chiffre fantome, filet fin, pas de carte */}
          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
            {etapes.map((e, i) => (
              <Reveal
                as="li"
                key={e.title}
                delay={(i % 3) * 120}
                className="border-t border-ink/10 pt-7"
              >
                <span
                  aria-hidden="true"
                  className="block font-display text-[44px] font-semibold leading-none text-plum/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[20px] leading-snug text-ink">{e.title}</h3>
                <div className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-body">
                  {e.paragraphs.map((par, j) => (
                    <p key={j}>{par}</p>
                  ))}
                </div>
                {"link" in e && e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-green transition-colors hover:text-plum"
                  >
                    {e.link.label}
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

          {/* Visuel de section, hors grille : place dans une colonne il creusait un
              vide sous les etapes 02 et 03. */}
          <Reveal variant="scale" className="group/media mt-16 overflow-hidden rounded-lg">
            <Image
              src="/images/2025/05/IMG_5034.jpg"
              alt="Marie Salabert en consultation d'ostéopathie auprès d'un cochon sur la paille"
              width={1036}
              height={778}
              sizes="100vw"
              className="img-zoom h-[280px] w-full object-cover object-center sm:h-[420px]"
            />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title="À vos côtés pour la santé et le bien-être de votre animal"
        cta={{ label: "Prendre un rendez-vous", href: routes.booking }}
      />

      <Testimonials items={avis.slice(0, 3)} profile={googleAvis} />

      <Section className="py-16 text-center">
        <Container width="wide">
          <Reveal>
            <Button href={routes.booking} variant="gold">
              Réservez une séance d&apos;ostéopathie animale
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

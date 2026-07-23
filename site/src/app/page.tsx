import type { Metadata } from "next";
import Image from "next/image";
import { avis } from "@/content/avis";
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
    icon: "M4.5 9.5c0-.8.7-1.5 1.5-1.5h1l1.5-2h5l1.5 2h1c.8 0 1.5.7 1.5 1.5V15a1 1 0 01-1 1h-1v2h-2v-2H8.5v2h-2v-2h-1a1 1 0 01-1-1V9.5zM6 4l1.5 3M18 4l-1.5 3",
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
    featured: false,
  },
  {
    title: "Ostéopathie pour les équidés",
    subtitle:
      "Pour tous types de chevaux (course, sport équestre, élevage, spectacle, loisir, trait), ânes et mules",
    icon: "M4 18v-4c0-3 2-5 5-5h3l3-4 2 1-1 3 2 2v7h-2v-4l-2-1-2 2v3H9v-4l-3 2v2H4z",
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
    featured: true,
  },
  {
    title: "Ostéopathie pour animaux de rente, ferme et production animale",
    subtitle: "Bovins, Ovins, Caprins et Porcins",
    icon: "M20 6c-1.5 0-3 .5-4 1.5L13 9c-3 0-6 2-7 5l-2 4 4-1c3.5 0 7-2 8.5-5L19 9c1-1 1.5-2 1-3z",
    items: [
      "Favoriser un développement harmonieux des jeunes animaux.",
      "S'intégrer au suivi des animaux reproducteurs (des mâles et des femelles : troubles de la fertilité, gestation, post-mise bas).",
      "Améliorer la locomotion et la posture.",
      "Agir en collaboration avec le vétérinaire lorsque l'animal perd de l'état et ne peut plus se déplacer.",
      "Participer au suivi des animaux de concours.",
      "Contribuer au bien-être des animaux et à leur adaptation aux contraintes d'élevage.",
      "Optimiser la production laitière.",
    ],
    featured: false,
  },
] as const;

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

const lieux = [
  "À votre domicile sur les départements suivants (31, 81, 82, 47, 32, 46, 09 et 11)",
  "Tous les vendredis après-midi à la clinique vétérinaire du Val Dadou à Graulhet (81)",
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

      {/* L'ostéopathie animale pour qui ? */}
      <Section tone="surface" padding="no-top" className="pt-20 sm:pt-28">
        <Container width="wide">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">Champs d&apos;intervention</Eyebrow>
            <SectionTitle className="mt-4">L&apos;ostéopathie animale, pour qui ?</SectionTitle>
            <span className="rule-center" />
          </Reveal>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-8">
            {publics.map((p, idx) => (
              <Reveal
                as="li"
                key={p.title}
                delay={idx * 120}
                className={`card card-hover flex h-full flex-col p-8 text-center ${
                  p.featured ? "lg:-mt-4 lg:pb-12" : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="40"
                  height="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mx-auto text-green"
                >
                  <path d={p.icon} />
                </svg>
                <h3 className="mt-5 min-h-[64px] text-[22px] leading-tight text-plum">{p.title}</h3>
                <p className="mt-3 min-h-[60px] text-[14px] text-green">{p.subtitle}</p>
                <CheckList items={p.items} className="mt-6 text-left" />
                <div className="mt-8 pt-2">
                  <Button href={routes.booking}>Réserver</Button>
                </div>
              </Reveal>
            ))}
          </ul>
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
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {lieux.map((l, idx) => (
              <Reveal
                as="li"
                key={l}
                delay={idx * 100}
                className="rounded-lg bg-green px-6 py-6 text-center text-[15px] font-medium text-white"
              >
                {l}
              </Reveal>
            ))}
          </ul>

          <Reveal className="mx-auto mt-12 max-w-2xl text-center">
            <h3 className="text-[22px] text-plum">Tournées en Guyane Française (2 fois par an)</h3>
            <p className="mt-3 text-[15px] text-body">
              Déplacement à domicile et dans les endroits suivants :
            </p>
            <CheckList
              className="mt-5 inline-block text-left"
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

          <ol className="mx-auto mt-14 max-w-3xl space-y-10">
            {etapes.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 80} className="flex gap-6">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plum font-display text-[18px] font-semibold text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[20px] leading-snug text-ink">{e.title}</h3>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-body">
                    {e.paragraphs.map((par, j) => (
                      <p key={j}>{par}</p>
                    ))}
                  </div>
                  {"link" in e && e.link && (
                    <a
                      href={e.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[14px] font-medium text-green underline underline-offset-2 hover:text-plum"
                    >
                      {e.link.label}
                    </a>
                  )}
                  {i === 0 && (
                    <div
                      role="img"
                      aria-label="Photo d'une consultation à ajouter"
                      className="mt-5 grid h-40 place-items-center rounded-sm border border-dashed border-plum/30 bg-surface text-center text-[13px] text-muted"
                    >
                      Photo d&apos;une consultation — à fournir
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        image="/images/2025/05/a-propos-osteopathe-animalier.jpg"
        title="À vos côtés pour la santé et le bien-être de votre animal"
        cta={{ label: "Prendre un rendez-vous", href: routes.booking }}
      />

      <Testimonials items={avis.slice(0, 3)} />

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

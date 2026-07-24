import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { AProposApproches } from "@/components/AProposApproches";
import { AProposLegislation } from "@/components/AProposLegislation";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "À propos de l'ostéopathie animale - Marie Salabert Ostéopathe",
  description:
    "L'ostéopathie animale : son histoire, ses différentes approches (musculosquelettique, tissulaire, fasciale, viscérale, réflexe) et son cadre légal en France.",
  alternates: { canonical: "/osteopahie-animale" },
};

const approches = [
  {
    title: "Musculosquelettique (os, muscles, articulations, ligaments, tendons)",
    image: "/images/approches/musculosquelettique.jpg",
    alt: "Mains mobilisant l'épaule d'un chien allongé sur un tapis",
    body: (
      <p>
        Par cet aspect de l’ostéopathie nous allons travailler pour rééquilibrer la structure. Il
        peut s’agir de techniques dites structurelles, myotensives ou fonctionnelles ; dites
        directes ou indirectes.
      </p>
    ),
  },
  {
    title: "Tissulaire",
    image: "/images/approches/tissulaire.jpg",
    alt: "Mains posées à plat sur le dos d'un cheval au box",
    body: (
      <p>
        Ces techniques peuvent s’appliquer sur l’ensemble du corps. Elles visent à améliorer le
        mouvement d’une structure ciblée ou plus globalement à rendre une bonne communication
        tissulaire d’un bout à l’autre de l’organisme.
      </p>
    ),
  },
  {
    title: "Fasciale",
    image: "/images/approches/fasciale.jpg",
    alt: "Mains glissant le long du flanc d'un chien debout",
    body: (
      <>
        <p>
          Le corps est composé en grande partie de fascias, initialement décrit comme du mésoderme
          au stade embryologique. Lors du développement de l’embryon et du fœtus ce mésoderme va se
          différencier en plusieurs types de fascias : superficiels (derme - hypoderme) ;
          intermédiaires (aponévroses, séreuses et mésos splanchniques, enveloppes des différents
          vaisseaux) et profonds (périoste, tendons, dure mère).
        </p>
        <p>
          Ces dernières années les fascias font le sujet de nombreuses recherches scientifiques mais
          captivent tout autant les ostéopathes,
        </p>
      </>
    ),
  },
  {
    title: "Viscérale",
    image: "/images/approches/viscerale.jpg",
    alt: "Mains posées sur le ventre d'un chien détendu",
    body: (
      <p>
        Nous nous intéressons à la mobilité des organes et à leur attache ligamentaire. Mon mémoire
        de fin d’études porte notamment sur la pratique de l’ostéopathie sur les moyens de fixité des
        différents organes.
      </p>
    ),
  },
  {
    title: "Réflexe",
    image: "/images/approches/reflexe.jpg",
    alt: "Doigts traçant une ligne sur l'encolure d'un cheval",
    body: (
      <p>
        Les techniques réflexes permettent de travailler localement sur la peau, afin d’induire une
        action en profondeur dans l’organisme. J’apprécie particulièrement la réalisation de traits
        tirés axés sur certaines zones permettant d’avoir une action à la fois localisée et globale
        sur le système lymphatique, circulatoire et nerveux.
      </p>
    ),
  },
] as const;

export default function AProposPage() {
  return (
    <>
      <PageHero
        image="/images/2025/05/a-propos-osteopathe-animalier-toulouse.jpg"
        eyebrow="La discipline"
        title="À propos de l'ostéopathie animale"
        subtitle="Son histoire, ses approches et son cadre légal en France."
      />

      {/* Citation d'ouverture : elle porte seule, en grand, sans encadrement */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <figure>
              <blockquote>
                <p className="text-[26px] font-semibold leading-[1.25] tracking-[-0.025em] text-ink sm:text-[38px]">
                  «&nbsp;La santé est un état complet de bien-être physique, mental et social et ne
                  consiste pas seulement en une absence de maladie ou d’infirmité.&nbsp;»
                </p>
              </blockquote>
              <figcaption className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">
                Organisation mondiale de la santé
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Histoire : titre en colonne collante a gauche, recit a droite */}
      <Section tone="surface">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Une discipline reconnue</Eyebrow>
              <SectionTitle className="mt-5">Histoire de l’ostéopathie animale</SectionTitle>
              {/* La discipline s'est d'abord developpee aupres des equides : la
                  photo illustre ce point de depart. */}
              <figure className="group/media mt-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/2023/05/toulouse-ostheopathe-animaux.jpg"
                  alt="Main posée sur la tête d'un cheval, discipline née auprès des équidés"
                  width={2121}
                  height={1414}
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
              </figure>
            </Reveal>

            {/* Recit decoupe en trois epoques : le repere temporel tient la
                colonne de gauche, le texte reste a une largeur de lecture confortable */}
            <Reveal delay={120}>
              <ol className="divide-y divide-line">
                {[
                  {
                    periode: "Années 1980",
                    intitule: "Les débuts, auprès des équidés",
                    paragraphes: [
                      "L’ostéopathie animale s’est développée en France à partir des années 1980. Initialement appliquée aux équidés, elle a été adaptée par le Docteur Vétérinaire Dominique Giniaux et l’ostéopathe humain Pascal Evrard, qui ont largement contribué à son essor dans le milieu équin.",
                    ],
                  },
                  {
                    periode: "Années 2000",
                    intitule: "Animaux de compagnie, puis élevage",
                    paragraphes: [
                      "Au début des années 2000, cette discipline s’est progressivement étendue aux animaux de compagnie, notamment grâce aux travaux du Docteur Vétérinaire Francis Lizon.",
                      "Quelques années plus tard, son développement s’est poursuivi dans le secteur des animaux d’élevage, en particulier sous l’impulsion du Docteur Vétérinaire Jean-Pierre Siméon, précurseur de l’ostéopathie bovine en France.",
                    ],
                  },
                  {
                    periode: "Aujourd’hui",
                    intitule: "Une approche complémentaire reconnue",
                    paragraphes: [
                      "L’ostéopathie animale est pratiquée auprès de nombreuses espèces : animaux de compagnie, chevaux, animaux d’élevage, mais également animaux de sport, de travail ou de spectacle.",
                      "Au cours des dernières décennies, les approches complémentaires de santé animale ont connu un développement important. De plus en plus de propriétaires souhaitent intégrer des thérapies manuelles au suivi médical de leurs animaux, dans une démarche globale de prévention, de confort et de bien-être.",
                      "Grâce à son approche exclusivement manuelle, elle apporte une évaluation fonctionnelle globale de l’animal, en s’intéressant aux interactions entre les différents systèmes de l’organisme.",
                    ],
                  },
                ].map((chapitre) => (
                  <li
                    key={chapitre.periode}
                    className="grid gap-4 py-10 first:pt-0 last:pb-10 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
                  >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-plum">
                      {chapitre.periode}
                    </p>
                    <div>
                      <h3 className="text-[19px] leading-snug text-ink">{chapitre.intitule}</h3>
                      <div className="mt-4 max-w-2xl space-y-4 text-[16.5px] leading-[1.7] text-body">
                        {chapitre.paragraphes.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="max-w-3xl rounded-lg bg-white p-8 text-[19px] font-medium leading-snug text-ink ring-1 ring-line sm:text-[21px]">
                L’ostéopathie animale est une médecine intégrative dite naturelle : par son approche
                manuelle, elle apporte une vision globale différente et complémentaire de la médecine
                vétérinaire.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Les differentes approches : pleine largeur d'ecran, marge de 100 px */}
      <Section>
        <Container width="full">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Techniques</Eyebrow>
            <SectionTitle className="mt-5">Les 5 approches en ostéopathie</SectionTitle>
          </Reveal>
          <AProposApproches items={approches} />
        </Container>
      </Section>

      {/* Legislation */}
      <Section id="legislation" tone="surface" className="scroll-mt-28">
        <Container width="wide">
          <Reveal className="max-w-3xl">
            <Eyebrow>Cadre réglementaire</Eyebrow>
            <SectionTitle className="mt-5">Législation</SectionTitle>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <AProposLegislation />
          </Reveal>
        </Container>
      </Section>

      {/* Interdisciplinarite : parole de la praticienne, avec son portrait */}
      <Section>
        <Container width="wide">
          <figure className="grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20">
            <Reveal variant="right" className="group/media overflow-hidden rounded-lg">
              <Image
                src="/images/2023/05/marie-salabert.jpg"
                alt="Marie Salabert au micro lors d'une conférence sur l'ostéopathie animale"
                width={900}
                height={900}
                sizes="(max-width: 1024px) 100vw, 440px"
                className="img-zoom aspect-[4/5] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={120}>
              <span aria-hidden="true" className="block text-[64px] leading-none text-plum/25">
                “
              </span>
              <blockquote className="-mt-6 space-y-6 text-[19px] leading-[1.65] text-ink sm:text-[22px]">
                <p>
                  Au fil de ce parcours complémentaire, je me suis passionnée pour
                  l’interdisciplinarité, c’est-à-dire la collaboration entre les différents
                  professionnels de la santé animale. Je suis convaincue que la mise en commun de nos
                  compétences et de nos approches permet d’offrir une prise en charge plus complète
                  et plus adaptée à chaque animal.
                </p>
                <p>
                  Ainsi, au-delà de mon accompagnement en ostéopathie, je veille toujours à vous
                  conseiller et, lorsque cela est pertinent, à vous orienter vers le professionnel le
                  plus adapté aux besoins spécifiques de votre animal.
                </p>
              </blockquote>
              <figcaption className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-plum">
                Marie Salabert
              </figcaption>
            </Reveal>
          </figure>
        </Container>
      </Section>
    </>
  );
}

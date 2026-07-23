import type { Metadata } from "next";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { AProposApproches } from "@/components/AProposApproches";
import { AProposLegislation } from "@/components/AProposLegislation";

export const metadata: Metadata = {
  title: "À propos de l'ostéopathie animale - Marie Salabert Ostéopathe",
  description:
    "L'ostéopathie animale : son histoire, ses différentes approches (musculosquelettique, tissulaire, fasciale, viscérale, réflexe) et son cadre légal en France.",
  alternates: { canonical: "/osteopahie-animale" },
};

const approches = [
  {
    title: "Musculosquelettique (os, muscles, articulations, ligaments, tendons)",
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
      <div className="[&>section]:min-h-[380px] lg:[&>section]:min-h-[608px]">
        <PageHero
          image="/images/2025/05/a-propos-osteopathe-animalier-toulouse.jpg"
          title="A propos de l'ostéopathie animale"
          height="short"
        />
      </div>

      {/* Propos introductif : citation de l'OMS */}
      <Section>
        <Container>
          <figure className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">
              Selon l’OMS (Organisation Mondiale de la Santé)
            </Eyebrow>
            <blockquote className="mt-6">
              <p className="font-display text-[24px] leading-snug text-plum sm:text-[30px]">
                «&nbsp;La santé est un état complet de bien-être physique, mental et social et ne
                consiste pas seulement en une absence de maladie ou d’infirmité.&nbsp;»
              </p>
            </blockquote>
          </figure>
        </Container>
      </Section>

      {/* Histoire de l'osteopathie animale */}
      <Section tone="surface">
        <Container>
          <Eyebrow className="text-green-light!">Une discipline reconnue</Eyebrow>
          <SectionTitle className="mt-3">Histoire de l’ostéopathie animale</SectionTitle>
          <div className="mt-6 max-w-3xl space-y-5 text-[15px] leading-relaxed text-body">
            <p>
              L’ostéopathie animale s’est développée en France à partir des années 1980.
              Initialement appliquée aux équidés, elle a été adaptée par le Docteur Vétérinaire
              Dominique Giniaux et l’ostéopathe humain Pascal Evrard, qui ont largement contribué à
              son essor dans le milieu équin.
            </p>
            <p>
              Au début des années 2000, cette discipline s’est progressivement étendue aux animaux
              de compagnie, notamment grâce aux travaux du Docteur Vétérinaire Francis Lizon.
              Quelques années plus tard, son développement s’est poursuivi dans le secteur des
              animaux d’élevage, en particulier sous l’impulsion du Docteur Vétérinaire Jean-Pierre
              Siméon, précurseur de l’ostéopathie bovine en France.
            </p>
            <p>
              Aujourd’hui, l’ostéopathie animale est pratiquée auprès de nombreuses espèces : animaux
              de compagnie, chevaux, animaux d’élevage, mais également animaux de sport, de travail
              ou de spectacle.
            </p>
            <p>
              Au cours des dernières décennies, les approches complémentaires de santé animale ont
              connu un développement important. De plus en plus de propriétaires souhaitent intégrer
              des thérapies manuelles ou d’autres approches complémentaires au suivi médical de leurs
              animaux, dans une démarche globale de prévention, de confort et de bien-être.
            </p>
            <p>
              Dans ce contexte, l’ostéopathie animale occupe aujourd’hui une place reconnue comme
              approche complémentaire au suivi vétérinaire. Grâce à son approche exclusivement
              manuelle, elle apporte une évaluation fonctionnelle globale de l’animal, en
              s’intéressant aux interactions entre les différents systèmes de l’organisme.
            </p>
            <p className="font-semibold text-ink">
              L’ostéopathie animale est une médecine intégrative dite naturelle, par son approche
              manuelle elle permet d’apporter une vision globale différente et complémentaire de la
              médecine vétérinaire.
            </p>
          </div>
        </Container>
      </Section>

      {/* Les differentes approches en osteopathie */}
      <Section>
        <div className="mx-auto w-full max-w-[1278px] px-5 sm:px-6">
          <h2 className="text-center text-[32px] leading-snug text-green">
            Les différentes approches en ostéopathie
          </h2>
          <AProposApproches items={approches} />
        </div>
      </Section>

      {/* Legislation */}
      <Section id="legislation" tone="surface" className="scroll-mt-24">
        <Container>
          <Eyebrow>Cadre réglementaire</Eyebrow>
          <SectionTitle className="mt-3">Législation</SectionTitle>
          <div className="mt-8">
            <AProposLegislation />
          </div>
        </Container>
      </Section>

      {/* Interdisciplinarite : encart mis en valeur */}
      <Section>
        <Container>
          <figure className="mx-auto max-w-3xl rounded-[10px] border-l-4 border-plum bg-plum-soft/15 p-8 sm:p-10">
            <blockquote className="space-y-5 text-[16px] leading-relaxed text-body">
              <p>
                «&nbsp;Au fil de ce parcours complémentaire, je me suis passionnée pour
                l’interdisciplinarité, c’est-à-dire la collaboration entre les différents
                professionnels de la santé animale. Je suis convaincue que la mise en commun de nos
                compétences et de nos approches permet d’offrir une prise en charge plus complète et
                plus adaptée à chaque animal.
              </p>
              <p>
                Ainsi, au-delà de mon accompagnement en ostéopathie, je veille toujours à vous
                conseiller et, lorsque cela est pertinent, à vous orienter vers le professionnel le
                plus adapté aux besoins spécifiques de votre animal, afin de lui garantir une prise
                en charge globale et cohérente.&nbsp;»
              </p>
            </blockquote>
          </figure>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { avis, googleAvis } from "@/content/avis";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { PageHero, Testimonials } from "@/components/sections";
import { FaqAccordion, faqPageJsonLd, type FaqItem } from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.faq.meta.titre,
    description: d.faq.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.faq, locale),
      languages: { fr: routes.faq, en: `/en${routes.faq}`, it: `/it${routes.faq}` },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

const formation: FaqItem[] = [
  {
    question:
      "Comment devenir ostéopathe animalier ? Faut-il être vétérinaire ou ostéopathe DO au préalable ?",
    answer: (
      <>
        <p>
          En France, il n&apos;est pas nécessaire d&apos;être vétérinaire ou ostéopathe humain
          diplômé (DO) pour exercer l&apos;ostéopathie animale. Plusieurs parcours de formation
          permettent d&apos;accéder à cette profession, sous réserve de répondre aux exigences
          réglementaires en vigueur, notamment la réussite de l&apos;épreuve nationale
          d&apos;aptitude organisée par le Conseil national de l&apos;Ordre des vétérinaires (CNOV),
          indispensable pour pratiquer l&apos;ostéopathie animale en tant que non-vétérinaire.
        </p>
        <p className="mt-4">Trois principales voies de formation existent :</p>
        <ol className="mt-4 list-decimal space-y-4 pl-5">
          <li>
            <strong className="text-plum">
              Suivre une formation spécialisée en ostéopathie animale
            </strong>{" "}
            — Il est possible d&apos;intégrer une école d&apos;ostéopathie animale proposant
            généralement un cursus de cinq années d&apos;études comprenant des enseignements
            théoriques, pratiques et cliniques. À l&apos;issue de cette formation, le candidat doit
            réussir l&apos;examen national d&apos;aptitude organisé par le CNOV afin d&apos;être
            autorisé à exercer l&apos;ostéopathie animale en France.
          </li>
          <li>
            <strong className="text-plum">
              Être formé en ostéopathie humaine puis se spécialiser en ostéopathie animale
            </strong>{" "}
            — Les ostéopathes humains diplômés peuvent également compléter leur parcours par une
            formation spécifique en ostéopathie animale. Ils doivent néanmoins répondre aux
            exigences réglementaires applicables aux non-vétérinaires et réussir l&apos;épreuve
            nationale d&apos;aptitude du CNOV. Il est essentiel de choisir une formation complète,
            intégrant l&apos;étude des différentes espèces animales et une préparation adaptée aux
            exigences de l&apos;examen national.
          </li>
          <li>
            <strong className="text-plum">
              Devenir vétérinaire puis se spécialiser en ostéopathie vétérinaire
            </strong>{" "}
            — Les étudiants vétérinaires peuvent se former à l&apos;ostéopathie animale dans le
            cadre d&apos;une spécialisation complémentaire, notamment par l&apos;obtention d&apos;un
            Diplôme Inter-Écoles (DIE) d&apos;ostéopathie vétérinaire. Cette voie permet
            d&apos;intégrer l&apos;approche ostéopathique dans une formation médicale vétérinaire
            complète.
          </li>
        </ol>
      </>
    ),
    plain:
      "En France, il n’est pas nécessaire d’être vétérinaire ou ostéopathe humain diplômé (DO) pour exercer l’ostéopathie animale. Plusieurs parcours de formation permettent d’accéder à cette profession, sous réserve de répondre aux exigences réglementaires en vigueur, notamment la réussite de l’épreuve nationale d’aptitude organisée par le Conseil national de l’Ordre des vétérinaires (CNOV), indispensable pour pratiquer l’ostéopathie animale en tant que non-vétérinaire. Trois principales voies de formation existent : 1. Suivre une formation spécialisée en ostéopathie animale — Il est possible d’intégrer une école d’ostéopathie animale proposant généralement un cursus de cinq années d’études comprenant des enseignements théoriques, pratiques et cliniques. À l’issue de cette formation, le candidat doit réussir l’examen national d’aptitude organisé par le CNOV afin d’être autorisé à exercer l’ostéopathie animale en France. 2. Être formé en ostéopathie humaine puis se spécialiser en ostéopathie animale — Les ostéopathes humains diplômés peuvent également compléter leur parcours par une formation spécifique en ostéopathie animale. Ils doivent néanmoins répondre aux exigences réglementaires applicables aux non-vétérinaires et réussir l’épreuve nationale d’aptitude du CNOV. Il est essentiel de choisir une formation complète, intégrant l’étude des différentes espèces animales et une préparation adaptée aux exigences de l’examen national. 3. Devenir vétérinaire puis se spécialiser en ostéopathie vétérinaire — Les étudiants vétérinaires peuvent se former à l’ostéopathie animale dans le cadre d’une spécialisation complémentaire, notamment par l’obtention d’un Diplôme Inter-Écoles (DIE) d’ostéopathie vétérinaire. Cette voie permet d’intégrer l’approche ostéopathique dans une formation médicale vétérinaire complète.",
  },
  {
    question: "Quelles sont les principales matières enseignées en ostéopathie animale ?",
    answer: (
      <>
        <p>
          La formation d&apos;ostéopathe animalier repose sur un enseignement pluridisciplinaire
          associant connaissances scientifiques, compréhension du fonctionnement de l&apos;animal et
          apprentissage des techniques manuelles.
        </p>
        <p className="mt-4">
          Les principales matières théoriques fondamentales comprennent :
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-plum">Anatomie animale</strong>, afin de connaître précisément
            les structures du corps et leurs interactions ;
          </li>
          <li>
            <strong className="text-plum">Physiologie</strong>, pour comprendre le fonctionnement
            des différents systèmes de l&apos;organisme ;
          </li>
          <li>
            <strong className="text-plum">Biomécanique et locomotion</strong>, indispensables à
            l&apos;analyse du mouvement et des adaptations corporelles ;
          </li>
          <li>
            <strong className="text-plum">Sémiologie vétérinaire</strong>, permettant
            d&apos;identifier les signes nécessitant une orientation vers un vétérinaire.
          </li>
        </ul>
        <p className="mt-4">
          D&apos;autres enseignements complètent la formation : biologie cellulaire ; biochimie ;
          histologie ; physiopathologie ; zootechnie ; nutrition animale ; éthologie ; bien-être
          animal ; éthique et déontologie ; santé publique.
        </p>
        <p className="mt-4">
          La formation pratique permet ensuite d&apos;acquérir la maîtrise des différentes approches
          ostéopathiques, notamment les techniques musculo-squelettiques, fasciales, tissulaires,
          viscérales, crâniennes et autres approches adaptées aux différentes espèces.
        </p>
      </>
    ),
    plain:
      "La formation d’ostéopathe animalier repose sur un enseignement pluridisciplinaire associant connaissances scientifiques, compréhension du fonctionnement de l’animal et apprentissage des techniques manuelles. Les principales matières théoriques fondamentales comprennent : Anatomie animale, afin de connaître précisément les structures du corps et leurs interactions ; Physiologie, pour comprendre le fonctionnement des différents systèmes de l’organisme ; Biomécanique et locomotion, indispensables à l’analyse du mouvement et des adaptations corporelles ; Sémiologie vétérinaire, permettant d’identifier les signes nécessitant une orientation vers un vétérinaire. D’autres enseignements complètent la formation : biologie cellulaire ; biochimie ; histologie ; physiopathologie ; zootechnie ; nutrition animale ; éthologie ; bien-être animal ; éthique et déontologie ; santé publique. La formation pratique permet ensuite d’acquérir la maîtrise des différentes approches ostéopathiques, notamment les techniques musculo-squelettiques, fasciales, tissulaires, viscérales, crâniennes et autres approches adaptées aux différentes espèces.",
  },
];

const comprendre: FaqItem[] = [
  {
    question:
      "Une consultation d'ostéopathie animale nécessite-t-elle forcément des manipulations qui font « craquer » les articulations ?",
    answer: (
      <>
        <p>
          Non. Contrairement à certaines idées reçues, une consultation d&apos;ostéopathie animale
          ne repose pas nécessairement sur des manipulations avec des bruits articulaires.
        </p>
        <p className="mt-4">
          L&apos;ostéopathie utilise différentes techniques manuelles adaptées à chaque animal, à
          son âge, à son espèce, à son état de santé et à sa sensibilité. Les approches peuvent être
          articulaires, musculaires, fasciales, tissulaires, viscérales ou encore crâniennes, sans
          recherche systématique de « craquement ».
        </p>
        <p className="mt-4">
          L&apos;objectif n&apos;est pas de provoquer un mouvement forcé, mais d&apos;accompagner les
          tissus vers une meilleure mobilité et un fonctionnement plus équilibré, dans le respect du
          confort de l&apos;animal.
        </p>
      </>
    ),
    plain:
      "Non. Contrairement à certaines idées reçues, une consultation d’ostéopathie animale ne repose pas nécessairement sur des manipulations avec des bruits articulaires. L’ostéopathie utilise différentes techniques manuelles adaptées à chaque animal, à son âge, à son espèce, à son état de santé et à sa sensibilité. Les approches peuvent être articulaires, musculaires, fasciales, tissulaires, viscérales ou encore crâniennes, sans recherche systématique de « craquement ». L’objectif n’est pas de provoquer un mouvement forcé, mais d’accompagner les tissus vers une meilleure mobilité et un fonctionnement plus équilibré, dans le respect du confort de l’animal.",
  },
  {
    question: "À partir de quel âge un animal peut-il consulter un ostéopathe ?",
    answer: (
      <p>
        L&apos;ostéopathie s&apos;adresse aux animaux de tous âges. Une consultation peut être
        envisagée dès les premiers jours de vie, pendant la croissance, à l&apos;âge adulte ou chez
        les animaux seniors, en fonction de leurs besoins.
      </p>
    ),
    plain:
      "L’ostéopathie s’adresse aux animaux de tous âges. Une consultation peut être envisagée dès les premiers jours de vie, pendant la croissance, à l’âge adulte ou chez les animaux seniors, en fonction de leurs besoins.",
  },
  {
    question: "Mon animal a-t-il besoin d'une ordonnance vétérinaire ?",
    answer: (
      <p>
        Non. En France, un ostéopathe animalier inscrit sur le Registre National d&apos;Aptitude
        (RNA) peut recevoir un animal sans prescription vétérinaire. En revanche, si l&apos;état de
        l&apos;animal le nécessite, il orientera systématiquement le propriétaire vers son
        vétérinaire.
      </p>
    ),
    plain:
      "Non. En France, un ostéopathe animalier inscrit sur le Registre National d’Aptitude (RNA) peut recevoir un animal sans prescription vétérinaire. En revanche, si l’état de l’animal le nécessite, il orientera systématiquement le propriétaire vers son vétérinaire.",
  },
  {
    question: "L'ostéopathie animale remplace-t-elle la médecine vétérinaire ?",
    answer: (
      <p>
        Non. L&apos;ostéopathie est une approche complémentaire au suivi vétérinaire. Elle ne
        remplace ni un diagnostic médical, ni un traitement vétérinaire lorsque celui-ci est
        nécessaire.
      </p>
    ),
    plain:
      "Non. L’ostéopathie est une approche complémentaire au suivi vétérinaire. Elle ne remplace ni un diagnostic médical, ni un traitement vétérinaire lorsque celui-ci est nécessaire.",
  },
];

const consultation: FaqItem[] = [
  {
    question: "Comment se déroule une consultation ?",
    answer: (
      <p>
        Une consultation comprend un échange sur les antécédents de votre animal, un examen
        locomoteur et postural, un examen palpatoire, un diagnostic ostéopathique puis un traitement
        manuel adapté. Des conseils personnalisés vous sont ensuite donnés pour optimiser la
        récupération de votre animal.
      </p>
    ),
    plain:
      "Une consultation comprend un échange sur les antécédents de votre animal, un examen locomoteur et postural, un examen palpatoire, un diagnostic ostéopathique puis un traitement manuel adapté. Des conseils personnalisés vous sont ensuite donnés pour optimiser la récupération de votre animal.",
  },
  {
    question: "Les manipulations sont-elles douloureuses ?",
    answer: (
      <p>
        Les techniques utilisées sont adaptées à chaque animal et à son état de santé. Certains
        animaux peuvent manifester une sensibilité sur des zones déjà douloureuses, mais les
        manipulations sont réalisées dans le respect de leur confort.
      </p>
    ),
    plain:
      "Les techniques utilisées sont adaptées à chaque animal et à son état de santé. Certains animaux peuvent manifester une sensibilité sur des zones déjà douloureuses, mais les manipulations sont réalisées dans le respect de leur confort.",
  },
  {
    question: "Combien de temps dure une consultation ?",
    answer: (
      <p>
        La durée moyenne est de 35 minutes à 1 heure, en fonction de l&apos;espèce, du motif de
        consultation et des besoins de l&apos;animal.
      </p>
    ),
    plain:
      "La durée moyenne est de 35 minutes à 1 heure, en fonction de l’espèce, du motif de consultation et des besoins de l’animal.",
  },
  {
    question: "Combien de séances sont nécessaires ?",
    answer: (
      <p>
        Chaque animal est unique. Une seule séance peut parfois suffire, tandis que certaines
        situations nécessitent un suivi régulier. Le nombre de consultations est déterminé en
        fonction de l&apos;évolution de l&apos;animal et de ses besoins.
      </p>
    ),
    plain:
      "Chaque animal est unique. Une seule séance peut parfois suffire, tandis que certaines situations nécessitent un suivi régulier. Le nombre de consultations est déterminé en fonction de l’évolution de l’animal et de ses besoins.",
  },
  {
    question: "Mon animal doit-il se reposer après la séance ?",
    answer: (
      <p>
        Oui. Un temps de repos est généralement conseillé pendant les 24 à 72 heures suivant la
        consultation afin de permettre à l&apos;organisme de s&apos;adapter aux modifications
        induites par le traitement. Des recommandations adaptées vous seront transmises à la fin de
        la séance.
      </p>
    ),
    plain:
      "Oui. Un temps de repos est généralement conseillé pendant les 24 à 72 heures suivant la consultation afin de permettre à l’organisme de s’adapter aux modifications induites par le traitement. Des recommandations adaptées vous seront transmises à la fin de la séance.",
  },
  {
    question: "Peut-on consulter en prévention ?",
    answer: (
      <p>
        Oui. L&apos;ostéopathie peut s&apos;intégrer dans un suivi préventif tout au long de la vie
        de votre animal, sans motif de consultation spécifique.
      </p>
    ),
    plain:
      "Oui. L’ostéopathie peut s’intégrer dans un suivi préventif tout au long de la vie de votre animal, sans motif de consultation spécifique.",
  },
  {
    question: "Faut-il prévoir quelque chose pour la consultation ?",
    answer: (
      <p>
        Il est recommandé de prévoir les comptes rendus vétérinaires récents si votre animal est
        suivi pour une pathologie. Pour les chevaux et les animaux d&apos;élevage, un espace
        sécurisé permettant leur observation et leur manipulation est nécessaire. Concernant les
        chats, une serviette ou plaid sur une table est privilégié pour leur confort et la
        praticité des manipulations.
      </p>
    ),
    plain:
      "Il est recommandé de prévoir les comptes rendus vétérinaires récents si votre animal est suivi pour une pathologie. Pour les chevaux et les animaux d’élevage, un espace sécurisé permettant leur observation et leur manipulation est nécessaire. Concernant les chats, une serviette ou plaid sur une table est privilégié pour leur confort et la praticité des manipulations.",
  },
  {
    question: "Les consultations sont-elles remboursées ?",
    answer: (
      <p>
        Certaines assurances santé animale prennent en charge tout ou partie des consultations
        d&apos;ostéopathie. Les modalités varient selon les contrats ; il est conseillé de se
        rapprocher de votre assureur. En cas de besoin, une feuille de soin sera complétée.
      </p>
    ),
    plain:
      "Certaines assurances santé animale prennent en charge tout ou partie des consultations d’ostéopathie. Les modalités varient selon les contrats ; il est conseillé de se rapprocher de votre assureur. En cas de besoin, une feuille de soin sera complétée.",
  },
  {
    question: "Quand ne faut-il pas consulter un ostéopathe ?",
    answer: (
      <p>
        En cas d&apos;urgence (fracture, plaie importante, difficulté respiratoire, fièvre,
        suspicion d&apos;infection, détresse neurologique, etc.), il est indispensable de contacter
        un vétérinaire en priorité. L&apos;ostéopathie pourra éventuellement intervenir dans un
        second temps, en complément de la prise en charge médicale.
      </p>
    ),
    plain:
      "En cas d’urgence (fracture, plaie importante, difficulté respiratoire, fièvre, suspicion d’infection, détresse neurologique, etc.), il est indispensable de contacter un vétérinaire en priorité. L’ostéopathie pourra éventuellement intervenir dans un second temps, en complément de la prise en charge médicale.",
  },
  {
    question: "L'ostéopathe animalier peut-il échanger directement avec mon vétérinaire ?",
    answer: (
      <p>
        Oui. La communication entre les différents professionnels qui interviennent auprès de votre
        animal permet une prise en charge globale et cohérente. Avec votre accord, l&apos;ostéopathe
        animalier peut échanger avec votre vétérinaire traitant afin de partager les informations
        utiles au suivi de votre animal, dans le respect du rôle et des compétences de chacun.
        L&apos;ostéopathie s&apos;inscrit dans une démarche complémentaire au suivi vétérinaire, avec
        pour objectif commun de favoriser la santé, le confort, la mobilité et le bien-être de votre
        animal.
      </p>
    ),
    plain:
      "Oui. La communication entre les différents professionnels qui interviennent auprès de votre animal permet une prise en charge globale et cohérente. Avec votre accord, l’ostéopathe animalier peut échanger avec votre vétérinaire traitant afin de partager les informations utiles au suivi de votre animal, dans le respect du rôle et des compétences de chacun. L’ostéopathie s’inscrit dans une démarche complémentaire au suivi vétérinaire, avec pour objectif commun de favoriser la santé, le confort, la mobilité et le bien-être de votre animal.",
  },
  {
    question: "Puis-je rester présent pendant la consultation d'ostéopathie ?",
    answer: (
      <p>
        Oui. Votre présence est souhaitée lors de la consultation. Votre connaissance de
        l&apos;animal, de ses habitudes et de son comportement constitue une source
        d&apos;informations précieuse lors de l&apos;anamnèse et du déroulement de la séance. Votre
        présence permet également de participer aux échanges, de comprendre les observations
        réalisées et de recevoir les conseils nécessaires pour accompagner au mieux votre animal
        après la consultation.
      </p>
    ),
    plain:
      "Oui. Votre présence est souhaitée lors de la consultation. Votre connaissance de l’animal, de ses habitudes et de son comportement constitue une source d’informations précieuse lors de l’anamnèse et du déroulement de la séance. Votre présence permet également de participer aux échanges, de comprendre les observations réalisées et de recevoir les conseils nécessaires pour accompagner au mieux votre animal après la consultation.",
  },
];

const situations: FaqItem[] = [
  {
    question:
      "Mon chien est méfiant ou réactif : comment se déroule une séance dans ce type de situation ?",
    answer: (
      <>
        <p>
          Les chiens réactifs ou ayant des difficultés à se laisser manipuler sont des animaux que
          je rencontre régulièrement en consultation. Je suis formée pour adapter la prise en charge
          à chaque profil et respecter le rythme de chaque animal.
        </p>
        <p>
          Afin de préparer au mieux la séance, nous échangeons ensemble par téléphone en amont de ma
          venue. Cela me permet de recueillir les informations importantes concernant votre chien,
          ses réactions habituelles et de mettre en place les meilleures conditions possibles pour
          que la rencontre se déroule sereinement. Si vous souhaitez mettre une muselière à votre
          chien pour sécuriser la séance, celle-ci pourra être utilisée à votre demande. Si votre
          animal présente des signes importants de méfiance, de peur ou d&apos;agressivité, nous
          adapterons également nos attitudes et nos postures respectives afin de favoriser un climat
          de confiance et de sécurité pour tous.
        </p>
        <p>
          Mon objectif est toujours de respecter les limites de votre chien. S&apos;il n&apos;est
          réellement pas en mesure d&apos;être approché ou touché le jour de la séance, celle-ci ne
          sera pas maintenue afin de ne pas renforcer ses réactions de défense ou sa méfiance envers
          les manipulations. Dans ce cas, nous veillerons simplement à terminer la rencontre sur une
          expérience positive et rassurante pour lui avant mon départ.
        </p>
      </>
    ),
    plain:
      "Les chiens réactifs ou ayant des difficultés à se laisser manipuler sont des animaux que je rencontre régulièrement en consultation. Je suis formée pour adapter la prise en charge à chaque profil et respecter le rythme de chaque animal. Afin de préparer au mieux la séance, nous échangeons ensemble par téléphone en amont de ma venue. Cela me permet de recueillir les informations importantes concernant votre chien, ses réactions habituelles et de mettre en place les meilleures conditions possibles pour que la rencontre se déroule sereinement. Si vous souhaitez mettre une muselière à votre chien pour sécuriser la séance, celle-ci pourra être utilisée à votre demande. Si votre animal présente des signes importants de méfiance, de peur ou d’agressivité, nous adapterons également nos attitudes et nos postures respectives afin de favoriser un climat de confiance et de sécurité pour tous. Mon objectif est toujours de respecter les limites de votre chien. S’il n’est réellement pas en mesure d’être approché ou touché le jour de la séance, celle-ci ne sera pas maintenue afin de ne pas renforcer ses réactions de défense ou sa méfiance envers les manipulations. Dans ce cas, nous veillerons simplement à terminer la rencontre sur une expérience positive et rassurante pour lui avant mon départ.",
  },
  {
    question: "Mon chien boite, est-ce que l'ostéopathie peut l'aider ?",
    answer: (
      <p>
        Une boiterie peut avoir de nombreuses origines et nécessite parfois un examen vétérinaire
        afin d&apos;en identifier la cause. Lorsque la cause médicale a été prise en charge ou
        lorsque la situation relève d&apos;un trouble fonctionnel, l&apos;ostéopathie peut
        contribuer à améliorer le confort locomoteur de l&apos;animal. Elle permet d&apos;évaluer
        les compensations mises en place par le corps, les restrictions de mobilité et les
        déséquilibres fonctionnels pouvant persister après un épisode douloureux. L&apos;objectif
        est d&apos;accompagner le retour à une locomotion plus harmonieuse et de limiter
        l&apos;installation de compensations, en complément du suivi vétérinaire lorsque celui-ci
        est nécessaire.
      </p>
    ),
    plain:
      "Une boiterie peut avoir de nombreuses origines et nécessite parfois un examen vétérinaire afin d’en identifier la cause. Lorsque la cause médicale a été prise en charge ou lorsque la situation relève d’un trouble fonctionnel, l’ostéopathie peut contribuer à améliorer le confort locomoteur de l’animal. Elle permet d’évaluer les compensations mises en place par le corps, les restrictions de mobilité et les déséquilibres fonctionnels pouvant persister après un épisode douloureux. L’objectif est d’accompagner le retour à une locomotion plus harmonieuse et de limiter l’installation de compensations, en complément du suivi vétérinaire lorsque celui-ci est nécessaire.",
  },
  {
    question: "Mon cheval est raide ou manque de souplesse, faut-il consulter un ostéopathe ?",
    answer: (
      <p>
        Une diminution de souplesse, des raideurs ou une modification de la locomotion peuvent être
        liées à différentes causes : contraintes liées au travail, adaptations posturales,
        inconfort, vieillissement ou compensations fonctionnelles. Une consultation
        d&apos;ostéopathie permet d&apos;évaluer la mobilité globale du cheval, son équilibre
        corporel et les éventuelles restrictions pouvant limiter son confort ou ses capacités
        physiques. Chez le cheval sportif comme chez le cheval de loisir, l&apos;objectif est de
        favoriser une locomotion fluide, une meilleure adaptation aux contraintes et un confort
        optimal.
      </p>
    ),
    plain:
      "Une diminution de souplesse, des raideurs ou une modification de la locomotion peuvent être liées à différentes causes : contraintes liées au travail, adaptations posturales, inconfort, vieillissement ou compensations fonctionnelles. Une consultation d’ostéopathie permet d’évaluer la mobilité globale du cheval, son équilibre corporel et les éventuelles restrictions pouvant limiter son confort ou ses capacités physiques. Chez le cheval sportif comme chez le cheval de loisir, l’objectif est de favoriser une locomotion fluide, une meilleure adaptation aux contraintes et un confort optimal.",
  },
  {
    question:
      "Mon animal a changé de comportement, une consultation d'ostéopathie peut-elle être utile ?",
    answer: (
      <p>
        Un changement de comportement peut avoir de nombreuses origines : environnement, éducation,
        stress, douleur ou inconfort physique. Lorsqu&apos;une gêne corporelle participe à une
        modification du comportement, l&apos;ostéopathie peut contribuer à identifier certaines
        restrictions fonctionnelles susceptibles d&apos;impacter le bien-être de l&apos;animal. Elle
        peut s&apos;intégrer dans une prise en charge pluridisciplinaire, en collaboration avec le
        vétérinaire, le vétérinaire comportementaliste ou l&apos;éducateur spécialisé lorsque cela
        est nécessaire.
      </p>
    ),
    plain:
      "Un changement de comportement peut avoir de nombreuses origines : environnement, éducation, stress, douleur ou inconfort physique. Lorsqu’une gêne corporelle participe à une modification du comportement, l’ostéopathie peut contribuer à identifier certaines restrictions fonctionnelles susceptibles d’impacter le bien-être de l’animal. Elle peut s’intégrer dans une prise en charge pluridisciplinaire, en collaboration avec le vétérinaire, le vétérinaire comportementaliste ou l’éducateur spécialisé lorsque cela est nécessaire.",
  },
  {
    question: "Quand consulter un ostéopathe pour un animal sportif ?",
    answer: (
      <>
        <p>
          Les animaux sportifs sont soumis à des contraintes physiques importantes nécessitant un
          suivi adapté. Une consultation peut être envisagée :
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>en préparation d&apos;une saison sportive ou d&apos;une période d&apos;activité intense ;</li>
          <li>avant une échéance importante ;</li>
          <li>après un effort soutenu afin d&apos;accompagner la récupération ;</li>
          <li>lors d&apos;une baisse de performance ou d&apos;une modification de la locomotion ;</li>
          <li>en prévention afin de surveiller les compensations liées à l&apos;entraînement.</li>
        </ul>
      </>
    ),
    plain:
      "Les animaux sportifs sont soumis à des contraintes physiques importantes nécessitant un suivi adapté. Une consultation peut être envisagée : en préparation d’une saison sportive ou d’une période d’activité intense ; avant une échéance importante ; après un effort soutenu afin d’accompagner la récupération ; lors d’une baisse de performance ou d’une modification de la locomotion ; en prévention afin de surveiller les compensations liées à l’entraînement.",
  },
];

const allItems: FaqItem[] = [...formation, ...comprendre, ...consultation, ...situations];

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const f = d.faq;

  /* En francais on garde les reponses mises en forme (listes, gras) ; dans les
     autres langues on rend la version texte traduite, en un paragraphe. */
  const groupes = (
    [
      ["formation", formation],
      ["comprendre", comprendre],
      ["consultation", consultation],
      ["situations", situations],
    ] as const
  ).map(([cle, source]) => ({
    titre: f.groupes[cle],
    items:
      locale === "fr"
        ? source
        : f.items[cle].map((item, i) => ({
            question: item.question,
            answer: <p>{item.reponse}</p>,
            plain: source[i]?.plain ?? item.reponse,
          })),
  }));

  return (
    <>
      <PageHero
        image="/images/2025/05/questions-frequentes-osteopathe-animailier.jpg"
        eyebrow={f.hero.surTitre}
        title={f.hero.titre}
        subtitle={f.hero.sousTitre}
      />

      {/* Propos d'ouverture retire : la banniere annonce deja la page, et le
          visiteur venu chercher une reponse tombait sur un paragraphe avant la
          premiere question. L'invitation a contacter est reprise en bas de page. */}

      {/* Les quatre familles de questions, chacune avec son titre collant */}
      {groupes.map((groupe, i) => (
        <Section key={groupe.titre} tone={i % 2 === 0 ? "surface" : "white"}>
          <Container width="full">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-20">
              <Reveal className="lg:sticky lg:top-32 lg:self-start">
                <span
                  aria-hidden="true"
                  className="text-[13px] font-semibold tracking-[0.18em] text-plum/60"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-light uppercase mt-4 text-[26px] leading-snug tracking-[0.05em] text-ink sm:text-[32px]">
                  {groupe.titre}
                </h2>
                <p className="mt-4 text-[14px] text-muted">
                  {f.compteur.replace("{n}", String(groupe.items.length))}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <FaqAccordion items={groupe.items} />
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      <Testimonials
        items={avis.slice(0, 3)}
        profile={googleAvis}
        title={d.avis.titre}
        libelles={{ avisGoogle: d.avis.avisGoogle, lireTous: d.avis.lireTous }}
        locale={localeTags[locale]}
      />

      <Section className="text-center">
        <Container width="full">
          <Reveal>
            <Button href={cheminLocalise(routes.rendezVous, locale)}>{d.commun.reserverSeance}</Button>
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(allItems)),
        }}
      />
    </>
  );
}

/**
 * Avis Google de la fiche « Marie Salabert Ostéopathie Animale ».
 * Relevé manuel du 24 juillet 2026 : 16 avis, note moyenne 5/5.
 *
 * Mise a jour : recopier ici le nouvel avis (nom, date ISO, texte integral) et
 * incrementer `googleAvis.nombre`. Les avis sont ranges du plus recent au plus ancien.
 */

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Marie+Salabert+Ost%C3%A9opathie+Animale#lrd=0x0:0xe0d2ecb1c0f7d3bd,1";

/** Note globale de la fiche, affichee au-dessus des temoignages. */
export const googleAvis = {
  note: 5,
  nombre: 16,
  url: GOOGLE_REVIEWS_URL,
};

export type Avis = {
  name: string;
  stars: number;
  /** date de publication (ISO), affichee au format « mois année » */
  date: string;
  text: string;
  href?: string;
};

export const avis: readonly Avis[] = [
  {
    name: "Annabelle Bourlier",
    stars: 5,
    date: "2026-07-21",
    href: GOOGLE_REVIEWS_URL,
    // TODO texte tronque sur la fiche Google : recopier l'avis complet
    text: "L'élevage du Haut Dagour (dogues allemands) fait une confiance totale en Marie ! Nos multi champions passent…",
  },
  {
    name: "Adeline Brisse",
    stars: 5,
    date: "2026-07-19",
    href: GOOGLE_REVIEWS_URL,
    // TODO texte tronque sur la fiche Google : recopier l'avis complet
    text: "En tant qu'éleveuse de Golden Retrievers, je recherchais une ostéopathe compétente, douce, à l'écoute, professionnelle…",
  },
  {
    name: "Camille Chempaux",
    stars: 5,
    date: "2025-10-31",
    href: GOOGLE_REVIEWS_URL,
    // TODO texte tronque sur la fiche Google : recopier l'avis complet
    text: "Marie suit ma jument depuis plus de 5 ans ainsi que mes deux chats et le chat de ma maman. Grâce à elle tous mes…",
  },
  {
    name: "Marjo Rie",
    stars: 5,
    date: "2025-05-02",
    href: GOOGLE_REVIEWS_URL,
    // TODO texte tronque sur la fiche Google : recopier l'avis complet
    text: "J'ai fait venir Marie Salabert pour ma chienne Samba 4 mois et ma minette Liù 6 ans…",
  },
  {
    name: "La Haute Plume",
    stars: 5,
    date: "2024-03-13",
    href: GOOGLE_REVIEWS_URL,
    // TODO texte tronque sur la fiche Google : recopier l'avis complet
    text: "Je recommande vivement Marie, elle apporte à chaque fois un bien-être à mon petit Tango, qui se laisse manipuler avec…",
  },
  {
    name: "Nelly Palenzuela",
    stars: 5,
    date: "2023-12-13",
    href: GOOGLE_REVIEWS_URL,
    text: "Tout en douceur et avec beaucoup d'attention, elle a manipulé mon Cavalier King Charles. Depuis, tout est rentré dans l'ordre et les résultats ont été rapides. Merci beaucoup. Recommandée par ma véto et que je recommande à mon tour.",
  },
  {
    name: "Regis Menquet",
    stars: 5,
    date: "2023-02-22",
    href: GOOGLE_REVIEWS_URL,
    text: "Je recommande Marie qui est intervenue sur mon bulldog après une entorse, l'effet a été quasi immédiat, c'est incroyable, je suis ravi.",
  },
  {
    name: "Laurence Brehonnet",
    stars: 5,
    date: "2023-01-15",
    href: GOOGLE_REVIEWS_URL,
    text: "Une expérience incroyable. Ma petite bouledogue de 10ans que le véto ne peut pas toucher s'est laissée manipuler pendant plus d'une heure. Quelques jours après la voilà qui gigote de mieux en mieux. Merci beaucoup je ne saurais que trop recommander.",
  },
  {
    name: "Laure Moulis",
    stars: 5,
    date: "2022-11-08",
    href: GOOGLE_REVIEWS_URL,
    text: "Très bon accueil et en plus dans l'urgence, mon toutou de 12 ans était coincé au niveau des lombaires. Très bonne approche. Et en plus efficace. Parfait on recommande.",
  },
  {
    name: "Béatrice Carretier",
    stars: 5,
    date: "2022-10-24",
    href: GOOGLE_REVIEWS_URL,
    text: "Marie est toute en douceur et toute en compétence. Les animaux reçoivent ses soins avec confiance. Mon vieux cheval qui a de gros problèmes de locomotion a retrouvé un peu d'aisance dans ses déplacements, une de mes chiennes était une vraie pile électrique, elle est aujourd'hui beaucoup plus calme et attentive, et Marie a résolu le problème de boiterie de mon autre chienne. Elle se rend disponible rapidement et se déplace à domicile. Je la recommande vraiment, c'est une excellente professionnelle.",
  },
  {
    name: "Pascal Dupuis",
    stars: 5,
    date: "2022-10-05",
    href: GOOGLE_REVIEWS_URL,
    text: "J'ai adopté une jeune senior en provenance de refuge. Mme Salabert a mis en place une séance basée sur le consentement de l'animal. Ma chienne avait une démarche un peu lourde; elle en est ressortie nettement assouplie. Cela a amélioré sa qualité de vie, mais aussi son plaisir à se balader.",
  },
  {
    name: "Bonnie Lesbordes",
    stars: 5,
    date: "2022-09-19",
    href: GOOGLE_REVIEWS_URL,
    text: "Une ostéopathe à l'écoute, douce et calme. Une semaine après la séance, les problèmes qui avaient amené mon chaton étaient quasiment totalement résolus. Je recommande vivement Mme Salabert.",
  },
  {
    name: "Sylvie Illanes",
    stars: 5,
    date: "2022-09-15",
    href: GOOGLE_REVIEWS_URL,
    text: "Deux consultations pour deux chiens qui boitaient. Marie est très compétente, douce et patiente; très bonne approche et adaptation à chaque caractère. Consulte à domicile! Je recommande vraiment et je referai appel à Marie sans hésiter.",
  },
  {
    name: "J. P",
    stars: 5,
    date: "2022-08-04",
    href: GOOGLE_REVIEWS_URL,
    text: "Personne douce, à l'écoute, très professionnelle. Je conseille vivement.",
  },
] as const;

/* Deux avis 5 étoiles de la fiche ne comportent aucun commentaire
   (SARL Balzac Froid 47, 12/09/2023 et Marie Lombardo, 07/04/2023) :
   ils comptent dans la note globale mais n'ont rien a afficher. */

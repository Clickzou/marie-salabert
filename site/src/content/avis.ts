/** Avis Google repris du site d'origine (widget temoignages Elementor). */

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Marie+Salabert+ost%C3%A9opathe+animalier#lrd=0x0:0xe0d2ecb1c0f7d3bd,1";

export const avis = [
  {
    name: "Nelly Palenzuela",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "Tout en douceur et avec beaucoup d'attention, elle a manipulé mon Cavalier King Charles. Depuis, tout est rentré dans l'ordre et les résultats ont été rapides. Merci beaucoup. Recommandée par ma véto et que je recommande à mon tour.",
  },
  {
    name: "Laurence Brehonnet",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "Une expérience incroyable. Ma petite bouledogue de 10ans que le véto ne peut pas toucher s'est laissée manipuler pendant plus d'une heure. Quelques jours après la voilà qui gigote de mieux en mieux. Merci beaucoup je ne saurais que trop recommander.",
  },
  {
    name: "Béatrice Carretier",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "Marie est toute en douceur et toute en compétence. Les animaux reçoivent ses soins avec confiance. Mon vieux cheval qui a de gros problèmes de locomotion a retrouvé un peu d'aisance dans ses déplacements, une de mes chiennes était une vraie pile électrique, elle est aujourd'hui beaucoup plus calme et attentive, et Marie a résolu le problème de boiterie de mon autre chienne. Elle se rend disponible rapidement et se déplace à domicile. Je la recommande vraiment, c'est une excellente professionnelle.",
  },
  {
    name: "Sylvie Illanes",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "Deux consultations pour deux chiens qui boitaient. Marie est très compétente, douce et patiente; très bonne approche et adaptation à chaque caractère. Consulte à domicile! Je recommande vraiment et je referai appel à Marie sans hésiter.",
  },
  {
    name: "Pascal Dupuis",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "J'ai adopté une jeune senior en provenance de refuge. Mme Salabert a mis en place une séance basée sur le consentement de l'animal. Ma chienne avait une démarche un peu lourde; elle en est ressortie nettement assouplie. Cela a amélioré sa qualité de vie, mais aussi son plaisir à se balader.",
  },
  {
    name: "Laure Moulis",
    stars: 5,
    href: GOOGLE_REVIEWS_URL,
    text: "Très bon accueil et en plus dans l'urgence, mon toutou de 12 ans 'était coincé au niveau des lombaires. Très bonne approche. Et en plus efficace. Parfait on recommande.",
  },
] as const;

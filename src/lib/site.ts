/**
 * Donnees globales du site, reprises de la configuration WordPress d'origine.
 * Les slugs sont conserves a l'identique pour ne perdre aucun referencement.
 */

export const site = {
  name: "Ostheopathie animale Toulouse",
  practitioner: "Marie Salabert",
  tagline: "La santé de vos animaux par l'ostéopathie",
  // Domaine de production : la version avec www, deja indexee par Google sur l'ancien site
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.osteopathie-animale-toulouse.fr",
  locale: "fr_FR",
  // Mesure d'audience Google Analytics 4, chargee seulement apres consentement
  analyticsId: "G-4GSH30VZPE",
  phone: "06 37 88 00 73",
  phoneHref: "tel:+33637880073",
  whatsapp: "https://wa.me/33637880073",
  secretariatWhatsapp: "https://wa.me/33679749777",
  // Departements d'intervention (Occitanie)
  departments: "31, 81, 82, 47, 46, 32, 33, 12, 09 et 11",
  // Adresse personnelle : reservee aux mentions legales (souhait de la praticienne).
  address: {
    street: "10 le clos péchabé",
    postalCode: "31620",
    city: "Castelnau d'Estrétefonds",
    country: "FR",
  },
  // Zone d'intervention affichee partout ailleurs (footer, contact, etc.).
  serviceArea: "Toulouse et ses environs",
  // Coordonnees professionnelles
  secretariat: "06 79 74 97 77",
  legalForm: "Entreprise Individuelle",
  vat: "FR02883931347",
  email: "mariesalabert.osteoanimale@gmail.com",
  siret: "883.931.347.000.16",
  registration:
    "Inscrite sur le Registre National d'Aptitude tenu par le Conseil National de l'Ordre des Vétérinaires (OA 801)",
  social: {
    facebook: "https://www.facebook.com/mariesalabertosteopathieanimale/",
    instagram: "https://www.instagram.com/mariesalabert.osteoanimale/",
    linkedin:
      "https://www.linkedin.com/in/marie-salabert-0197b2166/?originalSubdomain=fr",
  },
  socialHandles: {
    facebook: "Marie Salabert Ostéopathie Animale",
    linkedin: "Marie Salabert",
    instagram: "mariesalabert.osteoanimale",
  },
  credit: { label: "Conception site internet : Clickzou", url: "https://clickzou.fr/" },
} as const;

export const routes = {
  home: "/",
  about: "/osteopahie-animale",
  consultations: "/consulation-osteopathe-animalier",
  /* Une page par famille d'animaux : les trois sections vivaient sur la page
     consultations, qui devenait tres longue. Elles sont filles de cette page,
     l'URL dit donc d'ou elles viennent. */
  equides: "/consulation-osteopathe-animalier/equides",
  compagnie: "/consulation-osteopathe-animalier/chiens-chats-nac",
  rente: "/consulation-osteopathe-animalier/animaux-de-rente",
  certification: "/mon-diplome-dosteopathe-animalier",
  news: "/actualites",
  newsCategory: "/categorie/actualites",
  faq: "/faq",
  gallery: "/galerie",
  symbiosteo: "/symbiosteo-2",
  /* `/reservation` a ete supprimee : elle reprenait le formulaire et les
     coordonnees de la page de rendez-vous. Tous les appels a l'action pointent
     desormais sur cette derniere, et l'ancienne URL y est redirigee dans
     `next.config.ts`. */
  rendezVous: "/rendez-vous-osteopathe-animalier",
  /* L'ancienne page `/contact` a ete fusionnee avec la prise de rendez-vous,
     a la demande de la praticienne : meme formulaire, memes coordonnees.
     L'URL est redirigee dans `next.config.ts`. */
  /* Plan du site lisible, en complement du sitemap.xml : il donne au visiteur
     — et au robot qui suit les liens — une entree vers chaque page. */
  plan: "/plan-du-site",
  legal: "/mentions-legales",
  privacy: "/politique-de-confidentialite",
  cookies: "/politique-de-cookies-ue",
} as const;

/**
 * Pages qui commencent par une banniere photo : l'en-tete s'y superpose en
 * transparence tant que le visiteur n'a pas defile. Ailleurs il reste blanc.
 */
export const heroRoutes: readonly string[] = [
  routes.home,
  routes.about,
  routes.consultations,
  routes.certification,
  routes.faq,
];

/** Une entree de menu : `cle` renvoie vers `nav` dans les dictionnaires. */
export type EntreeMenu = {
  cle: "accueil" | "consultations" | "equine" | "compagnie" | "rurale" | "infos" | "aPropos" | "actualites" | "symbiosteo" | "faq" | "galerie";
  href: string;
  sousMenu?: readonly EntreeMenu[];
};

/**
 * Menu principal, tel que demande par la praticienne (retour V2) : les trois
 * familles d'animaux sont visibles des le premier niveau, sinon les visiteurs
 * ne tombaient jamais dessus. Les rubriques secondaires (a propos, actualites,
 * Symbiosteo, FAQ, galerie) sont regroupees sous « Infos », dont le lien
 * parent mene a la premiere d'entre elles pour qu'un clic direct aboutisse.
 * La prise de rendez-vous n'y figure pas : c'est le bouton dore de l'en-tete.
 */
export const mainNav: readonly EntreeMenu[] = [
  { cle: "accueil", href: routes.home },
  { cle: "consultations", href: routes.consultations },
  { cle: "equine", href: routes.equides },
  { cle: "compagnie", href: routes.compagnie },
  { cle: "rurale", href: routes.rente },
  {
    cle: "infos",
    href: routes.about,
    sousMenu: [
      { cle: "aPropos", href: routes.about },
      { cle: "actualites", href: routes.news },
      { cle: "symbiosteo", href: routes.symbiosteo },
      { cle: "faq", href: routes.faq },
      { cle: "galerie", href: routes.gallery },
    ],
  },
];

export const headerCta = {
  label: "Prendre un rendez-vous",
  href: routes.rendezVous,
} as const;

/**
 * Liens du footer. Sur l'original, « A propos » et « Contact » pointaient vers
 * /a-propos/ et /contact/ qui renvoyaient une 404 : corriges vers les vraies pages.
 * « Contact » mene au formulaire de la page de rendez-vous, qui fait office de
 * page de contact depuis la fusion des deux.
 */
export const footerNav = [
  { cle: "aPropos", href: routes.about },
  { cle: "contact", href: `${routes.rendezVous}#formulaire` },
  { cle: "plan", href: routes.plan },
  { cle: "cookies", href: routes.cookies },
  { cle: "mentions", href: routes.legal },
  { cle: "confidentialite", href: routes.privacy },
] as const;

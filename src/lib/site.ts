/**
 * Donnees globales du site, reprises de la configuration WordPress d'origine.
 * Les slugs sont conserves a l'identique pour ne perdre aucun referencement.
 */

export const site = {
  name: "Ostheopathie animale Toulouse",
  practitioner: "Marie Salabert",
  tagline: "La santé de vos animaux par l'ostéopathie",
  // A remplacer par le domaine definitif au moment de la mise en production
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://osteopathie-animale.fr",
  locale: "fr_FR",
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
  /* Page de contact, distincte de la prise de rendez-vous : on y ecrit pour
     une question, un devis, un partenariat. Le bouton dore de l'en-tete mene
     toujours a la prise de rendez-vous, l'entree « Contact » du menu ici. */
  contact: "/contact",
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

/**
 * Sous-menu de « Consultations » : une entree par famille d'animaux.
 *
 * Les libelles ne sont pas repris ici : ils viennent de `consultations.sommaire`
 * dans les dictionnaires, ou ils servent deja aux cartes d'aiguillage. Une seule
 * source, donc aucun risque de divergence entre le menu et la page.
 */
export const sousMenuConsultations = [
  routes.equides,
  routes.compagnie,
  routes.rente,
] as const;

/**
 * `cle` renvoie vers l'entree correspondante de `nav` dans les dictionnaires.
 *
 * « Infos » regroupe les actualites et Symbiosteo, qui occupaient chacun une
 * entree de premier niveau : deux rubriques editoriales sous un meme chapeau.
 * Le lien du parent mene aux actualites, pour qu'un clic direct aboutisse.
 */
export const mainNav = [
  { cle: "accueil", href: routes.home },
  { cle: "aPropos", href: routes.about },
  { cle: "consultations", href: routes.consultations },
  { cle: "faq", href: routes.faq },
  { cle: "galerie", href: routes.gallery },
  { cle: "infos", href: routes.news },
  { cle: "contact", href: routes.contact },
] as const;

/** Sous-menu de « Infos ». */
export const sousMenuInfos = [routes.news, routes.symbiosteo] as const;

export const headerCta = {
  label: "Prendre un rendez-vous",
  href: routes.rendezVous,
} as const;

/**
 * Liens du footer. Sur l'original, « A propos » et « Contact » pointaient vers
 * /a-propos/ et /contact/ qui renvoyaient une 404 : corriges vers les vraies pages.
 */
export const footerNav = [
  { cle: "aPropos", href: routes.about },
  { cle: "contact", href: routes.contact },
  { cle: "cookies", href: routes.cookies },
  { cle: "mentions", href: routes.legal },
  { cle: "confidentialite", href: routes.privacy },
] as const;

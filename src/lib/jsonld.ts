/**
 * Donnees structurees schema.org, en un graphe relie par identifiants.
 *
 * La praticienne (Person), son activite (ProfessionalService) et le site
 * (WebSite) sont declares une fois, dans le gabarit ; les articles et les
 * pages d'especes y renvoient par `@id`. Moteurs de recherche et assistants IA
 * comprennent ainsi qui exerce, avec quelle reconnaissance et ou.
 *
 * Type `ProfessionalService` et non `VeterinaryCare` : ce dernier designe un
 * cabinet veterinaire, ce que la praticienne n'est pas — l'osteopathie animale
 * est encadree par l'Ordre des veterinaires mais exercee hors du titre.
 */
import { cheminLocalise, localeTags, type Locale } from "@/i18n/config";
import { routes, site } from "./site";

export const ID_PERSONNE = `${site.url}/#marie-salabert`;
export const ID_CABINET = `${site.url}/#cabinet`;
export const ID_SITE = `${site.url}/#site`;

const absolue = (chemin: string) => new URL(chemin, site.url).toString();

/** Departements d'intervention reguliere, plus les tournees. */
const zones = [
  ...[
    "Haute-Garonne",
    "Tarn",
    "Tarn-et-Garonne",
    "Lot-et-Garonne",
    "Lot",
    "Gers",
    "Gironde",
    "Aveyron",
    "Ariège",
    "Aude",
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
  { "@type": "AdministrativeArea", name: "Guyane" },
  { "@type": "Country", name: "Italie" },
];

export function grapheSite(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": ID_PERSONNE,
        name: site.practitioner,
        jobTitle: "Ostéopathe animalier",
        image: absolue("/images/2026/10/parcours/parcours-1.jpg"),
        url: absolue(cheminLocalise(routes.about, locale)),
        worksFor: { "@id": ID_CABINET },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "Inscription au Registre National d'Aptitude (RNA), numéro OA 801",
          credentialCategory: "Registre professionnel",
          url: absolue(routes.certification),
          recognizedBy: {
            "@type": "Organization",
            name: "Conseil National de l'Ordre des Vétérinaires",
            url: "https://www.veterinaire.fr",
          },
        },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Université de Haute-Alsace" },
        ],
        knowsAbout: [
          "Ostéopathie animale",
          "Ostéopathie équine",
          "Ostéopathie canine et féline",
          "Ostéopathie des NAC",
          "Ostéopathie des animaux d'élevage",
          "Approche crânienne",
          "Approche viscérale et fasciale",
        ],
        sameAs: [site.social.linkedin, site.social.facebook, site.social.instagram],
      },
      {
        "@type": "ProfessionalService",
        "@id": ID_CABINET,
        name: `${site.practitioner} — Ostéopathie Animale`,
        description,
        url: absolue(cheminLocalise("/", locale)),
        logo: absolue("/images/2024/05/logo-marie-salabert-osteopathie-animale.png"),
        image: absolue("/images/partage/osteopathie-animale-toulouse.jpg"),
        telephone: "+33637880073",
        email: site.email,
        founder: { "@id": ID_PERSONNE },
        employee: { "@id": ID_PERSONNE },
        // Praticienne itinerante : une zone d'intervention plutot qu'une adresse
        // precise, reservee aux mentions legales a sa demande.
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toulouse",
          addressRegion: "Occitanie",
          addressCountry: site.address.country,
        },
        areaServed: zones,
        paymentAccepted: "Chèque, virement, espèces",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "prise de rendez-vous",
            telephone: "+33679749777",
            availableLanguage: ["fr", "en", "it"],
          },
        ],
        sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": ID_SITE,
        name: site.name,
        url: site.url,
        inLanguage: localeTags[locale],
        publisher: { "@id": ID_CABINET },
      },
    ],
  };
}

/** Fil d'Ariane : chaque etape est un couple libelle / chemin non localise. */
export function filAriane(locale: Locale, etapes: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: absolue(cheminLocalise(e.chemin, locale)),
    })),
  };
}

/** Prestation d'une page d'espece, rattachee au cabinet. */
export function prestation(
  locale: Locale,
  p: { nom: string; description: string; chemin: string; animaux: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.nom,
    serviceType: "Ostéopathie animale",
    description: p.description,
    url: absolue(cheminLocalise(p.chemin, locale)),
    provider: { "@id": ID_CABINET },
    areaServed: zones,
    audience: { "@type": "Audience", audienceType: p.animaux },
  };
}

/** Balise script JSON-LD, echappee contre une fermeture de balise prematuree. */
export function jsonLdHtml(donnees: unknown) {
  return { __html: JSON.stringify(donnees).replace(/</g, "\\u003c") };
}

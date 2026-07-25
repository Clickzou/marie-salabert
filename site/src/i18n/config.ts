/**
 * Configuration des langues du site.
 *
 * Le francais reste servi a la racine (`/faq`) : les URLs d'origine, heritees
 * de WordPress, sont conservees pour ne perdre aucun referencement. Les autres
 * langues sont prefixees (`/en/faq`, `/it/faq`), avec les memes segments afin
 * qu'un lien reste valable d'une langue a l'autre.
 */

export const locales = ["fr", "en", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Libelles affiches dans le selecteur de langue. */
export const localeLabels: Record<Locale, { court: string; long: string }> = {
  fr: { court: "FR", long: "Français" },
  en: { court: "EN", long: "English" },
  it: { court: "IT", long: "Italiano" },
};

/** Code de langue complet, pour l'attribut `lang` et les balises Open Graph. */
export const localeTags: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  it: "it-IT",
};

export function estLocale(valeur: string): valeur is Locale {
  return (locales as readonly string[]).includes(valeur);
}

/**
 * Prefixe une route interne de la langue courante.
 * `/faq` -> `/faq` en francais, `/en/faq` en anglais.
 */
export function cheminLocalise(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href;
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Retire le prefixe de langue d'un chemin : `/en/faq` -> `/faq`. */
export function cheminSansLocale(pathname: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

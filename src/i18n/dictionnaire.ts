import "server-only";
import type { Locale } from "./config";
import fr from "./dictionnaires/fr.json";
import en from "./dictionnaires/en.json";
import it from "./dictionnaires/it.json";

/**
 * Dictionnaires de traduction.
 *
 * Le francais fait foi : les autres langues sont fusionnees par-dessus, si
 * bien qu'une cle non encore traduite s'affiche en francais plutot que de
 * casser la page. Tout est resolu au rendu serveur, rien n'est envoye au
 * navigateur.
 */

export type Dictionnaire = typeof fr;

/** Version partielle et recursive du dictionnaire francais. */
type PartielProfond<T> = {
  [K in keyof T]?: T[K] extends object ? PartielProfond<T[K]> : T[K];
};

const sources: Record<Locale, PartielProfond<Dictionnaire>> = {
  fr,
  en: en as PartielProfond<Dictionnaire>,
  it: it as PartielProfond<Dictionnaire>,
};

function estObjet(valeur: unknown): valeur is Record<string, unknown> {
  return typeof valeur === "object" && valeur !== null && !Array.isArray(valeur);
}

/** Fusionne la traduction par-dessus le francais, cle a cle. */
function fusionner<T>(base: T, surcouche: unknown): T {
  if (surcouche === undefined || surcouche === null) return base;
  if (!estObjet(base) || !estObjet(surcouche)) return surcouche as T;

  const resultat: Record<string, unknown> = { ...base };
  for (const [cle, valeur] of Object.entries(surcouche)) {
    resultat[cle] = fusionner((base as Record<string, unknown>)[cle], valeur);
  }
  return resultat as T;
}

export function getDictionnaire(locale: Locale): Dictionnaire {
  return locale === "fr" ? fr : fusionner(fr, sources[locale]);
}

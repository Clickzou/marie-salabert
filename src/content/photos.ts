/**
 * Photos du parcours personnel, choisies par la praticienne (retour V2).
 *
 * Elles defilent sur l'accueil et sur la page des actualites. La photo au
 * micro est conservee, mais pas en premier : c'est sa demande. Les textes
 * alternatifs sont dans `accueil.parcours.photosAlt`, dans le meme ordre.
 */
export const photosParcours = [
  ...Array.from({ length: 10 }, (_, i) => `/images/2026/10/parcours/parcours-${i + 1}.jpg`),
  "/images/2023/05/marie-salabert.jpg",
] as const;

/** Couvertures des ouvrages fondateurs, pour la partie « Histoire » d'A propos. */
export const livresHistoire = Array.from(
  { length: 7 },
  (_, i) => `/images/2026/10/histoire/livre-${i + 1}.jpg`,
);

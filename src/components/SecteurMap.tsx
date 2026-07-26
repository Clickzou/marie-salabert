"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

/**
 * Carte du secteur d'intervention : fonds de plan OpenStreetMap via Leaflet.
 *
 * Choisi plutot que l'iframe Google Maps, qui n'accepte qu'un seul point et
 * depose des cookies : ici les marqueurs sont libres et aucune donnee n'est
 * stockee sur le poste du visiteur (le fond de carte reste une requete tierce).
 */

type Lieu = {
  nom: string;
  detail: string;
  position: [number, number];
  /** trace SVG de l'icone, sur une grille 24x24 */
  icone: string;
  couleur: "plum" | "green";
};

const COULEURS = {
  plum: { fond: "#933a50", ombre: "rgba(147,58,80,0.45)" },
  green: { fond: "#2f7f64", ombre: "rgba(47,127,100,0.45)" },
} as const;

/** Centre du secteur : ~1h45 de route autour de Toulouse. */
const TOULOUSE: [number, number] = [43.6045, 1.444];
const RAYON_METRES = 105_000;

type Point = { nom: string; position: [number, number] };

/** Prune de la marque pour les passages reguliers, bleu pour les ponctuels. */
const POINT_REGULIER = "#933a50";
const POINT_PONCTUEL = "#1d4ea6";

/**
 * Passages reguliers, dans le rayon d'environ 1h45 autour de Toulouse.
 * Affiches en petits points, sans etiquette permanente : le nom apparait au
 * survol pour ne pas surcharger la carte.
 */
const PASSAGES_REGULIERS: readonly Point[] = [
  { nom: "Toulouse", position: [43.6045, 1.444] },
  { nom: "Castelnau d'Estrétefonds", position: [43.7833, 1.35] },
  { nom: "Balma", position: [43.6111, 1.5] },
  { nom: "Fronton", position: [43.8386, 1.3714] },
  { nom: "Grenade", position: [43.7714, 1.2939] },
  { nom: "Blagnac", position: [43.6333, 1.3936] },
  { nom: "L'Union", position: [43.6539, 1.4903] },
  { nom: "Graulhet", position: [43.7594, 1.9906] },
  { nom: "Villeneuve-sur-Lot", position: [44.4081, 0.7031] },
  { nom: "Agen", position: [44.2032, 0.6167] },
  { nom: "Castelsarrasin", position: [44.0403, 1.1069] },
  { nom: "Beaumont-de-Lomagne", position: [43.8836, 0.9878] },
  { nom: "Caylus", position: [44.2372, 1.7739] },
  { nom: "Montauban", position: [44.0181, 1.355] },
  { nom: "Muret", position: [43.4611, 1.3269] },
  { nom: "Léguevin", position: [43.6, 1.2333] },
  { nom: "L'Isle-Jourdain", position: [43.6144, 1.0817] },
  { nom: "Nailloux", position: [43.3547, 1.6297] },
  { nom: "Saint-Orens-de-Gameville", position: [43.5522, 1.5308] },
  { nom: "Labège", position: [43.5442, 1.515] },
  { nom: "Villefranche-de-Rouergue", position: [44.3525, 2.035] },
  { nom: "Gaillac", position: [43.9014, 1.8975] },
  { nom: "Lavaur", position: [43.6989, 1.8175] },
  { nom: "Saint-Sulpice-la-Pointe", position: [43.7719, 1.6839] },
  { nom: "Castelginest", position: [43.6919, 1.4256] },
  { nom: "Tournefeuille", position: [43.5847, 1.3444] },
  { nom: "Plaisance-du-Touch", position: [43.5675, 1.2942] },
];

/**
 * Passages ponctuels, au-dela du rayon d'1h45. Ils sortent du cercle prune :
 * une seconde couleur evite de laisser croire a une desserte reguliere.
 */
const PASSAGES_PONCTUELS: readonly Point[] = [
  { nom: "Bordeaux", position: [44.8378, -0.5792] },
  { nom: "Mont-de-Marsan", position: [43.8907, -0.4996] },
  { nom: "Langon", position: [44.5533, -0.2447] },
  { nom: "Cahors", position: [44.4475, 1.4406] },
  { nom: "Prayssac", position: [44.5061, 1.1936] },
  { nom: "Biron (Dordogne)", position: [44.6317, 0.8722] },
];

const LIEUX: readonly Lieu[] = [
  {
    nom: "Toulouse et sa région",
    detail: "Consultations à domicile, environ 1h45 de route autour de Toulouse",
    position: TOULOUSE,
    // maison
    icone: "M4 11l8-6 8 6M6 10v9h12v-9M10 19v-5h4v5",
    couleur: "plum",
  },
  {
    nom: "Clinique vétérinaire du Val Dadou",
    detail: "Graulhet (81) — tous les vendredis après-midi",
    position: [43.7594, 1.9906],
    // croix vétérinaire
    icone: "M10 3h4v5h5v4h-5v5h-4v-5H5V8h5V3z",
    couleur: "green",
  },
];

export default function SecteurMap({
  className = "h-[340px] sm:h-[460px]",
  legende,
}: {
  className?: string;
  /** Les deux lignes de legende ; sans elles, la carte est affichee seule. */
  legende?: { reguliers: string; ponctuels: string };
}) {
  const conteneur = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;

    let carte: import("leaflet").Map | undefined;
    let annule = false;

    // import differe : Leaflet lit `window` des son evaluation, donc jamais au rendu serveur
    (async () => {
      const L = (await import("leaflet")).default;
      if (annule || !conteneur.current) return;

      carte = L.map(el, {
        center: [43.68, 1.6],
        zoom: 7,
        // la molette fait defiler la page, le zoom se fait aux boutons ou au pincement
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(carte);

      L.circle(TOULOUSE, {
        radius: RAYON_METRES,
        color: "#933a50",
        weight: 1.5,
        opacity: 0.55,
        fillColor: "#933a50",
        fillOpacity: 0.08,
      }).addTo(carte);

      /* petits points des passages, sous les deux marqueurs principaux */
      const poser = (points: readonly Point[], couleur: string) =>
        points.forEach((point) => {
          L.circleMarker(point.position, {
            radius: 5,
            color: "#fff",
            weight: 1.5,
            fillColor: couleur,
            fillOpacity: 0.9,
          })
            .addTo(carte!)
            .bindTooltip(point.nom, { direction: "top", offset: [0, -6] });
        });

      poser(PASSAGES_REGULIERS, POINT_REGULIER);
      poser(PASSAGES_PONCTUELS, POINT_PONCTUEL);

      LIEUX.forEach((lieu) => {
        const couleur = COULEURS[lieu.couleur];
        const icone = L.divIcon({
          className: "",
          html: `<span style="display:grid;place-items:center;width:38px;height:38px;border-radius:9999px;background:${couleur.fond};box-shadow:0 8px 18px -6px ${couleur.ombre};border:2px solid #fff">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${lieu.icone}"/></svg>
            </span>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
          popupAnchor: [0, -18],
        });

        L.marker(lieu.position, { icon: icone, title: lieu.nom })
          .addTo(carte!)
          .bindPopup(
            `<strong style="color:${couleur.fond}">${lieu.nom}</strong><br>${lieu.detail}`,
          );
      });
    })();

    return () => {
      annule = true;
      carte?.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={conteneur}
        role="application"
        aria-label="Carte du secteur d'intervention autour de Toulouse"
        className={`w-full ${className}`}
      />

      {/* Chaque ligne porte une pastille de la couleur reelle du point : le
          lecteur voit la teinte sans dependre du mot qui la nomme. */}
      {legende && (
        <ul className="space-y-2.5 border-t border-ink/10 bg-white px-5 py-4">
          {[
            { couleur: POINT_REGULIER, texte: legende.reguliers },
            { couleur: POINT_PONCTUEL, texte: legende.ponctuels },
          ].map((ligne) => (
            <li key={ligne.couleur} className="flex items-start gap-3 text-[14px] leading-relaxed text-body">
              <span
                aria-hidden="true"
                className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white"
                style={{ backgroundColor: ligne.couleur }}
              />
              {ligne.texte}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

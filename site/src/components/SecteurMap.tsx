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

export default function SecteurMap({ className = "h-[340px] sm:h-[460px]" }: { className?: string }) {
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
    <div
      ref={conteneur}
      role="application"
      aria-label="Carte du secteur d'intervention autour de Toulouse"
      className={`w-full ${className}`}
    />
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Diaporama en fondu, dans un cadre de format fixe : les photos defilent
 * seules toutes les `intervalle` millisecondes. Des pastilles permettent de
 * choisir une vue ; le defilement s'arrete alors, et il ne demarre pas du tout
 * si le visiteur a demande a reduire les animations.
 *
 * `ajustement` : « cover » recadre pour remplir le cadre (photos), « contain »
 * montre l'image entiere sur le fond du cadre (couvertures de livres).
 */
export function Diaporama({
  photos,
  libelle,
  intervalle = 4500,
  ajustement = "cover",
  sizes,
  className = "",
}: {
  photos: readonly { src: string; alt: string }[];
  /** nom du groupe de pastilles, lu par les lecteurs d'ecran */
  libelle: string;
  intervalle?: number;
  ajustement?: "cover" | "contain";
  sizes: string;
  className?: string;
}) {
  const [courante, setCourante] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setCourante((i) => (i + 1) % photos.length), intervalle);
    return () => window.clearInterval(id);
  }, [auto, intervalle, photos.length]);

  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={i === 0}
            aria-hidden={i !== courante}
            className={`transition-opacity duration-1000 ${
              ajustement === "contain" ? "object-contain p-6" : "object-cover"
            } ${i === courante ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      {photos.length > 1 && (
        <div role="group" aria-label={libelle} className="mt-4 flex flex-wrap justify-center gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => {
                setAuto(false);
                setCourante(i);
              }}
              aria-label={`${i + 1} / ${photos.length}`}
              aria-current={i === courante}
              className="grid h-6 w-6 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === courante ? "w-5 bg-plum" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

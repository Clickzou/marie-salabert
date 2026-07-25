"use client";

import Image from "next/image";
import { useCarrousel } from "./useCarrousel";

export type PhotoCarrousel = {
  src: string;
  alt: string;
  largeur: number;
  hauteur: number;
};

/**
 * Carrousel de photos pleine largeur d'ecran.
 *
 * Les vues sont larges et laissent depasser la suivante : on comprend au premier
 * coup d'oeil qu'il y a autre chose a droite, sans avoir besoin d'une consigne.
 * Le defilement reste natif — glisser au doigt, molette horizontale, tabulation —
 * les fleches et le defilement automatique ne font que s'y ajouter (voir
 * `useCarrousel` pour les regles de suspension et d'arret).
 */
export function CarrouselPhotos({
  photos,
  libelles,
}: {
  photos: readonly PhotoCarrousel[];
  libelles: { titre: string; precedent: string; suivant: string };
}) {
  const { debut, fin, defiler, reprendreLaMain, proprietesPiste, proprietesConteneur } =
    useCarrousel();

  return (
    <div {...proprietesConteneur}>
      {/* Le rembourrage lateral reprend celui du conteneur « full » du site : la
          premiere vue s'aligne sur le texte des sections, les suivantes filent
          vers le bord de l'ecran.

          `scroll-pl-*` doit reprendre la meme valeur que `pl-*` : sans lui, un
          point d'accroche `snap-start` se cale sur le bord de la piste et non sur
          celui du contenu, si bien que le premier cliche vient plaquer contre le
          bord de l'ecran des le premier accrochage. */}
      <ul
        {...proprietesPiste}
        tabIndex={0}
        aria-label={libelles.titre}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum sm:gap-6 sm:scroll-pl-10 sm:px-10 lg:scroll-pl-[100px] lg:px-[100px]"
      >
        {photos.map((photo) => (
          <li
            key={photo.src}
            className="group/media w-[86%] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[62%] lg:w-[46%]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.largeur}
              height={photo.hauteur}
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 46vw"
              className="img-zoom aspect-[3/2] w-full object-cover"
            />
          </li>
        ))}
      </ul>

      {/* Seules les fleches subsistent : pas de commande de lecture/pause a
          l'ecran. Le defilement se suspend au survol et au focus, et s'arrete
          pour de bon des la premiere action manuelle. */}
      <div className="mt-8 flex items-center justify-end gap-3 px-5 sm:px-10 lg:px-[100px]">
        {[
          { d: "M15 6l-6 6 6 6", label: libelles.precedent, sens: -1 as const, inactif: debut },
          { d: "M9 6l6 6-6 6", label: libelles.suivant, sens: 1 as const, inactif: fin },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => {
              reprendreLaMain();
              defiler(b.sens);
            }}
            aria-label={b.label}
            disabled={b.inactif}
            className="grid h-14 w-14 place-items-center rounded-full bg-green text-white shadow-[0_14px_30px_-16px_rgba(22,23,26,0.9)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-green-light disabled:pointer-events-none disabled:bg-ink/15 disabled:text-white/70 disabled:shadow-none"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={b.d} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

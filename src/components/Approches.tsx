"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCarrousel } from "./useCarrousel";

/**
 * « Les 6 approches en osteopathie animale » (accueil) : carrousel horizontal
 * de cartes illustrees. Defilement natif (glisser au doigt, molette horizontale, clavier)
 * avec accroche par carte ; les fleches font defiler d'une carte.
 *
 * Le comportement du defilement automatique — et les conditions dans lesquelles
 * il se suspend ou s'arrete — vit dans `useCarrousel`, partage avec le carrousel
 * de photos de l'accueil.
 *
 * Chaque carte porte une mosaique des photos de seance choisies par la
 * praticienne pour cette approche (trois ou quatre, d'especes differentes). Elles
 * remplacent les visuels generes par IA de la premiere version.
 */
export function Approches({
  items,
  libelles,
}: {
  items: readonly { title: string; body: ReactNode; photos: readonly { src: string; alt: string }[] }[];
  libelles: { faitesDefiler: string; precedente: string; suivante: string };
}) {
  const { debut, fin, defiler, reprendreLaMain, proprietesPiste, proprietesConteneur } =
    useCarrousel();

  return (
    <div className="mt-16" {...proprietesConteneur}>
      <ul
        {...proprietesPiste}
        tabIndex={0}
        aria-label={libelles.faitesDefiler}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
      >
        {items.map((item, i) => (
          <li
            key={item.title}
            className="card card-hover flex w-[86%] shrink-0 snap-start flex-col overflow-hidden sm:w-[48%] xl:w-[calc(33.333%-1rem)]"
          >
            <Mosaique photos={item.photos} />
            <div className="flex flex-1 flex-col p-8 sm:p-9">
              <span
                aria-hidden="true"
                className="text-[13px] font-semibold tracking-[0.18em] text-plum/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[21px] leading-snug text-ink">{item.title}</h3>
              <span aria-hidden="true" className="mt-6 block h-px w-8 bg-green/60" />
              <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-body">
                {item.body}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-6">
        <p className="text-[14px] text-muted">{libelles.faitesDefiler}</p>
        {/* Fleches pleines et genereuses : elles doivent se voir au premier coup
            d'oeil. Pas de commande de lecture/pause a l'ecran : le defilement se
            suspend au survol et au focus, et s'arrete pour de bon des la
            premiere action manuelle. */}
        <div className="flex items-center gap-3">
          {[
            { d: "M15 6l-6 6 6 6", label: libelles.precedente, sens: -1 as const, inactif: debut },
            { d: "M9 6l6 6-6 6", label: libelles.suivante, sens: 1 as const, inactif: fin },
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
    </div>
  );
}

/**
 * Quatre photos : grille 2 x 2. Trois photos : la premiere occupe toute la
 * hauteur a gauche, les deux autres s'empilent a droite. Le cadre reste au
 * format 4/3 des cartes ; chaque vignette est recadree un peu au-dessus du
 * centre, ou se trouvent le plus souvent la tete de l'animal et les mains.
 */
function Mosaique({ photos }: { photos: readonly { src: string; alt: string }[] }) {
  const trois = photos.length === 3;
  return (
    <div className="grid aspect-[4/3] grid-cols-2 grid-rows-2 gap-1 overflow-hidden">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`relative overflow-hidden ${trois && i === 0 ? "row-span-2" : ""}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 43vw, (max-width: 1280px) 24vw, 17vw"
            className="img-zoom object-cover object-[50%_30%]"
          />
        </div>
      ))}
    </div>
  );
}

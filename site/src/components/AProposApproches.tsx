"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * « Les differentes approches en osteopathie » : carrousel horizontal de cartes
 * illustrees. Defilement natif (glisser au doigt, molette horizontale, clavier)
 * avec accroche par carte ; les fleches font defiler d'une carte.
 *
 * Les visuels ont ete generes avec fal.ai (voir scripts/gen-approches-images.mjs) :
 * gros plans de mains, sans visage, pour illustrer chaque technique.
 */
export function AProposApproches({
  items,
  libelles,
}: {
  items: readonly { title: string; body: ReactNode; image?: string; alt?: string }[];
  libelles: { faitesDefiler: string; precedente: string; suivante: string };
}) {
  const piste = useRef<HTMLUListElement | null>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  const majBornes = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    setDebut(el.scrollLeft < 8);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    majBornes();
    const el = piste.current;
    if (!el) return;
    window.addEventListener("resize", majBornes);
    return () => window.removeEventListener("resize", majBornes);
  }, [majBornes]);

  const defiler = (sens: 1 | -1) => {
    const el = piste.current;
    if (!el) return;
    const carte = el.querySelector("li");
    const pas = carte ? carte.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: sens * pas, behavior: "smooth" });
  };

  return (
    <div className="mt-16">
      <ul
        ref={piste}
        onScroll={majBornes}
        tabIndex={0}
        aria-label={libelles.faitesDefiler}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
      >
        {items.map((item, i) => (
          <li
            key={item.title}
            className="card card-hover flex w-[86%] shrink-0 snap-start flex-col overflow-hidden sm:w-[48%] xl:w-[calc(33.333%-1rem)]"
          >
            {item.image && (
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt ?? ""}
                  width={1024}
                  height={768}
                  sizes="(max-width: 768px) 86vw, (max-width: 1280px) 48vw, 33vw"
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
              </div>
            )}
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
        {/* Fleches pleines et genereuses : elles doivent se voir au premier coup d'oeil */}
        <div className="flex items-center gap-3">
          {[
            { d: "M15 6l-6 6 6 6", label: libelles.precedente, sens: -1 as const, inactif: debut },
            { d: "M9 6l6 6-6 6", label: libelles.suivante, sens: 1 as const, inactif: fin },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => defiler(b.sens)}
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

"use client";

import { useEffect, useState } from "react";

type Lien = { href: string; label: string };

/**
 * Sommaire flottant, cale a droite et centre verticalement : une pastille par
 * section, avec le libelle qui apparait au survol. La pastille active suit le
 * defilement (IntersectionObserver). Masque en dessous de lg, ou la barre
 * prendrait trop de place.
 */
export default function SommaireFlottant({ liens }: { liens: readonly Lien[] }) {
  const [actif, setActif] = useState(liens[0]?.href ?? "");

  useEffect(() => {
    const cibles = liens
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (cibles.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActif(`#${visible.target.id}`);
      },
      // la section « active » est celle qui occupe le milieu de l'ecran
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    cibles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [liens]);

  return (
    <nav
      aria-label="Sommaire de la page"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-5">
        {liens.map((lien) => {
          const courant = lien.href === actif;
          return (
            <li key={lien.href}>
              <a
                href={lien.href}
                aria-current={courant ? "true" : undefined}
                className="group flex items-center justify-end gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
              >
                <span
                  className={`translate-x-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap opacity-0 shadow-[0_10px_24px_-14px_rgba(22,23,26,0.6)] ring-1 ring-line transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                    courant ? "text-plum" : "text-body"
                  }`}
                >
                  {lien.label}
                </span>
                <span
                  aria-hidden="true"
                  /* pastille active : coeur prune cercle de blanc, pour rester
                     lisible aussi bien sur fond clair que sur les bandeaux prune */
                  className={`block rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    courant
                      ? "h-3 w-3 bg-plum ring-[3px] ring-white shadow-[0_0_0_1px_rgba(22,23,26,0.15)]"
                      : "h-2.5 w-2.5 bg-white ring-1 ring-ink/25 group-hover:bg-plum/40 group-hover:ring-white"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

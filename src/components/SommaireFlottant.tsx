"use client";

import { useEffect, useState } from "react";

type Lien = { href: string; label: string };

/**
 * Sommaire flottant, cale a droite et centre verticalement : une pastille par
 * section, chacune accompagnee de son libelle. La pastille active suit le
 * defilement (IntersectionObserver).
 *
 * Les libelles restent affiches en permanence : des pastilles nues n'annoncent
 * pas ou elles menent, et il fallait survoler chacune pour le decouvrir. Ils
 * gardent leur pastille blanche, qui les rend lisibles aussi bien sur fond clair
 * que par-dessus les bandeaux prune.
 *
 * Masque en dessous de xl : plus bas, la colonne de libelles viendrait mordre
 * sur le contenu, que le sommaire est cense accompagner et non recouvrir.
 */
export default function SommaireFlottant({ liens }: { liens: readonly Lien[] }) {
  const [actif, setActif] = useState(liens[0]?.href ?? "");
  const [visible, setVisible] = useState(false);

  /* Le sommaire n'a rien a annoncer tant que la banniere occupe l'ecran : il
     n'apparait qu'une fois le haut de la premiere section arrive a mi-hauteur,
     et se retire si l'on remonte au-dessus.

     Lecture directe de la position plutot qu'un IntersectionObserver : celui-ci
     ne se declenche qu'aux franchissements de seuil, et un saut instantane —
     retour en haut de page, clic sur une ancre — traverse la zone sans qu'aucun
     franchissement soit observe. Le sommaire restait alors affiche au-dessus de
     sa section. Le calcul est cadence par `requestAnimationFrame` : au plus une
     mesure par image, quel que soit le debit des evenements de defilement. */
  useEffect(() => {
    const premier = liens[0] && document.querySelector<HTMLElement>(liens[0].href);
    if (!premier) return;

    let image = 0;
    const mesurer = () => {
      image = 0;
      setVisible(premier.getBoundingClientRect().top < window.innerHeight * 0.5);
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    return () => {
      if (image) cancelAnimationFrame(image);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
    };
  }, [liens]);

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
      /* `invisible` en plus de l'opacite : un bloc simplement transparent
         resterait cliquable et capterait les survols par-dessus le contenu. */
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:block ${
        visible ? "translate-x-0 opacity-100" : "invisible translate-x-4 opacity-0"
      }`}
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
                  className={`rounded-full bg-white px-3.5 py-1.5 text-[12px] whitespace-nowrap shadow-[0_10px_24px_-14px_rgba(22,23,26,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-plum group-hover:ring-plum/30 ${
                    courant
                      ? "font-semibold text-plum ring-1 ring-plum/25"
                      : "font-medium text-body ring-1 ring-line"
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

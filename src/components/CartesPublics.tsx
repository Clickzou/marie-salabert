"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import Reveal from "./Reveal";

export type PublicCarte = {
  sousTitre: string;
  titre: string;
  alt: string;
  indications: readonly string[];
};

/** Nombre d'indications affichees d'emblee ; les suivantes sont repliees. */
const VISIBLES = 3;

/** Ligne d'indication : puce discrete plutot qu'une coche, les listes etant longues. */
function Indication({ children }: { children: string }) {
  return (
    <li className="flex gap-3.5 text-[14.5px] leading-relaxed text-body">
      <span
        aria-hidden="true"
        className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-plum/45"
      />
      <span>{children}</span>
    </li>
  );
}

/**
 * « L'osteopathie animale, pour qui ? » : trois cartes illustrees dont les
 * listes d'indications sont repliees au-dela de trois lignes.
 *
 * Sur ordinateur, les trois cartes s'ouvrent et se referment ensemble : cote a
 * cote, deplier une seule colonne desequilibre la rangee et oblige a cliquer
 * trois fois pour comparer. En dessous de `lg` les cartes sont empilees, chacune
 * garde donc sa propre commande — synchroniser ferait sauter le contenu hors de
 * l'ecran.
 *
 * Les indications repliees sont toujours presentes dans le document, seulement
 * masquees : elles restent indexables et trouvables par la recherche du
 * navigateur, comme avec un `<details>` natif.
 */
export function CartesPublics({
  items,
  photos,
  libelles,
}: {
  items: readonly PublicCarte[];
  photos: readonly string[];
  libelles: { voirAutres: string; reduire: string };
}) {
  const idBase = useId();
  const [ouverts, setOuverts] = useState<boolean[]>(() => items.map(() => false));
  const [ensemble, setEnsemble] = useState(false);

  /* `lg` du systeme de grille : au-dela, les cartes sont en rangee. */
  useEffect(() => {
    const requete = window.matchMedia("(min-width: 1024px)");
    const maj = () => setEnsemble(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);

  const basculer = (index: number) =>
    setOuverts((precedent) => {
      const cible = !precedent[index];
      return ensemble ? precedent.map(() => cible) : precedent.map((v, i) => (i === index ? cible : v));
    });

  return (
    <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
      {items.map((p, idx) => {
        const visibles = p.indications.slice(0, VISIBLES);
        const repliees = p.indications.slice(VISIBLES);
        const ouvert = ouverts[idx];
        const idListe = `${idBase}-${idx}`;

        return (
          <Reveal
            as="li"
            key={p.titre}
            delay={idx * 140}
            className="card card-hover group/media flex flex-col overflow-hidden border-transparent bg-white"
          >
            <div className="overflow-hidden">
              <Image
                src={photos[idx]}
                alt={p.alt}
                width={1024}
                height={768}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="img-zoom aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-8 sm:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                {p.sousTitre}
              </p>
              <h3 className="mt-3 text-[24px] leading-snug text-plum">{p.titre}</h3>

              <ul className="mt-7 space-y-3.5">
                {visibles.map((item) => (
                  <Indication key={item}>{item}</Indication>
                ))}
              </ul>

              {repliees.length > 0 && (
                <>
                  {/* La commande suit immediatement la liste. Elle etait calee en
                      bas de carte pour aligner les trois : la carte la plus
                      courte y gagnait un large vide blanc. */}
                  <button
                    type="button"
                    onClick={() => basculer(idx)}
                    aria-expanded={ouvert}
                    aria-controls={idListe}
                    className="mt-6 inline-flex items-center gap-2 self-start text-[13px] font-medium tracking-wide text-plum transition-colors hover:text-plum-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
                  >
                    {ouvert
                      ? libelles.reduire
                      : libelles.voirAutres.replace("{n}", String(repliees.length))}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        ouvert ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <ul id={idListe} hidden={!ouvert} className="mt-3.5 space-y-3.5">
                    {repliees.map((item) => (
                      <Indication key={item}>{item}</Indication>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

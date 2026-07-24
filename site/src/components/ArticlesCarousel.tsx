"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

/**
 * Carrousel horizontal d'articles : defilement natif avec accroche par carte
 * (glisser au doigt, molette, clavier) et fleches pleines pour naviguer.
 * Meme mecanique que le carrousel des approches, sur la page A propos.
 */
export default function ArticlesCarousel({ articles }: { articles: readonly Article[] }) {
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
    <div>
      <ul
        ref={piste}
        onScroll={majBornes}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
      >
        {articles.map((article) => (
          <li
            key={article.slug}
            className="flex w-[86%] shrink-0 snap-start sm:w-[48%] xl:w-[calc(33.333%-1rem)]"
          >
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>

      {articles.length > 1 && (
        <div className="mt-8 flex items-center justify-end gap-3">
          {[
            { d: "M15 6l-6 6 6 6", label: "Article précédent", sens: -1 as const, inactif: debut },
            { d: "M9 6l6 6-6 6", label: "Article suivant", sens: 1 as const, inactif: fin },
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
      )}
    </div>
  );
}

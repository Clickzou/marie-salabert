"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  cheminLocalise,
  cheminSansLocale,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";

/**
 * Selecteur de langue de l'en-tete : bouton « FR » qui deroule les trois
 * langues. Chaque lien pointe vers la meme page dans l'autre langue, les
 * segments d'URL etant identiques d'une langue a l'autre.
 */
export default function SelecteurLangue({
  locale,
  transparent,
  etiquette,
}: {
  locale: Locale;
  transparent: boolean;
  etiquette: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const chemin = cheminSansLocale(usePathname());

  return (
    <div className="relative" onMouseLeave={() => setOuvert(false)}>
      <button
        type="button"
        /* le survol n'ouvre pas le menu : combine au clic, il le refermait
           aussitot ouvert. Un clic (ou une tape) suffit, dans les deux sens. */
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-label={etiquette}
        className={`flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-500 ${
          transparent
            ? "text-white/90 hover:text-white"
            : "text-body hover:text-plum"
        }`}
      >
        {localeLabels[locale].court}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-300 ${ouvert ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {ouvert && (
        <ul className="absolute right-0 top-full z-50 mt-1 min-w-[150px] overflow-hidden rounded-[10px] border border-line bg-white py-1 shadow-[0_18px_40px_-20px_rgba(22,23,26,0.45)]">
          {locales.map((autre) => (
            <li key={autre}>
              <Link
                href={cheminLocalise(chemin, autre)}
                hrefLang={autre}
                onClick={() => setOuvert(false)}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-[14px] transition-colors hover:bg-surface ${
                  autre === locale ? "font-medium text-plum" : "text-body"
                }`}
              >
                {localeLabels[autre].long}
                <span className="text-[12px] uppercase tracking-[0.1em] text-muted">
                  {localeLabels[autre].court}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

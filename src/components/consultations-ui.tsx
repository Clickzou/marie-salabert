import type { ReactNode } from "react";
import { CheckList } from "./sections";

/**
 * Briques de mise en page communes aux trois pages d'especes
 * (equides, animaux de compagnie, animaux de rente).
 *
 * Elles vivaient dans la page consultations, qui portait alors les trois
 * sections. Depuis leur eclatement en pages distinctes, elles sont partagees
 * ici plutot que recopiees trois fois.
 */

/** Numero + intitule en tete du bandeau d'espece. */
export function NumeroSection({ numero, label }: { numero: string; label: string }) {
  return (
    <p className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-[15px] font-semibold text-white"
      >
        {numero}
      </span>
      <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
        {label}
      </span>
    </p>
  );
}

/** Titre de sous-partie (h3) sobre, en prune. */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-[22px] leading-tight font-semibold text-plum sm:text-[26px]">
      {children}
    </h3>
  );
}

/** Carte sobre a bordure legere regroupant une liste de motifs. */
export function MotifCard({
  title,
  items,
  note,
  className,
}: {
  title: string;
  items: readonly string[];
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg border border-black/8 bg-white p-6 sm:p-8 ${className ?? ""}`}
    >
      <SubHeading>{title}</SubHeading>
      {note && <p className="mt-2 text-[14px] leading-relaxed text-muted italic">{note}</p>}
      <CheckList items={items} className="mt-5" />
    </div>
  );
}

/** Bloc « Une approche globale » : intro + liste des partenaires de soin. */
export function ApprocheGlobale({
  title,
  intro,
  items,
  conclusion,
}: {
  title: string;
  intro: string;
  items: readonly string[];
  conclusion: string;
}) {
  return (
    <div className="rounded-lg border border-plum/15 bg-plum-soft/10 p-6 sm:p-9">
      <SubHeading>{title}</SubHeading>
      <p className="mt-4 text-[15px] leading-relaxed text-body">{intro}</p>
      <CheckList items={items} className="mt-5 sm:columns-2 sm:gap-x-10 [&>li]:mb-3" />
      <p className="mt-6 text-[15px] leading-relaxed text-body">{conclusion}</p>
    </div>
  );
}

/** Retour vers la page consultations, en fin de page d'espece. */
export function RetourConsultations({ href, libelle }: { href: string; libelle: string }) {
  return (
    <p className="mt-14 border-t border-line pt-8">
      <a href={href} className="group inline-flex items-center gap-2 text-[14px] font-medium text-plum">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:-translate-x-1"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        {libelle}
      </a>
    </p>
  );
}

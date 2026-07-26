import Image from "next/image";
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

/**
 * Pictogrammes d'espece poses en tete de carte. Traces au filet, comme les
 * autres icones du site ; purement decoratifs, le titre dit deja l'espece.
 */
const pictos = {
  chien: (
    <>
      <path d="M8.2 5.6C6.9 4.7 5.2 4.6 4.2 5.8c-1.2 1.4-.9 3.7.2 5.4.7 1 1.6 1.7 2.5 2" />
      <path d="M15.8 5.6c1.3-.9 3-1 4 .2 1.2 1.4.9 3.7-.2 5.4-.7 1-1.6 1.7-2.5 2" />
      <path d="M12 4.6c-2.6 0-4.7 2-4.7 4.5v3.3c0 2.6 2.1 4.7 4.7 4.7s4.7-2.1 4.7-4.7V9.1c0-2.5-2.1-4.5-4.7-4.5Z" />
      <path d="M10.2 9.6h.01M13.8 9.6h.01" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 12.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
      <path d="M12 14.5v.8M12 15.3c-.6.6-1.5.5-1.9-.2M12 15.3c.6.6 1.5.5 1.9-.2" />
    </>
  ),
  chat: (
    <>
      <path d="M5.9 8.9 5 3.9l4.4 2.6M18.1 8.9l.9-5-4.4 2.6" />
      <path d="M12 6.2c3.6 0 6.5 2.7 6.5 6s-2.9 6-6.5 6-6.5-2.7-6.5-6 2.9-6 6.5-6Z" />
      <path d="M9.9 11.2h.01M14.1 11.2h.01" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 13.4v1M12 14.4c-.7.6-1.6.5-2.1-.2M12 14.4c.7.6 1.6.5 2.1-.2" />
      <path d="M5.5 13.4 2.4 12.9M5.5 15.1l-2.9.9M18.5 13.4l3.1-.5M18.5 15.1l2.9.9" />
    </>
  ),
} as const;

/** Carte sobre a bordure legere regroupant une liste de motifs. */
export function MotifCard({
  title,
  items,
  note,
  photo,
  picto,
  className,
}: {
  title: string;
  items: readonly string[];
  note?: string;
  /** Pictogramme d'espece pose a gauche du titre. */
  picto?: keyof typeof pictos;
  /**
   * Visuel en tete de carte, plein cadre au-dessus du titre. `position` regle
   * la zone conservee au recadrage, pour les cliches dont le sujet n'est pas
   * la ou le cadrage par defaut le cherche.
   */
  photo?: {
    src: string;
    alt: string;
    largeur: number;
    hauteur: number;
    position?: string;
  };
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-black/8 bg-white ${className ?? ""}`}
    >
      {photo && (
        <div className="group/media overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.largeur}
            height={photo.hauteur}
            sizes="(max-width: 1024px) 100vw, 33vw"
            /* Cadre moins haut qu'un 4/3, et cadrage decale vers le bas : le
               sujet y est, le haut ne montrait que du decor. */
            style={{ objectPosition: photo.position ?? "center 70%" }}
            className="img-zoom aspect-[8/5] w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {picto ? (
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-plum/8 text-plum ring-1 ring-plum/15">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {pictos[picto]}
              </svg>
            </span>
            <SubHeading>{title}</SubHeading>
          </div>
        ) : (
          <SubHeading>{title}</SubHeading>
        )}
        {note && <p className="mt-2 text-[14px] leading-relaxed text-muted italic">{note}</p>}
        <CheckList items={items} className="mt-5" />
      </div>
    </div>
  );
}

/** Bloc « Une approche globale » : intro + liste des partenaires de soin. */
export function ApprocheGlobale({
  title,
  intro,
  items,
  conclusion,
  photo,
}: {
  title: string;
  intro: string;
  items: readonly string[];
  conclusion: string;
  /** Visuel d'accompagnement, en colonne de droite a partir de 1024 px. */
  photo?: { src: string; alt: string; largeur: number; hauteur: number };
}) {
  const texte = (
    <div>
      <SubHeading>{title}</SubHeading>
      <p className="mt-4 text-[15px] leading-relaxed text-body">{intro}</p>
      <CheckList
        items={items}
        className={`mt-5 sm:gap-x-10 [&>li]:mb-3 ${photo ? "sm:columns-2 lg:columns-1 xl:columns-2" : "sm:columns-2"}`}
      />
      <p className="mt-6 text-[15px] leading-relaxed text-body">{conclusion}</p>
    </div>
  );

  if (!photo) {
    return <div className="rounded-lg border border-plum/15 bg-plum-soft/10 p-6 sm:p-9">{texte}</div>;
  }

  /* Avec un visuel, la photo occupe toute la hauteur du bloc a droite : elle
     borde le texte sans le repousser, la carte garde donc sa densite. */
  return (
    <div className="grid overflow-hidden rounded-lg border border-plum/15 bg-plum-soft/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
      <div className="order-2 p-6 sm:p-9 lg:order-1">{texte}</div>
      <div className="group/media relative order-1 min-h-[240px] overflow-hidden lg:order-2 lg:min-h-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.largeur}
          height={photo.hauteur}
          sizes="(max-width: 1024px) 100vw, 360px"
          className="img-zoom absolute inset-0 h-full w-full object-cover"
        />
      </div>
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

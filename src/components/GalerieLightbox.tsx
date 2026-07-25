"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GaleriePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const SIZES = "(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw";

/** Nombre de photos affichees avant le premier « Afficher plus ». */
const PAS = 16;

/**
 * Galerie en mosaique (colonnes CSS : les formats portrait et paysage
 * s'imbriquent sans blanc) et visionneuse plein ecran (fleches, clavier,
 * fermeture au clic sur le fond, compteur).
 */
export default function GalerieLightbox({
  photos,
  libelles,
}: {
  photos: readonly GaleriePhoto[];
  libelles: {
    afficherPlus: string;
    visionneuse: string;
    fermer: string;
    photoPrecedente: string;
    photoSuivante: string;
    agrandir: string;
  };
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [visibles, setVisibles] = useState(PAS);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  const move = useCallback(
    (step: number) => {
      setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));
    },
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "Tab") {
        // piege le focus a l'interieur de la visionneuse
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, move]);

  const current = index === null ? null : photos[index];
  const affichees = photos.slice(0, visibles);

  return (
    <>
      <ul className="columns-1 gap-5 min-[480px]:columns-2 md:columns-3 xl:columns-4">
        {affichees.map((photo, i) => (
          <li key={photo.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setIndex(i);
              }}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
              aria-label={photo.alt || libelles.agrandir.replace("{i}", String(i + 1)).replace("{n}", String(photos.length))}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes={SIZES}
                priority={i < 4}
                loading={i < 4 ? undefined : "lazy"}
                className="img-zoom h-auto w-full object-cover"
              />
              {/* voile + loupe au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/25 group-hover:opacity-100"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                  </svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visibles < photos.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibles((v) => v + PAS)}
            className="inline-flex items-center gap-2 rounded-[10px] border border-ink/15 px-8 py-4 text-[15px] font-medium text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-ink/40 hover:bg-ink/[0.03]"
          >
            {libelles.afficherPlus}
            <span className="text-[13px] text-muted">
              {visibles} / {photos.length}
            </span>
          </button>
        </div>
      )}

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={libelles.visionneuse}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label={libelles.fermer}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={libelles.photoPrecedente}
            className="absolute left-4 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-ink sm:left-8"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <figure className="max-h-full">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-5 text-center text-[13px] uppercase tracking-[0.18em] text-white/70">
              {index !== null ? `${index + 1} / ${photos.length}` : null}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={libelles.photoSuivante}
            className="absolute right-4 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-ink sm:right-8"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

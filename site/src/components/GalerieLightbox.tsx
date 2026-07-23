"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GaleriePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const SIZES = "(max-width: 479px) 100vw, (max-width: 767px) 50vw, 25vw";

/**
 * Grille de la page « galerie » (4 colonnes >= 768px, 2 colonnes >= 480px, 1 colonne
 * en dessous, gouttiere de 30px et coins arrondis a 30px comme sur l'original)
 * et visionneuse plein ecran reprenant la lightbox Elementor.
 */
export default function GalerieLightbox({ photos }: { photos: readonly GaleriePhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
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

  return (
    <>
      <ul className="grid grid-cols-1 gap-[30px] min-[480px]:grid-cols-2 md:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.src} className="self-start">
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setIndex(i);
              }}
              className="block w-full cursor-zoom-in rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
              aria-label={photo.alt || `Agrandir la photo ${i + 1} sur ${photos.length}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes={SIZES}
                priority={i < 4}
                loading={i < 4 ? undefined : "lazy"}
                className="h-auto w-full rounded-[30px] object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photos"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer la visionneuse"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">×</span>
          </button>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <figure className="max-h-full">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-3 text-center text-[14px] text-white/80">
              {index !== null ? `${index + 1} / ${photos.length}` : null}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}
    </>
  );
}

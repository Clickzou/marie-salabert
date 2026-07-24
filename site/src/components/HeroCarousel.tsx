"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Banniere d'accueil : diaporama plein ecran, contenu cale en bas a gauche,
 * tirets de progression et fleches de navigation en bas a droite.
 *
 * Le defilement automatique s'interrompt des que le visiteur prend la main
 * (fleche, tiret) puis reprend, et se met en pause au survol de la banniere.
 */

const DUREE = 6500;

export default function HeroCarousel({
  slides,
  eyebrow,
  title,
  subtitle,
  cta,
  height = "tall",
  priority = true,
  children,
}: {
  slides: readonly string[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  height?: "tall" | "short";
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const [actif, setActif] = useState(0);
  const [pause, setPause] = useState(false);
  const nb = slides.length;
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  const aller = useCallback(
    (index: number) => setActif(((index % nb) + nb) % nb),
    [nb],
  );

  useEffect(() => {
    if (nb < 2 || pause) return;
    minuteur.current = setTimeout(() => setActif((i) => (i + 1) % nb), DUREE);
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    };
  }, [actif, nb, pause]);

  return (
    <section
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      className={`relative flex items-end overflow-hidden ${
        height === "tall"
          ? "min-h-[600px] sm:min-h-[720px] lg:min-h-[calc(100vh-40px)]"
          : "min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
      }`}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== actif}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: i === actif ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={priority && i === 0}
            sizes="100vw"
            /* leger zoom permanent sur la vue active : la photo respire */
            className="object-cover object-center transition-transform duration-[7000ms] ease-linear"
            style={{ transform: i === actif ? "scale(1.06)" : "scale(1)" }}
          />
        </div>
      ))}

      {/* voiles : lisibilite du menu en haut, du texte en bas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70"
      />

      <div className="relative w-full pb-28 pt-40 sm:pb-32 lg:pb-36">
        <div className="mx-auto w-full max-w-[1720px] px-5 sm:px-10 lg:px-[100px]">
          <div className="max-w-4xl">
            {eyebrow && (
              <p className="rise text-[12px] font-semibold uppercase tracking-[0.24em] text-gold sm:text-[13px]">
                {eyebrow}
              </p>
            )}
            <h1
              className="rise mt-5 text-[38px] font-semibold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-[62px] lg:text-[80px]"
              style={{ animationDelay: "120ms" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="rise mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 sm:text-[19px]"
                style={{ animationDelay: "300ms" }}
              >
                {subtitle}
              </p>
            )}
            {cta && (
              <div className="rise mt-10" style={{ animationDelay: "460ms" }}>
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded-[10px] bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_16px_36px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-gold-dark"
                >
                  {cta.label}
                </Link>
              </div>
            )}
            {children}
          </div>
        </div>

        {/* commandes du diaporama */}
        {nb > 1 && (
          <div className="mx-auto mt-12 flex w-full max-w-[1720px] items-center justify-end gap-6 px-5 sm:px-10 lg:px-[100px]">
            <ul className="flex items-center gap-2">
              {slides.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => aller(i)}
                    aria-label={`Photo ${i + 1} sur ${nb}`}
                    aria-current={i === actif}
                    className="group grid h-6 place-items-center px-1"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ${
                        i === actif ? "w-10 bg-white" : "w-6 bg-white/40 group-hover:bg-white/80"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {[
                { d: "M15 6l-6 6 6 6", label: "Photo précédente", pas: -1 },
                { d: "M9 6l6 6-6 6", label: "Photo suivante", pas: 1 },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => aller(actif + b.pas)}
                  aria-label={b.label}
                  className="grid h-14 w-14 place-items-center rounded-full border border-white/60 bg-black/25 text-white backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white hover:text-ink"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
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
        )}
      </div>
    </section>
  );
}

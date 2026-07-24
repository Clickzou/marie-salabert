"use client";

import { setConsent, useConsent } from "@/lib/consent";

/**
 * Carte Google Maps de la page contact. Google depose des cookies des le
 * chargement de l'iframe : elle n'est donc affichee qu'apres consentement
 * (meme choix que le bandeau maison), sinon un substitut est propose avec un
 * lien direct vers Google Maps.
 */
export default function ConsentMap({
  query,
  title,
  zoom = 11,
  className = "h-[400px] sm:h-[500px]",
}: {
  query: string;
  title: string;
  /** niveau de zoom Google Maps : 11 pour une ville, 8 pour une region */
  zoom?: number;
  /** hauteur (et eventuels arrondis) de la carte comme du substitut */
  className?: string;
}) {
  const allowed = useConsent() === "accepted";

  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    query,
  )}&t=m&z=${zoom}&output=embed&iwloc=near`;

  if (allowed) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full border-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-5 bg-surface px-6 text-center ${className}`}
    >
      <p className="max-w-md text-[15px] leading-relaxed text-body">
        La carte est fournie par Google Maps, qui dépose des cookies. Elle
        s&apos;affiche uniquement après votre accord.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="rounded-[3px] bg-gold px-6 py-3 text-[15px] font-medium text-black transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
        >
          Afficher la carte
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[3px] border border-black/15 px-6 py-3 text-[15px] font-medium text-body transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
        >
          Ouvrir dans Google Maps
        </a>
      </div>
    </div>
  );
}

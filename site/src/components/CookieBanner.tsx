"use client";

import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";
import { routes } from "@/lib/site";

/**
 * Remplacement de Complianz. Le site n'embarque aucun traceur par defaut :
 * le consentement ne conditionne que les contenus tiers (cartes, videos).
 */
export default function CookieBanner() {
  const choice = useConsent();

  // rien tant qu'aucun choix n'a ete fait cote client (le rendu serveur renvoie null)
  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-black/10 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] leading-relaxed text-body">
          Ce site utilise uniquement des cookies nécessaires à son bon fonctionnement.
          Les contenus tiers (vidéos, cartes) ne sont chargés qu&apos;avec votre accord.{" "}
          <Link href={routes.cookies} className="underline hover:text-plum">
            Politique de cookies
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("refused")}
            className="rounded-[3px] border border-black/15 px-5 py-2.5 text-[14px] font-medium text-body transition-colors hover:bg-black/5"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-[3px] bg-gold px-5 py-2.5 text-[14px] font-medium text-black transition-colors hover:bg-gold-dark"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

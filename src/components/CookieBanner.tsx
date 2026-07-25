"use client";

import Link from "next/link";
import type { Dictionnaire } from "@/i18n/dictionnaire";
import { setConsent, useConsent } from "@/lib/consent";
import { routes } from "@/lib/site";

/**
 * Remplacement de Complianz. Le site n'embarque aucun traceur par defaut :
 * le consentement ne conditionne que les contenus tiers (cartes, videos).
 */
export default function CookieBanner({ d }: { d: Dictionnaire }) {
  const choice = useConsent();

  // rien tant qu'aucun choix n'a ete fait cote client (le rendu serveur renvoie null)
  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={d.cookies.titre}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-black/10 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] leading-relaxed text-body">
          {d.cookies.texte}{" "}
          <Link href={routes.cookies} className="underline-grow font-medium text-plum">
            {d.cookies.enSavoirPlus}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("refused")}
            className="rounded-[10px] border border-ink/15 px-5 py-2.5 text-[14px] font-medium text-body transition-colors hover:bg-ink/[0.03]"
          >
            {d.cookies.refuser}
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="btn-shine rounded-[10px] bg-gold px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-gold-dark"
          >
            {d.cookies.accepter}
          </button>
        </div>
      </div>
    </div>
  );
}

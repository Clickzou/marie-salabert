"use client";

import { clearConsent, useConsent } from "@/lib/consent";

/**
 * Remplace le widget « Gérez vos réglages de consentement » de Complianz :
 * affiche le choix enregistre et permet de le reinitialiser pour faire
 * reapparaitre le bandeau.
 */
export default function CookieConsentReset() {
  const choice = useConsent();

  const labels = {
    accepted: "vous avez accepté les contenus tiers",
    refused: "vous avez refusé les contenus tiers",
  } as const;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[3px] border border-black/10 bg-surface px-5 py-4">
      <p className="text-[15px] leading-relaxed text-body">
        Votre choix actuel&nbsp;:{" "}
        <strong className="font-semibold text-ink">
          {choice ? labels[choice] : "aucun choix enregistré pour le moment"}
        </strong>
      </p>
      <button
        type="button"
        onClick={clearConsent}
        className="rounded-[3px] border border-black/15 bg-white px-5 py-2.5 text-[14px] font-medium text-body transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
      >
        Modifier mon choix
      </button>
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";

export const CONSENT_KEY = "cookie-consent";

export type Consent = "accepted" | "refused" | null;

/**
 * Source unique du choix de consentement, partagee par le bandeau, la carte
 * et le rappel des preferences.
 *
 * `useSyncExternalStore` est prefere a `useState` + `useEffect` : la valeur du
 * serveur est explicitement `null` (aucun stockage au rendu serveur), ce qui
 * evite tout ecart d'hydratation, et tous les composants montes se
 * resynchronisent des qu'un choix est fait, dans cet onglet comme dans un autre.
 */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // un choix fait dans un autre onglet met aussi cet onglet a jour
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "refused" ? value : null;
  } catch {
    // navigation privee ou stockage bloque : on se comporte comme sans choix
    return null;
  }
}

function getServerSnapshot(): Consent {
  return null;
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* stockage indisponible : le choix ne sera pas memorise */
  }
  listeners.forEach((listener) => listener());
}

export function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

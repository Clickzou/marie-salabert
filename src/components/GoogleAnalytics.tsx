"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/lib/consent";
import { site } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Mesure d'audience Google Analytics, chargee seulement apres « Accepter » :
 * tant qu'aucun choix n'est fait, ou apres un refus, aucune requete ne part
 * vers Google (exigence CNIL). Les changements de page sont suivis par la
 * mesure amelioree de GA4, qui ecoute l'historique du navigateur.
 */
export default function GoogleAnalytics() {
  const choice = useConsent();
  const id = site.analyticsId;

  /* Choix modifie alors que le script est deja charge (bouton « Modifier mon
     choix », ou autre onglet) : il ne peut pas etre decharge. En cas de
     retrait, on coupe donc les cookies et on supprime ceux deja deposes ; en
     cas de nouvel accord, on les reautorise. */
  useEffect(() => {
    if (!window.gtag) return;
    if (choice === "accepted") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      return;
    }
    window.gtag("consent", "update", { analytics_storage: "denied" });
    const domaine = location.hostname.replace(/^www\./, "");
    for (const cookie of document.cookie.split(";")) {
      const nom = cookie.split("=")[0].trim();
      if (!nom.startsWith("_ga")) continue;
      for (const d of ["", `; domain=.${domaine}`]) {
        document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
      }
    }
  }, [choice]);

  if (!id || choice !== "accepted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CookieConsentReset from "@/components/CookieConsentReset";
import { PageLegale } from "@/components/PageLegale";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.legales.cookies.meta.titre,
    description: d.legales.cookies.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.cookies, locale),
      languages: {
        fr: routes.cookies,
        en: `/en${routes.cookies}`,
        it: `/it${routes.cookies}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
    robots: { index: true, follow: true },
  };
}

/** Rang des sections qui recoivent un bloc supplementaire (tableau, bouton). */
const SECTION_TABLEAU = 5;
const SECTION_CONSENTEMENT = 6;

export default async function PolitiqueDeCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.legales.cookies;

  return (
    <PageLegale contenu={c} valeurs={{ "site.url": site.url }}>
      {(i) => (
        <>
          {i === SECTION_TABLEAU && (
            <>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-[14px] text-body">
                  <caption className="sr-only">{c.tableau.legende}</caption>
                  <thead>
                    <tr className="bg-surface text-ink">
                      {c.tableau.colonnes.map((colonne) => (
                        <th
                          key={colonne}
                          scope="col"
                          className="border border-line px-3 py-2 font-semibold"
                        >
                          {colonne}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.tableau.lignes.map((ligne) => (
                      <tr key={ligne.nom} className="align-top">
                        <th
                          scope="row"
                          className="border border-line px-3 py-2 font-medium text-ink"
                        >
                          {ligne.nom}
                        </th>
                        <td className="border border-line px-3 py-2">{ligne.type}</td>
                        <td className="border border-line px-3 py-2">{ligne.finalite}</td>
                        <td className="border border-line px-3 py-2">{ligne.duree}</td>
                        <td className="border border-line px-3 py-2">{ligne.categorie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-body">{c.tableau.note}</p>
            </>
          )}

          {i === SECTION_CONSENTEMENT && <CookieConsentReset />}
        </>
      )}
    </PageLegale>
  );
}

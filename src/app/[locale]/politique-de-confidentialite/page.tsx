import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: d.legales.confidentialite.meta.titre,
    description: d.legales.confidentialite.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.privacy, locale),
      languages: {
        fr: routes.privacy,
        en: `/en${routes.privacy}`,
        it: `/it${routes.privacy}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
    robots: { index: true, follow: true },
  };
}

export default async function PolitiqueDeConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);

  return (
    <PageLegale
      contenu={d.legales.confidentialite}
      valeurs={{ "site.url": site.url, "site.email": site.email }}
    />
  );
}

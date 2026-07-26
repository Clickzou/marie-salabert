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
    title: d.legales.mentions.meta.titre,
    description: d.legales.mentions.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.legal, locale),
      languages: {
        fr: routes.legal,
        en: `/en${routes.legal}`,
        it: `/it${routes.legal}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
    robots: { index: true, follow: true },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);

  return (
    <PageLegale
      contenu={d.legales.mentions}
      /* L'adresse personnelle ne figure que sur cette page : la praticienne
         exerce uniquement en deplacement, sans cabinet. */
      valeurs={{
        "site.url": site.url,
        "site.phone": site.phone,
        "site.siret": site.siret,
        "site.address.street": site.address.street,
        "site.address.postalCode": site.address.postalCode,
        "site.address.city": site.address.city,
      }}
    />
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { estLocale, locales, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { site } from "@/lib/site";
import "../globals.css";

/** Les trois langues sont pre-rendues au build. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* Une seule famille pour tout le site : Inter, variable, avec un interlettrage
   resserre sur les titres (voir globals.css). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ostéopathe animalier Toulouse - Marie Salabert",
    template: "%s",
  },
  description:
    "Ostéopathe animalier Toulouse : ostéopathe chien, chat, NACS, chevaux (sport, loisir, élevage), âne, animaux de rente, de ferme, exotiques…",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: `${site.practitioner} — Ostéopathie Animale`,
  description:
    "Ostéopathe animalier à Toulouse : chiens, chats, NACs, chevaux, animaux de rente et exotiques.",
  url: site.url,
  telephone: "+33637880073",
  // Praticienne itinerante : on declare une zone d'intervention plutot qu'une
  // adresse precise, conformement au souhait de ne diffuser l'adresse que dans
  // les mentions legales.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toulouse",
    addressRegion: "Occitanie",
    addressCountry: site.address.country,
  },
  areaServed: ["Toulouse", "Haute-Garonne", "Tarn", "Tarn-et-Garonne", "Ariège", "Aude"],
  sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);

  return (
    <html lang={localeTags[locale]} className={inter.variable}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-plum focus:px-4 focus:py-2 focus:text-white"
        >
          {d.commun.allerAuContenu}
        </a>
        <Header locale={locale} d={d} />
        <main id="content">{children}</main>
        <Footer locale={locale} d={d} />
        <CookieBanner d={d} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}

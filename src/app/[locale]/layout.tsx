import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { estLocale, locales, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { grapheSite, jsonLdHtml } from "@/lib/jsonld";
import { imagePartage, site } from "@/lib/site";
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
    images: [imagePartage],
  },
  /* Les pages ne redefinissent pas `twitter` : la carte grand format vaut
     partout, et X reprend l'image Open Graph de chaque page. */
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(grapheSite(locale, d.accueil.meta.description))}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { El_Messiri, Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${roboto.variable} ${elMessiri.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-plum focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}

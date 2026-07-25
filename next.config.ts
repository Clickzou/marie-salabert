import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Routage des langues.
   *
   * Le francais est servi a la racine (`/faq`) et les pages vivent sous
   * `app/[locale]` : il faut donc reecrire `/faq` vers `/fr/faq`. C'est fait
   * ici plutot que dans un fichier `proxy` : les regles de configuration font
   * partie du build et s'appliquent partout, y compris a l'hebergement.
   *
   * La reecriture doit passer AVANT tout le reste (`beforeFiles`) : sinon
   * `/faq` serait capte par le segment `[locale]`, qui prendrait « faq » pour
   * une langue. On exclut donc explicitement les URL deja prefixees (`/en`,
   * `/it`), les routes techniques et tout chemin comportant une extension
   * (robots.txt, sitemap.xml, images…).
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/fr" },
        {
          /* `.+` et non `.*` : la racine est traitee par la regle precedente,
             et un motif vide produirait `/fr/`, dont la normalisation entre en
             conflit avec la redirection `/fr` -> `/`. */
          source:
            "/:chemin((?!fr$|fr/|en$|en/|it$|it/|api/|_next/|_vercel/|__nextjs)(?!.*\\.).+)",
          destination: "/fr/:chemin",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async redirects() {
    return [
      /* Le francais n'a pas de prefixe : /fr/xxx renvoie vers l'URL courte.
         La racine /fr n'est volontairement pas redirigee : elle est la cible
         interne de la reecriture de « / », et une redirection ici creerait une
         boucle. La balise canonique de la page pointe vers « / ». */
      { source: "/fr/:chemin+", destination: "/:chemin+", permanent: true },
      // liens du footer WordPress qui pointaient vers des pages inexistantes
      { source: "/a-propos", destination: "/osteopahie-animale", permanent: true },
      { source: "/contact", destination: "/rendez-vous-osteopathe-animalier", permanent: true },
      // anciennes URLs WordPress vers leur equivalent
      { source: "/accueil", destination: "/", permanent: true },
      { source: "/category/:slug", destination: "/categorie/:slug", permanent: true },
      // les medias servis depuis /wp-content/uploads/... sont desormais dans /images/...
      {
        source: "/wp-content/uploads/:path*",
        destination: "/images/:path*",
        permanent: true,
      },
      // anciennes URLs techniques WordPress
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
      { source: "/feed", destination: "/actualites", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

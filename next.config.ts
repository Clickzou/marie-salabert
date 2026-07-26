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
      /* Lien du footer WordPress qui pointait vers une page inexistante.
         `/contact` n'est plus redirige : c'est desormais une vraie page. */
      { source: "/a-propos", destination: "/osteopahie-animale", permanent: true },
      /* `/reservation` a ete supprimee : elle reprenait le formulaire et les
         coordonnees de la page de rendez-vous. L'URL etait indexee, elle est
         donc redirigee et non abandonnee. */
      {
        source: "/reservation",
        destination: "/rendez-vous-osteopathe-animalier",
        permanent: true,
      },
      /* URLs du site actuel, osteopathie-animale-toulouse.fr, relevees dans son
         plan de site. Elles ne servent que le jour ou ce domaine pointera ici,
         mais autant qu'elles soient prevues : sans elles, chaque lien externe
         et chaque resultat de recherche existant tomberait sur une 404. */
      { source: "/oa", destination: "/osteopahie-animale", permanent: true },
      { source: "/presentation", destination: "/osteopahie-animale", permanent: true },
      {
        source: "/quand-consulter",
        destination: "/consulation-osteopathe-animalier",
        permanent: true,
      },
      {
        source: "/signification-de-mon-logo",
        destination: "/mon-logo-et-sa-signification",
        permanent: true,
      },
      {
        source: "/conference-pour-lifce-etat-des-lieux-pour-losteopathie-animale",
        destination: "/conference-pour-l-ifce",
        permanent: true,
      },
      {
        /* L'article racontait la reussite de l'epreuve nationale d'aptitude :
           la page qui porte aujourd'hui cette information est celle du RNA. */
        source: "/validation-de-lexamen-national-daptitude",
        destination: "/mon-diplome-dosteopathe-animalier",
        permanent: true,
      },
      { source: "/author/:slug*", destination: "/osteopahie-animale", permanent: true },
      { source: "/tag/:slug*", destination: "/actualites", permanent: true },

      // anciennes URLs WordPress vers leur equivalent
      { source: "/accueil", destination: "/", permanent: true },
      /* Seule la categorie « actualites » a survecu au changement de site : les
         autres (`uncategorized`, `examen-dosteopathie-animale`) n'ont pas
         d'equivalent et rejoignent l'archive commune. La regle nommee doit
         preceder la regle generique, la premiere qui correspond l'emportant. */
      {
        source: "/category/actualites",
        destination: "/categorie/actualites",
        permanent: true,
      },
      { source: "/category/:slug*", destination: "/categorie/actualites", permanent: true },
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

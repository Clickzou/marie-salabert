import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
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

# Ostéopathie animale Toulouse — Marie Salabert

Site migré de WordPress (Astra + Elementor Pro) vers **Next.js 16** (App Router, TypeScript, Tailwind CSS v4), déployé sur Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                  # http://localhost:3000
```

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/app/` | Une route par page, slugs identiques à ceux de WordPress (référencement préservé) |
| `src/components/ui.tsx` | Briques de base : `Container`, `Section`, `Button`, `Eyebrow`, `SectionTitle` |
| `src/components/sections.tsx` | Sections récurrentes : `PageHero`, `CheckList`, `CtaBand`, `Testimonials`, `CertificationBadge` |
| `src/lib/site.ts` | Coordonnées, navigation et table des routes — **source unique** pour les liens |
| `src/content/` | Contenus éditoriaux (avis clients, articles) |
| `public/images/` | Médias repris de WordPress, arborescence `année/mois` d'origine conservée |

## Design

Les couleurs et polices reprennent le kit Elementor du site d'origine ; les tokens sont
déclarés dans `src/app/globals.css` (bloc `@theme`) :

| Token | Valeur | Usage |
| --- | --- | --- |
| `plum` | `#933a50` | Couleur principale, titres de section |
| `green` | `#2f7f64` | Boutons secondaires, mentions |
| `gold` | `#edd14f` | Appels à l'action |
| `sky` | `#6ec1e4` | Titres de section sur l'accueil |
| `surface` | `#f5f4f4` | Fonds de section alternés |

Polices : **Roboto** (texte) et **El Messiri** (`font-display`, sur-titres et bandeaux),
chargées via `next/font` — aucune requête vers Google Fonts à l'exécution.

## Formulaire de contact

`POST /api/contact` → envoi d'e-mail via [Resend](https://resend.com).
Protections : champ piège anti-robots, limitation à 5 envois par IP toutes les 10 minutes,
échappement HTML des valeurs. Sans `RESEND_API_KEY` ni `CONTACT_EMAIL`, la route répond 503
avec un message invitant à téléphoner — le site reste utilisable.

## Cookies

Le bandeau (`src/components/CookieBanner.tsx`) remplace le plugin Complianz.
Le site ne pose aucun traceur par défaut ; le choix est mémorisé dans `localStorage`
sous la clé `cookie-consent`.

## Déploiement

Vercel, projet pointant sur le dossier `site/`. Variables d'environnement à définir :
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM`.

Les anciennes URLs WordPress (`/wp-content/uploads/...`, `/a-propos`, `/contact`,
`/sitemap_index.xml`…) sont redirigées dans `next.config.ts`.

## Références de migration

Le dossier `../wp-export/` conserve les éléments d'origine ayant servi à la migration :
HTML crawlé, contenu structuré par page, inventaire ordonné des médias, captures de
référence desktop/mobile et export SQL. Il n'est pas nécessaire au fonctionnement du site.

## Scripts de vérification

```bash
node scripts/shot.mjs "/faq" faq-local 1440   # capture une page locale pour comparaison
node scripts/capture.mjs                       # recapture les références WordPress
node scripts/inventory.mjs                     # réinventorie les médias du site d'origine
```

# Déploiement Vercel

L'application Next.js occupe la racine du dépôt : `package.json`, `src/`,
`public/` et `next.config.ts` sont directement à la racine, aux côtés du
dossier `wp-export/` (éléments de la migration WordPress, inutiles au site).

Vercel détecte donc Next.js sans aucun réglage : **le champ « Root Directory »
doit rester vide**, et les commandes d'installation et de build sur leurs
valeurs par défaut. C'est volontaire : la configuration précédente, avec
l'application dans un sous-dossier, obligeait à renseigner ce champ et faisait
échouer la détection quand il était oublié.

`vercel.json` fixe simplement la région `cdg1` (Paris), la plus proche des
visiteurs.

## Variables d'environnement

| Variable | Rôle | Sans elle |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site | les liens canoniques et hreflang pointent vers l'URL par défaut |
| `RESEND_API_KEY` | envoi des e-mails du formulaire | le formulaire répond 503 et invite à téléphoner |
| `CONTACT_EMAIL` | destinataire des demandes | idem |
| `CONTACT_FROM` | expéditeur vérifié chez Resend | idem |

## En local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # vérification avant mise en ligne
```

## Production (mise en ligne du 30/09/2026)

Le site est servi sur **https://www.osteopathie-animale-toulouse.fr** (projet
Vercel `marie-salabert`). Le domaine sans `www` y redirige en 308 : c'est la
forme que l'ancien site WordPress servait et que Google a indexée.
`NEXT_PUBLIC_SITE_URL` doit donc garder le `www`.

### Où sont les choses

| Élément | Où | Remarque |
| --- | --- | --- |
| Nom de domaine | o2switch, service « Domaine seul » | à renouveler, échéance 05/10/2027 |
| Zone DNS | cPanel o2switch du compte `psyf8886`, Éditeur de zone | serveurs `ns1/ns2.o2switch.net` |
| Boîtes mail du domaine | même compte o2switch (webmail) | Marie les utilise |
| Site | Vercel | certificats émis et renouvelés par Vercel |
| Envoi du formulaire | Resend (compte clickzou-pro, région eu-west-1) | domaine vérifié |
| Search Console | propriété « Domaine » `osteopathie-animale-toulouse.fr` | validée par TXT DNS le 01/10/2026 |
| Google Analytics 4 | flux `G-4GSH30VZPE` (identifiant dans `src/lib/site.ts`) | chargé seulement après « Accepter » dans le bandeau |

### Enregistrements DNS posés

| Nom | Type | Valeur | Rôle |
| --- | --- | --- | --- |
| `@` | A | `216.150.1.1` | site (Vercel) |
| `www` | CNAME | `e59c79a8a64d44c3.vercel-dns-016.com` | site (Vercel) |
| `@` | MX 0 | `mail.osteopathie-animale-toulouse.fr` | mails, restés chez o2switch |
| `mail`, `ftp` | A | `109.234.160.114` | serveur o2switch |
| `resend._domainkey` | TXT | clé DKIM fournie par Resend | signature des e-mails |
| `rsend`, `send` | CNAME | `rsend-euw1.forge.rmta.net`, `send.forge.rmta.net` | envoi Resend |
| `@` | TXT | `google-site-verification=BMD1xYB7AYkSuJaPYwObgZy7VVgjOtRlYwfkmbZemRg` | validation Search Console, à conserver |

`mail` et `ftp` étaient des CNAME du domaine, et le MX pointait sur le domaine
lui-même : sans ces corrections, les mails auraient suivi le site chez Vercel
et cessé d'arriver.

### À ne pas faire

**Ne pas résilier l'hébergement o2switch `psyf8886`** tel quel : la zone DNS
et les boîtes mail disparaîtraient avec lui, et le site comme les mails
tomberaient. Pour s'en passer, déplacer d'abord la zone DNS (Vercel DNS ou
Cloudflare) et migrer les boîtes mail.

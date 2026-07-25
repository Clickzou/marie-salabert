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

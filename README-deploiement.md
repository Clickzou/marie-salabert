# Déploiement Vercel

Le code applicatif vit dans `site/` ; la racine du dépôt ne contient que ce
dossier et les éléments de migration WordPress (`wp-export/`).

## Réglage à faire une fois, dans le projet Vercel

**Settings → Build & Deployment → Root Directory : `site`**

Vercel lit alors `site/package.json`, détecte Next.js tout seul et applique
`site/vercel.json` (région `cdg1`, la plus proche des visiteurs français).
Les commandes d'installation et de build doivent rester sur leurs valeurs par
défaut : tout `cd site` ajouté à la main ferait échouer la détection.

## Variables d'environnement

| Variable | Rôle | Sans elle |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site | les liens absolus pointent vers le domaine par défaut |
| `RESEND_API_KEY` | envoi des e-mails du formulaire | le formulaire répond 503 et invite à téléphoner |
| `CONTACT_EMAIL` | destinataire des demandes | idem |
| `CONTACT_FROM` | expéditeur vérifié chez Resend | idem |

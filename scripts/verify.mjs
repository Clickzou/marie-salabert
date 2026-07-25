/**
 * Verification finale : compare le site migre au site WordPress d'origine.
 * - toutes les anciennes URLs repondent 200
 * - aucun lien interne mort, aucune image cassee, aucune erreur console
 * - titles / descriptions / h1 compares a la reference Yoast
 */
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const BASE = process.env.BASE ?? 'http://localhost:3000';

const PAGES = [
  ['index', '/'],
  ['osteopahie-animale', '/osteopahie-animale'],
  ['consulation-osteopathe-animalier', '/consulation-osteopathe-animalier'],
  ['mon-diplome-dosteopathe-animalier', '/mon-diplome-dosteopathe-animalier'],
  ['actualites', '/actualites'],
  ['conference-pour-l-ifce', '/conference-pour-l-ifce'],
  ['faq', '/faq'],
  ['galerie', '/galerie'],
  ['symbiosteo-2', '/symbiosteo-2'],
  ['reservation', '/reservation'],
  ['rendez-vous-osteopathe-animalier', '/rendez-vous-osteopathe-animalier'],
  ['mentions-legales', '/mentions-legales'],
  ['politique-de-confidentialite', '/politique-de-confidentialite'],
  ['politique-de-cookies-ue', '/politique-de-cookies-ue'],
  ['categorie__actualites', '/categorie/actualites'],
];

const seo = JSON.parse(await readFile('../wp-export/content/_seo.json', 'utf8'));
const seoBySlug = Object.fromEntries(seo.map((s) => [s.slug, s]));

/**
 * Ecarts volontaires par rapport aux metadonnees WordPress.
 * La description d'accueil se terminait par une espace insecable suivie d'un point
 * (« exotiques . »), coquille visible dans les resultats Google : remplacee par des points
 * de suspension. Une meta description n'entre pas dans le classement, le gain est net.
 */
const SEO_ECARTS_ASSUMES = {
  index: ['description'],
  // Page volontairement transformee en « SymbiOsteo Le Podcast » (contenu client) :
  // le title/description ne correspondent plus a l'ancien SEO WordPress, c'est voulu.
  "symbiosteo-2": ['title', 'description'],
};

const browser = await chromium.launch();
const problems = [];
const rows = [];
const internalLinks = new Set();

for (const [slug, route] of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'fr-FR' });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const status = resp?.status() ?? 0;
  if (status !== 200) problems.push(`${route} : statut HTTP ${status}`);

  // charge les images differees
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(900);

  const data = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
    robots: document.querySelector('meta[name="robots"]')?.content ?? null,
    h1: [...document.querySelectorAll('h1')].map((e) => e.textContent.trim()),
    imgCount: document.images.length,
    // les images masquees (display:none) ne sont pas chargees : ce ne sont pas des images cassees
    broken: [...document.images]
      .filter((i) => i.getClientRects().length > 0)
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.src),
    links: [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((href) => href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:')),
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
    height: document.body.scrollHeight,
  }));

  data.links.forEach((l) => internalLinks.add(l.split('#')[0].split('?')[0]));

  const ref = seoBySlug[slug];
  const assumes = SEO_ECARTS_ASSUMES[slug] ?? [];
  if (ref && ref.title && data.title !== ref.title && !assumes.includes('title')) {
    problems.push(`${route} : title different\n    attendu : ${ref.title}\n    obtenu  : ${data.title}`);
  }
  if (
    ref &&
    ref.description &&
    data.description !== ref.description &&
    !assumes.includes('description')
  ) {
    problems.push(`${route} : description differente\n    attendu : ${ref.description}\n    obtenu  : ${data.description}`);
  }
  if (data.h1.length !== 1) problems.push(`${route} : ${data.h1.length} balises h1 (attendu 1) — ${JSON.stringify(data.h1)}`);
  if (data.broken.length) problems.push(`${route} : ${data.broken.length} image(s) cassee(s) — ${data.broken.slice(0, 3).join(', ')}`);
  if (consoleErrors.length) problems.push(`${route} : erreur console — ${consoleErrors.slice(0, 2).join(' | ')}`);

  rows.push({ route, status, images: data.imgCount, h1: data.h1.length, jsonld: data.jsonld, hauteur: data.height });
  await ctx.close();
}

// verifie que chaque lien interne rencontre repond 200
console.log('\nVerification des liens internes...');
const ctx = await browser.newContext();
const page = await ctx.newPage();
for (const link of [...internalLinks].sort()) {
  const url = BASE + (link.startsWith('/') ? link : '/' + link);
  const resp = await page.goto(url, { waitUntil: 'commit', timeout: 60000 }).catch(() => null);
  const status = resp?.status() ?? 0;
  if (status >= 400) problems.push(`lien interne mort : ${link} (statut ${status})`);
}
await ctx.close();
await browser.close();

console.table(rows);
console.log(`\nliens internes distincts verifies : ${internalLinks.size}`);
if (problems.length) {
  console.log(`\n=== ${problems.length} PROBLEME(S) ===`);
  problems.forEach((p) => console.log(' - ' + p));
  process.exitCode = 1;
} else {
  console.log('\nAucun probleme detecte.');
}

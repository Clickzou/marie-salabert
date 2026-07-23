/**
 * Inventaire complet et ordonne des medias de chaque page du site d'origine,
 * base sur le rendu reel (couvre les diaporamas et fonds Elementor charges en JS).
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = 'https://osteopathie-animale.sitepreproduction.fr';
const OUT = '../wp-export/content';

const PAGES = [
  ['index', '/'],
  ['osteopahie-animale', '/osteopahie-animale/'],
  ['consulation-osteopathe-animalier', '/consulation-osteopathe-animalier/'],
  ['mon-diplome-dosteopathe-animalier', '/mon-diplome-dosteopathe-animalier/'],
  ['actualites', '/actualites/'],
  ['conference-pour-l-ifce', '/conference-pour-l-ifce/'],
  ['faq', '/faq/'],
  ['galerie', '/galerie/'],
  ['symbiosteo-2', '/symbiosteo-2/'],
  ['reservation', '/reservation/'],
  ['rendez-vous-osteopathe-animalier', '/rendez-vous-osteopathe-animalier/'],
  ['mentions-legales', '/mentions-legales/'],
  ['politique-de-confidentialite', '/politique-de-confidentialite/'],
  ['politique-de-cookies-ue', '/politique-de-cookies-ue/'],
  ['categorie__actualites', '/categorie/actualites/'],
];

const browser = await chromium.launch();
const all = {};
const every = new Set();

for (const [slug, route] of PAGES) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: 'fr-FR',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 90000 });
  await page.mouse.move(200, 200);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1500);
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(2000);

  const media = await page.evaluate(() => {
    const zoneOf = (el) => {
      for (let p = el; p; p = p.parentElement) {
        if (p.id === 'masthead') return 'header';
        if (p.id === 'colophon') return 'footer';
        if (p.tagName === 'HEADER') return 'header';
        if (p.tagName === 'FOOTER') return 'footer';
      }
      return 'main';
    };
    const items = [];
    document.querySelectorAll('img').forEach((el) => {
      const r = el.getBoundingClientRect();
      items.push({
        kind: 'img',
        src: el.currentSrc || el.src,
        alt: el.alt,
        w: el.naturalWidth,
        h: el.naturalHeight,
        y: Math.round(r.top + scrollY),
        x: Math.round(r.left),
        displayW: Math.round(r.width),
        displayH: Math.round(r.height),
        zone: zoneOf(el),
        hidden: r.width === 0 || r.height === 0,
      });
    });
    document.querySelectorAll('*').forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (!bg || bg === 'none') return;
      const urls = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
      if (!urls.length) return;
      const r = el.getBoundingClientRect();
      for (const u of urls) {
        if (u.startsWith('data:')) continue;
        items.push({
          kind: 'background',
          src: u,
          cls: el.className?.toString().slice(0, 90),
          y: Math.round(r.top + scrollY),
          x: Math.round(r.left),
          displayW: Math.round(r.width),
          displayH: Math.round(r.height),
          zone: zoneOf(el),
          hidden: r.width === 0 || r.height === 0,
        });
      }
    });
    // ordre du document (position verticale puis horizontale)
    items.sort((a, b) => a.y - b.y || a.x - b.x);
    // dedoublonne les entrees identiques (lazy + noscript)
    const seen = new Set();
    return items.filter((i) => {
      const k = `${i.kind}|${i.src}|${i.y}|${i.x}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  });

  all[slug] = media;
  media.forEach((m) => m.src.includes('/uploads/') && every.add(m.src.split('?')[0]));
  const inMain = media.filter((m) => m.zone === 'main' && !m.hidden).length;
  console.log(`${slug.padEnd(36)} total=${String(media.length).padStart(3)} visibles(main)=${inMain}`);
  await ctx.close();
}

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/_media-par-page.json`, JSON.stringify(all, null, 1), 'utf8');
await writeFile(`${OUT}/_media-toutes.json`, JSON.stringify([...every].sort(), null, 1), 'utf8');
console.log(`\nmedias uploads distincts : ${every.size}`);
await browser.close();

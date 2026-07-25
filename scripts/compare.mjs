/**
 * Capture toutes les pages du site migre et les met cote a cote avec la
 * reference WordPress, pour un controle visuel page par page.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE ?? 'http://localhost:3000';
const OUT = '../wp-export/reference/local';

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

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });
await mkdir(OUT + '/mobile', { recursive: true });

for (const [slug, route] of PAGES) {
  for (const [device, viewport, dir] of [
    ['desktop', { width: 1440, height: 1000 }, OUT],
    ['mobile', { width: 390, height: 844 }, OUT + '/mobile'],
  ]) {
    const ctx = await browser.newContext({ viewport, locale: 'fr-FR', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    // les lecteurs audio tiers ne stabilisent jamais le reseau
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 90000 });
    await page.addStyleTag({ content: '[aria-label="Gestion des cookies"]{display:none!important}' });
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 600) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${dir}/${slug}.png`, fullPage: true });
    await ctx.close();
    process.stdout.write(`${slug} [${device}] `);
  }
  console.log('');
}
await browser.close();

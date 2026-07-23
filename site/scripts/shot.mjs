/**
 * Capture une page du site local pour la comparer a la reference WordPress.
 * Usage : node scripts/shot.mjs <route> <nomFichier> [largeur]
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const route = process.argv[2] ?? '/';
const name = process.argv[3] ?? 'local';
const width = Number(process.argv[4] ?? 1440);
const OUT = '../wp-export/reference/local';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height: 1000 },
  deviceScaleFactor: 1,
  locale: 'fr-FR',
});
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle', timeout: 90000 });
// masque le bandeau cookies pour aligner les captures sur la reference
await page.addStyleTag({ content: '[aria-label="Gestion des cookies"]{display:none!important}' });
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) {
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(90);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);

await mkdir(OUT, { recursive: true });
await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
const size = await page.evaluate(() => ({
  h: document.body.scrollHeight,
  // une image masquee (display:none) n'est pas chargee par le navigateur :
  // ce n'est pas une image cassee, on ne verifie donc que celles affichees
  imgs: [...document.images]
    .filter((i) => i.getClientRects().length > 0)
    .filter((i) => !i.complete || i.naturalWidth === 0)
    .map((i) => i.src),
}));
console.log(JSON.stringify({ route, height: size.h, brokenImages: size.imgs, errors }, null, 1));
await browser.close();

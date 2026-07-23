/**
 * Capture les references visuelles du site WordPress d'origine :
 * screenshots desktop/mobile + styles calcules des elements cles.
 * Usage : node scripts/capture.mjs [baseUrl] [outDir]
 */
import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] || 'https://osteopathie-animale.sitepreproduction.fr';
const OUT = process.argv[3] || '../wp-export/reference';

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

const styleProps = [
  'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
  'color', 'backgroundColor', 'textAlign', 'textTransform',
  'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'marginTop', 'marginBottom', 'borderRadius', 'borderColor', 'borderWidth',
  'maxWidth', 'width', 'display', 'gap', 'boxShadow', 'backgroundImage',
];

async function run() {
  const browser = await chromium.launch();
  await mkdir(OUT, { recursive: true });
  await mkdir(path.join(OUT, 'desktop'), { recursive: true });
  await mkdir(path.join(OUT, 'mobile'), { recursive: true });
  await mkdir(path.join(OUT, 'styles'), { recursive: true });

  for (const [slug, route] of PAGES) {
    for (const [device, viewport] of [
      ['desktop', { width: 1440, height: 1000 }],
      ['mobile', { width: 390, height: 844 }],
    ]) {
      const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
        locale: 'fr-FR',
        // un UA headless recoit une version degradee (sans CSS) du site
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      });
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 90000 });
      // WP Rocket differe le JS jusqu'a une vraie interaction utilisateur
      await page.mouse.move(200, 200);
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(1500);
      // masquer le bandeau cookies Complianz pour ne pas polluer les captures
      await page.addStyleTag({
        content: '#cmplz-cookiebanner-container,.cmplz-cookiebanner{display:none!important}',
      });
      // forcer le chargement des images lazy
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += 500) {
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(120);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].filter((i) => !i.complete).map(
            (i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 3000); })
          )
        );
        if (document.fonts) await document.fonts.ready;
      });
      await page.screenshot({
        path: path.join(OUT, device, `${slug}.png`),
        fullPage: true,
      });

      if (device === 'desktop') {
        const styles = await page.evaluate((props) => {
          const pick = (el) => {
            const cs = getComputedStyle(el);
            const o = {};
            for (const p of props) {
              const v = cs[p];
              if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') o[p] = v;
            }
            return o;
          };
          const out = { sections: [], typo: {}, buttons: [] };
          const sel = 'h1,h2,h3,h4,h5,h6,p,li,a.elementor-button,button,.elementor-section,section';
          document.querySelectorAll(sel).forEach((el, i) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            const rec = {
              tag: el.tagName.toLowerCase(),
              cls: el.className?.toString().slice(0, 160),
              text: (el.textContent || '').trim().slice(0, 70),
              box: { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
              css: pick(el),
            };
            if (el.matches('.elementor-section,section')) out.sections.push(rec);
            else if (el.matches('a.elementor-button,button')) out.buttons.push(rec);
            else {
              const key = el.tagName.toLowerCase();
              (out.typo[key] = out.typo[key] || []).push(rec);
            }
          });
          out.body = pick(document.body);
          return out;
        }, styleProps);
        await writeFile(
          path.join(OUT, 'styles', `${slug}.json`),
          JSON.stringify(styles, null, 1),
          'utf8'
        );
      }
      await ctx.close();
      console.log(`${slug} [${device}] OK`);
    }
  }
  await browser.close();
}

run();

/**
 * Recupere la pochette de chaque episode SymbiOsteO depuis Spotify (oEmbed) et
 * l'enregistre dans public/images/symbiosteo/<numero>.jpg.
 *
 * Les URLs des episodes sont lues directement dans la page symbiosteo-2, pour
 * eviter d'avoir deux listes a maintenir.
 *
 * Usage : node scripts/fetch-symbiosteo-covers.mjs [--force]
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const PAGE = path.resolve("src/app/symbiosteo-2/page.tsx");
const OUT_DIR = path.resolve("public/images/symbiosteo");
const FORCE = process.argv.includes("--force");

mkdirSync(OUT_DIR, { recursive: true });

const source = readFileSync(PAGE, "utf8");
/* couples (numero, url) tels qu'ecrits dans le tableau `episodes` */
const episodes = [
  ...source.matchAll(/number:\s*(\d+)[\s\S]*?url:\s*"(https:\/\/open\.spotify\.com\/episode\/[^"]+)"/g),
].map((m) => ({ numero: m[1], url: m[2] }));

if (episodes.length === 0) {
  console.error("Aucun episode trouve dans", PAGE);
  process.exit(1);
}

for (const episode of episodes) {
  const fichier = path.join(OUT_DIR, `${episode.numero}.jpg`);
  if (existsSync(fichier) && !FORCE) {
    console.log(`= episode ${episode.numero} : deja present`);
    continue;
  }

  const oembed = await fetch(
    `https://open.spotify.com/oembed?url=${encodeURIComponent(episode.url)}`,
  );
  if (!oembed.ok) {
    console.error(`x episode ${episode.numero} : oEmbed ${oembed.status}`);
    continue;
  }
  const { thumbnail_url: vignette } = await oembed.json();
  if (!vignette) {
    console.error(`x episode ${episode.numero} : pas de pochette`);
    continue;
  }

  const image = Buffer.from(await (await fetch(vignette)).arrayBuffer());
  await writeFile(fichier, image);
  console.log(`+ episode ${episode.numero} : ${Math.round(image.length / 1024)} Ko`);
}

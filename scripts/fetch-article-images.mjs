/**
 * Recupere une image d'illustration pour chaque article a partir du premier
 * lien externe qu'il contient, l'enregistre dans public/images/articles/ et
 * renseigne `image:` / `imageAlt:` dans le frontmatter du MDX.
 *
 * Sources : miniature YouTube (deterministe), oEmbed Spotify, sinon balise
 * og:image de la page liee. Les images sont copiees en local : aucune requete
 * vers un tiers a l'affichage.
 *
 * Idempotent : un article qui a deja une image n'est pas retouche (--force).
 * Usage : node scripts/fetch-article-images.mjs [--force] [--only=slug]
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ARTICLES = path.resolve("src/content/articles");
const OUT_DIR = path.resolve("public/images/articles");
const FORCE = process.argv.includes("--force");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) ?? "").replace("--only=", "");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

/** Premier lien Markdown externe du corps. */
function premierLien(texte) {
  const m = texte.match(/\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  return m ? m[1] : null;
}

function idYouTube(url) {
  const m =
    url.match(/youtu\.be\/([\w-]{11})/) ??
    url.match(/youtube\.com\/watch\?v=([\w-]{11})/) ??
    url.match(/youtube\.com\/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

async function urlImage(lien) {
  const yt = idYouTube(lien);
  if (yt) {
    // maxres n'existe pas toujours : on retombe sur hqdefault, toujours presente
    for (const nom of ["maxresdefault", "hqdefault"]) {
      const u = `https://img.youtube.com/vi/${yt}/${nom}.jpg`;
      const r = await fetch(u, { method: "HEAD" });
      if (r.ok) return { url: u, source: "YouTube" };
    }
  }

  if (/open\.spotify\.com/.test(lien)) {
    const r = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(lien)}`);
    if (r.ok) {
      const j = await r.json();
      if (j.thumbnail_url) return { url: j.thumbnail_url, source: "Spotify" };
    }
  }

  if (/\.pdf($|\?)/i.test(lien)) return null;

  // sinon : og:image de la page liee
  try {
    const r = await fetch(lien, { headers: { "User-Agent": UA } });
    if (!r.ok) return null;
    const html = await r.text();
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (!m) return null;
    return { url: new URL(m[1], lien).href, source: new URL(lien).hostname };
  } catch {
    return null;
  }
}

mkdirSync(OUT_DIR, { recursive: true });
const fichiers = readdirSync(ARTICLES).filter((f) => /\.mdx?$/.test(f));

for (const fichier of fichiers) {
  const slug = fichier.replace(/\.mdx?$/, "");
  if (ONLY && slug !== ONLY) continue;

  const chemin = path.join(ARTICLES, fichier);
  const brut = readFileSync(chemin, "utf8");
  const aDejaUneImage = /^image:\s*\S+/m.test(brut);
  if (aDejaUneImage && !FORCE) {
    console.log(`= ${slug} : image deja renseignee`);
    continue;
  }

  const lien = premierLien(brut);
  if (!lien) {
    console.log(`- ${slug} : aucun lien externe`);
    continue;
  }

  const trouve = await urlImage(lien);
  if (!trouve) {
    console.log(`- ${slug} : pas d'image exploitable (${lien.slice(0, 60)}…)`);
    continue;
  }

  const reponse = await fetch(trouve.url, { headers: { "User-Agent": UA } });
  if (!reponse.ok) {
    console.log(`x ${slug} : telechargement ${reponse.status}`);
    continue;
  }
  const type = reponse.headers.get("content-type") ?? "";
  const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
  const buffer = Buffer.from(await reponse.arrayBuffer());
  if (buffer.length < 3000) {
    console.log(`- ${slug} : image trop petite, ignoree`);
    continue;
  }

  const nom = `${slug}.${ext}`;
  writeFileSync(path.join(OUT_DIR, nom), buffer);

  // renseigne le frontmatter (remplace les lignes vides existantes)
  let sortie = brut;
  const chemin_public = `/images/articles/${nom}`;
  if (/^image:.*$/m.test(sortie)) {
    sortie = sortie.replace(/^image:.*$/m, `image: "${chemin_public}"`);
  } else {
    sortie = sortie.replace(/^---\n/, `---\nimage: "${chemin_public}"\n`);
  }
  if (!/^imageAlt:\s*\S/m.test(sortie)) {
    const titre = (sortie.match(/^title:\s*"?([^"\n]+)"?$/m)?.[1] ?? slug).trim();
    if (/^imageAlt:.*$/m.test(sortie)) {
      sortie = sortie.replace(/^imageAlt:.*$/m, `imageAlt: "${titre}"`);
    } else {
      sortie = sortie.replace(/^image:.*$/m, (l) => `${l}\nimageAlt: "${titre}"`);
    }
  }
  writeFileSync(chemin, sortie);

  console.log(`+ ${slug} : ${trouve.source} — ${Math.round(buffer.length / 1024)} Ko`);
}

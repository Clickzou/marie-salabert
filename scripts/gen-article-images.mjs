/**
 * Complete les articles sans image (lien PDF, presse protegee, aucun lien) par
 * une illustration generee avec fal.ai Flux Pro, puis renseigne le frontmatter.
 *
 * A lancer APRES scripts/fetch-article-images.mjs, qui privilegie l'image
 * d'origine du lien (miniature YouTube, pochette Spotify, og:image).
 *
 * Idempotent : n'agit que sur les articles dont `image:` est vide (--force).
 * Usage : node scripts/gen-article-images.mjs [--force] [--only=slug]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const CLICKZOU_ENV =
  "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";
const ARTICLES = path.resolve("src/content/articles");
const OUT_DIR = path.resolve("public/images/articles");
const MODEL = "fal-ai/flux-pro/v1.1";
const FORCE = process.argv.includes("--force");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) ?? "").replace("--only=", "");

const STYLE =
  "Photorealistic editorial photograph, natural soft daylight, shallow depth of field, 35mm lens, calm neutral tones, clean professional composition. No readable text, no logo, no watermark, no faces.";

/** Scene concrete par article — objets directement lies au sujet, sans metaphore. */
const SCENES = {
  "interview-pour-le-sfdo": {
    prompt:
      "An open printed professional magazine lying on a wooden desk next to a voice recorder and a notebook, soft window light.",
    alt: "Magazine professionnel ouvert sur un bureau à côté d'un enregistreur",
  },
  "master-2-management-etablissements-sante": {
    prompt:
      "A university desk with stacked academic books, printed research papers and a laptop, in a quiet library with tall shelves behind.",
    alt: "Bureau universitaire avec ouvrages et articles de recherche",
  },
  "membre-fondateur-collectif-osteopathes-animaliers": {
    prompt:
      "A meeting table seen from above with printed documents, pens, coffee cups and empty chairs around, bright meeting room.",
    alt: "Table de réunion avec documents et tasses, salle lumineuse",
  },
  "parcours-au-sein-de-l-ufeoa": {
    prompt:
      "An empty lecture room with rows of seats and a projection screen, notebooks and pens left on the front desks.",
    alt: "Amphithéâtre vide avec écran de projection et cahiers",
  },
  "premiere-parution-scientifique-revue-hegel": {
    prompt:
      "An open scientific journal with charts and columns of text on a desk, reading glasses and a pen beside it, warm light.",
    alt: "Revue scientifique ouverte sur un bureau avec lunettes et stylo",
  },
  "rapport-cgaaer-osteopathie-animale": {
    prompt:
      "A thick official printed report with a plain cover on an administrative desk, a fountain pen and a folder next to it.",
    alt: "Rapport officiel imprimé posé sur un bureau administratif",
  },
  "semaine-veterinaire-nouvelle-phase-structurante": {
    prompt:
      "A veterinary practice reception desk with a professional trade magazine, a stethoscope and a computer screen turned off.",
    alt: "Comptoir de clinique vétérinaire avec revue professionnelle et stéthoscope",
  },
  "semaine-veterinaire-osteopathes-animaliers-et-veterinaires": {
    prompt:
      "A veterinary consultation room with an empty examination table, a stethoscope hanging and shelves of supplies, soft daylight.",
    alt: "Salle de consultation vétérinaire avec table d'examen et stéthoscope",
  },
  "semaine-veterinaire-osteopathie-animale-points-de-tension": {
    prompt:
      "A professional veterinary trade newspaper folded on a clinic waiting-room table next to a plant and empty chairs.",
    alt: "Journal professionnel vétérinaire posé dans une salle d'attente",
  },
};

function lireCle() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY;
  const contenu = readFileSync(CLICKZOU_ENV, "utf8");
  const ligne = contenu.split(/\r?\n/).find((l) => /^\s*FAL_KEY\s*=/.test(l));
  if (!ligne) throw new Error("FAL_KEY introuvable");
  return ligne.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

const cle = lireCle();
mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, scene] of Object.entries(SCENES)) {
  if (ONLY && slug !== ONLY) continue;

  const mdx = path.join(ARTICLES, `${slug}.mdx`);
  if (!existsSync(mdx)) {
    console.log(`? ${slug} : fichier introuvable`);
    continue;
  }
  const brut = readFileSync(mdx, "utf8");
  if (/^image:\s*\S+/m.test(brut) && !FORCE) {
    console.log(`= ${slug} : image deja renseignee`);
    continue;
  }

  const reponse = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${scene.prompt} ${STYLE}`,
      image_size: "landscape_4_3",
      num_images: 1,
      output_format: "jpeg",
    }),
  });
  if (!reponse.ok) {
    console.error(`x ${slug} : ${reponse.status} ${await reponse.text()}`);
    continue;
  }
  const url = (await reponse.json())?.images?.[0]?.url;
  if (!url) {
    console.error(`x ${slug} : reponse sans image`);
    continue;
  }

  const image = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(path.join(OUT_DIR, `${slug}.jpg`), image);

  let sortie = brut;
  const chemin = `/images/articles/${slug}.jpg`;
  sortie = /^image:.*$/m.test(sortie)
    ? sortie.replace(/^image:.*$/m, `image: "${chemin}"`)
    : sortie.replace(/^---\n/, `---\nimage: "${chemin}"\n`);
  sortie = /^imageAlt:\s*\S/m.test(sortie)
    ? sortie
    : /^imageAlt:.*$/m.test(sortie)
      ? sortie.replace(/^imageAlt:.*$/m, `imageAlt: "${scene.alt}"`)
      : sortie.replace(/^image:.*$/m, (l) => `${l}\nimageAlt: "${scene.alt}"`);
  writeFileSync(mdx, sortie);

  console.log(`+ ${slug} : ${Math.round(image.length / 1024)} Ko`);
}

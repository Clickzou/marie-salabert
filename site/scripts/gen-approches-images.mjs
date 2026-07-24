/**
 * Genere une illustration par approche osteopathique (page A propos) via fal.ai
 * Flux Pro v1.1, et l'enregistre dans public/images/approches/.
 *
 * La cle est lue dans le .env.local du projet Clickzou (FAL_KEY) ou, a defaut,
 * dans l'environnement. Idempotent : une image deja presente n'est pas
 * regeneree (chaque appel est facture), sauf avec --force.
 *
 * Usage : node scripts/gen-approches-images.mjs [--force] [--only=slug]
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const CLICKZOU_ENV =
  "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";
const OUT_DIR = path.resolve("public/images/approches");
const MODEL = "fal-ai/flux-pro/v1.1";
const FORCE = process.argv.includes("--force");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) ?? "").replace("--only=", "");

/** Style commun : photo editoriale, lumiere naturelle, pas de visage, pas de texte. */
const STYLE =
  "Photorealistic editorial photograph, natural soft daylight, shallow depth of field, 50mm lens, warm neutral tones, calm and caring atmosphere, professional veterinary osteopathy setting. Only the practitioner's hands and forearms are visible, no face, no portrait. No text, no logo, no watermark.";

const SCENES = [
  {
    slug: "musculosquelettique",
    prompt:
      "Close-up of a practitioner's hands gently mobilising the shoulder joint of a calm large dog lying on a soft mat, one hand supporting the limb, the other on the shoulder blade.",
  },
  {
    slug: "tissulaire",
    prompt:
      "Close-up of a practitioner's hands resting flat on the back muscles of a calm bay horse standing in a stable, slow soft-tissue work along the spine.",
  },
  {
    slug: "fasciale",
    prompt:
      "Close-up of a practitioner's hands gliding slowly along the flank and skin of a calm short-haired dog standing on grass, gentle stretch of the superficial tissue.",
  },
  {
    slug: "viscerale",
    prompt:
      "Close-up of a practitioner's hands placed gently on the belly of a relaxed dog lying on its side on a blanket, soft abdominal palpation.",
  },
  {
    slug: "reflexe",
    prompt:
      "Close-up of a practitioner's fingertips tracing a line along the skin of a horse's neck and withers, light superficial stimulation, dust in the sunlight.",
  },
];

function lireCle() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY;
  try {
    const contenu = readFileSync(CLICKZOU_ENV, "utf8");
    const ligne = contenu.split(/\r?\n/).find((l) => /^\s*FAL_KEY\s*=/.test(l));
    if (ligne) return ligne.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
  } catch {
    /* fichier absent : on tombe sur l'erreur ci-dessous */
  }
  throw new Error(`FAL_KEY introuvable (ni dans l'environnement, ni dans ${CLICKZOU_ENV})`);
}

const cle = lireCle();
mkdirSync(OUT_DIR, { recursive: true });

for (const scene of SCENES) {
  if (ONLY && scene.slug !== ONLY) continue;
  const fichier = path.join(OUT_DIR, `${scene.slug}.jpg`);
  if (existsSync(fichier) && !FORCE) {
    console.log(`= ${scene.slug} : deja present, ignore`);
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
      safety_tolerance: "2",
    }),
  });

  if (!reponse.ok) {
    console.error(`x ${scene.slug} : ${reponse.status} ${await reponse.text()}`);
    continue;
  }

  const data = await reponse.json();
  const url = data?.images?.[0]?.url;
  if (!url) {
    console.error(`x ${scene.slug} : reponse sans image`, JSON.stringify(data).slice(0, 200));
    continue;
  }

  const image = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(fichier, image);
  console.log(`+ ${scene.slug} : ${Math.round(image.length / 1024)} Ko`);
}

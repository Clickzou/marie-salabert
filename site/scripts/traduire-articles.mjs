/**
 * Traduit les articles du blog vers l'anglais et l'italien via l'API Claude.
 *
 * Chaque article `src/content/articles/<slug>.mdx` produit un
 * `<slug>.en.mdx` et un `<slug>.it.mdx` ; le chargeur d'articles preferera la
 * version traduite quand elle existe. Les fichiers deja presents ne sont pas
 * regeneres (--force pour les refaire).
 *
 * Usage : node scripts/traduire-articles.mjs [--force] [--langue=en] [--only=slug]
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const CLICKZOU_ENV =
  "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";
const ARTICLES = path.resolve("src/content/articles");
const MODELE = "claude-sonnet-5";
const FORCE = process.argv.includes("--force");
const LANGUE = (process.argv.find((a) => a.startsWith("--langue=")) ?? "").replace("--langue=", "");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) ?? "").replace("--only=", "");

const CIBLES = { en: "anglais britannique", it: "italien" };

const CONSIGNES = `Tu traduis les articles du site d'une ostéopathe animalière française (Marie Salabert).

Format : un fichier MDX composé d'un frontmatter YAML entre --- puis d'un corps en Markdown.

Règles :
- Rends le fichier complet, même structure, mêmes clés de frontmatter, dans le même ordre.
- Traduis les valeurs de title, description, excerpt, imageAlt et dateLabel, ainsi que tout le corps.
- Ne modifie pas : slug, date, image, related, les URL, les liens Markdown (seul leur libellé est traduit).
- Ne traduis pas les noms propres (Marie Salabert, SymbiOsteo, UFEOA, CNOV, RNA, IFCE, SFDO, CGAAER, La Semaine Vétérinaire, Hegel, Thotis), ni les noms d'établissements ou de revues.
- Conserve la mise en forme Markdown (titres ##, paragraphes, listes, liens).
- Registre : professionnel, clair, chaleureux.
- Réponds uniquement par le contenu du fichier, sans texte autour ni bloc de code.`;

function lireCle() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const contenu = readFileSync(CLICKZOU_ENV, "utf8");
  const ligne = contenu.split(/\r?\n/).find((l) => /^\s*ANTHROPIC_API_KEY\s*=/.test(l));
  if (!ligne) throw new Error("ANTHROPIC_API_KEY introuvable");
  return ligne.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

async function traduire(cle, contenu, languePrompt) {
  const reponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": cle,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODELE,
      max_tokens: 8000,
      system: CONSIGNES,
      messages: [
        { role: "user", content: `Traduis en ${languePrompt} le fichier suivant :\n\n${contenu}` },
      ],
    }),
  });
  if (!reponse.ok) throw new Error(`API ${reponse.status} : ${await reponse.text()}`);
  const data = await reponse.json();
  return data.content
    .filter((bloc) => bloc.type === "text")
    .map((bloc) => bloc.text)
    .join("")
    .trim()
    .replace(/^```(?:mdx|markdown)?\n?/, "")
    .replace(/\n?```$/, "");
}

const cle = lireCle();
const sources = readdirSync(ARTICLES).filter((f) => /\.mdx?$/.test(f) && !/\.(en|it)\.mdx?$/.test(f));

for (const fichier of sources) {
  const slug = fichier.replace(/\.mdx?$/, "");
  if (ONLY && slug !== ONLY) continue;
  const contenu = readFileSync(path.join(ARTICLES, fichier), "utf8");

  for (const [langue, libelle] of Object.entries(CIBLES)) {
    if (LANGUE && langue !== LANGUE) continue;
    const cible = path.join(ARTICLES, `${slug}.${langue}.mdx`);
    if (existsSync(cible) && !FORCE) {
      console.log(`= ${slug}.${langue}`);
      continue;
    }
    const traduit = await traduire(cle, contenu, libelle);
    if (!traduit.startsWith("---")) {
      console.error(`x ${slug}.${langue} : frontmatter manquant, ignore`);
      continue;
    }
    writeFileSync(cible, `${traduit}\n`, "utf8");
    console.log(`+ ${slug}.${langue} (${Math.round(traduit.length / 100) / 10} k)`);
  }
}

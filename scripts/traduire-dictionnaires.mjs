/**
 * Traduit le dictionnaire francais vers l'anglais et l'italien via l'API Claude.
 *
 * Seules les cles absentes de la langue cible sont envoyees : une traduction
 * deja relue n'est jamais ecrasee (utiliser --force pour tout regenerer).
 * La cle API est lue dans le .env.local du projet Clickzou, comme les autres
 * scripts de contenu.
 *
 * Usage : node scripts/traduire-dictionnaires.mjs [--force] [--langue=en]
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const CLICKZOU_ENV =
  "C:/Users/jc/Documents/CLICKZOU/2- SITE CLICKZOU/SITE IA/clickzou-v2/.env.local";
const DICO = path.resolve("src/i18n/dictionnaires");
const MODELE = "claude-sonnet-5";
const FORCE = process.argv.includes("--force");
const LANGUE = (process.argv.find((a) => a.startsWith("--langue=")) ?? "").replace("--langue=", "");

const CIBLES = {
  en: "anglais britannique",
  it: "italien",
};

const CONSIGNES = `Tu traduis le contenu d'un site vitrine d'ostéopathie animale (praticienne française, Marie Salabert).

Règles :
- Rends STRICTEMENT le même objet JSON : mêmes clés, même structure, même ordre. Ne traduis que les valeurs textuelles.
- Ne traduis pas : les noms propres (Marie Salabert, SymbiOsteo, UFEOA, CNOV, RNA, Djooka, Hegel, Val Dadou, Graulhet, Toulouse, noms de départements français), les URL, les codes de département, les adresses e-mail et les numéros.
- Conserve tels quels les gabarits comme {n}.
- Registre : professionnel, chaleureux, sobre. Vouvoiement en français rendu par un ton courtois.
- Vocabulaire métier : « ostéopathie animale » = "animal osteopathy" / "osteopatia animale" ; « ostéopathe animalier » = "animal osteopath" / "osteopata animale" ; « séance » = "session" / "seduta" ; « consultation » = "consultation" / "consulto".
- Réponds uniquement par le JSON, sans texte autour ni bloc de code.`;

function lireCle() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const contenu = readFileSync(CLICKZOU_ENV, "utf8");
  const ligne = contenu.split(/\r?\n/).find((l) => /^\s*ANTHROPIC_API_KEY\s*=/.test(l));
  if (!ligne) throw new Error("ANTHROPIC_API_KEY introuvable");
  return ligne.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

const estObjet = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/** Sous-arbre du francais dont la traduction manque dans la cible. */
function manquant(source, cible) {
  if (!estObjet(source)) return cible === undefined ? source : undefined;
  const reste = {};
  for (const [cle, valeur] of Object.entries(source)) {
    const equivalent = estObjet(cible) ? cible[cle] : undefined;
    if (Array.isArray(valeur)) {
      if (equivalent === undefined || equivalent.length !== valeur.length) reste[cle] = valeur;
      continue;
    }
    if (estObjet(valeur)) {
      const sous = manquant(valeur, equivalent);
      if (sous && Object.keys(sous).length) reste[cle] = sous;
      continue;
    }
    if (equivalent === undefined) reste[cle] = valeur;
  }
  return reste;
}

function fusionner(base, ajout) {
  if (!estObjet(base) || !estObjet(ajout)) return ajout ?? base;
  const sortie = { ...base };
  for (const [cle, valeur] of Object.entries(ajout)) {
    sortie[cle] = estObjet(valeur) ? fusionner(base[cle] ?? {}, valeur) : valeur;
  }
  return sortie;
}

/** Taille au-dela de laquelle un bloc est decoupe avant traduction. */
const TAILLE_MAX = 6000;

/**
 * Traduit un bloc en le decoupant si besoin : une reponse du modele est
 * limitee en jetons, un dictionnaire entier ne tient pas d'un seul tenant.
 */
async function traduireParMorceaux(cle, contenu, languePrompt, chemin = "") {
  const taille = JSON.stringify(contenu).length;
  if (taille <= TAILLE_MAX) {
    if (chemin) console.log(`   · ${chemin} (${taille})`);
    return traduire(cle, contenu, languePrompt);
  }

  /* Un tableau trop long est traduit par tranches, puis recolle : le modele
     rendrait sinon un JSON tronque. */
  if (Array.isArray(contenu)) {
    const morceaux = [];
    let tranche = [];
    for (const element of contenu) {
      tranche.push(element);
      if (JSON.stringify(tranche).length > TAILLE_MAX / 2) {
        morceaux.push(tranche);
        tranche = [];
      }
    }
    if (tranche.length) morceaux.push(tranche);

    const sortieTableau = [];
    for (const [i, morceau] of morceaux.entries()) {
      console.log(`   · ${chemin}[${i}] (${JSON.stringify(morceau).length})`);
      sortieTableau.push(...(await traduire(cle, morceau, languePrompt)));
    }
    return sortieTableau;
  }

  if (!estObjet(contenu)) return traduire(cle, contenu, languePrompt);

  const sortie = {};
  for (const [sousCle, valeur] of Object.entries(contenu)) {
    sortie[sousCle] = await traduireParMorceaux(
      cle,
      valeur,
      languePrompt,
      chemin ? `${chemin}.${sousCle}` : sousCle,
    );
  }
  return sortie;
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
      max_tokens: 16000,
      system: CONSIGNES,
      messages: [
        {
          role: "user",
          content: `Traduis en ${languePrompt} le JSON suivant :\n\n${JSON.stringify(contenu, null, 2)}`,
        },
      ],
    }),
  });

  if (!reponse.ok) throw new Error(`API ${reponse.status} : ${await reponse.text()}`);
  const data = await reponse.json();
  const texte = data.content
    .filter((bloc) => bloc.type === "text")
    .map((bloc) => bloc.text)
    .join("")
    .trim()
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "");
  return JSON.parse(texte);
}

const cle = lireCle();
const fr = JSON.parse(readFileSync(path.join(DICO, "fr.json"), "utf8"));

for (const [langue, libelle] of Object.entries(CIBLES)) {
  if (LANGUE && langue !== LANGUE) continue;

  const chemin = path.join(DICO, `${langue}.json`);
  const existant = FORCE ? {} : JSON.parse(readFileSync(chemin, "utf8"));
  const aTraduire = manquant(fr, existant);

  if (!aTraduire || Object.keys(aTraduire).length === 0) {
    console.log(`= ${langue} : rien a traduire`);
    continue;
  }

  const nbCles = JSON.stringify(aTraduire).length;
  console.log(`… ${langue} : ${nbCles} caracteres a traduire`);
  const traduit = await traduireParMorceaux(cle, aTraduire, libelle);
  const fusionne = fusionner(existant, traduit);
  writeFileSync(chemin, `${JSON.stringify(fusionne, null, 2)}\n`, "utf8");
  console.log(`+ ${langue} : ${chemin.split(path.sep).pop()} mis a jour`);
}

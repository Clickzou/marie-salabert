import Image from "next/image";
import type { ReactNode } from "react";

/** Texte exact de l'article R.243-6 du CRPM, place en citation encadree. */
const ARTICLE_R243_6 =
  '"Pour l’application du 12° de l’article L243-3, on entend par "acte d’ostéopathie animale" les manipulations ayant pour seul but de prévenir ou de traiter des troubles fonctionnels du corps de l’animal, à l’exclusion des pathologies organiques qui nécessitent une intervention thérapeutique, médicale, chirurgicale, médicamenteuse ou par agents physiques. Ces manipulations sont musculo-squelettiques et myo-fasciales, exclusivement manuelles et externes. Pour la prise en charge de ces troubles fonctionnels, les personnes réalisant des actes d’ostéopathie animale effectuent des actes de manipulations et mobilisations non instrumentales, directes et indirectes, non forcées."';

/** Les libelles sont traduits ; seules les adresses restent ici. */
const liens = [
  { href: "https://extranet.veterinaire.fr/annuaires/osteopathes" },
  {
    href: "https://www.veterinaire.fr/la-profession-veterinaire/nos-grands-dossiers/osteopathie-animale",
  },
  { href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044233614" },
  { href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000034451012" },
] as const;

/* `largeur`/`hauteur` doivent porter les dimensions reelles du fichier : elles ne
   fixent pas la taille affichee (le CSS s'en charge) mais le ratio que le
   navigateur reserve. Les deux logos etaient declares 1200x630, ce qui faussait
   la boite du webp du ministere, reellement en 3840x2434. */
const logos = [
  {
    src: "/images/2024/05/logo-ministere-agriculture.webp",
    alt: "Logo du ministère de l’Agriculture et de la Souveraineté alimentaire",
    largeur: 3840,
    hauteur: 2434,
    optimise: true,
  },
  {
    src: "/images/2024/05/logo-cnov.gif",
    alt: "Logo du Conseil National de l’Ordre des Vétérinaires (CNOV)",
    largeur: 1200,
    hauteur: 630,
    optimise: false,
  },
] as const;

/** Fleche des liens sortants. */
function Fleche() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

/** Intitule des encarts : meme graisse, meme filet, dans les deux colonnes. */
function TitreEncart({ children }: { children: ReactNode }) {
  return (
    <p className="border-b border-line bg-surface-alt px-6 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
    </p>
  );
}

/**
 * Section « Législation » : trois colonnes de largeur egale — les jalons
 * chronologiques, les autorites de reference avec leurs logos, les textes et
 * registres a consulter — puis l'article R.243-6 en pleine largeur.
 */
export function AProposLegislation({
  textes,
}: {
  textes: {
    jalons: readonly { annee: string; titre: string; texte: string }[];
    obligation: string;
    autorites: string;
    liensTitre: string;
    liens: readonly string[];
    logos: readonly string[];
    articleTitre: string;
  };
}) {
  return (
    /* Trois colonnes egales, sur toute la largeur de la section : la colonne de
       texte trouve la sa largeur de lecture sans avoir besoin d'un plafond, et
       les deux encarts occupent le reste au lieu d'etre repousses au bord. */
    <div className="grid gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-14">
      <div>
        {/* Reperes chronologiques : filet vertical et annee en gros caracteres */}
        <ol className="relative space-y-10 border-l border-line pl-8 sm:pl-10">
          {textes.jalons.map((j) => (
            <li key={j.annee} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-2 h-2.5 w-2.5 rounded-full bg-plum ring-4 ring-surface sm:-left-[49px]"
              />
              <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-plum sm:text-[34px]">
                {j.annee}
              </p>
              <h3 className="mt-3 text-[19px] leading-snug text-ink">{j.titre}</h3>
              <p className="mt-3 text-[16.5px] leading-[1.7] text-body">{j.texte}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-[16.5px] leading-[1.7] text-body">{textes.obligation}</p>
      </div>

      {/* Les deux encarts partagent le meme cadre : filets pleine largeur
            plutot que marges, pour que chaque bloc se lise d'un seul tenant. */}
      <aside className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_50px_-40px_rgba(22,23,26,0.5)]">
        <TitreEncart>{textes.autorites}</TitreEncart>
        {/* Les colonnes s'alignent sur la plus haute : chaque logo prend la
              moitie du reste et s'y centre, plutot que de tasser les deux en
              haut et de laisser un vide en bas de carte. */}
        <div className="flex flex-1 flex-col divide-y divide-line">
          {logos.map((l, i) => (
            <figure
              key={l.src}
              className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center"
            >
              {/* Hauteur commune : les deux logos n'ont ni le meme ratio ni les
                    memes marges internes, seule une boite fixe les aligne. */}
              <div className="flex h-[132px] items-center justify-center">
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.largeur}
                  height={l.hauteur}
                  unoptimized={!l.optimise}
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <figcaption className="text-[13.5px] leading-snug text-muted">
                {textes.logos[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </aside>

      {/* Liens en lignes pleine largeur : la fleche est calee a droite, ce qui
            aligne les cibles de survol au lieu de laisser un bord en drapeau.
            Le texte reglementaire ferme la colonne : il est de la meme famille
            que les liens et remplit la carte, plutot que d'occuper un bloc
            separe sous la grille. */}
      <aside className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_50px_-40px_rgba(22,23,26,0.5)]">
        <TitreEncart>{textes.liensTitre}</TitreEncart>
        <ul className="divide-y divide-line">
          {liens.map((lien, i) => (
            <li key={lien.href}>
              <a
                href={lien.href}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link flex items-center justify-between gap-4 px-6 py-4 text-[15px] font-medium leading-snug text-plum transition-colors duration-300 hover:bg-surface"
              >
                <span>{textes.liens[i]}</span>
                <Fleche />
              </a>
            </li>
          ))}
        </ul>

        <figure className="flex-1 border-t border-line bg-surface-alt px-6 py-7">
          <figcaption className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-plum">
            {textes.articleTitre}
          </figcaption>
          <blockquote className="mt-5 text-[15px] leading-[1.7] text-body">
            {ARTICLE_R243_6}
          </blockquote>
        </figure>
      </aside>
    </div>
  );
}

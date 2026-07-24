import Image from "next/image";

/** Texte exact de l'article R.243-6 du CRPM, place en citation encadree. */
const ARTICLE_R243_6 =
  '"Pour l’application du 12° de l’article L243-3, on entend par "acte d’ostéopathie animale" les manipulations ayant pour seul but de prévenir ou de traiter des troubles fonctionnels du corps de l’animal, à l’exclusion des pathologies organiques qui nécessitent une intervention thérapeutique, médicale, chirurgicale, médicamenteuse ou par agents physiques. Ces manipulations sont musculo-squelettiques et myo-fasciales, exclusivement manuelles et externes. Pour la prise en charge de ces troubles fonctionnels, les personnes réalisant des actes d’ostéopathie animale effectuent des actes de manipulations et mobilisations non instrumentales, directes et indirectes, non forcées."';

/** Les deux dates qui structurent le cadre legal, presentees en repere. */
const jalons = [
  {
    annee: "2011",
    titre: "Reconnaissance légale de la pratique",
    texte:
      "Le ministère de l’Agriculture reconnaît la pratique des ostéopathes animaliers au sein du 12° de l’article L243-3 du code rural et de la pêche maritime (CRPM).",
  },
  {
    annee: "2017",
    titre: "Décrets du 19 avril",
    texte:
      "Les actes d’ostéopathie animale peuvent être réalisés par des personnes non vétérinaires ayant réussi l’épreuve nationale d’aptitude, inscrites au Registre National d’Aptitude (RNA) et figurant sur la liste tenue par le Conseil national de l’Ordre des vétérinaires (CNOV).",
  },
] as const;

const liens = [
  {
    label: "Annuaire des ostéopathes inscrits (CNOV)",
    href: "https://extranet.veterinaire.fr/annuaires/osteopathes",
  },
  {
    label: "veterinaire.fr — rubrique Ostéopathie animale",
    href: "https://www.veterinaire.fr/la-profession-veterinaire/nos-grands-dossiers/osteopathie-animale",
  },
  {
    label: "Article L243-3, 12° du CRPM",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044233614",
  },
  {
    label: "Article R.243-6 du CRPM",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000034451012",
  },
] as const;

const logos = [
  {
    src: "/images/2024/05/logo-ministere-agriculture.webp",
    alt: "Logo du ministère de l’Agriculture et de la Souveraineté alimentaire",
    legende: "Ministère de l’Agriculture et de la Souveraineté alimentaire",
    optimise: true,
  },
  {
    src: "/images/2024/05/logo-cnov.gif",
    alt: "Logo du Conseil National de l’Ordre des Vétérinaires (CNOV)",
    legende: "Conseil National de l’Ordre des Vétérinaires",
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

/**
 * Section « Législation » : deux jalons en repere chronologique, encart des
 * autorites de reference avec leurs logos, puis le texte integral de l'article
 * R.243-6 en pleine largeur.
 */
export function AProposLegislation() {
  return (
    <div className="space-y-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div>
          {/* Reperes chronologiques : filet vertical et annee en gros caracteres */}
          <ol className="relative space-y-10 border-l border-line pl-8 sm:pl-10">
            {jalons.map((j) => (
              <li key={j.annee} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-2 h-2.5 w-2.5 rounded-full bg-plum ring-4 ring-surface sm:-left-[49px]"
                />
                <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-plum sm:text-[34px]">
                  {j.annee}
                </p>
                <h3 className="mt-3 text-[19px] leading-snug text-ink">{j.titre}</h3>
                <p className="mt-3 max-w-2xl text-[16.5px] leading-[1.7] text-body">{j.texte}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-2xl text-[16.5px] leading-[1.7] text-body">
            Par ailleurs, l’ostéopathe animalier est tenu d’orienter le propriétaire vers un
            vétérinaire lorsque l’état de l’animal nécessite un diagnostic médical, un traitement, ou
            lorsque les troubles observés dépassent le champ de compétence de l’ostéopathie. Cette
            obligation fait partie des règles déontologiques fixées par le Code rural.
          </p>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-line bg-white p-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
              Autorités de référence
            </p>
            <div className="mt-6 space-y-7">
              {logos.map((l) => (
                <figure key={l.src} className="flex flex-col items-center gap-3 text-center">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={1200}
                    height={630}
                    unoptimized={!l.optimise}
                    sizes="(max-width: 1024px) 45vw, 200px"
                    className="h-auto w-full max-w-[180px] object-contain"
                  />
                  <figcaption className="text-[13px] leading-snug text-muted">
                    {l.legende}
                  </figcaption>
                </figure>
              ))}
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <a
                    href={lien.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link inline-flex items-start gap-2 text-[14.5px] font-medium leading-snug text-plum"
                  >
                    {lien.label}
                    <Fleche />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Texte reglementaire, en pleine largeur pour respirer */}
      <figure className="rounded-lg bg-white p-8 ring-1 ring-line sm:p-12">
        <figcaption className="text-[12px] font-semibold uppercase tracking-[0.16em] text-plum">
          Article R.243-6 du code rural et de la pêche maritime
        </figcaption>
        <blockquote className="mt-6 max-w-4xl text-[16.5px] leading-[1.75] text-body">
          {ARTICLE_R243_6}
        </blockquote>
      </figure>
    </div>
  );
}

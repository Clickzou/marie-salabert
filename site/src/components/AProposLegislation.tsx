import Image from "next/image";
import { MissingVisual } from "./AProposPlaceholder";

/** Texte exact de l'article R.243-6 du CRPM, place en citation encadree. */
const ARTICLE_R243_6 =
  'Art R.243-6  "Pour l’application du 12° de l’article L243-3, on entend par "acte d’ostéopathie animale" les manipulations ayant pour seul but de prévenir ou de traiter des troubles fonctionnels du corps de l’animal, à l’exclusion des pathologies organiques qui nécessitent une intervention thérapeutique, médicale, chirurgicale, médicamenteuse ou par agents physiques. Ces manipulations sont musculo-squelettiques et myo-fasciales, exclusivement manuelles et externes. Pour la prise en charge de ces troubles fonctionnels, les personnes réalisant des actes d’ostéopathie animale effectuent des actes de manipulations et mobilisations non instrumentales, directes et indirectes, non forcées."';

const references = [
  {
    label: "12° du L243-3 du CRPM",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044233614",
  },
  {
    label: "Article R.243-6 du CRPM",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000034451012",
  },
] as const;

/**
 * Contenu de la section « Législation » de la page A propos : cadre reglementaire,
 * logos institutionnels, citation encadree de l'article R.243-6 et references web.
 */
export function AProposLegislation() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-6 text-[15px] leading-relaxed text-body">
        <p>
          En 2011, la pratique des ostéopathes animaliers fut reconnue légalement par le Ministère
          de l’Agriculture et de l’Alimentation et de la Fôret ; au sein du 12° de l’Article L243-3
          du code rural et de la pêche maritime (CRPM).
        </p>
        <p>
          Depuis les décrets du 19 avril 2017, les actes d’ostéopathie animale peuvent être réalisés
          par des personnes non vétérinaires ayant satisfait aux exigences réglementaires. Ces
          dernières doivent avoir réussi l’épreuve nationale d’aptitude, être inscrites sur le
          Registre National d’Aptitude (RNA) et figurer sur la liste tenue par le Conseil national
          de l’Ordre des vétérinaires (CNOV).
        </p>
        <p>
          <a
            href="https://extranet.veterinaire.fr/annuaires/osteopathes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-plum underline underline-offset-2 hover:text-plum-dark"
          >
            Consulter l’annuaire des ostéopathes inscrits (CNOV)
          </a>
        </p>

        <blockquote className="border-l-4 border-plum bg-surface p-6 text-[15px] italic leading-relaxed text-ink">
          {ARTICLE_R243_6}
        </blockquote>

        <p>
          Par ailleurs, l’ostéopathe animalier est tenu d’orienter le propriétaire vers un
          vétérinaire lorsque l’état de l’animal nécessite un diagnostic médical, un traitement, ou
          lorsque les troubles observés dépassent le champ de compétence de l’ostéopathie. Cette
          obligation fait partie des règles déontologiques fixées par le Code rural.
        </p>
        <p>
          Pour suivre l’actualité réglementaire de l’ostéopathie animale vous pouvez consulter le
          site internet du Conseil National de l’Ordre des Vétérinaires (CNOV), à la rubrique
          «&nbsp;Ostéopathie Animale&nbsp;»
        </p>
        <p>
          <a
            href="https://www.veterinaire.fr/la-profession-veterinaire/nos-grands-dossiers/osteopathie-animale"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-plum underline underline-offset-2 hover:text-plum-dark"
          >
            veterinaire.fr — rubrique Ostéopathie Animale
          </a>
        </p>

        <div className="border-t border-black/10 pt-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
            Références web
          </p>
          <ul className="mt-3 space-y-2">
            {references.map((ref) => (
              <li key={ref.href} className="text-[15px] leading-relaxed">
                <span className="text-body">{ref.label} : </span>
                <a
                  href={ref.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-plum underline underline-offset-2 hover:text-plum-dark"
                >
                  {ref.href}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="flex flex-col gap-6 lg:pt-1">
        <MissingVisual
          label="Logo Ministère de l’Agriculture et de la Souveraineté alimentaire — à fournir"
          className="aspect-square"
        />
        <figure className="flex flex-col items-center gap-3 rounded-[6px] bg-white p-4 shadow-sm">
          <Image
            src="/images/2024/05/logo-conseil-ordre-national-des-medecins.png"
            alt="Logo du Conseil National de l’Ordre des Vétérinaires (CNOV)"
            width={300}
            height={300}
            sizes="(max-width: 1024px) 40vw, 200px"
            className="h-auto w-full max-w-[180px] object-contain"
          />
          <figcaption className="text-center text-[13px] font-medium text-muted">
            Conseil National de l’Ordre des Vétérinaires
          </figcaption>
        </figure>
      </aside>
    </div>
  );
}

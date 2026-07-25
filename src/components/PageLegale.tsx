import type { ReactNode } from "react";
import { LegalPage, LegalSection, LegalSubTitle, LegalText } from "./LegalPage";

/** Section d'une page legale, telle que stockee dans les dictionnaires. */
export type SectionLegale = {
  titre: string;
  paragraphes: string[];
  sousTitres?: string[];
  liste?: string[];
};

export type ContenuLegal = {
  titre: string;
  intro: string[];
  sections: SectionLegale[];
};

/** Remplace les reperes {{site.x}} par leur valeur. */
function substituer(texte: string, valeurs: Record<string, string>) {
  return texte.replace(/\{\{([\w.]+)\}\}/g, (_, cle: string) => valeurs[cle] ?? "");
}

/**
 * Rend un texte contenant des liens Markdown `[libelle](url)`.
 * Les pages legales n'ont pas d'autre mise en forme en ligne.
 */
function avecLiens(texte: string): ReactNode[] {
  const morceaux: ReactNode[] = [];
  const motif = /\[([^\]]+)\]\(([^)]+)\)/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = motif.exec(texte)) !== null) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    const externe = /^https?:/.test(m[2]);
    morceaux.push(
      <a
        key={`lien-${i}`}
        href={m[2]}
        className="underline-grow font-medium text-plum"
        {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {m[1]}
      </a>,
    );
    dernier = m.index + m[0].length;
    i += 1;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return morceaux;
}

/**
 * Gabarit commun aux trois pages legales : le contenu vient du dictionnaire,
 * ce qui permet de le traduire sans toucher au balisage.
 */
export function PageLegale({
  contenu,
  valeurs = {},
  children,
}: {
  contenu: ContenuLegal;
  /** valeurs des reperes {{site.x}} */
  valeurs?: Record<string, string>;
  /** blocs interactifs propres a une page (tableau des cookies, bouton de consentement) */
  children?: (indexSection: number) => ReactNode;
}) {
  return (
    <LegalPage title={contenu.titre}>
      {contenu.intro.map((par) => (
        <LegalText key={par.slice(0, 40)}>{avecLiens(substituer(par, valeurs))}</LegalText>
      ))}

      {contenu.sections.map((section, i) => (
        <LegalSection key={section.titre || i} title={section.titre} tone="sky">
          {section.paragraphes.map((par) => (
            <LegalText key={par.slice(0, 40)}>{avecLiens(substituer(par, valeurs))}</LegalText>
          ))}

          {section.liste && (
            <ul className="mt-4 space-y-2 pl-5">
              {section.liste.map((item) => (
                <li key={item.slice(0, 40)} className="list-disc text-[15px] leading-relaxed text-body">
                  {avecLiens(substituer(item, valeurs))}
                </li>
              ))}
            </ul>
          )}

          {section.sousTitres?.map((sousTitre) => (
            <LegalSubTitle key={sousTitre}>{sousTitre}</LegalSubTitle>
          ))}

          {children?.(i)}
        </LegalSection>
      ))}
    </LegalPage>
  );
}

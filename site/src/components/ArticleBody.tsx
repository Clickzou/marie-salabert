import { Fragment, type ReactNode } from "react";
import { toBlocks } from "@/lib/articles";
import { Button } from "@/components/ui";

/**
 * Rendu du corps Markdown d'un article : paragraphes gris interlignes larges
 * et sous-titres en police d'affichage, comme sur le gabarit d'article
 * d'origine.
 *
 * Deux extensions Markdown maison :
 *  - liens inline `[texte](url)` -> ancre en prune, soulignee ;
 *  - un paragraphe compose d'un seul lien `[texte](url)` -> bouton
 *    « rounded-full » (utilise pour les videos, podcasts, PDF, presse…).
 * Les liens externes (http) ouvrent un nouvel onglet en toute securite.
 */

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const SOLE_LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Transforme une ligne de texte en fragments JSX, liens inline compris. */
function renderInline(line: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  let i = 0;
  while ((m = LINK.exec(line)) !== null) {
    if (m.index > last) nodes.push(line.slice(last, m.index));
    const [, text, href] = m;
    nodes.push(
      <a
        key={`${keyPrefix}-l${i}`}
        href={href}
        className="underline-grow font-medium text-plum"
        {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {text}
      </a>,
    );
    last = m.index + m[0].length;
    i += 1;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

export default function ArticleBody({ body }: { body: string }) {
  const blocks = toBlocks(body);

  const blocsTexte = blocks.filter((b) => b.type === "paragraph");
  const premierParagraphe = blocsTexte[0];

  return (
    <div className="space-y-7">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          const Tag = `h${block.level}` as "h2" | "h3" | "h4";
          return (
            <Tag
              key={i}
              className="pt-8 text-[24px] leading-snug tracking-[-0.02em] text-ink sm:text-[28px]"
            >
              {block.lines[0]}
            </Tag>
          );
        }

        // Paragraphe reduit a un unique lien -> bouton
        const sole = block.lines.length === 1 && block.lines[0].match(SOLE_LINK);
        if (sole) {
          const [, label, href] = sole;
          return (
            <p key={i} className="pt-2">
              <Button href={href} variant="green">
                {label}
              </Button>
            </p>
          );
        }

        /* Le premier paragraphe sert d'accroche : plus grand et en encre foncee. */
        const accroche = block === premierParagraphe;

        return (
          <p
            key={i}
            className={
              accroche
                ? "text-[19px] leading-[1.6] text-ink sm:text-[21px]"
                : "text-[17px] leading-[1.8] text-body"
            }
          >
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line, `${i}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

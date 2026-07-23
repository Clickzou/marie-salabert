import type { ReactNode } from "react";
import { Container } from "./ui";

/**
 * Gabarit sobre des pages legales (mentions, confidentialite, cookies).
 * Reproduit la mise en page d'origine : colonne etroite, titre en police
 * d'affichage, sous-titres colores et paragraphes a interligne genereux.
 */
export function LegalPage({
  title,
  align = "center",
  children,
}: {
  title: string;
  align?: "center" | "left";
  children: ReactNode;
}) {
  return (
    <div className="bg-white py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-[860px]">
          <h1
            className={`font-display text-[30px] leading-tight text-plum sm:text-[38px] ${
              align === "center" ? "text-center" : ""
            }`}
          >
            {title}
          </h1>
          <div className="mt-8 space-y-7">{children}</div>
        </div>
      </Container>
    </div>
  );
}

/** Sous-titre de section, avec le bloc de texte qui le suit. */
export function LegalSection({
  title,
  tone = "plum",
  children,
}: {
  title: string;
  tone?: "plum" | "sky";
  children?: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2
        className={`text-[19px] font-semibold leading-snug sm:text-[22px] ${
          tone === "sky" ? "text-sky" : "text-plum"
        }`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Sous-sous-titre (numerotation 5.1, 7.1... de la politique de cookies). */
export function LegalSubTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-[17px] font-semibold text-plum sm:text-[19px]">{children}</h3>;
}

/** Paragraphe courant des pages legales. */
export function LegalText({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-body">{children}</p>;
}

/** Intitule en gras qui introduit un paragraphe (politique de confidentialite). */
export function LegalLead({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/** Liste a puces sobre des pages legales. */
export function LegalList({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2 text-[15px] leading-relaxed text-body marker:text-plum">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

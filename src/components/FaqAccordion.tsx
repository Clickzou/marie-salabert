import type { ReactNode } from "react";

export type FaqItem = {
  /** Question affichee dans l'entete de l'accordeon */
  question: string;
  /** Reponse riche (JSX) rendue dans le panneau */
  answer: ReactNode;
  /** Meme reponse en texte brut, pour le JSON-LD FAQPage */
  plain: string;
};

/**
 * Accordeons de la page FAQ, en <details>/<summary> natifs : accessibles au
 * clavier et fonctionnels sans JavaScript. Chaque question est une ligne sobre
 * separee par un filet, avec un « + » qui pivote en « × » a l'ouverture.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-8 border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[17px] font-medium leading-snug text-ink transition-colors marker:hidden hover:text-plum group-open:text-plum focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-plum transition-all duration-500 group-hover:border-plum/40 group-open:rotate-45 group-open:border-plum group-open:bg-plum group-open:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="max-w-3xl pb-8 pr-12 text-[16px] leading-[1.75] text-body">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Balisage schema.org FAQPage, genere auparavant par Yoast sur le site d'origine. */
export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.plain },
    })),
  };
}

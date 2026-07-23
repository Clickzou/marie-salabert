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
 * Accordeons de la page FAQ.
 * Reproduit le widget « toggle » d'Elementor (titre vert semi-gras precede d'un
 * chevron, filet gris clair sous chaque element) avec des <details>/<summary>
 * natifs : accessibles au clavier et fonctionnels sans JavaScript.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-4">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-[#d5d8dc]">
          <summary
            className="flex cursor-pointer list-none items-start gap-2 px-[15px] py-[15px] text-[15px] font-semibold text-green marker:hidden group-open:text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum [&::-webkit-details-marker]:hidden"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 8 12"
              fill="currentColor"
              aria-hidden="true"
              className="mt-1 shrink-0 transition-transform duration-200 group-open:rotate-90"
            >
              <path d="M0 0l8 6-8 6z" />
            </svg>
            <span>{item.question}</span>
          </summary>
          <div className="px-[15px] pb-[15px] text-[15px] leading-relaxed text-body">
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

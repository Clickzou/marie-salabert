import type { ReactNode } from "react";

type IconName = "cabinet" | "phone";

function Icon({ name }: { name: IconName }) {
  if (name === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="40"
        height="40"
        aria-hidden="true"
        className="shrink-0 text-green"
      >
        <path
          fill="currentColor"
          d="M7.4 3h-2A2.4 2.4 0 003 5.4C3 14.5 9.5 21 18.6 21a2.4 2.4 0 002.4-2.4v-2a1 1 0 00-.8-1l-3.4-.7a1 1 0 00-1 .3l-1.2 1.4a13.6 13.6 0 01-5.2-5.2l1.4-1.2a1 1 0 00.3-1l-.7-3.4a1 1 0 00-1-.8z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          d="M16.5 3.6a7.6 7.6 0 014.2 4.2M16 7.2a3.9 3.9 0 012 2"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="40"
      height="40"
      aria-hidden="true"
      className="shrink-0 text-green"
    >
      <circle cx="12" cy="4" r="2.2" fill="currentColor" />
      <path
        fill="currentColor"
        d="M4 8.2h16a1.1 1.1 0 010 2.2h-5.6l2.5 10.2a1.2 1.2 0 01-2.3.6L12 14.6l-2.6 6.6a1.2 1.2 0 01-2.3-.6l2.5-10.2H4a1.1 1.1 0 010-2.2z"
      />
    </svg>
  );
}

/**
 * Colonne « Informations de contact » des pages Reservation et Rendez-vous :
 * une pastille verte, un intitule prune puis la donnee (adresse ou telephone).
 */
export function ContactInfoBlocks({
  title,
  as: Heading = "h2",
  items,
}: {
  title: string;
  /** « Prendre rendez-vous » est le titre principal de la page contact */
  as?: "h1" | "h2";
  items: readonly { icon: IconName; label: string; content: ReactNode }[];
}) {
  return (
    <div>
      <Heading className="text-[26px] leading-tight text-green sm:text-[30px]">{title}</Heading>
      <ul className="mt-8 space-y-9">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-5">
            <Icon name={item.icon} />
            <div>
              <h3 className="text-[24px] leading-tight text-plum sm:text-[26px]">{item.label}</h3>
              <div className="mt-3 text-[15px] leading-relaxed text-body">{item.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

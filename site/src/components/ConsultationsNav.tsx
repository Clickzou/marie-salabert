import { Container } from "./ui";

/**
 * Barre de navigation interne (ancres) de la page Consultations.
 * Reste collee sous le header principal (h-[88px]) et permet de sauter
 * aux quatre grands blocs de la page. Le defilement fluide est assure par
 * `scroll-behavior: smooth` (globals.css) ; les sections cibles portent une
 * marge `scroll-mt` pour compenser la hauteur cumulee des barres fixes.
 */
const links = [
  { href: "#general", label: "Général" },
  { href: "#equides", label: "Équidés" },
  { href: "#compagnie", label: "Chiens · Chats · NAC" },
  { href: "#rente", label: "Animaux de rente" },
] as const;

export function ConsultationsNav() {
  return (
    <nav
      aria-label="Sommaire des consultations"
      className="sticky top-[88px] z-40 border-b border-black/5 bg-white/90 backdrop-blur-sm"
    >
      <Container className="px-0 sm:px-6">
        <ul className="flex items-center gap-1 overflow-x-auto px-4 py-2.5 sm:justify-center sm:gap-2 sm:px-0">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap text-body transition-colors hover:bg-plum/10 hover:text-plum sm:text-[14px]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

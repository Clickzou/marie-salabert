/**
 * Carte de coordonnee : pictogramme, intitule, valeur (cliquable si `href`),
 * renvoi WhatsApp facultatif et precision.
 *
 * Reprise de l'ancienne page de contact, fusionnee avec la prise de
 * rendez-vous : celle-ci affiche desormais l'e-mail et WhatsApp.
 */
export default function Coordonnee({
  picto,
  teinte,
  intitule,
  valeur,
  href,
  detail,
  lien,
  valeurClassName = "text-[20px] font-semibold text-plum",
}: {
  picto: React.ReactNode;
  teinte: string;
  intitule: string;
  /** Noeud et non chaine : l'e-mail y glisse un `<wbr />` avant l'arobase. */
  valeur: React.ReactNode;
  href?: string;
  detail?: string;
  /** Second lien, place sous la valeur (renvoi WhatsApp). */
  lien?: { href: string; libelle: string };
  valeurClassName?: string;
}) {
  return (
    <li className="card flex items-start gap-4 p-6">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${teinte}`}>
        {picto}
      </span>
      {/* `min-w-0` : sans lui, l'adresse electronique, mot insecable de pres de
          40 caracteres, imposait sa largeur a toute la grille et debordait de
          l'ecran sur telephone. */}
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
          {intitule}
        </p>
        {href ? (
          <a
            href={href}
            className={`mt-2 block break-words transition-colors hover:text-plum-dark ${valeurClassName}`}
          >
            {valeur}
          </a>
        ) : (
          <p className={`mt-2 break-words ${valeurClassName}`}>{valeur}</p>
        )}
        {lien && (
          <a
            href={lien.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-plum/20 px-3 py-1 text-[12px] leading-none text-plum transition-colors hover:border-plum hover:bg-plum/5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 3.5A8.5 8.5 0 004.6 16.2L3.5 20.5l4.4-1.15A8.5 8.5 0 1012 3.5z" />
            </svg>
            {lien.libelle}
          </a>
        )}
        {detail && <p className="mt-3 text-[15px] leading-relaxed text-body">{detail}</p>}
      </div>
    </li>
  );
}

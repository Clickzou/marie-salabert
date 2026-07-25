/**
 * Emplacement provisoire pour un visuel non encore fourni (page « A propos ».)
 * Rend un cadre gris clair a bordure pointillee avec une legende centree
 * indiquant ce qui doit y figurer.
 */
export function MissingVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex min-h-[120px] items-center justify-center rounded-[6px] border-2 border-dashed border-plum-soft bg-surface p-6 text-center ${
        className ?? ""
      }`}
    >
      <span className="text-[13px] font-medium leading-snug text-muted">{label}</span>
    </div>
  );
}

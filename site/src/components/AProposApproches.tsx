import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Grille des « differentes approches de l'osteopathie » de la page A Propos.
 * Reprend la carte Elementor d'origine : fond blanc arrondi, titre vert centre,
 * et le motif `shape-triangle.png` qui deborde en bas a gauche de chaque carte.
 */
export function AProposApproches({
  items,
}: {
  items: readonly { title: string; body: ReactNode }[];
}) {
  return (
    <ul className="mt-14 grid gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.title}
          className="relative flex h-full flex-col rounded-[10px] bg-white px-5 pt-8 pb-8 shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
        >
          <h3 className="text-center text-[26px] leading-tight text-green">{item.title}</h3>
          <div className="relative z-10 mt-12 space-y-6 text-[15px] leading-relaxed text-black">
            {item.body}
          </div>
          <Image
            src="/images/2023/05/shape-triangle.png"
            alt=""
            aria-hidden="true"
            width={125}
            height={125}
            className="pointer-events-none absolute -bottom-[13px] left-0 w-[125px] max-w-[60%] select-none"
          />
        </li>
      ))}
    </ul>
  );
}

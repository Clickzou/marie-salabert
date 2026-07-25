import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  className,
  width = "default",
  children,
}: {
  className?: string;
  /**
   * default : colonne centree max 1200px (pages de contenu).
   * wide    : large, plafonnee a 1720px (accueil, sections vitrine).
   * full    : toute la largeur de l'ecran, marge laterale de 100px, sans plafond.
   * narrow  : colonne de lecture etroite (textes longs, pages legales).
   */
  width?: "default" | "wide" | "full" | "narrow";
  children: ReactNode;
}) {
  const widths = {
    default: "mx-auto w-full max-w-[1200px] px-5 sm:px-6",
    wide: "mx-auto w-full max-w-[1720px] px-5 sm:px-10 lg:px-[100px]",
    full: "w-full px-5 sm:px-10 lg:px-[100px]",
    narrow: "mx-auto w-full max-w-[760px] px-5 sm:px-6",
  } as const;
  return <div className={cx(widths[width], className)}>{children}</div>;
}

export function Section({
  className,
  tone = "white",
  padding = "default",
  children,
  ...rest
}: {
  className?: string;
  tone?: "white" | "surface" | "plum" | "green";
  /**
   * Espacement vertical. A utiliser plutot qu'une surcharge `pt-0` via className :
   * l'espacement par defaut comporte une variante `sm:`, qui l'emporterait sur
   * un utilitaire sans variante.
   */
  padding?: "default" | "none" | "no-top" | "no-bottom";
  children: ReactNode;
} & ComponentProps<"section">) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    plum: "bg-plum text-white",
    green: "bg-green text-white",
  } as const;
  const paddings = {
    default: "py-24 sm:py-36",
    none: "",
    "no-top": "pb-24 sm:pb-36",
    "no-bottom": "pt-24 sm:pt-36",
  } as const;
  return (
    <section className={cx(paddings[padding], tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}

type ButtonVariant = "gold" | "green" | "plum" | "outline";

/* Jaune pour les appels a l'action principaux, vert pour les actions
   secondaires, contour fin pour les liens discrets. Plus aucun bouton noir. */
const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-dark",
  green: "bg-green text-white hover:bg-green-light",
  plum: "bg-green text-white hover:bg-green-light",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
};

export function Button({
  href,
  variant = "gold",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cx(
    "btn-shine group inline-flex items-center justify-center gap-2 rounded-[10px] px-8 py-4 text-[15px] font-medium",
    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5",
    "shadow-[0_10px_24px_-16px_rgba(22,23,26,0.8)] hover:shadow-[0_18px_36px_-18px_rgba(22,23,26,0.55)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum",
    buttonStyles[variant],
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Sur-titre decoratif (trait + label majuscule) utilise sur tout le site d'origine. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cx("eyebrow", className)}>{children}</p>;
}

export function SectionTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cx(
        // capitales fines et espacees : plus racees qu'une graisse forte
        "font-display font-light uppercase tracking-[0.05em] text-ink",
        Tag === "h1"
          ? "text-[34px] leading-[1.12] sm:text-[50px]"
          : "text-[26px] leading-[1.18] sm:text-[38px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

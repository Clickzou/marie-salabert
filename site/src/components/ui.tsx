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
   * wide    : pleine largeur avec marge laterale ~100px (accueil, sections vitrine).
   * narrow  : colonne de lecture etroite (textes longs, pages legales).
   */
  width?: "default" | "wide" | "narrow";
  children: ReactNode;
}) {
  const widths = {
    default: "mx-auto w-full max-w-[1200px] px-5 sm:px-6",
    wide: "mx-auto w-full max-w-[1720px] px-5 sm:px-10 lg:px-[100px]",
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
    default: "py-20 sm:py-28",
    none: "",
    "no-top": "pb-20 sm:pb-28",
    "no-bottom": "pt-20 sm:pt-28",
  } as const;
  return (
    <section className={cx(paddings[padding], tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}

type ButtonVariant = "gold" | "green" | "plum" | "outline";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-dark shadow-sm hover:shadow-md",
  green: "bg-green text-white hover:bg-green-light shadow-sm hover:shadow-md",
  plum: "bg-plum text-white hover:bg-plum-dark shadow-sm hover:shadow-md",
  outline: "border border-plum/30 text-plum hover:border-plum hover:bg-plum hover:text-white",
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
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium tracking-wide",
    "transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum",
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
        "font-display font-semibold text-plum",
        Tag === "h1"
          ? "text-[38px] leading-[1.1] sm:text-[52px]"
          : "text-[30px] leading-[1.15] sm:text-[40px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

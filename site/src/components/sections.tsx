import Image from "next/image";
import type { ReactNode } from "react";
import { Button, Container } from "./ui";

/** Banniere haute avec photo de fond, reprise sur toutes les pages du site d'origine. */
export function PageHero({
  image,
  images,
  title,
  subtitle,
  cta,
  height = "tall",
  priority = true,
  children,
}: {
  /** une seule image de fond */
  image?: string;
  /** ou plusieurs : diaporama avec fondu et effet Ken Burns, comme sur l'accueil d'origine */
  images?: readonly string[];
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  height?: "tall" | "short";
  priority?: boolean;
  children?: ReactNode;
}) {
  const slides = images ?? (image ? [image] : []);
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        height === "tall"
          ? "min-h-[550px] sm:min-h-[710px] lg:min-h-[960px]"
          : "min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]"
      }`}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          className={slides.length > 1 ? "hero-slide absolute inset-0" : "absolute inset-0"}
          style={
            slides.length > 1
              ? { animationDelay: `${(i * 32) / slides.length}s`, opacity: i === 0 ? 1 : 0 }
              : undefined
          }
        >
          <div className="absolute inset-0">
            <Image
              src={src}
              alt=""
              fill
              priority={priority && i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <Container className="relative py-20 text-center text-white">
        <h1 className="text-[34px] leading-tight text-white drop-shadow-sm sm:text-[42px] lg:text-[50px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-3xl text-[20px] font-bold text-white drop-shadow-sm sm:text-[26px]">
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-10">
            <Button href={cta.href} className="rounded-full px-8 py-4 text-[19px]">
              {cta.label}
            </Button>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Pastille de certification qui chevauche le bas du hero (page d'accueil). */
export function CertificationBadge({ href }: { href: string }) {
  return (
    <div className="relative z-10 -mt-16 flex flex-col items-center gap-5 pb-16">
      {/* VISUEL À FOURNIR : logo officiel du Conseil National de l'Ordre des
          Vétérinaires (CNOV). L'ancien visuel était par erreur celui de l'Ordre
          des Médecins. En attendant, pastille sobre légendée. */}
      <a
        href={href}
        aria-label="Voir ma certification (inscription au RNA / CNOV)"
        className="grid h-[132px] w-[132px] place-items-center rounded-full border border-plum/15 bg-white px-5 text-center shadow-[0_10px_30px_-12px_rgba(147,58,80,0.4)]"
      >
        <span className="font-display text-[13px] font-semibold leading-tight text-plum">
          Inscrite au RNA
          <span className="mt-1 block text-[11px] font-normal uppercase tracking-wider text-muted">
            CNOV · OA 801
          </span>
        </span>
      </a>
      <Button href={href} variant="plum" className="px-6 py-2.5 text-[13px]">
        Voir ma certification
      </Button>
    </div>
  );
}

/** Liste a puces avec coche bordeaux, motif recurrent du site. */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-body">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="mt-1 shrink-0 text-plum"
          >
            <path
              d="M3 10.5l4.5 4.5L17 5.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Bandeau d'appel a l'action rose, avec titre en police d'affichage. */
export function CtaBand({
  title,
  cta,
  image,
}: {
  title: string;
  cta: { label: string; href: string };
  /** photo de fond recouverte d'un voile prune, comme sur l'original */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-soft py-20 text-center">
      {image && (
        <>
          <Image src={image} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-plum/65" aria-hidden="true" />
        </>
      )}
      <Container width="wide" className="relative">
        <h2 className="font-display text-[32px] text-white sm:text-[42px]">{title}</h2>
        <div className="mt-8">
          <Button href={cta.href} className="rounded-[4px] px-7 py-3.5 text-[16px]">
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** Bandeau vert des avis Google. */
export function Testimonials({
  items,
}: {
  items: readonly { name: string; text: string; stars: number; href?: string }[];
}) {
  return (
    <section className="bg-green-soft py-20 sm:py-28">
      <Container width="wide">
        <h2 className="text-center text-[30px] text-white sm:text-[40px]">
          Les avis des propriétaires
        </h2>
        <span className="rule-center" />
        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.name} className="card card-hover overflow-hidden p-0">
              <div className="border-b border-black/10 px-7 py-5">
                <p className="text-[17px] font-semibold text-plum">
                  {t.href ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </p>
                <p className="mt-1 text-star" aria-label={`${t.stars} étoiles sur 5`}>
                  {"★".repeat(t.stars)}
                </p>
              </div>
              <p className="px-7 py-6 text-[15px] leading-relaxed text-body">{t.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

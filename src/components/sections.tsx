import Image from "next/image";
import type { ReactNode } from "react";
import HeroCarousel from "./HeroCarousel";
import Reveal from "./Reveal";
import { Button, Container } from "./ui";

/**
 * Banniere haute : delegue au carrousel client (contenu cale en bas a gauche,
 * tirets et fleches de navigation). Fonctionne aussi avec une seule photo.
 */
export function PageHero({
  image,
  images,
  eyebrow,
  title,
  subtitle,
  cta,
  height = "tall",
  priority = true,
  children,
}: {
  /** petite ligne en capitales au-dessus du titre */
  eyebrow?: string;
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
    <HeroCarousel
      slides={slides}
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      cta={cta}
      height={height}
      priority={priority}
    >
      {children}
    </HeroCarousel>
  );
}

/**
 * Bandeau de reconnaissance officielle, juste sous la banniere de l'accueil.
 *
 * Remplace une pastille ronde : le logo du CNOV est large (ratio proche de 2:1),
 * l'enfermer dans un cercle l'obligeait a retrecir pour tenir dans la largeur et
 * laissait deux croissants vides. Un filet horizontal lui rend ses proportions
 * et supprime les ~300 px de vide entre la banniere et le premier contenu.
 */
export function CertificationBadge({
  href,
  libelle,
  surTitre,
  mention,
}: {
  href: string;
  libelle: string;
  surTitre: string;
  mention: string;
}) {
  return (
    <section className="bg-plum text-white">
      <Container width="wide">
        <div className="flex flex-col items-center gap-6 py-8 text-center sm:flex-row sm:gap-10 sm:py-7 sm:text-left">
          {/* Logo officiel du Conseil National de l'Ordre des Vétérinaires (CNOV).
              Le GIF a un fond blanc opaque : plutot que de le laisser decouper un
              rectangle sur le bordeaux, on en fait une plaque assumee. */}
          <span className="shrink-0 rounded-md bg-white px-5 py-3">
            <Image
              src="/images/2024/05/logo-cnov.gif"
              alt="Conseil National de l'Ordre des Vétérinaires"
              width={1200}
              height={630}
              unoptimized
              sizes="200px"
              className="h-[54px] w-auto object-contain sm:h-[62px]"
            />
          </span>

          <div className="sm:flex-1">
            {/* Le sur-titre ne peut pas reprendre la classe `.eyebrow`, qui est
                bordeaux sur fond clair. L'or du site tient le contraste sur le
                bordeaux (4,7:1, au-dessus du seuil AA). */}
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
              {surTitre}
            </p>
            <p className="mt-2 text-[15px] leading-snug text-white/90">{mention}</p>
          </div>

          <a
            href={href}
            className="arrow-link inline-flex shrink-0 items-center gap-2 text-[14.5px] font-medium text-white transition-colors duration-300 hover:text-gold"
          >
            {libelle}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
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
    <section className="group/media relative overflow-hidden bg-plum py-28 text-center sm:py-36">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="img-zoom object-cover"
          />
          <div className="absolute inset-0 bg-plum/60" aria-hidden="true" />
        </>
      )}
      <Container width="wide" className="relative">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-[26px] font-light uppercase leading-[1.2] tracking-[0.05em] text-white sm:text-[38px]">
            {title}
          </h2>
          <div className="mt-10">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Logo Google, affiche a cote de la note pour identifier la source des avis. */
function LogoGoogle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

/** Etoiles pleines puis vides, pour une note sur 5. */
function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className} aria-label={`${value}/5`}>
      <span aria-hidden="true">{"★".repeat(value)}</span>
      <span aria-hidden="true" className="opacity-30">
        {"★".repeat(5 - value)}
      </span>
    </span>
  );
}

/** « 2024-03-13 » -> « mars 2024 » / « March 2024 » / « marzo 2024 ». */
function moisAnnee(iso: string, locale: string) {
  const [annee, mois] = iso.split("-");
  const nom = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(Number(annee), Number(mois) - 1, 1)),
  );
  return `${nom} ${annee}`;
}

/** Bandeau vert des avis Google : note globale de la fiche puis temoignages. */
export function Testimonials({
  items,
  profile,
  title = "Les avis des propriétaires",
  libelles = { avisGoogle: "avis Google", lireTous: "Lire les {n} avis sur Google" },
  locale = "fr",
}: {
  items: readonly { name: string; text: string; stars: number; date?: string; href?: string }[];
  /** note moyenne et nombre total d'avis de la fiche Google */
  profile?: { note: number; nombre: number; url: string };
  title?: string;
  /** libelles traduits ; « {n} » est remplace par le nombre d'avis */
  libelles?: { avisGoogle: string; lireTous: string };
  /** sert au format de la note et des dates */
  locale?: string;
}) {
  return (
    <section className="bg-surface py-24 sm:py-36">
      <Container width="wide">
        <Reveal className="text-center">
          <h2 className="text-[26px] font-light uppercase tracking-[0.05em] text-ink sm:text-[38px]">
            {title}
          </h2>
          {profile && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_14px_30px_-20px_rgba(22,23,26,0.6)] ring-1 ring-line transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-22px_rgba(22,23,26,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              <LogoGoogle size={22} />
              <span className="font-display text-[20px] font-semibold leading-none text-ink">
                {profile.note.toLocaleString(locale, { minimumFractionDigits: 1 })}
              </span>
              <Stars value={profile.note} className="text-[15px] tracking-[0.1em] text-star" />
              <span className="border-l border-ink/15 pl-3 text-[13px] text-muted">
                {profile.nombre} {libelles.avisGoogle}
              </span>
            </a>
          )}
        </Reveal>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal
              as="li"
              key={t.name}
              delay={i * 110}
              className="card card-hover flex h-full flex-col p-8"
            >
              <div className="flex items-center justify-between">
                <Stars value={t.stars} className="text-[14px] tracking-[0.15em] text-star" />
                <LogoGoogle size={16} />
              </div>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-body">{t.text}</p>
              <div className="mt-6 border-t border-ink/10 pt-4">
                <p className="text-[15px] font-semibold text-plum">
                  {t.href ? (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </p>
                {t.date && <p className="mt-0.5 text-[12.5px] text-muted">{moisAnnee(t.date, locale)}</p>}
              </div>
            </Reveal>
          ))}
        </ul>

        {profile && (
          <p className="mt-10 text-center">
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link inline-flex items-center gap-2 text-[15px] font-medium text-plum"
            >
              {libelles.lireTous.replace("{n}", String(profile.nombre))}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}

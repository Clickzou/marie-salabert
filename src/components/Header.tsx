"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cheminLocalise, cheminSansLocale, type Locale } from "@/i18n/config";
import type { Dictionnaire } from "@/i18n/dictionnaire";
import { headerCta, heroRoutes, mainNav, site } from "@/lib/site";
import SelecteurLangue from "./SelecteurLangue";
import { Container } from "./ui";

export default function Header({ locale, d }: { locale: Locale; d: Dictionnaire }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  // referme le menu mobile a chaque changement de page : ajustement pendant le
  // rendu plutot qu'un effet, qui declencherait un second rendu inutile
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* En haut d'une page a banniere, l'en-tete se fond dans la photo ; des le
     premier defilement il redevient blanc et compact. Le chemin est compare
     sans son prefixe de langue. */
  const cheminNu = cheminSansLocale(pathname);
  const surHero = heroRoutes.includes(cheminNu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = surHero && !scrolled && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        transparent
          ? "border-b border-white/15 bg-transparent"
          : "border-b border-black/5 bg-white/95 shadow-[0_10px_30px_-24px_rgba(30,41,59,0.6)] backdrop-blur-md"
      }`}
    >
      <Container
        width="wide"
        className={`flex items-center justify-between gap-4 transition-[height] duration-500 ${
          transparent ? "h-[104px]" : "h-[78px]"
        }`}
      >
        <Link
          href={cheminLocalise("/", locale)}
          className="flex shrink-0 items-center gap-3"
          aria-label={site.name}
        >
          <Image
            src="/images/2024/05/cropped-logo-osteopathe-animalier-toulouse-31.png"
            alt={`${site.practitioner} — ostéopathe animalier à Toulouse`}
            width={300}
            height={293}
            priority
            className={`w-auto transition-all duration-500 ${
              transparent ? "h-[58px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : "h-[48px]"
            }`}
          />
          <span
            className={`hidden font-display text-[19px] font-semibold leading-tight transition-colors duration-500 sm:block ${
              transparent ? "text-white drop-shadow-sm" : "text-plum"
            }`}
          >
            Marie Salabert
            <span
              className={`block text-[12px] font-normal uppercase tracking-[0.18em] transition-colors duration-500 ${
                transparent ? "text-white/80" : "text-muted"
              }`}
            >
              Ostéopathie Animale
            </span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-3 xl:gap-5">
            {mainNav.map((item) => {
              const actif =
                item.href === "/" ? cheminNu === "/" : cheminNu.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={cheminLocalise(item.href, locale)}
                    aria-current={actif ? "page" : undefined}
                    className={`group relative block whitespace-nowrap py-1 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors xl:text-[13.5px] xl:tracking-[0.08em] ${
                      transparent
                        ? "text-white/90 drop-shadow-sm hover:text-white"
                        : actif
                          ? "text-plum"
                          : "text-body hover:text-plum"
                    }`}
                  >
                    {d.nav[item.cle]}
                    {/* filet anime : plein sur la page courante, au survol ailleurs */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                        transparent ? "bg-white" : "bg-plum"
                      } ${actif ? "scale-x-100" : ""}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <SelecteurLangue locale={locale} transparent={transparent} etiquette={d.nav.changerLangue} />

          <Link
            href={cheminLocalise(headerCta.href, locale)}
            className={`btn-shine hidden whitespace-nowrap rounded-[10px] px-5 py-2.5 text-center text-[13.5px] font-medium transition-all duration-500 hover:-translate-y-0.5 sm:inline-flex xl:px-6 xl:text-[14px] ${
              transparent
                ? "border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink"
                : "bg-gold text-ink shadow-[0_10px_24px_-16px_rgba(22,23,26,0.8)] hover:bg-gold-dark"
            }`}
          >
            {d.commun.prendreRdv}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? d.nav.fermerMenu : d.nav.ouvrirMenu}
            className={`grid h-11 w-11 place-items-center rounded transition-colors lg:hidden ${
              transparent ? "text-white" : "text-plum"
            }`}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-black/5 bg-white lg:hidden">
          <Container className="py-2">
            <ul className="divide-y divide-black/5">
              {mainNav.map((item) => {
                const actif =
                  item.href === "/" ? cheminNu === "/" : cheminNu.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={cheminLocalise(item.href, locale)}
                      aria-current={actif ? "page" : undefined}
                      className={`block py-3.5 text-[14px] font-medium uppercase tracking-[0.08em] ${
                        actif ? "text-plum" : "text-body"
                      }`}
                    >
                      {d.nav[item.cle]}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={cheminLocalise(headerCta.href, locale)}
              className="my-4 inline-flex w-full items-center justify-center rounded-[10px] bg-gold px-5 py-3 text-[15px] font-medium text-ink"
            >
              {d.commun.prendreRdv}
            </Link>
          </Container>
        </nav>
      )}
    </header>

    {/* Hors pages a banniere, l'en-tete etant fixe, on compense sa hauteur */}
    {!surHero && <div aria-hidden="true" className="h-[78px]" />}
    </>
  );
}

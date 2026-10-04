"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cheminLocalise, cheminSansLocale, type Locale } from "@/i18n/config";
import type { Dictionnaire } from "@/i18n/dictionnaire";
import { headerCta, heroRoutes, mainNav, site, type EntreeMenu } from "@/lib/site";
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

  /* Entree active : la plus precise de celles qui correspondent au chemin.
     Les pages par espece sont filles de `/consulation-osteopathe-animalier` ;
     sans cette regle, « Consultations » s'allumait en meme temps qu'elles.
     Une entree a sous-menu est active des que l'une de ses filles l'est. */
  const correspond = (href: string) =>
    href === "/" ? cheminNu === "/" : cheminNu === href || cheminNu.startsWith(`${href}/`);
  const feuilles = mainNav.flatMap((item) => [item, ...(item.sousMenu ?? [])]);
  const plusPrecise = feuilles
    .filter((item) => correspond(item.href))
    .sort((x, y) => y.href.length - x.href.length)[0]?.href;
  const estActif = (item: EntreeMenu) =>
    item.sousMenu
      ? item.sousMenu.some((entree) => entree.href === plusPrecise)
      : item.href === plusPrecise;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        transparent
          ? "border-b border-white/15 bg-transparent"
          : "border-b border-black/5 bg-white/95 shadow-[0_10px_30px_-24px_rgba(30,41,59,0.6)] backdrop-blur-md"
      }`}
    >
      {/* Pleine largeur : le logo et le bouton vont aux bords de l'ecran, le
          menu se centre entre les deux sans s'etirer. */}
      <Container
        width="full"
        className={`flex items-center justify-between gap-2 transition-[height] sm:gap-4 duration-500 xl:px-10 2xl:px-14 ${
          transparent ? "h-[104px]" : "h-[78px]"
        }`}
      >
        {/* `xl:px-10` : les marges de 100px du conteneur privaient le menu
            complet de la place dont il a besoin. */}
        <Link
          href={cheminLocalise("/", locale)}
          className="flex min-w-0 items-center gap-2 sm:gap-3 xl:shrink-0"
          aria-label={site.name}
        >
          <Image
            src="/images/2024/05/logo-marie-salabert-osteopathie-animale.png"
            alt={`${site.practitioner} — ostéopathe animalier à Toulouse`}
            width={300}
            height={293}
            priority
            className={`w-auto shrink-0 transition-all duration-500 ${
              transparent ? "h-[58px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : "h-[48px]"
            }`}
          />
          {/* Le nom accompagne le pictogramme a toutes les largeurs : sur
              telephone le logo seul ne disait pas de qui est le site. Il y
              tient parce que l'appel a l'action y est masque ; sur les plus
              petits ecrans (320-360px), le sous-titre passe a la ligne plutot
              que de pousser le bouton du menu hors de l'ecran. */}
          <span
            className={`font-display text-[16px] font-semibold leading-tight transition-colors duration-500 sm:text-[19px] xl:whitespace-nowrap ${
              transparent ? "text-white drop-shadow-sm" : "text-plum"
            }`}
          >
            Marie Salabert
            <span
              className={`block text-[11px] font-normal uppercase tracking-[0.08em] transition-colors duration-500 sm:text-[12px] sm:tracking-[0.18em] ${
                transparent ? "text-white/80" : "text-muted"
              }`}
            >
              Ostéopathie Animale
            </span>
          </span>
        </Link>

        {/* Six entrees dont trois longues (« Ostéopathie animaux de
            compagnie ») : le menu complet ne s'affiche qu'a partir de 1280px,
            en dessous c'est le menu mobile. Les entrees gardent un ecart fixe
            et restent groupees au centre ; chacune peut se replier sur deux
            lignes (`text-balance`), mais seulement si la place manque : un
            element flex ne se comprime qu'en dernier recours. Sur grand ecran
            (1800px et plus) la police grandit, pour ne pas laisser un menu
            minuscule au milieu d'un en-tete vide. */}
        <nav aria-label="Navigation principale" className="hidden min-w-0 flex-1 xl:block">
          <ul className="flex items-center justify-center gap-4 2xl:gap-5 min-[1800px]:gap-9 min-[2200px]:gap-12">
            {mainNav.map((item) => {
              const actif = estActif(item);
              const sousMenu = item.sousMenu ?? null;

              return (
                /* `group/item` et non `group` : le filet anime sous l'intitule
                   utilise deja `group-hover`, il ne doit pas se declencher au
                   survol d'une entree du sous-menu. */
                <li
                  key={item.href}
                  /* Sous 1536px, « Accueil » cede sa place : le logo y mene deja. */
                  className={`group/item relative ${item.cle === "accueil" ? "hidden 2xl:block" : ""}`}
                >
                  <Link
                    href={cheminLocalise(item.href, locale)}
                    aria-current={actif ? "page" : undefined}
                    className={`group relative block py-1 text-center text-[12.5px] leading-snug font-medium text-balance uppercase tracking-[0.04em] transition-colors min-[1800px]:text-[15px] min-[1800px]:tracking-[0.06em] min-[2200px]:text-[16px] ${
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

                  {/* Sous-menu : ouvert au survol et des qu'un lien recoit le
                      focus, pour rester atteignable au clavier. `pt-3` cree un
                      pont sous l'intitule : sans lui, le sous-menu se referme
                      quand la souris traverse l'interstice. */}
                  {sousMenu && (
                    <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-200 group-hover/item:visible group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:opacity-100">
                      <ul className="min-w-[230px] overflow-hidden rounded-lg border border-line bg-white py-1.5 shadow-[0_20px_45px_-25px_rgba(22,23,26,0.45)]">
                        {sousMenu.map((entree) => {
                          const courant = entree.href === plusPrecise;
                          return (
                            <li key={entree.href}>
                              <Link
                                href={cheminLocalise(entree.href, locale)}
                                aria-current={courant ? "page" : undefined}
                                /* Capitales espacees, comme les entrees du menu
                                   principal : le sous-menu en est le prolongement. */
                                className={`block whitespace-nowrap px-5 py-2.5 text-[12.5px] font-medium uppercase tracking-[0.06em] transition-colors ${
                                  courant ? "text-plum" : "text-body hover:bg-surface hover:text-plum"
                                }`}
                              >
                                {d.nav[entree.cle]}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <SelecteurLangue locale={locale} transparent={transparent} etiquette={d.nav.changerLangue} />

          <Link
            href={cheminLocalise(headerCta.href, locale)}
            className={`btn-shine hidden whitespace-nowrap rounded-[10px] px-5 py-2.5 text-center text-[13.5px] font-medium transition-all duration-500 hover:-translate-y-0.5 sm:inline-flex xl:px-6 xl:text-[14px] ${
              transparent
                ? "border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink"
                : "bg-gold text-ink shadow-[0_10px_24px_-16px_rgba(22,23,26,0.8)] hover:bg-gold-dark"
            }`}
          >
            {/* Libelle court sous 1536px, pour laisser la place au menu. */}
            <span className="2xl:hidden">{d.commun.rendezVous}</span>
            <span className="hidden 2xl:inline">{d.commun.prendreRdv}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? d.nav.fermerMenu : d.nav.ouvrirMenu}
            className={`grid h-11 w-11 place-items-center rounded transition-colors xl:hidden ${
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
        <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-black/5 bg-white xl:hidden">
          <Container className="py-2">
            <ul className="divide-y divide-black/5">
              {mainNav.map((item) => {
                const actif = estActif(item);
                const sousMenu = item.sousMenu ?? null;

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

                    {/* Sur mobile le sous-menu est deplie : un menu deja ouvert
                        n'a pas besoin d'un second niveau a decouvrir, et le
                        filet a gauche suffit a dire le rattachement. */}
                    {sousMenu && (
                      <ul className="mb-2 ml-1 border-l border-plum/20 pl-4">
                        {sousMenu.map((entree) => {
                          const courant = entree.href === plusPrecise;
                          return (
                            <li key={entree.href}>
                              <Link
                                href={cheminLocalise(entree.href, locale)}
                                aria-current={courant ? "page" : undefined}
                                className={`block py-2.5 text-[12.5px] font-medium uppercase tracking-[0.06em] ${
                                  courant ? "text-plum" : "text-muted"
                                }`}
                              >
                                {d.nav[entree.cle]}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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

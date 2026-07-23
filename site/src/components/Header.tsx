"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { headerCta, mainNav, site } from "@/lib/site";
import { Container } from "./ui";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // referme le menu mobile a chaque changement de page : ajustement pendant le
  // rendu plutot qu'un effet, qui declencherait un second rendu inutile
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <Container width="wide" className="flex h-[88px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={site.name}>
          <Image
            src="/images/2024/05/cropped-logo-osteopathe-animalier-toulouse-31.png"
            alt={`${site.practitioner} — ostéopathe animalier à Toulouse`}
            width={300}
            height={293}
            priority
            className="h-[52px] w-auto"
          />
          <span className="hidden font-display text-[19px] font-semibold leading-tight text-plum sm:block">
            Marie Salabert
            <span className="block text-[12px] font-normal uppercase tracking-[0.18em] text-muted">
              Ostéopathie Animale
            </span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-[14px] transition-colors hover:text-plum ${
                    isActive(item.href) ? "text-plum" : "text-body"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={headerCta.href}
            className="hidden rounded-full bg-gold px-5 py-2.5 text-center text-[13px] font-medium tracking-wide text-ink shadow-sm transition-all hover:bg-gold-dark hover:shadow-md sm:inline-flex sm:text-[14px]"
          >
            {headerCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-11 w-11 place-items-center rounded text-plum lg:hidden"
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
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block py-3 text-[15px] ${
                      isActive(item.href) ? "text-plum" : "text-body"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={headerCta.href}
              className="my-4 inline-flex w-full items-center justify-center rounded-[3px] bg-gold px-5 py-3 text-[15px] font-medium text-black"
            >
              {headerCta.label}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}

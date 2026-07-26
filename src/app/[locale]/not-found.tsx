import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Section } from "@/components/ui";
import { defaultLocale } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { mainNav, routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable — Ostheopathie animale Toulouse",
  robots: { index: false, follow: true },
};

/**
 * Page 404. Elle est rendue hors du segment `[locale]` dans certains cas
 * (URL totalement inconnue) : on s'en tient donc au francais, langue par
 * defaut du site.
 */
export default function NotFound() {
  const d = getDictionnaire(defaultLocale);

  return (
    <Section className="py-24 text-center">
      <Container>
        <p className="eyebrow justify-center">Erreur 404</p>
        <h1 className="mt-4 text-[32px] uppercase tracking-[0.05em] text-plum sm:text-[40px]">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-body">
          La page que vous cherchez a peut-être été déplacée ou son adresse a changé. Vous pouvez
          revenir à l&apos;accueil ou me contacter directement.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={routes.home}>Retour à l&apos;accueil</Button>
          <Button href={routes.rendezVous} variant="green">
            {d.commun.prendreRdv}
          </Button>
        </div>

        <nav aria-label="Plan du site" className="mt-14">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-body hover:text-plum">
                  {d.nav[item.cle]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}

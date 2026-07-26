import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { cheminLocalise, estLocale, localeLabels, localeTags, locales } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/sections";
import Reveal from "@/components/Reveal";

/**
 * Plan du site lisible, en complement du `sitemap.xml`.
 *
 * Il sert deux publics : le visiteur qui cherche une page sans passer par le
 * menu, et le robot qui suit les liens — chaque page du site est atteignable
 * d'ici en un clic, articles compris.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.planDuSite.meta.titre,
    description: d.planDuSite.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.plan, locale),
      languages: {
        fr: routes.plan,
        en: `/en${routes.plan}`,
        it: `/it${routes.plan}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function PlanDuSitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const p = d.planDuSite;
  const articles = getArticles(locale);

  const groupes = [
    {
      titre: p.groupes.site,
      liens: [
        { href: routes.home, label: d.nav.accueil },
        { href: routes.about, label: d.nav.aPropos },
        { href: routes.consultations, label: d.consultations.hero.titre },
        { href: routes.gallery, label: d.nav.galerie },
        { href: routes.rendezVous, label: d.commun.prendreRdv },
        { href: routes.contact, label: d.nav.contact },
      ],
    },
    {
      titre: p.groupes.consultations,
      liens: [
        { href: routes.equides, label: d.consultations.sommaire[0].label },
        { href: routes.compagnie, label: d.consultations.sommaire[1].label },
        { href: routes.rente, label: d.consultations.sommaire[2].label },
      ],
    },
    {
      titre: p.groupes.infos,
      liens: [
        { href: routes.faq, label: d.nav.faq },
        { href: routes.news, label: d.nav.actualites },
        { href: routes.symbiosteo, label: d.nav.symbiosteo },
        { href: routes.certification, label: d.commun.voirCertification },
      ],
    },
    {
      titre: p.groupes.legal,
      liens: [
        { href: routes.legal, label: d.footer.liens.mentions },
        { href: routes.privacy, label: d.footer.liens.confidentialite },
        { href: routes.cookies, label: d.footer.liens.cookies },
        { href: routes.plan, label: d.footer.liens.plan },
      ],
    },
  ];

  return (
    <>
      <PageHero
        image="/images/2025/05/osteopathie-cheval-24.jpg"
        eyebrow={p.hero.surTitre}
        title={p.hero.titre}
      />

      <Section>
        <Container width="full">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {groupes.map((groupe, i) => (
              <Reveal key={groupe.titre} delay={i * 80} className="min-w-0">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-plum">
                  {groupe.titre}
                </h2>
                <ul className="mt-6 space-y-3">
                  {groupe.liens.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={cheminLocalise(l.href, locale)}
                        className="underline-grow text-[16px] leading-snug text-body transition-colors hover:text-plum"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Les articles, du plus recent au plus ancien : ils forment le gros du
          site et n'apparaissent nulle part ailleurs en liste complete. */}
      <Section tone="surface">
        <Container width="full">
          <Reveal>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-plum">
              {p.groupes.articles}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug} className="min-w-0">
                <Link
                  href={cheminLocalise(`/${a.slug}`, locale)}
                  className="underline-grow text-[15.5px] leading-snug text-body transition-colors hover:text-plum"
                >
                  {a.title}
                </Link>
                {a.dateLabel && (
                  <span className="ml-2 text-[13px] whitespace-nowrap text-muted">
                    {a.dateLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Renvoi vers les deux autres langues : le meme plan y existe. */}
      <Section className="py-14">
        <Container width="full">
          <p className="text-[15px] text-muted">
            {p.autresLangues}{" "}
            {locales
              .filter((l) => l !== locale)
              .map((l, i, tab) => (
                <span key={l}>
                  <Link
                    href={cheminLocalise(routes.plan, l)}
                    hrefLang={l}
                    className="underline-grow font-medium text-plum"
                  >
                    {localeLabels[l].long}
                  </Link>
                  {i < tab.length - 1 ? ", " : "."}
                </span>
              ))}
          </p>
        </Container>
      </Section>
    </>
  );
}

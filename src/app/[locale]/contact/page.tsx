import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Button, Container, Section } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes, site } from "@/lib/site";

/**
 * Page de contact.
 *
 * Distincte de la prise de rendez-vous : on vient ici pour poser une question,
 * demander un devis ou proposer une collaboration. La page de rendez-vous
 * garde le formulaire de reservation, la carte du secteur et les informations
 * a connaitre avant une seance ; un encart y renvoie en bas de page.
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
    title: d.contactPage.meta.titre,
    description: d.contactPage.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.contact, locale),
      languages: {
        fr: routes.contact,
        en: `/en${routes.contact}`,
        it: `/it${routes.contact}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

/** Ligne de coordonnee : pictogramme, intitule, valeur cliquable, precision. */
function Coordonnee({
  picto,
  teinte,
  intitule,
  valeur,
  href,
  detail,
  lien,
}: {
  picto: React.ReactNode;
  teinte: string;
  intitule: string;
  valeur: string;
  href: string;
  detail?: string;
  /** Second lien, place sous la valeur (renvoi WhatsApp). */
  lien?: { href: string; libelle: string };
}) {
  return (
    <li className="card flex items-start gap-4 p-6">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${teinte}`}>
        {picto}
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
          {intitule}
        </p>
        <a
          href={href}
          className="mt-2 block break-words text-[20px] font-semibold text-plum transition-colors hover:text-plum-dark"
        >
          {valeur}
        </a>
        {lien && (
          <a
            href={lien.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-plum/20 px-3 py-1 text-[12px] leading-none text-plum transition-colors hover:border-plum hover:bg-plum/5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 3.5A8.5 8.5 0 004.6 16.2L3.5 20.5l4.4-1.15A8.5 8.5 0 1012 3.5z" />
            </svg>
            {lien.libelle}
          </a>
        )}
        {detail && <p className="mt-3 text-[15px] leading-relaxed text-body">{detail}</p>}
      </div>
    </li>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.contactPage;
  const telSecretariat = `tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`;

  return (
    <>
      <PageHero
        image="/images/2026/07/contact-osteopathe-animalier.jpg"
        eyebrow={c.hero.surTitre}
        title={c.hero.titre}
        subtitle={c.hero.sousTitre}
      />

      {/* Coordonnees a gauche (colonne collante), formulaire a droite */}
      <Section>
        <Container width="full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="font-light uppercase text-[28px] leading-snug tracking-[0.05em] text-ink sm:text-[34px]">
                {c.coordonnees}
              </h2>

              <ul className="mt-10 space-y-4">
                <Coordonnee
                  teinte="bg-green/8 text-green ring-1 ring-green/15"
                  picto={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
                    </svg>
                  }
                  intitule={d.commun.joindreOsteopathe}
                  valeur={site.phone}
                  href={site.phoneHref}
                  lien={{ href: site.whatsapp, libelle: "WhatsApp" }}
                />

                <Coordonnee
                  teinte="bg-gold/20 text-plum ring-1 ring-gold/40"
                  picto={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M3 10h18M8 3v4M16 3v4" />
                    </svg>
                  }
                  intitule={d.commun.numeroSecretariat}
                  valeur={site.secretariat}
                  href={telSecretariat}
                  lien={{ href: site.secretariatWhatsapp, libelle: "WhatsApp" }}
                  detail={d.contact.cartes.secretariatTexte}
                />

                <Coordonnee
                  teinte="bg-plum/8 text-plum ring-1 ring-plum/15"
                  picto={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3.5 6.5 8.5 6 8.5-6" />
                    </svg>
                  }
                  intitule={d.commun.email}
                  valeur={site.email}
                  href={`mailto:${site.email}`}
                />
              </ul>

              {/* Renvoi vers la prise de rendez-vous : elle a sa page, avec la
                  carte du secteur et ce qu'il faut savoir avant une seance. */}
              <div className="mt-10 rounded-lg border border-plum/15 bg-plum/[0.04] p-7">
                <h3 className="font-display text-[19px] leading-snug font-semibold text-plum">
                  {c.rdvTitre}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{c.rdvTexte}</p>
                <div className="mt-6">
                  <Button
                    href={cheminLocalise(routes.rendezVous, locale)}
                    variant="outline"
                    className="px-6 py-3 text-[14px]"
                  >
                    {c.rdvBouton}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card p-8 sm:p-12">
                <h2 className="font-light uppercase text-[24px] leading-snug text-ink sm:text-[28px] tracking-[0.05em]">
                  {c.formulaire.titre}
                </h2>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body">
                  {c.formulaire.intro}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {c.formulaire.puces.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] text-body">
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-plum/45"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-body">
                  {c.formulaire.conclusion}
                </p>
                <div className="mt-10">
                  <ContactForm d={d} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

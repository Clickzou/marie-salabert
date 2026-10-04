import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Coordonnee from "@/components/Coordonnee";
import Reveal from "@/components/Reveal";
import SecteurMap from "@/components/SecteurMap";
import { Container, Eyebrow, Section } from "@/components/ui";
import { PageHero, Testimonials } from "@/components/sections";
import { avis, googleAvis } from "@/content/avis";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { routes, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.contact.meta.titre,
    description: d.contact.meta.description,
    alternates: {
      canonical: cheminLocalise(routes.rendezVous, locale),
      languages: {
        fr: routes.rendezVous,
        en: `/en${routes.rendezVous}`,
        it: `/it${routes.rendezVous}`,
      },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function RendezVousPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const c = d.contact;
  const valeurTelephone = "text-[22px] font-semibold text-plum";

  return (
    <>
      <PageHero
        image="/images/2025/05/rendez-vous-osteopathe-animalier.jpg"
        alt={c.heroAlt}
        eyebrow={c.hero.surTitre}
        title={c.hero.titre}
        subtitle={c.hero.sousTitre}
      />

      {/* Coordonnees a gauche (colonne collante), formulaire a droite */}
      <Section>
        <Container width="full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
            <Reveal className="min-w-0 lg:sticky lg:top-32 lg:self-start">
              {/* « Me joindre » sert de titre : la phrase d'accroche qui le
                  suivait a ete retiree a la demande de la praticienne. */}
              <h2 className="font-light uppercase text-[28px] leading-snug tracking-[0.05em] text-ink sm:text-[34px]">
                {c.meJoindre.surTitre}
              </h2>

              {/* Depuis la fusion avec l'ancienne page de contact, on y
                  retrouve aussi l'e-mail et les liens WhatsApp. */}
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
                  detail={c.cartes.telephoneTexte}
                  valeurClassName={valeurTelephone}
                />

                {/* Meme taille et meme couleur que le numero direct : les deux
                    se valent, seul l'intitule les distingue. */}
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
                  href={`tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`}
                  lien={{ href: site.secretariatWhatsapp, libelle: "WhatsApp" }}
                  detail={c.cartes.secretariatTexte}
                  valeurClassName={valeurTelephone}
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
                  /* Coupure permise avant l'arobase : sinon l'adresse, trop
                     longue pour la carte, se cassait au milieu de « gmail ». */
                  valeur={
                    <>
                      {site.email.split("@")[0]}
                      <wbr />@{site.email.split("@")[1]}
                    </>
                  }
                  href={`mailto:${site.email}`}
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
                      <path d="M12 21s-7-5.5-7-10a7 7 0 1114 0c0 4.5-7 10-7 10z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                  }
                  intitule={d.commun.zoneIntervention}
                  valeur={site.serviceArea}
                  detail={c.cartes.zoneTexte}
                  valeurClassName="text-[17px] font-medium text-ink"
                />
              </ul>
            </Reveal>

            {/* `#formulaire` : cible du lien « Contact » du pied de page et de
                l'ancienne URL `/contact`. `scroll-mt` laisse la place de
                l'en-tete fixe. */}
            <Reveal delay={120} className="min-w-0">
              <div id="formulaire" className="card scroll-mt-28 p-8 sm:p-12">
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

      {/* Carte du secteur, pleine largeur sur fond gris */}
      <Section tone="surface">
        <Container width="full">
          <Reveal className="max-w-3xl">
            <Eyebrow>{c.secteur.surTitre}</Eyebrow>
            <h2 className="font-light uppercase mt-5 text-[28px] leading-snug tracking-[0.05em] text-ink sm:text-[34px]">
              {c.secteur.titre}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 overflow-hidden rounded-lg bg-white ring-1 ring-line">
            <SecteurMap className="h-[360px] sm:h-[520px]" />
          </Reveal>
        </Container>
      </Section>

      <Testimonials
        items={avis.slice(0, 3)}
        profile={googleAvis}
        title={d.avis.titre}
        libelles={{ avisGoogle: d.avis.avisGoogle, lireTous: d.avis.lireTous }}
        locale={localeTags[locale]}
      />
    </>
  );
}

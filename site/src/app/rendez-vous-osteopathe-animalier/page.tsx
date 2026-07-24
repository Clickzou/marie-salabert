import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SecteurMap from "@/components/SecteurMap";
import { Container, Eyebrow, Section } from "@/components/ui";
import { PageHero, Testimonials } from "@/components/sections";
import { avis, googleAvis } from "@/content/avis";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact ostéopathe animalier : Marie Salabert",
  description:
    "Ostéopathie Animale pour tout type d'animaux. Contactez-moi pour réserver une séance ou en apprendre plus sur l'ostéopathie animale.",
  alternates: { canonical: "/rendez-vous-osteopathe-animalier" },
};

export default function RendezVousPage() {
  return (
    <>
      <PageHero
        image="/images/2025/05/rendez-vous-osteopathe-animalier.jpg"
        eyebrow="Contact"
        title="Prendre rendez-vous"
        subtitle="Par téléphone, par SMS ou via le formulaire : votre demande est étudiée avec attention."
      />

      {/* Coordonnees a gauche (colonne collante), formulaire a droite */}
      <Section>
        <Container width="full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Me joindre</Eyebrow>
              <h2 className="mt-5 text-[28px] leading-snug tracking-[-0.02em] text-ink sm:text-[34px]">
                Un appel suffit pour convenir d&apos;un créneau
              </h2>

              <ul className="mt-10 space-y-4">
                <li className="card flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/8 text-green ring-1 ring-green/15">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Téléphone
                    </p>
                    <a
                      href={site.phoneHref}
                      className="mt-2 block text-[22px] font-semibold text-plum transition-colors hover:text-plum-dark"
                    >
                      {site.phone}
                    </a>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">
                      En cas d&apos;indisponibilité, laissez-moi un SMS avec le motif, votre adresse
                      et vos disponibilités.
                    </p>
                  </div>
                </li>

                <li className="card flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plum/8 text-plum ring-1 ring-plum/15">
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
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Zone d&apos;intervention
                    </p>
                    <p className="mt-2 text-[17px] font-medium text-ink">{site.serviceArea}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">
                      Consultations à domicile, environ 1h45 de route autour de Toulouse.
                    </p>
                  </div>
                </li>

                <li className="card flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20 text-plum ring-1 ring-gold/40">
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
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Secrétariat
                    </p>
                    <a
                      href={`tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`}
                      className="mt-2 block text-[17px] font-medium text-ink transition-colors hover:text-plum"
                    >
                      {site.secretariat}
                    </a>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">
                      Anne-Sophie gère le planning et vous recontacte dans les meilleurs délais.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="card p-8 sm:p-12">
                <h2 className="text-[24px] leading-snug text-ink sm:text-[28px]">
                  Formulaire de contact
                </h2>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body">
                  Pour faciliter l&apos;organisation des déplacements, précisez dans votre message :
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "L'adresse où se trouve votre animal",
                    "Vos disponibilités",
                    "Le motif de la consultation",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] text-body">
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-plum/45"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <ContactForm />
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
            <Eyebrow>Secteur d&apos;intervention</Eyebrow>
            <h2 className="mt-5 text-[28px] leading-snug tracking-[-0.02em] text-ink sm:text-[34px]">
              Environ 1h45 de route autour de Toulouse
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 overflow-hidden rounded-lg bg-white ring-1 ring-line">
            <SecteurMap className="h-[360px] sm:h-[520px]" />
          </Reveal>
        </Container>
      </Section>

      <Testimonials items={avis.slice(0, 3)} profile={googleAvis} />
    </>
  );
}

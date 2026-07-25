import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { ContactInfoBlocks } from "@/components/ContactInfoBlocks";
import { PageHero, Testimonials } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { notFound } from "next/navigation";
import { avis, googleAvis } from "@/content/avis";
import { cheminLocalise, estLocale, localeTags } from "@/i18n/config";
import { getDictionnaire } from "@/i18n/dictionnaire";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!estLocale(locale)) return {};
  const d = getDictionnaire(locale);
  return {
    title: d.reservation.meta.titre,
    description: d.reservation.meta.description,
    alternates: {
      canonical: cheminLocalise("/reservation", locale),
      languages: { fr: "/reservation", en: "/en/reservation", it: "/it/reservation" },
    },
    openGraph: { locale: localeTags[locale] },
  };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!estLocale(locale)) notFound();
  const d = getDictionnaire(locale);
  const r = d.reservation;

  return (
    <>
      <PageHero
        image="/images/2023/05/reservation-seance-osteopathe-toulouse-scaled.jpg"
        title={r.heroTitre}
        height="short"
      />

      <Section className="relative overflow-hidden pb-0">
        <Image
          src="/images/2023/05/shape-triangle.png"
          alt=""
          aria-hidden="true"
          width={125}
          height={125}
          className="pointer-events-none absolute left-6 top-6 hidden select-none lg:block xl:left-16"
        />
        <Container>
          <h2 className="uppercase text-center text-[24px] font-light leading-snug text-plum sm:text-[28px] tracking-[0.05em]">
            {r.titre}
          </h2>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Image
          src="/images/2023/05/circle-pattern.png"
          alt=""
          aria-hidden="true"
          width={745}
          height={745}
          className="pointer-events-none absolute -right-24 top-24 hidden w-[450px] select-none opacity-70 lg:block"
        />
        <Image
          src="/images/2023/05/shape-triangle.png"
          alt=""
          aria-hidden="true"
          width={125}
          height={125}
          className="pointer-events-none absolute bottom-16 left-6 hidden select-none lg:block xl:left-16"
        />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <ContactInfoBlocks
              title={r.infosContact}
              items={[
                {
                  icon: "cabinet",
                  label: "Zone d'intervention",
                  content: <p>{site.serviceArea}</p>,
                },
                {
                  icon: "phone",
                  label: "Téléphone",
                  content: (
                    <a href={site.phoneHref} className="underline hover:text-plum">
                      06.37.88.00.73
                    </a>
                  ),
                },
              ]}
            />

            <div>
              <h2 className="font-light uppercase text-[26px] leading-tight text-green sm:text-[30px] tracking-[0.05em]">
                {r.formulaire}
              </h2>
              <div className="mt-8">
                <ContactForm d={d} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials
        items={avis}
        profile={googleAvis}
        title={d.avis.titre}
        libelles={{ avisGoogle: d.avis.avisGoogle, lireTous: d.avis.lireTous }}
        locale={localeTags[locale]}
      />
    </>
  );
}

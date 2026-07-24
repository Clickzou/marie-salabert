import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { ContactInfoBlocks } from "@/components/ContactInfoBlocks";
import { PageHero, Testimonials } from "@/components/sections";
import { Container, Section } from "@/components/ui";
import { avis, googleAvis } from "@/content/avis";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "RDV ostéopathe animalier Toulouse : Réservez votre séance",
  description:
    "Rendez-vous avec Marie Salabert, ostéopathe animalière à Toulouse. Offrez à votre compagnon un bien-être optimal. Réservez votre séance !",
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <>
      <PageHero
        image="/images/2023/05/reservation-seance-osteopathe-toulouse-scaled.jpg"
        title="Réservez votre séance"
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
            Réservez une séance d&apos;ostéopathie pour votre animal
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
              title="Informations de contact"
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
                Formulaire de contact
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials items={avis} profile={googleAvis} />
    </>
  );
}

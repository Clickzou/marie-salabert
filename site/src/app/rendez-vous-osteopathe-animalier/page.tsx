import type { Metadata } from "next";
import Image from "next/image";
import ConsentMap from "@/components/ConsentMap";
import ContactForm from "@/components/ContactForm";
import { ContactInfoBlocks } from "@/components/ContactInfoBlocks";
import { Container, Section } from "@/components/ui";
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
          className="pointer-events-none absolute bottom-20 left-6 hidden select-none lg:block xl:left-16"
        />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <ContactInfoBlocks
              as="h1"
              title="Prendre rendez-vous"
              items={[
                {
                  icon: "phone",
                  label: "Téléphone",
                  content: (
                    <a href={site.phoneHref} className="underline hover:text-plum">
                      06.37.88.00.73
                    </a>
                  ),
                },
                {
                  icon: "cabinet",
                  label: "Zone d'intervention",
                  content: <p>{site.serviceArea}</p>,
                },
              ]}
            />

            <div>
              <h2 className="text-[26px] leading-tight text-green sm:text-[30px]">
                Formulaire de contact
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body">
                <p>
                  Ce formulaire vous permet de prendre rendez-vous ou de me contacter pour toute
                  question concernant les consultations ou les informations présentées sur le site.
                </p>
                <p>
                  Afin de faciliter l&apos;organisation des déplacements et de permettre une prise
                  en charge dans les meilleurs délais, il est recommandé de préciser dans votre
                  message :
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>L&apos;adresse où se trouve votre animal ;</li>
                  <li>Vos disponibilités ;</li>
                  <li>Le motif de la consultation.</li>
                </ul>
                <p>
                  Chaque demande est étudiée avec attention et une réponse est apportée dans les
                  meilleurs délais.
                </p>
              </div>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="no-top">
        <Container>
          <h2 className="mb-6 text-[26px] leading-tight text-green sm:text-[30px]">
            Secteur d&apos;intervention : environ 1h45 autour de Toulouse
          </h2>
          <ConsentMap
            query="Toulouse"
            title="Secteur d'intervention : environ 1h45 autour de Toulouse"
          />
        </Container>
      </Section>
    </>
  );
}

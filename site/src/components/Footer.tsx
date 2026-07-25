import Image from "next/image";
import Link from "next/link";
import { cheminLocalise, type Locale } from "@/i18n/config";
import type { Dictionnaire } from "@/i18n/dictionnaire";
import { footerNav, site } from "@/lib/site";
import { Container } from "./ui";

const socials = [
  {
    label: `Facebook : ${site.socialHandles.facebook}`,
    name: "Facebook",
    href: site.social.facebook,
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.7v8h3.5z",
  },
  {
    label: `Instagram : ${site.socialHandles.instagram}`,
    name: "Instagram",
    href: site.social.instagram,
    path: "M12 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm0 7.25a2.85 2.85 0 110-5.7 2.85 2.85 0 010 5.7zM17.5 7.4a1 1 0 11-2 0 1 1 0 012 0zM20.9 8.4c-.05-1.4-.37-2.63-1.4-3.65-1.02-1.02-2.25-1.34-3.64-1.4-1.44-.08-5.76-.08-7.2 0-1.39.05-2.62.37-3.65 1.4C4 5.76 3.67 7 3.61 8.38c-.08 1.44-.08 5.76 0 7.2.05 1.39.37 2.62 1.4 3.65 1.03 1.02 2.26 1.34 3.65 1.4 1.44.08 5.76.08 7.2 0 1.39-.06 2.62-.38 3.64-1.4 1.03-1.03 1.35-2.26 1.4-3.65.08-1.44.08-5.75 0-7.19zm-1.95 8.73a2.88 2.88 0 01-1.62 1.63c-1.13.45-3.8.34-5.04.34-1.25 0-3.92.1-5.05-.34a2.88 2.88 0 01-1.62-1.63c-.45-1.12-.35-3.79-.35-5.04 0-1.24-.1-3.92.35-5.04A2.88 2.88 0 015.24 5.4c1.13-.45 3.8-.35 5.05-.35 1.24 0 3.92-.1 5.04.35a2.88 2.88 0 011.62 1.62c.45 1.13.35 3.8.35 5.05 0 1.24.1 3.91-.35 5.04z",
  },
  {
    label: `LinkedIn : ${site.socialHandles.linkedin}`,
    name: "LinkedIn",
    href: site.social.linkedin,
    path: "M6.94 8.5H3.9V21h3.04V8.5zM5.42 3a1.76 1.76 0 100 3.53 1.76 1.76 0 000-3.53zM20.1 13.85c0-3.24-1.73-4.75-4.04-4.75-1.86 0-2.7 1.03-3.16 1.75V8.5H9.86V21h3.04v-6.7c0-1.42.27-2.8 2.03-2.8 1.74 0 1.76 1.63 1.76 2.9V21h3.4v-7.15z",
  },
  {
    label: "WhatsApp",
    name: "WhatsApp",
    href: site.whatsapp,
    path: "M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 3.5A8.5 8.5 0 004.6 16.2L3.5 20.5l4.4-1.15A8.5 8.5 0 1012 3.5z",
  },
];

export default function Footer({ locale, d }: { locale: Locale; d: Dictionnaire }) {
  return (
    <footer className="relative overflow-hidden bg-plum text-white">
      {/* motif decoratif discret */}
      <Image
        src="/images/2023/05/shape-pattern-3.png"
        alt=""
        aria-hidden="true"
        width={552}
        height={328}
        className="pointer-events-none absolute -right-10 bottom-0 w-[320px] opacity-[0.08] select-none"
      />

      <Container width="wide" className="relative py-20">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr_1.3fr] md:gap-10">
          {/* Logo + identite */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href={cheminLocalise("/", locale)} aria-label={site.name}>
              {/* NOTE visuel a fournir : logo complet (dessin + nom) sur fond transparent.
                  En attendant, le pictogramme existant est affiche en grand, sans fond. */}
              <Image
                src="/images/2023/05/Logo-osteopathe-animalier-toulouse.png"
                alt="Logo Marie Salabert Ostéopathie Animale"
                width={510}
                height={510}
                className="h-[190px] w-[190px] object-contain"
              />
              <span className="mt-6 block font-display text-[26px] leading-tight text-white">
                {site.practitioner}
                <span className="mt-2 block text-[14px] font-normal uppercase tracking-[0.2em] text-gold">
                  Ostéopathie Animale
                </span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Liens de bas de page">
            <h2 className="mb-6 text-[16px] font-semibold uppercase tracking-[0.12em] text-gold">
              {d.footer.plusInfos}
            </h2>
            <ul className="space-y-3.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={cheminLocalise(item.href, locale)}
                    className="text-[15px] text-white/85 transition-colors hover:text-gold"
                  >
                    {d.footer.liens[item.cle]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coordonnees & identite legale */}
          <div>
            <h2 className="mb-6 text-[16px] font-semibold uppercase tracking-[0.12em] text-gold">
              {d.footer.contact}
            </h2>
            <address className="space-y-2.5 text-[14px] not-italic leading-relaxed text-white/85">
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-gold">
                  {site.phone}
                </a>
              </p>
              <p>
                {d.commun.secretariat} :{" "}
                <a
                  href={`tel:+33${site.secretariat.replace(/\s/g, "").slice(1)}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.secretariat}
                </a>
              </p>
              <p className="pt-1">
                {d.footer.zonesIntervention} : {site.serviceArea}
              </p>
              <p className="text-white/70">
                {d.footer.departements} {site.departments}
              </p>
              <p className="pt-3">{d.footer.entrepriseIndividuelle}</p>
              <p>
                {d.footer.siret} : {site.siret}
              </p>
              <p>
                {d.footer.tva} : {site.vat}
              </p>
              <p className="pt-2 text-white/70">{d.footer.registre}</p>
            </address>
          </div>
        </div>

        {/* Reseaux sociaux */}
        <ul className="mt-16 flex flex-wrap justify-center gap-8">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <div className="relative border-t border-white/15 py-5 text-center">
        <a
          href={site.credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/70 transition-colors hover:text-gold"
        >
          {site.credit.label}
        </a>
      </div>
    </footer>
  );
}

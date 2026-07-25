import Image from "next/image";
import { Container } from "./ui";

/**
 * Banniere de la page SymbiOsteO : contrairement aux autres pages, le voile
 * pose sur la photo est prune a 56 % (et non noir a 25 %) — d'ou ce hero dedie.
 */
export default function SymbiosteoHero({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[448px] items-center justify-center overflow-hidden lg:min-h-[376px]">
      {/* Le fond d'origine est en background-attachment:fixed : ce cadrage
          reproduit ce que l'on voit en haut de page. */}
      <Image
        src="/images/2024/05/symbiosteo.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_34%]"
      />
      <div className="absolute inset-0 bg-plum/[0.56]" aria-hidden="true" />
      <Container className="relative py-16 text-center">
        <h1 className="text-[34px] leading-tight text-white drop-shadow-sm sm:text-[42px] lg:text-[50px]">
          {title}
        </h1>
      </Container>
    </section>
  );
}

import { cheminLocalise, type Locale } from "@/i18n/config";
import { routes } from "@/lib/site";
import SommaireFlottant from "./SommaireFlottant";

/**
 * Menu lateral commun aux trois pages d'especes et a la page consultations.
 *
 * Les libelles viennent du dictionnaire, l'ordre est celui du sommaire illustre.
 * `courant` designe la page affichee : les liens menant vers d'autres pages, le
 * reperage par defilement n'a plus de sens, c'est l'URL qui dit ou l'on est.
 */
export function NavEspeces({
  locale,
  libelles,
  courant,
}: {
  locale: Locale;
  libelles: readonly { label: string }[];
  courant?: "equides" | "compagnie" | "rente";
}) {
  const entrees = [
    { cle: "equides", href: cheminLocalise(routes.equides, locale) },
    { cle: "compagnie", href: cheminLocalise(routes.compagnie, locale) },
    { cle: "rente", href: cheminLocalise(routes.rente, locale) },
  ] as const;

  return (
    <SommaireFlottant
      liens={entrees.map((e, i) => ({ href: e.href, label: libelles[i].label }))}
      actifHref={courant ? cheminLocalise(routes[courant], locale) : ""}
    />
  );
}

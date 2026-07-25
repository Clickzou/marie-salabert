import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalText } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions Légales ostéopathe animalier - Marie Salabert",
  description:
    "Ostéopathe animalière dévouée, Marie Salabert offre des soins bienveillants. Consultez les mentions légales pour une confiance totale.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <LegalText>
        {/* L'adresse personnelle ne figure QUE sur cette page (obligation legale) :
            ailleurs sur le site, seule la zone d'intervention est indiquee, la
            praticienne n'ayant pas de cabinet. */}
        Le site Marie Salabert Ostéopathie Animale (ci-après «&nbsp;le Site&nbsp;»), accessible à
        l&apos;adresse {site.url}, est édité par Marie Salabert (ci-après «&nbsp;l&apos;Editeur&nbsp;»),
        domiciliée au {site.address.street}, {site.address.postalCode} {site.address.city}{" "}
        ({site.phone}, marie.salabert@outlook.fr).
      </LegalText>

      <LegalSection title="Rédaction du site internet" tone="sky">
        <LegalText>
          Directeur de la publication : Marie Salabert : 06.37.88.00.73 ; marie.salabert@outlook.fr
        </LegalText>
      </LegalSection>

      <LegalSection title="Hébergeur du site internet" tone="sky">
        <LegalText>
          Le Site est hébergé par o2switch, EURL au capital de 100 000 euros, dont le siège social
          est situé 224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France, joignable par le
          moyen suivant : 0444446040.
        </LegalText>
      </LegalSection>

      <LegalSection title="Respect de la propriété intellectuelle" tone="sky">
        <LegalText>
          Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou
          non, séquences vidéo, sons, ainsi que toutes les applications informatiques qui pourraient
          être utilisées pour faire fonctionner le Site et plus généralement tous les éléments
          reproduits ou utilisés sur le Site sont protégés par les lois en vigueur au titre de la
          propriété intellectuelle.
        </LegalText>
        <LegalText>
          Ils sont la propriété pleine et entière de l&apos;Editeur ou de ses partenaires, sauf
          mentions particulières. Toute reproduction, représentation, utilisation ou adaptation, sous
          quelque forme que ce soit, de tout ou partie de ces éléments, y compris les applications
          informatiques, sans l&apos;accord préalable et écrit de l&apos;Editeur, sont strictement
          interdites. Le fait pour l&apos;Editeur de ne pas engager de procédure dès la prise de
          connaissance de ces utilisations non autorisées ne vaut pas acceptation desdites
          utilisations et renonciation aux poursuites.
        </LegalText>
        <LegalText>
          Seule l&apos;utilisation pour un usage privé dans un cercle de famille est autorisée et
          toute autre utilisation est constitutive de contrefaçon et/ou d&apos;atteinte aux droits
          voisins, sanctionnées par Code de la propriété intellectuelle.
        </LegalText>
        <LegalText>
          La reprise de tout ou partie de ce contenu nécessite l&apos;autorisation préalable de
          l&apos;Editeur ou du titulaire des droits sur ce contenu.
        </LegalText>
      </LegalSection>

      <LegalSection title="Liens hypertextes" tone="sky">
        <LegalText>
          Le Site peut contenir des liens hypertexte donnant accès à d&apos;autres sites web édités
          et gérés par des tiers et non par l&apos;Editeur. L&apos;Editeur ne pourra être tenu
          responsable directement ou indirectement dans le cas où lesdits sites tiers ne
          respecteraient pas les dispositions légales.
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}

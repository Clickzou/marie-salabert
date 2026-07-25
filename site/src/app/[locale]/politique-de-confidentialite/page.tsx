import type { Metadata } from "next";
import { LegalLead, LegalPage, LegalSection, LegalText } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Marie Salabert Ostéopathe Animalier",
  description:
    "Confiez le bien-être de vos animaux à Marie Salabert, ostéopathe animalière. Découvrez notre Politique de Confidentialité.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <LegalPage title="Politique de Confidentialité">
      <LegalSection title="Définitions">
        <LegalText>
          L&apos;Éditeur : La personne, physique ou morale, qui édite les services de communication
          au public en ligne.
          <br />
          Le Site : L&apos;ensemble des sites, pages Internet et services en ligne proposés par
          l&apos;Éditeur.
          <br />
          L&apos;Utilisateur : La personne utilisant le Site et les services.
        </LegalText>
      </LegalSection>

      <LegalSection title="1- Nature des données collectées">
        <LegalText>
          <LegalLead>
            Dans le cadre de l&apos;utilisation des Sites, l&apos;Éditeur est susceptible de
            collecter les catégories de données suivantes concernant ses Utilisateurs
          </LegalLead>{" "}
          : Données d&apos;état-civil, d&apos;identité, d&apos;identification…
        </LegalText>
      </LegalSection>

      <LegalSection title="2- Communication des données personnelles à des tiers">
        <LegalText>
          <LegalLead>Pas de communication à des tiers</LegalLead>
          <br />
          Vos données ne font l&apos;objet d&apos;aucune communication à des tiers. Vous êtes
          toutefois informés qu&apos;elles pourront être divulguées en application d&apos;une loi,
          d&apos;un règlement ou en vertu d&apos;une décision d&apos;une autorité réglementaire ou
          judiciaire compétente.
        </LegalText>
      </LegalSection>

      <LegalSection title="3- Information préalable pour la communication des données personnelles à des tiers en cas de fusion / absorption">
        <LegalText>
          <LegalLead>
            Collecte de l&apos;opt-in (consentement) préalable à la transmission des données suite à
            une fusion / acquisition
          </LegalLead>
          <br />
          Dans le cas où nous prendrions part à une opération de fusion, d&apos;acquisition ou à
          toute autre forme de cession d&apos;actifs, nous nous engageons à obtenir votre
          consentement préalable à la transmission de vos données personnelles et à maintenir le
          niveau de confidentialité de vos données personnelles auquel vous avez consenti.
        </LegalText>
      </LegalSection>

      <LegalSection title="4- Agrégation des données">
        <LegalText>
          <LegalLead>Agrégation avec des données non personnelles</LegalLead>
          <br />
          Nous pouvons publier, divulguer et utiliser les informations agrégées (informations
          relatives à tous nos Utilisateurs ou à des groupes ou catégories spécifiques
          d&apos;Utilisateurs que nous combinons de manière à ce qu&apos;un Utilisateur individuel ne
          puisse plus être identifié ou mentionné) et les informations non personnelles à des fins
          d&apos;analyse du secteur et du marché, de profilage démographique, à des fins
          promotionnelles et publicitaires et à d&apos;autres fins commerciales.
        </LegalText>
        <LegalText>
          <LegalLead>
            Agrégation avec des données personnelles disponibles sur les comptes sociaux de
            l&apos;Utilisateur
          </LegalLead>
          .
          <br />
          Si vous connectez votre compte à un compte d&apos;un autre service afin de faire des envois
          croisés, ledit service pourra nous communiquer vos informations de profil, de connexion,
          ainsi que toute autre information dont vous avez autorisé la divulgation. Nous pouvons
          agréger les informations relatives à tous nos autres Utilisateurs, groupes, comptes, aux
          données personnelles disponibles
          <br />
          sur l&apos;Utilisateur.
        </LegalText>
      </LegalSection>

      <LegalSection title="5- Collecte des données d'identité">
        <LegalText>
          <LegalLead>Consultation libre</LegalLead>
          <br />
          La consultation du Site ne nécessite pas d&apos;inscription ni d&apos;identification
          préalable. Elle peut s&apos;effectuer sans que vous ne communiquiez de données nominatives
          vous concernant (nom, prénom, adresse, etc). Nous ne procédons à aucun enregistrement de
          données nominatives pour la simple consultation du Site.
        </LegalText>
      </LegalSection>

      <LegalSection title="6- Collecte des données d'identification">
        <LegalText>
          <LegalLead>
            Utilisation de l&apos;identifiant de l&apos;utilisateur uniquement pour l&apos;accès aux
            services
          </LegalLead>
          <br />
          Nous utilisons vos identifiants électroniques seulement pour et pendant l&apos;exécution du
          contrat.
        </LegalText>
      </LegalSection>

      <LegalSection title="7- Collecte des données du terminal">
        <LegalText>
          <LegalLead>
            Collecte des données de profilage et des données techniques à des fins de fourniture du
            service
          </LegalLead>
          <br />
          Certaines des données techniques de votre appareil sont collectées automatiquement par le
          Site. Ces informations incluent notamment votre adresse IP, fournisseur d&apos;accès à
          Internet, configuration matérielle, configuration logicielle, type et langue du
          navigateur… La collecte de ces données est nécessaire à la fourniture des services.
        </LegalText>
        <LegalText>
          <LegalLead>
            Collecte des données techniques à des fins publicitaires, commerciales et statistiques
          </LegalLead>
          <br />
          Les données techniques de votre appareil sont automatiquement collectées et enregistrées
          par le Site, à des fins publicitaires, commerciales et statistiques. Ces informations nous
          aident à personnaliser et à améliorer continuellement votre expérience sur notre Site. Nous
          ne collectons ni ne conservons aucune donnée nominative (nom, prénom, adresse…)
          éventuellement attachée à une donnée technique. Les données collectées sont susceptibles
          d&apos;être revendues à des tiers.
        </LegalText>
      </LegalSection>

      <LegalSection title="8- Cookies">
        <LegalText>
          <LegalLead>Durée de conservation des cookies</LegalLead>
          <br />
          Conformément aux recommandations de la CNIL, la durée maximale de conservation des cookies
          est de 13 mois au maximum après leur premier dépôt dans le terminal de l&apos;Utilisateur,
          tout comme la durée de la validité du consentement de l&apos;Utilisateur à l&apos;utilisation
          de ces cookies. La durée de vie des cookies n&apos;est pas prolongée à chaque visite. Le
          consentement de l&apos;Utilisateur devra donc être renouvelé à l&apos;issue de ce délai.
        </LegalText>
        <LegalText>
          <LegalLead>Finalité cookies</LegalLead>
          <br />
          Les cookies peuvent être utilisés pour des fins statistiques notamment pour optimiser les
          services rendus à l&apos;Utilisateur, à partir du traitement des informations concernant la
          fréquence d&apos;accès, la personnalisation des pages ainsi que les opérations réalisées et
          les informations consultées.
          <br />
          Vous êtes informé que l&apos;Éditeur est susceptible de déposer des cookies sur votre
          terminal. Le cookie enregistre des informations relatives à la navigation sur le service
          (les pages que vous avez consultées, la date et l&apos;heure de la consultation…) que nous
          pourrons lire lors de vos visites ultérieures.
        </LegalText>
        <LegalText>
          <LegalLead>Droit de l&apos;Utilisateur de refuser les cookies</LegalLead>
          <br />
          Vous reconnaissez avoir été informé que l&apos;Éditeur peut avoir recours à des cookies. Si
          vous ne souhaitez pas que des cookies soient utilisés sur votre terminal, la plupart des
          navigateurs vous permettent de désactiver les cookies en passant par les options de
          réglage.
        </LegalText>
      </LegalSection>

      <LegalSection title="9 – Conservation des données techniques">
        <LegalText>
          <LegalLead>Durée de conservation des données techniques</LegalLead>
          <br />
          Les données techniques sont conservées pour la durée strictement nécessaire à la
          réalisation des finalités visées ci-avant.
        </LegalText>
      </LegalSection>

      <LegalSection title="10- Délai de conservation des données personnelles et d'anonymisation">
        <LegalText>
          <LegalLead>
            Conservation des données pendant la durée de la relation contractuelle
          </LegalLead>
          <br />
          Conformément à l&apos;article 6-5° de la loi n°78-17 du 6 janvier 1978 relative à
          l&apos;informatique, aux fichiers et aux libertés, les données à caractère personnel
          faisant l&apos;objet d&apos;un traitement ne sont pas conservées au-delà du temps
          nécessaire à l&apos;exécution des obligations définies lors de la conclusion du contrat ou
          de la durée prédéfinie de la relation contractuelle.
        </LegalText>
        <LegalText>
          <LegalLead>
            Conservation des données anonymisées au delà de la relation contractuelle / après la
            suppression du compte
          </LegalLead>
          <br />
          Nous conservons les données personnelles pour la durée strictement nécessaire à la
          réalisation des finalités décrites dans les présentes Politiques de confidentialité.
          Au-delà de cette durée, elles seront anonymisées et conservées à des fins exclusivement
          statistiques et ne donneront lieu à aucune exploitation, de quelque nature que ce soit.
        </LegalText>
        <LegalText>
          <LegalLead>Suppression des données après suppression du compte</LegalLead>
          <br />
          Des moyens de purge de données sont mis en place afin d&apos;en prévoir la suppression
          effective dès lors que la durée de conservation ou d&apos;archivage nécessaire à
          l&apos;accomplissement des finalités déterminées ou imposées est atteinte. Conformément à
          la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux
          libertés, vous disposez par ailleurs d&apos;un droit de suppression sur vos données que
          vous pouvez exercer à tout moment en prenant contact avec l&apos;Éditeur.
        </LegalText>
        <LegalText>
          <LegalLead>Suppression des données après 3 ans d&apos;inactivité</LegalLead>
          <br />
          Pour des raisons de sécurité, si vous ne vous êtes pas authentifié sur le Site pendant une
          période de trois ans, vous recevrez un e-mail vous invitant à vous connecter dans les plus
          brefs délais, sans quoi vos données seront supprimées de nos bases de données.
        </LegalText>
      </LegalSection>

      <LegalSection title="11- Suppression du compte">
        <LegalText>
          <LegalLead>Suppression du compte à la demande</LegalLead>
          <br />
          L&apos;Utilisateur a la possibilité de supprimer son Compte à tout moment, par simple
          demande à l&apos;Éditeur OU par le menu de suppression de Compte présent dans les
          paramètres du Compte le cas échéant.
        </LegalText>
        <LegalText>
          <LegalLead>
            Suppression du compte en cas de violation de la Politique de Confidentialité
          </LegalLead>
          <br />
          En cas de violation d&apos;une ou de plusieurs dispositions de la Politique de
          Confidentialité ou de tout autre document incorporé aux présentes par référence,
          l&apos;Éditeur se réserve le droit de mettre fin ou restreindre sans aucun avertissement
          préalable et à sa seule discrétion, votre usage et accès aux services, à votre compte et à
          tous les Sites.
        </LegalText>
      </LegalSection>

      <LegalSection title="12- Indications en cas de faille de sécurité décelée par l'Éditeur">
        <LegalText>
          <LegalLead>Information de l&apos;Utilisateur en cas de faille de sécurité</LegalLead>
          <br />
          Nous nous engageons à mettre en oeuvre toutes les mesures techniques et organisationnelles
          appropriées afin de garantir un niveau de sécurité adapté au regard des risques
          d&apos;accès accidentels, non autorisés ou illégaux, de divulgation, d&apos;altération, de
          perte ou encore de destruction des données personnelles vous concernant. Dans
          l&apos;éventualité où nous prendrions connaissance d&apos;un accès illégal aux données
          personnelles vous concernant stockées sur nos serveurs ou ceux de nos prestataires, ou
          d&apos;un accès non autorisé ayant pour conséquence la réalisation des risques identifiés
          ci-dessus, nous nous engageons à :
          <br />– Vous notifier l&apos;incident dans les plus brefs délais ;
          <br />– Examiner les causes de l&apos;incident et vous en informer ;
          <br />– Prendre les mesures nécessaires dans la limite du raisonnable afin d&apos;amoindrir
          les effets négatifs et préjudices pouvant résulter dudit incident.
        </LegalText>
        <LegalText>
          <LegalLead>Limitation de la responsabilité</LegalLead>
          <br />
          En aucun cas les engagements définis au point ci-dessus relatifs à la notification en cas
          de faille de sécurité ne peuvent être assimilés à une quelconque reconnaissance de faute ou
          de responsabilité quant à la survenance de l&apos;incident en question.
        </LegalText>
      </LegalSection>

      <LegalSection title="13- Transfert des données personnelles à l'étranger">
        <LegalText>
          <LegalLead>Pas de transfert en dehors de l&apos;Union européenne</LegalLead>
          <br />
          L&apos;Éditeur s&apos;engage à ne pas transférer les données personnelles de ses
          Utilisateurs en dehors de l&apos;Union européenne.
        </LegalText>
        <LegalText>
          <a
            href="https://www.cnil.fr/fr/la-protection-des-donnees-dans-le-monde"
            target="_blank"
            rel="noopener noreferrer"
            className="break-words underline hover:text-plum"
          >
            https://www.cnil.fr/fr/la-protection-des-donnees-dans-le-monde
          </a>
        </LegalText>
      </LegalSection>

      <LegalSection title="14- Modification de la politique de confidentialité">
        <LegalText>
          <LegalLead>
            En cas de modification de la présente Politique de Confidentialité, engagement de ne pas
            baisser le niveau de confidentialité de manière substantielle sans l&apos;information
            préalable des personnes concernées
          </LegalLead>
          <br />
          Nous nous engageons à vous informer en cas de modification substantielle de la présente
          Politique de Confidentialité, et à ne pas baisser le niveau de confidentialité de vos
          données de manière substantielle sans vous en informer et obtenir votre consentement.
        </LegalText>
      </LegalSection>

      <LegalSection title="15- Droit applicable et modalités de recours">
        <LegalText>
          <LegalLead>Clause d&apos;arbitrage</LegalLead>
          <br />
          Vous acceptez expressément que tout litige susceptible de naître du fait de la présente
          Politique de Confidentialité, notamment de son interprétation ou de son exécution, relèvera
          d&apos;une procédure d&apos;arbitrage soumise au règlement de la plateforme
          d&apos;arbitrage choisie d&apos;un commun accord, auquel vous adhérerez sans réserve.
        </LegalText>
      </LegalSection>

      <LegalSection title="16- Portabilité des données">
        <LegalText>
          <LegalLead>Portabilité des données</LegalLead>
          <br />
          L&apos;Éditeur s&apos;engage à vous offrir la possibilité de vous faire restituer
          l&apos;ensemble des données vous concernant sur simple demande. L&apos;Utilisateur se voit
          ainsi garantir une meilleure maîtrise de ses données, et garde la possibilité de les
          réutiliser. Ces données devront être fournies dans un format ouvert et aisément
          réutilisable.
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import CookieConsentReset from "@/components/CookieConsentReset";
import {
  LegalList,
  LegalPage,
  LegalSection,
  LegalSubTitle,
  LegalText,
} from "@/components/LegalPage";
import { routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de cookies (UE) - Ostheopathie animale Toulouse",
  description:
    "Politique de cookies du site Marie Salabert Ostéopathie Animale : cookies déposés, consentement, durées de conservation et vos droits.",
  alternates: { canonical: "/politique-de-cookies-ue" },
  robots: { index: true, follow: true },
};

const cookies = [
  {
    nom: "cookie-consent",
    type: "Stockage local (localStorage)",
    finalite: "Mémoriser votre choix d'accepter ou de refuser les contenus tiers",
    duree: "Jusqu'à sa suppression depuis votre navigateur",
    categorie: "Fonctionnel",
  },
  {
    nom: "Cookies Google Maps (NID, …)",
    type: "Cookies tiers déposés par Google",
    finalite: "Affichage de la carte du cabinet sur la page « Prendre un rendez-vous »",
    duree: "Définie par Google",
    categorie: "Soumis à votre consentement",
  },
] as const;

export default function PolitiqueDeCookiesPage() {
  return (
    <LegalPage title="Politique de cookies (UE)" align="left">
      <LegalText>
        <em>
          Cette politique de cookies a été mise à jour pour la dernière fois le 22/07/2026 et
          s&apos;applique aux citoyens et aux résidents permanents légaux de l&apos;Espace Économique
          Européen et de la Suisse.
        </em>
      </LegalText>

      <LegalSection title="1. Introduction">
        <LegalText>
          Notre site web,{" "}
          <a href={site.url} className="break-words underline hover:text-plum">
            {site.url}
          </a>{" "}
          (ci-après : «&nbsp;le site web&nbsp;») utilise des cookies et autres technologies liées
          (par simplification, toutes ces technologies sont désignées par le terme
          «&nbsp;cookies&nbsp;»). Aucun cookie n&apos;est déposé par des tierces parties sans votre
          accord préalable. Dans le document ci-dessous, nous vous informons de l&apos;utilisation
          des cookies sur notre site web.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Que sont les cookies ?">
        <LegalText>
          Un cookie est un petit fichier simple envoyé avec les pages de ce site web et stocké par
          votre navigateur sur le disque dur de votre ordinateur ou d&apos;un autre appareil. Les
          informations qui y sont stockées peuvent être renvoyées à nos serveurs ou aux serveurs des
          tierces parties concernées lors d&apos;une visite ultérieure.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. Que sont les scripts ?">
        <LegalText>
          Un script est un élément de code utilisé pour que notre site web fonctionne correctement et
          de manière interactive. Ce code est exécuté sur notre serveur ou sur votre appareil.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Qu'est-ce qu'une balise invisible ?">
        <LegalText>
          Une balise invisible (ou balise web) est un petit morceau de texte ou d&apos;image
          invisible sur un site web, utilisé pour suivre le trafic sur un site web. Pour ce faire,
          diverses données vous concernant sont stockées à l&apos;aide de balises invisibles. Notre
          site web n&apos;utilise pas de balises invisibles.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Cookies">
        <LegalSubTitle>5.1 Cookies techniques ou fonctionnels</LegalSubTitle>
        <LegalText>
          Certains cookies assurent le fonctionnement correct de certaines parties du site web et la
          prise en compte de vos préférences en tant qu&apos;internaute. En plaçant des cookies
          fonctionnels, nous vous facilitons la visite de notre site web : vous n&apos;avez pas
          besoin de saisir à plusieurs reprises les mêmes informations lors de la visite de notre
          site web. Nous pouvons déposer ces cookies sans votre consentement.
        </LegalText>

        <LegalSubTitle>5.2 Cookies de marketing/suivi</LegalSubTitle>
        <LegalText>
          Les cookies de marketing/suivi sont des cookies ou toute autre forme de stockage local,
          utilisés pour créer des profils d&apos;utilisateurs afin d&apos;afficher de la publicité ou
          de suivre l&apos;utilisateur sur ce site web ou sur plusieurs sites web dans des finalités
          marketing similaires. Notre site web ne dépose aucun cookie de marketing ou de suivi, et
          n&apos;utilise aucun outil de mesure d&apos;audience.
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Cookies placés">
        <LegalText>
          Le tableau ci-dessous récapitule l&apos;intégralité des cookies et des données stockées sur
          votre terminal par notre site web.
        </LegalText>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px] text-body">
            <caption className="sr-only">Cookies et stockages déposés par le site</caption>
            <thead>
              <tr className="bg-surface text-ink">
                <th scope="col" className="border border-black/10 px-3 py-2 font-semibold">
                  Nom
                </th>
                <th scope="col" className="border border-black/10 px-3 py-2 font-semibold">
                  Type
                </th>
                <th scope="col" className="border border-black/10 px-3 py-2 font-semibold">
                  Fonction
                </th>
                <th scope="col" className="border border-black/10 px-3 py-2 font-semibold">
                  Expiration
                </th>
                <th scope="col" className="border border-black/10 px-3 py-2 font-semibold">
                  Catégorie
                </th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((c) => (
                <tr key={c.nom} className="align-top">
                  <th scope="row" className="border border-black/10 px-3 py-2 font-medium text-ink">
                    {c.nom}
                  </th>
                  <td className="border border-black/10 px-3 py-2">{c.type}</td>
                  <td className="border border-black/10 px-3 py-2">{c.finalite}</td>
                  <td className="border border-black/10 px-3 py-2">{c.duree}</td>
                  <td className="border border-black/10 px-3 py-2">{c.categorie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <LegalText>
          Le formulaire de contact du site ne dépose aucun cookie : les informations que vous y
          saisissez nous sont transmises par courriel et ne servent qu&apos;à répondre à votre
          demande.
        </LegalText>
      </LegalSection>

      <LegalSection title="7. Consentement">
        <LegalText>
          Lorsque vous visitez notre site web pour la première fois, nous vous montrons un bandeau
          avec une explication sur les cookies. Dès que vous cliquez sur «&nbsp;Accepter&nbsp;», vous
          nous autorisez à charger les contenus tiers décrits dans la présente politique de cookies.
          Si vous cliquez sur «&nbsp;Refuser&nbsp;», aucun contenu tiers n&apos;est chargé et le site
          reste pleinement utilisable. Votre choix est conservé sur votre appareil et n&apos;est
          transmis à personne.
        </LegalText>

        <LegalSubTitle>7.1 Gérez vos réglages de consentement</LegalSubTitle>
        <CookieConsentReset />
      </LegalSection>

      <LegalSection title="8. Activer/désactiver et supprimer les cookies">
        <LegalText>
          Vous pouvez utiliser votre navigateur internet pour supprimer automatiquement ou
          manuellement les cookies. Vous pouvez également spécifier que certains cookies ne peuvent
          pas être placés. Une autre option consiste à modifier les réglages de votre navigateur
          Internet afin que vous receviez un message à chaque fois qu&apos;un cookie est placé. Pour
          plus d&apos;informations sur ces options, reportez-vous aux instructions de la section Aide
          de votre navigateur.
        </LegalText>
        <LegalText>
          Si vous supprimez les données de navigation dans votre navigateur, votre choix de
          consentement est effacé : le bandeau vous sera de nouveau proposé lors de votre prochaine
          visite.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Vos droits concernant les données personnelles">
        <LegalText>Vous avez les droits suivants concernant vos données personnelles :</LegalText>
        <LegalList
          items={[
            "Vous avez le droit de savoir pourquoi vos données personnelles sont nécessaires, ce qui leur arrivera et combien de temps elles seront conservées.",
            "Droit d'accès : vous avez le droit d'accéder à vos données personnelles que nous connaissons.",
            "Droit de rectification : vous avez le droit à tout moment de compléter, corriger, faire supprimer ou bloquer vos données personnelles.",
            "Si vous nous donnez votre consentement pour le traitement de vos données, vous avez le droit de révoquer ce consentement et de faire supprimer vos données personnelles.",
            "Droit de transférer vos données : vous avez le droit de demander toutes vos données personnelles au responsable du traitement et de les transférer dans leur intégralité à un autre responsable du traitement.",
            "Droit d'opposition : vous pouvez vous opposer au traitement de vos données. Nous obtempérerons, à moins que certaines raisons ne justifient ce traitement.",
          ]}
        />
        <LegalText>
          Pour exercer ces droits, veuillez nous contacter. Veuillez vous référer aux coordonnées au
          bas de cette politique de cookies. Si vous avez une plainte concernant la façon dont nous
          traitons vos données, nous aimerions en être informés, mais vous avez également le droit de
          déposer une plainte auprès de l&apos;autorité de contrôle (l&apos;autorité chargée de la
          protection des données).
        </LegalText>
        <LegalText>
          Vous pouvez également consulter notre{" "}
          <a href={routes.privacy} className="underline hover:text-plum">
            politique de confidentialité
          </a>
          .
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Coordonnées">
        <LegalText>
          Pour des questions et/ou des commentaires sur notre politique de cookies et cette
          déclaration, veuillez nous contacter en utilisant les coordonnées suivantes :
        </LegalText>
        <LegalText>
          Marie Salabert Ostéopathie Animale
          <br />
          {site.serviceArea}
          <br />
          France
          <br />
          Site web :{" "}
          <a href={site.url} className="break-words underline hover:text-plum">
            {site.url}
          </a>
          <br />
          E-mail :{" "}
          <a href="mailto:marie.salabert@outlook.fr" className="underline hover:text-plum">
            marie.salabert@outlook.fr
          </a>
          <br />
          Numéro de téléphone : 06.37.88.00.73
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
}

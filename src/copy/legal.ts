/**
 * Politique de confidentialité.
 *
 * Écrite à partir de ce que le site fait **réellement**, vérifié sur le build :
 * aucune requête vers un domaine tiers, polices auto-hébergées, aucune mesure
 * d'audience, aucun formulaire — les seuls contacts sont des liens `mailto:`.
 * Le seul tiers est la carte Google des pages de projet, chargée uniquement
 * après consentement.
 *
 * Les trous sont explicites et rassemblés dans `aCompleter` : ils demandent des
 * informations que seul MauDev détient. Ils s'affichent en clair sur la page
 * tant qu'ils ne sont pas comblés — un encadré visible vaut mieux qu'un texte
 * plausible mais inventé, qui passerait la relecture sans qu'on le voie.
 *
 * Rien ici ne remplace une relecture juridique.
 */
export const legal = {
  fr: {
    title: 'Politique de confidentialité',
    lead: "Ce site est un site vitrine. Il ne crée pas de compte, ne traite aucun paiement et ne comporte aucun formulaire : les prises de contact passent par des liens courriel, qui ouvrent votre propre logiciel de messagerie.",

    aCompleterTitre: 'À compléter avant la mise en ligne',
    aCompleterLead:
      "Les points suivants demandent des informations que seul MauDev détient. Ils sont laissés en évidence plutôt que remplis au jugé.",
    aCompleter: [
      "Le responsable de la protection des renseignements personnels : nom, titre et courriel. La Loi 25 exige qu'il soit désigné et que ses coordonnées soient publiées. À défaut de désignation formelle, la fonction revient à la personne ayant la plus haute autorité dans l'entreprise.",
      "L'adresse postale de l'entreprise.",
      "L'hébergeur du site et le pays où les fichiers sont conservés.",
      "La date de dernière mise à jour de la présente politique.",
      "Confirmation que la carte Google est le seul service tiers prévu. L'ajout d'une mesure d'audience, d'un formulaire hébergé ou d'un fil de médias sociaux changerait ce document et le bandeau de consentement.",
    ],

    sections: [
      {
        titre: 'Ce que le site recueille de lui-même',
        paragraphes: [
          "Rien. Le site est composé de pages statiques. Il n'y a ni compte, ni formulaire, ni outil de mesure d'audience, ni pixel publicitaire. Les polices de caractères sont servies depuis nos propres fichiers et non depuis un service externe.",
          "Comme tout site web, l'hébergeur peut conserver des journaux techniques de connexion (adresse IP, date, page demandée) à des fins de sécurité et de diagnostic. Ces journaux ne sont pas exploités à d'autres fins.",
        ],
      },
      {
        titre: 'Témoins',
        paragraphes: [
          "Un seul témoin est déposé sans votre consentement : celui qui retient votre réponse au bandeau. Il est nécessaire au fonctionnement — sans lui, la question vous serait reposée à chaque page. Il reste sur votre appareil et n'est jamais transmis à un serveur.",
          "Aucun autre témoin n'est déposé tant que vous n'avez pas accepté. Le refus est l'état par défaut.",
        ],
      },
      {
        titre: 'La carte Google',
        paragraphes: [
          "Les pages de projet peuvent afficher une carte fournie par Google. Elle n'est chargée que si vous l'avez accepté. Tant que ce n'est pas le cas, aucune requête ne part vers Google et l'adresse du projet reste affichée en clair.",
          "Si vous acceptez, Google reçoit votre adresse IP et peut déposer ses propres témoins, selon ses conditions et sa politique de confidentialité. Ce traitement est le sien, pas le nôtre.",
          "Vous pouvez changer d'avis à tout moment par le lien « Témoins » au pied de chaque page. Retirer votre consentement retire la carte immédiatement.",
        ],
      },
      {
        titre: 'Vos droits',
        paragraphes: [
          "Vous pouvez retirer votre consentement aux témoins à tout moment, aussi simplement que vous l'avez donné.",
          "Si vous nous écrivez, les renseignements contenus dans votre courriel sont conservés le temps de traiter votre demande. Vous pouvez demander à les consulter, à les faire corriger ou à les faire supprimer en écrivant à la même adresse.",
        ],
      },
    ],

    contactTitre: 'Nous joindre',
    contactTexte: 'Pour toute question sur cette politique ou sur vos renseignements :',
  },

  en: {
    title: 'Privacy policy',
    lead: 'This is a showcase website. It creates no account, processes no payment and contains no form: enquiries go through email links, which open your own mail application.',

    aCompleterTitre: 'To be completed before launch',
    aCompleterLead:
      'The following points require information only MauDev holds. They are left visible rather than filled in with guesswork.',
    aCompleter: [
      'The person responsible for the protection of personal information: name, title and email. Quebec’s Law 25 requires that this person be designated and their contact details published. Absent a formal designation, the role falls to the person with the highest authority in the company.',
      'The company’s postal address.',
      'The website host and the country where the files are stored.',
      'The date this policy was last updated.',
      'Confirmation that the Google map is the only third-party service planned. Adding analytics, a hosted form or a social media feed would change this document and the consent banner.',
    ],

    sections: [
      {
        titre: 'What the site collects on its own',
        paragraphes: [
          'Nothing. The site is made of static pages. There is no account, no form, no analytics tool and no advertising pixel. Fonts are served from our own files, not from an external service.',
          'As with any website, the host may keep technical connection logs (IP address, date, page requested) for security and troubleshooting. These logs are not used for any other purpose.',
        ],
      },
      {
        titre: 'Cookies',
        paragraphes: [
          'Only one cookie is set without your consent: the one that remembers your answer to the banner. It is necessary for the site to work — without it, the question would be asked again on every page. It stays on your device and is never sent to a server.',
          'No other cookie is set until you accept. Declining is the default state.',
        ],
      },
      {
        titre: 'The Google map',
        paragraphes: [
          'Project pages can display a map provided by Google. It loads only if you have accepted. Until then, no request goes to Google and the project address remains visible in plain text.',
          'If you accept, Google receives your IP address and may set its own cookies, under its own terms and privacy policy. That processing is theirs, not ours.',
          'You can change your mind at any time through the “Cookies” link at the bottom of every page. Withdrawing your consent removes the map immediately.',
        ],
      },
      {
        titre: 'Your rights',
        paragraphes: [
          'You can withdraw your consent to cookies at any time, as easily as you gave it.',
          'If you write to us, the information in your email is kept for as long as it takes to handle your request. You can ask to see it, correct it or have it deleted by writing to the same address.',
        ],
      },
    ],

    contactTitre: 'Contact',
    contactTexte: 'For any question about this policy or about your information:',
  },
} as const;

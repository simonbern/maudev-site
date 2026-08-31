/**
 * Formulaire de demande de visite.
 *
 * Deux consentements distincts, et c'est volontaire :
 *
 * · **La demande elle-même** se consent en envoyant le formulaire. La mention
 *   au point de collecte dit à quoi servent les renseignements et renvoie à la
 *   politique — c'est ce qu'exige la Loi 25, pas une case à cocher de plus.
 * · **Les communications commerciales** demandent un consentement exprès,
 *   séparé, décoché par défaut. C'est la LCAP : demander une visite ne vaut pas
 *   acceptation d'une infolettre. Fusionner les deux invaliderait le second.
 */
export const visite = {
  fr: {
    titre: 'Demander une visite',
    lead: "Laissez-nous vos coordonnées et le type de logement qui vous intéresse. On vous rappelle pour fixer un moment.",

    projet: 'Projet',
    type: 'Type de logement',
    typeIndifferent: 'Peu importe',
    emmenagement: 'Emménagement souhaité',
    emmenagementAide: 'Approximatif, à titre indicatif.',
    nom: 'Nom',
    courriel: 'Courriel',
    telephone: 'Téléphone',
    telephoneAide: 'Facultatif — mais c’est le plus rapide pour vous joindre.',
    message: 'Message',
    messageAide: 'Facultatif.',

    infolettre:
      'Je souhaite recevoir des nouvelles des projets de MauDev par courriel. Je peux me désabonner à tout moment.',

    mention:
      'Vos coordonnées servent uniquement à répondre à cette demande de visite. Elles ne sont ni vendues ni utilisées à d’autres fins.',
    mentionLien: 'Politique de confidentialité',

    envoyer: 'Envoyer la demande',
    envoiEnCours: 'Envoi en cours…',

    succesTitre: 'Demande envoyée',
    succesTexte: 'Merci. Nous vous revenons rapidement pour convenir d’un moment.',

    erreurTitre: 'L’envoi a échoué',
    erreurTexte: 'Rien n’a été perdu de votre côté. Réessayez, ou écrivez-nous directement :',

    sansJs: 'Ce formulaire demande JavaScript. Vous pouvez aussi nous écrire à',
    enAttente:
      "L'envoi automatique n'est pas encore branché. En attendant, écrivez-nous à",
  },

  en: {
    titre: 'Request a viewing',
    lead: 'Leave us your contact details and the type of apartment you have in mind. We will call you back to set a time.',

    projet: 'Project',
    type: 'Apartment type',
    typeIndifferent: 'No preference',
    emmenagement: 'Preferred move-in',
    emmenagementAide: 'Approximate — just to give us an idea.',
    nom: 'Name',
    courriel: 'Email',
    telephone: 'Phone',
    telephoneAide: 'Optional — but the fastest way to reach you.',
    message: 'Message',
    messageAide: 'Optional.',

    infolettre:
      'I would like to receive news about MauDev projects by email. I can unsubscribe at any time.',

    mention:
      'Your details are used only to answer this viewing request. They are neither sold nor used for any other purpose.',
    mentionLien: 'Privacy policy',

    envoyer: 'Send request',
    envoiEnCours: 'Sending…',

    succesTitre: 'Request sent',
    succesTexte: 'Thank you. We will get back to you shortly to arrange a time.',

    erreurTitre: 'The request could not be sent',
    erreurTexte: 'Nothing was lost on your end. Try again, or write to us directly:',

    sansJs: 'This form requires JavaScript. You can also write to us at',
    enAttente: 'Automatic sending is not connected yet. In the meantime, write to us at',
  },
} as const;

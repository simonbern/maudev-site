/**
 * Page « Notre modèle ».
 *
 * Repris MOT POUR MOT de reference/mirror/www.mau-dev.ca/{fr,en}/about —
 * CLAUDE.md demande « même contenu que la page correspondante de l'ancien
 * site ». Seule la mise en forme change.
 *
 * Deux blocs de l'ancienne page sont volontairement écartés :
 *   · « Volume de construction 2025 : 0m$ » — la valeur est un gabarit non
 *     rempli (0), la publier serait pire que l'omettre.
 *   · Le téléphone « +1 555 010 020 », précédé d'un `{text.phone}` non
 *     substitué : numéro de démonstration, pas une vraie coordonnée.
 */
export const modele = {
  fr: {
    eyebrow: 'Notre modèle',
    title: 'Notre modèle intégré',
    lead: "MauDev est un développeur familial et entrepreneur général conçu pour l'exécution à long terme. L'équipe réunit l'acquisition, la densification, le financement, la construction, la location et l'administration sous un même toit afin de réduire la friction et de protéger le rendement des investisseurs.",

    plateformeTitle: 'Une seule plateforme intégrée',
    piliers: [
      {
        titre: 'Acquérir et densifier',
        texte:
          'MauDev cible des sites à bon prix et crée de la valeur grâce au zonage, à la densification et à une sélection disciplinée des marchés.',
      },
      {
        titre: 'Financer et construire',
        texte:
          "L'équipe gère le financement, les appels d'offres, les contrats et le chantier, tandis que Trexco et Les Distributions M. Dion améliorent le contrôle du risque, des prix et de l'approvisionnement.",
      },
      {
        titre: 'Louer et administrer',
        texte:
          "MauDev accompagne l'actif jusqu'à la sélection des locataires, la location, l'administration, les états trimestriels et les rapports de fin d'année.",
      },
    ],

    pourquoiTitle: 'Pourquoi les investisseurs choisissent MauDev',
    raisons: [
      {
        titre: 'Vision long terme',
        texte:
          "Comme entreprise familiale, MauDev développe des actifs avec une vision durable de la qualité, de la pérennité et de l'alignement avec les investisseurs.",
      },
      {
        titre: 'Transparence',
        texte:
          "L'entreprise privilégie une communication claire, une reddition de comptes disciplinée et une responsabilité visible tout au long du cycle du projet.",
      },
      {
        titre: 'Intégration verticale',
        texte:
          "Trexco et Les Distributions M. Dion améliorent le contrôle du risque d'excavation, de l'approvisionnement, des prix et de l'exécution en chantier.",
      },
      {
        titre: 'Discipline de marché',
        texte:
          'MauDev se concentre sur des marchés locaux où la demande locative est forte, les prix stables et les occasions de création de valeur bien identifiées.',
      },
    ],

    equipeTitle: 'Équipe de direction',
    // Le paragraphe de l'ancien site est décomposé en fiches : mêmes noms,
    // mêmes fonctions, même ordre. Six personnes listées dans une phrase se
    // lisent comme une énumération ; en portraits, on retient qui fait quoi.
    // « Pierre-Hugues » n'a pas de nom de famille dans la source — on ne
    // l'invente pas.
    equipe: [
      { nom: 'Alexandre Paquin', role: 'Président · Finances' },
      { nom: 'Jean-Christophe Paquin', role: 'Président · Développement' },
      { nom: 'Samuel Brisson', role: 'Président · Construction' },
      { nom: 'Pierre-Hugues', role: 'Développement' },
      { nom: 'Stéphanie Grenon', role: 'Finances' },
      { nom: 'Marc-André Dion', role: 'Développement des affaires' },
    ],

    imageAlt:
      "Rendu 3D de deux immeubles résidentiels de trois étages en lisière de boisé, en fin de journée",
    imageLegende: 'Rendu 3D — projet résidentiel MauDev',

    ctaTitle: 'Un projet, une question ?',
    ctaLead: 'Écrivez-nous, nous répondons rapidement.',
    ctaBouton: 'Écrire à MauDev',
    ctaProjets: 'Voir les projets réalisés',
  },

  en: {
    eyebrow: 'Our model',
    title: 'Our integrated model',
    lead: 'MauDev is a family-owned developer and general contractor built for long-term execution. The team combines acquisition, densification, financing, construction, leasing, and administration under one roof to reduce friction and protect investor returns.',

    plateformeTitle: 'One integrated platform',
    piliers: [
      {
        titre: 'Acquire & densify',
        texte:
          'MauDev targets sites at a favorable land basis and creates value through zoning work, densification, and disciplined market selection.',
      },
      {
        titre: 'Finance & build',
        texte:
          'The team manages financing, tendering, contracts, and site execution, while Trexco and Distributions M. Dion improve control over risk, pricing, and supply.',
      },
      {
        titre: 'Lease & manage',
        texte:
          'MauDev carries the asset through tenant selection, lease-up, administration, quarterly statements, and year-end reporting.',
      },
    ],

    pourquoiTitle: 'Why investors partner with MauDev',
    raisons: [
      {
        titre: 'Long view',
        texte:
          'As a family business, MauDev develops assets with a long view of quality, durability, and investor alignment.',
      },
      {
        titre: 'Transparency',
        texte:
          'The company emphasizes clear communication, disciplined reporting, and visible accountability throughout the project lifecycle.',
      },
      {
        titre: 'Vertical integration',
        texte:
          'Trexco and Distributions M. Dion improve control over excavation risk, supply, pricing, and construction execution.',
      },
      {
        titre: 'Market discipline',
        texte:
          'MauDev focuses on local markets with strong rental demand, stable pricing, and identifiable value-add opportunities.',
      },
    ],

    equipeTitle: 'Leadership',
    equipe: [
      { nom: 'Alexandre Paquin', role: 'President · Finance' },
      { nom: 'Jean-Christophe Paquin', role: 'President · Development' },
      { nom: 'Samuel Brisson', role: 'President · Construction' },
      { nom: 'Pierre-Hugues', role: 'Development' },
      { nom: 'Stéphanie Grenon', role: 'Finance' },
      { nom: 'Marc-André Dion', role: 'Business development' },
    ],

    imageAlt:
      '3D rendering of two three-storey residential buildings at the edge of a wooded lot, late in the day',
    imageLegende: '3D rendering — MauDev residential project',

    ctaTitle: 'A project, a question?',
    ctaLead: 'Write to us — we answer quickly.',
    ctaBouton: 'Email MauDev',
    ctaProjets: 'See completed projects',
  },
} as const;

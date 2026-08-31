/**
 * Contenu de la page d'accueil, FR et EN côte à côte pour garantir la parité.
 *
 * Provenance de chaque bloc (règle CLAUDE.md : ne jamais inventer de contenu) :
 *   · hero.title  — PROPOSITION. Aucune accroche n'existe dans le brief ni dans
 *                   le mirror. Reprend la direction validée en session
 *                   (« Terre chaleureuse »). À faire valider par le client.
 *   · hero.lead   — client, 2026-08-28. Nommait les deux municipalités ; le
 *                   client l'a raccourci — la liste des villes vieillit à
 *                   chaque projet et l'index « Où MauDev bâtit » la donne déjà.
 *   · modele.*    — repris mot pour mot de reference/mirror/.../{fr,en}/about.
 *   · le reste    — libellés d'interface.
 */
export const landing = {
  fr: {
    hero: {
      // Le titre est coupé en deux pour que la seconde moitié passe en serif
      // italique. Le texte rendu est identique — c'est une découpe de mise en
      // page, pas un changement de contenu.
      title: 'Des logements neufs,',
      // L'accent tient sur deux lignes. Même raison que la coupe title /
      // titleAccent : le texte rendu est identique, c'est une découpe de mise
      // en page. Couper au dernier mot d'un seul côté ne marche pas — en
      // anglais ça laisserait « in. » seul sur sa ligne.
      titleAccent: 'pensés pour y',
      titleAccent2: 'vivre.',
      lead: 'Des immeubles locatifs neufs à louer.',
      // L'image du hero, décrite pour elle-même. Elle reprenait le chapeau,
      // qui nomme deux villes où le plan n'a pas été tourné.
      //
      // Une seule alternative pour deux images — le `<picture>` n'a qu'un
      // `<img>`, donc qu'un `alt`. Elle est écrite pour être vraie des deux :
      // le drone survole des immeubles MauDev en construction, la façade
      // montre un immeuble MauDev livré.
      imageAlt: 'Un immeuble locatif neuf de MauDev.',
      primary: 'Voir les logements en construction',
      secondary: 'Notre modèle',
      play: 'Lire la vidéo',
      pause: 'Mettre la vidéo en pause',
      defiler: 'Défiler',
    },
    projets: {
      eyebrow: 'À louer',
      title: 'À louer',
      all: 'Tous les projets à louer',
      units: (n: number) => `${n} logements`,
      cities: (n: number) => (n > 1 ? `${n} villes` : `${n} ville`),
      projects: (n: number) => (n > 1 ? `${n} projets` : `${n} projet`),
      precedent: 'Projet précédent',
      suivant: 'Projet suivant',
    },
    modele: {
      eyebrow: 'Notre modèle',
      title: 'Une seule plateforme intégrée',
      imageAlt: "Séjour et cuisine d'un logement livré, lumière naturelle sur trois fenêtres",
      lead: "MauDev est un développeur familial et entrepreneur général conçu pour l'exécution à long terme. L'équipe réunit l'acquisition, la densification, le financement, la construction, la location et l'administration sous un même toit afin de réduire la friction et de protéger le rendement des investisseurs.",
      more: 'En savoir plus',
    },
    // Libellé d'interface. Les noms de villes et leur décompte viennent de la
    // collection — rien à saisir ici, rien à tenir à jour.
    // La section est née vide — le client annonçait des projets sans pouvoir
    // les décrire. Elle renvoie maintenant à `/projets-a-venir`. Le décompte
    // vient de la collection : cette phrase-ci ne nomme ni nombre, ni ville,
    // ni date, donc elle ne vieillit pas.
    aVenir: {
      titre: 'À venir',
      lead: 'Les chantiers en cours. Ils ne sont pas encore en location, mais ils sont déjà décrits.',
      cta: 'Voir les projets à venir',
      // L'image est un RENDU, pas une photo : le bâtiment n'est pas bâti. La
      // légende le dit, et nomme le projet — une projection sans légende sur
      // une page d'accueil se lit comme un immeuble existant.
      imageAlt: "Rendu 3D de la façade du projet du 1216 rue Principale, à Rivière-Beaudette",
      imageLegende: 'Rendu 3D — 1216 rue Principale, Rivière-Beaudette',
    },
    villes: {
      titre: 'Où MauDev bâtit',
    },
    chiffres: {
      titre: 'MauDev en chiffres',
      // Tous calculés depuis la collection : ajouter un projet les met à jour.
      enLocation: 'projets en location',
      logements: 'logements en construction',
      villes: 'municipalités',
      realises: 'projets réalisés',
    },
    contact: {
      eyebrow: 'Nous joindre',
      title: 'Une question sur un logement ?',
      lead: 'Écrivez-nous, nous répondons rapidement.',
      cta: 'Écrire à MauDev',
    },
  },

  en: {
    hero: {
      title: 'New apartments,',
      titleAccent: 'designed to',
      titleAccent2: 'live in.',
      lead: 'New apartment buildings for rent.',
      imageAlt: 'A new MauDev rental building.',
      primary: 'See the apartments under construction',
      secondary: 'Our model',
      play: 'Play video',
      pause: 'Pause video',
      defiler: 'Scroll',
    },
    projets: {
      eyebrow: 'For rent',
      title: 'For rent',
      all: 'All projects for rent',
      units: (n: number) => `${n} apartments`,
      cities: (n: number) => (n > 1 ? `${n} towns` : `${n} town`),
      projects: (n: number) => (n > 1 ? `${n} projects` : `${n} project`),
      precedent: 'Previous project',
      suivant: 'Next project',
    },
    modele: {
      eyebrow: 'Our model',
      title: 'One integrated platform',
      imageAlt: 'Living room and kitchen of a delivered apartment, natural light from three windows',
      lead: 'MauDev is a family-owned developer and general contractor built for long-term execution. The team combines acquisition, densification, financing, construction, leasing, and administration under one roof to reduce friction and protect investor returns.',
      more: 'Learn more',
    },
    aVenir: {
      titre: 'Coming up',
      lead: 'The sites under construction. Not available to rent yet, but already described.',
      cta: 'See the upcoming projects',
      imageAlt: '3D rendering of the façade of the 1216 rue Principale project, in Rivière-Beaudette',
      imageLegende: '3D rendering — 1216 rue Principale, Rivière-Beaudette',
    },
    villes: {
      titre: 'Where MauDev builds',
    },
    chiffres: {
      titre: 'MauDev in numbers',
      enLocation: 'projects for rent',
      logements: 'apartments under construction',
      villes: 'municipalities',
      realises: 'completed projects',
    },
    contact: {
      eyebrow: 'Contact us',
      title: 'A question about an apartment?',
      lead: 'Write to us — we answer quickly.',
      cta: 'Email MauDev',
    },
  },
} as const;

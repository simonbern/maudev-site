export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

/**
 * Les statuts qui mènent à `/a-louer` — ceux d'un logement qu'on peut louer
 * aujourd'hui, livré ou non.
 *
 * Écrit une fois plutôt qu'en `statut !== 'realise'` à cinq endroits. Cette
 * négation était juste tant qu'il n'existait que trois statuts ; le jour où
 * `construction` est arrivé, elle a fait tomber des chantiers annoncés dans
 * la liste des logements à louer, dans le pied de page et jusque dans les
 * routes `/a-louer/[projet]` — sans une seule erreur au build.
 */
export const EN_LOCATION = ['location', 'a-venir'] as const;
export const estEnLocation = (statut: string) =>
  (EN_LOCATION as readonly string[]).includes(statut);

/**
 * Une réalisation a-t-elle assez de matière pour mériter sa propre page ?
 *
 * Quinze projets sont livrés ; trois seulement ont reçu du client de quoi
 * remplir une fiche — photos et superficies unité par unité (Ridge, Henderson,
 * Ste-Cécile, cahiers du 2026-09-02). Les douze autres n'ont qu'un nom, une
 * ville, un résumé d'une ligne et quatre paires étiquette/valeur : tout ce que
 * la carte de `/projets` montre déjà. Leur ouvrir une page donnerait un hero
 * plein écran suivi de ce qu'on venait de lire, et un clic pour rien.
 *
 * Le critère est le contenu, pas une liste de slugs : le jour où le client
 * envoie les photos du 145 Salaberry, sa carte devient cliquable et sa page
 * apparaît, sans qu'on ait à y penser.
 *
 * Écrit ici, à côté d'`estEnLocation`, et pour la même raison : la règle sert
 * à trois endroits — les deux `getStaticPaths` et la carte. Si la carte et la
 * route divergeaient, on aurait soit des cartes qui mènent à un 404, soit des
 * pages qu'aucun lien n'atteint. Le build ne dirait rien ni dans un cas ni
 * dans l'autre.
 */
export const realiseAvecFiche = (d: {
  statut: string;
  photos: readonly unknown[];
  logements: readonly unknown[];
  plans: readonly unknown[];
  renders: readonly unknown[];
  video?: unknown;
}) =>
  d.statut === 'realise' &&
  (d.photos.length > 0 ||
    d.logements.length > 0 ||
    d.plans.length > 0 ||
    d.renders.length > 0 ||
    // Un plan de drone suffit (livraison du 2026-09-24) : 47 Nicholson et
    // 5515 Pierre-Dansereau n'ont rien d'autre, et la vidéo est justement ce
    // que la carte ne montre pas.
    d.video !== undefined);

/**
 * Segments d'URL traduits. La clé est toujours le segment FR — le français est
 * la langue par défaut et n'a pas de préfixe (voir astro.config.mjs).
 * Ajouter une page = ajouter une ligne ici.
 */
const SEGMENTS: Record<string, string> = {
  'a-louer': 'for-rent',
  'projets-a-venir': 'upcoming',
  projets: 'projects',
  'notre-modele': 'our-model',
  confidentialite: 'privacy',
};
const SEGMENTS_FR: Record<string, string> = Object.fromEntries(
  Object.entries(SEGMENTS).map(([fr, en]) => [en, fr]),
);

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

/** Segments du chemin, ramenés au vocabulaire FR quelle que soit la langue. */
function frSegments(pathname: string): string[] {
  const isEn = localeFromPath(pathname) === 'en';
  const p = isEn ? pathname.slice(3) : pathname;
  const segs = p.split('/').filter(Boolean);
  return isEn ? segs.map((s) => SEGMENTS_FR[s] ?? s) : segs;
}

/**
 * Équivalent d'un chemin dans l'autre langue.
 *
 * `lastSegment` sert aux routes dynamiques : le segment de projet diffère
 * d'une langue à l'autre (`url.fr` / `url.en` de la collection) et ne peut pas
 * se déduire d'une table statique. Les pages de projet le passent explicitement.
 */
export function translatePath(
  pathname: string,
  target: Locale,
  lastSegment?: string,
): string {
  const segs = frSegments(pathname);
  const out = segs.map((s, i) =>
    lastSegment && i === segs.length - 1 && segs.length > 1
      ? lastSegment
      : target === 'en'
        ? (SEGMENTS[s] ?? s)
        : s,
  );
  const body = out.join('/');
  if (target === 'en') return body ? `/en/${body}` : '/en/';
  return body ? `/${body}` : '/';
}

/** Chemin d'une page dans la langue courante, à partir de son chemin FR. */
export const localize = (frPath: string, locale: Locale) =>
  translatePath(frPath, locale);

/** Le chemin courant est-il celui de `frPath` (ou d'une de ses sous-pages) ? */
export function isActive(pathname: string, frPath: string): boolean {
  if (frPath === '/') return frSegments(pathname).length === 0;
  const target = frSegments(frPath).join('/');
  const current = frSegments(pathname).join('/');
  return current === target || current.startsWith(`${target}/`);
}

// ── Libellés d'interface ────────────────────────────────────────────────────
// Les chemins sont écrits en FR et traduits par localize().

export const NAV = [
  { path: '/a-louer', fr: 'À louer', en: 'For rent' },
  { path: '/projets-a-venir', fr: 'À venir', en: 'Upcoming' },
  { path: '/projets', fr: 'Projets', en: 'Projects' },
  { path: '/notre-modele', fr: 'Notre modèle', en: 'Our model' },
] as const;

export const ui = {
  fr: {
    skip: 'Aller au contenu',
    home: 'Accueil MauDev',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    contact: 'Nous joindre',
    switchTo: "Passer à l'anglais",
    forRent: 'À louer',
    company: 'MauDev',
    rights: 'Tous droits réservés.',
    privacy: 'Politique de confidentialité',
    temoins: 'Témoins',
    temoinsTitre: 'Témoins et carte',
    temoinsTexte:
      "Les pages de projet peuvent afficher une carte Google. L'afficher charge des ressources de Google, qui dépose alors des témoins sur votre appareil. Rien n'est chargé tant que vous n'avez pas choisi.",
    temoinsAccepter: 'Accepter',
    temoinsRefuser: 'Refuser',
    temoinsRouvrir: 'Modifier mon choix',
    soon: 'Bientôt',
    available: 'Disponible',
    photosSoon: 'Photos à venir',
    viewProject: 'Voir le projet',
    unitsWord: 'logements',
    delivery: 'Livraison',
    from: 'À partir de',
    perMonth: '/mois',
    priceOnRequest: 'Prix sur demande',
  },
  en: {
    skip: 'Skip to content',
    home: 'MauDev home',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    contact: 'Contact us',
    switchTo: 'Switch to French',
    forRent: 'For rent',
    company: 'MauDev',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
    temoins: 'Cookies',
    temoinsTitre: 'Cookies and map',
    temoinsTexte:
      'Project pages can display a Google map. Showing it loads resources from Google, which then sets cookies on your device. Nothing loads until you choose.',
    temoinsAccepter: 'Accept',
    temoinsRefuser: 'Decline',
    temoinsRouvrir: 'Change my choice',
    soon: 'Coming soon',
    available: 'Available',
    photosSoon: 'Photos coming',
    viewProject: 'View the project',
    unitsWord: 'apartments',
    delivery: 'Delivery',
    from: 'From',
    perMonth: '/month',
    priceOnRequest: 'Price on request',
  },
} as const;

/** Seule coordonnée présente dans le mirror de l'ancien site. */
export const CONTACT = { email: 'info@mau-dev.ca' } as const;


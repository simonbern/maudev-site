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
    unitsWord: 'apartments',
    delivery: 'Delivery',
    from: 'From',
    perMonth: '/month',
    priceOnRequest: 'Price on request',
  },
} as const;

/** Seule coordonnée présente dans le mirror de l'ancien site. */
export const CONTACT = { email: 'info@mau-dev.ca' } as const;


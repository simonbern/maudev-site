import { existsSync } from 'node:fs';

/**
 * Quelles polices le site utilise, et sous quels noms de variables CSS.
 *
 * Ce module existe pour que `astro.config.mjs` et `Layout.astro` ne puissent
 * pas diverger. Le Layout doit rendre un `<Font cssVariable="…">` par famille
 * déclarée dans la config : une famille configurée mais non rendue ne produit
 * aucune variable CSS, et la règle qui la consomme retombe silencieusement sur
 * son repli. C'est arrivé — la serif d'accent s'affichait en Georgia.
 *
 * Le nom de la grotesque dépend de la présence des fichiers Switzer. En le
 * calculant ici, la bascule ne demande de toucher à aucun des deux fichiers.
 */
const DOSSIER = new URL('./assets/fonts/', import.meta.url);

export const SWITZER_VARIABLE = 'Switzer-Variable.woff2';

/** Poids statiques, utilisés seulement si la variable est absente. */
export const SWITZER_STATIQUES = [
  { weight: '400', file: 'Switzer-Regular.woff2' },
  { weight: '500', file: 'Switzer-Medium.woff2' },
  { weight: '600', file: 'Switzer-Semibold.woff2' },
  { weight: '700', file: 'Switzer-Bold.woff2' },
];

export const aFichier = (nom) => existsSync(new URL(nom, DOSSIER));

export const switzerDispo =
  aFichier(SWITZER_VARIABLE) || SWITZER_STATIQUES.some((v) => aFichier(v.file));

/** Variable CSS de la grotesque active. Consommée par --font-sans. */
export const SANS = switzerDispo ? '--font-switzer' : '--font-inter';

/** Variable CSS de la serif d'accent. Consommée par --font-display. */
export const SERIF = '--font-spectral';

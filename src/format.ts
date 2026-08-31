import type { Locale } from './i18n';

const LOC: Record<Locale, string> = { fr: 'fr-CA', en: 'en-CA' };

/** 895 → « 895 $ » (fr) · « $895 » (en). Jamais de cents : ce sont des loyers. */
export const money = (n: number, locale: Locale) =>
  new Intl.NumberFormat(LOC[locale], {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);

/** 1082 → « 1 082 pi² » · « 1,082 sq ft ». */
export const area = (n: number, locale: Locale) =>
  `${new Intl.NumberFormat(LOC[locale]).format(n)} ${locale === 'fr' ? 'pi²' : 'sq ft'}`;

/**
 * « 2026-07 » → « juillet 2026 » · « July 2026 ».
 * Construit en UTC : `new Date('2026-07-01')` interprété en heure locale
 * bascule sur juin à l'ouest de Greenwich.
 */
export function deliveryDate(value: string, locale: Locale): string {
  const [y, m] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(LOC[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, (m ?? 1) - 1, 1)));
}

/** Fourchette : « 895 $ » si min seul, « 895 $ – 1 350 $ » si les deux. */
export function range(
  min: number | undefined,
  max: number | undefined,
  fmt: (n: number) => string,
): string | undefined {
  if (min === undefined) return undefined;
  return max === undefined || max === min ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

/**
 * « Salaberry-de-Valleyfield » → « salaberry-de-valleyfield ».
 *
 * Sert d'ancre entre l'index des municipalités de l'accueil et les groupes de
 * `/projets`. Les deux pages appellent cette fonction : une slugification
 * écrite deux fois finit par diverger sur un accent, et le lien casse sans
 * que rien n'échoue à la construction.
 *
 * `normalize('NFD')` sépare la lettre de son accent, la plage Unicode retire
 * l'accent. « Sainte-Anne-de-Bellevue » n'a pas d'accent, mais « Trois-Rivières »
 * en aurait un, et un `#` ne devrait jamais transporter d'accent.
 */
export const slugVille = (nom: string) =>
  nom
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

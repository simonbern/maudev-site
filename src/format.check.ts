/**
 * Vérification du formatage localisé : `node src/format.check.ts`
 *
 * Les espaces d'Intl sont insécables (U+202F, U+00A0) : on normalise avant de
 * comparer, sinon le test échoue sur des caractères invisibles.
 */
import assert from 'node:assert/strict';
import { money, area, deliveryDate, range, slugVille } from './format.ts';

const n = (s: string) => s.replace(/[  ]/g, ' ');
const eq = (a: string | undefined, b: string, m: string) => assert.equal(n(a ?? ''), b, m);

// Loyers — sans cents
eq(money(895, 'fr'), '895 $', 'prix fr');
eq(money(1350, 'fr'), '1 350 $', 'prix fr milliers');
eq(money(895, 'en'), '$895', 'prix en');
eq(money(1725, 'en'), '$1,725', 'prix en milliers');

// Superficies
eq(area(618, 'fr'), '618 pi²', 'superficie fr');
eq(area(1082, 'fr'), '1 082 pi²', 'superficie fr milliers');
eq(area(1082, 'en'), '1,082 sq ft', 'superficie en');

// Dates de livraison — le piège du fuseau
eq(deliveryDate('2026-07', 'fr'), 'juillet 2026', 'livraison fr');
eq(deliveryDate('2026-09', 'fr'), 'septembre 2026', 'livraison fr sept');
eq(deliveryDate('2026-07', 'en'), 'July 2026', 'livraison en');
eq(deliveryDate('2027-01', 'fr'), 'janvier 2027', 'livraison janvier (bascule année)');

// Fourchettes
eq(range(895, undefined, (v) => money(v, 'fr')), '895 $', 'min seul');
eq(range(618, 690, (v) => area(v, 'fr')), '618 pi² – 690 pi²', 'min et max');
eq(range(929, 929, (v) => area(v, 'fr')), '929 pi²', 'min = max, pas de doublon');
assert.equal(range(undefined, undefined, String), undefined, 'aucune valeur → undefined');
assert.equal(range(undefined, 690, String), undefined, 'max sans min → undefined');

// Ancres de municipalité — l'accueil et /projets doivent tomber sur la même
assert.equal(slugVille('Salaberry-de-Valleyfield'), 'salaberry-de-valleyfield', 'slug composé');
assert.equal(slugVille('Sainte-Martine'), 'sainte-martine', 'slug simple');
assert.equal(slugVille(' Huntingdon '), 'huntingdon', 'slug : espaces de fin ignorés');
assert.equal(slugVille('Trois-Rivières'), 'trois-rivieres', "slug : l'accent tombe");
assert.equal(slugVille('Saint-Jean sur Richelieu'), 'saint-jean-sur-richelieu', 'slug : espaces → tirets');

console.log('✓ format : 21 assertions passées');

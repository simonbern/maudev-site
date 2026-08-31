/**
 * Vérification du routage bilingue : `node src/i18n.check.ts`
 *
 * Le sélecteur de langue doit pointer vers la MÊME page dans l'autre langue,
 * jamais vers l'accueil. C'est la seule logique non triviale du shell.
 */
import assert from 'node:assert/strict';
import { translatePath, localeFromPath, isActive, localize } from './i18n.ts';

const eq = (a: string, b: string, msg: string) => assert.equal(a, b, msg);

// FR → EN
eq(translatePath('/', 'en'), '/en/', 'accueil');
eq(translatePath('/a-louer', 'en'), '/en/for-rent', 'liste à louer');
eq(translatePath('/projets', 'en'), '/en/projects', 'projets réalisés');
eq(translatePath('/projets-a-venir', 'en'), '/en/upcoming', 'projets à venir');
eq(translatePath('/notre-modele', 'en'), '/en/our-model', 'notre modèle');

// EN → FR
eq(translatePath('/en/', 'fr'), '/', 'accueil retour');
eq(translatePath('/en/for-rent', 'fr'), '/a-louer', 'liste retour');
eq(translatePath('/en/our-model', 'fr'), '/notre-modele', 'modèle retour');
eq(translatePath('/en/upcoming', 'fr'), '/projets-a-venir', 'à venir retour');

// Idempotence : traduire vers sa propre langue ne change rien.
eq(translatePath('/a-louer', 'fr'), '/a-louer', 'fr → fr');
eq(translatePath('/en/for-rent', 'en'), '/en/for-rent', 'en → en');

// Aller-retour
for (const p of ['/', '/a-louer', '/projets', '/projets-a-venir', '/notre-modele'])
  eq(translatePath(translatePath(p, 'en'), 'fr'), p, `aller-retour ${p}`);

// Routes dynamiques : le segment de projet vient de la collection.
eq(translatePath('/a-louer/hermine', 'en', 'hermine'), '/en/for-rent/hermine', 'projet FR→EN');
eq(translatePath('/en/for-rent/hermine', 'fr', 'hermine'), '/a-louer/hermine', 'projet EN→FR');
// Sans override, le segment est laissé tel quel — jamais perdu.
eq(translatePath('/a-louer/dalhousie', 'en'), '/en/for-rent/dalhousie', 'projet sans override');

// Confidentialité : segment ajouté avec le bandeau de témoins.
eq(translatePath('/confidentialite', 'en'), '/en/privacy', 'confidentialite → privacy');
eq(translatePath('/en/privacy', 'fr'), '/confidentialite', 'privacy → confidentialite');
eq(localize('/confidentialite', 'fr'), '/confidentialite', 'confidentialite en FR');
eq(localize('/confidentialite', 'en'), '/en/privacy', 'confidentialite en EN');

// Détection de langue
eq(localeFromPath('/'), 'fr', 'racine = fr');
eq(localeFromPath('/a-louer'), 'fr', 'fr sans préfixe');
eq(localeFromPath('/en'), 'en', '/en nu');
eq(localeFromPath('/en/for-rent'), 'en', 'en préfixé');
// Piège : un segment FR qui commence par « en » n'est pas de l'anglais.
eq(localeFromPath('/entrepot'), 'fr', 'faux positif /en');

// État actif
assert.ok(isActive('/', '/'), 'accueil actif');
assert.ok(isActive('/en/', '/'), 'accueil EN actif');
assert.ok(!isActive('/a-louer', '/'), 'accueil inactif ailleurs');
assert.ok(isActive('/a-louer/hermine', '/a-louer'), 'sous-page marque le parent');
assert.ok(isActive('/en/for-rent/hermine', '/a-louer'), 'idem en anglais');
assert.ok(!isActive('/projets', '/a-louer'), 'pas de faux positif');
// Piège : `/projets-a-venir` commence par `/projets` sans en être une sous-page.
assert.ok(!isActive('/projets-a-venir', '/projets'), "à venir n'est pas sous projets");
assert.ok(!isActive('/en/upcoming', '/projets'), 'idem en anglais');
assert.ok(isActive('/projets-a-venir', '/projets-a-venir'), 'à venir actif');

console.log('✓ i18n : 37 assertions passées');

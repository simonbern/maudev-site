// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { SWITZER_VARIABLE, SWITZER_STATIQUES, aFichier, switzerDispo } from './src/fonts.mjs';

/* ── Polices ───────────────────────────────────────────────────
   Switzer, servie depuis src/assets/fonts/ par le provider local : aucune
   requête tierce, et Astro génère les replis métriques.

   Le repli sur Figtree couvre la période où les fichiers ne sont pas encore
   déposés — sans lui, un dossier vide casse le build, donc impossible de
   travailler le reste du design. Voir src/assets/fonts/README.md.
   À supprimer une fois Switzer en place.

   Les noms de variables CSS vivent dans src/fonts.mjs, partagés avec
   Layout.astro : une famille configurée ici mais non rendue là-bas n'émet
   aucune variable, et la règle qui la consomme retombe sur son repli sans
   rien signaler.                                                             */
const variantes = aFichier(SWITZER_VARIABLE)
  ? [{ weight: '100 900', style: 'normal', src: [`./src/assets/fonts/${SWITZER_VARIABLE}`] }]
  : SWITZER_STATIQUES.filter((v) => aFichier(v.file)).map((v) => ({
      weight: v.weight,
      style: 'normal',
      src: [`./src/assets/fonts/${v.file}`],
    }));

const police = switzerDispo
  ? {
      provider: 'local',
      name: 'Switzer',
      cssVariable: '--font-switzer',
      variants: variantes,
      fallbacks: ['system-ui', 'sans-serif'],
    }
  : {
      /* Inter en attendant Switzer. Figtree, la précédente, a des terminaisons
         arrondies et un œil ouvert : sympathique, un peu tendre pour un
         promoteur qui parle rendement à des investisseurs. Inter est la
         grotesque neutre de référence — elle ne dit rien d'elle-même, ce qui
         est exactement ce qu'on lui demande à côté de la serif d'accent. */
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'], // latin-ext : œ, É, à, ç
      fallbacks: ['system-ui', 'sans-serif'],
    };

/* Serif d'accent, pour les mots mis en valeur dans les grands titres. Une
   seule famille grotesque donne une page honnête mais sans voix ; le contraste
   grotesque / serif est ce qui lui en donne une. Réservée aux accents : jamais
   un paragraphe entier.

   Spectral, DROITE, en 600. Trois polices l'ont précédée ici et se sont
   trompées de direction :

     Instrument Serif   n'existait qu'en 400, gras simulé au contour
     Cormorant Garamond un Garamond — délié, calligraphique, léger
     Playfair Display   une Didone — contraste extrême, registre « mode »

   Aucune n'était ce qui était demandé : une Times. Spectral est une serif de
   labeur aux proportions de Times — même charpente transitionnelle, même
   contraste modéré, mêmes empattements francs — mais dessinée pour l'écran et
   pourvue de neuf graisses là où Times n'en a que deux. C'est la Times qu'on
   utiliserait si Times avait été dessinée pour un site.

   **Droite, pas italique.** L'italique penchait le titre et l'éloignait
   davantage de la référence à chaque itération.

   Téléchargée à la construction puis auto-hébergée : aucune requête tierce à
   l'exécution.                                                              */
const serif = {
  provider: fontProviders.google(),
  name: 'Spectral',
  cssVariable: '--font-spectral',
  weights: [500, 600],
  styles: ['normal'],
  subsets: ['latin', 'latin-ext'],
  fallbacks: ['Times New Roman', 'Georgia', 'serif'],
};

console.info(
  switzerDispo
    ? `[polices] Switzer local — ${variantes.length} variante(s)`
    : '[polices] Switzer absente de src/assets/fonts/ — repli sur Inter (Google)',
);

// https://astro.build/config
export default defineConfig({
  // Nécessaire aux <link rel="alternate" hreflang> : sans `site`, Astro les
  // génère avec l'origine de dev (localhost:4321) et les fige dans le build.
  // Domaine repris du mirror de l'ancien site.
  site: 'https://www.mau-dev.ca',

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false, // `/` = FR, `/en/` = EN
    },
  },

  // Voir le bloc « Polices » en tête de fichier. La cssVariable produite est
  // consommée par --font-sans dans src/styles/global.css.
  fonts: [police, serif],

  vite: {
    plugins: [tailwindcss()],
  },
});

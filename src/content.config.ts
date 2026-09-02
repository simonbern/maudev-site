import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection « projets » — voir DESIGN.md § 7.
 *
 * Un fichier par projet, pas un par langue : ~80 % des données d'un projet
 * (adresse, unités, prix, photos) sont indépendantes de la langue. Seule la
 * prose est bilingue, via des objets { fr, en }.
 */

// Les deux langues sont requises : un projet à moitié traduit ne doit pas
// pouvoir être publié.
const bilingue = z.object({ fr: z.string(), en: z.string() });
const bilingueBloc = z.object({
  fr: z.array(z.string()).nonempty(),
  en: z.array(z.string()).nonempty(),
});

const projets = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projets' }),
  schema: ({ image }) =>
    z
      .object({
        // ── Identité ─────────────────────────────────────────────────────
        nom: z.string(),
        // Quatre états, trois destinations. Les deux premiers vont sur
        // `/a-louer` : dans les deux cas on peut louer aujourd'hui.
        //
        //   location     → /a-louer          on loue, les photos existent
        //   a-venir      → /a-louer          on loue, la livraison est à venir
        //                                     (badge « Bientôt »)
        //   construction → /projets-a-venir  annoncé, PAS encore en location :
        //                                     ni prix, ni plans, ni disponibilité
        //   realise      → /projets          livré
        //
        // `construction` a été ajouté le 2026-08-28 avec la page
        // `/projets-a-venir`. Il ne se confond pas avec `a-venir` : Dalhousie
        // est à venir **et** en location — il a une liste de prix et une page
        // de projet. Un chantier annoncé n'a ni l'un ni l'autre, et l'afficher
        // à côté de logements qu'on peut visiter promettrait ce qui n'existe
        // pas encore.
        //
        // La lecture de ces états passe par EN_LOCATION (src/i18n.ts) et non
        // par `!== 'realise'` : c'est cette négation, écrite à cinq endroits,
        // qui aurait fait tomber les chantiers dans `/a-louer` sans rien
        // casser au build.
        statut: z.enum(['location', 'a-venir', 'construction', 'realise']),
        ordre: z.number().default(0), // tri décroissant dans les listes
        url: bilingue, // segment d'URL par langue (« slug » est réservé par le glob loader)

        // ── Localisation ─────────────────────────────────────────────────
        // Optionnelle : le brief ne donne pas d'adresse civique pour tous les
        // projets, et on n'en invente pas. Le template l'omet si elle manque.
        adresse: z.string().optional(),
        ville: z.string(),
        // Marque une donnée non confirmée par le client. Le template peut
        // l'afficher normalement ; c'est un signal pour l'équipe, pas pour
        // le visiteur.
        aConfirmer: z.array(z.string()).default([]),

        // ── Chiffres ─────────────────────────────────────────────────────
        // Optionnelle : un immeuble commercial réalisé (47 Nicholson,
        // Pierre-Dansereau) n'a pas d'unités résidentielles. Rendue
        // obligatoire plus bas pour tout projet en location.
        unites: z.number().optional(),
        unitesLouees: z.number().optional(),
        etages: z.number().optional(),
        livraison: z.string().optional(), // « 2026-07 » — formaté par locale
        phase: bilingue.optional(),

        // ── Prose ────────────────────────────────────────────────────────
        resume: bilingue,
        description: bilingueBloc,
        // ponytail: tableaux de paragraphes plutôt que markdown. Les
        // descriptifs du client font 1 à 3 paragraphes de prose simple.
        // Passer au markdown (.md + <Content />) le jour où il faut des
        // listes ou du gras.

        // ── Logements ────────────────────────────────────────────────────
        // Par TYPE, pas par unité. Prix ET superficies sont des fourchettes :
        // un 4 ½ d'Hermine va de 798 à 1082 p.c. selon l'unité, et le client
        // ne fournit pas toujours de prix.
        logements: z
          .array(
            z.object({
              type: z.string(), // « 3 ½ », « 4 ½ », « 5 ½ »
              nombre: z.number().optional(), // combien d'unités de ce type
              prixMin: z.number().optional(), // $/mois — absent → « sur demande »
              prixMax: z.number().optional(),
              superficieMin: z.number().optional(), // p.c., balcon compris
              superficieMax: z.number().optional(),
              disponible: z.boolean().default(true),
              inclusions: bilingue.array().default([]),
              note: bilingue.optional(),
            }),
          )
          .default([]),

        // Faits libres, en paires étiquette/valeur. Les projets réalisés
        // décrivent des choses très hétérogènes — programme, nombre de
        // bâtiments, surface commerciale, locataire ancré, phases livrées.
        // Une paire générique évite d'ajouter un champ de schéma par cas.
        faits: z.array(z.object({ label: bilingue, valeur: bilingue })).default([]),

        // ── Inclusions et options du projet ──────────────────────────────
        inclusions: z
          .array(
            z.object({
              label: bilingue,
              icone: z.string(), // nom Lucide
              payant: z.boolean().default(false), // affiche le suffixe ($)
            }),
          )
          .default([]),
        options: z
          .array(z.object({ label: bilingue, prix: z.number().optional() }))
          .default([]),

        // ── Médias ───────────────────────────────────────────────────────
        // couverture est optionnelle ici, puis rendue obligatoire plus bas
        // pour tout projet déjà bâti (voir superRefine).
        couverture: z.object({ src: image(), alt: bilingue }).optional(),
        photos: z
          .array(
            z.object({
              src: image(),
              alt: bilingue,
              unite: z.string().optional(), // « 112 »
              // « commun » et « drone » ajoutées le 2026-09-02 : la
              // livraison NewInfo apporte les premières photos d'espaces
              // communs du site (palier d'ascenseur, stationnement
              // souterrain, tous deux au 110 Ste-Cécile) et une vue aérienne.
              // La catégorie était prévue « le jour où ces photos arrivent ».
              //
              // Rien ne la lit encore côté rendu — la galerie affiche les
              // photos dans l'ordre du YAML. C'est de la donnée juste en
              // attendant un filtre, pas un filtre déguisé.
              categorie: z
                .enum(['exterieur', 'interieur', 'detail', 'commun', 'drone'])
                .default('interieur'),
            }),
          )
          .default([]),
        // Même forme que `photos` : la galerie est le même composant.
        renders: z
          .array(z.object({ src: image(), alt: bilingue }))
          .default([]),
        plans: z
          .array(
            z.object({
              src: image(),
              type: z.string(),
              superficie: z.number().optional(), // valeur exacte de la fiche
              unites: z.array(z.string()).default([]),
              pdf: z.string().optional(),
            }),
          )
          .default([]),
        // Deux sources plutôt qu'une chaîne : le hero attache <source> en JS
        // et a besoin du type de chaque fichier. Chemins dans public/.
        video: z
          .object({
            webm: z.string().optional(),
            mp4: z.string().optional(),
            // Image de départ de la vidéo. À défaut, le hero retombe sur
            // `couverture` — mais un poster tiré de la première image évite
            // le saut visuel au moment où la lecture démarre.
            poster: image().optional(),
          })
          .optional(),
      })
      .superRefine((p, ctx) => {
        // Un projet en location doit montrer quelque chose : on ne loue pas
        // un logement sans photo. Les deux autres statuts peuvent s'en
        // passer, et le template affiche un gabarit à leur place :
        //
        // · « à venir »  — rien n'est encore bâti.
        // · « réalisé »   — le client n'a livré que des intérieurs pour
        //                 certains projets, et **une photo d'intérieur ne
        //                 sert jamais de couverture à une réalisation** : la
        //                 grille de `/projets` montre des bâtiments, pas des
        //                 salons. Mieux vaut un gabarit qu'un contresens.
        if (p.statut !== 'realise' && p.unites === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['unites'],
            message: 'unites est requis pour un projet en location ou à venir.',
          });
        }
        if (p.statut === 'location' && !p.couverture) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['couverture'],
            message: 'couverture est requise pour un projet en location.',
          });
        }
        for (const [i, l] of p.logements.entries()) {
          if (l.prixMax !== undefined && l.prixMin === undefined)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['logements', i, 'prixMin'],
              message: 'prixMax sans prixMin.',
            });
          if (l.prixMin !== undefined && l.prixMax !== undefined && l.prixMax < l.prixMin)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['logements', i, 'prixMax'],
              message: 'prixMax inférieur à prixMin.',
            });
          if (l.superficieMax !== undefined && l.superficieMin === undefined)
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['logements', i, 'superficieMin'],
              message: 'superficieMax sans superficieMin.',
            });
          if (
            l.superficieMin !== undefined &&
            l.superficieMax !== undefined &&
            l.superficieMax < l.superficieMin
          )
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['logements', i, 'superficieMax'],
              message: 'superficieMax inférieure à superficieMin.',
            });
        }
      }),
});

export const collections = { projets };

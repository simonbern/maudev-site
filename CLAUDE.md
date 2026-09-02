## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


# MauDev — Site promoteur immobilier

Remake complet du site de Mau-Dev, promoteur immobilier québécois. Le nouveau site part de zéro et ne doit ressembler en rien à l'ancien.

## Règles de contenu

- Ne jamais inventer de contenu : textes, prix, adresses, superficies, noms de projets. Tout vient de `reference/` ou du client.
- `reference/client-brief.md` — email du client : ses attentes et les infos sur ses projets. Source de vérité principale.
- `reference/assets/` — livraisons brutes du client, un dossier par projet. **Hors du dépôt** (2,2 Go) : présent sur le disque du développeur, absent d'un clone frais. Ce que le site utilise en est sorti réduit et vit dans `src/assets/projets/`. `reference/maudev-mark.svg` est le logo officiel, lui versionné.
- `reference/mirror/www.mau-dev.ca/` — mirror de l'ancien site. Sert uniquement à récupérer les infos existantes (textes, coordonnées, descriptions de projets). Ne jamais reprendre son design, sa structure ou ses styles. `reference/screenshots/` montre son rendu actuel, à titre informatif seulement.
- `reference/inspo/` — inspiration design uniquement, **hors du dépôt** (sites appartenant à des tiers). `landing-example.png` est la référence de layout pour la page d'accueil, `project-page-example.png` pour les pages de projet individuelles (HTML correspondant dans `landing-html/` et `project-html/`). S'inspirer du layout et de la structure, jamais du contenu ni du branding.
- `reference/assets-non-utilises/` — ce que le site n'utilise plus : anciens jeux de photos, plans non recadrés, rendus écartés. Hors du dépôt, gardé sur le disque au cas où.

## Médias du site

- **Un dossier par projet, nommé comme son adresse sur le site.**
  `mau-dev.ca/a-louer/hermine` ⇒ `src/assets/projets/hermine/`.
  Voir `src/assets/projets/README.md` pour la convention complète.
- `src/assets/marque/` — les images qui ne nomment aucun projet.
- `public/videos/<slug>/<slug>.mp4` — les vidéos. Astro optimise les images, pas les vidéos.
- Une image déposée sans être déclarée dans `src/content/projets/<projet>.yaml` n'apparaît nulle part.
- **Photos et rendus ne se mélangent jamais** : `photos/` montre ce qui existe, `renders/` ce qui est projeté. Présenter un rendu comme une photo serait une fausse représentation.
- Signaler toute vidéo trop lourde pour du web (poids et codec) ; ne rien réencoder sans demander.

## Règles de design

- Toutes les couleurs, typos et espacements viennent des tokens du thème Tailwind. Aucune valeur hex brute, aucune valeur arbitraire.
- Suivre DESIGN.md pour le système de design.
- Après avoir créé ou modifié une page, la screenshoter avec Playwright et vérifier le rendu avant de conclure.

## Langue

- Site bilingue FR/EN, français par défaut.
- Utiliser le routing i18n d'Astro : `/` = français, `/en/` = anglais.
- Chaque page créée doit exister dans les deux langues avant d'être considérée terminée.
- Traductions : reprendre les textes EN existants du mirror quand ils sont à jour, sinon traduire à partir du français. Ne pas mélanger les langues sur une même page.

## Structure du site

- `/` — Landing page. Hero vidéo prévu (le client fournira la vidéo plus tard, voir `reference/inspo/landing-example.png` pour le traitement voulu). Prévoir le placeholder et l'intégration dès maintenant.
- `/a-louer` — Liste des projets en cours. Un seul pour l'instant (Hermine), la page doit être conçue pour en accueillir d'autres sans refonte.
- `/a-louer/[projet]` — Page dédiée par projet en cours. Layout inspiré de `reference/inspo/project-page-example.png`.
- `/projets` — Projets réalisés (Delahousie et autres). Infos et photos récupérables du mirror de l'ancien site.
- `/projets/[projet]` — Page dédiée d'une réalisation, ajoutée le 2026-09-02. **Seulement pour celles qui ont de la matière** : photos, logements, plans ou rendus. Le prédicat est `realiseAvecFiche` dans `src/i18n.ts`, partagé par les deux routes et par la carte de la grille — les projets sans rien de plus que leur carte ne sont pas cliquables.
- `/notre-modele` — Même contenu que la page correspondante de l'ancien site.

Chaque page existe en FR et EN.
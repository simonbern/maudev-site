# Images des projets

**Un dossier par projet, nommé comme son adresse sur le site.**
`mau-dev.ca/a-louer/hermine` → `hermine/`.

```
<slug>/
  couverture.jpg      l'image de la carte, dans les listes
  video-poster.jpg    la première image de la vidéo du hero
  photos/             photos réelles du bâtiment livré
  plans/              plans d'unité, une image par fiche
  renders/            rendus 3D — jamais mélangés aux photos
```

Aucun sous-dossier n'est obligatoire. Un projet sans photos n'a pas de
`photos/` ; le site affiche alors son gabarit « Photos à venir ».

## Ajouter des images à un projet

1. Déposer les fichiers dans le bon sous-dossier.
2. Les déclarer dans `src/content/projets/<projet>.yaml` — chaque image a un
   chemin et une alternative textuelle en français et en anglais.

Une image déposée ici sans être déclarée dans le YAML n'apparaît nulle part :
c'est le fichier de contenu qui décide, pas le dossier.

## Photo ou rendu

`photos/` montre ce qui existe. `renders/` montre ce qui est projeté. Les deux
ne se mélangent pas et le site les titre différemment — présenter un rendu
comme une photo serait une fausse représentation.

## Ailleurs

- `src/assets/marque/` — les images qui ne nomment aucun projet : le hero de
  l'accueil, le rendu de `/notre-modele`, l'intérieur de la section « Une seule
  plateforme intégrée ».
- `public/videos/<slug>/<slug>.mp4` — les vidéos. Elles ne passent pas par
  `src/assets` : Astro optimise les images, pas les vidéos.
  Format attendu et recette d'encodage : `DESIGN.md` § 6.

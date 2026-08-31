# Dossier NEW — inventaire

Relevé de `src/assets/projets/NEW/` : **41 fichiers, 1,3 Go**. 39 images JPEG,
1 vidéo MP4, 1 PDF. Toutes les images ont été ouvertes une à une pour être
catégorisées ; les métadonnées vidéo viennent d'un parsing du conteneur MP4
(pas de ffprobe sur cette machine).

**Les originaux ne sont pas modifiés.** Ce qui suit décrit des copies.

Catégories : **extérieur** · **intérieur** · **drone** (vue aérienne, réelle ou
rendue) · **détail**.

---

## Vue d'ensemble

| Dossier | Fichiers | Poids | Projet visé | Câblé ? |
|---|---|---|---|---|
| `DALHOUSIE/` | 3 rendus + 1 vidéo | 1,2 Go | `delahousie.yaml` (à venir) | ✅ images |
| `HERMINE/` | 11 photos | 34 Mo | `hermine.yaml` (location) | ✅ |
| `RIDGE/` | 19 photos | 65 Mo | `2055-61-chemin-ridge.yaml` (réalisé) | ✅ couverture |
| `SAINTE-CÉCILE/` | 5 photos | 15 Mo | `110-ste-cecile.yaml` (réalisé) | ✅ couverture |
| `RIVIÈRE-BEAUDETTE/` | 1 photo + 1 PDF | 6 Mo | `riviere-beaudette.yaml` (à venir) | ✅ |

Tout est câblé. Dalhousie et Hermine (location) utilisent le jeu complet ;
Ridge et Sainte-Cécile n'en tirent qu'une **couverture**, faute de page détail
pour les projets réalisés ; Rivière-Beaudette a reçu sa propre fiche.

### Vidéos publiées

| Projet | Fichier | Poids | Format | Durée | Débit |
|---|---|---|---|---|---|
| Dalhousie | `public/videos/dalhousie/dalhousie.mp4` | 4,63 Mo | H.264 High, 1280×720, sans audio | 12,0 s | 3,2 Mb/s |
| Hermine | `public/videos/hermine/hermine.mp4` | 1,16 Mo | H.264 High, 1280×720, sans audio | 9,24 s | 1,0 Mb/s |

Les deux ont le `moov` en tête (lecture progressive OK) et sont sous la cible
de 5 Mo. Rien à réencoder.

**`hermine.mp4` a été coupée.** La livraison faisait 12,0 s et contenait deux
plans séparés à 9,24 s : une façade terminée, puis une vue aérienne où la
moitié du bâtiment est encore en panneaux isolants rubannés, avec nacelle,
pelle mécanique et filet de sécurité orange — un chantier en cours, sous un
hero qui annonce « Disponible / Livraison juillet 2026 / 20 sur 54 déjà
loués ». Sur décision du client, seul le premier plan est publié :

```
ffmpeg -i <original> -map 0:v:0 -frames:v 277 -c copy -movflags +faststart
```

Copie de flux — aucun réencodage, aucune perte de qualité. L'original 12 s est
conservé dans `reference/NEW/HERMINE/hermine-web-12s-original.mp4`.

---

## DALHOUSIE

Ce sont des **rendus 3D**, pas des photos : le projet n'est pas bâti. Ils
alimentent donc `renders` et non `photos`, et la page les titre « Rendus 3D ».

| Fichier d'origine | Dimensions | Poids | Catégorie | Contenu | Destination |
|---|---|---|---|---|---|
| `Scene 2.jpg` | 3840 × 2557 | 3,9 Mo | **drone** | Vue aérienne oblique de l'ensemble : 5 immeubles, stationnements, cour centrale avec module de jeux | `dalhousie/renders/dalhousie-aerien-01.jpg` (galerie) |
| `25-1120 RENDU 5 PHASES.jpg` | 3840 × 2557 | 3,9 Mo | **extérieur** | Vue 3/4 basse depuis la rue : brique rouge, revêtement clair, balcons, arbres | `dalhousie/renders/dalhousie-rue-01.jpg` → **couverture** |
| `25-1120 RENDU IMPLANTATION.jpg` | 3840 × 2557 | 4,3 Mo | **drone** | Plan d'implantation en 3D, vue verticale | `dalhousie/renders/dalhousie-implantation.jpg` |

*Le nom « 5 PHASES » ne correspond pas à ce que montre l'image (une vue de rue,
pas les 5 phases). Correspondance vérifiée à l'octet près, pas au nom de
fichier.*

**La couverture est la vue de rue, pas l'aérienne.** Sur `/a-louer`, les deux
cartes montrent alors un immeuble à hauteur d'œil ; la vue aérienne ressemblait
à une maquette au format vignette. Le hero de la page projet, lui, utilise le
poster de la vidéo.

> **Résolu.** La version web a été livrée : `public/videos/dalhousie/dalhousie.mp4`,
> **4,63 Mo · 1280 × 720 · 12,0 s · H.264 · 3,2 Mb/s · sans piste audio**, avec
> son `poster.jpg` (1280 × 720, 108 Ko). Soit **252 fois plus léger** que le
> master. Câblée sur `/a-louer/dalhousie` et vérifiée au navigateur. Le master
> reste dans `NEW/` et n'est pas publié.

### La vidéo — problème bloquant *(historique)*

`DALHOUSIE_prob4.mp4`

| | |
|---|---|
| **Poids** | **1 167 Mo** (1 224 141 657 octets) |
| Résolution | 3840 × 2160 (4K) |
| Durée | 28,7 s |
| Codecs | **H.264 (`avc1`) + AAC (`mp4a`)** |
| **Débit** | **341 Mb/s** |

**Inpubliable en l'état.** À 341 Mb/s c'est un master d'export, pas un fichier
web : un débit de diffusion normal pour du 1080p se situe entre 3 et 8 Mb/s,
soit **40 à 100 fois moins**. Chargée telle quelle, cette vidéo consommerait
tout le forfait mensuel de données d'un visiteur mobile en une visite.

Elle n'a donc **pas** été copiée dans `public/` — un dépôt Git n'est pas un
endroit pour 1,17 Go, et le déploiement échouerait.

**Je n'ai rien réencodé** (demande explicite). Ordres de grandeur pour la
version web à produire, à valider avant de lancer quoi que ce soit :

| Cible | Résolution | Débit | Poids pour 28,7 s |
|---|---|---|---|
| MP4 / H.264 | 1920 × 1080 | ~6 Mb/s | ≈ 21 Mo |
| WebM / VP9 | 1920 × 1080 | ~4 Mb/s | ≈ 14 Mo |

DESIGN.md § 6 demande « sous 3 Mo » pour le hero de la landing — atteignable
en 1280 × 720 et sans piste audio, la vidéo étant décorative et muette.

**Pour l'activer**, une fois les fichiers web disponibles : les déposer dans
`public/videos/dalhousie/` et décommenter le bloc `video:` dans
`src/content/projets/delahousie.yaml`. Rien d'autre à toucher — le hero
bascule tout seul (chemin vérifié, voir plus bas).

---

## HERMINE

11 photos, 3000 × 2000 (une à 2999 × 1999), 2,7 à 4,5 Mo. Quatre unités
photographiées : 112, 207, 209, 401.

| Fichier d'origine *(préfixe `…-102-rue-alphonse-desjardins-salaberry-de-valleyfield-`)* | Catégorie | Contenu | État | Destination |
|---|---|---|---|---|
| `112-…-1` | **extérieur** | Façade d'angle depuis la rue, ciel bleu | — | `photos/exterieur-rue-01.jpg` → **couverture** |
| `112-…-5` | intérieur | Salle à manger + séjour, mur de bois cannelé, thermopompe | meublé | `photos/112-sejour-01.jpg` |
| `112-…-6` | intérieur | Cuisine ouverte sur salle à manger, quartz | meublé | `photos/112-cuisine-02.jpg` |
| `112-…-10` | intérieur | Chambre, lit, miroir sur pied | meublé | `photos/112-chambre-01.jpg` |
| `112-…-3` | intérieur | Cuisine péninsule + lave-vaisselle vers séjour | vide | `photos/112-cuisine-01.jpg` |
| `401-…-1` | intérieur | Aire ouverte cuisine-séjour, 4ᵉ étage | vide | `photos/401-sejour-01.jpg` |
| `401-…-2` | intérieur | Salle de bain, bain et douche marbrée séparés, vanité bois | vide | `photos/401-salle-de-bain-01.jpg` |
| `209-…-1` | intérieur | Aire ouverte, porte-fenêtre, couloir des chambres | vide | `photos/209-sejour-01.jpg` |
| `209-…-2` | intérieur | Séjour ouvrant sur balcon | vide | `photos/209-sejour-02.jpg` |
| `209-…-6` | intérieur | Salle de bain, bain et douche séparés | vide | `photos/209-salle-de-bain-01.jpg` |
| `207-…-1` | intérieur | Cuisine + aire ouverte, fenêtres sur verdure | vide | `photos/207-sejour-01.jpg` |

**Ce jeu remplace l'ancien** dans la galerie : 3000 px au lieu de 2400,
4 unités au lieu d'une, et surtout **il apporte enfin une vraie vue
extérieure de rue**. L'ancien jeu (`photos/`, 23 fichiers) reste en place ;
ses prises meublées du 112 restent les plus abouties si l'on veut privilégier
la mise en scène.

**La façade n'est toujours pas terminée** : le pare-air DRYline reste visible
sur la partie haute et des cônes de chantier bordent le trottoir. C'est
néanmoins nettement mieux cadré que l'ancienne photo — l'immeuble se lit comme
un immeuble, pas comme un chantier. À remplacer dès que le client fournit une
façade finie.

---

## RIDGE — *catalogué, non câblé*

19 photos, 3000 × ~2003, 2,9 à 4,1 Mo. Trois unités : 201 (2055 chemin Ridge),
203 et 301 (2057). **Les 19 ont été ouvertes.**

| Catégorie | Nombre | Contenu |
|---|---|---|
| intérieur | **19** | Séjours, cuisines (comptoirs bruns et quartz blanc), chambres, salles de bain, une salle de lavage avec échangeur d'air |
| extérieur / drone / détail | **0** | — |

Unité 203 meublée (séjour, cuisine îlot, chambre), unités 201 et 301 vides.
Vues sur champs et lignes électriques — contexte rural assumé.

Correspond au projet **réalisé** `2055-61-chemin-ridge.yaml`, dont la
couverture actuelle vient du mirror (1387 × 847). Ces photos sont bien
meilleures. Hors périmètre pour l'instant.

## SAINTE-CÉCILE — *catalogué, non câblé*

5 photos, 3000 × 2000, 2,5 à 3,5 Mo. Unités 306, 401, 408.

| Fichier | Catégorie | Contenu |
|---|---|---|
| `306-…-2` | **espace commun** | **Stationnement intérieur** : dalles de béton, colonnes, lignage jaune, gicleurs |
| `401-…-2` | intérieur | Cuisine îlot quartz, armoires blanches et brunes, vide |
| `401-…-3` | intérieur | Salle de bain, bain + douche marbrée, robinetterie noire |
| `408-…-2` | intérieur | Séjour d'angle vide, **vue sur l'hôtel de ville et la rivière** |
| `408-…-3` | intérieur | Cuisine + séjour vides, comptoir foncé |

**`306-…-2` est la première photo d'espace commun de tout le projet.** La
catégorie `commun` avait été retirée de `photos[].categorie` faute d'images
(voir DESIGN.md § 5). Elle appartient à Sainte-Cécile, un projet réalisé — donc
elle ne débloque pas la section « espaces communs » d'Hermine, mais elle prouve
que ces photos existent chez le photographe.

## RIVIÈRE-BEAUDETTE — *catalogué, aucune fiche*

| Fichier | Dimensions | Catégorie | Contenu |
|---|---|---|---|
| `PS_25141_arriere.jpg` | 1200 × 675 | **extérieur** | Rendu 3D : deux immeubles blancs de 3 étages, arrière, sous-bois et lumière de fin de journée |
| `PS-24141_ILLUSTRATION 3D_VUE D_OISEAU.pdf` | → 1740 × 974 | **drone** | Rendu 3D en vue d'oiseau |

### Conversion du PDF

Le PDF ne contenait qu'**un seul flux `/DCTDecode`** — c'est-à-dire le JPEG
d'origine, intégré tel quel. Je l'ai extrait à l'octet près plutôt que de
rastériser la page : **aucune perte, aucune recompression, aucun outil externe**
(ni Ghostscript ni ImageMagick sur cette machine).

Résultat : `riviere-beaudette/renders/rb-vue-oiseau.jpg`, 1740 × 974, 1,94 Mo.

Les deux images sont rangées dans `src/assets/projets/1216-rue-principale/renders/`
mais **ne sont référencées nulle part** : aucune fiche de contenu n'existe pour
ce projet. Le brief en donne pourtant tout le détail (12 logements, livraison
1ᵉʳ mars 2027, prix unité par unité, plusieurs logements bord de l'eau).

---

## Ce qui a été fait

1. **Images copiées** dans `src/assets/projets/<slug>/` pour qu'Astro les
   optimise (WebP + `srcset` générés au build).
2. **Vidéos** : `public/videos/dalhousie/dalhousie.mp4` (version web livrée
   ensuite), câblée sur la page projet. Astro n'optimise pas la vidéo, d'où
   `public/` ; le poster, lui, vit dans `src/assets` pour être optimisé.
3. **Plans inchangés** : `plans/` reste la source des 19 fiches de
   logement d'Hermine. Le dossier NEW n'en contient aucun.
4. **Fiches mises à jour** : couverture d'Hermine passée de l'intérieur à
   l'extérieur de rue ; Dalhousie a enfin une couverture (rendu aérien) et
   deux rendus en galerie.
5. **Hero vidéo sur les pages projet** : `HeroVideo` est désormais partagé
   avec la landing. Vérifié au navigateur avec un fichier de test, puis
   retiré — source attachée en JS et lecture sur desktop ; **zéro requête
   réseau** sur mobile comme en `prefers-reduced-motion` ; aucun élément
   `<video>` émis quand un projet n'en a pas.

## À trancher

2. ~~**Ridge et Sainte-Cécile**~~ — **résolu** : les deux couvertures du mirror
   étaient fausses (Ridge montrait des maisons en rangée, Sainte-Cécile un rendu
   3D pour un projet livré depuis longtemps). Remplacées par une photo NEW.
   `ridge-203-sejour-01` sert aussi de hero à l'accueil (image de marque, aucun
   projet nommé) ; la carte Ridge prend `-02` pour éviter le doublon.
   Les 21 autres photos restent inutilisées : les projets réalisés n'ont pas de
   page détail. Ouvrir `/projets/[projet]` les rentabiliserait.
   **Couverture Hermine** : `exterieur-rue-01` a été retirée de la carte
   `/a-louer` — elle montre l'immeuble en chantier (pare-intempéries DRYline
   à nu, balcons non finis, cônes orange) sous un badge « Disponible ».
   Remplacée par `112-sejour-01`. Elle reste dans la galerie de la page projet :
   à retirer aussi, ou à remplacer quand le client fournira une vue de rue du
   bâti terminé.
3. ~~**Rivière-Beaudette**~~ — **résolu** : fiche créée. Statut `a-venir`
   (livraison mars 2027), donc le projet sort sur `/a-louer` avec un badge
   « Bientôt », **pas** sur `/projets`. À confirmer avec le client.
4. ~~**`NEW/` dans `src/`**~~ — **résolu** : déplacé dans `reference/NEW/` et
   ajouté au `.gitignore`. Vérifié : 0 fichier NEW dans `git status`.
5. ~~**Dernier plan de `hermine.mp4`**~~ — **résolu** : coupé en copie de flux
   (voir plus haut). Reste à signaler au client que le plan aérien écarté
   semble dater d'une saison antérieure ; un drone récent du site terminé
   serait un meilleur hero.
6. **Couvertures encore issues du mirror** sur les autres fiches réalisées
   (145 Salaberry, Pierre-Paul Messier…) : ce sont des rendus 3D, pas des
   photos du bâti. À remplacer si le client fournit des photos.

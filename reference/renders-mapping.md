# « Renders » Hermine — relevé

Relevé visuel des 12 fichiers de `src/assets/projets/hermine/renders/`.

## Conclusion : il n'y a aucun render 3D

Les 12 fichiers sont des **dessins techniques 2D** extraits du même PDF que
`plans/`. Aucune image de synthèse, aucune perspective, aucun point de vue
photoréaliste. Le nom du dossier est trompeur.

La numérotation le confirme : `img-00N-0MM` = page N du PDF, image M. Les
fichiers `img-002` à `img-008` correspondent exactement aux pages 2 à 8 de
`plans/`, **sans l'habillage Chester** (pas de logo, pas de pastilles vertes,
pas de bandeau de titre).

C'est cohérent avec le courriel du client, où les seules images 3D annoncées
concernent **Rivière-Beaudette** (« on a que deux photos 3D pour le moment »),
pas Hermine.

## Correspondance

| Fichier | Dimensions | Ratio | Poids | Catégorie | Contenu | Équivaut à |
|---|---|---|---|---|---|---|
| `img-002-000.jpg` | 1998 × 729 | 2.74 | 103 Ko | **plan détaillé** | Implantation, en couleur (pelouse, haies, stationnement extérieur) | `plans/page-02` |
| `img-003-001.jpg` | 1613 × 547 | 2.95 | 102 Ko | **plan détaillé** | Sous-sol, stationnement intérieur, N&B | `plans/page-03` |
| `img-004-002.jpg` | 1537 × 554 | 2.77 | 187 Ko | **plan détaillé** | 1ᵉʳ étage, cloisons + mobilier + appareils | `plans/page-04` |
| `img-005-003.jpg` | 1502 × 489 | 3.07 | 171 Ko | **plan détaillé** | 2ᵉ étage, cloisons + mobilier | `plans/page-05` |
| `img-006-004.jpg` | 1497 × 493 | 3.04 | 177 Ko | **plan détaillé** | 3ᵉ étage, cloisons + mobilier | `plans/page-06` |
| `img-007-005.jpg` | 1456 × 494 | 2.95 | 168 Ko | **plan détaillé** | 4ᵉ étage, cloisons + mobilier | `plans/page-07` |
| `img-008-006.jpg` | 1251 × 994 | 1.26 | 171 Ko | **autre** — élévation | Latérale gauche, en couleur (brique, clin, balcons) | `plans/page-08` |
| `img-008-007.jpg` | 1285 × 861 | 1.49 | 134 Ko | **autre** — élévation | Latérale droite, en couleur, porte de garage visible | `plans/page-08` |
| `img-008-008.jpg` | 2066 × 463 | 4.46 | 155 Ko | **autre** — élévation | Façade avant, en couleur | `plans/page-08` |
| `img-008-009.jpg` | 2066 × 437 | 4.73 | 150 Ko | **autre** — élévation | Façade arrière, en couleur | `plans/page-08` |
| `img-009-025.jpg` | 1541 × 560 | 2.75 | 96 Ko | **plan détaillé** | Plan de repérage, cloisons seules, **avec la rampe** → 1ᵉʳ étage | fond des fiches p. 9-27 |
| `img-009-026.jpg` | 1496 × 494 | 3.03 | 80 Ko | **plan détaillé** | Plan de repérage, cloisons seules, sans rampe → étages 2 à 4 | fond des fiches p. 9-27 |

**Répartition** — render 3D : **0** · plan détaillé : **8** · autre (élévations) : **4**

## Ce que ça change

**1. La solution de repli pour la couverture n'existe pas.**
`photos-mapping.md` proposait, à défaut de photo de façade terminée, « utiliser
un render extérieur en couverture ». Il n'y a pas de render. Il ne reste que
deux options : réclamer des photos de façade finie au client, ou prendre un
intérieur en couverture.

Les quatre élévations en couleur sont ce qui s'en rapproche le plus : elles
montrent le bâtiment fini, brique et clin, proprement dessiné. Mais une
élévation reste un dessin technique — mise en couverture d'une carte de projet,
elle dit « chantier » autant que la photo actuelle. Et les deux façades
principales sont en 4.46:1 et 4.73:1, inutilisables dans un cadre `aspect-[4/3]`
sans recadrage destructeur. Seules les deux élévations latérales (1.26 et 1.49)
ont un ratio exploitable, et ce sont les faces les moins intéressantes.

**2. Le champ `renders[]` du schéma est vide.**
DESIGN.md prévoit `renders: z.array(...)` pour Hermine. Aucune donnée ne
l'alimente. À laisser en place — Rivière-Beaudette en a, lui — mais la page
Hermine ne doit pas supposer son existence.

**3. Bonne nouvelle : les pages 2 à 8 existent sans la marque Chester.**
C'est une réponse partielle au point 1 de `plans-mapping.md`. Implantation,
sous-sol, plans d'étage et élévations peuvent être publiés sans logo tiers, en
utilisant ces fichiers-ci plutôt que ceux de `plans/`.

Deux réserves : les versions Chester portent le **bandeau de titre** (« Plan du
2ᵉ étage ») et les **pastilles vertes** avec numéro d'unité, type et superficie —
c'est-à-dire toute l'information utile au locataire. Les versions brutes sont
muettes. Et surtout, **les 19 fiches de logement (pages 9 à 27) n'ont pas
d'équivalent non brandé** : ce sont justement celles qui comptent pour la
galerie de plans.

**4. L'extraction du PDF est incomplète.**
La séquence saute de `img-008-009` à `img-009-025` : les images 010 à 024
manquent. Ce sont vraisemblablement les plans de repérage des fiches de
logement. Sans conséquence — les fiches complètes sont dans `plans/` — mais
si quelqu'un cherche « les images manquantes », elles ne se sont pas perdues
côté site.

**5. Résolution faible pour de l'impression ou du zoom.**
Le plus grand fichier fait 2066 px de large, contre 1650 × 1275 pour les pages
de `plans/`. Pour une visionneuse en plein écran, `plans/` est la meilleure
source. Ces fichiers-ci ne servent que si l'absence de marque Chester prime.

## Recommandation

Renommer le dossier — `renders/` décrit un contenu qui n'existe pas et
induira en erreur la prochaine personne qui l'ouvrira :

```
src/assets/projets/hermine/renders/  →  src/assets/projets/hermine/plans-bruts/
```

Puis, si ces fichiers sont conservés :

```
img-002-000 → hermine-implantation-brut.jpg
img-003-001 → hermine-sous-sol-brut.jpg
img-004-002 → hermine-etage-1-brut.jpg        (… 2, 3, 4)
img-008-006 → hermine-elevation-laterale-gauche.jpg
img-008-007 → hermine-elevation-laterale-droite.jpg
img-008-008 → hermine-elevation-avant.jpg
img-008-009 → hermine-elevation-arriere.jpg
img-009-025 → hermine-reperage-etage-1.jpg
img-009-026 → hermine-reperage-etages-2-4.jpg
```

Les quatre élévations méritent d'être gardées quoi qu'il arrive : ce sont les
seules images qui montrent l'immeuble terminé.

## À demander au client

Cette liste s'ajoute à celle de `photos-mapping.md`, et la rend plus urgente :
sans render ni photo de façade finie, **aucune image ne montre l'immeuble
achevé en conditions réelles**. C'est le point bloquant de la page Hermine.

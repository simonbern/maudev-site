# Plans du 116 Saint-Jean-Baptiste

Source : `reference/assets/ST JEAN BAPTISTE/Cahier de location_116 Saint-Jean-Baptiste (1).pdf`
— cahier Chester, 27 pages paysage (792 × 612 pt), livré le 2026-08-27.
Le dossier est gitignoré ; seul le rendu l'est pas.

## Ce qui a été fait

Rendu à **150 dpi** (1 650 × 1 275 px), même échelle que le cahier d'Hermine,
vers `src/assets/projets/saint-jean-baptiste/plans/`.

**Le logo Chester est effacé** sur les 19 fiches d'unité — boîte de
x 76–481, y 76–147 px, peinte en blanc au rendu. Même gabarit, même boîte que
chez Hermine, et pour la même raison : publier une marque tierce sur chaque
plan agrandi du site de MauDev n'irait pas. Un rognage rectangulaire reste
impossible — la boîte du logo est à la même hauteur que le titre « 4 ½ » du
panneau vert, qu'un rognage du haut emporterait.

Le pourtour de la boîte est blanc dans le PDF : vérifié avant de peindre, et
vérifié après sur `page-09` — le mur dessiné juste sous la boîte est intact.

## Ce qui est publié

Les **19 fiches d'unité**, pages 9 à 27, dans `plans[]`. Triées par type puis
par superficie croissante.

| Type | Fiches | Unités | Superficie totale |
|---|---|---|---|
| 3 ½ | 10 | 16 | 626 – 876 p.c. |
| 4 ½ | 6 | 13 | 888 – 970 p.c. |
| 6 ½ | 3 | 3 | 1 545 – 1 680 p.c. |

**Les deux sources se recoupent** : 16 + 13 + 3 = 32, exactement le nombre
d'unités que le brief client annonce. Et le brief dit « environ 1 600 pi² »
pour le 6 ½ ; les plans donnent 1 545 à 1 680, ce qui l'encadre.

Les superficies retenues sont les **totales**, balcon compris, comme sur les
fiches — pas la seule superficie de l'unité.

## Ce qui ne l'est pas

Rendu et gardé sur disque, mais absent de `plans[]` :

| Page | Contenu | Pourquoi |
|---|---|---|
| 1 | Couverture Chester | 100 % marque tierce, aucun contenu de projet |
| 2 | Implantation | Pas un plan de logement |
| 3 | Sous-sol (stationnement) | idem |
| 4–7 | Étages 1 à 4 | idem |
| 8 | Élévations | idem |

Le schéma n'a qu'un tableau `plans[]`, sans distinction entre plan d'unité et
plan d'ensemble. Ces sept pages mériteraient leur propre traitement — même
constat que pour Hermine, même report.

## Refaire le rendu

`pymupdf` (installé pour l'occasion, pas une dépendance du site) :

```python
import pymupdf
LOGO = pymupdf.Rect(34, 34, 235, 74)      # points ; 150 dpi = 2,0833 px/pt
d = pymupdf.open(SRC)
for i in range(1, d.page_count):          # la page 1 est écartée
    p = d[i]
    if i >= 8:                            # les fiches d'unité portent le logo
        p.draw_rect(LOGO, color=(1, 1, 1), fill=(1, 1, 1), width=0)
    p.get_pixmap(dpi=150).save(f'page-{i+1:02d}.png')
```

Peindre dans le PDF plutôt que dans le PNG : le rectangle est posé en
coordonnées de page, donc il suit si un jour on change la résolution.

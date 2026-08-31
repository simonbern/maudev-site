# Plans Hermine — correspondance fichier → type de logement

Relevé visuel des 27 pages de `src/assets/projets/hermine/plans/`. Rien n'est
câblé : ce fichier sert à préparer le champ `plans[].type` du schéma et le
renommage des fichiers.

Les pages 9 à 27 portent le type imprimé en très gros caractères et la liste
des unités concernées — aucune interprétation nécessaire, d'où la confiance
« certaine ». Les pages 1 à 8 ne sont pas des plans de logement.

## Le document

Ce n'est pas un simple export de plans : c'est le **cahier de vente Chester du
projet Hermine**, complet et cohérent. Couverture, implantation, stationnement,
4 plans d'étage, élévations, puis 19 fiches de logement.

## Correspondance

| Fichier | Type lu | Unités | Superficie totale | Confiance |
|---|---|---|---|---|
| `page-01.png` | — *(couverture Chester)* | — | — | certaine |
| `page-02.png` | — *(plan d'implantation)* | 54 unités, 4 étages | — | certaine |
| `page-03.png` | — *(sous-sol, stationnement)* | 41 espaces | — | certaine |
| `page-04.png` | *(plan du 1ᵉʳ étage)* | 101 → 113 (13 unités) | — | certaine |
| `page-05.png` | *(plan du 2ᵉ étage)* | 201 → 214 (14 unités) | — | certaine |
| `page-06.png` | *(plan du 3ᵉ étage)* | 301 → 314 (14 unités) | — | certaine |
| `page-07.png` | *(plan du 4ᵉ étage)* | 401 → 413 (13 unités) | — | certaine |
| `page-08.png` | — *(élévations 4 faces)* | — | — | certaine |
| `page-09.png` | **4 ½** | 101, 201, 301, 401 | 1040 p.c. *(961 + 79 balcon)* | certaine |
| `page-10.png` | **3 ½** | 102, 202, 302, 402 | 682 p.c. *(619 + 63)* | certaine |
| `page-11.png` | **4 ½** | 103-105, 203-205, 303-305, 403-405 | 929 p.c. *(860 + 69)* | certaine |
| `page-12.png` | **3 ½** | 106 | 690 p.c. *(621 + 69)* | certaine |
| `page-13.png` | **4 ½** | 206 | 798 p.c. *(729 + 69)* | certaine |
| `page-14.png` | **4 ½** | 306, 406 | 820 p.c. *(751 + 69)* | certaine |
| `page-15.png` | **4 ½** | 107 | 940 p.c. *(870 + 70)* | certaine |
| `page-16.png` | **4 ½** | 207, 307, 407 | 940 p.c. *(870 + 70)* | certaine |
| `page-17.png` | **5 ½** | 108, 208, 308, 408 | 1227 p.c. *(1158 + 69)* | certaine |
| `page-18.png` | **5 ½** | 109, 209, 309, 409 | 1084 p.c. *(1015 + 69)* | certaine |
| `page-19.png` | **3 ½** | 110, 210, 310, 410 | 634 p.c. *(565 + 69)* | certaine |
| `page-20.png` | **4 ½** | 111 | 929 p.c. *(860 + 69)* | certaine |
| `page-21.png` | **5 ½** | 112 | 1242 p.c. *(1178 + 64)* | certaine |
| `page-22.png` | **4 ½** | 211, 311, 411, 212, 312, 412 | 929 p.c. *(860 + 69)* | certaine |
| `page-23.png` | **3 ½** | 213 | 618 p.c. *(503 + 115)* | certaine |
| `page-24.png` | **3 ½** | 313 | 645 p.c. *(530 + 115)* | certaine |
| `page-25.png` | **4 ½** | 113 | 1082 p.c. *(982 + 100)* | certaine |
| `page-26.png` | **4 ½** | 214, 314 | 1082 p.c. *(982 + 100)* | certaine |
| `page-27.png` | **5 ½** | 413 | 1515 p.c. *(1399 + 116)* | certaine |

## Vérification

Les 19 fiches couvrent **exactement les 54 unités, chacune une seule fois** :
4 + 4 + 12 + 1 + 1 + 2 + 1 + 3 + 4 + 4 + 4 + 1 + 1 + 6 + 1 + 1 + 1 + 2 + 1 = 54.

Chaque superficie de fiche correspond à celle inscrite sur le plan d'étage
(#413 = 1515 p.c. sur la fiche comme sur le plan du 4ᵉ). Aucune contradiction
dans l'ensemble du document.

## Ce que ça donne pour le schéma

**Répartition réelle du bâtiment**

| Type | Unités | Superficies |
|---|---|---|
| 3 ½ | 11 | 618 – 690 p.c. |
| 4 ½ | 33 | 798 – 1082 p.c. |
| 5 ½ | 10 | 1084 – 1515 p.c. |

Le champ `superficie` de `logements[]` doit donc être une **fourchette**, pas
une valeur unique — un 4 ½ va du simple au +35 % selon l'unité. *Fait :
`superficieMin` / `superficieMax` dans `src/content.config.ts`, avec la même
règle de cohérence que les prix.*

**Les 19 fiches sont directement publiables** : une fiche = un plan avec son
type, sa superficie et ses unités. C'est exactement ce qu'attend `plans[]`.

## Renommage proposé

Les fiches sont uniques par (type, superficie), sauf `page-15`/`page-16` (mêmes
940 p.c. mais unités différentes) et `page-25`/`page-26` (mêmes 1082 p.c.).
D'où un suffixe d'unité :

```
page-09 → hermine-plan-4-5-1040.png
page-10 → hermine-plan-3-5-682.png
page-11 → hermine-plan-4-5-929.png
page-12 → hermine-plan-3-5-690.png
page-13 → hermine-plan-4-5-798.png
page-14 → hermine-plan-4-5-820.png
page-15 → hermine-plan-4-5-940-107.png
page-16 → hermine-plan-4-5-940-207.png
page-17 → hermine-plan-5-5-1227.png
page-18 → hermine-plan-5-5-1084.png
page-19 → hermine-plan-3-5-634.png
page-20 → hermine-plan-4-5-929-111.png
page-21 → hermine-plan-5-5-1242.png
page-22 → hermine-plan-4-5-929-211.png
page-23 → hermine-plan-3-5-618.png
page-24 → hermine-plan-3-5-645.png
page-25 → hermine-plan-4-5-1082-113.png
page-26 → hermine-plan-4-5-1082-214.png
page-27 → hermine-plan-5-5-1515.png

page-02 → hermine-implantation.png
page-03 → hermine-sous-sol.png
page-04 → hermine-etage-1.png     (… 2, 3, 4)
page-08 → hermine-elevations.png
page-01 → à écarter (couverture de marque Chester)
```

## Points à trancher

**1. La marque Chester est sur tous les plans.** — *traité*

Le logo (x 76–481, y 76–147 sur les 19 fiches) a été effacé dans
`src/assets/projets/hermine/plans/`. Les originaux de `plans/` ne sont
pas touchés. Note : un recadrage rectangulaire était impossible — la boîte du
logo est à la même hauteur que le titre « 4 ½ » du panneau vert, qu'un rognage
du haut aurait emporté. La zone est donc peinte en blanc, après vérification
que son pourtour l'est déjà. La page 1 (couverture 100 % Chester) est écartée,
les pages 2 à 8 n'ont jamais porté de logo et sont copiées telles quelles.

Historique de la décision :
Le logo et le nom Chester apparaissent sur les 19 fiches et sur la couverture.
Les publier tels quels met une marque tierce sur le site de MauDev. Trois
options : les garder tels quels (le plus simple, mais Chester est visible sur
chaque plan agrandi), demander à Chester des exports sans logo, ou recadrer.
À valider avec le client — c'est une décision de marque, pas technique.

**2. La page 1 est une couverture, pas un plan.**
À écarter de la galerie : elle n'apporte rien et affiche le logo Chester en
plein cadre.

**3. Les pages 2, 3 et 8 ne sont pas des plans de logement.**
Implantation, stationnement et élévations méritent leur propre traitement —
utiles, mais pas dans la même grille que les plans d'unité. Le schéma n'a
aujourd'hui qu'un tableau `plans[]`, sans distinction.

**4. Incohérence mineure sur les élévations (page-08).**
L'élévation avant étiquette une unité **414** à l'angle gauche du 4ᵉ étage,
alors que le plan du 4ᵉ (page-07) donne **413** (5 ½, 1515 p.c.) à cet
emplacement — le grand logement y absorbe ce qui est 213/313 aux étages
inférieurs. Les élévations semblent dater d'une révision antérieure. Sans
conséquence pour le site, mais à ne pas recopier.

**5. L'adresse ne concorde pas avec le courriel du client.**
La couverture (page-01) indique **102 rue Alphonse-Desjardins**, ce que confirme
le descriptif du client. Mais l'introduction de son courriel écrit
**110 Alphonse-Desjardins**.

*Élément nouveau, en faveur du 102 :* le mirror de l'ancien site contient
**deux projets distincts**, `fr/projects/110-alphonse-desjardins` et
`fr/projects/19-hermine`. Le « 110 » est donc une réalisation antérieure et
séparée — le courriel confond vraisemblablement les deux. Le plan
d'implantation (page-02) montre d'ailleurs que le terrain borde la **rue
Hermine**, ce qui explique le nom du projet.

Trois sources sur quatre disent 102. C'est la valeur retenue dans
`src/content/projets/hermine.yaml`, marquée `aConfirmer: [adresse]`. À valider
avec le client avant mise en ligne — c'est l'adresse d'un immeuble à louer.

**6. Donnée non exploitée : 41 stationnements pour 54 unités.**
La page 3 le montre noir sur blanc. Le stationnement intérieur est une option
payante ($) et il n'y en a pas pour tout le monde. Information utile au
locataire, absente du descriptif du client.

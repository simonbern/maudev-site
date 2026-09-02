# Dossier NewInfo — cahiers de location et photos Facebook

Deuxième livraison du client (courriel d'Alex, 2026-09-02, repris en fin de
`client-brief.md`) : **5 cahiers de location en PDF** et **18 photos** pour les
trois projets réalisés que le premier courriel n'avait presque pas décrits.

**Les originaux ne sont pas modifiés.** Ce qui suit décrit des copies.

Contrairement à `reference/NEW/` (1,3 Go, hors dépôt), ce dossier fait 25 Mo et
reste **versionné** : les cahiers sont la seule source des superficies, et un
clone frais doit les avoir.

---

## Vue d'ensemble

| Fichier | Projet | Câblé ? |
|---|---|---|
| `Rue Ridge - 12 unités.pdf` | Ridge 1 — 2055 chemin Ridge | données relevées, plans non câblés |
| `2057 rue Ridge.pdf` | Ridge 2 — 2057 chemin Ridge | idem |
| `Ridge 3.pdf` | Ridge 3 — 2059 chemin Ridge *(= Ridge 4, 2061)* | idem |
| `Projet Henderson.pdf` | 4A-B Henderson | idem |
| `106 rue Sainte-Cécile.pdf` | 110 Ste-Cécile *(voir § Adresse)* | idem |
| `Photos Ridge/` (6) | `2055-61-chemin-ridge.yaml` | ✅ couverture |
| `Photos Henderson/` (3) | `4a-b-henderson.yaml` | ✅ couverture *(remplacée)* |
| `Photos Ste-Cecile/` (9) | `110-ste-cecile.yaml` | ✅ couverture |

Les 18 photos ont été ouvertes une à une. Les 5 PDF ont été dépouillés au
texte (`pdftotext -layout`) — il n'y a **pas de rendu PDF sur cette machine**
(ni poppler-utils complet, ni Ghostscript, ni ImageMagick), donc les pages de
plans ne sont pas encore converties en images.

### Provenance des photos — à trancher avant mise en ligne

Le client écrit : « elles viennent du facebook de Chester **sans leur
permission** FYI ». Ce sont des photos professionnelles appartenant à un tiers.
Les publier sur le site de MauDev sans accord écrit est un risque de droit
d'auteur, pas une question technique. Les couvertures sont câblées parce
qu'elles remplacent des gabarits ou des contresens ; **l'accord de Chester
reste à obtenir**, exactement comme pour le logo Chester sur les plans Hermine
(`plans-mapping.md` § 1).

---

## Ce que les cahiers confirment

Tous les chiffres déjà publiés tiennent. Aucune correction à faire.

| Projet | YAML annonce | Cahiers donnent |
|---|---|---|
| Ridge | 4 bâtiments, 42 logements, 6 commerces | 12 + 10 + 10 + 10 = **42** · 0 + 2 + 2 + 2 = **6** ✅ |
| Henderson | 2 bâtiments, 32 unités | 16 + 16 = **32** ✅ |
| Ste-Cécile | 1 bâtiment, 24 logements, 2 locaux | 8 × 3 étages = **24** · suites A et B = **2** ✅ |

---

## RIDGE — trois cahiers, quatre bâtiments

Le client : « Ridge phase 3 et 4 sont identiques ». D'où trois cahiers pour
quatre adresses. Tous les immeubles font 3 étages.

### Ridge 1 — 2055 chemin Ridge · 12 logements, aucun commerce

RDC habité (pas de commerce), 12 stationnements couverts (R-01 → R-12) et
21 extérieurs.

| Unités | Type | Unité | Balcon | Total |
|---|---|---|---|---|
| 101 *(Type A)* | 4 ½ | 981 p.c. | 146 | 1 127 |
| 102 *(B)* | 3 ½ | 701 | 141 | 842 |
| 103 *(C)* | 3 ½ | 701 | 144 | 845 |
| 104 *(D)* | 4 ½ | 980 | 143 | 1 123 |
| 201 · 301 *(E)* | 4 ½ | 979 | 90 | 1 069 |
| 202 · 302 *(F)* | 4 ½ | 977 | 94 | 1 071 |
| 203 · 303 *(G)* | 4 ½ | 960 | 60 | 1 020 |
| 204 · 304 *(H)* | 4 ½ | 920 | 50 | 970 |

**Répartition : 2 × 3 ½, 10 × 4 ½.**

### Ridge 2 — 2057 chemin Ridge · 10 logements + 2 commerces

RDC : commerces **#101 et #102, 748 p.c. chacun**, façade sur le chemin Ridge ;
puis deux logements. 22 stationnements couverts (R-01 → R-22), 25 extérieurs.
L'implantation montre que le terrain donne aussi sur la **rue Dalhousie**.

| Unités | Type | Unité | Balcon | Total |
|---|---|---|---|---|
| 103 *(Type C)* | 3 ½ | 770 p.c. | 144 | 914 |
| 104 *(D)* | 4 ½ | 1 002 | 143 | 1 145 |
| 201 · 301 *(E)* | 4 ½ | 979 | 90 | 1 069 |
| 202 · 302 *(F)* | 4 ½ | 977 | 94 | 1 071 |
| 203 · 303 *(G)* | 4 ½ | 977 | 60 | 1 037 |
| 204 · 304 *(H)* | 4 ½ | 980 | 50 | 1 030 |

**Répartition : 1 × 3 ½, 9 × 4 ½.**

### Ridge 3 et 4 — 2059 et 2061 chemin Ridge · 10 logements + 2 commerces chacun

Un seul cahier pour les deux, sur consigne du client. Programme différent de
Ridge 2 malgré le même décompte : le RDC porte deux **5 ½** au lieu d'un 3 ½ et
d'un 4 ½.

| Unités | Type | Unité | Balcon | Total |
|---|---|---|---|---|
| 101 · 102 | commerce | 747 p.c. | — | — |
| 103 · 104 | **5 ½** | 1 147 | 135 | 1 282 |
| 201 → 204 · 301 → 304 | 4 ½ | 899 | 78 | 977 |

**Répartition : 2 × 5 ½, 8 × 4 ½** par immeuble.

### Ce que ça change pour le descriptif du client

Le courriel disait « quelques 3 ½ et 5 ½ […] majoritairement des 4 ½ ». Les
cahiers le précisent : **3 × 3 ½, 4 × 5 ½, 35 × 4 ½** sur les quatre immeubles,
soit 42 logements. Les 3 ½ sont tous dans Ridge 1 et 2, les 5 ½ tous dans
Ridge 3 et 4, et jamais ailleurs qu'au rez-de-chaussée.

### Photos Ridge — 6 fichiers

| Fichier *(préfixe)* | Catégorie | Contenu |
|---|---|---|
| `481661135_…` | **extérieur** | **Façade du 2057**, de face, numéro civique lisible, brique au RDC, vitrines commerciales. → **couverture** |
| `481655106_…` | intérieur | Aire ouverte vide, cuisine îlot blanche, vue sur champs enneigés |
| `481777242_…` | intérieur | Même aire ouverte, meublée (canapé, tabourets, coin repas) |
| `481804735_…` | intérieur | Séjour meublé vers la cuisine, thermopompe murale visible |
| `481922035_…` | intérieur | Chambre vide, fenêtre sur champs et lignes électriques |
| `482318071_…` | intérieur | Coin repas meublé, porte-balcon, fauteuil |

Les cinq intérieurs recoupent la livraison `reference/NEW/RIDGE/` déjà
cataloguée (unités 201, 203, 301 — même séance, contexte rural assumé). La
façade, elle, est nouvelle : c'est la première photo d'extérieur du projet.

---

## HENDERSON — 4A et 4B, deux bâtiments identiques

« Henderson les deux bâtiments aussi » — un seul cahier pour les deux.

**16 unités par bâtiment, 4 niveaux : sous-sol, RDC, 2e, 3e.** Quatre logements
par niveau. Le sous-sol est habité, ce qui explique les fenêtres basses sur la
façade. Implantation sur la **rue Du Centre**, une cinquantaine de cases.

**Toutes les unités sont des 5 ½** — le seul projet du portefeuille dans ce cas.

| Unités | Type | Unité | Balcon | Total |
|---|---|---|---|---|
| 01 · 101 · 201 · 301 | 5 ½ | 1 090 p.c. | 60 | 1 150 |
| 02 · 102 · 202 · 302 | 5 ½ | 1 090 | 60 | 1 150 |
| 03 · 103 · 203 · 303 | 5 ½ | 1 100 | 53 | 1 153 |
| 04 · 104 · 204 · 304 | 5 ½ | 1 100 | 53 | 1 153 |

Trois chambres, salle de lavage privative et balcon dans chaque unité.

*Coquille dans le cahier :* le plan du 2e étage écrit `#2012` et empile
`1 150` sur `1 153` à cet emplacement. Le plan du 3e et les fiches donnent
`#202`, 1 150 p.c. Ne pas recopier.

### Photos Henderson — 3 fichiers

| Fichier *(préfixe)* | Catégorie | Contenu |
|---|---|---|
| `538300388_…` | **extérieur** | **Façade terminée**, de face, plein soleil, stationnement lignné. Portrait 1024 × 1227. → **couverture**, recadrée en 3:2 |
| `540539296_…` | intérieur | Cuisine îlot quartz, armoires blanches et bois, vide |
| `539581494_…` | intérieur | Salle de bain, douche vitrée marbrée, robinetterie noire |

L'ancienne couverture (mirror) montrait le second bâtiment **encore sous
membrane Tyvek**, cônes de chantier au premier plan. `new-assets-mapping.md`
notait « à remplacer dès que le client fournit une façade finie » — c'est fait.

---

## STE-CÉCILE — 24 logements + 2 suites commerciales

**4 étages, ascenseur, stationnement en sous-sol (16 cases), rangements au
RDC.** Huit logements par étage, répétés à l'identique sur les 2e, 3e et 4e.

| Unités | Type | Unité | Balcon | Total |
|---|---|---|---|---|
| 100 *(Suite B)* | commerce | 1 506 p.c. | — | — |
| 101 *(Suite A)* | commerce | 1 762 | — | — |
| 201 · 301 · 401 | 4 ½ | 814 | 93 | 907 |
| 202 · 302 · 402 | 3 ½ | 561 | 82 | 643 |
| 203 · 303 · 403 | 3 ½ | 569 | 82 | 651 |
| 204 · 304 · 404 | 4 ½ | 854 | 122 | 976 |
| 205 · 305 · 405 | 3 ½ | 617 | 122 | 739 |
| 206 · 306 · 406 | 4 ½ | 867 | 115 | 982 |
| 207 · 307 · 407 | 3 ½ | 611 | 147 | 758 |
| 208 · 308 · 408 | 4 ½ | 772 | 134 | 906 |

**Répartition : 12 × 3 ½, 12 × 4 ½.** Moitié-moitié, exactement.

### Adresse : 106 ou 110 ?

Le cahier s'intitule **« 106 rue Sainte-Cécile »** et le plan d'implantation
étiquette le bâtiment `#106`. Le site, le mirror de l'ancien site et le
premier courriel disent **110**. Même ville, même décompte (24 logements,
2 commerces), même immeuble : ce n'est pas un second projet.

C'est le deuxième écart d'adresse de ce genre — Hermine était 102 ou 110
(`plans-mapping.md` § 5), et c'était le cahier qui avait raison.
**À confirmer avec le client avant mise en ligne.** Non corrigé pour l'instant :
le YAML garde `110`, qui reste la valeur de trois sources sur quatre.

### Photos Ste-Cécile — 9 fichiers

| Fichier *(préfixe)* | Catégorie | Contenu |
|---|---|---|
| `600162802_…` | **drone** | **Vue aérienne** : les 4 étages, la rivière, l'hôtel de ville et son horloge. → **couverture** |
| `600313227_…` | **commun** | Palier d'ascenseur du 4e : signalétique « 4 · ← 408 · 401-407 → », tasseaux bois, moquette |
| `600322311_…` | **commun** | Stationnement souterrain, colonnes, lignage jaune, gicleurs |
| `598341884_…` | intérieur | Aire ouverte d'angle meublée, îlot quartz, vue sur les toits |
| `598940213_…` | intérieur | Cuisine + séjour meublés, table dressée, thermopompe murale |
| `600212905_…` | intérieur | Cuisine îlot, colonne de rangement foncée, vide |
| `600298290_…` | intérieur | Chambre meublée, rideaux verts, vue sur les toits voisins |
| `600518037_…` | intérieur | Coin bureau, vue sur les clochers de l'église |
| `599000152_…` | intérieur | Salle de bain, bain-douche vitré, comptoir foncé |

**Deux photos d'espaces communs de plus.** La catégorie `commun` avait été
retirée de `photos[].categorie` faute d'images (`DESIGN.md` § 5) ; le compte
passe de une à trois. Elles appartiennent toutes à Ste-Cécile, un projet
réalisé — elles ne débloquent donc toujours pas la section « espaces communs »
d'Hermine.

---

## Ce qui a été câblé

`/projets/[projet]` **existe maintenant**, en FR et en EN. Une carte de grille
n'avait de place ni pour un tableau de logements ni pour une galerie : la
donnée des cahiers n'avait nulle part où aller. C'est réglé.

**Trois pages, pas quinze.** Le filtre est `realiseAvecFiche` (`src/i18n.ts`) :
une réalisation n'a de page que si elle a des photos, des logements, des plans
ou des rendus. Les douze autres projets livrés n'ont qu'un résumé d'une ligne
et quatre paires étiquette/valeur — soit exactement ce que leur carte montre
déjà. Leur carte reste inerte ; celles des trois autres portent une ligne
« Voir le projet » avec la flèche du site. Le jour où le client envoie des
photos d'un treizième, sa carte devient cliquable et sa page apparaît, sans
rien changer au code.

| | Ridge | Henderson | Ste-Cécile |
|---|---|---|---|
| Couverture | façade du 2057 | façade terminée | vue de drone |
| Galerie | 6 photos | 3 photos | 9 photos |
| `logements[]` | 3 ½ ·  4 ½ · 5 ½ | 5 ½ | 3 ½ · 4 ½ |
| `inclusions[]` | 6 | — | 5 |
| Description | 4 paragraphes | 3 | 3 |

Décisions prises avec l'équipe le 2026-09-02 :

- **Ridge reste un seul projet.** Quatre immeubles sur le même terrain, même
  programme, livrés en un an : quatre fiches auraient donné quatre cartes
  presque identiques. Les dates sont dans `phase`, le détail par phase dans la
  description.
- **L'adresse Ste-Cécile reste 110**, avec `aConfirmer: [adresse]`.
- **Aucun prix sur une réalisation.** `UnitTable` reçoit `prix={false}` : le
  projet est loué, et « Sur demande » laisserait croire qu'un appel donnerait
  un chiffre. Types et superficies restent, eux sont vrais.

## Ce qui reste à faire

1. **Conversion des pages de plans en images** — bloquée : pas de rendu PDF sur
   cette machine (pas de poppler complet, ni Ghostscript, ni ImageMagick ;
   `pdftotext` seul est disponible, d'où ce relevé). Installer poppler-utils,
   ou demander les planches à Chester. `plans[]` reste vide sur les trois
   projets ; le dépliant de plans de `UnitTable` est prêt à les recevoir.
2. **Accord de Chester** sur les photos et sur les cahiers (voir § Provenance).
   C'est le seul point qui bloque une mise en ligne.
3. **Adresse Ste-Cécile** : 106 ou 110. Question à poser à Alex.
4. **Numéros d'unité des photos.** Aucun n'est déclaré : les fichiers viennent
   de Facebook et ne portent aucune identification. Les cahiers permettraient
   de les rattacher par recoupement (superficie, orientation des fenêtres),
   mais ce serait une déduction — on n'invente pas un numéro pour remplir un
   champ.

# DESIGN.md — MauDev

Système de design du site. Les tokens vivent dans `src/styles/global.css` (bloc
`@theme`, Tailwind v4). Ce document explique **pourquoi** ils sont ce qu'ils sont
et **comment** les assembler.

Règle qui prime sur le reste : aucun composant ne contient de valeur hex ni de
valeur arbitraire (`bg-[#b4552d]`, `text-[17px]`, `p-[13px]`). Si un utilitaire
manque, il manque un token — on l'ajoute ici avant de l'utiliser.

---

## 1. Direction visuelle

**« Vert et sauge »** — le site alterne entre deux fonds, le vert profond
`#18554D` du client et une sauge pâle, avec le saumon `#F69F96` en accent
unique et une seule famille typographique.

### Le raisonnement

Le site s'adresse à de futurs **locataires** : jeunes familles, travailleurs et
retraités de Valleyfield, Huntingdon et Rivière-Beaudette. Des loyers de 895 $ à
1 725 $ pour des logements neufs en région. Le ton visé est chaleureux et humain —
le site vend un **milieu de vie**, pas un actif immobilier.

Trois conséquences directes :

1. **La palette vient du client, pas d'une convention sectorielle.** Le
   réflexe du secteur (bleu confiance + or + blanc) aurait été froid et
   corporatif. Le client a fourni sept couleurs et demandé son vert `#18554D`
   en fond ; c'est un vert dense, végétal, qui laisse les photos d'intérieur
   respirer au lieu de les concurrencer.

   La première direction était terreuse — crème, brun et terracotta, tirés du
   `reference/maudev-mark.svg`. Elle vit toujours dans `palettes/terre.css` et
   se remet en une ligne. Le fichier de logo reste la **source** des couleurs
   d'origine, pas ce qui s'affiche : la plaque carrée à fenêtres a été retirée
   du site (voir § 5, Marque).

2. **Le prix et les inclusions sont du contenu, pas des petits caractères.**
   Un positionnement premium et aspirationnel aurait poussé à cacher les
   chiffres derrière « sur demande ». Ici c'est l'inverse : 1 250 $/mois,
   Wi-Fi inclus, 1 stationnement inclus sont les raisons pour lesquelles
   quelqu'un visite la page. Ils ont leurs propres tokens (`text-stat`,
   l'utilitaire `num`) et leur propre place dans la hiérarchie.

3. **Les photos portent l'émotion, la typographie porte l'information.** Une
   seule famille (Figtree), pas de mise en scène typographique. Les intérieurs
   livrés — cuisines, salles de bain, vues sur le lac Saint-François — sont
   l'argument de vente. Tout le reste s'efface pour eux : deux fonds verts en
   alternance, ombres douces, un seul accent.

### Ce qu'on ne fait pas

| À éviter | Pourquoi |
|---|---|
| Un deuxième accent (bleu, or, jaune) | L'accent perd son sens dès qu'il partage l'attention. Le vert de feuille est la seule exception, pour l'accusé de réception du formulaire — une couleur d'état, pas de marque. |
| Du saumon en aplats larges | Sur de grandes surfaces il devient agressif et écrase les photos. Il sert aux boutons, badges, filets et icônes — jamais à une section entière. |
| Trois valeurs de fond | L'alternance se lit à deux termes. À trois, elle redevient un fond uni qui change de couleur sans raison. |
| Des photos sombres ou mal cadrées | La règle n°1 du secteur : de mauvaises photos coûtent plus cher que n'importe quel défaut de design. Aucun visuel de remplissage, aucune banque d'images. |
| Des sections denses | La densité est réglée « spacieuse ». Il y a peu de projets et beaucoup à dire sur chacun ; l'air fait partie du message de qualité. |
| Une capture de valeur agressive | Pas de compte à rebours, pas de « plus que 2 unités ! », pas de modale d'entrée. Ce sont des baux d'un an, pas des billets d'avion. |

---

## 2. Couleurs

### Primitives

La palette active est `marine.css`, bâtie autour du **`#18554D`** fourni par le
client. Deux échelles portent tout — une de verts profonds, une de sauges
pâles — plus l'accent et une couleur de statut.

| Échelle | Token | Hex | Rôle |
|---|---|---|---|
| **Teal** — les sombres | `teal-950` | `#06201c` | Voile de lisibilité sur vidéo/photo |
| | `teal-900` | `#0b2e29` | Hero, pied de page |
| | `teal-800` | `#123f38` | Champs de formulaire |
| | `teal-700` | `#14483f` | Blocs posés sur une section sombre |
| | `teal-600` | `#18554d` | **La couleur du client** — le fond de page |
| | `teal-500` | `#1b5c52` | Survol d'un bloc |
| | `teal-400` | `#1f6659` | Survol d'un bouton fantôme |
| | `teal-200` | `#2f7368` | Filets décoratifs |
| | `teal-100` | `#478f81` | Filets appuyés |
| | `teal-50` | `#9dc4ba` | Bordures de champ (3:1 minimum) |
| **Mist** — les clairs | `mist-50` | `#f2f7f5` | Texte principal sur fond sombre |
| | `mist-100` | `#d9e6e1` | Texte adouci |
| | `mist-200` | `#cfdfd9` | Texte discret |
| | `mist-300` | `#c6d5d2` | **Sauge du client** — blocs posés sur une zone claire |
| | `mist-400` | `#cadfd4` | Zone claire teintée (« Où MauDev bâtit ») |
| | `mist-500` | `#d7e5db` | Zone claire — le second fond du site |
| | `mist-600` | `#e6f0ea` | Ce qui est posé sur une zone claire |
| **Salmon** — l'accent | `salmon-400` | `#f69f96` | **Saumon du client** — aplats, boutons, titre du hero |
| | `salmon-300` | `#fbb3ab` | Survol de bouton |
| | `salmon-200` | `#fdd2cc` | Saumon **en texte** sur le vert |
| **Leaf** — statut | `leaf-300` | `#a8e0bd` | Accusé de réception du formulaire |
| | `leaf-900` | `#10402f` | Son fond |

**Les quatre autres couleurs fournies ne sont pas dans la palette.** Le taupe
`#A0837B` et le rose ancien `#D09188` sont chauds au milieu d'un système
froid, et le saumon occupe déjà ce registre ; le vert-bleu doux `#789C9A` et
le gris-vert `#6B7069` n'ont plus de place lisible entre le fond et les
filets. Elles restent notées ici pour qu'on sache qu'elles ont été essayées.

### Sémantiques

**Les composants utilisent ces noms-là, jamais les primitives.** Renommer une
primitive ne doit casser aucun composant.

```
Surfaces     page · surface · surface-alt · inverse · inverse-alt
Texte        ink · ink-soft · ink-muted · on-inverse · on-inverse-muted · on-accent
Accent       accent · accent-hover · accent-ink · accent-tint · accent-on-inverse
Traits       line · line-strong · line-input · line-inverse
Statut       available · available-tint
```

### Focus et toucher

L'anneau de focus suit `accent`, dont `zone-claire` change la valeur — saumon
en zone sombre, vert profond en zone claire. Il doit rester visible sur les
deux fonds. Deux règles le gouvernent :

- **`:focus-visible`, jamais `:focus`.** Le navigateur ne l'affiche alors qu'à
  la navigation clavier. À la souris ou au doigt, on voit déjà ce qu'on vise.
- **Aucun conteneur défilant n'est focalisable.** Un `tabindex="0"` sur une
  piste de carrousel lui fait déclencher `:focus-visible` **au toucher** dans
  Chrome : un anneau d'accent autour du carrousel entier dès qu'on y pose le
  doigt. C'est la seule façon dont un anneau apparaît sans clavier, et c'est
  ce qui la ferme.

`-webkit-tap-highlight-color: transparent` sur `*` retire en plus la
surbrillance qu'Android peint sur tout élément tapé : elle apparaît et
disparaît avant qu'on l'ait vue, et elle ignore la palette.

**Ce qui n'est jamais retiré :** l'anneau au clavier. Retirer un `tabindex` ne
retire pas l'accès — il passe par les enfants focalisables (liens, boutons) et
le navigateur amène l'élément focalisé dans le cadre. Là où il n'y a pas
d'enfant focalisable, les flèches deviennent visibles à toutes les largeurs
(carrousel des réalisations).

---

### Deux palettes, une ligne pour basculer

Les couleurs vivent dans `src/styles/palettes/`, une par fichier. `global.css`
en importe **une seule** :

```css
@import "./palettes/marine.css";  /* ← active */
/* @import "./palettes/terre.css"; */
```

| Palette | Direction | Fond | Second fond | Accent |
|---|---|---|---|---|
| `terre` | Terre chaleureuse — direction d'origine | crème `#efe7db` | brun `#241c17` | terracotta `#b4552d` |
| `pin` | Pin — mêmes neutres, accent vert | crème `#efe7db` | brun `#241c17` | vert `#014421` |
| `marine` | **Marine — palette fournie, active** | vert `#18554D` | sauge `#d7e5db` | saumon `#F69F96` |

**Marine inverse le sens de lecture du site.** Les deux premières sont claires
avec du sombre en ponctuation ; marine est **sombre** avec du clair en
alternance. Ce n'est pas un mode sombre — voir plus bas — mais un autre point
de départ, et il change plus de choses qu'un simple changement d'accent :

- **L'accent ne peut plus être le vert.** `#18554D` est le fond ; s'en servir
  aussi pour les boutons revient à peindre un bouton de la couleur du mur.
  C'est le **saumon `#F69F96`** qui prend le rôle. C'est la seule des sept
  couleurs fournies qui tranche vraiment sur ce vert : le taupe et le rose
  ancien sont trop proches en valeur, le vert-bleu doux et le gris-vert
  appartiennent à la famille du fond.
- **Le texte s'inverse.** Encre sombre sur fond clair devient encre claire sur
  fond vert — des sauges pâles, jamais du blanc pur, qui vibre sur un vert
  profond.
- **`accent` et `accent-ink` se séparent à nouveau.** Le saumon tient en aplat
  (7,18:1 pour le texte sombre posé dessus) mais pas en texte sur le vert, où
  il donne 4,22:1. Le texte prend donc un saumon plus clair. C'est le logo qui
  rend la distinction visible : « Dev » consomme `accent-ink`.
- **Le survol s'éclaircit au lieu de s'assombrir.** Commun à `pin` et
  `marine` : à cette densité, assombrir donne du noir et le survol disparaît.
- **Les ombres vivent dans le fichier de palette.** Une ombre à 7 %
  d'opacité ne se voit pas sur un vert profond ; celles de marine sont deux
  fois plus denses. Changer de palette change les ombres.
- **Le vert de succès reste hors palette.** Un accusé de réception dans la
  couleur du fond ne dirait plus « réussi ».

#### Le titre du hero garde son jeton

`display-accent` est le jeton des deux lignes d'ouverture, posées sur le voile
de la vidéo. Sur `marine` il vaut le saumon d'origine — la couleur d'aplat, pas
la variante claire : en très grand corps par-dessus le voile, elle donne
8,63:1.

Le jeton reste distinct d'`accent` par le **rôle** et non par la valeur, parce
que toutes les couleurs ne survivent pas à ce voile :

| Couleur du titre | Sur `inverse` | Image blanche, voile à 85 % |
|---|---|---|
| `#18554D` vert de page | 2,05:1 ✗ | 1,49:1 ✗ |
| `#F69F96` saumon | 8,63:1 ✓ | **6,27:1 ✓** |

Le voile est à 85 % au **bas** du hero, là où le titre se trouve. Plus haut il
tombe à 45 %, où aucune couleur ne tient — pas même `on-inverse`, qui y donne
2,67:1. C'est pourquoi le titre est ancré en bas (`justify-end`) et non centré.
**Cette couleur ne descend jamais sous `text-display`.**

**Ce qui rend la bascule possible : aucun composant ne nomme une primitive.**
Deux jetons manquaient et ont été ajoutés au passage — `scrim` (le voile posé
sur les images, que quatorze composants écrivaient `bark-950/…`) et
`surface-hover` (le fond des boutons secondaires, écrit `sand-100`). Sans eux,
changer de palette laissait des utilitaires pointant vers des couleurs
inexistantes, sans la moindre erreur au build.

L'alternance ajoute une seconde condition : **aucun composant ne suppose la
valeur de son fond.** Un composant qui écrirait `text-mist-50` serait illisible
dès qu'on le pose dans une zone claire. Il écrit `text-ink`, et `zone-claire`
décide (§ Rythme de section).

### Contraste — les trois pièges à connaître

Tous les ratios ci-dessous ont été calculés, pas estimés.

**1. `accent` et `accent-ink` ne sont pas interchangeables.**
Le saumon du client tient **en aplat** — le texte sombre posé dessus donne
7.18:1 — mais **échoue en texte** sur le vert de page : 4.22:1, sous le seuil
AA. D'où deux tokens :

- `bg-accent` + `text-on-accent` → boutons pleins, badges (7.18:1 ✓)
- `text-accent-ink` → tout texte ou icône saumon (6.24:1 ✓)

Ne jamais écrire `text-accent`. C'est le logo qui rend la distinction visible :
« Dev » consomme `accent-ink`, et il est écrit sur le vert.

**2. En zone claire, l'accent n'est plus le saumon.**
`zone-claire` le remplace par le vert profond `teal-700`. Ce n'est pas un choix
d'humeur : sur la sauge pâle, la **silhouette** d'un bouton saumon ne se
détache qu'à 1.56:1 — un bouton qu'on ne voit pas — contre 7.95:1 pour le vert.
La règle qui gouverne les deux zones est la même : **l'accent est toujours la
couleur que le fond n'est pas.**

**3. Une bordure de champ n'est pas un filet décoratif.**
Les contours d'`input`, `select` et `textarea` portent du sens et doivent
atteindre 3:1. `line` et `line-strong` sont décoratifs et échouent. Utiliser
`border-line-input` (4.51:1 sur `page`) sur tout contrôle de formulaire.

#### Paires vérifiées — zone sombre

| Premier plan | Fond | Ratio | |
|---|---|---|---|
| `ink` | `page` | 7.93:1 | ✓ AAA |
| `ink` | `accent-tint` *(pire cas)* | 7.19:1 | ✓ AAA |
| `ink-soft` | `page` | 6.69:1 | ✓ AA |
| `ink-muted` | `page` | 6.22:1 | ✓ AA |
| `ink-muted` | `surface-alt` | 7.50:1 | ✓ AAA |
| `accent-ink` | `page` | 6.24:1 | ✓ AA |
| `accent-ink` | `surface-alt` | 7.53:1 | ✓ AAA |
| `on-accent` | `accent` | 7.18:1 | ✓ AAA |
| `on-inverse` | `inverse` | 13.50:1 | ✓ AAA |
| `on-inverse-muted` | `inverse` | 9.64:1 | ✓ AAA |
| `line-input` | `page` | 4.51:1 | ✓ |
| `available` | `page` | 5.75:1 | ✓ AA |
| ~~`accent`~~ | ~~en texte sur `page`~~ | 4.22:1 | ✗ **interdit** |

#### Paires vérifiées — zone claire

| Premier plan | Fond | Ratio | |
|---|---|---|---|
| `ink` | `page` de zone | 11.22:1 | ✓ AAA |
| `ink` | `surface-alt` | 9.64:1 | ✓ AAA |
| `ink-soft` | `page` de zone | 7.95:1 | ✓ AAA |
| `ink-soft` | `surface-alt` | 6.83:1 | ✓ AAA |
| `ink-muted` | `page` de zone | 5.68:1 | ✓ AA |
| `ink-muted` | `surface-alt` *(pire cas)* | 4.88:1 | ✓ AA |
| `on-accent` | `accent` | 9.56:1 | ✓ AAA |
| `line-input` | `page` de zone | 3.87:1 | ✓ |
| ~~saumon~~ | ~~aplat sur la sauge~~ | 1.56:1 | ✗ **interdit** |

### Pas de mode sombre

Non prévu, et c'est délibéré. Le site **est** sombre par défaut ; ce qui
alterne avec lui n'est pas un thème mais un **rythme de section**, et un mode
sombre commutable entrerait en collision avec lui. `inverse` et `zone-claire`
sont des outils de composition, pas des thèmes.

---

## 3. Typographie

**Deux familles, deux rôles.** Inter porte tout le texte ; Cormorant Garamond
n'apparaît qu'en italique, dans les accents des grands titres.

| Famille | Rôle | Pourquoi celle-là |
|---|---|---|
| **Inter** | tout le texte | La grotesque neutre de référence. Elle ne dit rien d'elle-même, ce qu'on lui demande à côté de la serif |
| **Spectral** droite | accents de titre | Proportions de Times — charpente transitionnelle, contraste modéré, empattements francs — mais dessinée pour l'écran et pourvue de neuf graisses |

Inter a remplacé Figtree : Figtree a des terminaisons arrondies et un œil
ouvert, sympathique mais un peu tendre pour un promoteur qui parle rendement à
des investisseurs.

**La serif d'accent en est à sa quatrième**, et les trois premières se sont
trompées de direction :

| Police | Ce qui n'allait pas |
|---|---|
| Instrument Serif | N'existait qu'en 400 : gras simulé au `-webkit-text-stroke` |
| Cormorant Garamond | Un Garamond — délié, calligraphique, léger |
| Playfair Display | Une Didone — contraste extrême, registre « mode » |

Aucune n'était ce qui était demandé : **une Times**. Spectral est une serif de
labeur aux proportions de Times, dessinée pour l'écran. C'est la Times qu'on
utiliserait si Times avait été dessinée pour un site — et le repli, quand la
police n'a pas chargé, est Times New Roman elle-même.

**Droite, pas italique.** L'italique penchait le titre et l'éloignait de la
référence à chaque itération. Le titre du hero est en **600**, une graisse
chargée et non un contour simulé.

Switzer reste la grotesque prévue à terme ; Inter est le repli tant que les
`.woff2` ne sont pas dans `src/assets/fonts/`. Voir `src/fonts.mjs`.

### Échelle

Les plus grands corps sont fluides (`clamp`) : ils se redimensionnent seuls
entre 375 px et 1440 px, ce qui évite d'empiler `md:` et `lg:` sur chaque titre.

**L'écart entre les extrêmes est délibérément large.** Une échelle resserrée —
h1 à 48 px, h2 à 36 px, corps à 16 px — donne des pages où tout a presque la
même importance : c'est la signature d'un gabarit. Ici un titre de section fait
six fois le corps de texte, et ça se voit.

| Utilitaire | Taille | Interlignage | Graisse | Usage |
|---|---|---|---|---|
| `text-display` | 44 → 96 px | 0.98 | 700 | Titre du hero, une fois par page |
| `text-h1` | 36 → 68 px | 1.02 | 700 | Titre de page |
| `text-h2` | 30 → 50 px | 1.08 | 700 | Titre de section |
| `text-h3` | 22 px | 1.30 | 600 | Titre de carte, sous-section |
| `text-lead` | 19 px | 1.60 | 400 | Chapeau sous un titre |
| `text-body` | 16 px | 1.65 | 400 | Corps de texte |
| `text-small` | 14 px | 1.55 | 400 | Légendes, mentions, notes de bas de tableau |
| `text-label` | 13 px | 1.40 | 500 | Entêtes de tableau, libellés de données, colonnes de pied de page |
| `text-eyebrow` | 12 px | 1.20 | 600 | **Sélecteur de langue uniquement** — voir ci-dessous |
| `text-chiffre` | 56 → 84 px | 1.0 | 700 | Les quatre chiffres de l'accueil, et eux seuls |
| `text-stat` | 28 → 38 px | 1.05 | 700 | Prix, nombre d'unités, chiffres mis en avant |
| `text-unit` | 32 → 52 px | 1.00 | 700 | Type de logement dans le tableau des tarifs |
| `text-numeral` | 52 → 120 px | 0.80 | 700 | Chiffre traité comme objet graphique (piliers de « Notre modèle ») |

### Règles

- **Une seule `text-display` par page**, dans le hero. Sinon plus rien ne domine.
- **Pas de micro-libellés en capitales espacées.** `NOTRE MODÈLE` au-dessus d'un
  titre, la ville en capitales sous un nom de projet, les entêtes de tableau,
  les titres de colonne du pied de page : ce motif était posé partout, et c'est
  l'un des marqueurs les plus reconnaissables du site généré. Il ajoute une
  strate de hiérarchie là où la taille et la couleur suffisaient. Tout est passé
  en `text-label`, casse normale.
- **`text-eyebrow` ne subsiste qu'à un seul endroit : le sélecteur de langue.**
  « FR » et « EN » sont des codes ISO, pas des mots — la capitale y est
  intrinsèque. Toute autre utilisation est une régression.
- **Les surtitres de section sont supprimés, pas restylés.** Un `h2` de 50 px
  n'a pas besoin qu'on l'annonce.
- **Longueur de ligne plafonnée à `max-w-prose`** (`--container-prose`, ~70
  caractères). Une ligne de 120 caractères ne se lit pas.
- **Tout chiffre qui s'aligne verticalement porte `num`** — prix dans un
  tableau de logements, numéros d'unité, superficies. Sans chiffres tabulaires
  les colonnes tremblent.
- **Jamais de graisse 300 ni de texte sous 14 px.** Sur les deux fonds, les deux
  perdent leur contraste.
- **Pas de justification.** `text-align: justify` produit des rivières en
  français, langue à mots longs.

---

## 4. Layout et espacement

### Échelle

On garde l'échelle 4 px de Tailwind, inchangée. La réécrire ne rapporterait rien
et casserait chaque utilitaire que l'équipe connaît déjà.

### Largeurs

| Token | Valeur | Usage |
|---|---|---|
| `max-w-page` | 1280 px | Grille principale : grilles de cartes, galeries, nav, footer |
| `max-w-narrow` | 896 px | Sections de contenu, tableaux de logements |
| `max-w-prose` | 608 px | Paragraphes suivis |

Gouttières latérales, toujours les mêmes : `px-5 md:px-8 lg:px-12`.

### Rythme vertical

Un token ne peut pas être responsive ; le rythme est donc une **convention
d'utilitaires**, à copier telle quelle :

| Niveau | Utilitaires |
|---|---|
| Section standard | `py-20 md:py-28 lg:py-36` |
| Section dense (deux sections liées) | `py-16 md:py-20 lg:py-24` |
| Section ample (ouverture, clôture) | `py-24 md:py-32 lg:py-44` |
| Titre de section → contenu | `mb-10 md:mb-14` |
| Titre → chapeau | `mt-4` à `mt-5` |
| Entre cartes d'une grille | `gap-14 md:gap-y-20` |

**Ces trois niveaux doivent être utilisés, pas un seul.** Une page où chaque
section fait la même hauteur, avec des titres de la même taille, se lit comme un
gabarit rempli — quel que soit le contenu. Le rythme se joue sur **la hauteur et
la répartition interne**, jamais sur la largeur du conteneur.

### Page d'accueil — direction à part

L'accueil suit `reference/inspo/landing-example.png` (Broccolini) et s'écarte
délibérément du reste du site : titres plus grands, images plein cadre,
défilement horizontal, sections révélées au scroll. Les pages intérieures
restent sobres — c'est le contraste qui donne son rôle à chacune.

**Ce que le mirror donne, et ce qu'il ne donne pas.** Le dossier contient un
seul fichier HTML : structure et textes. Les deux feuilles de style et le
bundle SvelteKit pointent en absolu vers broccolini.com et n'ont pas été
aspirés. La capture pleine page est **presque vide**, parce que leurs sections
n'apparaissent qu'au défilement. On reconstruit donc l'intention, jamais
l'implémentation.

**Deux familles qui se croisent.** Le titre du hero passe de la grotesque à
Instrument Serif italique en cours de phrase — c'est le « together we thrive »
de Broccolini appliqué à la copie de MauDev. Seul endroit du site où deux
familles cohabitent ; la serif ne compose jamais un paragraphe.

**Le plancher typographique du titre est fixé par le nombre de lignes.**
`--text-hero` descend à 46 px, et pas plus bas ni plus haut : à 48, « neufs, »
passe à la ligne et le titre en prend cinq sur un téléphone. Mesuré à 375 px :
42 → 4 lignes, 44 → 4, 45 → 4, **46 → 4**, 48 → 5.

Le titre est découpé en **trois** champs dans `src/copy/landing.ts` (`title`,
`titleAccent`, `titleAccent2`). Le texte rendu est identique : c'est une découpe
de mise en page, pas un changement de contenu. Trois et non deux parce que
l'accent tient sur deux lignes — et couper au dernier mot par programme ne
marche pas : en anglais ça laisserait « in. » seul sur sa ligne.

**`serif-gras` sur l'accent.** Instrument Serif n'existe qu'en 400 : il n'y a
pas de graisse supérieure à charger. L'utilitaire pose un
`-webkit-text-stroke` de `0.018em` de la couleur du remplissage — c'est ce que
fait un vrai gras, en moins fin. Réservé au hero : à taille de lecture,
l'épaississement boucherait les contreformes.

**Le hero porte un titre, un chapeau et un seuil.** Les trois ont été retirés
un temps, au motif qu'ils annonçaient la section suivante — même décompte,
mêmes projets, à un geste de défilement. Sur décision du client, ils sont
revenus : un hero qui ne dit que sa phrase d'accroche ne dit pas ce qu'on y
loue ni où.

**Le chapeau disparaît sous `md`.** Les trois villes tiennent en une ligne à
1 440 et en trois à 375 : sur un téléphone, elles poussaient l'appel à
l'action hors du premier écran pour une information que la page redonne plus
bas. Le texte reste dans le DOM, et un lecteur d'écran le lit.

**Le plan est au cadrage d'origine, plein format.** Il a été rogné quatre
fois pour écarter le chantier du titre — 2 489×1 400, puis 2 696×1 517, puis
2 857×1 607 — avant de revenir à la fenêtre complète, sur décision du client.
Le sujet repasse donc partiellement derrière le titre : c'est le prix du plan
large, et il est assumé.

Ce que ces quatre essais ont établi, et qui reste vrai le jour où on voudra
déplacer un sujet dans un hero :

| Essai | Résultat |
|---|---|
| `object-right` sur un plan 16:9 | La vidéo ne dépasse le cadre que de 129 px : 64 px de décalage, et **du mauvais côté** — caler à droite montre la partie droite de la source, donc pousse le sujet vers la gauche |
| `object-left` sur un plan rogné en 2,2:1 | 250 px en horizontal, mais **rien en vertical** : à 2,2:1 la vidéo remplit exactement la hauteur, il n'y a plus de course |
| Rognage dans le master | Contrôle sur les deux axes — la seule méthode qui marche |

**`object-position` ne déplace que ce que le cadrage laisse déborder.** Pour
bouger un sujet, c'est la fenêtre de rognage qu'il faut déplacer à la source.
Et l'élargir tout en gardant le sujet en place est borné par deux inégalités
(`x0 ≥ 0` et `y0 + H ≤ hauteur du master`) : au-delà, il faut céder sur la
position ou sur la largeur.

**Le média est fixe ; la page monte dessus.** Il était `absolute` dans le
hero, donc il défilait avec lui. Maintenant le titre remonte, la section
suivante vient le recouvrir, et le plan reste à sa place — c'est le
défilement qui révèle la page, pas le hero qui s'en va.

- **`fixed` et non `sticky`.** Un élément collé ne tient que le temps de son
  conteneur, et celui du hero fait exactement un écran : aucune course. Le
  rendre collant demanderait d'envelopper toute la page dans son conteneur,
  pour un effet que trois lettres obtiennent.
- **Le hero perd son `isolate` et son fond.** Un contexte d'empilement peint
  tout son sous-arbre — calque fixe compris — à l'étape des éléments
  positionnés, donc **au-dessus** des fonds des sections suivantes, qui sont de
  simples blocs en flux. La vidéo restait devant la page. Vérifié :
  `elementFromPoint` au centre de l'écran renvoyait le voile du hero alors
  qu'on était deux sections plus bas. Sans contexte d'empilement, le calque à
  `-z-10` remonte au niveau de la racine et se peint avant tous les fonds en
  flux ; chaque section opaque le recouvre, dans l'ordre du document.
- **Le fond sombre part sur le calque**, où il sert de repli si les médias ne
  chargent pas, sans masquer le calque lui-même.
- **Ce que ça suppose du reste de la page** : toutes les sections qui suivent
  ont un fond opaque. C'est déjà la règle (§ Rythme de section), et c'est
  maintenant une dépendance. Une section transparente laisserait voir le plan
  au milieu de la page.

**Révélation au défilement.** `[data-reveal]` + un `IntersectionObserver`.
`data-reveal` seul monte depuis le bas ; **`data-reveal="droite"` entre par la
droite**, réservé à la section des projets en location — son contenu est un
carrousel horizontal, et le geste d'arrivée annonce l'axe de lecture. Deux
directions, pas trois : au-delà, la page gigote.

La section porte `overflow-x-clip`. Les éléments qui entrent par la droite
attendent à `translateX(3rem)`, donc 48 px hors du cadre : sans clipping, ça
ouvrait une barre de défilement horizontale de 28 px à 375 px avant même que
l'animation parte. `clip` et non `hidden` — `hidden` ferait de la section un
conteneur de défilement, avec ce que ça casse (ancrage, éléments collants).
L'état caché est posé **par le script**, jamais par le HTML : sans JavaScript,
la page est entière. C'est l'inverse du réflexe habituel, et la capture vide de
Broccolini montre ce que coûte l'autre choix. Vérifié avec JavaScript désactivé :
huit titres, vingt-sept images, opacité à 1.

**Le hero de l'accueil est la vidéo.** Il a été l'inverse pendant un temps :
un intérieur meublé en hero, et le drone plus bas, en **bandeau pleine
largeur** qui ouvrait « Une seule plateforme intégrée ». Ce bandeau a coûté
cher — un bloc média hors flux, une réserve de flux pour tenir la hauteur, un
voile à arrêts calculés sur la hauteur du média — et il ne convainquait pas.
Les deux vidéos ont aussi été essayées en panneaux cadrés dans la grille
(`VideoPanel.astro`, supprimé).

Aujourd'hui : **une seule vidéo sur l'accueil, en hero** (§ 6), et l'intérieur
meublé va où le texte parle de ce qu'on livre. Un plan de drone au lever du
soleil dit « neuf, en construction, en région » mieux qu'un séjour ; le séjour
dit « voilà ce que vous louez » mieux qu'un plan de drone. Chacun à sa place.

**`public/videos/dalhousie/` et `public/videos/hermine/` ne sont plus utilisés
nulle part.** Fichiers conservés, pas référencés — à replacer ou à supprimer
selon ce que le client décide.

**Le rythme des médias, et pourquoi il compte.** Les sections à images étaient
groupées : le carrousel des projets à louer touchait la photo d'intérieur, qui
touchait le carrousel des réalisations. Trois blocs d'images de suite se
parcourent en deux temps — on regarde tout, puis on lit tout — au lieu
d'alterner. L'index des municipalités les sépare :

| Section | Médias |
|---|---|
| Hero | vidéo |
| À louer | carrousel de photos |
| **Où MauDev bâtit** | **aucun** |
| Une seule plateforme intégrée | une photo |
| Projets réalisés | carrousel de photos |
| MauDev en chiffres | aucun |
| Une question sur un logement ? | aucun |

**Les chiffres suivent immédiatement les réalisations**, dans la même nuance
et sans respiration pleine : les deux ne font qu'un mouvement. À pleine
hauteur des deux côtés, la bande vide entre elles était de leur propre
couleur, et les chiffres semblaient appartenir à autre chose. C'est le seul
endroit du site où deux sections se touchent à ce point — ailleurs, deux
sections consécutives disent deux choses.

**Le carrousel doit montrer qu'il défile.** Trois projets, et le premier
réglage en donnait deux : à 40 rem, deux cartes remplissaient exactement la
grille à 1 440 px, et sur 375 px une carte à 86 vw remplissait la piste entière.
Un carrousel dont rien ne dépasse n'est pas un carrousel, c'est une rangée.

Deux choses le disent :

| Signal | Où | Ce qu'il dit |
|---|---|---|
| Une carte coupée par le bord | toutes largeurs | « ça continue à droite » |
| Flèches + barre de progression | ≥ md | « et voici comment avancer » |

Un compteur « 01 / 03 » avait été ajouté en troisième signal, puis retiré : il
donnait un chiffre qui bougeait au défilement pour une information que la
tranche de carte visible dit déjà, et il attirait l'œil vers le bas de la
section au lieu des projets.

- Cartes à **30 rem** en `lg` (480 px) : deux entières et 160 px de la
  troisième dans une piste de 1 184.
- Sur mobile, la largeur est un **pourcentage de la piste** (`78 %`), pas du
  `vw` : la piste vit à l'intérieur des marges de page, donc `86vw` débordait
  d'elle au lieu de la remplir aux trois quarts.
- La barre suit le **défilement réel**, pas le rang de la carte. Avec 320 px à
  parcourir pour trois cartes, un clic sur « suivant » atteint déjà le bout :
  une barre indexée sur le rang sautait de 33 % à 100 % pour un seul pas. Elle
  part à 1/n — jamais vide — et suit le défilement jusqu'au bout.
- **Aucune piste n'est focalisable.** Un conteneur défilant avec `tabindex="0"`
  déclenche `:focus-visible` **au toucher** dans Chrome : un anneau d'accent
  autour du carrousel entier dès qu'on y pose le doigt. Le clavier passe par
  les cartes (des liens) ou par les flèches, et le navigateur amène lui-même
  l'élément focalisé dans le cadre — vérifié sur les plans : focaliser la
  dernière vignette fait défiler la piste de 0 à 1 296 px.

**Carrousel des réalisations — manuel, pas automatique.** Il a d'abord défilé
tout seul : la liste rendue deux fois, le conteneur glissant de -50 % en boucle.
Élégant à écrire, pénible à lire — on ne revient pas sur un projet qui vient
de passer, on ne s'arrête pas sur une photo sans viser précisément pour
déclencher la pause, et une page qui bouge toute seule met le visiteur en
position de spectateur. **Le mouvement appartient au visiteur.**

Il partage désormais son pilote avec le carrousel des projets en location
(`CarrouselScript.astro`, composant à script seul comme `Reveal.astro`) : deux
carrousels sur une même page qui se piloteraient différemment seraient une
devinette.

Une différence : **ses flèches sont visibles à toutes les largeurs.** Les
cartes des projets en location sont des liens, le clavier les atteint et le
navigateur fait défiler la piste ; les réalisations sont des figures, rien n'y
est focalisable. Sans flèches sous `md`, les projets 4 à 11 deviendraient
inatteignables au clavier.

Chaque projet est une **carte** : photo en 3/2, puis un bloc `bg-page` de
`px-5 py-5` portant le nom et la ville. Le nom flottait auparavant sous la
photo, à même le fond de section — rien ne le rattachait à son image, et onze
légendes alignées dans le vide se lisaient comme une légende unique. La section
étant en `surface-alt`, la carte se détache sans contour ni ombre.

**Compteurs.** Le chiffre final est dans le HTML, et le script part de zéro pour
y revenir. Écrire `0` puis compter laisserait quatre zéros sur la page quand le
script ne s'exécute pas, et mentirait aux moteurs de recherche.

**Tout est calculé depuis la collection** — 3 projets, 100 logements, 5
municipalités, 11 réalisations. Ajouter un projet met la page à jour sans que
personne édite un fichier de contenu.

---

### `/a-louer` — une rangée par projet

Même langage que l'accueil, même échelle. La page reste une **liste**, pas une
galerie : chaque projet occupe une rangée pleine largeur, l'image alternant de
côté.

```
─────────────────────────────────────────────────────────────
┌─────────────────────┐        Projet Hermine
│        image        │        Salaberry-de-Valleyfield · 102 rue…
└─────────────────────┘        ────────────────────────────
                              Prix sur demande            →
─────────────────────────────────────────────────────────────
Projet Dalhousie              ┌─────────────────────┐
Huntingdon · 82 rue Dalhousie │        image        │
──────────────────────────  └─────────────────────┘
À partir de  895 $/mois   →
```

- **Trois informations, pas davantage** : nom, adresse, prix de départ.
  Logements, types, superficies, livraison, plans, photos — tout ça vit sur la
  page du projet. Une liste qui répète sa destination ne sert qu'à retarder le
  clic.
- Avec trois projets, une grille de trois tuiles gaspille la page. Une rangée
  par projet donne à chacun la place de se voir, et le nom peut monter à la
  taille d'un titre de page (`text-h1`, 68 px).
- **Colonne de texte sur cinq colonnes, image sur six.** À quatre colonnes,
  « Projet Rivière-Beaudette » tombait sur trois lignes.
- Lien en calque : toute la rangée est cliquable, le nom porte le nom
  accessible.
- Survol : l'image respire (1.04, 700 ms) et la flèche s'inverse en aplat
  d'accent. Le mouvement vit sur l'image, jamais sur la rangée — agrandir un
  lien déplace sa zone cliquable pendant l'animation.

`Reveal.astro` — le même observateur qu'à l'accueil, extrait pour être partagé.
Il ne rend aucun balisage, seulement le script.

---

### `/projets` — grille régulière, groupée par municipalité

Onze réalisations, onze cartes de même taille, trois par rangée. Une rangée
pleine largeur par projet — le traitement de `/a-louer` — donnerait onze
écrans à faire défiler pour des projets qui ne sont plus à vendre.

```
────────────────────────────────────────────────────────────
Salaberry-de-Valleyfield ─────────────────  7 projets livrés   ← id="ville-…"
┌──────────┐ ┌──────────┐ ┌──────────┐   lg:grid-cols-3 · 3/2 partout
│   3/2    │ │   3/2    │ │   3/2    │   md:grid-cols-2 · une colonne sous md
└──────────┘ └──────────┘ └──────────┘
 01 Nom      02 Nom      03 Nom
 ville       ville       ville
```

**Chaque groupe porte une ancre**, cible de l'index de l'accueil (« Où MauDev
bâtit »). Sans groupes, cliquer « Huntingdon » menait à une grille de onze
cartes où il fallait chercher les deux qui répondaient.

- **C'est une ancre, pas un filtre.** Tout reste sur la page. Un filtre
  demanderait du JavaScript pour cacher neuf cartes sur onze, et un visiteur
  arrivé par un lien verrait **moins** de projets qu'il n'en existe. Ici il
  tombe sur les siens, et les autres sont juste en dessous.
- **`scroll-mt-28` sur l'ancre.** La nav est fixe et haute de 64 px : sans
  marge de défilement, elle recouvre le titre de groupe à l'arrivée. Mesuré
  après : le titre arrive à 112 px du haut, la nav en occupe 81.
- **Le titre de groupe garde son filet**, contrairement à l'index de l'accueil
  qui l'a perdu. Ici le filet a du travail : il traverse toute la largeur de la
  page pour rejoindre un décompte aligné à droite, et il ouvre une section.
  Dans l'index, il ne reliait rien qui fût séparé.
- **Le numéro des cartes court d'un groupe à l'autre**, 01 → 11, comme le total
  annoncé en tête de page. Repartir de zéro à chaque groupe donnerait « 01 »
  quatre fois — et quatre images chargées en `eager` au lieu de trois, puisque
  c'est le même indice qui décide des deux.
- **Même tri que l'index** : les municipalités les plus fournies d'abord, puis
  l'ordre alphabétique. À l'intérieur d'un groupe, l'ordre par nombre de
  logements est conservé.
- Le slug de l'ancre vient de `slugVille()` dans `src/format.ts`, appelé par
  les deux pages. Une slugification écrite deux fois finit par diverger sur un
  accent, et le lien casse **sans que rien n'échoue à la construction** — d'où
  les cinq assertions de `format.check.ts`.

**À taille égale, délibérément.** Une mosaïque à largeurs alternées — 7-5,
5-7, 4-4-4 sur une grille de 12, les formats variant avec la largeur — a été
construite puis retirée. Elle donnait du rythme, et elle **classait onze
projets qui ne le sont pas** : une tuile deux fois plus grande que sa voisine
annonce un projet plus important, ce que ni le client ni le contenu ne disent.
La page finissait par parler de sa mise en page plutôt que de bâtiments.

Même règle qu'aux galeries de projet (§ 5) : **le cadrage ne hiérarchise pas ce
que le contenu ne hiérarchise pas.**

Avec `src/mosaique.ts` sont partis son module de composition, son fichier de
vérification et les 96 assertions qui garantissaient que chaque rangée
totalisait 12 — de la logique juste au service d'une intention fausse.

- **Jamais une photo d'intérieur en couverture.** Cette grille montre des
  bâtiments ; un salon meublé y répond à une autre question. Deux réalisations
  n'ont reçu que des intérieurs (110 Ste-Cécile, 2055-61 Chemin Ridge) et
  affichent donc le **gabarit** — la marque et « photos à venir », le même que
  `ProjectCard`. Un cadre vide dirait « image manquante » ; le gabarit dit
  « pas encore livrées », ce qui est le cas.

  Le schéma suit : `couverture` n'est plus exigée que pour un projet **en
  location** — on ne loue pas un logement sans photo. Une réalisation et un
  projet à venir peuvent s'en passer.

  Les intérieurs ne sont pas perdus : ils restent dans `photos`, où ils sont à
  leur place.
- Toutes les images en **3/2**, `object-cover`. Un seul format, donc rien à
  déduire de la largeur.
- La dernière rangée peut rester incomplète : onze est premier. Ce n'est plus
  une tuile orpheline mais une carte de taille normale qui manque à la fin —
  ce que fait toute grille, et que personne ne lit comme un bogue.
- **Tout le contenu reste visible en permanence.** Cacher les faits sous un
  survol marche à la souris et les rend inatteignables au clavier : la carte
  n'est pas un lien, il n'y a rien à mettre au focus. Le survol ne fait que
  respirer l'image.
- L'étiquette et la valeur d'un fait s'empilent — à trois colonnes, « Note
  d'investissement » contre « Mise de fonds remboursée (no cash deal) »
  écraserait les deux sur une même ligne.
- Trois colonnes à partir de `lg`, deux à `md`, une en dessous.

---

### `/a-louer/[projet]` — l'ordre des sections

```
hero                     92svh, comme celui de l'accueil
Les logements et tarifs  un bouton « Visiter » par offre
Photos                   aperçu de cinq, carrousel sous `sm`
Description + carte
Ce qui est inclus
Intéressé par ce projet ?
Rendus 3D
Demander une visite
```

**L'ordre suit la décision, pas la fiche technique.** On regarde le prix, on
regarde les photos, on situe l'immeuble, et alors seulement on veut savoir ce
qu'il y a dedans. L'ordre d'origine ouvrait sur trois paragraphes de
description et une carte Google, puis énumérait des équipements — thermopompe,
échangeur d'air, Wi-Fi — avant d'avoir montré un seul logement ni annoncé un
prix.

« Ce qui est inclus » était un bloc à la fin de la section « description » ;
c'est maintenant une section à elle seule, ce qu'elle aurait dû être.

**Les étiquettes d'inclusion ne disent plus « inclus ».** « Hydro inclus »,
« Wi-Fi inclus », « 1 stationnement inclus » sous un titre qui dit déjà « Ce
qui est inclus » : le mot était écrit deux fois par ligne. Quatre étiquettes
raccourcies dans les YAML, FR et EN.

**Un bouton « Visiter ce logement » par offre.** L'appel à la visite existait
une fois par page ; il est maintenant là où la décision se prend — devant un
type de logement et son prix. Même ancre `#visite`, donc le formulaire reçoit
toujours le contexte du projet. Seules les offres **disponibles** le portent :
proposer une visite pour un type qui n'est plus offert serait une impasse.

**Le hero d'un projet fait la même hauteur que celui de l'accueil : 92svh.**
Les deux branches étaient plus basses — 78svh plafonné à 900 px pour la
vidéo, 68svh pour l'image fixe. Une fiche de projet s'ouvrait donc sur un
bandeau plus court que la page d'où l'on venait, et la marche se voyait au
clic.

**Plus de photo à côté du titre.** La couverture y a été posée un temps, pour
montrer le bâtiment que le plan de drone ne montre pas de près. Elle coupait
le hero en deux et répétait, à 200 px du pli, l'image qu'on venait de voir sur
la carte de `/a-louer`. Le hero ne porte plus que son texte, sur toute la
largeur, comme celui de l'accueil.

**Il parle aussi la même langue.** Il était plus discret — titre en `text-h1`,
ville au corps de lecture, bouton à coins arrondis de 48 px — et une fiche
s'ouvrait donc sur un ton plus bas que la page d'où l'on venait. Trois emprunts
à l'accueil :

| | Avant | Après |
|---|---|---|
| Titre | `text-h1`, 68 px | **`text-display`, 96 px** |
| Municipalité | `text-lead`, gris, collée à l'adresse | **serif d'affichage, 50 px, couleur d'ouverture** |
| Appel à l'action | bouton `rounded-card` de 48 px | **le seuil**, avec sa règle de remplissage et sa flèche |

- **`text-display` et non `text-hero`.** Le hero de l'accueil reste seul à
  porter le plus grand corps du site (§ 3) ; une fiche de projet s'aligne juste
  en dessous. « Projet Hermine » tient sur une ligne, « 116 Saint-Jean-Baptiste »
  sur deux — c'est le nom qui décide, pas le gabarit.
- **La municipalité en serif, l'adresse en petit.** Le croisement des deux
  familles est ce qui donne sa voix au titre de l'accueil ; ici il sépare aussi
  deux choses qui étaient sur la même ligne — la ville est une accroche,
  l'adresse civique une précision.
- **Les révélations arrivent en cascade** (titre, ville, chiffres, seuil), et
  `<Reveal />` est enfin sur la page : son entrée s'affichait d'un bloc pendant
  que l'accueil, `/a-louer` et `/projets` déroulaient la leur.

---

### Une seule gouttière, partout

**Tout bloc centré du site porte exactement `mx-auto max-w-page px-5 md:px-8
lg:px-12`.** Sans exception : navigation, hero, sections, galeries, formulaire,
pied de page. Les bords gauche et droit de chaque bloc tombent au même pixel.

Un `max-w-[104rem]` avait été essayé sur les galeries, pour que les images
débordent de la colonne de texte. Deux défauts :

- **Sous 1 664 px de fenêtre, la largeur maximale ne s'applique jamais** : le
  bloc part bord à bord. À 1 440 px, la galerie se posait à 48 px des bords
  quand tout le reste était à 121 px — c'est-à-dire sur la quasi-totalité des
  écrans réels.
- Le décrochage ne se lisait pas comme un choix, seulement comme un bloc mal
  aligné.

L'asymétrie voulue se crée **à l'intérieur** de la grille de 12 colonnes — une
description sur 7 colonnes, une carte sur les 5 dernières — pas en changeant la
largeur du conteneur.

**Corollaire sur les grilles de contenu :** le bloc titre + chapeau d'une page
n'est pas centré ni empilé. Titre sur les 7 premières colonnes, chapeau aligné
en bas à droite sur les 5 dernières. Le bloc centré titre-puis-sous-titre est
le réglage par défaut de tous les gabarits.

### La dernière section avant le pied de page

Deux pages se terminent par un **panneau** — `/a-louer` et `/projets`, dont le
rappel de contact est le dernier bloc. Leur respiration est **asymétrique** :
peu au-dessus, beaucoup en dessous.

```
   … dernier projet
        20 px          ← le panneau suit immédiatement la liste
   ┌─ panneau de contact ─┐
   └───────────────────┘
        80 px          ← pt-5 pb-14 md:pb-16 lg:pb-20
   ██ pied de page ██
```

Un panneau collé au pied de page se lit comme une erreur de marge : les deux
sont des blocs colorés, et sans intervalle ils se touchent comme s'ils n'en
formaient qu'un. Les sections qui ne se terminent pas par un panneau gardent une
respiration symétrique — c'est le contact du panneau avec le pied de page qui
demande l'exception, pas la fin de page en soi.

---

### Rythme de section

Le site alterne entre **deux fonds** : le vert profond `#18554D` et une sauge
pâle. L'alternance structure la page à elle seule — aucun séparateur décoratif
n'est nécessaire. L'écart entre les deux est de 6.59:1 : on ne peut pas le
manquer, et c'est le but.

```
page          →  le vert profond, fond par défaut
section-alt   →  la sauge pâle — la moitié claire de l'alternance
section-accent→  la même, un rien plus verte (« Où MauDev bâtit », seule)
surface-alt   →  les blocs posés sur une section
inverse       →  hero et pied de page. Un cran plus sombre que la page.
```

**Une section claire porte `zone-claire`, jamais autre chose.**

```html
<section class="zone-claire bg-section-alt py-14 md:py-16 lg:py-20">
```

Passer d'un fond à l'autre inverse tout ce qui se pose dessus : l'encre, les
filets, la couleur d'accent, le texte des boutons. Ces quinze bascules sont
groupées dans l'utilitaire `zone-claire` (`global.css`), qui redéfinit les
jetons **pour son sous-arbre**. Les composants n'ont rien à savoir : ils
écrivent `text-ink` et `bg-accent` comme partout ailleurs, et la valeur suit.

C'est possible parce que `text-ink` compile en `color: var(--color-ink)` : il
suffit de redéfinir la variable sur un conteneur. Aucune variante `dark:`,
aucun `class:list` conditionnel, aucun composant à dupliquer.

**Un bloc s'enfonce en zone sombre, il monte en zone claire.** Sur le vert,
`surface-alt` est plus **sombre** que la page ; sur la sauge, il est plus
**clair**. Le réflexe inverse — éclaircir ce qu'on pose sur un fond sombre —
épuise le budget de contraste : à la quatrième surface empilée, le texte
secondaire tombait à 2.94:1. Mesuré, puis abandonné.

**Deux bandes de même valeur à la file, pas trois.** L'accueil enchaîne
« Projets réalisés » et « MauDev en chiffres » en clair : les deux forment un
groupe, la seconde est la coda de la première. Trois d'affilée redeviennent un
fond uni, et l'alternance ne dit plus rien.

| Page | Rythme |
|---|---|
| `/` | hero · à louer · **bâtit** · plateforme · **réalisés · chiffres** · contact |
| `/a-louer`, `/projets` | liste · **bandeau de contact** |
| `/a-louer/[projet]` | hero · **tarifs** · photos · **emplacement** · inclus · **intéressé** · rendus · visite |
| `/notre-modele` | hero · **plateforme** · pourquoi · **équipe** |

*(en gras : les bandes claires)*

**Le formulaire reste toujours sur fond sombre.** Ses champs sont en `surface`,
un cran plus sombre que la page ; en zone claire ils deviendraient presque la
couleur du fond, et un champ qu'on ne voit pas est un champ qu'on ne remplit
pas.

### Points de rupture

Mobile d'abord. Rendu à vérifier à **375 · 768 · 1024 · 1440 px** (voir §10).

| | Cartes de projet | Galerie | Tableau de logements |
|---|---|---|---|
| < 768 px | 1 colonne | 1 colonne | cartes empilées |
| 768–1023 px | 2 colonnes | 2 colonnes | tableau |
| ≥ 1024 px | 3 colonnes | 3 colonnes (1re en 2×2) | tableau |

La page `/a-louer` n'a qu'un projet publiable aujourd'hui (Hermine) mais le brief
en annonce quatre. La grille est en `grid` dès le départ, jamais en `flex`
centré : passer de 1 à 4 cartes ne doit rien exiger d'autre que d'ajouter un
fichier de contenu.

### Deux fonds, et rien entre les deux

Le site a d'abord été clair sur crème, avec le vert en accent. Le client a
demandé son `#18554D` en fond : le vert est donc devenu le fond, et l'accent a
dû changer de couleur — peindre un bouton de la couleur du mur ne le fait pas
voir.

Une première version a mis le vert **partout**. C'était juste et illisible à la
fois : trois écrans de la même valeur, sans respiration, et les photos qui
finissaient par se ressembler. D'où l'alternance : le vert, puis la sauge,
puis le vert.

```
██ hero ████████████████████████████████
██ section sombre ██████████████████████
░░ section claire ░░░░░░░░░░░░░░░░░░░░░░
██ section sombre ██████████████████████
░░ section claire ░░░░░░░░░░░░░░░░░░░░░░
██ pied de page ████████████████████████
```

**Deux fonds, pas trois.** `section-accent` existe mais ne sert qu'à « Où
MauDev bâtit » — la sauge y est un rien plus verte pour distinguer cet index
des autres bandes claires. Une troisième valeur générale rendrait le rythme
illisible : on ne lit plus une alternance à partir de trois termes.

**Ce qui est posé sur une section n'est jamais le fond de l'autre zone.** Un
bloc pâle sur une section sombre serait une zone claire en réduction, et le
lecteur y attendrait des règles de zone claire. Les blocs restent dans la
valeur de leur section, à un cran près.

**Ce qui reste dans une boîte :** les deux rappels de contact, en bas de
`/a-louer` et de `/projets`. Ce sont les seules vraies **bandes** du site — un
titre et un bouton — et `Panneau.astro` ne sert plus qu'à celles-là.

**Ce qui a été containerisé :** les trois piliers, les types de logement, les
quatre raisons, les quatre chiffres. Tous étaient des colonnes séparées par un
filet ; le bloc dit mieux qu'il s'agit d'éléments comparables.

**Le rendu de `/notre-modele` est à côté du contenu, pas au-dessus** — voir
plus bas la fiche de la page.

### Rayons et ombres

**Les commandes sont arrondies, les images ne le sont pas.** La séparation
porte du sens : un bouton est un objet qu'on manipule, une photo est un cadrage.

| Token | Valeur | Usage |
|---|---|---|
| `rounded-input` | 8 px | Champs et cases à cocher |
| `rounded-card` | 10 px | **Tous** les boutons, y compris ceux qui n'apparaissent qu'au survol |
| `rounded-media` | 0 | Fiches de plan, encart carte — ils suivent les images |
| `rounded-panel` | 16 px | Les panneaux de section |
| `rounded-full` | — | **Puces de liste et médaillons d'équipe** |

« Tous les boutons » inclut les commandes qui n'existent qu'au survol : les
pastilles fléchées des cartes, les flèches de carrousel, la pause vidéo, les
commandes de la visionneuse. Une commande qui apparaît ne doit pas avoir une
forme différente d'une commande visible.

Tout mettre à angle vif avait été essayé : les boutons carrés durcissaient une
page qui vend un milieu de vie.

L'échelle précédente — 10 / 16 / 20 / 28 px — découlait du rayon de 22,5 % de
la plaque carrée du logo. **La plaque a été retirée** (§ 5, Marque) : la marque
est un mot, et le raisonnement est parti avec elle. Restaient des boutons en
pilule et des panneaux à 28 px au milieu de photos, de cartes et de mosaïques
toutes à angle vif — deux langages sur la même page, et c'est le plus mou des
deux qui se remarquait.

Les commandes rondes ont suivi : flèches de carrousel, fermeture de la
visionneuse, pause vidéo, pastille de compteur. Un bouton d'icône est un bouton
avant d'être une icône ; il parle la même langue que l'appel à l'action.
**Exception : la puce de liste** reste ronde. Ce n'est pas un bouton, c'est un
signe de ponctuation.

`:focus-visible` a perdu son `border-radius: 2px` : il arrondissait légèrement
l'anneau, ce qui passait tant que le reste était arrondi. À angle vif partout,
il ne faisait plus que déformer l'élément au moment où il prenait le focus.

**Les jetons restent, à zéro** plutôt que retirés des vingt-deux classes qui
les utilisent : la décision tient en un seul endroit, et revenir à `0.5rem`
demande une ligne.

| Token | Usage |
|---|---|
| `shadow-soft` | État de repos d'une carte |
| `shadow-lift` | Survol d'une carte interactive |
| `shadow-media` | Photo ou vidéo qui décolle du fond |

Les trois ombres sont teintées de la couleur du fond (`rgb(6 32 28 / …)` sur
`marine`). Une ombre noire vire au gris et casse la teinte de la palette.
**Elles vivent dans le fichier de palette, pas dans `global.css`** : leur
densité dépend du fond. À 7 % d'opacité, une ombre est invisible sur un vert
profond ; celles de `marine` sont deux fois plus denses que celles de `terre`.

---

## 5. Patterns de composants

### Marque

Un mot, pas un pictogramme : **MauDev**, où « Dev » porte l'accent.

```
MauDev          ← « Mau » en currentColor, « Dev » en accent
                  `text-marque` : 28 px → 36 px
```

**La marque a son propre pas de typo** (`--text-marque`), pas un titre
emprunté. « MauDev » n'est pas un `h3`, et le suivre aurait fait changer le
logo chaque fois qu'on touche à la hiérarchie des titres. **28 px sur mobile,
36 px à partir de ~1 280** — la barre de nav fait 64 px puis 80, il reste
18 px de marge de chaque côté au plus serré. Le pied de page utilise le même
pas.

La plaque carrée à fenêtres a été retirée. Un promoteur qui n'a qu'un nom n'a
pas besoin de le répéter en icône juste à côté : l'icône + le mot occupaient
deux fois la place pour dire la même chose, et l'icône à 40 px était le seul
élément du site qui ne se lisait pas.

- **« Mau » n'a pas de couleur à lui** : il hérite (`currentColor`) de son
  parent — clair sur le vert, sombre en zone claire, clair par-dessus une
  photo. C'est le contexte qui décide, donc la marque suit sans qu'on ait à la
  prévenir.
- **« Dev » doit être nommé** : le saumon d'aplat tombe à 4,22:1 en texte sur
  le vert de page. D'où `accent-ink` — un saumon plus clair, 6,24:1 — et
  `accent-on-inverse` sur le hero et le pied de page (§ 2). En zone claire,
  `accent-ink` bascule au vert profond avec le reste des jetons.
- La nav bascule de transparent à opaque au défilement. La marque n'est donc
  **pas rendue deux fois** : un lecteur d'écran lirait « MauDev MauDev ». Un
  seul rendu, les deux moitiés basculées par `group-data-[nav=…]`, via la prop
  `accent` de `Logo.astro`.
- Un seul nœud de texte : « MauDev », pas « Mau » + « Dev » séparés. Le
  `<span>` intérieur ne porte que de la couleur.

**Aucun favicon.** Ceux d'Astro (`favicon.svg`, `favicon.ico`) ont été
supprimés avec le `<link rel="icon">` : c'était le logo du générateur sur les
onglets d'un site de promoteur. La marque n'a pas de pictogramme, et poser
celui de `reference/maudev-mark.svg` ramènerait la plaque carrée par la
fenêtre. Le navigateur affiche donc son icône générique — préférable à une
marque qui n'est pas la nôtre. À rouvrir seulement si le client fournit un
symbole.

---

### Navigation

Barre haute, fond `page`, filet `border-b border-line`. Sur la landing page
uniquement, elle démarre transparente par-dessus le hero vidéo et bascule sur
`page` au défilement.

```
┌────────────────────────────────┐
│                                │  ← photo, aspect-[4/3], angles vifs
│         photo du projet        │     object-cover, group-hover:scale-[1.03]
│                                │     transition 500ms
└────────────────────────────────┘
   Projet Hermine                    ← text-h3, lien en calque
   Salaberry-de-Valleyfield · 102 rue Alphonse-Desjardins
                                     ← text-body text-ink-muted, une seule ligne

   54 logements · 3 ½, 4 ½, 5 ½      ← text-small text-ink-soft
   618 pi² – 1 515 pi²
   Livraison juillet 2026
   ────────────────────────────────
   À partir de
   1 250 $/mois                  →   ← text-stat num + flèche accent-ink
```

- **Ni contour, ni ombre, ni fond blanc.** Une grille de rectangles blancs
  bordés et ombrés, tous de la même taille, est ce qui donnait au site son air
  de gabarit. L'image porte la carte ; le texte vit à même le fond de page. Le
  seul filet est celui qui sépare le prix du reste.
- Le survol agrandit **la photo** (1.03, 500 ms) et souligne le titre. Jamais de
  changement de fond : l'alternance des sections utilise déjà ce signal, et un
  fond qui bouge au survol se lirait comme un changement de zone.
- **Toutes les cartes ont le même traitement.** Ni vedette, ni rangée pleine
  pour le premier projet : trois projets qui se présentent de trois façons se
  comparent mal, et c'est la comparaison qu'on vient faire sur `/a-louer`.
- **`grid-rows-subgrid` sur trois bandes** — image, texte, prix — partagées avec
  la liste : sans ça le filet au-dessus du prix flotte à une hauteur différente
  dans chaque carte, au gré de la longueur des noms et des adresses.
  Deux pièges dans ce pattern :
  1. **Un seul niveau de sous-grille.** La carte rend sa propre `<li>` et le
     lien est un calque (`after:absolute after:inset-0`). Avec un `<a>`
     enveloppant à l'intérieur d'une `<li>`, on obtient deux sous-grilles
     imbriquées et les navigateurs ne font pas remonter correctement la hauteur
     du contenu à travers les deux niveaux.
  2. **`self-start`, jamais `self-end`.** Les pistes se dimensionnent avant que
     la largeur définitive des colonnes soit connue, donc elles sortent plus
     courtes que leur contenu. Calé en bas, un bloc plus haut que sa piste
     déborde vers le haut et son filet remonte d'autant.
- La flèche est décorative (`aria-hidden`) ; le nom du projet porte le lien.
- « À partir de » disparaît si aucun prix n'est renseigné — c'est le cas
  d'Hermine tant que la liste de prix n'est pas fournie.
- Photo en `aspect-[4/3]` **imposé**, quelle que soit l'image source.
- Sur `/projets` (réalisés), la carte n'est pas un lien et compte quatre bandes
  au lieu de trois : le résumé a la sienne.

**Pas d'étiquette de statut.** Les pastilles « Disponible », « Bientôt » et
« Livré » ont été retirées partout : cartes, hero de projet, pied de page.

Elles doublaient une information déjà présente et plus précise — une date de
livraison, un décompte de logements loués, un fait « Statut » dans la liste des
réalisations — en la transformant en décoration. Une pastille posée en absolu
sur la photo de couverture est de surcroît le réflexe de gabarit le plus visible
qui soit.

Le token `available` et ses dérivés n'ont plus de consommateur ; les primitives
Moss restent définies, à supprimer si rien ne les reprend.

---

### Galerie photos et plans

Deux jeux d'images, deux traitements différents. Les mélanger est le piège : un
plan d'étage rogné par `object-cover` est illisible.

**Photos** — un aperçu de cinq, la suite dans la visionneuse.

```
┌───────────────┬───────┬───────┐
│               │   2   │   3   │   max-w-4xl · sm:grid-cols-4 grid-rows-2
│       1       ├───────┼───────┤
│               │   4   │  5 ⧉10│   ← le compteur, sur la dernière
└───────────────┴───────┴───────┘
```

**Cinq photos, pas dix.** La grille montrait tout : dix vignettes sur quatre
rangées, une section qui prenait deux écrans pour des photos qu'on parcourt en
dix secondes dans la visionneuse. Un aperçu dit « il y a des photos, en voici
le ton » ; le reste est à un clic.

- **Une grande et quatre petites**, et l'ordre décide : la première photo du
  YAML est celle que le client a mise en premier. C'est la seule hiérarchie du
  bloc, et elle vient du contenu.
- **Le compteur dit le total, pas le reste** — « 10 » et non « +5 ». Un
  visiteur veut savoir combien de photos existent, pas faire une soustraction.
  Il est `aria-hidden` : le bouton s'annonce déjà « Agrandir la photo », et la
  visionneuse dit « Photo 5 sur 10 » à l'ouverture.
- **Toutes les photos restent atteignables.** Les cinq vignettes ouvrent la
  visionneuse, qui reçoit la liste entière. Les vignettes non affichées ne sont
  pas dans le DOM ; seule la visionneuse connaît leurs URL.
- **`max-w-4xl`.** Une mosaïque de cinq photos étalée sur 1 184 px redevient la
  grande galerie qu'on vient de retirer.

**Sous `sm`, un carrousel.**

```
┌──────────────┐ ┌─         une photo à la fois, la suivante qui dépasse
│              │ │          basis-5/6 · snap-start · overflow-x-auto
│     3/2      │ │
└──────────────┘ └─
```

À 375 px, une mosaïque à trois colonnes donnerait des vignettes de 100 px : on
n'y voit ni la pièce ni la lumière, seulement qu'il y a une photo. La piste
`scroll-snap` en montre une à la fois, au doigt.

- **Aucun script.** `overflow-x-auto` + `snap-x snap-mandatory` suffisent. Le
  clavier garde son accès : le navigateur amène lui-même dans le cadre le
  bouton qui prend le focus, et la visionneuse s'ouvre au clic comme sur la
  grille.
- **`basis-5/6` et non `w-[86%]`.** La vignette doit laisser voir la suivante ;
  les deux le font, seule la première est un jeton.
- **La piste déborde du conteneur** (`-mx-5 px-5`) pour que les photos partent
  du bord de l'écran et non de la marge de page. Le retrait est rendu au
  rembourrage, donc la première vignette reste alignée sur le texte.
- Mesuré à 375 px : vignette de 267 px dans une piste de 360, dix photos,
  défilement effectif. À partir de `sm`, retour à la grille.

**Au-dessus de `sm`** — grille régulière, toutes les vignettes au même format :

```
┌────────┐ ┌────────┐ ┌────────┐    dix photos : les six premières
│  3/2   │ │  3/2   │ │  3/2   │    en tiers, les quatre dernières
└────────┘ └────────┘ └────────┘    en demis · angles vifs
┌────────┐ ┌────────┐ ┌────────┐
│  3/2   │ │  3/2   │ │  3/2   │
└────────┘ └────────┘ └────────┘
┌─────────────┐ ┌─────────────┐
│    3/2      │ │    3/2      │
└─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│    3/2      │ │    3/2      │
└─────────────┘ └─────────────┘
```

**Aucune rangée incomplète.** Trois colonnes par défaut ; le problème est le
reste. Dix photos donnaient trois rangées pleines et **une photo seule** en bas,
qui ne se lit pas comme une fin de liste mais comme une erreur de chargement.

La correction ne touche que la fin. Selon le reste de la division par trois,
les dernières photos passent en demi-largeur :

| Reste | Ce qui change | Exemple |
|---|---|---|
| 0 | rien, tout en tiers | 9 → 3×3 |
| 1 | les **quatre** dernières en demis | 10 → 3+3+2+2 |
| 2 | les **deux** dernières en demis | 11 → 3+3+3+2 |

Les tailles varient donc, mais **seulement là où c'est nécessaire**, et jamais
au milieu : le début reste régulier et aucune photo n'est mise en avant au
hasard. La grille est en **6 colonnes** — le plus petit nombre divisible par 2
et par 3, donc le seul qui laisse cohabiter tiers (2 colonnes) et moitiés (3).

Une mosaïque à largeurs alternées sur toute la longueur avait été essayée puis
retirée : une cuisine cadrée deux fois plus grande que la chambre d'à côté
annonce que la cuisine compte davantage, ce que personne n'a décidé. Toutes les
photos d'un projet ont le même statut — sauf quand il faut fermer une rangée.

`3/2` pour tout le monde, `object-cover` pour absorber les rapports d'origine.
Le recadrage ne cache rien : la visionneuse montre l'image entière, en
`object-contain`.

- `object-cover`, `loading="lazy"` sauf la première (`eager` + `fetchpriority`).
- Le `srcset` et le WebP sont générés par Astro à partir du fichier 2400 px
  importé — ne pas référencer à la main les variantes du client.
- **`alt` descriptif obligatoire** en FR et EN : « Cuisine d'un 4½ du projet
  Hermine, comptoirs de quartz » — pas « photo1.jpg ».
- Le clic ouvre une visionneuse : `<dialog>` natif, image agrandie, flèches
  précédent/suivant, fermeture à `Échap` et au clic sur le fond, focus rendu à
  la vignette d'origine. Pas de bibliothèque tierce — `<dialog>` couvre le cas.
- **Meublé et vide ne se mélangent pas.** Une grille qui alterne logements mis
  en scène et pièces nues fait paraître le projet mal préparé. Hermine ne publie
  donc que les prises meublées de l'unité 112 ; ses 8 photos de logements vides
  restent en réserve (voir `reference/photos-mapping.md`).

**Pas de section « espaces communs ».** Elle était prévue — hall, corridor,
ascenseur, stationnement intérieur, rangements — mais le client n'a fourni
aucune photo de ces espaces, alors même qu'ils sont vendus comme inclusions. La
catégorie a été retirée de l'énumération `photos[].categorie` plutôt que laissée
vide : une section vide se remarque plus qu'une section absente. À rétablir dans
`src/content.config.ts` le jour où les photos arrivent.

**Plans** — grille régulière, traitement radicalement différent :

```
┌─────────────┐  ┌─────────────┐
│   ╭─────╮   │  │   ╭─────╮   │   bg-surface, pas le fond de section
│   │ 4½  │   │  │   │ 5½  │   │   object-contain · p-6
│   ╰─────╯   │  │   ╰─────╯   │   border border-line · rounded-media
├─────────────┤  ├─────────────┤   aspect-[4/3]
│ 4½ · 812 pi²│  │ 5½ · 980 pi²│   ← légende text-small num
└─────────────┘  └─────────────┘
```

- **Le logo du tiers est effacé au rendu.** Les fiches d'origine portent le
  logo de la firme en haut à gauche ; `plans/` en est la copie nettoyée —
  publier une marque tierce sur chaque plan agrandi du site n'irait pas. Le
  procédé est décrit dans `reference/plans-mapping.md` ; les PDF d'origine
  restent dans `reference/assets/`, hors du dépôt.
- `object-contain` sur fond **blanc** : un plan est un document technique, il ne
  se recadre pas et il a besoin de son propre fond neutre.
- Chaque plan porte le type de logement et, s'il est connu, la superficie.
- Lien de téléchargement PDF si le client le fournit.

**Où vivent les plans.** Pas dans une section à eux en bas de page : 19 plans
étalés d'un coup ne disent rien, et le visiteur les rencontre loin du prix
auquel ils se rapportent. Ils vivent **dans le tableau des logements**, dans une
colonne « Plans » à droite. Un clic déplie la grille du type sous sa ligne :

```
Type      Superficie             Loyer                     Plans
───────────────────────────────────────────────────────────
4 ½     798 pi² – 1 082 pi²   Sur demande         Masquer  ⌃
      ┌────────┐ ┌────────┐ ┌────────┐   1 / 10  ───  ‹  ›
      │  plan  │ │  plan  │ │  plan  │ →   carrousel à calage natif
      └────────┘ └────────┘ └────────┘
───────────────────────────────────────────────────────────
5 ½     1 084 pi² – 1 515 pi²  Sur demande  Voir les plans (4)  ⌄
```

- Un `<details>` ne peut pas envelopper deux lignes de tableau : le dépliant est
  donc un bouton et une ligne-panneau reliés par un `id`, avec `aria-controls`
  et `aria-expanded`. Onze lignes de JavaScript, et `aria-expanded` porte à la
  fois l'état accessible, la bascule du libellé et la rotation du chevron
  (`group-aria-expanded:`).
- Sans JavaScript, un `<noscript>` déplie tous les panneaux et retire les
  boutons : les plans restent consultables.
- **Carrousel horizontal, pas une liste verticale.** Dix plans de 4 ½ empilés
  produisaient deux écrans de défilement pour une information qu'on parcourt et
  qu'on compare, pas qu'on lit. L'axe horizontal correspond au geste, et il
  garde la section à hauteur constante quel que soit le type ouvert.
- `scroll-snap` natif, **aucune bibliothèque**. Le navigateur apporte déjà
  l'inertie tactile, le calage et la molette ; il amène aussi de lui-même dans
  le cadre la vignette qui prend le focus au clavier. Le JavaScript n'ajoute
  que ce qu'il n'a pas : les boutons de desktop et l'indicateur de position.
- **La piste n'est pas focalisable.** Un `tabindex="0"` sur un conteneur
  défilant lui donne les flèches du clavier, et lui fait déclencher
  `:focus-visible` **au toucher** dans Chrome — un anneau d'accent autour du
  carrousel entier dès qu'on y pose le doigt. Les vignettes sont des boutons :
  le clavier les atteint une à une, et la piste suit.
- Vignettes de **480 px** (`lg:w-[30rem]`, `80vw` sur mobile) : un plan est un
  document technique, sous ~400 px les cotes deviennent illisibles. La vignette
  suivante dépasse volontairement du cadre — c'est ce qui signale qu'on peut
  faire défiler.
- Indicateur : compteur `1 / 10` et barre de progression. En fin de course, la
  dernière vignette est visible mais son point de calage reste hors d'atteinte :
  sans correction, le compteur afficherait à jamais « 9 / 10 ».
- Un `ResizeObserver` mesure le carrousel **au moment où il devient visible** :
  né dans un panneau replié, toutes ses dimensions valent zéro, et aucun
  événement de chargement ne se déclenche au dépliage.
- Un clic sur une vignette ouvre la version 1650 px dans la visionneuse. Les
  flèches y parcourent **tous** les plans du projet, pas seulement le type
  ouvert.
- Le carrousel est rendu **deux fois** — une dans le tableau ≥ md, une dans les
  cartes < md. Sans conséquence : voir la visionneuse ci-dessous.

---

### Visionneuse

`Lightbox.astro` — un `<dialog>` natif, partagé par les galeries et par les
plans. Il apporte déjà le fond modal, le piège à focus, la fermeture à Échap et
le retour du focus. Rien à réimplémenter, aucune bibliothèque.

**La liste des images est portée par le composant, pas déduite des
déclencheurs.** Ceux-ci se contentent d'un `data-lightbox="<id>"` et d'un
`data-index`. C'est ce qui permet au même plan d'avoir deux déclencheurs dans la
page — le tableau et les cartes — sans être compté deux fois : 38 boutons, 19
images, et le compteur dit bien « Plan 7 sur 19 ».

Les grandes versions ne sont jamais dans le DOM : une seule balise `<img>` reçoit
l'URL au moment du clic.

---

### Les logements et tarifs

Le cœur d'une page de projet. **Une colonne par type, pas un tableau.**

```
──────────────────   ──────────────────   ──────────────────

3 ½                 4 ½                 5 ½            ← text-unit, accent-ink

618 – 690 pi²       798 – 1 082 pi²     1 084 – 1 515 pi²   ← text-lead

À partir de         À partir de         À partir de        ← text-body muted
1 075 $/mois        1 570 $/mois        1 725 $/mois       ← text-stat

Voir les plans (5)  Voir les plans (10) Voir les plans (4) ← text-body semibold
```

Le premier essai était un vrai `<table>`, avec le type en très grand. Juste sur
le fond — c'est de la donnée tabulaire — mais faux à l'usage : entêtes de
colonne à 13 px, superficies et loyers au corps du texte, tout sauf le type
réduit à des petits caractères. **On ne compare pas trois lignes de tableau
comme on compare trois offres.**

Le modèle est celui de `reference/inspo/project-html/lelib.ca` : type en très
grand, superficie, « à partir de », prix. Rien sous le corps de texte, aucun
libellé de colonne à déchiffrer.

- **Aucune valeur sous `text-body`** dans cette section, sauf la note en bas de
  colonne. C'était le défaut principal de la version tableau.
- **Le type est en `accent-ink`**, seul endroit du site où l'accent porte un
  caractère de cette taille. C'est ce qu'on cherche en arrivant.
- Le libellé du prix s'adapte : « À partir de » quand seul un plancher est
  connu, « Loyer » quand la fourchette est complète — sinon la formule promet
  un prix d'appel qui n'existe pas.
- **Sémantique :** une liste d'offres, chacune avec son titre (`<h3>`) et sa
  liste de définitions (`<dl>`). Ni `<table>` sans en-têtes, ni grille de
  `<div>` : un lecteur d'écran annonce « 3 ½ », puis « Superficie : 618 à
  690 pi² ».
- Trois offres tiennent sur une rangée ; à partir de quatre on repasse à deux
  colonnes pour que chaque prix garde sa place.
- Prix absent → « Sur demande », jamais de case vide ni de « — ».

**Les plans se déplient sous la rangée**, sur toute sa largeur : c'est la seule
place où un carrousel de vignettes à 480 px respire. Un seul panneau ouvert à la
fois — deux carrousels l'un sous l'autre, on ne sait plus lequel on regarde.

Chaque panneau suit **immédiatement son offre dans le DOM**, et `md:order-1` le
renvoie après toute la rangée dès qu'il y a plusieurs colonnes. Rendre les
panneaux après la liste paraît équivalent : ça l'est en colonnes, ça ne l'est
pas empilé. Sur 375 px, ouvrir les plans du 4 ½ faisait apparaître le carrousel
**369 px sous le bouton**, après l'offre du 5 ½ — hors écran. Le libellé passait
à « Masquer » et rien de visible ne se produisait.

Le panneau porte `min-w-0`. Un élément de grille a `min-width: auto` : il
s'élargit jusqu'à la taille max-content de son contenu, et le carrousel mesurant
3 144 px, la page débordait d'autant sur l'axe horizontal. C'est le piège
symétrique du précédent — on échange un bogue contre un autre si on l'oublie.


---

### `/notre-modele` — le rendu à côté des trois métiers

La page était entièrement textuelle : titre, chapeau, trois piliers, quatre
raisons, un paragraphe de direction. Juste, et morte.

L'image vient d'un projet **retiré du site**. Elle ne représente donc plus une
fiche : c'est une image de marque, et sa légende dit « Rendu 3D » sans nommer
de projet. Le site sépare partout les rendus des photos (§ 5, galeries) ; il ne
va pas commencer à les confondre sur la page qui parle de méthode. Le fichier
vit dans `src/assets/marque/`, hors de l'arborescence des projets.

```
┌─ bg-page ────────────────────────────────────────┐
│  Une seule plateforme intégrée                          │
│  ┌───────────┐   ┌─────────────────────────────┐   │
│  │  rendu    │   │ ⚇  Acquérir et densifier      │   │
│  │  sticky   │   └─────────────────────────────┘   │
│  │  lg:top-28│   ┌─────────────────────────────┐   │
│  │           │   │ ⛑  Financer et construire     │   │
│  └───────────┘   └─────────────────────────────┘   │
│  légende          ┌─────────────────────────────┐   │
│                    │ ⚷  Louer et administrer       │   │
│                    └─────────────────────────────┘   │
└──────────────────────────────────────────────┘
       lg:col-span-5              lg:col-span-7
```

**Trois placements ont été essayés avant celui-là**, et chacun a échoué pour
la même raison de fond :

| Essai | Pourquoi retiré |
|---|---|
| Chevauchement sur la section précédente (marge négative) | Grand vide à gauche du titre ; l'image flottait à côté de la page |
| Débordement jusqu'au bord droit de l'écran | Même vide, plus un dépassement de 214 px (voir plus bas) |
| Bande large centrée sous le titre | Propre, mais l'image était seule sur sa ligne : un intervalle entre deux blocs de texte, pas un élément de la section |

Une image n'a pas besoin d'un traitement spécial pour compter. Il lui faut
quelque chose à côté d'elle. Ici les trois piliers passent en **pile**
(`colonnes={1}`) et l'image prend la colonne voisine : elle accompagne ce qu'on
lit au lieu de l'interrompre.

- **Le titre reste au-dessus des deux colonnes.** Placé en tête de la colonne
  de droite, il donnait sur mobile : chapeau de page → image → titre de
  section. Une image glissée entre deux textes qu'elle ne relie pas. Au-dessus,
  l'ordre d'empilement redevient celui de la lecture.
- **`lg:sticky lg:top-28` avec `lg:self-start`.** En pile, les trois piliers
  font 1 030 px contre 608 px pour l'image : sans `sticky`, on lit les deux
  derniers métiers devant une colonne vide. `self-start` est indispensable —
  un élément de grille étiré sur toute la hauteur n'a nulle part où coller.
- **Sous `lg`, tout retombe en une colonne** et `sticky` cesse de s'appliquer
  — il n'y a plus rien à côté de quoi rester. Le rapport passe de 4/5 à 3/2 :
  un portrait pleine largeur sur mobile occupe un écran entier.
- **Le piège du débordement**, si l'envie revient : `mr-[calc(50%-50vw)]` sur
  un enfant de grille résout le pourcentage **contre la colonne**, pas contre
  la page. Mesuré : 214 px au-delà de la fenêtre.

---

### Équipe de direction — médaillons

Six personnes, six portraits ronds, nom et fonction dessous.

```
   ◯        ◯        ◯        ◯        ◯        ◯
   AP       JP       SB       PH       SG       MD
 A. Paquin  J-C.P   S.Br    P-Hug   S.Gren   M-A.D
 Président · Finances   …

 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
```

Le paragraphe de l'ancien site nommait les six à la file. On arrivait au bout
sans retenir qui faisait quoi : six noms dans une phrase se lisent comme une
énumération, pas comme une équipe. Mêmes noms, mêmes fonctions, même ordre —
seule la forme change (`equipe: [{ nom, role }]` dans `src/copy/modele.ts`).

- **Les cercles sont la seule forme arrondie du site** avec la puce de liste
  (§ 4). Un portrait rond n'est pas une boîte à coins adoucis, c'est un
  médaillon, et il se lit comme tel.
- **Aucune photo pour l'instant : les initiales tiennent la place des six.**
  Dérivées du nom, jamais saisies — un placeholder qu'on maintient à la main
  finit par contredire le nom qu'il accompagne. Un aplat gris vide dirait
  « image manquante » ; les initiales disent « personne ».
- « Pierre-Hugues » n'a **pas de nom de famille** dans la source. On ne
  l'invente pas, et les initiales tombent alors sur les composantes du prénom.

**En attente : les six portraits.** Une photo avait été fournie sous le nom
`directeur.jpg` ; le client a confirmé qu'elle ne représentait aucun des six,
et le fichier a été supprimé. Quand les vraies photos arriveront, chacune
remplace le cercle de son propriétaire — même cadre, même diamètre — et le
reste de la grille ne bouge pas. Cadrer serré sur le visage : un plan mi-corps
dans un cercle de 160 px ne montre plus personne.

---

### MauDev en chiffres

Quatre nombres calculés depuis la collection, en bas de l'accueil.

```
                  ┌────────☷┐ ┌────────◫┐ ┌────────⚇┐ ┌────────✓┐
                  │         │ │         │ │         │ │         │
   MauDev          │ 2       │ │ 88      │ │ 4       │ │ 11      │
   en chiffres     │ projets │ │ logem…  │ │ munic…  │ │ réalis… │
                  └─────────┘ └─────────┘ └─────────┘ └─────────┘

   lg:col-span-3   lg:col-span-9 · aspect-square · coins vifs · ancré en bas
   lg:self-center  icône 28 px hors flux, coin haut droit
                   nombre text-chiffre · 56 → 84 px
```

- **Le chiffre final est dans le HTML**, et le script part de zéro pour y
  revenir. C'est l'inverse du réflexe habituel — écrire `0` puis compter —
  qui laisse quatre zéros sur la page quand le script ne s'exécute pas, et qui
  ment aux moteurs de recherche.
- **Chaque chiffre porte une icône.** Quatre nombres alignés se ressemblent :
  on lit « 2 », « 88 », « 4 », « 11 » et il faut redescendre au libellé pour
  savoir de quoi on parle. Deux immeubles, une porte, un repère, une coche :
  chaque bloc a une silhouette qu'on retient avant d'avoir lu.
- **28 px, hors flux, dans le coin haut droit.** C'est le nombre qui porte
  l'information ; l'icône ne fait que le nommer. À 56 px, comme dans la grille
  d'inclusions, elle lui aurait disputé la place ; au milieu du carré — sa
  position précédente, sur la ligne du nombre — elle n'avait de rapport avec
  aucun bord. En coin, elle marque la tuile au lieu d'accompagner le chiffre.
- **Le nombre a son propre jeton, `--text-chiffre`.** Il peut grandir parce
  que l'icône ne coûte plus de hauteur — mais il n'existait rien entre
  `--text-h1` (68 px) et `--text-display` (96 px), et la bonne taille est au
  milieu : **84 px**. À 68 le chiffre ne domine pas sa tuile, à 96 il la
  remplit trop. Un jeton de rôle plutôt qu'un palier de plus dans l'échelle
  générale — c'est déjà ce que sont `--text-stat`, `--text-numeral` et
  `--text-unit`, toutes des tailles de chiffre à usage nommé.
- **Même pente que `--text-h1`, mais un plancher ET un plafond plus hauts.**
  Le plafond (84 px) sert les grands écrans ; le plancher (56 px) sert le
  téléphone, où la tuile fait 150 px et le chiffre n'en occupait que 36.
- **Le plancher a longtemps été bloqué par un point unique.** À 640 px, la
  grille passait à quatre colonnes et la tuile tombait à 131 px — **moins
  qu'à 375**, où il n'y en a que deux. Ce palier isolé plafonnait la taille du
  chiffre sur toute la plage. Il est reporté à `md`, et le plancher a pu
  monter d'autant. Le point serré est maintenant 768 px : 157 px de tuile pour
  135 de contenu.
- Un `aspect-ratio` est une taille préférée, pas un plafond : le contenu qui
  déborde étire la boîte au lieu d'être rogné. C'est pour ça que chaque
  changement de taille se vérifie sur toute la plage, pas seulement aux
  extrêmes.
- **La tuile est un carré, et tout tient dedans.** Les quatre blocs étaient des
  rectangles de hauteur égale, chacun de la largeur que la grille lui laissait.
  En carré, la hauteur est dictée par la largeur — et à 154 px de côté (le cas
  de 1 024 px), une icône de 28, un nombre de 68 et un libellé sur deux lignes
  font 179 px avec le rembourrage.
- **L'icône est donc passée à droite du nombre.** Deux éléments côte à côte ne
  coûtent que la hauteur du plus grand : la ligne retombe à 68 px, et le
  libellé revient dans la boîte — il en était sorti le temps d'une version.
- **Le contenu est ancré en bas.** `flex-col-reverse` + `justify-start` :
  l'axe étant inversé, le départ est le bas. C'est le nombre qu'on lit, il ne
  doit pas flotter au milieu du carré. L'inversion sert aussi la sémantique —
  le `<dt>` vient en premier dans le DOM, comme la spécification l'exige, et se
  rend sous son nombre.
- **Le point serré est 1 024 px, et lui seul** : c'est là que `text-h1` atteint
  son maximum de 68 px alors que le carré est à son plus petit dans la
  disposition à neuf colonnes. Un rembourrage de 20 px y demandait 155 px de
  contenu pour 154 de côté, et une tuile sur quatre cessait d'être carrée —
  `aspect-ratio` est une taille **préférée**, pas un plafond : le contenu qui
  déborde étire la boîte au lieu d'être rogné. D'où `p-4` jusqu'à `xl`.
  C'est aussi la limite à connaître avant d'allonger un libellé : à 1 024 px,
  une troisième ligne ne rentre pas.
- Vérifié à 375, 768 et 1 440 px : **carré au pixel**, marge intérieure
  positive (15 px à 375). Les points à surveiller avant de toucher au jeton
  sont 768 et 1 024 px, où la tuile est la plus petite pour un chiffre déjà
  grand.
- **Neuf colonnes et non huit.** Un carré ne se laisse pas comprimer : à huit,
  la tuile tombait à 166 px à 1 440 et à 138 px à 1 024, où le nombre seul en
  fait déjà 68.
- **Le titre est sur `self-center`**, donc aligné sur le milieu de la rangée.
  Il était sur `self-end`, calé sur le bas des blocs — ce qui se lisait comme
  un défaut d'alignement plutôt que comme un choix. Mesuré : les deux centres
  tombent sur le même pixel à 1 024 comme à 1 440.
- **`flex-col-reverse` sur l'entrée** : le `<dt>` vient en premier dans le DOM,
  comme la spécification l'exige, et se rend sous sa tuile.
- **L'icône est posée dans `Landing.astro`, à côté de sa valeur**, et non dans
  une liste par position au fond du composant : une liste positionnelle se
  décale à la première réorganisation, et rien n'échoue — on se retrouve
  simplement avec une porte devant le nombre de municipalités.
- **Coins vifs.** C'est la seule surface du site à en avoir, et c'est
  volontaire : un carré à coins arrondis n'est plus tout à fait un carré, et
  ces quatre-là sont là pour être carrés. Les jetons de rayon restent aux
  commandes et aux panneaux (§ Rayons et ombres).
- **Même recette de survol que les piliers** : `carte-survol` sur le bloc,
  `icone-survol` sur l'icône, `hover:bg-accent-tint`. La cohérence est ce qui
  fait qu'une page paraît dessinée plutôt qu'assemblée. Contrastes vérifiés
  sur le fond de survol : 6,98:1 pour le nombre, 5,92:1 pour le libellé.
- **Mouvement réduit** : le fond change encore, la montée et l'agrandissement
  de l'icône disparaissent, et le compteur ne tourne pas — le nombre final
  s'affiche tel quel. Vérifié au navigateur.

---

### Où MauDev bâtit — un index

Sur l'accueil, entre le carrousel des projets à louer et la photo d'intérieur.

```
Où MauDev bâtit               ← text-display, 96 px, grotesque

Salaberry-de-Valleyfield →    ← text-h2, 50 px, serif
Huntingdon →
Saint-Eustache →
Sainte-Martine →

   aucun filet, aucune bordure · la zone cliquable épouse le texte
```

**Trois formes se sont succédé à cette place.** D'abord trois piliers
numérotés, qui disaient dans les mêmes mots ce que `/notre-modele` développe,
sous le lien qui y mène. Puis une **carte** — quatre pastilles vertes posées
sur les vraies coordonnées, avec les plans d'eau de la région tirés
d'OpenStreetMap en fond. Elle marchait : projection à une seule échelle,
73 153 points simplifiés à 1 366, zéro requête réseau. Elle n'a pas convaincu,
et elle est partie avec `src/geo.ts`, `src/villes.ts` et `scripts/carte/`.

Reste l'index, qui était la deuxième forme et qui redevient la bonne.

- **La seule section teintée de l'accent du site.** Elle est prise entre deux
  sections sombres — les projets à louer au-dessus, la plateforme en dessous —
  et c'est ce qui lui donne son rôle : une respiration colorée là où la page
  change de sujet. `section-alt` l'en séparait à peine.

  Le jeton est `--color-section-accent`, défini dans les trois palettes. Dans
  `marine`, il part du #789C9A du client dilué à 26 % dans du blanc, **puis
  poussé vers le vert** : dans le #789C9A, le vert et le bleu sont à deux
  points l'un de l'autre, et une fois diluée la teinte tombait dans le
  gris-cyan. À #d7e5db, le vert mène de six points sur le bleu et de quatorze
  sur le rouge — c'est ce qui la fait lire comme une sauge. Contrastes :
  13,49:1 pour `ink`, 5,60:1 pour `ink-muted`, 6,59:1 pour `accent-ink`.
- **Aucun filet, aucune bordure.** La première version en avait neuf : une
  bordure au-dessus de chaque ligne, une sous la dernière, et un filet de
  liaison au milieu de chacune. Ça venait d'une table des matières, où le filet
  sert à traverser un grand vide entre un titre à gauche et un numéro de page
  à droite. **Ici il n'y a pas de vide à traverser** : la flèche suit le nom
  sur la même ligne, à une chasse de distance. Le filet ne reliait rien qui
  fût séparé ; il ajoutait une ligne par entrée.
- **Ce qui sépare les entrées est l'espace, et rien d'autre.** Quatre lignes de
  texte alignées à gauche, drapeau à droite. C'est aussi ce qui évite la
  grande zone vide à droite des noms courts : « Huntingdon » ne tire plus un
  trait sur 900 px pour rejoindre son chiffre.
- **La zone cliquable épouse le texte** (`w-fit`). Sur toute la largeur,
  survoler le vide à droite d'« Huntingdon » allumait la ligne entière — ça
  promet un lien là où il n'y a rien à lire.
- **Le serif d'affichage, deuxième apparition sur tout le site** (l'autre est
  le titre du hero). Il est réservé à ce qui se lit comme un titre, jamais à
  une donnée.
- **Le titre de section est deux fois plus grand que les noms.** Il a été à
  leur taille exacte — `text-h2` des deux côtés. Le changement de famille ne
  suffisait pas à dire lequel des deux était le titre, et la section se lisait
  comme cinq entrées dont la première était bizarre. Deux niveaux de lecture à
  la même taille n'en font qu'un.

  Le titre est donc passé en `text-display`, **la taille des trois autres
  titres de section de l'accueil** (« Nos projets en location », « Projets
  réalisés », « Une question sur un logement ? ») — qu'il n'aurait jamais dû
  quitter. La leçon tient en une ligne : **quand une section a l'air fausse,
  vérifier d'abord si son titre est à l'échelle de ses voisins.**
- **Chaque ligne est un lien**, vers son groupe sur `/projets`. Elle ne l'a pas
  toujours été : une liste qui a l'air d'un menu sans en être un est pire
  qu'une liste sobre — on essaie de cliquer, il ne se passe rien.
- **Le nombre de projets livrés ne s'affiche plus.** Il l'a fait, aligné à
  droite de chaque nom. La section répond à « où », pas à « combien », et le
  chiffre était déjà deux fois sur le chemin : dans « MauDev en chiffres »
  juste après, et en tête de chaque groupe de `/projets`, où le lien mène.
  Il sert encore à **trier** — les municipalités les plus fournies d'abord —
  mais il ne se lit plus.
- **Rien n'est saisi.** Villes et décomptes viennent de la collection, triés
  par nombre de projets puis par ordre alphabétique — sinon la liste bougerait
  au gré de l'ordre des fichiers. Le seul texte est le titre de section.
- **Sous `sm`, le décompte passe à la ligne** de lui-même (`flex-wrap`), pour
  les quatre entrées à la fois : la mise en page reste la même d'une ligne à
  l'autre. Mesuré à 375 px : 67 px chacune.
- **Au survol**, le nom, le décompte et la flèche passent à l'accent ensemble,
  et la flèche avance d'un cran — l'entrée réagit d'un bloc, pas par morceaux. Le `<a>`
  enveloppe toute la ligne : c'est lui qui prend le focus, et l'anneau d'accent
  encadre la ligne complète. Nom accessible vérifié :
  « Salaberry-de-Valleyfield 7 projets livrés ».

---

### Piliers

Les trois métiers de MauDev, sur `/notre-modèle` — et là seulement.

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  ⚇             │  │  ⛑             │  │  ⚷             │
│                │  │                │  │                │
│  Acquérir et   │  │  Financer et   │  │  Louer et      │
│  densifier     │  │  construire    │  │  administrer   │
│                │  │                │  │                │
│  MauDev cible  │  │  L'équipe gère │  │  MauDev accom… │
└────────────────┘  └────────────────┘  └────────────────┘
   surface-alt, rounded-panel, carte-survol — icone-survol sur l'icône
```

Deux motifs ont précédé celui-ci. **Trois cartes numérotées 01 / 02 / 03**,
le motif le plus reconnaissable qui soit — on le voit sur la moitié des sites
d'entreprise. Puis une **liste verticale à chiffre géant** (1, 2, 3 à 120 px),
qui réglait le cliché sans régler le fond : trois fois la même forme, qui ne
dit que l'ordre.

- **Une icône, pas un chiffre.** Un repère planté, un casque de chantier, une
  clé remise : chaque métier a une silhouette qu'on distingue d'un coup d'œil.
  L'ordre n'est pas perdu — c'est toujours un `<ol>`, et les trois entrées
  suivent le cycle réel d'un projet.
- **Les icônes vivent dans le composant**, pas dans la copie : ce sont des
  éléments de mise en page, pas de la donnée client. Elles suivent l'ordre des
  piliers (`ICONES` dans `Piliers.astro`).
- **L'accueil n'en porte plus de copie.** Il en affichait une version
  resserrée, en rangée de trois, juste sous le lien qui mène à
  `/notre-modele` : les mêmes mots, à un clic de distance. Une page d'accueil
  qui résume la page suivante retarde le clic sans rien ajouter. Sa place est
  prise par l'index des municipalités, qui dit quelque chose de neuf.
- **Deux props sont parties avec elle** — `compact` et `colonnes`. Une
  variante sans consommateur est du code qu'on maintient pour personne, et la
  copie correspondante (`landing.modele.piliers`, FR et EN) a été supprimée
  du même geste : `/notre-modele` a la sienne, dans son propre fichier.
- Il ne reste qu'une disposition : la **pile**, à côté du rendu. Trois blocs
  côte à côte dans une demi-largeur donneraient des colonnes de 180 px.


**La liste voisine ne se numérote pas.** « Pourquoi les investisseurs
choisissent MauDev » suit immédiatement les piliers. En grille de quatre blocs
égaux avec un chiffre en tête, la page portait deux listes numérotées à quelques
mètres l'une de l'autre — c'est précisément ce qui fait paraître une page
automatiquement générée.

Un premier remplacement en glossaire (`<dl>`, terme à gauche, définition à
droite) était juste mais terne : quatre lignes de texte gris, rien pour
accrocher l'œil.

La version retenue est un **bandeau de quatre colonnes hautes**, chacune ouverte
par une icône de 56 px :

```
─────────────   ─────────────   ─────────────   ─────────────
 ⌛            ◉            ▤            ◎
 Vision long   Transparence  Intégration   Discipline
 terme                       verticale     de marché
 Comme         L'entreprise  Trexco et…    MauDev se…
 entreprise…   privilégie…
```

- Les filets supérieurs s'alignent et forment **une seule ligne continue** en
  tête de bande. C'est ce qui distingue un bandeau d'une grille de boîtes.
- L'icône donne à chaque argument une silhouette qu'on retient mieux qu'un
  intertitre — et elle occupe le vide que laissait le glossaire.
- Icônes plus grandes (56 px) que celles des inclusions (40 px) : quatre
  arguments de fond ne se lisent pas comme une liste de commodités.
- L'ordre des icônes vit dans un tableau du composant, pas dans la copie : ce
  sont des éléments de mise en page, pas de la donnée client. Elles restent
  décoratives — le titre porte l'information.
- **Une icône doit rester lisible au trait à sa taille.** La lunette
  astronomique essayée pour « Vision long terme » devenait un gribouillis :
  remplacée par un sablier.
---

### Consentement aux témoins

Le site ne dépose rien par lui-même : aucune mesure d'audience, polices
auto-hébergées, aucun formulaire. Le seul tiers est la carte Google des pages
de projet. Le bandeau existe donc pour **une finalité unique**, d'où un seul
interrupteur. Le jour où de l'analytique s'ajoute, il faudra des catégories
séparées : la Loi 25 exige un consentement spécifique par finalité.

```
┌─────────────────────────────────────────────────────┐
│  Témoins et carte                                              │
│  Les pages de projet peuvent afficher…  [Refuser] [Accepter]  │
└─────────────────────────────────────────────────────┘
   fixed bottom · bg-inverse · rounded-panel · non modal
```

Quatre règles portent le mécanisme, et chacune est une exigence, pas un choix
esthétique :

- **Rien avant le choix.** L'`<iframe>` n'est jamais dans le HTML livré —
  vérifié sur le build : zéro balise. Elle est créée en JavaScript, et seulement
  sur `accepte`.
- **Refuser aussi simple qu'accepter.** Les deux boutons portent exactement la
  même classe. Un « Accepter » en aplat de couleur face à un « Refuser » en
  lien gris est précisément le motif que la loi vise.
- **Refus par défaut.** Aucune valeur stockée = rien ne se charge. Pas de case
  pré-cochée, pas de consentement déduit de la navigation.
- **Rétractation.** Le pied de page et l'encart carte rouvrent le bandeau ;
  passer à `refuse` retire l'`<iframe>` déjà affichée, sans rechargement.

Le bandeau n'est pas modal : il n'emprisonne pas le focus et ne masque pas la
page. Rien ne se charge tant qu'on n'a pas répondu, donc rien ne presse.

Le choix vit dans `localStorage` (`maudev.temoins`), pas dans un témoin : la
valeur n'a aucune raison de voyager vers le serveur, le site étant statique. La
lecture et l'écriture sont enveloppées — en navigation privée, l'accès lève, et
l'absence de valeur lisible retombe sur le refus, qui est le bon défaut.

Contrat entre les deux composants : `Temoins.astro` diffuse
`document.dispatchEvent(new CustomEvent('maudev:temoins', { detail }))`,
`Carte.astro` écoute. Au chargement, le bandeau rediffuse le choix déjà pris
pour que les cartes de la page s'y conforment sans reposer la question.

---

### Carte de localisation

Un encart carte dans la colonne laissée libre à droite de la description, sur
une page de projet à louer.

```
┌──────────────────────────┐
│           ⌗            │   ← sans consentement : l'adresse reste lisible
│   82 rue Dalhousie     │
│      Huntingdon        │
│  La carte vient de…    │
│  [Modifier mon choix]  │
└──────────────────────────┘
  Ouvrir dans Google Maps
```

- **Pas de clé d'API.** `maps.google.com/maps?q=…&output=embed` suffit pour un
  repère et la carte de base, qui affiche déjà les commerces, écoles et parcs des
  environs — c'est ce qu'on entend par « points d'intérêt », et ça ne demande
  aucune liste rédigée à la main. L'Embed API officielle (clé requise) n'aurait
  d'intérêt que pour piloter le zoom ou lancer une recherche précise.
- **Rendue seulement quand le projet a une adresse civique.** La requête est
  dérivée de `adresse` + `ville` : aucun champ ajouté au schéma. Un repère posé
  sur le centre-ville parce qu'on ne connaît que la municipalité serait une
  précision inventée — Rivière-Beaudette n'a donc pas de carte.
- **Refuser ne coûte pas l'information.** L'adresse et le lien « Ouvrir dans
  Google Maps » restent affichés dans tous les cas ; le lien ne charge rien.
- La langue de la carte suit celle de la page (`hl`).


---

### Grille d'inclusions

Les commodités du projet — thermopompe, quartz, ascenseur, Wi-Fi, stationnement.

```
     ❄              ▤              ⇅
 Thermopompe    Comptoirs      Ascenseur
                de quartz

     ≈              ⚡              □
 Échangeur      Hydro          Wi-Fi
   d'air        inclus

   grid-cols-2 sm:grid-cols-3 · 9 items max · gap-y-14
```

- Icônes **SVG au trait** (Lucide), **56 px**, `text-accent-ink`,
  `stroke-width 1.5`. Jamais d'emoji.
- **Icône au-dessus, libellé centré dessous.** À 40 px à côté du texte, la
  grille se lisait encore comme une colonne de puces alignées à gauche. En
  bloc centré, l'icône porte l'élément au lieu de le décorer.
- **Le trait par défaut est à 2** (`Icon.astro`), comme chez Lucide. Il avait
  été affiné à 1.5 : à côté d'un texte en Switzer et de titres semi-gras, les
  icônes disparaissaient — elles se lisaient comme un filigrane plutôt que
  comme un élément de la page. Les SVG écrits en ligne (flèches, croix,
  chevrons) suivent la même valeur.
- Le trait ne grossit toujours pas avec l'icône : au-delà de 40 px on
  l'affine d'un demi-point via la prop `stroke` — à 56 px, `2` devient une
  gravure.
- **Neuf items au maximum** (`GRILLE_MAX` dans `ProjectDetail.astro`) : trois
  colonnes, trois rangées, une section qui tient dans un écran. Le surplus
  n'est pas jeté — il est listé sous la grille après `t.inclusionsPlus`. La
  coupure suit l'ordre du YAML, donc celui du client.
- **Aucun filet, aucun fond de cellule.** Dalhousie n'a que quatre inclusions :
  toute cellule tracée dessine la dernière rangée aux trois quarts vide.
  L'espace seul la laisse invisible.
- Libellé en `text-lead text-ink`, centré sous l'icône, `text-balance`.
- Les inclusions payantes portent un suffixe `($)` en `text-ink-muted` — c'est
  la convention déjà utilisée par le client dans ses descriptifs, on la garde.
- Icônes décoratives (`aria-hidden`) : le libellé texte porte déjà l'information.

---

### Boutons et liens

**Sur l'accueil, les appels à l'action ne sont pas des boutons. Ce sont des
seuils.** Ailleurs, ce sont des boutons — voir plus bas.

**Primaire** `bg-accent text-on-accent` · `hover:bg-accent-hover` · `px-7 h-14`
— **Secondaire** `border border-line-strong text-ink` · `hover:bg-surface-hover`,
mêmes dimensions. Angles vifs, comme tout le reste (§ 4).

```
 Voir les logements  3 projets · 100 logements  [ →  ]

 444 px à 1 440, soit 35 % de la grille · [ → ] = case de 44 px
 Au survol : l'accent balaie depuis la gauche, le texte passe
 en `on-accent`, la flèche avance de 10 px — dans sa case.
```

Le bouton rempli à coins arrondis a été essayé, puis mis au carré : les deux
avaient l'air génériques, et pour la même raison. **C'est la forme qui est
banale, pas le rayon.** Un rectangle de 180 px avec un libellé centré est le
même objet sur tous les sites du monde ; l'arrondir ou l'aplatir n'y change
rien.

Le seuil (`Seuil.astro`) dit autre chose :

- **Il fait la largeur de son contenu** (`w-fit`), pas celle de la grille, et
  porte son libellé en `text-h3`. Pleine largeur, le filet traversait l'écran
  pour un lien de six mots et le libellé se retrouvait à un écran de sa propre
  flèche. 444 px à 1 440, 320 à 375.
- **`text-h3`, pas `text-h2`.** À 50 px le libellé pesait autant que le titre
  de section qui le précède, et une page ne peut pas avoir deux voix aussi
  fortes. À 30 px il reste au-dessus du corps courant — c'est un passage, pas
  un paragraphe — sans concurrencer ce qui l'annonce. La rangée fait 80 px de
  haut au lieu de 119.
- **Il pose une donnée réelle à droite** — « 3 projets · 100 logements »,
  l'adresse courriel — calculée depuis la collection, jamais « en savoir plus ».
- **La cible reste large.** À 375 px : 320 × 107 px contre 180 × 56 pour un
  bouton, plus de trois fois l'aire, sans occuper une section.
- **Le survol remplit, il ne teinte pas.** `scale-x` sur une couche en
  `origin-left` : une transformation, composée par le GPU, pas une animation de
  couleur qui repeint à chaque image. En mouvement réduit, la règle globale de
  `global.css` la ramène à un basculement instantané.
- **Aucun ornement au repos.** Un filet au-dessus et un en dessous avaient
  été essayés : deux traits horizontaux clairs posés sur la photo du hero
  dessinaient une boîte là où on voulait un passage, et ils entraient en
  concurrence avec les vraies séparations de la page. Restent le libellé, sa
  donnée et la flèche ; c'est l'aplat au survol qui donne la limite, au moment
  où elle sert.
- **L'aplat déborde de 16 px de chaque côté** (`-inset-x-4`) pour que le
  libellé respire dedans sans quitter la grille. À `inset-0` le « V » touchait
  le bord ; le rentrer avec du `padding` l'aurait décalé du titre au-dessus.
  Le débordement tient dans la gouttière — 121 px à 1 440, 20 px à 375.
- **La flèche (28 px) a sa propre case de 44 px**, plus large qu'elle de la
  distance qu'elle parcourt. Elle avançait auparavant depuis le bord du lien et
  sortait du filet — ce qui se lit comme un désalignement, pas comme un
  mouvement. Ici elle glisse à l'intérieur de sa case : au repos comme au
  survol, elle reste en deçà du bord (−6 px mesurés au plus avancé).
- Pas d'`overflow-hidden` : `inset-0` borne déjà la couche de remplissage, et
  rien ne dépasse qu'il faudrait rogner.

**Le seuil ne vit que sur `/`.** Il a d'abord été posé sur les cinq pages :
répété partout, il cessait d'être un moment pour devenir un gabarit, et sur une
page intérieure il prenait la place d'une section pour un lien de bas de page.
Deux occurrences, toutes deux sur l'accueil : le hero et la section contact.

Partout ailleurs, boutons : `/a-louer`, `/projets`, `/notre-modele`, les pages
projet et le formulaire. Le contraste fait partie du propos — l'accueil s'écarte
délibérément du reste du site (§ 4, *Page d'accueil, direction à part*), et
c'est ce qui donne son rôle à chacune.

**La barre de navigation, elle, n'a plus de bouton du tout.** « Nous joindre »
était un aplat vert : le seul objet plein de la barre, il tirait l'œil plus fort
que l'indication de la page où l'on se trouve. Il est désormais au format exact
des autres entrées — même corps, même graisse, même hauteur de 44 px, même filet
transparent, même survol vers l'accent.

Une différence subsiste, invisible : il ne prend jamais le filet `border-accent`
de l'entrée active. Un `mailto:` n'est pas une page, on n'y « est » jamais.

`Seuil.astro` n'accepte donc **que deux appels dans tout le dépôt**. En ajouter
un troisième ailleurs annule la règle.

Reste valable partout :

- Hauteur minimale 44 px, y compris sur desktop.
- Transitions 150–500 ms. Un changement d'état instantané se lit comme un bug.
- `cursor-pointer` sur tout élément cliquable.
- Jamais de bouton uniquement iconique sans `aria-label`.
- **Les pastilles fléchées des cartes n'ont pas de contour.** Sur `/a-louer` et
  sur le carrousel de l'accueil, la flèche d'une carte s'emplit au survol —
  accent sur fond de section, clair sur photo. Le contour au repos dessinait une
  boîte autour d'une flèche qui n'est pas un bouton séparé : c'est la carte
  entière qui est le lien, la pastille n'en est que le signe. Même raisonnement
  que le seuil — l'aplat suffit à marquer l'état, il n'a pas besoin d'un cadre
  pour l'annoncer.

  Les flèches de navigation des carrousels gardent le leur : ce sont de vraies
  commandes, elles doivent être visibles avant qu'on les vise.

### Le survol mène à l'accent, il ne souligne pas

**Règle unique, tout le site : survoler quelque chose de cliquable l'amène à
l'accent.** Nom de projet, lien de navigation, lien de pied de page, sélecteur
de langue, retour de hero, « Voir les plans », pastille fléchée des cartes —
tous répondent de la même façon.

| Surface | Jeton de survol | Contraste |
|---|---|---|
| Claire | `hover:text-accent-ink` | 10.71:1 |
| Sombre | `hover:text-accent-on-inverse` | 8.07:1 |
| Déjà en accent | `hover:text-accent-hover` | 7.30:1 |
| Pastille qui s'emplit | `group-hover:bg-accent` + `text-on-accent` | 10.71:1 |

La troisième ligne est celle qu'on oublie : un élément **déjà** en accent ne
peut pas passer à l'accent au survol — il ne se passerait rien. Il va au vert
plus clair du survol d'aplat.

**Le soulignement au survol a été retiré partout.** Il faisait sauter la ligne
de base sur les grands titres de `/a-louer`, et il disait « lien » sur un
élément déjà manifestement cliquable.

**Ce qui reste souligné : les liens en pleine prose**, et ils le sont en
permanence — dans un paragraphe, le soulignement *identifie* le lien au lieu de
réagir à la souris. Les distinguer par la couleur seule échouerait au critère
WCAG 1.4.1 (« utilisation de la couleur »). Leur survol suit quand même la
règle : la couleur passe à `accent-hover`, filet compris.

```
Lien en prose   text-accent-ink underline underline-offset-4
                decoration-line
                hover:text-accent-hover hover:decoration-accent-hover
```

**Prendre rendez-vous pour une visite.** L'action qu'on veut déclencher sur une
page de projet. Elle apparaît trois fois, en seuil à chaque fois : dans le hero
à hauteur d'œil ; dans une bande `inverse` juste après les tarifs ; et au pied
de page, pour ceux qui ont tout lu avant de se décider.

La bande du milieu existe parce que sur Hermine le formulaire est à plus de six
écrans du hero : qui décide en lisant les prix n'a plus rien sous la main. Elle
sépare en même temps deux sections claires consécutives. Son titre est
`contactTitle` (« Intéressé par ce projet ? ») et non `visitCta` — un titre et
un bouton qui portent le même texte se lisent comme un doublon. « Écrire à MauDev » passe en secondaire à côté : c'est l'option de
qui a une question avant de se déplacer.

La cible vit dans `VISITE.url` (`src/i18n.ts`) et recevra le formulaire Google.
Tant qu'elle vaut `undefined`, `visiteHref(nom)` retombe sur un courriel dont
l'objet porte déjà le nom du projet — un bouton qui ne mène nulle part vaut
moins qu'un `mailto:`. Renseigner l'URL bascule tous les boutons du site.

---

### Pied de page

Sur `inverse` — un cran plus sombre que la page, il la ferme et fait écho au
hero.

```
┌──────────────────────────────────────────────────────────────┐
│  [◼] MauDev                                                  │
│  Une phrase de positionnement.        À louer      MauDev    │
│                                       Hermine      Notre modèle│
│  450 000-0000                         Dalhousie    Projets   │
│  info@mau-dev.ca                      …            Nous joindre│
│  Adresse, Québec                                             │
│                                                              │
│  ────────────────────────────────────────────────────────────│
│  © 2026 MauDev            Politique de confidentialité   FR|EN│
└──────────────────────────────────────────────────────────────┘
   bg-inverse · text-on-inverse-muted · py-16 md:py-20
   titres de colonne : text-label text-on-inverse (casse normale)
   liens : hover:text-on-inverse · filet : border-line-inverse
```

- La colonne « À louer » est **générée depuis la content collection** : ajouter
  un projet le fait apparaître au footer sans toucher au composant.
- Sélecteur de langue répété en bas — utile sur mobile après un long défilement.
- Coordonnées en `<address>` avec des liens `tel:` et `mailto:` réels.

---

## 6. Hero vidéo (landing page)

Le client fournira la vidéo plus tard. L'intégration et le repli sont conçus
maintenant, pour que l'arrivée du fichier soit un remplacement d'asset et non une
refonte.

### Structure

```
┌──────────────────────────────────────────────────────────────┐
│  [nav transparente par-dessus]                               │
│                                                              │
│                                                              │
│              vidéo en fond, object-cover                     │
│              voile scrim/55 par-dessus                       │
│                                                              │
│   DES LOGEMENTS NEUFS                    ← text-display      │
│   PENSÉS POUR Y VIVRE.                      text-on-inverse  │
│                                                              │
│   Chapeau sur une ou deux lignes.        ← text-lead         │
│                                                              │
│   [ Voir les projets → ]  [ Notre modèle ]                   │
│                                                              │
│                              ⏸  ← contrôle, bottom-right     │
└──────────────────────────────────────────────────────────────┘
   min-h-[85svh] · max-h-[900px] · contenu en bas à gauche
   px-5 md:px-8 lg:px-12 · pb-16 md:pb-24
```

### Comportement

```html
<video
  poster="/hero-poster.jpg"
  preload="none"
  muted
  playsinline
  loop
  autoplay
  aria-hidden="true"
  tabindex="-1"
>
  <source src="/hero.webm" type="video/webm" />
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

- **`poster` obligatoire.** C'est lui qu'on voit tant que la vidéo n'est pas
  chargée — et c'est lui qu'on voit *tout le temps* aujourd'hui, puisque la
  vidéo n'existe pas encore. Le placeholder est donc un vrai visuel du projet
  Hermine, pas un rectangle gris : la page doit être présentable au client avant
  livraison de la vidéo.
- **`preload="none"`.** La vidéo ne se télécharge pas avant d'être visible.
- **`muted` + `playsinline`** : sans les deux, la lecture automatique est
  bloquée sur mobile.
- **`aria-hidden` + `tabindex="-1"`** : purement décoratif, hors de l'ordre de
  tabulation.
- **Bouton pause/lecture visible en bas à droite**, 44 × 44 px, fond
  `scrim/60`, icône `page`, `aria-label` explicite. Une vidéo en boucle sans
  moyen de l'arrêter est un problème d'accessibilité, pas un détail.
- **Mise en pause hors écran** via `IntersectionObserver` — pas de vidéo qui
  tourne pendant que l'utilisateur lit le bas de la page.
- **`prefers-reduced-motion: reduce` → la vidéo ne démarre pas**, le `poster`
  reste affiché. À gérer en JS (`matchMedia`), l'attribut `autoplay` ignore les
  requêtes média.

### Lisibilité — deux voiles, mesurés

Les voiles ne sont pas décoratifs. **Le voile ne connaît pas le plan qu'il
couvre** : une vidéo change de cadrage, de lumière et de saison, et le client
peut en livrer une autre demain. C'est donc lui qui doit tenir le contraste,
jamais le hasard du plan.

| Voile | Valeur | Ce qu'il protège |
|---|---|---|
| Vertical | `bg-gradient-to-t from-scrim/88 via-scrim/62 to-scrim/38` | Le titre, qui fait trois lignes et monte jusqu'au milieu du cadre |
| Latéral | `bg-gradient-to-r from-scrim/45 to-transparent to-70%` | La colonne de gauche, où vit le texte |

Les deux ont été fixés **à la mesure**, pas à l'œil : cinq images tirées du
plan, redessinées dans un canevas au cadrage exact du hero, puis le ratio de
contraste calculé **derrière chaque pixel de chaque glyphe**, en composant
l'opacité des deux dégradés à la hauteur et à l'abscisse du pixel.

Ce que la mesure a trouvé, et qu'un coup d'œil ne trouve pas :

- **Le voile vertical était trop faible.** À `85/45/25`, **41 % des pixels de
  la première ligne** tombaient sous 3:1, dans le ciel. Le réglage d'origine
  supposait un titre ancré dans le tiers bas ; celui-ci monte au milieu, là
  où le voile n'était qu'à 41 %. À `88/62/38` : 0 %.
- **Le voile latéral coûte moins cher que d'assombrir tout le cadre.** Le
  titre est à gauche, le sujet du plan à droite. Monter le voile vertical
  jusqu'à `92/78/50` réglait le contraste et tuait l'image. Un voile latéral
  à 45 % qui s'éteint à 70 % de la largeur fait le même travail sur le tiers
  de la surface : 0,35 % → **0,11 %**.
- **Ce qui reste est le soleil rasant à travers les arbres** — quelques
  dizaines de pixels sur un titre de 130 px. Aucune valeur de voile ne le
  supprime sans éteindre le plan.

**La couleur d'accent du titre est le facteur limitant, pas le voile.**
`display-accent` est un ton moyen : il échoue contre un fond moyen (une dalle
de béton au soleil), là où le blanc du reste du titre passe partout. C'est
aussi ce qui a décidé du segment retenu — voir plus bas.

### Sur mobile

**La vidéo joue aussi sur téléphone.** Elle ne jouait que sur `md` et plus, pour
épargner les données cellulaires. Le calcul a changé quand le fichier est
arrivé : **1,9 Mo pour douze secondes**, moins qu'une seule photo de galerie
non optimisée. Priver de ce que la page a de mieux l'écran qui la voit le plus
souvent coûtait plus que ces 1,9 Mo.

Ce qui n'a pas changé, et qui rend la chose tenable :

- **La source n'est attachée qu'au moment de démarrer.** Aucune balise
  `<source>` dans le HTML : elles sont créées en JS quand le hero entre dans le
  cadre. `preload="none"` n'est qu'une indication ; ne pas écrire la source est
  une garantie.
- **`prefers-reduced-motion` reste un veto.** C'est le seul garde-fou qui
  subsiste, et il coupe tout — pas de source, pas de requête.
- **La lecture s'arrête dès que le hero sort du cadre.** Rien ne tourne pendant
  qu'on lit le bas de la page.
- **Le poster tient seul** si le réseau lâche ou si le navigateur refuse de
  lire. Le bouton passe alors en « lecture » plutôt que de disparaître.

**Le poster redevient la première image du plan, aux deux tailles.** Le
téléphone a eu son image à lui — un séjour meublé — tant que la vidéo n'y
jouait pas : le poster **était** le hero, et un plan de drone vu petit et
immobile devient un champ. Trois extérieurs avaient été essayés avant lui :

| Essai | Pourquoi écarté |
|---|---|
| Le plan de drone | Vu petit et immobile, il devient un champ |
| Les deux façades d'Hermine | Poteau électrique en travers, camionnette, cônes : c'est un chantier |
| Le 4A-B Henderson | Propre, mais un bâtiment vu de la rue reste un bâtiment vu de la rue — et il n'est livré qu'en 1 527 px |

Ce raisonnement tombe avec la vidéo. Le poster n'est plus le hero : c'est la
demi-seconde avant qu'il commence. Il doit donc être **la première image du
plan**, sinon le démarrage est une coupure. La prop `posterMobile` existe
toujours dans `HeroVideo` — elle sert le jour où un hero voudra deux cadrages —
mais l'accueil ne la passe plus.

**`sizes` vaut `300vw` sous 768 px, et ce n'est pas une faute de frappe.** Le
cadre du téléphone est deux fois plus haut que large ; la source est un
paysage. `object-cover` la met donc à l'échelle par la **hauteur**, et sa
largeur rendue vaut environ trois fois celle de la fenêtre. `sizes` ne
décrivant qu'une largeur, un honnête `100vw` fait choisir au navigateur une
variante trois fois trop petite — mesuré : il prenait le fichier de 375 px pour
un cadre de 718 px de haut. Sur un cadre paysage (le desktop), la largeur
redevient la contrainte et `100vw` est juste. D'où le `sizes` en deux temps sur
l'image unique :

```astro
sizes="(min-width: 768px) 100vw, 300vw"
```

**Le voile latéral disparaît sous `md`.** Il protège une colonne de gauche ;
sur téléphone le titre prend toute la largeur, donc le voile aussi — il ne
protégeait plus rien en particulier et assombrissait toute l'image. Le voile
vertical suffit : contraste mesuré derrière chaque glyphe, **sur cinq images du
plan en mouvement** et non sur une photo fixe — 0,03 % des pixels sous 3:1 au
pire, minimum 2,96:1 sur un titre de 52 px.

**Le titre du téléphone est passé à 52 px, et à cinq lignes.** Il a longtemps
été tenu à 46 — la dernière valeur qui gardait quatre lignes à 375 px. La
cinquième ligne est maintenant acceptée : le titre est ce que le téléphone voit
en premier, et quatre lignes tièdes disent moins qu'un titre qui remplit
l'écran. **Ce qui décide la limite n'est plus le compte de lignes mais la place
restante sous le titre** — le seuil doit tenir dans le premier écran, vérifié à
375 × 667, le plus petit téléphone encore courant.

**La flèche du dernier seuil disparaît aussi** (`flecheDesktop`). Au bas d'une
page qu'on vient de dérouler au pouce, une flèche vers la droite promet une
suite qui n'existe pas. Celle du hero reste : là, elle annonce bien une page.

### État actuel

Le composant est en place (`src/components/HeroVideo.astro`) et **la vidéo de
l'accueil est livrée** : `public/videos/1216-rue-principale/1216-rue-principale.mp4`,
12 s, 1280×720, 1,9 Mo, sans piste audio.

Les cinq chemins ont été vérifiés au navigateur :

| Situation | Comportement vérifié |
|---|---|
| Aucune vidéo configurée | Aucun élément `<video>` émis, aucun bouton, l'image seule |
| Vidéo configurée, desktop | Source attachée en JS, lecture auto, fondu, bouton pause visible |
| Mobile (< 768 px) | **Zéro requête réseau** pour la vidéo, image seule |
| `prefers-reduced-motion: reduce` | **Zéro requête réseau**, aucune lecture |
| Source injoignable | Écouteur `error` : bouton retiré, l'image reste |

**Pour activer la vidéo** : déposer les fichiers dans `public/videos/` et
passer `mp4` (et `webm`) à `<HeroVideo>` dans `src/components/Landing.astro`.
Rien d'autre — le composant émet alors la balise, le bouton pause, et applique
les garanties du tableau ci-dessus.

**Les pages projet utilisent le même composant.** Dès qu'une fiche renseigne
`video: { webm, mp4, poster }`, son hero bascule de l'image fixe à la vidéo,
avec les mêmes garanties. `poster` est optionnel : à défaut le hero reprend
`couverture`, mais un poster tiré de la première image de la vidéo évite le
saut visuel au démarrage. Une seule source suffit — H.264 est lu partout, le
WebM n'est qu'un gain de poids. Les vidéos vivent dans `public/videos/<slug>/` — Astro
n'optimise pas la vidéo, et `src/assets` ne sert qu'aux fichiers qu'il traite.

### Du master à la boucle

Le client livre des masters de drone : celui de Rivière-Beaudette faisait
**1,48 Go** — 3840×2160, H.264 à **249 Mb/s**, 47 s, deux pistes audio. Un
fichier pareil déposé dans `public/` **part dans `dist/` à chaque build** :
Astro y copie tout, sans regarder. Vérifier `du -sh dist` après avoir ajouté
un média. Les masters vivent dans `reference/NEW/`, qui est ignoré par git.

La recette, la même que pour Hermine :

```
ffmpeg -ss <debut> -t 12 -i master.mp4   -vf "scale=1280:-2" -r 30   -c:v libx264 -profile:v high -pix_fmt yuv420p   -crf 26 -maxrate 1400k -bufsize 2800k -preset slow   -movflags +faststart -an -sn -dn   public/videos/<slug>/<slug>.mp4
```

`-an` n'est pas une économie de poids : le hero est **muet par construction**,
une piste audio n'y serait jamais lue. `+faststart` remonte l'index en tête du
fichier, sans quoi la lecture attend le téléchargement complet.

**Le choix du segment se mesure aussi.** Les 47 s ont été échantillonnées
toutes les 2 s et chaque image passée au calcul de contraste décrit plus haut.
L'écart entre le meilleur et le pire segment est d'un facteur **12** — 4,1 %
de pixels sous 3:1 à 24 s (le titre passe sur une dalle de béton au soleil),
0,35 % à 33 s (des arbres sombres derrière le titre, le chantier à droite).
Un plan de hero se choisit d'abord sur ce qui se trouve **derrière le texte**.

Le poster est la **première image du segment retenu**, pas une image au hasard :
le démarrage de la vidéo cesse d'être une coupure.

### Format à demander au client

16:9, 8–15 s en boucle sans coupe franche, pas de son utile, pas de texte
incrusté (le site est bilingue), 1920×1080 max, sous 3 Mo après compression.
Fournir en WebM (VP9) **et** MP4 (H.264). À défaut, un master brut fait
l'affaire — il faut alors passer par la recette ci-dessus.

---

## 7. Content collection des projets

Objectif : **ajouter un projet = ajouter un fichier**. Aucun template, aucune
route, aucune traduction de composant à toucher.

### Choix de structure

**Un seul fichier par projet, pas un par langue.** Un projet immobilier est
composé à ~80 % de données indépendantes de la langue — adresse, nombre
d'unités, prix, photos, plans, dates. Dupliquer un fichier FR/EN dupliquerait
tout cela et garantirait une désynchronisation dès la première mise à jour de
prix. Seule la prose est bilingue, via des objets `{ fr, en }`.

**Fichiers `.yaml`, pas `.md`.** Le corps markdown ne servirait à rien : une page
de projet est une composition de blocs (galerie, tableau, inclusions), pas un
article. Les descriptions sont des tableaux de paragraphes.

```
src/content/projets/
  hermine.yaml
  dalhousie.yaml
  st-jean-baptiste.yaml
  riviere-beaudette.yaml
  ridge.yaml
  sainte-cecile.yaml

src/assets/projets/
  hermine/
    photos/   23 fichiers · 2400×1600 · jpg
    plans/    27 fichiers · 1650×1275 · png  ⚠ non identifiés (voir plus bas)
    renders/  12 fichiers · jpg              ⚠ non identifiés
```

Les images doivent vivre sous `src/` pour que `image()` les valide, connaisse
leurs dimensions et génère les variantes.

**Une seule taille par photo est conservée.** Le client a livré chaque photo en
six exemplaires (800 / 1200 / 2400 × jpg / webp). Astro dérive lui-même le
`srcset` et le WebP à partir d'une source unique ; importer les six aurait
multiplié le poids de `src/` par six et forcé l'optimiseur à retailler des
images déjà réduites. Seul le **2400 px JPG** — le plus grand original — est
déplacé. Les 115 dérivés restent dans `reference/assets/` : ils ne servent plus
au site, mais ce sont des fichiers livrés par le client, on ne les supprime pas
de notre propre chef.

### Deux blocages sur les médias

**Les plans ne sont pas identifiés.** `page-01.png` … `page-27.png` est un export
PDF brut. Le schéma exige un champ `type` par plan (« 4½ », « 5½ ») et il est
impossible de le remplir sans savoir quelle page correspond à quel logement.
À faire avant de câbler la galerie de plans : demander la correspondance au
client, ou l'établir en ouvrant les fichiers, puis renommer en
`hermine-plan-4-5.png`.

**Les renders non plus.** `img-002-000.jpg` … `img-009-026.jpg`, dont deux
formats panoramiques (1998×729) qui ne passeront pas en `aspect-square` dans la
galerie. À trier et renommer.

**Delahousie n'a aucun asset.** `reference/assets/DELAHOUSIE/` est vide malgré ce
qu'annonce CLAUDE.md. Le projet ne peut pas être publié : `couverture` est requise
par le schéma. À réclamer au client.

### Schéma

Le schéma vit dans **`src/content.config.ts`** — c'est la source de vérité, pas
ce document. Ce qui suit explique les décisions qu'il encode.

**Champs bilingues.** `bilingue` = `{ fr, en }`, les deux requis : un projet à
moitié traduit échoue au build, pas en production. `description` est un tableau
de paragraphes par langue plutôt que du markdown — les descriptifs du client
font 1 à 3 paragraphes de prose simple.

**`url`, pas `slug`.** Le champ de segment d'URL bilingue s'appelle `url` :
`slug` est réservé par le glob loader d'Astro, qui s'en sert pour l'identifiant
d'entrée. Un objet `{fr, en}` sur ce nom-là produit deux entrées d'id
`[object Object]` et une collision silencieuse.

**`statut` a trois valeurs**, pas deux :

| Valeur | Route | `couverture` |
|---|---|---|
| `location` | `/a-louer` | requise |
| `a-venir` | `/a-louer`, badge « Bientôt » | **optionnelle** |
| `realise` | `/projets` | requise |

`a-venir` existe pour les projets annoncés dont le client n'a fourni aucune
image — Dalhousie aujourd'hui. Sans lui, il faudrait soit rendre `couverture`
optionnelle partout (et publier des cartes vides), soit ne pas annoncer le
projet. Un `superRefine` applique la règle ; passer un projet à `location`
exige donc une image.

**Prix ET superficies sont des fourchettes** (`prixMin`/`prixMax`,
`superficieMin`/`superficieMax`), toutes optionnelles. Le relevé des plans
Hermine a montré qu'un même type varie fortement d'une unité à l'autre :

| Type | Unités | Superficies |
|---|---|---|
| 3 ½ | 11 | 618 – 690 p.c. |
| 4 ½ | 33 | 798 – 1082 p.c. |
| 5 ½ | 10 | 1084 – 1515 p.c. |

Un `superficie` unique aurait donc menti sur 33 logements. Le `superRefine`
refuse un max sans min, ou un max inférieur au min. `plans[].superficie` reste
une valeur simple : chaque fiche de plan porte une superficie exacte.

**`photos[]` porte `unite` et `categorie`** (`exterieur` · `interieur` ·
`commun` · `detail`). Sans ces champs, filtrer la galerie par type de logement
le jour où les 3 ½ seront photographiés obligerait à tout reprendre.

**`aConfirmer: string[]`** liste les champs non confirmés par le client
(l'adresse d'Hermine, le nom de Dalhousie). C'est un signal pour l'équipe,
jamais affiché au visiteur.


### Ce que le schéma garantit

| Contrainte | Effet |
|---|---|
| `statut` à trois valeurs | Un projet apparaît sur `/a-louer` **ou** `/projets`, jamais nulle part et jamais deux fois. |
| `couverture` requise dès que le projet est bâti | Impossible de publier une carte vide. Seul `a-venir` en est dispensé. |
| `bilingue` requis sur toute prose | Un projet à moitié traduit échoue au build, pas en production. |
| `prixMin`/`prixMax` optionnels | Hermine se publie sans liste de prix ; le template affiche « sur demande ». |
| Fourchettes cohérentes | `superRefine` refuse un max sans min, ou un max inférieur au min. |
| `.default([])` partout | Un projet minimal (nom, adresse, unités, couverture, résumé, description) suffit à générer une page complète. |
| `image()` | Astro vérifie que le fichier existe, connaît ses dimensions (donc pas de saut de mise en page) et génère les variantes WebP. |

### Routes

```
/a-louer                  ← statut === 'location' | 'a-venir'
/a-louer/[url]            ← même filtre, getStaticPaths sur url.fr
/projets                  ← statut === 'realise'
/en/for-rent              ← même collection, textes lus sur .en
/en/for-rent/[url]        ← getStaticPaths sur url.en

Les segments traduits (`a-louer` ↔ `for-rent`) vivent dans `src/i18n.ts`, avec
leur vérification dans `src/i18n.check.ts` (`node src/i18n.check.ts`).
```

Une seule collection alimente les quatre routes. Le champ `url` bilingue permet
des URL anglaises propres tout en gardant un seul fichier source, et c'est lui
qui rend le sélecteur de langue capable de pointer vers la page équivalente.

### Pages construites

| Route | Fichier | Nav |
|---|---|---|
| `/` · `/en/` | `pages/index.astro` + `pages/en/index.astro` | flottante |
| `/a-louer` · `/en/for-rent` | `pages/a-louer/index.astro` + `pages/en/for-rent/index.astro` | opaque |
| `/a-louer/[projet]` · `/en/for-rent/[projet]` | `pages/a-louer/[projet].astro` + équivalent EN | flottante |
| `/projets` · `/en/projects` | `pages/projets.astro` + `pages/en/projects.astro` | opaque |
| `/notre-modele` · `/en/our-model` | `pages/notre-modele.astro` + `pages/en/our-model.astro` | opaque |
| `/confidentialite` · `/en/privacy` | `pages/confidentialite.astro` + `pages/en/privacy.astro` | opaque |

Les deux langues partagent le même composant de corps (`RentalList.astro`,
`ProjectDetail.astro`, `Modele.astro`, `Confidentialite.astro`) et ne diffèrent que par leur `locale` : une version ne
peut pas prendre du retard sur l'autre.

Les routes dynamiques passent `lastSegment` au layout — le segment de projet
dans l'autre langue, que le sélecteur ne peut pas déduire d'une table statique.

**Les projets réalisés n'ont pas de page dédiée** (CLAUDE.md § Structure du
site). Leur carte, `CompletedCard.astro`, n'est donc pas un lien : une carte
cliquable qui ne mène nulle part est pire qu'une carte inerte. Elle affiche des
`faits` libres plutôt que des champs fixes — les 11 réalisations décrivent des
choses hétérogènes (surface commerciale, locataire ancré, phases livrées) qu'un
jeu de colonnes n'aurait pas couvertes.

**Toutes les sections d'une fiche projet sont conditionnelles.** Dalhousie n'a
ni photos, ni plans, ni superficies : sa page rend 4 sections au lieu de 5,
son tableau n'a pas de colonne « Superficie », et aucune visionneuse n'est
émise dans le DOM. Une section vide se remarque plus qu'une section absente.

### Ajouter un projet

1. Déposer les images dans `src/assets/projets/<nom>/`.
2. Créer `src/content/projets/<nom>.yaml`.
3. Renseigner les champs requis : `nom`, `statut`, `url`, `adresse`, `ville`,
   `unites`, `resume`, `description`, `couverture` (sauf si `statut: a-venir`).
4. C'est tout. Cartes, page dédiée, entrée de footer et plan de site suivent.

---

## 8. Mouvement

Réglage **subtil**. Le mouvement sert à orienter, pas à impressionner : un
visiteur cherche un logement, pas une démo.

| Élément | Traitement |
|---|---|
| Apparition de section | `animate-rise` — opacité + 12 px de translation, 400 ms, `ease-out-natural`, déclenché par `IntersectionObserver`, une seule fois |
| Survol d'un bloc de contenu | `carte-survol` — 6 px de montée + `shadow-lift`, 500 ms `ease-doux` |
| Survol de l'icône d'un bloc | `icone-survol` — 4 px de montée + `scale(1.08)`, sur `.group:hover` |
| Survol d'une photo | `scale(1.04)`, 700 ms `ease-doux` |
| Survol de bouton | `transition-colors duration-200` |
| Changement de page | `<ClientRouter />` d'Astro, transition en fondu |

- **Les blocs réagissent aussi, même sans être cliquables.** Piliers, raisons,
  chiffres, types de logement : aucun n'est un lien, aucun ne peut prendre le
  focus. Un site où seuls les liens bougent se lit comme un document. La
  réaction reste **purement décorative** — elle ne révèle rien qu'on doive
  lire, sinon l'information serait inatteignable au clavier et au doigt.
- **La recette est écrite une fois**, en `@utility` dans `global.css`
  (`carte-survol`, `icone-survol`). Cinq composants la partagent ; copiée cinq
  fois, elle diverge à la première retouche. Les deux neutralisent leur
  translation sous `prefers-reduced-motion`, où le changement de fond suffit.
- **Pas de GSAP.** Un fondu-montée et un survol de carte ne justifient pas 70 Ko
  de bibliothèque. Le token `--animate-rise` et `IntersectionObserver` couvrent
  le besoin.
- **Jamais d'animation de `width`, `height`, `top` ou `left`** — uniquement
  `transform` et `opacity`, qui ne déclenchent pas de recalcul de mise en page.
- **`prefers-reduced-motion` est déjà neutralisé globalement** dans
  `global.css` (`@layer base`). Toute animation ajoutée en JS doit vérifier
  `matchMedia('(prefers-reduced-motion: reduce)')` elle-même.
- **Pas de parallaxe.** Coûteux, fragile sur mobile, et sans bénéfice ici.

---

## 9. Images

- **Toujours `<Image />` ou `<Picture />` d'Astro**, jamais `<img>` brut : le
  format WebP, le `srcset` et les dimensions intrinsèques sont générés
  automatiquement.
- Ratios imposés : cartes `4/3`, galerie `square`, plans `4/3` en
  `object-contain`, hero `object-cover`.
- `loading="lazy"` partout **sauf** la couverture du hero et la première image
  de galerie (`eager` + `fetchpriority="high"`).
- Les dimensions sont toujours réservées — objectif CLS < 0.1.
- `alt` descriptif en FR et EN, jamais le nom de fichier. Une image purement
  décorative porte `alt=""`.

---

## 10. Avant de livrer une page

```
[ ] La page existe en FR et en EN, sans mélange de langues
[ ] Le sélecteur de langue pointe vers l'équivalent exact, pas vers l'accueil
[ ] `lang` correct sur <html> + <link rel="alternate" hreflang> dans les deux
[ ] Aucune valeur hex ni valeur arbitraire dans le markup
[ ] Aucun `text-accent` (utiliser `text-accent-ink`)
[ ] Bordures de champs en `border-line-input`
[ ] Contraste du texte ≥ 4.5:1 (voir §2)
[ ] Cibles tactiles ≥ 44 × 44 px, espacées d'au moins 8 px
[ ] Focus visible au clavier sur chaque élément interactif
[ ] Aucun anneau de focus au doigt ni à la souris — `:focus-visible`, jamais
    `:focus`, et aucun conteneur défilant focalisable
[ ] Icônes SVG uniquement, aucun emoji
[ ] `alt` descriptif sur chaque image porteuse de sens
[ ] Une seule `text-display` par page
[ ] Chiffres alignés en `num`
[ ] `prefers-reduced-motion` respecté
[ ] Aucun défilement horizontal à 375 px
[ ] Capture Playwright vérifiée à 375 · 768 · 1024 · 1440 px
```

# Palettes

Une seule est active à la fois. Elle est choisie par une ligne dans
`src/styles/global.css` :

```css
@import "./palettes/marine.css";  /* ← active */
/* @import "./palettes/terre.css"; */
```

Changer de palette = changer cette ligne. Rien d'autre : **aucun composant ne
nomme une primitive**, tout passe par les jetons sémantiques (`page`, `ink`,
`accent`, `scrim`…) que les trois fichiers définissent à l'identique.

| Fichier | Direction | Fond | Second fond | Accent |
|---|---|---|---|---|
| `terre.css` | Terre chaleureuse — la palette d'origine, dérivée du logo | crème `#efe7db` | brun `#241c17` | terracotta `#b4552d` |
| `pin.css` | Pin — mêmes neutres, accent vert | crème `#efe7db` | brun `#241c17` | vert `#014421` |
| `marine.css` | **Marine — palette fournie par le client, active** | vert `#18554D` | sauge `#d7e5db` | saumon `#F69F96` |

**`marine` inverse le sens de lecture du site.** Les deux autres sont claires
avec du sombre en ponctuation ; `marine` est sombre, et alterne avec une sauge
pâle une section sur deux. Ce n'est pas un mode sombre — c'est un rythme de
section, documenté dans DESIGN.md § 4.

Deux conséquences pour qui reprend le fichier :

- **Les ombres sont dans la palette, pas dans `global.css`.** Leur densité
  dépend du fond : à 7 % d'opacité une ombre ne se voit pas sur un vert
  profond, et celles de `marine` sont deux fois plus denses.
- **`marine` définit deux jetons de fond clair** — `section-alt` et
  `section-accent`. Ce sont les seules surfaces pâles qu'une palette sombre
  nomme, et les sections qui les portent ajoutent l'utilitaire `zone-claire`
  (`global.css`), qui rebascule les quinze jetons du sous-arbre.

`--color-display-accent` est le jeton du titre du hero, posé sur le voile de la
vidéo. Les trois palettes le font suivre leur accent dans la variante qui tient
le voile — un accent dense y tombe sous 2:1.

## Ajouter une palette

Copier un des trois fichiers et remplacer les primitives. Les **jetons
sémantiques** doivent tous être définis, et chacun doit tenir le seuil de
contraste que les autres palettes tiennent au même endroit — les ratios sont
écrits en commentaire à côté de chaque jeton, et ils sont **calculés, jamais
estimés**.

Le plancher à ne pas franchir :

| Jeton | Sur | Seuil |
|---|---|---|
| `ink` | `page` | 7:1 |
| `ink-soft` | `page` | 6:1 |
| `ink-muted` | `page` **et** `surface-alt` | 4.5:1 |
| `on-inverse` | `inverse` | 13:1 |
| `on-inverse-muted` | `inverse` | 8:1 |
| `on-accent` | `accent` | 4.5:1 |
| `accent-ink` | `page` **et** `surface-alt` | 4.5:1 |
| `accent-on-inverse` | `inverse` | 4.5:1 |
| `line-input` | `page` | 3:1 |
| `available` | `page` | 4.5:1 |
| `on-inverse` | `scrim` à 70 % sur blanc | 4.5:1 |
| `display-accent` | `inverse` **et** `scrim` à 70 % | 3:1 (grand texte) |
| `accent` | `page` — **silhouette** d'un aplat | 3:1 |

Les deux derniers sont ceux qu'on oublie. `display-accent` est le voile posé
sur les vidéos et les photos de hero ; le pire cas est une image entièrement
blanche. La **silhouette** de l'accent est le contraste entre le bouton et ce
qui l'entoure : un bouton dont le texte passe mais dont le contour ne se
détache pas du fond est un bouton qu'on ne voit pas. C'est ce qui interdit le
saumon en zone claire — 1.56:1 sur la sauge, contre 7.95:1 pour le vert
profond.

Si la palette alterne, la même grille doit être tenue **deux fois** : une fois
dans la zone sombre, une fois sous `zone-claire`.

## Vérifier

Après un changement de palette, ouvrir une page qui porte du texte sur toutes
les surfaces — `/a-louer/hermine` les a toutes, dans les deux zones — et
mesurer dans le navigateur, pas à l'œil. Le script utilisé pour cette
vérification parcourt chaque nœud de texte, remonte jusqu'au premier fond
opaque, et compare au seuil qui correspond au corps et à la graisse. Zéro échec
attendu, à 375, 768 et 1440 px.

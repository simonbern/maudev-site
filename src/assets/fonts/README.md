# Switzer

Police du site. Servie depuis ce dossier par le provider **local** d'`astro:fonts`
(voir `astro.config.mjs`) : aucune requête vers un tiers, et Astro génère les
replis métriques, donc pas de saut de mise en page au chargement.

## Fichiers attendus

Déposer les `.woff2` ici. Deux formes acceptées, la première l'emporte :

**Variable — préférée, un seul fichier**

```
Switzer-Variable.woff2
```

**Statique — quatre fichiers**

```
Switzer-Regular.woff2    400
Switzer-Medium.woff2     500
Switzer-Semibold.woff2   600
Switzer-Bold.woff2       700
```

Les noms viennent de l'archive Fontshare. Si les tiens diffèrent, renomme-les
plutôt que de toucher à la config — `astro.config.mjs` cherche exactement ces
noms et ignore le reste.

Seul le `.woff2` est utile : tous les navigateurs qui comptent encore le lisent,
et le `.ttf` de l'archive pèse quatre fois plus.

## Tant que le dossier est vide

Le site retombe sur Figtree, chargée depuis Google Fonts. La bascule est
automatique : dès qu'un des fichiers ci-dessus est présent, le build passe sur
Switzer sans autre changement. `npm run build` affiche laquelle des deux est
active.

Ce repli existe pour que le dépôt reste constructible en attendant les fichiers.
Une fois Switzer en place, il peut disparaître — `astro.config.mjs` § Polices.

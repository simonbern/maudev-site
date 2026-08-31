# Playbook — site vitrine

Méthode de travail extraite d'un site vitrine mené de zéro à la livraison avec
Claude Code. Le document est **générique** : aucun nom de client, aucune
palette, aucune typo. Il décrit ce qui a fonctionné, dans quel ordre, et les
pièges qui ont coûté du temps.

À lire une fois avant de commencer, puis à piller.

---

## 1. Le squelette de `CLAUDE.md`

Ce fichier est ce qui empêche l'agent de dériver. Il est court, il est à la
racine, et il n'énonce que des règles vérifiables. Point de départ :

```markdown
## Développement

Serveur de dev en arrière-plan :

    astro dev --background

Gestion : `astro dev stop`, `astro dev status`, `astro dev logs`.

## Documentation

Documentation complète : https://docs.astro.build

Consulter ces guides avant de travailler sur les sujets liés :

- [Pages, routes dynamiques, middleware](https://docs.astro.build/en/guides/routing/)
- [Composants Astro](https://docs.astro.build/en/basics/astro-components/)
- [Contenu](https://docs.astro.build/en/guides/content-collections/)
- [Styles et Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internationalisation](https://docs.astro.build/en/guides/internationalization/)

# <CLIENT> — <une ligne : quoi, pour qui>

<Une phrase sur le rapport à l'existant : refonte complète, remise à neuf,
reprise partielle. Si le nouveau site ne doit rien devoir à l'ancien, le dire
ici et nulle part ailleurs.>

## Règles de contenu

- Ne jamais inventer de contenu : textes, prix, adresses, superficies, noms.
  Tout vient de `reference/` ou du client.
- `reference/client-brief.md` — la parole du client. Source de vérité première.
- `reference/assets/` — médias fournis, un dossier par entité. Utiliser ces
  fichiers directement.
- `reference/mirror/<domaine>/` — copie de l'ancien site. Sert **uniquement**
  à récupérer les informations existantes. Ne jamais reprendre son design, sa
  structure ni ses styles.
- `reference/inspo/` — inspiration visuelle uniquement. S'inspirer du layout et
  de la structure, jamais du contenu ni du branding.

## Règles de design

- Toutes les couleurs, typos et espacements viennent des tokens du thème
  Tailwind. Aucune valeur hex brute, aucune valeur arbitraire.
- Suivre `DESIGN.md`.
- Après avoir créé ou modifié une page, la screenshoter et vérifier le rendu
  avant de conclure.

## Langue

<Si bilingue :>
- Site bilingue <A>/<B>, <A> par défaut.
- Routing i18n d'Astro : `/` = <A>, `/<b>/` = <B>.
- Chaque page doit exister dans les deux langues avant d'être considérée
  terminée.
- Ne pas mélanger les langues sur une même page.

## Structure du site

<Une ligne par route, avec ce qui la distingue. C'est la carte que l'agent
relit à chaque prompt.>
```

### Pourquoi chacune de ces règles est là

- **La séparation de `reference/`** est ce qui rend l'interdiction d'inventer
  applicable. Sans dossiers distincts, « le mirror » et « le brief » sont le
  même tas, et un texte marketing de l'ancien site se retrouve présenté comme
  une information du client. Quatre dossiers, quatre statuts :

  | Dossier | Statut | Usage |
  |---|---|---|
  | `client-brief.md` | Parole du client | Vérité. Prime sur tout le reste. |
  | `assets/` | Fichiers livrés | À utiliser tels quels. |
  | `mirror/` | Ancien site | Informations seulement. Design interdit. |
  | `inspo/` | Références externes | Layout seulement. Contenu et marque interdits. |

- **« Ne jamais inventer »** est la règle la plus rentable du fichier. Un site
  vitrine est un document contractuel : un prix inventé, une superficie
  arrondie, une adresse plausible sont des problèmes juridiques, pas des
  approximations. Corollaire à écrire dans le schéma de contenu : un champ
  **facultatif** plutôt qu'un champ rempli au jugé, et un tableau
  `aConfirmer: []` pour marquer ce que le client doit valider.

- **Les tokens obligatoires** ne tiennent que si l'outil les impose — voir § 3.
  La règle écrite dans `CLAUDE.md` sert à ce que l'agent sache *pourquoi* le
  build refuse.

- **Le screenshot avant de conclure** est la seule règle qui attrape ce qu'aucun
  test n'attrape : un débordement à 375 px, un bloc qui a disparu, un texte
  illisible sur une photo. « Le build passe » ne veut rien dire sur un site
  vitrine.

---

## 2. La séquence de travail

L'ordre compte plus que la vitesse. Ce qui a fonctionné, dans cet ordre exact :

### Étape 0 — Rassembler avant d'écrire une ligne

Aspirer l'ancien site, ranger les assets fournis, écrire `client-brief.md` à
partir des courriels. Rien n'est plus coûteux qu'un site à moitié construit sur
des informations qu'il faut ensuite reprendre une par une.

Faire l'inventaire à ce moment-là : combien d'entités, quelles langues, quels
médias, quels champs varient d'une entité à l'autre. Cet inventaire devient le
schéma de l'étape 2.

### Étape 1 — Le système de design, seul et en entier

**Un prompt qui ne produit aucune page.** Uniquement `DESIGN.md` et les tokens.

C'est contre-intuitif et c'est la décision la plus rentable du projet. Un
système de design écrit *pendant* la première page est un système qui décrit
cette page ; il craque à la deuxième. Écrit seul, il pose l'échelle typo, les
espacements, les surfaces, les états, et les pages n'ont plus qu'à s'en servir.

`DESIGN.md` doit contenir le **raisonnement**, pas seulement les valeurs. « Le
titre est à 46 px » ne survit à personne ; « 46 px est la dernière valeur qui
tient en quatre lignes à 375 px, mesuré » se rediscute avec des arguments.

Écrire dès cette étape la section « ce qu'on ne fait pas » — voir § 6.

### Étape 2 — Le schéma de contenu, avant les pages qui l'affichent

Une content collection, un fichier par entité, un schéma Zod strict. Le schéma
est l'endroit où l'on encode les règles du client : quel champ est obligatoire
pour quel statut, quelle prose est bilingue, quel média est requis.

Remplir **une** entité en entier avant de construire quoi que ce soit. C'est le
seul moyen de découvrir les champs manquants pendant qu'ils coûtent une ligne
de schéma et non une refonte de template.

### Étape 3 — Le shell : navigation et pied de page

Ils cadrent toutes les pages, ils portent le sélecteur de langue, et ils sont
les deux composants que chaque page suivante suppose déjà là. Les faire à part
évite de les redécouvrir cinq fois.

### Étape 4 — Une page par prompt, un commit entre chaque

**Une seule page à la fois, screenshotée, vérifiée, commitée.** Deux pages dans
le même prompt et l'agent factorise prématurément : il crée un composant partagé
à partir de deux cas, et le troisième ne rentre pas.

Le commit entre chaque page n'est pas de l'hygiène, c'est ce qui rend les
retours en arrière gratuits. Un client change d'avis sur une section ; sans
commit, on ne sait plus ce qui était volontaire.

### Étape 5 — Les passes transversales, une par prompt

Contraste, responsive, accessibilité, poids des médias, i18n. Chacune est une
passe sur tout le site, jamais un ajout à une page. Une passe de contraste faite
page par page laisse des trous ; faite en une fois, sur tous les nœuds de texte,
elle est exhaustive et mesurable.

### Ce qui se passe si on inverse l'ordre

| Inversion | Conséquence observée |
|---|---|
| Pages avant système de design | Chaque page a sa propre échelle. La cinquième ne ressemble à rien. |
| Templates avant schéma | Le template décide des champs. Le contenu réel n'y rentre pas. |
| Plusieurs pages par prompt | Abstractions prématurées, composants à trois props conditionnelles. |
| Pas de commit intermédiaire | Impossible de séparer un choix d'un accident. |

---

## 3. Les décisions techniques qui se rejouent

### Astro + Tailwind v4, tokens imposés par l'outil

La règle « aucune valeur hors tokens » ne tient que si l'outil la fait
respecter. En Tailwind v4 :

```css
@import "tailwindcss" source(none);
@source "../";              /* le seul dossier qui contient du code */

@theme {
  --color-*: initial;       /* efface toute la palette par défaut */
  --color-transparent: transparent;
  --color-current: currentColor;

  /* puis, et seulement, les couleurs du projet */
}
```

- **`--color-*: initial`** est la ligne qui compte. Sans elle, `bg-blue-500`
  fonctionne, et il finira par être écrit. Avec elle, c'est une erreur — donc
  une question, donc un token nommé.
- **`source(none)` + `@source`** empêche Tailwind de scanner le mirror et les
  assets. Sans ça il ramasse les couleurs de l'ancien site dans le HTML aspiré
  et génère des utilitaires arbitraires — y compris à partir des exemples
  « à ne pas faire » de la documentation du projet.
- Même traitement pour les autres échelles : effacer les espacements, rayons et
  ombres par défaut si le projet a les siens.

### Une palette par fichier

Les couleurs vivent dans `src/styles/palettes/<nom>.css`, importées par une
seule ligne. Changer de direction visuelle = changer cette ligne. Condition
d'existence : **aucun composant ne nomme une primitive**, tout passe par des
jetons sémantiques (`page`, `surface`, `ink`, `accent`, `line`, `scrim`…).

Ça paraît sur-conçu jusqu'à ce que le client demande une autre couleur de fond.
À ce moment-là c'est une ligne, ou trois jours.

Les **ombres appartiennent à la palette**, pas au fichier de tokens général :
leur densité dépend du fond. Une ombre à 7 % d'opacité ne se voit pas sur un
fond sombre.

### i18n, si bilingue

Routing natif d'Astro, langue par défaut sans préfixe :

```js
i18n: {
  defaultLocale: 'fr',
  locales: ['fr', 'en'],
  routing: { prefixDefaultLocale: false },   // `/` = fr, `/en/` = en
}
```

Les chaînes d'interface vivent dans des modules typés (`src/copy/*.ts`), pas
dans les composants. Un **script de vérification** qui compare les clés des deux
langues et échoue à la moindre absence vaut tous les relectures : le jour où
quelqu'un ajoute une chaîne dans une seule langue, `npm run check` le dit.

Les segments d'URL sont traduits eux aussi, et vivent dans le contenu, pas dans
une table de correspondance à part.

### Content collections : un fichier par entité, la prose en `{ fr, en }`

Un fichier par entité, **pas** un fichier par entité et par langue : l'essentiel
des données (adresses, chiffres, médias, dates) est indépendant de la langue.
Seule la prose est bilingue.

```ts
const bilingue = z.object({ fr: z.string(), en: z.string() });
const bilingueBloc = z.object({
  fr: z.array(z.string()).nonempty(),
  en: z.array(z.string()).nonempty(),
});
```

Les deux langues **requises** : une entité à moitié traduite ne doit pas pouvoir
être publiée. Et un `superRefine` pour les règles conditionnelles — tel champ
obligatoire seulement pour tel statut.

Prose en **tableau de paragraphes** plutôt qu'en markdown tant que le client
livre de la prose simple. Passer au markdown le jour où il faut des listes ou
du gras, pas avant.

### Images dans `src/assets/`, vidéo dans `public/`

- **Images** : `src/assets/`, servies par `astro:assets`. Optimisation, dérivés
  responsives et dimensions intrinsèques (donc pas de saut de mise en page)
  viennent gratuitement. Une image dans `public/` n'a rien de tout ça.
- **Vidéo** : `public/`, parce qu'Astro ne transforme pas les vidéos. Avec deux
  conséquences à surveiller — voir les pièges.
- **Les sources vidéo sont attachées en JS, jamais dans le HTML.**
  `preload="none"` n'est qu'une indication ; ne pas écrire la balise `<source>`
  est une garantie. On l'ajoute quand le hero entre dans le cadre.
- Le **poster est la première image du plan retenu**, sinon le démarrage de la
  vidéo est une coupure visible.
- Bouton pause/lecture obligatoire. Une vidéo en boucle sans moyen de l'arrêter
  est un problème d'accessibilité, pas un détail.
- `prefers-reduced-motion` coupe tout : pas de source, pas de requête.

### Un `check` qui tourne en une seconde

Deux scripts suffisent et attrapent l'essentiel : parité des clés i18n, et
formatage (dates, nombres, superficies, slugs) par des assertions sur des cas
réels. Pas de framework. Ils tournent avant chaque commit et donnent une raison
de dire « vérifié » autrement qu'à l'œil.

---

## 4. Les pièges rencontrés, et leur solution

### `slug` est réservé par le glob loader

Déclarer `slug` dans un schéma de collection chargé par `glob()` échoue : le
loader dérive déjà `id` du nom de fichier et se réserve la clé.

**Solution** — nommer le champ autrement (`url`, `chemin`, `segment`), et le
documenter sur place :

```ts
url: bilingue,   // segment d'URL par langue (« slug » est réservé par le glob loader)
```

### Le YAML casse sur les deux-points du français

`titre: Trois pièces : cuisine, salon, chambre` est une erreur de parsing. Le
français met des deux-points partout, et l'erreur remonte comme un problème de
schéma, pas de syntaxe — on cherche au mauvais endroit.

**Solution** — toute prose est **entre guillemets doubles**, ou en scalaire
bloc :

```yaml
resume:
  fr: "Trois pièces : cuisine, salon, chambre."
description:
  fr:
    - |-
      Un paragraphe entier, avec des deux-points : sans souci,
      et des apostrophes d'accord.
```

Guillemets **doubles** et non simples : l'apostrophe française est un guillemet
simple, et elle ferme une chaîne en YAML comme en JS. Même piège dans les
chaînes TypeScript de `src/copy/` — un `imageAlt: 'Vue d'un chantier'` casse le
build.

Utiliser `|-` (littéral, sans saut final) plutôt que `>` : le scalaire replié
fusionne les lignes et transforme une mise en forme voulue en un paragraphe.

### Les masters vidéo du client sont inutilisables tels quels

Un master de drone livré par un client : **1,48 Go**, 3840×2160, H.264 à
249 Mb/s, deux pistes audio. Déposé dans `public/`, il **part dans `dist/` à
chaque build** — Astro y copie tout, sans regarder.

**Solution** — les masters vivent hors du dépôt (`reference/NEW/`, gitignoré) et
on encode une boucle courte :

```bash
ffmpeg -ss <debut> -t 12 -i master.mp4 \
  -vf "scale=1280:-2" -r 30 \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 26 -maxrate 1400k -bufsize 2800k -preset slow \
  -movflags +faststart -an -sn -dn \
  public/videos/<nom>/<nom>.mp4
```

Extraire le poster sur la **première image du segment retenu** :

```bash
ffmpeg -ss <debut> -i master.mp4 -frames:v 1 -q:v 2 \
  public/videos/<nom>/poster.jpg
```

Recadrer avant de mettre à l'échelle, si le sujet doit se décaler sous un titre :

```bash
# 16:9 -> 2.2:1, recadré au centre, puis mis à l'échelle
ffmpeg -ss <debut> -t 12 -i master.mp4 \
  -vf "crop=iw:iw/2.2,scale=1280:-2" -r 30 \
  -c:v libx264 -crf 26 -maxrate 1400k -bufsize 2800k -preset slow \
  -movflags +faststart -an -sn -dn out.mp4
```

Notes qui ont servi :

- `-an` n'est pas une économie de poids : un hero est **muet par
  construction**, une piste audio n'y sera jamais lue.
- `+faststart` remonte l'index en tête du fichier ; sans lui, la lecture attend
  le téléchargement complet.
- **Vérifier `du -sh dist` après avoir ajouté un média.** C'est le seul garde-fou
  contre un master oublié dans `public/`.
- **Signaler le poids et le codec au client, ne rien réencoder sans le dire.**
  Un réencodage est une décision éditoriale déguisée en tâche technique.
- **Le choix du segment se mesure.** Sur un même plan de 47 s, l'écart entre le
  meilleur et le pire segment était d'un facteur **12** en proportion de pixels
  sous le seuil de contraste derrière le titre. Un plan de hero se choisit
  d'abord sur ce qui se trouve **derrière le texte**.

### Les contrastes se calculent, ils ne s'estiment pas

« Ça a l'air lisible » est faux une fois sur trois, et systématiquement faux sur
les gris moyens et les couleurs chaudes.

**Solution en deux temps :**

1. **Avant d'écrire le CSS** — matrice de contraste en Python (ou n'importe
   quoi) sur toutes les paires premier-plan / fond envisagées. Luminance
   relative WCAG, seuil 4.5:1 pour le texte courant, 3:1 pour le grand texte et
   les **contours porteurs de sens** (bordures de champ, silhouette d'un
   bouton).
2. **Après le rendu** — parcourir chaque nœud de texte du DOM dans le
   navigateur, remonter jusqu'au premier fond opaque, comparer au seuil qui
   correspond au corps et à la graisse. Zéro échec attendu, à chaque largeur.

Pour le **texte sur image ou vidéo**, le DOM ne suffit pas : dessiner le média
dans un canvas, composer le voile par-dessus, et calculer le ratio **derrière
chaque glyphe**. C'est ce qui a montré que 41 % des pixels d'une ligne de titre
tombaient sous le seuil — invisible à l'œil, évident à la mesure.

Trois erreurs de raisonnement qui reviennent :

- **La silhouette d'un aplat compte autant que son texte.** Un bouton dont le
  libellé passe mais dont le fond ne se détache pas du sien est un bouton qu'on
  ne voit pas. Seuil : 3:1 entre l'aplat et ce qui l'entoure.
- **Sur fond sombre, empiler des surfaces de plus en plus claires épuise le
  budget.** Ce qu'on pose sur un fond sombre doit s'**enfoncer**, pas monter.
- **Une couleur qui tient en aplat ne tient pas forcément en texte**, et
  inversement. Deux jetons, pas un.

### La preview bloque les hôtes inconnus derrière un tunnel

Faire relire le site au client par un tunnel (`cloudflared`, `ngrok`, un
port forward) renvoie une page d'erreur : le serveur refuse les requêtes dont
l'en-tête `Host` ne lui est pas connu. Le message est explicite mais on le
cherche du côté du tunnel.

**Solution** — autoriser l'hôte côté serveur, et écouter sur toutes les
interfaces :

```js
// astro.config.mjs
export default defineConfig({
  vite: {
    server:  { allowedHosts: ['<sous-domaine>.trycloudflare.com'] },
    preview: { allowedHosts: ['<sous-domaine>.trycloudflare.com'] },
  },
});
```

```bash
astro dev --host      # ou : astro preview --host
```

Le tunnel change de sous-domaine à chaque lancement : réserver un nom, ou
ajouter l'hôte au moment de partager. **Ne pas mettre `true`** dans un fichier
commité — c'est une porte ouverte sur la machine de développement.

### Les pièges de mise en page qui ont coûté le plus cher

Aucun ne produit d'erreur ; tous se voient à l'écran et nulle part ailleurs.

- **`isolation: isolate` crée un contexte d'empilement**, et un contexte
  d'empilement peint tout son sous-arbre — y compris un enfant `position:
  fixed` — à l'étape des éléments positionnés, donc **au-dessus** des fonds des
  sections suivantes. Symptôme : un média de hero fixe qui reste devant la page.
- **`object-fit: cover` met à l'échelle par l'axe contraignant.** Dans un cadre
  portrait avec une source paysage, c'est la **hauteur**. Or `sizes` ne décrit
  qu'une largeur : un honnête `100vw` fait choisir une variante trois fois trop
  petite. Un `sizes="300vw"` sous le point de rupture mobile n'est pas une faute
  de frappe.
- **`object-position` ne déplace que ce que le recadrage laisse dépasser.**
  Décaler un sujet de 250 px demande une source assez large pour ça — sinon
  c'est au recadrage de la source qu'il faut le faire, pas en CSS. Et
  `object-right` montre la **partie droite** de la source, donc pousse le sujet
  vers la gauche : l'inverse du réflexe.
- **`aspect-ratio` est une taille préférée, pas un plafond.** Un contenu trop
  grand étire la boîte, et le carré cesse d'être carré à un point de rupture
  précis, sans rien casser ailleurs.
- **Un point de rupture qui rétrécit.** Passer de 2 à 4 colonnes à 640 px donne
  des cases *plus petites* qu'à 375 px. Vérifier les tailles réelles de part et
  d'autre de chaque rupture, pas seulement que « ça tient ».

### Deux artefacts d'outillage à connaître

Ils font croire à un bug du site alors que c'est la mesure qui ment.

- **Une capture `fullPage` d'une page à révélations au défilement rend des
  sections vides.** L'`IntersectionObserver` n'a jamais vu passer ces éléments.
  Capturer au défilement, pas en pleine page.
- **Un `window.scrollTo()` piloté depuis le contexte de la page fige les
  transitions CSS** dans certains harnais d'automatisation : `playState`
  « running », `currentTime` bloqué à 0. Mesurer avec de vrais évènements de
  molette.

Et sur Windows : `convert` est un utilitaire système, **pas** ImageMagick.

---

## 5. À trancher avec le client, tôt

Ces points ont tous été découverts tard, et chacun a bloqué une livraison. Les
poser dès le premier échange, en une liste.

### Bloquants pour livrer

| Question | Pourquoi tôt |
|---|---|
| **Où vont les soumissions de formulaire ?** Courriel, CRM, webhook, quels champs, quelles étiquettes | Le formulaire est fini mais inerte tant que ce n'est pas décidé. C'est une décision d'entreprise, pas technique. |
| **Qui héberge, sur quel domaine ?** Redirections depuis l'ancien site ? | Détermine l'adaptateur, la politique de confidentialité, et le plan de bascule. |
| **Politique de confidentialité** : responsable des renseignements personnels, adresse postale, hébergeur, tiers réellement utilisés, transferts hors juridiction | Obligatoire dès qu'un formulaire existe. Ne s'invente pas — c'est une déclaration juridique. |
| **Analytique ?** | Change la politique de confidentialité et impose un bandeau de consentement. La réponse « on verra » coûte une refonte du bandeau. |

### Contenu qui manque toujours

| Question | Pourquoi tôt |
|---|---|
| **Les fichiers de police sont-ils licenciés et livrables ?** | Un provider local sans fichiers **casse le build** : plus aucun rendu, donc plus aucune vérification visuelle. Prévoir un repli explicite. |
| **Logo vectoriel, favicon, et leurs variantes** | Le favicon est systématiquement oublié et se voit dans chaque onglet. |
| **Photos : droits, et statut réel.** Un rendu 3D est-il présentable comme une photo ? | Publier un rendu comme une photo de l'existant est une fausse représentation. Le distinguer dans le schéma. |
| **Portraits, titres et fonctions de l'équipe** | Les placeholders à initiales survivent jusqu'à la mise en ligne si personne ne les réclame. |
| **Vidéo : format attendu.** 16:9, 8–15 s, boucle sans coupe franche, sans son utile, **sans texte incrusté** si le site est bilingue, sous 3 Mo après compression | Sinon on reçoit un master de 1,5 Go et on décide à sa place. |
| **Qui fournit la seconde langue ?** Traduction professionnelle, ou traduction à partir du texte source, relue par qui ? | Une traduction non relue est un risque de marque que l'équipe technique ne peut pas assumer. |
| **Quelles données sont provisoires ?** Prix, adresses, dates de livraison | Prévoir un marqueur dans le schéma (`aConfirmer: []`) et une liste à repasser avant la mise en ligne. |

### Périmètre à nommer explicitement

Page 404, `robots.txt`, plan de site, page de mentions légales, formulaire de
contact générique, cookies. Chacun est petit ; ensemble ils font une journée, et
ils apparaissent toujours la veille de la livraison.

---

## 6. Les patterns visuels qui trahissent une génération automatique

À écrire dans `DESIGN.md` dès l'étape 1, sous un titre « ce qu'on ne fait pas ».
Ce sont les réflexes qui donnent à un site l'air d'un gabarit — pas parce
qu'ils sont laids, mais parce qu'ils sont **les mêmes partout**.

### La signature du gabarit

- **Trois cartes numérotées `01` `02` `03` sur une rangée.** Le tell le plus
  fiable. Une liste verticale avec un chiffre géant et un décalage croissant
  dit la même chose et n'appartient qu'à ce site.
- **Des micro-libellés en capitales espacées partout** (`NOS SERVICES`,
  `À PROPOS`). Un seul survivant acceptable : un code réellement en capitales
  (`FR`, `EN`, un sigle). Partout ailleurs, casse normale.
- **Des pastilles à point coloré** pour un statut. Un filet coloré et un mot,
  hors de l'image, disent la même chose sans imiter une interface applicative.
- **Tout à la même largeur, au même espacement, à la même échelle.** C'est le
  vrai tell, celui qui subsiste quand on a corrigé tous les autres. Des largeurs
  et des respirations **volontairement inégales** sont ce qui donne un rythme.
  À écrire comme une règle, sinon ça se relit comme une erreur.
- **Trois cartes, trois colonnes, toutes bordées et ombrées.** L'image porte la
  carte ; le texte peut vivre à même le fond.
- **Des icônes de 16 à 20 px sur une grille de quatre colonnes.** À cette taille
  elles décorent sans se lire. À 40–56 px, une icône porte son élément.

### Les faux emphases

- **Une section entièrement sombre pour « mettre en valeur » un bloc de texte.**
  Un aplat qui contient tout son texte ne met rien en valeur : il déplace le
  problème. Ce qui attire l'œil est une image, un aplat d'accent de la taille
  d'un bouton, ou rien.
- **Un fond qui alterne à chaque section.** Ça donne des rayures. L'alternance
  se lit par **groupes**, et jamais avec plus de deux valeurs.
- **Du texte en dégradé.** Toujours.
- **Une colonne de prose centrée au milieu d'un vide symétrique.** C'est le
  réglage par défaut de tous les gabarits du monde.

### Les mots

- **Des boutons « En savoir plus » sans donnée.** Un appel à l'action porte une
  information réelle — un compte, un prix, une date. « Voir les 12 logements »
  dit quelque chose ; « En savoir plus » dit qu'on n'a rien à dire.
- **Des blocs de statistiques aux chiffres ronds.** S'ils ne viennent pas d'une
  source, ils ne vont pas sur le site.
- **Le même mot deux fois par ligne.** « Wi-Fi inclus », « Hydro inclus » sous un
  titre « Ce qui est inclus ».
- **Une capture de valeur agressive** — compte à rebours, « plus que 2 unités ! »,
  modale d'entrée. À proscrire par défaut, et à ne rouvrir que si le client le
  demande en connaissance de cause.

### Les détails qui sonnent faux

- **Des angles arrondis sur les photos.** Les commandes s'arrondissent, les
  images se cadrent. La distinction porte du sens.
- **Une ombre noire.** Une ombre teintée de la couleur du fond ; une ombre noire
  vire au gris et casse la teinte.
- **Le même composant répété sur cinq pages en changeant deux mots.** Un geste
  répété cesse d'être un geste et devient un gabarit. Si un composant est fort,
  le réserver à un ou deux endroits — et l'écrire dans `DESIGN.md`.

### La règle qui les résume

Chaque fois qu'un élément est ajouté, se demander **ce qu'il dit que la page ne
dit pas déjà**. Un site vitrine qui n'a que quatre choses à dire et les dit
quatre fois est moins bon que celui qui les dit une fois, à la bonne taille.

---

## 7. Rappel de la boucle

```
inventaire → design system → schéma → shell → une page → screenshot →
vérifier → commit → page suivante
                                    ↘ passes transversales, une par prompt
```

Et la seule règle qui vaut pour tout le reste : **mesurer plutôt qu'estimer**,
et écrire la mesure à côté de la valeur, pour que le prochain sache si elle se
rediscute.

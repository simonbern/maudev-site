# Photos Hermine — catégorisation

Relevé visuel des 23 photos de `src/assets/projets/hermine/photos/`. Rien n'est
câblé.

Catégories : **extérieur** · **intérieur** · **espaces communs** · **détail**.
La colonne « état » distingue les logements meublés (mise en scène) des
logements vides — c'est le critère le plus déterminant pour composer une
galerie cohérente, et il ne suit pas le découpage par unité.

Les numéros d'unité viennent des noms de fichiers ; le type et la superficie
sont recoupés avec `plans-mapping.md`.

## Correspondance

| Fichier | Catégorie | Sujet | État | Confiance |
|---|---|---|---|---|
| `hermine-112-exterieur-01.jpg` | **extérieur** | Façade d'angle depuis la rue, immeuble **en chantier** | — | certaine |
| `hermine-112-cuisine-01.jpg` | intérieur | Cuisine + entrée, comptoir quartz, 5 électros | vide | certaine |
| `hermine-112-cuisine-02.jpg` | intérieur | Cuisine vers séjour, lave-vaisselle, thermopompe | meublé | certaine |
| `hermine-112-cuisine-03.jpg` | intérieur | Îlot/évier vers salle à manger et balcon | meublé | certaine |
| `hermine-112-sejour-01.jpg` | intérieur | Salle à manger + séjour, mur cannelé, thermopompe | meublé | certaine |
| `hermine-112-sejour-02.jpg` | intérieur | Salle à manger vers cuisine | meublé | certaine |
| `hermine-112-sejour-03.jpg` | intérieur | Séjour, mur cannelé, porte-fenêtre et balcon | meublé | certaine |
| `hermine-112-sejour-04.jpg` | intérieur | Séjour large vers cuisine, mur cannelé | meublé | certaine |
| `hermine-112-sejour-05.jpg` | intérieur | Séjour vers entrée et cuisine | meublé | certaine |
| `hermine-112-chambre-01.jpg` | intérieur | Chambre, fenêtre sur bâtiment voisin | meublé | certaine |
| `hermine-112-chambre-02.jpg` | intérieur | Chambre vide, fenêtre sur parc et module de jeux | vide | certaine |
| `hermine-112-chambre-03.jpg` | intérieur | Chambre, miroir, fenêtre sur parc | meublé | certaine |
| `hermine-112-salle-de-bain-01.jpg` | **détail** | Laveuse-sécheuse superposées + vanité + douche | meublé | élevée |
| `hermine-112-salle-de-bain-02.jpg` | intérieur | Salle de bain complète : bain, douche marbrée, vanité | meublé | certaine |
| `hermine-207-cuisine-01.jpg` | intérieur | Cuisine + aire ouverte, fenêtres sur verdure | vide | certaine |
| `hermine-209-cuisine-01.jpg` | intérieur | Cuisine + aire ouverte vers entrée | vide | certaine |
| `hermine-209-chambre-01.jpg` | intérieur | Chambre vide, deux fenêtres sur stationnement | vide | certaine |
| `hermine-209-salle-de-bain-01.jpg` | intérieur | Salle de bain : bain + douche marbrée séparés | vide | certaine |
| `hermine-209-sejour-01.jpg` | intérieur | Aire ouverte cuisine-séjour, porte-fenêtre | vide | certaine |
| `hermine-209-sejour-02.jpg` | intérieur | Séjour vers balcon et couloir des chambres | vide | certaine |
| `hermine-209-sejour-03.jpg` | intérieur | Pièce vide, fenêtre sur toit courbe voisin | vide | moyenne |
| `hermine-401-sejour-01.jpg` | intérieur | Aire ouverte cuisine-séjour, thermopompe murale | vide | certaine |
| `hermine-401-salle-de-bain-01.jpg` | intérieur | Salle de bain : bain + douche marbrée, vanité bois | vide | certaine |

*`209-sejour-03` : pièce vide sans repère de fonction. Le nom de fichier dit
séjour, mais les proportions et la fenêtre unique évoquent une chambre. Je la
classe intérieur sans trancher le nom de la pièce.*

## Répartition

| Catégorie | Nombre |
|---|---|
| extérieur | **1** |
| intérieur | **21** |
| espaces communs | **0** |
| détail | **1** |

## Ce que le relevé change

> **Mise à jour — livraison NEW du 2026-08-15.** Une meilleure photo
> d'extérieur existe désormais (`photos/exterieur-rue-01.jpg`, 3000 × 2000,
> façade d'angle depuis la rue) et sert de couverture. La façade n'y est
> toujours pas terminée, mais le cadrage est bien meilleur. Voir
> `reference/new-assets-mapping.md`. Le constat ci-dessous vaut pour l'ancien
> jeu de photos.

**1. Il n'y a qu'une seule photo d'extérieur, et l'immeuble y est en chantier.**
`hermine-112-exterieur-01` montre le pare-air DRYline à nu sur deux sections de
façade, des cônes orange, du gravier et aucun aménagement paysager. C'est le
problème le plus sérieux du lot : c'est la seule image capable de servir de
`couverture` sur la carte de projet et en tête de la page Hermine, et elle
montre un bâtiment inachevé. Le premier signal envoyé au locataire est donc
« ce n'est pas fini », alors que 20 unités sur 54 sont déjà louées.

Deux issues seulement : réclamer des photos de façade terminée, ou prendre un
intérieur en couverture — moins bon, une carte de projet immobilier montre
normalement le bâtiment.

*Correction (voir `renders-mapping.md`) : le repli par un render extérieur,
envisagé ici, n'existe pas. Le dossier `renders/` ne contient aucune image de
synthèse, uniquement des dessins techniques 2D. Les seules images de l'immeuble
terminé sont les quatre élévations en couleur — des dessins d'architecte, dont
les deux façades principales ont un ratio de 4.5:1 inexploitable en couverture.*

**2. Aucune photo d'espaces communs.**
Rien : pas de hall, pas de corridor, pas d'ascenseur, pas de stationnement
intérieur, pas de rangements. Or ascenseur, intercom, stationnement et rangement
intérieurs sont vendus comme des inclusions du projet. La grille d'inclusions de
DESIGN.md fonctionnera (icônes + libellés), mais la catégorie « espaces communs »
de la galerie est vide et doit être retirée du plan, ou alimentée par le client.

**3. Le lac Saint-François n'est sur aucune photo.**
Le client en fait l'argument distinctif du 4ᵉ étage : « vue dégagée sur la ville
et le lac ». Les deux photos du 401 donnent sur des toitures. Aucune image ne
démontre l'argument de vente le plus fort du projet. À demander explicitement.

**4. Meublé et vide ne se mélangent pas.**
9 photos sont mises en scène, 14 sont vides. Toutes les photos meublées sont
dans l'unité 112 ; 207, 209 et 401 sont entièrement vides. Alterner les deux
dans une même grille fait paraître le projet mal préparé.

La galerie devrait donc mener avec le bloc meublé du 112 — c'est lui qui fait
« milieu de vie », le positionnement retenu — et présenter les logements vides
séparément, ou pas du tout en page d'accueil. À noter : `112-cuisine-01` et
`112-chambre-02` sont vides alors que le reste du 112 est meublé ; les écarter
du bloc meublé.

**5. Les unités photographiées ne couvrent pas l'offre.**

| Unité | Type | Étage | Photos |
|---|---|---|---|
| 112 | 5 ½ (1242 p.c.) | 1ᵉʳ | 14 |
| 207 | 4 ½ (940 p.c.) | 2ᵉ | 1 |
| 209 | 5 ½ (1084 p.c.) | 2ᵉ | 6 |
| 401 | 4 ½ (1040 p.c.) | 4ᵉ | 2 |

**Aucun 3 ½ n'est photographié** — c'est pourtant l'entrée de gamme, 11 unités,
et probablement le type le plus recherché. Et les deux 5 ½ photographiés sont
parmi les plus grands du bâtiment (1242 et 1084 p.c.), ce qui ne représente pas
le 4 ½ à 798 p.c. Si la page affiche un tableau par type, il n'y aura pas de
photo pertinente à associer aux 3 ½.

**6. Conséquence pour le schéma.**
Les photos sont exploitables telles quelles par `photos[]`, mais elles gagnent à
porter l'unité et la catégorie plutôt qu'un simple `alt`. Un champ optionnel
`categorie` et `unite` sur `photos[]` permettrait de filtrer la galerie par type
de logement le jour où les 3 ½ seront photographiés — sans quoi il faudra tout
reprendre.

## À demander au client

1. Photos de la **façade terminée**, avec aménagement paysager — bloquant pour la couverture.
2. Photos d'un **3 ½** (11 unités, aucune image).
3. Photos de la **vue depuis le 4ᵉ étage**, lac Saint-François visible.
4. Photos des **espaces communs** : hall, corridor, ascenseur, stationnement intérieur, rangements.
5. Confirmation de l'adresse : **102** ou **110** rue Alphonse-Desjardins (voir `plans-mapping.md`).

# Formulaire de visite — ce qui reste à faire

Le formulaire est construit et vérifié. Il s'affiche en bas de chaque page de
projet à louer, en français et en anglais, et le bouton du hero y mène par
l'ancre `#visite`.

**Il n'envoie encore rien.** `LEADS.endpoint` (`src/leads.ts`) vaut `undefined`,
donc le bouton d'envoi laisse place à un bloc qui renvoie vers `info@mau-dev.ca`.
Renseigner une URL dans ce fichier active tout le reste — rien d'autre à toucher.

---

## Décisions à prendre

### 1. Hébergeur

Bloque tout le reste : le formulaire doit poster vers une fonction serverless,
et celle-ci vit chez l'hébergeur.

| | Fonction serverless | Note |
|---|---|---|
| **Cloudflare Pages** | Pages Functions | Recommandé : l'analytique sans témoins y est gratuite |
| **Netlify** | Netlify Functions | Équivalent, formulaire natif possible aussi |

Aucune autre partie du site n'en dépend — la sortie est statique, elle se pose
n'importe où.

### 2. Où atterrissent les leads

L'architecture retenue est **formulaire → GHL → feuille**, et non
formulaire → feuille → GHL. GoHighLevel sait *écrire* dans une feuille Google
(action de workflow), mais il n'a pas de déclencheur « nouvelle ligne » : passer
par la feuille d'abord obligerait à intercaler Zapier ou Make.

```
Formulaire (première partie, aucun iframe)
      ↓  POST JSON
Fonction serverless          ← valide, filtre les robots,
                                garde l'URL du webhook côté serveur
      ↓
Webhook entrant GoHighLevel  ← crée le contact, étiquette, notifie,
                                écrit dans la feuille Google
```

### 3. Ce qu'il me faut de GoHighLevel

> **La procédure pour l'administrateur GHL est dans
> [`ghl-a-preparer.md`](./ghl-a-preparer.md)** — les six étapes de configuration, dans
> l'ordre de leurs dépendances, avec les chemins de menu et le `curl` de test.
> Ce fichier-ci garde les décisions ; celui-là se transmet tel quel à la
> personne qui clique.


- **L'URL du webhook entrant** du workflow qui doit recevoir les demandes.
  Elle ira en variable d'environnement, jamais dans le dépôt : un webhook
  entrant n'est pas authentifié, et exposé dans le JavaScript de la page il se
  fait inonder en quelques jours.
- **Le nom des étiquettes** à poser sur le contact (par projet ? par type ?).
- **Faut-il créer une opportunité** dans un pipeline, ou seulement un contact ?

### 4. Protection contre les robots

Un piège invisible est déjà en place (champ `site`, rempli seulement par un
robot). Il arrête l'essentiel du spam automatisé, pas les envois ciblés.

À décider si le volume le justifie : **Cloudflare Turnstile** (gratuit, sans
énigme visuelle, pas de témoin) ajouté dans la fonction serverless.

### 5. Champs

Ceux qui partent aujourd'hui — modifiables, dis-moi :

| Champ | Requis | Origine |
|---|---|---|
| `projet` | — | rempli automatiquement, nom du projet |
| `type` | non | liste construite depuis la fiche du projet |
| `emmenagement` | non | date |
| `nom` | **oui** | |
| `courriel` | **oui** | |
| `telephone` | non | |
| `message` | non | |
| `infolettre` | — | case décochée par défaut |
| `langue` | — | rempli automatiquement (`fr` / `en`) |
| `page` | — | rempli automatiquement, URL d'origine |

Le contrat de la charge utile est typé dans `src/leads.ts` (`DemandeVisite`).

---

## Obligations légales que ce formulaire déclenche

### Transfert hors Québec

**GoHighLevel est hébergé aux États-Unis.** Communiquer des renseignements
personnels hors du Québec impose, sous la Loi 25 :

1. une **évaluation des facteurs relatifs à la vie privée** (ÉFVP) *avant* le
   premier transfert ;
2. la mention du transfert dans la politique de confidentialité.

Ce point s'ajoute à la liste des trous de `/confidentialite`.

### Communications commerciales

La case « infolettre » est **décochée par défaut et distincte de la demande**.
C'est ce qu'exige la LCAP : demander une visite ne vaut pas acceptation d'une
infolettre, et fusionner les deux invaliderait le second consentement.

Il faut aussi, côté GHL : un mécanisme de désabonnement dans chaque envoi, et
l'identification de l'expéditeur avec ses coordonnées.

### Conservation

À décider : combien de temps garder un lead qui n'a pas abouti. La politique
devra le dire.

---

## Hors périmètre pour l'instant

- **Le calendrier de réservation GHL.** Embarqué en `<iframe>`, c'est un tiers :
  il retomberait sous le bandeau de témoins et resterait invisible tant que
  personne n'accepte. Compromis propre : le formulaire d'abord, puis GHL envoie
  le lien de réservation par courriel ou SMS.
- **Le formulaire sur l'accueil et sur `/a-louer`.** Ces pages gardent leur lien
  courriel : sans projet précis, la moitié des champs perdrait son sens.
- **Un numéro de téléphone.** Le site n'en affiche aucun — le mirror n'avait
  qu'un numéro de démonstration. Pour du locatif, c'est probablement le canal
  qui convertit le mieux. À demander au client.

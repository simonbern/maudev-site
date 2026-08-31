# Hébergement et mise en ligne

Trois chantiers en parallèle, puis on assemble.

| Qui | Quoi |
|---|---|
| **Admin GHL** | [`ghl-a-preparer.md`](./ghl-a-preparer.md) → fournit l'URL du webhook |
| **Client** | l'hébergeur → fournit les accès et le nom du projet |
| **Dév** | la fonction serverless, `LEADS.endpoint`, puis le mappage GHL avec le client |

**Cloudflare Pages** est recommandé : gratuit à ce volume, les fonctions
serverless sont incluses, et son analytique ne pose pas de témoins — un bandeau
de consentement en moins.

---

## Avant tout : le dépôt sur GitHub

Cloudflare se branche sur un dépôt Git pour reconstruire à chaque changement.

**Le dépôt doit être privé.** Il contient le courriel du client, ses prix, le
mirror complet de l'ancien site et les références d'inspiration — du contenu
appartenant à des tiers.

---

## Étape par étape

### 1 · GitHub

Créer un dépôt **privé** (`maudev-site`). Ne rien y mettre à la création — pas
de README, pas de `.gitignore`, il y en a déjà un dans le projet.

### 2 · Compte Cloudflare

`dash.cloudflare.com` → créer un compte. Gratuit.

### 3 · Créer le projet Pages

`Workers & Pages › Create › Pages › Connect to Git` → autoriser GitHub,
choisir le dépôt.

| Réglage | Valeur |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

### 4 · Variables d'environnement

`Settings › Environment variables › Production`

| Nom | Valeur | Type |
|---|---|---|
| `NODE_VERSION` | `22` | Plain text |
| `GHL_WEBHOOK_URL` | l'URL fournie par l'admin GHL | **Encrypt** |

Le bouton **Encrypt** compte : sans lui la valeur reste lisible dans le tableau
de bord. Le nom `GHL_WEBHOOK_URL` doit correspondre exactement — c'est ce que
la fonction lira.

### 5 · Domaine — plus tard

`Custom domains › Set up a domain` → `www.mau-dev.ca`. C'est la bascule depuis
l'ancien site : à faire quand le contenu est validé. Le site vit d'ici là sur
une adresse `*.pages.dev`.

---

## Ce qu'il faut renvoyer au dév

1. **L'URL du dépôt GitHub**, ou une invitation comme collaborateur
2. **Le nom du projet Cloudflare** et son adresse `*.pages.dev`
3. **Confirmation que `GHL_WEBHOOK_URL` est en place** — pas la valeur, juste
   que c'est fait
4. **Où sont les DNS de `mau-dev.ca`** — registraire actuel, et si la bascule se
   fait maintenant ou après validation

---

## Ce qui se fait côté dépôt, sans rien demander au client

`functions/api/visite.js` — Cloudflare la déploie automatiquement, aucune
configuration côté tableau de bord. Elle valide les champs, rejette le piège à
robots, coupe le nom en prénom/famille, normalise le téléphone en `+1…`, puis
relaie vers GHL.

Plus un `.nvmrc` pour figer Node, et `LEADS.endpoint` dans `src/leads.ts`.

Le mappage dans GHL se fait ensuite à deux : envoi de test, capture des champs,
actions, publication.

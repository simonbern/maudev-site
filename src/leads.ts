/**
 * Destination des demandes de visite.
 *
 * `endpoint` recevra l'URL de la fonction serverless de l'hébergeur, qui relaie
 * ensuite vers le webhook entrant de GoHighLevel. **Ne jamais y mettre l'URL du
 * webhook GHL directement** : un webhook entrant n'est pas authentifié, et
 * exposé dans le JavaScript de la page il se fait inonder en quelques jours.
 * La fonction garde l'URL côté serveur, valide, filtre, puis relaie.
 *
 * Tant que `endpoint` vaut `undefined`, le formulaire s'affiche et se valide
 * normalement, mais l'envoi est désactivé et le bloc de repli — écrire à
 * MauDev — prend sa place. Le dépôt reste donc utilisable sans hébergeur, et
 * renseigner une URL ici suffit à tout activer.
 *
 * Voir reference/formulaire-visite.md pour ce qui reste à décider.
 */
export const LEADS: { endpoint?: string } = {};

/** Charge utile envoyée à l'endpoint. Sert aussi de contrat pour GHL. */
export interface DemandeVisite {
  /** Nom du projet, tel qu'affiché sur le site. */
  projet: string;
  /** Type de logement recherché, ou chaîne vide si indifférent. */
  type: string;
  /** Date d'emménagement souhaitée, format ISO `AAAA-MM-JJ`, ou vide. */
  emmenagement: string;
  nom: string;
  courriel: string;
  telephone: string;
  message: string;
  /** Consentement LCAP aux communications commerciales. Décoché par défaut. */
  infolettre: boolean;
  /** Langue de la page — sert à répondre dans la bonne langue. */
  langue: string;
  /** URL d'où part la demande. */
  page: string;
}

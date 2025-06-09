/**
 * Point d’entrée pour les fonctions utilitaires pures liées à la gestion utilisateur.
 * 
 * Ce module réexporte les helpers suivants :
 * - `loadUserData` : chargement des données utilisateur depuis le stockage local sécurisé.
 * - `saveUserData` : sauvegarde conditionnelle des données utilisateur dans le stockage local.
 * 
 * Ces fonctions sont utilisées principalement dans le contexte utilisateur (`UserContext`)
 * ou dans des hooks personnalisés.
 * 
 * Exemple d’import :
 * ```ts
 * import { loadUserData, saveUserData } from "@/user/utils";
 * ```
 */
export * from "./loadUserData";
export * from "./saveUserData";
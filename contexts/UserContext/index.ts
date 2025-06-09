/**
 * Point d'entrée principal pour la gestion utilisateur.
 * 
 * Réexporte uniquement le contexte utilisateur et son provider.
 * 
 * Les constantes et types liés à l'utilisateur sont utilisés en interne
 * et ne sont pas exposés à l'extérieur.
 * 
 * Usage simplifié pour importer le contexte utilisateur dans l'application :
 * 
 * ```ts
 * import { useUser, UserProvider } from "@/user";
 * ```
 */
export * from "./UserContext";
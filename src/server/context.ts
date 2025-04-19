/**
 * Contexto de cada petición tRPC.
 */
export type Context = object;

// En esta prueba devolvemos vacío, pero sirve de hook para lógica auth/BD.
export const createContext = async (): Promise<Context> => ({});

/**
 * Contexto de cada petición tRPC.
 * Aquí podríamos inyectar session, prisma, servicios externos, etc.
 */
export type Context = {};

// En esta prueba devolvemos vacío, pero sirve de hook para lógica auth/BD.
export const createContext = async (): Promise<Context> => ({});

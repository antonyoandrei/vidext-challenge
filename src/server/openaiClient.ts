// Inicializa el cliente OpenAI con API Key almacenada en variables de entorno
// Utiliza el fetch interno de Edge/Node, sin configurar agente HTTPS
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

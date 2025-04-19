# pAInt ✏️🖌️

**pAInt** es un editor de dibujo ligero construido con **Next.js 15** y el motor de canvas **tldraw**.  
Incluye gestión de páginas, historial (undo/redo), estilos avanzados, zoom con la rueda y un bot de IA que genera imágenes a partir de _prompts_.

[Demo en vivo → vidext-challenge.onrender.com](https://vidext-challenge.onrender.com)

---

## ✨ Funciones principales

| Categoría        | Qué puedes hacer                                                                   |
| ---------------- | ---------------------------------------------------------------------------------- |
| **Páginas**      | ver nombre de la página actual · añadir / renombrar / reordenar / eliminar páginas |
| **Historial**    | undo / redo                                                                        |
| **Herramientas** | seleccionar · pan · draw · eraser · duplicar · borrar selección                    |
| **Insertar**     | imágenes locales, texto, 15 formas geométricas predefinidas                        |
| **Estilos**      | grosor & dash del trazo, tipo de relleno, color, opacidad, tipografías             |
| **Zoom**         | rueda del ratón, botones _in_, _out_, _fit screen_ y _focus selection_             |
| **Atajos**       | tecla **Delete**                                                                   |
| **IA bot**       | escribe un prompt → inserta PNG 1024×1024 centrado en el lienzo                    |

---

## 📚 Stack tecnológico

| Capa               | Librería                                     |
| ------------------ | -------------------------------------------- |
| **Front / UI**     | React 19 · TailwindCSS 4 · shadcn‑ui / Radix |
| **Canvas**         | @tldraw/tldraw 3                             |
| **Datos**          | @tanstack/react‑query 5                      |
| **Backend RPC**    | tRPC 11                                      |
| **IA**             | OpenAI 4 (DALL‑E / GPT)                      |
| **Notificaciones** | sonner                                       |
| **Deploy**         | Render                                       |

---

## ▶️ Ejecución local

```bash
# 1. Clona el repo
git clone https://github.com/antonyoandrei/vidext-challenge.git
cd vidext-challenge

# 2. Instala dependencias
npm install

# 3. Clave de OpenAI para el bot
cp .env.example .env
echo "OPENAI_API_KEY=sk-..." >> .env

# 4. Arranca en modo desarrollo
npm run dev
# abre http://localhost:3000
```

### Scripts disponibles

| Script          | Descripción            |
| --------------- | ---------------------- |
| `npm run dev`   | servidor de desarrollo |
| `npm start`     | ejecuta en local       |
| `npm run build` | ejecuta build          |

---

## 🧪 Testear la API con Postman

Para probar los endpoints de tRPC con Postman, sigue estos pasos:

1. **Crear petición en Postman**

   - Abre Postman y crea una nueva petición.

2. **Query (GET)**

   - Método: `GET`
   - URL:
     ```
     http://localhost:3000/api/trpc/getDocument
     ```

3. **Mutación (POST)**

   - Método: `POST`
   - URL:
     ```
     http://localhost:3000/api/trpc/saveDocument
     ```
   - Headers:
     - `Content-Type`: `application/json`
   - Body (raw JSON):
     ```json
     {
       "input": {
         "id": "doc1",
         "content": "Contenido de prueba"
       }
     }
     ```

4. Haz click en **Send** y revisa la respuesta JSON.

---

## 🗂️ Estructura (simplificada)

```
src/
 ├─ components/      # Toolbar, StylesPanel, Bot...
 ├─ app/             # rutas y API (tRPC)
 ├─ hooks/           # customHooks para componentes
 ├─ server/          # tRPC server
 ├─ utils/           # helpers
 └─ types/           # tipos globales
```

---

## 🌐 Producción

La rama `main` está desplegada en Render:

> **https://vidext-challenge.onrender.com**

---

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
| **Atajos**       | tecla **Delete**, zoom forzado con la rueda                                        |
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
| **Deploy**         | Vercel                                       |

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

## 🗂️ Estructura (simplificada)

```
src/
 ├─ components/      # Toolbar, StylesPanel, Bot...
 ├─ app/             # rutas y API (tRPC)
 ├─ server/          # tRPC server
 ├─ utils/           # helpers puros
 └─ types/           # tipos globales
```

---

## 🌐 Producción

La rama `main` se despliega automáticamente a Vercel:

> **https://vidext-challenge.onrender.com**

---

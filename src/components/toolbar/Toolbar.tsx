// Toolbar principal: orquesta los subcomponentes de acciones, herramientas y paneles
"use client";

import { useEditor } from "@tldraw/tldraw";
import { ActionButtons } from "@/components/toolbar/ActionButtons";
import { ToolButtons } from "@/components/toolbar/ToolButtons";
import { StyleZoomButtons } from "@/components/toolbar/StyleZoomButtons";

export function Toolbar() {
  const editor = useEditor();

  return (
    <div className="flex items-center justify-between bg-primary px-14 py-2 shadow-md">
      {/* Acción general: undo, redo, borrar, duplicar */}
      <ActionButtons editor={editor} />

      {/* Selección de herramienta y carga de assets */}
      <ToolButtons editor={editor} />

      {/* Paneles flotantes: estilos y zoom */}
      <StyleZoomButtons editor={editor} />
    </div>
  );
}

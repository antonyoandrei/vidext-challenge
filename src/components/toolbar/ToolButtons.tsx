// Botones para selección de herramienta y carga de imágenes
"use client";

import { useEffect, useRef } from "react";
import { AssetRecordType, useEditor, useValue } from "@tldraw/tldraw";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  IconPointer,
  IconHandStop,
  IconPencil,
  IconEraser,
  IconPaperclip,
  IconTypography,
  IconShape,
} from "@tabler/icons-react";

export function ToolButtons({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado del modo de herramienta activo
  const currentTool = useValue(
    "current tool",
    () => editor.getCurrentToolId(),
    [editor]
  );

  // Abre el diálogo oculto de selección de archivo
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Carga una imagen y la inserta centrada en el canvas
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const assetId = AssetRecordType.createId();

        // Crear asset en memoria
        editor.createAssets([
          {
            id: assetId,
            type: "image",
            typeName: "asset",
            props: {
              name: file.name,
              src,
              w,
              h,
              mimeType: file.type,
              isAnimated: false,
            },
            meta: {},
          },
        ]);
        const x = (window.innerWidth - w) / 2;
        const y = (window.innerHeight - h) / 2;

        // Insertar shape con el asset creado
        editor.createShape({
          type: "image",
          x,
          y,
          props: { assetId, w, h },
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Borrar shapes seleccionadas al pulsar Delete
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        editor.deleteShapes(editor.getSelectedShapeIds());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editor]);

  const tools = [
    { id: "select", icon: <IconPointer />, label: "Select" },
    { id: "hand", icon: <IconHandStop />, label: "Pan" },
    { id: "draw", icon: <IconPencil />, label: "Draw" },
    { id: "eraser", icon: <IconEraser />, label: "Eraser" },
    { action: openFileDialog, icon: <IconPaperclip />, label: "Attach" },
    { id: "text", icon: <IconTypography />, label: "Text" },
    { id: "geo", icon: <IconShape />, label: "Shape" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {tools.map(({ id, action, icon, label }) => {
        const isActive = id && currentTool === id;
        return (
          <Tooltip key={label} delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                onClick={() => {
                  if (id) {
                    editor.selectNone();
                    editor.setCurrentTool(id as string);
                  } else action?.();
                }}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}

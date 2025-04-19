// Contenedor del lienzo Tldraw y lógica de sincronización con el servidor
"use client";

import { useEffect } from "react";
import {
  Tldraw,
  useEditor,
  loadSnapshot,
  getSnapshot,
  TLStoreSnapshot,
  TLPageId,
} from "@tldraw/tldraw";
import { trpc } from "@/utils/trpc";
import "tldraw/tldraw.css";
import { Toolbar } from "./toolbar/Toolbar";
import { Bot } from "./bot/Bot";
import { CustomSnapshot } from "@/types/types";

export function Editor() {
  // Estructura principal: lienzo a pantalla completa
  return (
    <div className="w-full h-screen relative bg-gray-300">
      <Tldraw hideUi>
        <EditorContent />
      </Tldraw>
    </div>
  );
}

function EditorContent() {
  const editor = useEditor();
  const saveDoc = trpc.saveDocument.useMutation();
  const { data: snapshot } = trpc.getDocument.useQuery();

  // Cada cambio en el store se envía al servidor
  useEffect(() => {
    if (!editor) return;
    const unsubscribe = editor.store.listen(() => {
      const snap = getSnapshot(editor.store);
      saveDoc.mutate(snap);
    });
    return () => unsubscribe();
  }, [editor, saveDoc]);

  // Al cargar, aplica el snapshot y restaura la página actual
  useEffect(() => {
    if (!snapshot) return;
    loadSnapshot(editor.store, snapshot as TLStoreSnapshot);

    // Restaurar la página si existe en el snapshot
    requestAnimationFrame(() => {
      const pageId = (snapshot as CustomSnapshot)?.metadata?.currentPageId;
      const exists = editor.getPages().some((p) => p.id === pageId);
      if (pageId && exists) {
        editor.setCurrentPage(pageId as TLPageId);
      }
    });
  }, [snapshot, editor]);

  return (
    <>
      {/* Toolbar fija en la parte superior */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Toolbar />
      </div>
      {/* Bot IA */}
      <div className="absolute bottom-4 left-4 z-50">
        <Bot editor={editor} />
      </div>
    </>
  );
}

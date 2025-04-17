"use client";

import {
  Tldraw,
  useEditor,
  loadSnapshot,
  getSnapshot,
  TLStoreSnapshot,
} from "@tldraw/tldraw";
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import "tldraw/tldraw.css";
import { Toolbar } from "./Toolbar";

export function Editor() {
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

  useEffect(() => {
    if (!editor) return;

    const handleChange = () => {
      const snapshot = getSnapshot(editor.store);
      saveDoc.mutate(snapshot);
    };

    const unsubscribe = editor.store.listen(handleChange);

    return () => unsubscribe();
  }, [editor, saveDoc]);

  useEffect(() => {
    if (snapshot) {
      loadSnapshot(editor.store, snapshot as TLStoreSnapshot);

      requestAnimationFrame(() => {
        const pageId = (snapshot as any)?.metadata?.currentPageId;
        const pageExists = editor.getPages().some((p) => p.id === pageId);
        if (pageId && pageExists) {
          editor.setCurrentPage(pageId);
        }
      });
    }
  }, [snapshot, editor]);

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <Toolbar />
    </div>
  );
}

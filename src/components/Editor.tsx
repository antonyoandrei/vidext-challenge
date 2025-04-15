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
import { Button } from "@/components/ui/button";
import "tldraw/tldraw.css";

export function Editor() {
  return (
    <div className="w-full h-screen relative bg-gray-300">
      <Tldraw>
        <EditorContent />
      </Tldraw>
    </div>
  );
}

function EditorContent() {
  const editor = useEditor();

  const saveDoc = trpc.saveDocument.useMutation();
  const { data: snapshot, isLoading, error } = trpc.getDocument.useQuery();

  useEffect(() => {
    if (error) {
    } else if (snapshot && editor && !isLoading) {
      loadSnapshot(editor.store, snapshot as TLStoreSnapshot);
    }
  }, [snapshot, editor, isLoading, error]);

  useEffect(() => {
    if (!editor) return;

    const handleChange = () => {
      const snapshot = getSnapshot(editor.store);
      saveDoc.mutate(snapshot);
    };

    const unsubscribe = editor.store.listen(handleChange);

    return () => unsubscribe();
  }, [editor, saveDoc]);

  const handleModifyShape = () => {
    if (!editor) return;
    const shapes = editor.getCurrentPageShapes();
    const first = shapes[0];
    if (first) {
      editor.updateShape({
        id: first.id,
        type: first.type,
        props: {
          ...first.props,
          color: "red",
        },
      });
    }
  };

  return (
    <div className="absolute top-2 right-2 z-10">
      <Button onClick={handleModifyShape}>Modificar forma</Button>
    </div>
  );
}

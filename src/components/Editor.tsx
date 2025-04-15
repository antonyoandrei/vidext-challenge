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

  const { data: snapshot, isLoading } = trpc.getDocument.useQuery();
  const saveDoc = trpc.saveDocument.useMutation();

  useEffect(() => {
    if (snapshot && snapshot.store && editor && !isLoading) {
      loadSnapshot(editor.store, snapshot as TLStoreSnapshot);
    }
  }, [snapshot, editor, isLoading]);

  useEffect(() => {
    if (editor && !isLoading) {
      const shapes = editor.getCurrentPageShapes();
      if (shapes.length === 0) {
        editor.createShape({
          id: "shape:1" as any,
          type: "geo",
          x: 100,
          y: 100,
          props: {
            geo: "rectangle",
            w: 200,
            h: 100,
            color: "blue",
            size: "m",
            dash: "draw",
            fill: "solid",
          },
        });
      }
    }
  }, [editor, isLoading]);

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

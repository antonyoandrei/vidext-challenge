// Control de páginas del lienzo: listado, ordenamiento, edición y sincronización con el servidor
"use client";

// ——— Imports UI y lógica de Tldraw ———
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { TLPageId, getSnapshot, getIndexAbove } from "@tldraw/tldraw";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import {
  IconFile,
  IconPlus,
  IconTrash,
  IconEdit,
  IconCheck,
  IconGripVertical,
} from "@tabler/icons-react";
import { EditorProp } from "@/types/types";

export function PagesMenu({ editor }: EditorProp) {
  // Estado local para reflejar las páginas y edición en curso
  const [pages, setPages] = useState(editor.getPages());
  const [editingId, setEditingId] = useState<TLPageId | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draggedId, setDraggedId] = useState<TLPageId | null>(null);
  const currentPageId = editor.getCurrentPageId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mutación para persistir snapshot en el servidor
  const saveDoc = trpc.saveDocument.useMutation();
  const saveSnapshot = () => {
    const snapshot = getSnapshot(editor.store);
    saveDoc.mutate({
      ...snapshot,
      metadata: {
        currentPageId,
      },
    });
  };

  // Refresca el listado de páginas desde el editor
  const refresh = () => setPages(editor.getPages());

  // Agrega una nueva página y selecciona inmediatamente
  const addPage = () => {
    editor.createPage({ name: `Page ${pages.length + 1}` });
    // Esperamos al siguiente tick para garantizar la actualización interna
    setTimeout(() => {
      const all = editor.getPages();
      const latest = all[all.length - 1];
      if (latest) {
        editor.selectNone();
        editor.setCurrentPage(latest.id);
        saveSnapshot();
        refresh();
      }
    }, 0);
  };

  // Elimina la página activa, pero evita borrar la última
  const deleteCurrentPage = () => {
    if (pages.length > 1) {
      editor.selectNone();
      editor.deletePage(currentPageId);
      saveSnapshot();
      refresh();
    } else {
      toast.info("You cannot delete the last page.");
    }
  };

  // Inicia edición de nombre y posiciona el input
  const startEdit = (id: TLPageId, name: string) => {
    setEditingId(id);
    setDraftName(name);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Confirma cambio de nombre, persistiendo y refrescando
  const commitEdit = (id: TLPageId) => {
    if (draftName.trim()) {
      editor.selectNone();
      editor.renamePage(id, draftName.trim());
      setTimeout(() => {
        saveSnapshot();
        refresh();
      }, 0);
    }
    setEditingId(null);
  };

  // Manejo de drag & drop para reordenar páginas
  const handleDragStart = (id: TLPageId) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetId: TLPageId) => {
    if (draggedId && draggedId !== targetId) {
      const from = pages.findIndex((p) => p.id === draggedId);
      const to = pages.findIndex((p) => p.id === targetId);
      if (from !== -1 && to !== -1) {
        const ordered = [...pages];
        const [moved] = ordered.splice(from, 1);
        ordered.splice(to, 0, moved);
        ordered.forEach((page, idx) => {
          const prevIndex = ordered[idx - 1]?.index;
          const newIndex = prevIndex
            ? getIndexAbove(prevIndex)
            : getIndexAbove();
          editor.updatePage({ ...page, index: newIndex });
        });
        saveSnapshot();
        refresh();
      }
    }
    setDraggedId(null);
  };

  // Sincronizamos localmente con cambios externos en el store
  useEffect(() => {
    const updatePages = () => setPages(editor.getPages());
    updatePages();
    return editor.store.listen(updatePages, { source: "user" });
  }, [editor]);

  return (
    <DropdownMenu>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <IconFile className="mr-1" />
              {pages.find((p) => p.id === currentPageId)?.name}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Pages</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {pages.map((page) => (
          <div
            key={page.id}
            draggable
            onDragStart={() => handleDragStart(page.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(page.id)}
            className="flex items-center justify-between"
          >
            <IconGripVertical className="cursor-grab p-1 text-muted-foreground" />
            {editingId === page.id ? (
              <input
                ref={inputRef}
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitEdit(page.id);
                  }
                  e.stopPropagation();
                }}
                className="border-b flex-grow mr-2"
              />
            ) : (
              <DropdownMenuItem
                onClick={() => editor.setCurrentPage(page.id)}
                className={page.id === currentPageId ? "font-bold" : ""}
              >
                {page.name}
              </DropdownMenuItem>
            )}
            <button
              onClick={() =>
                editingId === page.id
                  ? commitEdit(page.id)
                  : startEdit(page.id, page.name)
              }
              className="p-1"
            >
              {editingId === page.id ? <IconCheck /> : <IconEdit />}
            </button>
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={addPage}>
          <IconPlus className="mr-2 focus:text-accent-foreground" />
          Add page
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteCurrentPage}>
          <IconTrash className="mr-2 focus:text-accent-foreground" />
          Delete current page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

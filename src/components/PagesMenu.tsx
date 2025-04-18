"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Editor, TLPageId, getSnapshot, getIndexAbove } from "@tldraw/tldraw";
import { useState, useRef } from "react";
import {
  IconFile,
  IconPlus,
  IconTrash,
  IconEdit,
  IconCheck,
  IconGripVertical,
} from "@tabler/icons-react";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function PagesMenu({ editor }: { editor: Editor }) {
  const [pages, setPages] = useState<ReturnType<typeof editor.getPages>>([]);
  const [editingId, setEditingId] = useState<TLPageId | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draggedId, setDraggedId] = useState<TLPageId | null>(null);
  const currentPageId = editor.getCurrentPageId();
  const inputRef = useRef<HTMLInputElement>(null);

  const saveDoc = trpc.saveDocument.useMutation();
  const saveSnapshot = () => {
    const snapshot = getSnapshot(editor.store);
    const currentPageId = editor.getCurrentPageId();

    saveDoc.mutate({
      ...snapshot,
      metadata: {
        currentPageId,
      },
    });
  };

  const refresh = () => setPages(editor.getPages());

  const addPage = () => {
    editor.createPage({ name: `Page ${editor.getPages().length + 1}` });

    setTimeout(() => {
      const allPages = editor.getPages();
      const newestPage = allPages[allPages.length - 1];

      if (newestPage) {
        editor.selectNone();
        editor.setCurrentPage(newestPage.id);
        saveSnapshot();
        refresh();
      }
    }, 0);
  };

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

  const startEdit = (id: TLPageId, name: string) => {
    setEditingId(id);
    setDraftName(name);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

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

  const handleDragStart = (id: TLPageId) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: TLPageId) => {
    if (draggedId && draggedId !== targetId) {
      const fromIndex = pages.findIndex((p) => p.id === draggedId);
      const toIndex = pages.findIndex((p) => p.id === targetId);
      if (fromIndex !== -1 && toIndex !== -1) {
        const reordered = [...pages];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);

        reordered.forEach((page, idx) => {
          const previous = reordered[idx - 1]?.index;
          const newIndex = previous ? getIndexAbove(previous) : getIndexAbove();
          editor.updatePage({ ...page, index: newIndex });
        });

        saveSnapshot();
        refresh();
      }
    }
    setDraggedId(null);
  };

  const currentPage = pages.find((p) => p.id === currentPageId);

  useEffect(() => {
    const updatePages = () => setPages(editor.getPages());

    updatePages();
    const cleanup = editor.store.listen(updatePages, {
      source: "user",
    });

    return cleanup;
  }, [editor]);

  return (
    <DropdownMenu>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <IconFile className="mr-1" />
              {currentPage?.name || ""}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Pages</p>
        </TooltipContent>
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
            <span className="cursor-grab p-1">
              <IconGripVertical className="text-muted-foreground" />
            </span>
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
                onClick={() => {
                  if (editor.getPages().some((p) => p.id === page.id)) {
                    editor.setCurrentPage(page.id);
                  }
                }}
              >
                <span className={page.id === currentPageId ? "font-bold" : ""}>
                  {page.name}
                </span>
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
              {editingId === page.id ? (
                <IconCheck className="text-muted-foreground" />
              ) : (
                <IconEdit className="text-muted-foreground" />
              )}
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

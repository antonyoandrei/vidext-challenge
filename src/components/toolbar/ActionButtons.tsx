// Agrupa los botones de acciones generales: undo, redo, delete y duplicate
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconTrash,
  IconCopy,
} from "@tabler/icons-react";
import { PagesMenu } from "@/components/PagesMenu";
import { useEditor } from "@tldraw/tldraw";

export function ActionButtons({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  return (
    <div className="flex items-center space-x-2">
      {/* Navegación entre páginas */}
      <PagesMenu editor={editor} />
      <Separator orientation="vertical" className="h-6" />
      {/* Undo */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => editor.undo()}>
            <IconArrowBackUp />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo</p>
        </TooltipContent>
      </Tooltip>
      {/* Redo */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => editor.redo()}>
            <IconArrowForwardUp />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo</p>
        </TooltipContent>
      </Tooltip>
      {/* Delete */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.deleteShapes(editor.getSelectedShapeIds())}
          >
            <IconTrash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
      {/* Duplicate */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.duplicateShapes(editor.getSelectedShapeIds())}
          >
            <IconCopy />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Duplicate</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

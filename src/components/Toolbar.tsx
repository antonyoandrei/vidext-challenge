"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconTrash,
  IconCopy,
  IconPencil,
  IconShape,
  IconZoom,
  IconPalette,
  IconPointer,
  IconHandStop,
  IconEraser,
  IconTypography,
  IconZoomIn,
  IconZoomOut,
  IconZoomScan,
  IconZoomInArea,
} from "@tabler/icons-react";
import { useEditor, useValue } from "@tldraw/tldraw";
import { useEffect, useState } from "react";
import { StylesPanel } from "./StylesPanel";
import { PagesMenu } from "./PagesMenu";
import Image from "next/image";

export function Toolbar() {
  const editor = useEditor();
  const [openStyles, setOpenStyles] = useState(false);

  const currentTool = useValue(
    "current tool",
    () => editor.getCurrentToolId(),
    [editor]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        editor.zoomIn();
      } else {
        editor.zoomOut();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [editor]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        editor.deleteShapes(editor.getSelectedShapeIds());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editor]);

  return (
    <div className="flex items-center justify-between bg-primary px-14 py-2 shadow-md">
      <div className="flex items-center space-x-2">
        <PagesMenu editor={editor} />
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="icon" onClick={() => editor.undo()}>
          <IconArrowBackUp />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.redo()}>
          <IconArrowForwardUp />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.deleteShapes(editor.getSelectedShapeIds())}
        >
          <IconTrash />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.duplicateShapes(editor.getSelectedShapeIds())}
        >
          <IconCopy />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant={currentTool === "select" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("select");
          }}
        >
          <IconPointer />
        </Button>
        <Button
          variant={currentTool === "hand" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("hand");
          }}
        >
          <IconHandStop />
        </Button>
        <Button
          variant={currentTool === "draw" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("draw");
          }}
        >
          <IconPencil />
        </Button>
        <Button
          variant={currentTool === "eraser" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("eraser");
          }}
        >
          <IconEraser />
        </Button>
        <Button
          variant={currentTool === "text" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("text");
          }}
        >
          <IconTypography />
        </Button>
        <Button
          variant={currentTool === "geo" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            editor.selectNone();
            editor.setCurrentTool("geo");
          }}
        >
          <IconShape />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Popover open={openStyles} onOpenChange={setOpenStyles}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconPalette />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <StylesPanel editor={editor} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconZoom className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 space-y-2">
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={() => editor.zoomIn()}>
                <IconZoomIn className="w-4 h-4 mr-1" /> Zoom in
              </Button>
              <Button size="sm" onClick={() => editor.zoomOut()}>
                <IconZoomOut className="w-4 h-4 mr-1" /> Zoom out
              </Button>
              <Button size="sm" onClick={() => editor.zoomToFit()}>
                <IconZoomScan className="w-4 h-4 mr-1" /> Zoom to fit
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const selectedIds = editor.getSelectedShapeIds();
                  if (selectedIds.length > 0) {
                    editor.zoomToSelection();
                  }
                }}
              >
                <IconZoomInArea className="w-4 h-4 mr-1" /> Focus on selection
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

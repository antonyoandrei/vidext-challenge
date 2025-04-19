// Paneles flotantes para estilos y zoom
"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  IconPalette,
  IconZoom,
  IconZoomIn,
  IconZoomOut,
  IconZoomScan,
  IconZoomInArea,
} from "@tabler/icons-react";
import { StylesPanel } from "@/components/StylesPanel";
import { useEditor } from "@tldraw/tldraw";

export function StyleZoomButtons({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  const [openStyles, setOpenStyles] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {/* Panel de estilos para cambiar propiedades de los objetos seleccionados */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="inline-block">
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
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Styles</p>
        </TooltipContent>
      </Tooltip>

      {/* Panel de zoom */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="inline-block">
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
                    <IconZoomInArea className="w-4 h-4 mr-1" /> Focus on
                    selection
                  </Button>
                </div>
              </PopoverContent>
            </Popover>{" "}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Zoom</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

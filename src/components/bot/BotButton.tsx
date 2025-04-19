// Botón que abre el dialog de pAInt Bot
"use client";

import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { IconRobot } from "@tabler/icons-react";

export function BotButton({ onOpen }: { onOpen: () => void }) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-primary scale-130 hover:scale-140 transition-all rounded-full shadow-lg border-2 border-primary-foreground"
          onClick={onOpen}
        >
          <IconRobot />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>pAInt Bot</p>
      </TooltipContent>
    </Tooltip>
  );
}

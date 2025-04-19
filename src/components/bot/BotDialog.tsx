// Dialog de pAInt Bot: textarea y controles para generar la imagen
"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BotDialogProps } from "@/types/types";

export function BotDialog({
  open,
  onClose,
  placeholder,
  prompt,
  onChange,
  onFocus,
  onGenerate,
  isLoading,
}: BotDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>pAInt Bot</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Describe the image you want to generate.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder={prompt ? "" : placeholder}
          value={prompt}
          onChange={(e) => onChange(e.currentTarget.value)}
          onFocus={onFocus}
          className="mb-4 h-24"
        />
        <DialogFooter className="flex justify-end space-x-2">
          <Button onClick={onGenerate} disabled={prompt.length === 0}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

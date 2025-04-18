import React, { useCallback, useEffect, useState } from "react";
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
import { IconRobot } from "@tabler/icons-react";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { AssetRecordType } from "@tldraw/tldraw";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { BotProps } from "@/types/editor";

export function Bot({ editor }: BotProps) {
  const [open, setOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const generateImage = trpc.generateImage.useMutation();
  const isLoading = generateImage.status === "pending";
  const examples = [
    "A puppy made of lettuce in a sunny garden",
    "An astronaut riding a unicorn on Mars",
    "A futuristic cityscape at sunset",
    "A dragon made of water emerging from the ocean",
    "A cat wearing steampunk goggles, portrait style",
    "A magical forest filled with glowing mushrooms",
    "A robot chef cooking a pizza in a modern kitchen",
  ];

  const [animPlaceholder, setAnimPlaceholder] = useState("");
  const [animIndex, setAnimIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (!animating) return;
    const current = examples[animIndex];
    let timeout: number;
    if (typingForward) {
      if (charIndex < current.length) {
        timeout = window.setTimeout(() => {
          setCharIndex((ci) => ci + 1);
          setAnimPlaceholder(current.slice(0, charIndex + 1));
        }, 100);
      } else {
        timeout = window.setTimeout(() => setTypingForward(false), 1000);
      }
    } else {
      if (charIndex > 0) {
        timeout = window.setTimeout(() => {
          setCharIndex((ci) => ci - 1);
          setAnimPlaceholder(current.slice(0, charIndex - 1));
        }, 50);
      } else {
        let next = Math.floor(Math.random() * examples.length);
        if (next === animIndex) {
          next = (animIndex + 1) % examples.length;
        }
        setAnimIndex(next);
        setTypingForward(true);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [charIndex, typingForward, animIndex, animating, examples]);

  const handlePromptChange = (value: string) => {
    setUserPrompt(value);
    if (value) {
      setAnimating(false);
    } else {
      setAnimating(true);
      setTypingForward(true);
      setCharIndex(0);
      setAnimIndex(Math.floor(Math.random() * examples.length));
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!userPrompt.trim()) return;
    try {
      const { url } = await generateImage.mutateAsync({ prompt: userPrompt });

      const assetId = AssetRecordType.createId();
      const imageWidth = 1024;
      const imageHeight = 1024;

      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: userPrompt,
            src: url ?? null,
            w: imageWidth,
            h: imageHeight,
            mimeType: "image/png",
            isAnimated: false,
          },
          meta: {},
        },
      ]);

      const x = (window.innerWidth - imageWidth) / 2;
      const y = (window.innerHeight - imageHeight) / 2;

      editor.createShape({
        type: "image",
        x,
        y,
        props: {
          assetId,
          w: imageWidth,
          h: imageHeight,
        },
      });

      setUserPrompt("");
      setOpen(false);
      toast.success("Image generated successfully!");
    } catch (err: any) {
      console.error(err);
    }
  }, [userPrompt, generateImage, editor]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-primary scale-130 hover:scale-140 transition-all rounded-full shadow-lg border-2 border-primary-foreground"
            onClick={() => {
              setOpen(true);
            }}
          >
            <IconRobot />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>pAInt Bot</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>pAInt Bot</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Describe the image you want to generate.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder={userPrompt ? "" : animPlaceholder}
          value={userPrompt}
          onChange={(e) => handlePromptChange(e.currentTarget.value)}
          onFocus={() => !userPrompt && setAnimating(true)}
          className="mb-4 h-24"
        />
        <DialogFooter className="flex justify-end space-x-2">
          <Button onClick={handleGenerate} disabled={userPrompt.length === 0}>
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

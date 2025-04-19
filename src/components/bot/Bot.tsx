// Componente pAInt Bot: orquesta el botón y el dialog de generación de IA
"use client";

import React, { useCallback, useState } from "react";
import { useAnimatedPlaceholder } from "@/hooks/useAnimatedPlaceholder";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { BotButton } from "@/components/bot/BotButton";
import { BotDialog } from "@/components/bot/BotDialog";
import { EditorProp } from "@/types/types";

export function Bot({ editor }: EditorProp) {
  const [open, setOpen] = useState(false);

  // Placeholder animado con ejemplos
  const { animPlaceholder, startAnimating, stopAnimating } =
    useAnimatedPlaceholder([
      "A puppy made of lettuce in a sunny garden",
      "An astronaut riding a unicorn on Mars",
      "A futuristic cityscape at sunset",
      "A dragon made of water emerging from the ocean",
      "A cat wearing steampunk goggles, portrait style",
      "A magical forest filled with glowing mushrooms",
      "A robot chef cooking a pizza in a modern kitchen",
    ]);

  // Lógica de generación de imagen y estado de prompt
  const { userPrompt, setUserPrompt, isLoading, generateImage } =
    useGenerateImage(editor);

  // Cerrar el dialog después de generar la imagen
  const handleGenerate = useCallback(async () => {
    await generateImage();
    setOpen(false);
  }, [generateImage]);

  return (
    <>
      <BotButton onOpen={() => setOpen(true)} />
      <BotDialog
        open={open}
        onClose={() => setOpen(false)}
        placeholder={animPlaceholder}
        prompt={userPrompt}
        onChange={(v) => {
          setUserPrompt(v);
          if (v) stopAnimating();
          else startAnimating();
        }}
        onFocus={() => !userPrompt && startAnimating()}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
    </>
  );
}

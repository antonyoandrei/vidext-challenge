// Hook para generar imágenes con trpc y volcarla en el editor
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";
import { AssetRecordType } from "@tldraw/tldraw";
import { toast } from "sonner";
import { GenerateImageEditor } from "@/types/types";

export function useGenerateImage(editor: GenerateImageEditor) {
  const [userPrompt, setUserPrompt] = useState("");
  const generateImage = trpc.generateImage.useMutation();
  const isLoading = generateImage.status === "pending";

  const generate = useCallback(async () => {
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
      toast.success("Image generated successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error", err);
      }
    }
  }, [userPrompt, generateImage, editor]);

  return {
    userPrompt,
    setUserPrompt,
    isLoading,
    generateImage: generate,
  };
}

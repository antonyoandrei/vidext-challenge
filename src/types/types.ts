import { Editor, TLStoreSnapshot, useEditor } from "@tldraw/tldraw";

export interface EditorProp {
  editor: Editor;
}

export interface CustomSnapshot extends TLStoreSnapshot {
  metadata?: {
    currentPageId?: string;
  };
}

export interface BotDialogProps {
  open: boolean;
  onClose: () => void;
  placeholder: string;
  prompt: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export interface EditorAsset {
  id: string;
  type: "image";
  typeName: "asset";
  props: {
    name: string;
    src: string | null;
    w: number;
    h: number;
    mimeType: string;
    isAnimated: boolean;
  };
  meta: Record<string, unknown>;
}

export type GenerateImageEditor = ReturnType<typeof useEditor>;

export type GeoKeys =
  | "rectangle"
  | "oval"
  | "triangle"
  | "diamond"
  | "star"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "arrow-left"
  | "arrow-up"
  | "arrow-down"
  | "arrow-right"
  | "cloud"
  | "x-box"
  | "check-box"
  | "heart";

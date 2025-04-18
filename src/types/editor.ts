import { Editor, TLStoreSnapshot } from "@tldraw/tldraw";

export interface BotProps {
  editor: Editor;
}

export interface CustomSnapshot extends TLStoreSnapshot {
  metadata?: {
    currentPageId?: string;
  };
}

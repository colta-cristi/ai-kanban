import { DndContext } from "@dnd-kit/core";
import type { ReactNode } from "react";

export function DndWrapper({ children }: { children: ReactNode }) {
  return <DndContext>{children}</DndContext>;
}

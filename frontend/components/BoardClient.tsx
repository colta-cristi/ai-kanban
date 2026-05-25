"use client";

import dynamic from "next/dynamic";
import { BoardSkeleton } from "./BoardSkeleton";

const Board = dynamic(
  () => import("./Board").then((mod) => mod.Board),
  { ssr: false, loading: () => <BoardSkeleton /> },
);

export function BoardClient() {
  return <Board />;
}

import { BoardClient } from "@/components/BoardClient";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <BoardClient />
    </div>
  );
}

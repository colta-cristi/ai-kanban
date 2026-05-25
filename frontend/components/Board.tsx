"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
} from "@/lib/board-actions";
import { initialBoard } from "@/lib/dummy-data";
import type { Board as BoardType, Card } from "@/lib/types";
import { Column } from "./Column";

function createCardId() {
  return `card-${crypto.randomUUID()}`;
}

function findColumnByCardId(board: BoardType, cardId: string) {
  return board.columns.find((col) =>
    col.cards.some((c) => c.id === cardId),
  );
}

export function Board() {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = board.columns
      .flatMap((col) => col.cards)
      .find((c) => c.id === event.active.id);
    if (card) setActiveCard(card);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumn = findColumnByCardId(board, activeId);
    if (!activeColumn) return;

    let overColumnId = overId;
    const overCardColumn = findColumnByCardId(board, overId);
    if (overCardColumn) overColumnId = overCardColumn.id;

    const overColumn = board.columns.find((c) => c.id === overColumnId);
    if (!overColumn || activeColumn.id === overColumn.id) return;

    const overIndex = overCardColumn
      ? overColumn.cards.findIndex((c) => c.id === overId)
      : overColumn.cards.length;

    setBoard((prev) => moveCard(prev, activeId, overColumnId, overIndex));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumn = findColumnByCardId(board, activeId);
    if (!activeColumn) return;

    let overColumnId = overId;
    const overCardColumn = findColumnByCardId(board, overId);
    if (overCardColumn) overColumnId = overCardColumn.id;

    const overColumn = board.columns.find((c) => c.id === overColumnId);
    if (!overColumn) return;

    const overIndex = overCardColumn
      ? overColumn.cards.findIndex((c) => c.id === overId)
      : overColumn.cards.length;

    setBoard((prev) => moveCard(prev, activeId, overColumnId, overIndex));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 border-b-4 border-accent bg-navy px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Project Board
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Drag cards between columns to update status
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex flex-1 gap-4 overflow-x-auto p-6"
          data-testid="board-columns"
        >
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onRename={(columnId, title) =>
                setBoard((prev) => renameColumn(prev, columnId, title))
              }
              onAddCard={(columnId, title, details) =>
                setBoard((prev) =>
                  addCard(prev, columnId, {
                    id: createCardId(),
                    title,
                    details,
                  }),
                )
              }
              onDeleteCard={(columnId, cardId) =>
                setBoard((prev) => deleteCard(prev, columnId, cardId))
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <article className="w-72 rounded-lg border border-primary/20 bg-card-bg p-4 shadow-lg ring-2 ring-accent/50">
              <h3 className="text-sm font-semibold text-navy">
                {activeCard.title}
              </h3>
              <p className="mt-2 text-sm text-gray">{activeCard.details}</p>
            </article>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

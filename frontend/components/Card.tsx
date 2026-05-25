"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
};

export function Card({ card, columnId, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="group rounded-lg border border-black/5 bg-card-bg p-4 shadow-sm transition-shadow hover:shadow-md"
      data-testid={`card-${card.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="min-w-0 flex-1 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <h3 className="text-sm font-semibold text-navy">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray">
            {card.details}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(columnId, card.id)}
          className="shrink-0 rounded px-2 py-1 text-xs text-gray opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
          aria-label={`Delete card ${card.title}`}
          data-testid={`delete-card-${card.id}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

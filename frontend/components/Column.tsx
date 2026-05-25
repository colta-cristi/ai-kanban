"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import type { Column as ColumnType } from "@/lib/types";
import { Card } from "./Card";

type ColumnProps = {
  column: ColumnType;
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
};

export function Column({
  column,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  });

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const saveTitle = () => {
    const trimmed = editTitle.trim();
    if (trimmed) onRename(column.id, trimmed);
    else setEditTitle(column.title);
    setIsEditing(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    const details = newDetails.trim();
    if (!title) return;
    onAddCard(column.id, title, details);
    setNewTitle("");
    setNewDetails("");
    setShowAddForm(false);
  };

  return (
    <section
      className={`flex w-72 shrink-0 flex-col rounded-xl bg-column-bg shadow-sm ${
        isOver ? "ring-2 ring-primary/40" : ""
      }`}
      data-testid={`column-${column.id}`}
    >
      <div className="h-1 rounded-t-xl bg-accent" />
      <header className="px-4 pt-4 pb-2">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setEditTitle(column.title);
                setIsEditing(false);
              }
            }}
            className="w-full rounded border border-primary/30 bg-white px-2 py-1 text-sm font-semibold text-navy outline-none focus:border-primary"
            aria-label="Column title"
            data-testid={`column-title-input-${column.id}`}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditTitle(column.title);
              setIsEditing(true);
            }}
            className="w-full text-left text-sm font-semibold text-navy hover:text-primary"
            data-testid={`column-title-${column.id}`}
          >
            {column.title}
          </button>
        )}
        <p className="mt-1 text-xs text-gray">
          {column.cards.length} {column.cards.length === 1 ? "card" : "cards"}
        </p>
      </header>

      <div
        ref={setNodeRef}
        className="flex min-h-[120px] flex-1 flex-col gap-3 overflow-y-auto px-3 pb-3"
      >
        <SortableContext
          items={column.cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              columnId={column.id}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
      </div>

      <footer className="px-3 pb-4">
        {showAddForm ? (
          <form onSubmit={handleAddSubmit} className="space-y-2 rounded-lg bg-white p-3 shadow-sm">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Card title"
              className="w-full rounded border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-primary"
              aria-label="New card title"
              data-testid={`add-card-title-${column.id}`}
            />
            <textarea
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              placeholder="Details (optional)"
              rows={2}
              className="w-full resize-none rounded border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-primary"
              aria-label="New card details"
              data-testid={`add-card-details-${column.id}`}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded bg-secondary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                data-testid={`add-card-submit-${column.id}`}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTitle("");
                  setNewDetails("");
                }}
                className="rounded px-3 py-1.5 text-sm text-gray hover:bg-black/5"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full rounded-lg border border-dashed border-primary/40 py-2 text-sm font-medium text-primary hover:bg-primary/5"
            data-testid={`add-card-button-${column.id}`}
          >
            Add card
          </button>
        )}
      </footer>
    </section>
  );
}

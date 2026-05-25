import type { Board, Card } from "./types";

export function renameColumn(
  board: Board,
  columnId: string,
  title: string,
): Board {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, title } : col,
    ),
  };
}

export function addCard(
  board: Board,
  columnId: string,
  card: Card,
): Board {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, cards: [...col.cards, card] } : col,
    ),
  };
}

export function deleteCard(
  board: Board,
  columnId: string,
  cardId: string,
): Board {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId
        ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
        : col,
    ),
  };
}

function findCardLocation(board: Board, cardId: string) {
  for (const column of board.columns) {
    const index = column.cards.findIndex((c) => c.id === cardId);
    if (index !== -1) {
      return { columnId: column.id, index };
    }
  }
  return null;
}

export function moveCard(
  board: Board,
  cardId: string,
  toColumnId: string,
  toIndex: number,
): Board {
  const from = findCardLocation(board, cardId);
  if (!from) return board;

  let card: Card | undefined;
  const columnsWithout = board.columns.map((col) => {
    if (col.id !== from.columnId) return col;
    const idx = col.cards.findIndex((c) => c.id === cardId);
    if (idx === -1) return col;
    card = col.cards[idx];
    return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
  });

  if (!card) return board;

  return {
    columns: columnsWithout.map((col) => {
      if (col.id !== toColumnId) return col;
      const cards = [...col.cards];
      const insertAt = Math.max(0, Math.min(toIndex, cards.length));
      cards.splice(insertAt, 0, card!);
      return { ...col, cards };
    }),
  };
}

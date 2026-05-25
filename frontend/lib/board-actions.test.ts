import { describe, expect, it } from "vitest";
import { initialBoard } from "./dummy-data";
import { addCard, deleteCard, moveCard, renameColumn } from "./board-actions";

describe("board-actions", () => {
  it("renames a column", () => {
    const result = renameColumn(initialBoard, "col-1", "Ideas");
    expect(result.columns[0].title).toBe("Ideas");
    expect(result.columns[1].title).toBe("Ready");
  });

  it("adds a card to a column", () => {
    const result = addCard(initialBoard, "col-2", {
      id: "card-new",
      title: "New task",
      details: "Details here",
    });
    expect(result.columns[1].cards).toHaveLength(3);
    expect(result.columns[1].cards[2].title).toBe("New task");
  });

  it("deletes a card from a column", () => {
    const result = deleteCard(initialBoard, "col-1", "card-1");
    expect(result.columns[0].cards).toHaveLength(2);
    expect(result.columns[0].cards.find((c) => c.id === "card-1")).toBeUndefined();
  });

  it("moves a card to another column", () => {
    const result = moveCard(initialBoard, "card-1", "col-5", 0);
    expect(result.columns[0].cards).toHaveLength(2);
    expect(result.columns[4].cards[0].id).toBe("card-1");
  });

  it("reorders a card within the same column", () => {
    const result = moveCard(initialBoard, "card-1", "col-1", 2);
    expect(result.columns[0].cards[2].id).toBe("card-1");
  });
});

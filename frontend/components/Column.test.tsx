import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { initialBoard } from "@/lib/dummy-data";
import { Column } from "./Column";
import { DndWrapper } from "./test-utils";

const column = initialBoard.columns[0];

describe("Column", () => {
  it("renders column title and cards", () => {
    render(
      <DndWrapper>
        <Column
          column={column}
          onRename={vi.fn()}
          onAddCard={vi.fn()}
          onDeleteCard={vi.fn()}
        />
      </DndWrapper>,
    );
    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("Research competitors")).toBeInTheDocument();
  });

  it("calls onRename when title is edited", async () => {
    const onRename = vi.fn();
    const user = userEvent.setup();
    render(
      <DndWrapper>
        <Column
          column={column}
          onRename={onRename}
          onAddCard={vi.fn()}
          onDeleteCard={vi.fn()}
        />
      </DndWrapper>,
    );
    await user.click(screen.getByRole("button", { name: "Backlog" }));
    const input = screen.getByTestId("column-title-input-col-1");
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");
    expect(onRename).toHaveBeenCalledWith("col-1", "Ideas");
  });
});

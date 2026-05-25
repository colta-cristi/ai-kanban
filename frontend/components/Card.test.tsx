import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Card } from "./Card";
import { DndWrapper } from "./test-utils";

const card = {
  id: "card-test",
  title: "Test card",
  details: "Test details",
};

describe("Card", () => {
  it("displays title and details", () => {
    render(
      <DndWrapper>
        <Card card={card} columnId="col-1" onDelete={vi.fn()} />
      </DndWrapper>,
    );
    expect(screen.getByText("Test card")).toBeInTheDocument();
    expect(screen.getByText("Test details")).toBeInTheDocument();
  });

  it("calls onDelete when delete is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <DndWrapper>
        <Card card={card} columnId="col-1" onDelete={onDelete} />
      </DndWrapper>,
    );
    await user.click(screen.getByTestId("delete-card-card-test"));
    expect(onDelete).toHaveBeenCalledWith("col-1", "card-test");
  });
});

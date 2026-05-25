import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Board } from "./Board";

describe("Board", () => {
  it("renders five columns with dummy data", () => {
    render(<Board />);
    expect(screen.getByText("Project Board")).toBeInTheDocument();
    expect(screen.getByTestId("board-columns")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-1")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-5")).toBeInTheDocument();
    expect(screen.getByText("Research competitors")).toBeInTheDocument();
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
  });
});

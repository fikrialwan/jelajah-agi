import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import Booth from "~/lib/components/pages/ruler/booth";

describe("booth page", () => {
  beforeAll(() => {
    render(<Booth />);
  });

  it("should have title 'List booth' and add button", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: "List booth",
    });
    const addButton = screen.getByRole("button", {
      name: /Add/,
    });

    expect(title).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("should have 3 item on list booth", () => {
    const boothItems = screen.getAllByLabelText("CardBooth");

    expect(boothItems).toHaveLength(3);
  });
});

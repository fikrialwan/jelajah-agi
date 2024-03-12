import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import Home from "~/app/page";

describe("Home page", () => {
  it("Have a heading", () => {
    render(<Home />);
    const getStartedText = screen.getByRole("heading", {
      level: 1,
      name: "Jelajah AGI",
    });
    expect(getStartedText).toBeInTheDocument();
  });
});

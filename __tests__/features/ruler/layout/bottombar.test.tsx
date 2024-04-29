import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import BottomNavLink from "~/lib/components/features/ruler/layout/bottombar/navlink";

describe("navlink bottombar", () => {
  it("should render correctly", () => {
    render(<BottomNavLink href="/ruler/booth">booth icon</BottomNavLink>);

    const anchor = screen.getByRole("link", {
      name: /booth icon/,
    });

    expect(anchor).toHaveAttribute("href", "/ruler/booth");
  });
});

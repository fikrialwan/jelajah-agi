import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import RulerSidebar from "~/lib/components/features/ruler/layout/sidebar";
import SideNavLink from "~/lib/components/features/ruler/layout/sidebar/navlink";

describe("navlink sidebar", () => {
  beforeAll(() => {
    render(
      <SideNavLink icon={<p>icon booth</p>} href="/ruler/booth">
        booth
      </SideNavLink>
    );
  });

  it("should render icon correctly from props", () => {
    const icon = screen.getByText("icon booth");

    expect(icon).toBeInTheDocument();
  });

  it("should render anchor correctly", () => {
    const anchor = screen.getByRole("link", {
      name: /booth/,
    });

    expect(anchor).toHaveAttribute("href", "/ruler/booth");
  });
});

describe("sidebar ruler", () => {
  beforeAll(() => {
    render(<RulerSidebar />);
  });

  it("should render title correctly", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: /Jelajah AGI/,
    });

    expect(title).toBeInTheDocument();
  });

  it("should have list link correctly", () => {
    const booth = screen.getByRole("link", {
      name: /Booth/,
    });

    const user = screen.getByRole("link", {
      name: /User/,
    });

    expect(user).toBeInTheDocument();
    expect(user).toBeInTheDocument();
  });
});

import { it, describe, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RulerNavbar from "~/lib/components/features/ruler/layout/navbar";

describe("navbar ruler", () => {
  beforeAll(() => {
    render(<RulerNavbar />);
  });

  it("should have logout button", () => {
    const logoutButton = screen.getByRole("button", {
      name: "Logout",
    });

    expect(logoutButton).toBeInTheDocument();
  });

  it("should show alert when klik logout button", async () => {
    const logoutButton = screen.getByRole("button", {
      name: "Logout",
    });

    fireEvent.click(logoutButton);

    const titleAlert = await screen.findByRole("heading", {
      level: 2,
      name: "Are you sure want to logout?",
    });
    const cancelButton = await screen.findByRole("button", {
      name: "Cancel",
    });
    const yesButton = await screen.findByRole("button", {
      name: "Yes",
    });

    expect(titleAlert).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
  });
});

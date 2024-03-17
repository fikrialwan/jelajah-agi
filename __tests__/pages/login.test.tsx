import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Login from "~/lib/components/pages/login";

describe("Login page", () => {
  beforeAll(() => {
    render(<Login />);
  });

  it("Should have title and description page", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Login",
    });
    const description = screen.getByText("Please sign in to continue");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("Should called login form component", () => {
    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });
});

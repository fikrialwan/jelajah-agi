import { it, describe, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import LoginForm from "~/lib/components/features/login/form";

describe("Login Form Component", () => {
  beforeAll(() => {
    render(<LoginForm />);
  });

  it("Should have field Email", () => {
    const label = screen.getByLabelText("Email");
    const field = screen.getByLabelText("Email", { selector: "input" });

    expect(label).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });

  it("Should have field Password", () => {
    const label = screen.getByLabelText("Password");
    const field = screen.getByLabelText("Password", { selector: "input" });

    expect(label).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });

  it("Should have button login", () => {
    const button = screen.getByRole("button", { name: "Login" });

    expect(button).toBeInTheDocument();
  });

  it("Should show error required when user not fill the field", async () => {
    const button = screen.getByRole("button", { name: "Login" });

    fireEvent.click(button);

    const emailError = await screen.findByText("Email is required");
    const passwordError = await screen.findByText("Password is required");

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it("Should show erorr email not valid when user fill not valid email", async () => {
    const email = screen.getByLabelText("Email", { selector: "input" });
    const button = screen.getByRole("button", { name: "Login" });

    fireEvent.change(email, { target: { value: "Test" } });
    fireEvent.click(button);

    const emailError = await screen.findByText("Your email is not valid");

    expect(emailError).toBeInTheDocument();
  });
});

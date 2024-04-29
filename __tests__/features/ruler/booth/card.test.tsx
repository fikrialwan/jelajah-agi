import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CardBooth from "~/lib/components/features/ruler/booth/card";

describe("booth card", () => {
  beforeAll(() => {
    render(
      <CardBooth pic="Riko Chair" img="https://img.com/janaiz" title="Janaiz" />
    );
  });

  it("should render from props correctly", () => {
    const title = screen.getByRole("heading", {
      level: 3,
      name: "Janaiz",
    });
    const img = screen.getByAltText("Janaiz");
    const pic = screen.getByText(/Riko Chair/);

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(pic).toBeInTheDocument();
  });

  it("should have button edit and delete", () => {
    const editButton = screen.getByLabelText("EditButton");
    const deleteButton = screen.getByLabelText("DeleteButton");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

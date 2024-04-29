import { it, describe, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import BoothAdd from "~/lib/components/features/ruler/booth/add";

describe("add booth", () => {
  beforeAll(() => {
    render(<BoothAdd />);
  });

  it("Should render modal correctly when click add button", async () => {
    const addButton = screen.getByRole("button", {
      name: /Add/,
    });

    fireEvent.click(addButton);

    const title = await screen.findByRole("heading", {
      level: 2,
      name: "Add booth",
    });
    const labelName = await screen.findByText("Name");
    const labelPic = await screen.findByText("PIC");
    const labelImage = await screen.findByText("Image");
    const saveButton = await screen.findByRole("button", {
      name: "Save",
    });

    expect(title).toBeInTheDocument();
    expect(labelName).toBeInTheDocument();
    expect(labelPic).toBeInTheDocument();
    expect(labelImage).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});

import { it, describe, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import BoothUpdate from "~/lib/components/features/ruler/booth/update";

describe("update booth", () => {
  beforeAll(() => {
    render(<BoothUpdate />);
  });

  it("Should render modal correctly when click add button", async () => {
    const editButton = screen.getByLabelText("EditButton");

    fireEvent.click(editButton);

    const title = await screen.findByRole("heading", {
      level: 2,
      name: "Update booth",
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

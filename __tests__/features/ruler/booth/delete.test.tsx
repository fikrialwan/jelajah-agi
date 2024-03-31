import { it, describe, expect, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import BoothDelete from "~/lib/components/features/ruler/booth/delete";

describe("delete booth", () => {
  beforeAll(() => {
    render(<BoothDelete />);
  });

  it("Should render alert correctly when click delete button", async () => {
    const deleteButton = screen.getByLabelText("DeleteButton");

    fireEvent.click(deleteButton);

    const title = await screen.findByRole("heading", {
      level: 2,
      name: "Are you sure ?",
    });
    const description = await screen.findByText(
      "This action cannot be undone. This will permanently delete your booth and remove your data from our servers."
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});

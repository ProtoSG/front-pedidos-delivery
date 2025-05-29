import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock de useExtras
jest.mock("../../../../hooks/useExtras", () => () => ({
  extras: [
    { id: 1, nombre: "Extra1" },
    { id: 2, nombre: "Extra2" },
  ],
}));

// Mock de ExtraForm
jest.mock("../../components/ExtraForm", () => (props) => (
  <div data-testid="extra-form">
    {props.edit ? "edit" : "create"}-{props.extra?.nombre}
  </div>
));

import UpdateExtra from "../UpdateExtra";

describe("UpdateExtra page", () => {
  it("renderiza el título y pasa el extra correcto al formulario", () => {
    render(
      <MemoryRouter initialEntries={["/admin/extras/2/edit"]}>
        <Routes>
          <Route path="/admin/extras/:id/edit" element={<UpdateExtra />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Editar Producto")).toBeInTheDocument();
    // Verifica que el ExtraForm recibe el extra con id 2 y la prop edit
    expect(screen.getByTestId("extra-form").textContent).toBe("edit-Extra2");
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock de useCategorias
jest.mock("../../../../hooks/useCategorias", () => () => ({
  categorias: [
    { id: 1, nombre: "Cat1" },
    { id: 2, nombre: "Cat2" },
  ],
}));

// Mock de CategoryForm
jest.mock("../../components/CategoryForm", () => (props) => (
  <div data-testid="category-form">
    {props.edit ? "edit" : "create"}-{props.categoria?.nombre}
  </div>
));

import UpdateCategory from "../UpdateCategory";

describe("UpdateCategory page", () => {
  it("renderiza el título y pasa la categoría correcta al formulario", () => {
    render(
      <MemoryRouter initialEntries={["/admin/categorias/2/edit"]}>
        <Routes>
          <Route
            path="/admin/categorias/:id/edit"
            element={<UpdateCategory />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Editar Producto")).toBeInTheDocument();
    // Verifica que el CategoryForm recibe la categoría con id 2 y la prop edit
    expect(screen.getByTestId("category-form").textContent).toBe("edit-Cat2");
  });
});

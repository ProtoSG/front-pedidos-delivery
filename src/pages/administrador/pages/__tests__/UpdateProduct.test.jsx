import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock de useProductos
jest.mock("../../../../hooks/useProductos", () => () => ({
  productos: [
    { id: 1, nombre: "Producto1" },
    { id: 2, nombre: "Producto2" },
  ],
}));

// Mock de ProductForm
jest.mock("../../components/ProductForm", () => (props) => (
  <div data-testid="product-form">
    {props.edit ? "edit" : "create"}-{props.producto?.nombre}
  </div>
));

import UpdateProduct from "../UpdateProduct";

describe("UpdateProduct page", () => {
  it("renderiza el título y pasa el producto correcto al formulario", () => {
    render(
      <MemoryRouter initialEntries={["/admin/productos/2/edit"]}>
        <Routes>
          <Route path="/admin/productos/:id/edit" element={<UpdateProduct />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Editar Producto")).toBeInTheDocument();
    // Verifica que el ProductForm recibe el producto con id 2 y la prop edit
    expect(screen.getByTestId("product-form").textContent).toBe(
      "edit-Producto2",
    );
  });
});

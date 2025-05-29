import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mocks para error
jest.mock("../../components/Table", () => (props) => (
  <div data-testid={`table-${props.title.toLowerCase()}`}>
    {props.title}
    {props.error && <span>Error!</span>}
  </div>
));
jest.mock("../../components/ActionsButtons", () => () => (
  <div data-testid="actions-buttons" />
));
jest.mock("../../../../hooks/useCategorias", () => () => ({
  categorias: [],
  loadingCategorias: false,
  errorCategorias: "Error!",
}));
jest.mock("../../../../hooks/useProductos", () => () => ({
  productos: [],
  loadingProductos: false,
  errorProductos: "Error!",
}));
jest.mock("../../../../hooks/useExtras", () => () => ({
  extras: [],
  loadingExtras: false,
  errorExtras: "Error!",
}));

import Dashboard from "../Dashboard";

describe("Dashboard page (error)", () => {
  it("muestra mensaje de error si error es true", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Error!").length).toBeGreaterThan(0);
  });
});

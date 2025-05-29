import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mocks para loading
jest.mock("../../components/Table", () => (props) => (
  <div data-testid={`table-${props.title.toLowerCase()}`}>
    {props.title}
    {props.loading && <span>Cargando...</span>}
  </div>
));
jest.mock("../../components/ActionsButtons", () => () => (
  <div data-testid="actions-buttons" />
));
jest.mock("../../../../hooks/useCategorias", () => () => ({
  categorias: [],
  loadingCategorias: true,
  errorCategorias: null,
}));
jest.mock("../../../../hooks/useProductos", () => () => ({
  productos: [],
  loadingProductos: true,
  errorProductos: null,
}));
jest.mock("../../../../hooks/useExtras", () => () => ({
  extras: [],
  loadingExtras: true,
  errorExtras: null,
}));

import Dashboard from "../Dashboard";

describe("Dashboard page (loading)", () => {
  it("muestra mensaje de carga si loading es true", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Cargando...").length).toBeGreaterThan(0);
  });
});

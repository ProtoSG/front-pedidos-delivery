import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mocks por defecto
jest.mock("../../components/Table", () => (props) => (
  <div data-testid={`table-${props.title.toLowerCase()}`}>
    {props.title}
    {props.loading && <span>Cargando...</span>}
    {props.error && <span>Error!</span>}
    {props.data && props.data.length > 0 && <span>Con datos</span>}
  </div>
));
jest.mock("../../components/ActionsButtons", () => () => (
  <div data-testid="actions-buttons" />
));

jest.mock("../../../../hooks/useCategorias", () => () => ({
  categorias: [{ id: 1, nombre: "Cat1" }],
  loadingCategorias: false,
  errorCategorias: null,
}));
jest.mock("../../../../hooks/useProductos", () => () => ({
  productos: [
    {
      id: 1,
      nombre: "Prod1",
      precio: 10,
      categoria: { nombre: "Cat1" },
      descripcion: "desc",
    },
  ],
  loadingProductos: false,
  errorProductos: null,
}));
jest.mock("../../../../hooks/useExtras", () => () => ({
  extras: [{ id: 1, nombre: "Extra1", precio: 5 }],
  loadingExtras: false,
  errorExtras: null,
}));

import Dashboard from "../Dashboard";

describe("Dashboard page", () => {
  it("renderiza el título y el botón de agregar", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Argegar")).toBeInTheDocument();
  });

  it("renderiza las tablas de Productos, Categorias y Extras", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("table-productos")).toBeInTheDocument();
    expect(screen.getByTestId("table-categorias")).toBeInTheDocument();
    expect(screen.getByTestId("table-extras")).toBeInTheDocument();
  });

  it("muestra datos en las tablas si hay data", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Con datos").length).toBe(3);
  });
});

import { render, screen } from "@testing-library/react";
import VentasCategoria from "../VentasCategoria";

// Mock del componente Bar de react-chartjs-2
jest.mock("react-chartjs-2", () => ({
  Bar: (props) => (
    <div data-testid="bar-chart-mock">{JSON.stringify(props.data)}</div>
  ),
}));

// Variables globales para controlar el mock
let mockCategoriasDia = [
  { nombre: "Pescados", total: 10 },
  { nombre: "Mariscos", total: 20 },
];
let mockCategoriasSemana = [
  { nombre: "Pescados", total: 100 },
  { nombre: "Mariscos", total: 200 },
];
let mockCategoriasMes = [
  { nombre: "Pescados", total: 1000 },
  { nombre: "Mariscos", total: 2000 },
];
let mockCategoriasAno = [
  { nombre: "Pescados", total: 10000 },
  { nombre: "Mariscos", total: 20000 },
];
let mockLoadingCategorias = false;
let mockErrorCategorias = false;

// Mock configurable para useRankCategoria
jest.mock("../../hooks/useRankCategoria", () => (params) => {
  switch (params.date) {
    case "dia":
      return {
        categorias: mockCategoriasDia,
        loadingCategorias: mockLoadingCategorias,
        errorCategorias: mockErrorCategorias,
      };
    case "semana":
      return {
        categorias: mockCategoriasSemana,
        loadingCategorias: false,
        errorCategorias: false,
      };
    case "mes":
      return {
        categorias: mockCategoriasMes,
        loadingCategorias: false,
        errorCategorias: false,
      };
    case "año":
      return {
        categorias: mockCategoriasAno,
        loadingCategorias: false,
        errorCategorias: false,
      };
    default:
      return {
        categorias: [],
        loadingCategorias: false,
        errorCategorias: false,
      };
  }
});

describe("VentasCategoria component", () => {
  beforeEach(() => {
    mockCategoriasDia = [
      { nombre: "Pescados", total: 10 },
      { nombre: "Mariscos", total: 20 },
    ];
    mockLoadingCategorias = false;
    mockErrorCategorias = false;
  });

  it("renderiza correctamente el título y el gráfico de barras para el intervalo activo", () => {
    render(<VentasCategoria activeInterval="1D" />);
    expect(screen.getByText(/Ventas por Categoría/i)).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart-mock")).toBeInTheDocument();
    expect(screen.getByText(/Pescados/)).toBeInTheDocument();
    expect(screen.getByText(/Mariscos/)).toBeInTheDocument();
  });

  it("muestra el mensaje de carga cuando loadingCategorias es true", () => {
    mockLoadingCategorias = true;
    render(<VentasCategoria activeInterval="1D" />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("muestra el mensaje de error cuando errorCategorias es true", () => {
    mockErrorCategorias = true;
    render(<VentasCategoria activeInterval="1D" />);
    expect(screen.getByText(/Hubo un error/i)).toBeInTheDocument();
  });
});

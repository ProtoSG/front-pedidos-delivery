import { render, screen } from "@testing-library/react";
import Venta from "../Venta";

// Mock ChartArea correctamente (no pasar props desconocidas al div)
jest.mock("../ChartArea", () => () => (
  <div data-testid="chart-area-mock">ChartAreaMock</div>
));

// Variables globales para controlar el mock
let mockDataDias = [{ value: 10 }, { value: 20 }];
let mockLoadingDataDias = false;
let mockErrorDataDias = false;

// Mock configurable para useDataDias
jest.mock("../../hooks/useDataDias", () => () => ({
  dataDias: mockDataDias,
  loadingDataDias: mockLoadingDataDias,
  errorDataDias: mockErrorDataDias,
}));

jest.mock("../../hooks/useDataSemanas", () => () => ({
  dataSemanas: [{ value: 100 }, { value: 200 }],
}));
jest.mock("../../hooks/useDataMeses", () => () => ({
  dataMeses: [{ value: 1000 }, { value: 2000 }],
}));
jest.mock("../../hooks/useDataAnos", () => () => ({
  dataAnos: [{ value: 10000 }, { value: 20000 }],
}));

describe("Venta component", () => {
  beforeEach(() => {
    // Resetear los valores antes de cada test
    mockDataDias = [{ value: 10 }, { value: 20 }];
    mockLoadingDataDias = false;
    mockErrorDataDias = false;
  });

  it("renderiza correctamente el título y el total para el intervalo activo", () => {
    render(<Venta activeInterval="1D" />);
    expect(screen.getByText(/Venta del Día/i)).toBeInTheDocument();
    expect(screen.getByText("S/ 20.00")).toBeInTheDocument();
    expect(screen.getByTestId("chart-area-mock")).toBeInTheDocument();
  });

  it("muestra el mensaje de carga cuando loadingDataDias es true", () => {
    mockLoadingDataDias = true;
    mockDataDias = [];
    render(<Venta activeInterval="1D" />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("muestra el mensaje de error cuando errorDataDias es true", () => {
    mockErrorDataDias = true;
    mockDataDias = [];
    render(<Venta activeInterval="1D" />);
    expect(screen.getByText(/Hubo un error/i)).toBeInTheDocument();
  });
});

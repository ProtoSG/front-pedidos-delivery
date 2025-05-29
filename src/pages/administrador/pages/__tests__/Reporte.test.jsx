import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mocks de los componentes hijos
jest.mock("../../components/RankingExtras", () => (props) => (
  <div data-testid="ranking-extras">{props.activeInterval}</div>
));
jest.mock("../../components/RankingProductos", () => (props) => (
  <div data-testid="ranking-productos">{props.activeInterval}</div>
));
jest.mock("../../components/SimpleSwitcher", () => (props) => (
  <div>
    {props.items.map((item) => (
      <button
        key={item}
        data-testid={`switcher-${item}`}
        onClick={() => props.setActiveInterval(item)}
        style={{
          fontWeight: props.activeItem === item ? "bold" : "normal",
        }}
      >
        {item}
      </button>
    ))}
  </div>
));
jest.mock("../../components/Venta", () => (props) => (
  <div data-testid="venta">{props.activeInterval}</div>
));
jest.mock("../../components/VentasCategoria", () => (props) => (
  <div data-testid="ventas-categoria">{props.activeInterval}</div>
));

import Reporte from "../Reporte";

describe("Reporte page", () => {
  it("renderiza el título y los componentes hijos con el intervalo activo", () => {
    render(
      <MemoryRouter>
        <Reporte />
      </MemoryRouter>,
    );

    expect(screen.getByText("Reporte")).toBeInTheDocument();

    // Verifica que los intervalos están en el switcher
    ["1D", "1S", "1M", "1A"].forEach((interval) => {
      expect(screen.getByTestId(`switcher-${interval}`)).toBeInTheDocument();
    });

    // Por defecto, el intervalo activo es "1D"
    expect(screen.getByTestId("venta").textContent).toBe("1D");
    expect(screen.getByTestId("ranking-productos").textContent).toBe("1D");
    expect(screen.getByTestId("ranking-extras").textContent).toBe("1D");
    expect(screen.getByTestId("ventas-categoria").textContent).toBe("1D");
  });

  it("cambia el intervalo activo al hacer click en el switcher", () => {
    render(
      <MemoryRouter>
        <Reporte />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("switcher-1M"));

    // Ahora el intervalo activo debe ser "1M"
    expect(screen.getByTestId("venta").textContent).toBe("1M");
    expect(screen.getByTestId("ranking-productos").textContent).toBe("1M");
    expect(screen.getByTestId("ranking-extras").textContent).toBe("1M");
    expect(screen.getByTestId("ventas-categoria").textContent).toBe("1M");
  });
});

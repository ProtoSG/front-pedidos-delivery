import { render, screen, fireEvent } from "@testing-library/react";
import Carta from "../Carta";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../constants/api');

// Mock ListProducts para evitar dependencias internas
jest.mock("../ListProducts", () => (props) => (
  <div data-testid="list-products-mock">{JSON.stringify(props)}</div>
));

// Mock useCategorias hook
jest.mock("../../hooks/useCategorias", () => {
  return () => ({
    categorias: [
      { id: 1, nombre: "plato" },
      { id: 2, nombre: "bebida" },
    ],
    loadingCategorias: false,
    errorCategorias: null,
  });
});

describe("Carta component", () => {
  const pedidoMock = [{ id: 1, name: "Arroz" }];
  const setPedidoMock = jest.fn();
  const totalMock = 20;
  const setTotalMock = jest.fn();

  it("renders the heading correctly", () => {
    render(
      <Carta
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    expect(screen.getByText(/Platos a la carta/i)).toBeInTheDocument();
  });

  it("renders category buttons except 'bebida'", () => {
    render(
      <Carta
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    // Solo debe renderizar la categoría 'plato'
    expect(screen.getByText("PLATO")).toBeInTheDocument();
    expect(screen.queryByText("BEBIDA")).not.toBeInTheDocument();
  });

  it("changes active category on button click", () => {
    render(
      <Carta
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    const button = screen.getByText("PLATO");
    fireEvent.click(button);
    // El botón debe seguir presente y activo (border-b-4)
    expect(button.className).toMatch(/border-b-4/);
  });

  it("renders ListProducts with correct props", () => {
    render(
      <Carta
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    const listProducts = screen.getByTestId("list-products-mock");
    expect(listProducts).toHaveTextContent("Arroz");
    expect(listProducts).toHaveTextContent("20");
  });
});

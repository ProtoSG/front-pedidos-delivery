import { render, screen } from "@testing-library/react";
import Bebida from "../Bebida";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../constants/api');

jest.mock("../ListBebida", () => (props) => (
  <div data-testid="list-bebida-mock">{JSON.stringify(props)}</div>
));

describe("Bebida component", () => {
  const pedidoMock = [{ id: 1, name: "Coca Cola" }];
  const setPedidoMock = jest.fn();
  const totalMock = 10;
  const setTotalMock = jest.fn();

  it("renders the heading correctly", () => {
    render(
      <Bebida
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    expect(screen.getByText(/Bebidas Recomendadas/i)).toBeInTheDocument();
  });

  it("passes props to ListBebida", () => {
    render(
      <Bebida
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />,
    );
    const listBebida = screen.getByTestId("list-bebida-mock");
    expect(listBebida).toHaveTextContent("Coca Cola");
    expect(listBebida).toHaveTextContent("10");
  });
});

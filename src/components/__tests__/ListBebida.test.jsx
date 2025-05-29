import { render, screen, fireEvent } from "@testing-library/react";
import ListBebida from "../ListBebida";
import { toast } from "sonner";

// Mock useBebidas hook
jest.mock("../../hooks/useBebidas", () => {
  return () => ({
    bebidas: [
      {
        id: 1,
        nombre: "Coca Cola",
        precio: 5.5,
        imagen_url: "https://example.com/coca.jpg"
      },
      {
        id: 2,
        nombre: "Inca Kola",
        precio: 6.0,
        imagen_url: "https://example.com/inca.jpg"
      }
    ]
  });
});

// Mock addProduct service
const mockAddProduct = jest.fn();
jest.mock("../../services/agregar_producto", () => ({
  addProduct: (...args) => mockAddProduct(...args)
}));

// Mock toast
jest.mock("sonner", () => {
  const mockToast = { success: jest.fn() };
  return {
    toast: mockToast,
    Toaster: () => <div data-testid="toaster-mock" />,
    __esModule: true
  };
});

describe("ListBebida component", () => {
  const pedidoMock = [];
  const setPedidoMock = jest.fn();
  const totalMock = 0;
  const setTotalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders bebidas list", () => {
    render(
      <ListBebida
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    expect(screen.getByText("Coca Cola")).toBeInTheDocument();
    expect(screen.getByText("Inca Kola")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /agregar/i })).toHaveLength(2);
    expect(screen.getByTestId("toaster-mock")).toBeInTheDocument();
  });

  it("calls addProduct and toast.success when AGREGAR is clicked", () => {
    render(
      <ListBebida
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    const addButtons = screen.getAllByRole("button", { name: /agregar/i });
    fireEvent.click(addButtons[0]);
    expect(mockAddProduct).toHaveBeenCalledWith({
      producto: {
        id: 1,
        nombre: "Coca Cola",
        precio: 5.5,
        imagen_url: "https://example.com/coca.jpg"
      },
      setPedido: setPedidoMock,
      setTotal: setTotalMock,
      total: totalMock,
      pedido: pedidoMock
    });
    expect(toast.success).toHaveBeenCalledWith("Producto agregado");
  });
});

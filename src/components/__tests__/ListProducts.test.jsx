import { render, screen, fireEvent } from "@testing-library/react";
import ListProducts from "../ListProducts";
import { toast } from "sonner";

// Mock api.js para evitar import.meta.env en tests
jest.mock('../../constants/api');

// Mock useProductos hook
jest.mock("../../hooks/useProductos");
import useProductos from "../../hooks/useProductos";

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

describe("ListProducts component", () => {
  const pedidoMock = [];
  const setPedidoMock = jest.fn();
  const totalMock = 0;
  const setTotalMock = jest.fn();
  const setCurrentPageMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders products for the active category and paginates", () => {
    useProductos.mockReturnValue({
      productos: [
        {
          id: 1,
          nombre: "Arroz Chaufa",
          descripcion: "Delicioso arroz chaufa con pollo y verduras.",
          precio: 15.5,
          imagen_url: "https://example.com/arrox.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 2,
          nombre: "Tallarin Saltado",
          descripcion: "Tallarin saltado con carne y verduras.",
          precio: 18.0,
          imagen_url: "https://example.com/tallarin.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 3,
          nombre: "Lomo Saltado",
          descripcion: "Lomo saltado tradicional.",
          precio: 20.0,
          imagen_url: "https://example.com/lomo.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 4,
          nombre: "Ceviche",
          descripcion: "Ceviche de pescado fresco.",
          precio: 22.0,
          imagen_url: "https://example.com/ceviche.jpg",
          categoria: { id: 10, nombre: "plato" }
        }
      ],
      loadingProductos: false,
      errorProductos: null
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    // Solo los primeros 3 productos en la primera página
    expect(screen.getByText("Arroz Chaufa")).toBeInTheDocument();
    expect(screen.getByText("Tallarin Saltado")).toBeInTheDocument();
    expect(screen.getByText("Lomo Saltado")).toBeInTheDocument();
    expect(screen.queryByText("Ceviche")).not.toBeInTheDocument();

    // Botones de paginación
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBeGreaterThan(0);
    expect(pageButtons[pageButtons.length - 2]).toHaveTextContent("1");
    expect(pageButtons[pageButtons.length - 1]).toHaveTextContent("2");
  });

  it("changes page when pagination button is clicked", () => {
    useProductos.mockReturnValue({
      productos: [
        {
          id: 1,
          nombre: "Arroz Chaufa",
          descripcion: "Delicioso arroz chaufa con pollo y verduras.",
          precio: 15.5,
          imagen_url: "https://example.com/arrox.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 2,
          nombre: "Tallarin Saltado",
          descripcion: "Tallarin saltado con carne y verduras.",
          precio: 18.0,
          imagen_url: "https://example.com/tallarin.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 3,
          nombre: "Lomo Saltado",
          descripcion: "Lomo saltado tradicional.",
          precio: 20.0,
          imagen_url: "https://example.com/lomo.jpg",
          categoria: { id: 10, nombre: "plato" }
        },
        {
          id: 4,
          nombre: "Ceviche",
          descripcion: "Ceviche de pescado fresco.",
          precio: 22.0,
          imagen_url: "https://example.com/ceviche.jpg",
          categoria: { id: 10, nombre: "plato" }
        }
      ],
      loadingProductos: false,
      errorProductos: null
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    const pageButtons = screen.getAllByRole("button");
    fireEvent.click(pageButtons[pageButtons.length - 1]);
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

  it("calls addProduct and toast.success when AGREGAR is clicked", () => {
    useProductos.mockReturnValue({
      productos: [
        {
          id: 1,
          nombre: "Arroz Chaufa",
          descripcion: "Delicioso arroz chaufa con pollo y verduras.",
          precio: 15.5,
          imagen_url: "https://example.com/arrox.jpg",
          categoria: { id: 10, nombre: "plato" }
        }
      ],
      loadingProductos: false,
      errorProductos: null
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    const addButtons = screen.getAllByRole("button", { name: /agregar/i });
    fireEvent.click(addButtons[0]);
    expect(mockAddProduct).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Producto agregado");
  });

  it("shows loading message when loadingProductos is true", () => {
    useProductos.mockReturnValue({
      productos: [],
      loadingProductos: true,
      errorProductos: null
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("shows error message when errorProductos is present", () => {
    useProductos.mockReturnValue({
      productos: [],
      loadingProductos: false,
      errorProductos: "Error de red"
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    expect(screen.getByText(/Error al obtener los Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Error de red/i)).toBeInTheDocument();
  });

  it("shows 'No hay productos' when productos is empty", () => {
    useProductos.mockReturnValue({
      productos: [],
      loadingProductos: false,
      errorProductos: null
    });

    render(
      <ListProducts
        active={10}
        currentPage={0}
        setCurrentPage={setCurrentPageMock}
        pedido={pedidoMock}
        setPedido={setPedidoMock}
        total={totalMock}
        setTotal={setTotalMock}
      />
    );
    expect(screen.getByText(/No hay productos/i)).toBeInTheDocument();
  });
});
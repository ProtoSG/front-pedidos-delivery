import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductForm from "../ProductForm";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock("../../../../constants/api");

// Mock ItemInput para aislar el test
jest.mock("../ItemInput", () => (props) => (
  <input
    data-testid={`item-input-${props.name}`}
    name={props.name}
    value={props.value || ""}
    onChange={props.handleChange}
    type={props.type || "text"}
  />
));

// Mock useCategorias hook
jest.mock("../../../../hooks/useCategorias", () => {
  return () => ({
    categorias: [
      { id: 1, nombre: "Platos" },
      { id: 2, nombre: "Bebidas" },
    ],
  });
});

// Mock servicios
const mockPostProducto = jest.fn();
const mockUpdateProducto = jest.fn();
jest.mock("../../../../services/producto_service", () => ({
  postProducto: (...args) => mockPostProducto(...args),
  updateProducto: (...args) => mockUpdateProducto(...args),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: (props) => <a {...props} href={props.to} />,
  };
});

describe("ProductForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons for add mode", () => {
    render(
      <MemoryRouter>
        <ProductForm edit={false} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("item-input-Nombre")).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Precio")).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Descripcion")).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Imagen")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Agregar");
    expect(screen.getByRole("link")).toHaveTextContent("Cancelar");
  });

  it("renders input fields with values for edit mode", () => {
    render(
      <MemoryRouter>
        <ProductForm
          edit={true}
          producto={{
            id: 1,
            nombre: "Producto1",
            precio: 15,
            descripcion: "Desc1",
            imagen_url: "img1.jpg",
            categoria: { id: 1, nombre: "Platos" },
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("item-input-Nombre")).toHaveValue("Producto1");
    expect(screen.getByTestId("item-input-Precio")).toHaveValue(15);
    expect(screen.getByTestId("item-input-Descripcion")).toHaveValue("Desc1");
    expect(screen.getByTestId("item-input-Imagen")).toHaveValue("img1.jpg");
    expect(screen.getByRole("button")).toHaveTextContent("Editar");
  });

  it("calls postProducto and navigates on submit in add mode", async () => {
    mockPostProducto.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <ProductForm edit={false} />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByTestId("item-input-Nombre"), {
      target: { value: "NuevoProducto", name: "Nombre" },
    });
    fireEvent.change(screen.getByTestId("item-input-Precio"), {
      target: { value: "20", name: "Precio" },
    });
    fireEvent.change(screen.getByTestId("item-input-Descripcion"), {
      target: { value: "Nueva desc", name: "Descripcion" },
    });
    fireEvent.change(screen.getByTestId("item-input-Imagen"), {
      target: { value: "new.jpg", name: "Imagen" },
    });
    fireEvent.click(screen.getByRole("button"));
    await Promise.resolve();
    expect(mockPostProducto).toHaveBeenCalledWith({
      nombre: "NuevoProducto",
      precio: "20",
      categoria_id: 1,
      descripcion: "Nueva desc",
      imagen_url: "new.jpg",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";

// Mocks antes del import
jest.mock("../../components/ProductForm", () => () => (
  <div data-testid="product-form">ProductFormMock</div>
));
jest.mock("../../components/CategoryForm", () => () => (
  <div data-testid="category-form">CategoryFormMock</div>
));
jest.mock("../../components/ExtraForm", () => () => (
  <div data-testid="extra-form">ExtraFormMock</div>
));

import AddProduct from "../AddProduct";

describe("AddProduct page", () => {
  it("renderiza el título y los tabs", () => {
    render(<AddProduct />);
    expect(screen.getByText(/Agregar Producto/i)).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Extras")).toBeInTheDocument();
  });

  it("muestra ProductForm por defecto", () => {
    render(<AddProduct />);
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });

  it("muestra CategoryForm al hacer clic en Categorias", async () => {
    render(<AddProduct />);
    fireEvent.click(screen.getByText("Categorias"));
    // Espera a que el nuevo formulario aparezca
    expect(await screen.findByTestId("category-form")).toBeInTheDocument();
  });

  it("muestra ExtraForm al hacer clic en Extras", async () => {
    render(<AddProduct />);
    fireEvent.click(screen.getByText("Extras"));
    expect(await screen.findByTestId("extra-form")).toBeInTheDocument();
  });
});

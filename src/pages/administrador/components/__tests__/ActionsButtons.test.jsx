import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ActionsButtons from "../ActionsButtons";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock("../../../../constants/api");

// Mock de los servicios de borrado
const mockDeleteCategoria = jest.fn();
const mockDeleteProducto = jest.fn();
const mockDeleteExtra = jest.fn();

jest.mock("../../../../services/categoria_service", () => ({
  deleteCategoria: (...args) => mockDeleteCategoria(...args),
}));
jest.mock("../../../../services/producto_service", () => ({
  deleteProducto: (...args) => mockDeleteProducto(...args),
}));
jest.mock("../../../../services/extra_service", () => ({
  deleteExtra: (...args) => mockDeleteExtra(...args),
}));

// Mock de los íconos
jest.mock("@tabler/icons-react", () => ({
  IconEdit: (props) => <svg data-testid="icon-edit" {...props} />,
  IconTrash: (props) => <svg data-testid="icon-trash" {...props} />,
}));

describe("ActionsButtons component", () => {
  const dataMock = { id: 123 };

  it("renders edit and delete buttons", () => {
    render(
      <MemoryRouter>
        <ActionsButtons data={dataMock} tabla="categorias" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("icon-edit")).toBeInTheDocument();
    expect(screen.getByTestId("icon-trash")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/admin/update-categoria/123",
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls deleteCategoria when tabla is 'categorias'", () => {
    const { container } = render(
      <MemoryRouter>
        <ActionsButtons data={dataMock} tabla="categorias" />
      </MemoryRouter>,
    );
    const form = container.querySelector("form");
    fireEvent.submit(form);
    expect(mockDeleteCategoria).toHaveBeenCalledWith(123);
  });

  it("calls deleteProducto when tabla is 'productos'", () => {
    const { container } = render(
      <MemoryRouter>
        <ActionsButtons data={dataMock} tabla="productos" />
      </MemoryRouter>,
    );
    const form = container.querySelector("form");
    fireEvent.submit(form);
    expect(mockDeleteProducto).toHaveBeenCalledWith(123);
  });

  it("calls deleteExtra when tabla is 'extras'", () => {
    const { container } = render(
      <MemoryRouter>
        <ActionsButtons data={dataMock} tabla="extras" />
      </MemoryRouter>,
    );
    const form = container.querySelector("form");
    fireEvent.submit(form);
    expect(mockDeleteExtra).toHaveBeenCalledWith(123);
  });
});

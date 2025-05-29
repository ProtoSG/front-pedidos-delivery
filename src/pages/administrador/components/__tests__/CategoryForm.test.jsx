import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoryForm from "../CategoryForm";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../../constants/api');

// Mock ItemInput para aislar el test
jest.mock("../ItemInput", () => (props) => (
  <input
    data-testid={`item-input-${props.name}`}
    name={props.name}
    value={props.value || ""}
    onChange={props.handleChange}
  />
));

// Mock servicios
const mockPostCategoria = jest.fn();
const mockUpdateCategoria = jest.fn();
jest.mock("../../../../services/categoria_service", () => ({
  postCategoria: (...args) => mockPostCategoria(...args),
  updateCategoria: (...args) => mockUpdateCategoria(...args),
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

describe("CategoryForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and buttons for add mode", () => {
    render(
      <MemoryRouter>
        <CategoryForm edit={false} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("item-input-Nombre")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Agregar");
    expect(screen.getByRole("link")).toHaveTextContent("Cancelar");
  });

  it("renders input and buttons for edit mode with categoria", () => {
    render(
      <MemoryRouter>
        <CategoryForm edit={true} categoria={{ id: 1, nombre: "Cat1" }} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("item-input-Nombre")).toHaveValue("Cat1");
    expect(screen.getByRole("button")).toHaveTextContent("Editar");
  });

  it("calls postCategoria and navigates on submit in add mode", async () => {
    mockPostCategoria.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <CategoryForm edit={false} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByTestId("item-input-Nombre"), { target: { value: "NuevaCat", name: "Nombre" } });
    fireEvent.click(screen.getByRole("button"));
    // Espera a que la promesa se resuelva
    await Promise.resolve();
    expect(mockPostCategoria).toHaveBeenCalledWith({ nombre: "NuevaCat" });
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("calls updateCategoria and navigates on submit in edit mode", async () => {
    mockUpdateCategoria.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <CategoryForm edit={true} categoria={{ id: 2, nombre: "Cat2" }} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByTestId("item-input-Nombre"), { target: { value: "Editada", name: "Nombre" } });
    fireEvent.click(screen.getByRole("button"));
    // Espera a que la promesa se resuelva
    await Promise.resolve();
    expect(mockUpdateCategoria).toHaveBeenCalledWith(2, "Editada");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });
});

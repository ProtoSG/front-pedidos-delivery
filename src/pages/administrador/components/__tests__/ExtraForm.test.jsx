import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExtraForm from "../ExtraForm";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../../constants/api');

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

// Mock servicios
const mockPostExtra = jest.fn();
const mockUpdateExtra = jest.fn();
jest.mock("../../../../services/extra_service", () => ({
  postExtra: (...args) => mockPostExtra(...args),
  updateExtra: (...args) => mockUpdateExtra(...args),
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

describe("ExtraForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons for add mode", () => {
    render(
      <MemoryRouter>
        <ExtraForm edit={false} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("item-input-Nombre")).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Precio")).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Imagen")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Agregar");
    expect(screen.getByRole("link")).toHaveTextContent("Cancelar");
  });

  it("renders input fields with values for edit mode", () => {
    render(
      <MemoryRouter>
        <ExtraForm
          edit={true}
          extra={{ id: 1, nombre: "Extra1", precio: 10, imagen_url: "img.jpg" }}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("item-input-Nombre")).toHaveValue("Extra1");
    expect(screen.getByTestId("item-input-Precio")).toHaveValue(10);
    expect(screen.getByTestId("item-input-Imagen")).toHaveValue("img.jpg");
    expect(screen.getByRole("button")).toHaveTextContent("Editar");
  });

  it("calls postExtra and navigates on submit in add mode", async () => {
    mockPostExtra.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <ExtraForm edit={false} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByTestId("item-input-Nombre"), { target: { value: "NuevoExtra", name: "Nombre" } });
    fireEvent.change(screen.getByTestId("item-input-Precio"), { target: { value: "15", name: "Precio" } });
    fireEvent.change(screen.getByTestId("item-input-Imagen"), { target: { value: "img2.jpg", name: "Imagen" } });
    fireEvent.click(screen.getByRole("button"));
    await Promise.resolve();
    expect(mockPostExtra).toHaveBeenCalledWith({ nombre: "NuevoExtra", precio: "15", imagen_url: "img2.jpg" });
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("calls updateExtra and navigates on submit in edit mode", async () => {
    mockUpdateExtra.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <ExtraForm
          edit={true}
          extra={{ id: 2, nombre: "Extra2", precio: 20, imagen_url: "img3.jpg" }}
        />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByTestId("item-input-Nombre"), { target: { value: "Editado", name: "Nombre" } });
    fireEvent.change(screen.getByTestId("item-input-Precio"), { target: { value: "25", name: "Precio" } });
    fireEvent.change(screen.getByTestId("item-input-Imagen"), { target: { value: "img4.jpg", name: "Imagen" } });
    fireEvent.click(screen.getByRole("button"));
    await Promise.resolve();
    expect(mockUpdateExtra).toHaveBeenCalledWith(2, "Editado", "25", "img4.jpg");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });
});
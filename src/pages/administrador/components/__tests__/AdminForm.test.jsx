import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminForm from "../AdminForm";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock("../../../../constants/api");

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
const mockUpdateAdmin = jest.fn();
const mockLogin = jest.fn();
jest.mock("../../../../services/admin_service", () => ({
  updateAdmin: (...args) => mockUpdateAdmin(...args),
}));
jest.mock("../../../../services/login_service", () => ({
  login: (...args) => mockLogin(...args),
}));

describe("AdminForm component", () => {
  const adminMock = { username: "adminuser" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons", () => {
    render(
      <MemoryRouter>
        <AdminForm admin={adminMock} />
      </MemoryRouter>,
    );
    expect(
      screen.getByTestId("item-input-Antiguo Password"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("item-input-Nuevo Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Confirmar/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cancelar/i })).toBeInTheDocument();
  });

  it("shows error message if updateAdmin returns mensaje", async () => {
    mockUpdateAdmin.mockResolvedValueOnce({
      mensaje: "Error!",
      success: false,
    });
    render(
      <MemoryRouter>
        <AdminForm admin={adminMock} />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByTestId("item-input-Antiguo Password"), {
      target: { value: "oldpass", name: "Antiguo Password" },
    });
    fireEvent.change(screen.getByTestId("item-input-Nuevo Password"), {
      target: { value: "newpass", name: "Nuevo Password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText("Error!")).toBeInTheDocument();
    });
  });

  it("calls updateAdmin and login on successful update", async () => {
    mockUpdateAdmin.mockResolvedValueOnce({ mensaje: null, success: true });
    mockLogin.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <AdminForm admin={adminMock} />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByTestId("item-input-Antiguo Password"), {
      target: { value: "oldpass", name: "Antiguo Password" },
    });
    fireEvent.change(screen.getByTestId("item-input-Nuevo Password"), {
      target: { value: "newpass", name: "Nuevo Password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar/i }));

    await waitFor(() => {
      expect(mockUpdateAdmin).toHaveBeenCalledWith("oldpass", "newpass");
      expect(mockLogin).toHaveBeenCalledWith({
        username: "adminuser",
        password: "newpass",
      });
    });
  });

  it("shows error message if updateAdmin throws", async () => {
    mockUpdateAdmin.mockRejectedValueOnce(new Error("Network error"));
    render(
      <MemoryRouter>
        <AdminForm admin={adminMock} />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByTestId("item-input-Antiguo Password"), {
      target: { value: "oldpass", name: "Antiguo Password" },
    });
    fireEvent.change(screen.getByTestId("item-input-Nuevo Password"), {
      target: { value: "newpass", name: "Nuevo Password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar/i }));

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});

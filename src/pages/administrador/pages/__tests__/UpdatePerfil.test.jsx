import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock de AdminForm
jest.mock("../../components/AdminForm", () => (props) => (
  <div data-testid="admin-form">{props.admin?.username}</div>
));

describe("UpdatePerfil page", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("muestra el estado de carga", () => {
    jest.doMock("../../../../hooks/useAdmin", () => () => ({
      admin: {},
      loadingAdmin: true,
      errorAdmin: null,
    }));
    const UpdatePerfil = require("../UpdatePerfil").default;
    render(
      <MemoryRouter>
        <UpdatePerfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra el estado de error", () => {
    jest.doMock("../../../../hooks/useAdmin", () => () => ({
      admin: {},
      loadingAdmin: false,
      errorAdmin: true,
    }));
    const UpdatePerfil = require("../UpdatePerfil").default;
    render(
      <MemoryRouter>
        <UpdatePerfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Hubo un error")).toBeInTheDocument();
  });

  it("renderiza el formulario con el admin correcto", () => {
    jest.doMock("../../../../hooks/useAdmin", () => () => ({
      admin: { username: "adminuser" },
      loadingAdmin: false,
      errorAdmin: null,
    }));
    const UpdatePerfil = require("../UpdatePerfil").default;
    render(
      <MemoryRouter>
        <UpdatePerfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Editar Perfil")).toBeInTheDocument();
    expect(screen.getByTestId("admin-form").textContent).toBe("adminuser");
  });
});

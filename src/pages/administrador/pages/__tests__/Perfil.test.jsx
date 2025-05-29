import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock por defecto (perfil correcto)
jest.mock("../../../../hooks/useAdmin", () => () => ({
  admin: { username: "adminuser" },
  loadingAdmin: false,
  errorAdmin: null,
}));

import Perfil from "../Perfil";

describe("Perfil page", () => {
  it("muestra el perfil correctamente", () => {
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Nombre de Usuario:")).toBeInTheDocument();
    expect(screen.getByText("adminuser")).toBeInTheDocument();
    expect(screen.getByText("Contraseña:")).toBeInTheDocument();
    expect(screen.getByText("Cambiar Contraseña")).toBeInTheDocument();
  });
});

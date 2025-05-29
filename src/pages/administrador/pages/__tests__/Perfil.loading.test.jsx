import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock para loading
jest.mock("../../../../hooks/useAdmin", () => () => ({
  admin: {},
  loadingAdmin: true,
  errorAdmin: null,
}));

import Perfil from "../Perfil";

describe("Perfil page (loading)", () => {
  it("muestra el estado de carga", () => {
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});

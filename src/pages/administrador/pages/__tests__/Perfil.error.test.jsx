import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock para error
jest.mock("../../../../hooks/useAdmin", () => () => ({
  admin: {},
  loadingAdmin: false,
  errorAdmin: true,
}));

import Perfil from "../Perfil";

describe("Perfil page (error)", () => {
  it("muestra el estado de error", () => {
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>,
    );
    expect(screen.getByText("Hubo un error")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock("../../../../constants/api");

// Mock experiedToken
let mockExpired = false;
jest.mock("../../../../services/login_service", () => ({
  experiedToken: () => mockExpired,
}));

// Mock Outlet y Navigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    Navigate: (props) => (
      <div
        data-testid="navigate"
        to={props.to}
        replace={props.replace ? "true" : "false"}
      />
    ),
  };
});

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockExpired = false;
  });

  it("renders Outlet when token is not expired", () => {
    mockExpired = false;
    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
  });

  it("renders Navigate when token is expired", () => {
    mockExpired = true;
    render(
      <MemoryRouter>
        <ProtectedRoute redirectTo="/custom-login" />
      </MemoryRouter>,
    );
    const nav = screen.getByTestId("navigate");
    expect(nav).toBeInTheDocument();
    expect(nav.getAttribute("to")).toBe("/custom-login");
    expect(nav.getAttribute("replace")).toBe("true");
    expect(screen.queryByTestId("outlet")).not.toBeInTheDocument();
  });
});

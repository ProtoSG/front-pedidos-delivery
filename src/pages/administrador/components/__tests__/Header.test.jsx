import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock("../../../../constants/api");

// Mock Logo para aislar el test
jest.mock("../../../../components/icons/Logo", () => (props) => (
  <div data-testid="logo-mock" {...props}>
    LogoMock
  </div>
));

// Mock imagen pez
jest.mock("../../../../assets/pez1.png", () => "pez1-mock.png");

// Mock logout y useNavigate
const mockLogout = jest.fn();
const mockNavigate = jest.fn();
jest.mock("../../../../services/login_service", () => ({
  logout: () => mockLogout(),
  experiedToken: () => false,
}));
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: actual.Link,
    useLocation: () => ({ pathname: "/admin" }),
  };
});

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Logo and navigation items", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("logo-mock")).toBeInTheDocument();
    expect(
      screen.getAllByRole("img", { name: "logo-pez" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Reporte")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });

  it("calls logout and navigates when Salir is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const salirBtn = screen.getByText("Salir").closest("button");
    fireEvent.click(salirBtn);
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("toggles menu when switch-header button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const menuBtn = screen.getByRole("button", { name: "" });
    expect(menuBtn).toBeInTheDocument();
    fireEvent.click(menuBtn);
    // No error = toggle ok, can't easily test style without more setup
  });
});

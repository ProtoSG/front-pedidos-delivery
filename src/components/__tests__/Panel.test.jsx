import { render, screen } from "@testing-library/react";
import Panel from "../Panel";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../constants/api');

// Mock de Logo para aislar el test
jest.mock("../icons/Logo", () => (props) => (
  <div data-testid="logo-mock" {...props}>LogoMock</div>
));

// La imagen será mockeada automáticamente por Jest usando moduleNameMapper

describe("Panel component", () => {
  it("renders two pez images and the Logo", () => {
    render(<Panel />);
    const images = screen.getAllByAltText("logo-pez");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "test-file-stub");
    expect(images[1]).toHaveAttribute("src", "test-file-stub");

    // Verifica que el Logo se renderiza
    expect(screen.getByTestId("logo-mock")).toBeInTheDocument();
    expect(screen.getByTestId("logo-mock")).toHaveTextContent("LogoMock");
  });

  it("applies correct classes to images and Logo", () => {
    render(<Panel />);
    const images = screen.getAllByAltText("logo-pez");
    expect(images[0].className).toMatch(/w-20/);
    expect(images[1].className).toMatch(/rotate-180/);

    const logo = screen.getByTestId("logo-mock");
    expect(logo.className).toMatch(/fill-primary-400/);
    expect(logo.className).toMatch(/w-64/);
  });
});

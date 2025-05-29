import { render } from "@testing-library/react";
import Logo from "../Logo";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../constants/api');

describe("Logo component", () => {
  it("renders the SVG element", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
  });

  it("applies the fill prop to the path", () => {
    const { container } = render(<Logo fill="#123456" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#123456");
  });

  it("renders with default props", () => {
    const { container } = render(<Logo />);
    const path = container.querySelector("path");
    // Solo verifica que el path existe
    expect(path).toBeInTheDocument();
  });
});

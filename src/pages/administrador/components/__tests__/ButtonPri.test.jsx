import { render, screen, fireEvent } from "@testing-library/react";
import ButtonPri from "../ButtonPri";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../../constants/api');

describe("ButtonPri component", () => {
  it("renders with nombre prop", () => {
    render(<ButtonPri nombre="Guardar" />);
    expect(screen.getByRole("button")).toHaveTextContent("Guardar");
  });

  it("renders children", () => {
    render(
      <ButtonPri>
        <span>Icono</span>
      </ButtonPri>
    );
    expect(screen.getByText("Icono")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ButtonPri nombre="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies correct classes", () => {
    render(<ButtonPri nombre="Clase" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-primary-500/);
    expect(button.className).toMatch(/rounded-2xl/);
  });
});

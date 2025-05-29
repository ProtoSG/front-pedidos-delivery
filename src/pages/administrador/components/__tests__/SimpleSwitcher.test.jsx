import { render, screen, fireEvent } from "@testing-library/react";
import SimpleSwitcher from "../SimpleSwitcher";

describe("SimpleSwitcher", () => {
  const items = ["1D", "1S", "1M", "1A"];
  const setActiveInterval = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza todos los botones correctamente", () => {
    render(
      <SimpleSwitcher
        items={items}
        activeItem="1D"
        setActiveInterval={setActiveInterval}
      />,
    );
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("el botón activo tiene la clase correcta", () => {
    render(
      <SimpleSwitcher
        items={items}
        activeItem="1S"
        setActiveInterval={setActiveInterval}
      />,
    );
    const activeButton = screen.getByText("1S");
    expect(activeButton.className).toContain("bg-primary-400");
    expect(activeButton.className).toContain("text-accent-200");
  });

  it("llama a setActiveInterval con el valor correcto al hacer click en un botón inactivo", () => {
    render(
      <SimpleSwitcher
        items={items}
        activeItem="1D"
        setActiveInterval={setActiveInterval}
      />,
    );
    const button = screen.getByText("1M");
    fireEvent.click(button);
    expect(setActiveInterval).toHaveBeenCalledWith("1M");
  });

  it("no llama a setActiveInterval al hacer click en el botón activo", () => {
    render(
      <SimpleSwitcher
        items={items}
        activeItem="1A"
        setActiveInterval={setActiveInterval}
      />,
    );
    const activeButton = screen.getByText("1A");
    fireEvent.click(activeButton);
    expect(setActiveInterval).not.toHaveBeenCalled();
  });
});

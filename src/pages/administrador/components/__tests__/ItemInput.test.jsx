import { render, screen, fireEvent } from "@testing-library/react";
import ItemInput from "../ItemInput";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../../constants/api');

describe("ItemInput component", () => {
  it("renders with name and value", () => {
    render(
      <ItemInput
        handleChange={() => {}}
        name="Nombre"
        value="Valor"
      />
    );
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toHaveValue("Valor");
  });

  it("renders with type Number and step", () => {
    render(
      <ItemInput
        handleChange={() => {}}
        name="Precio"
        value="10"
        type="Number"
      />
    );
    const input = screen.getByPlaceholderText("Precio");
    expect(input).toHaveAttribute("type", "Number");
    expect(input).toHaveAttribute("step", "0.01");
  });

  it("calls handleChange on input change", () => {
    const handleChange = jest.fn();
    render(
      <ItemInput
        handleChange={handleChange}
        name="Descripcion"
        value=""
      />
    );
    const input = screen.getByPlaceholderText("Descripcion");
    fireEvent.change(input, { target: { value: "Nueva descripcion" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with default type text if not specified", () => {
    render(
      <ItemInput
        handleChange={() => {}}
        name="Otro"
        value=""
      />
    );
    const input = screen.getByPlaceholderText("Otro");
    expect(input).toHaveAttribute("type", "text");
  });
});

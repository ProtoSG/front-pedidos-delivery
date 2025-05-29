import { render } from "@testing-library/react";
import ChartArea from "../ChartArea";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../../../constants/api');

// Primero declara las variables:
jest.mock("lightweight-charts", () => {
  return {
    createChart: jest.fn(() => ({
      addAreaSeries: jest.fn(() => ({})),
      applyOptions: jest.fn(),
      remove: jest.fn(),
    })),
    ColorType: { Solid: "solid" },
  };
});

describe("ChartArea component", () => {
  it("renders the chart container div", () => {
    const setChart = jest.fn();
    const setAreaSeries = jest.fn();
    const { container } = render(
      <ChartArea setChart={setChart} setAreaSeries={setAreaSeries} />,
    );
    const div = container.querySelector("div.h-full");
    expect(div).toBeInTheDocument();
  });

  it("calls setChart and setAreaSeries on mount", () => {
    const setChart = jest.fn();
    const setAreaSeries = jest.fn();
    render(
      <ChartArea setChart={setChart} setAreaSeries={setAreaSeries} />
    );
    const { createChart } = require("lightweight-charts");
    expect(createChart).toHaveBeenCalled();
    expect(setChart).toHaveBeenCalled();
    expect(setAreaSeries).toHaveBeenCalled();
  });
});

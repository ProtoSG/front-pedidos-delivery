import PropTypes from "prop-types";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

ChartArea.propTypes = {
  setChart: PropTypes.func.isRequired,
  setAreaSeries: PropTypes.func.isRequired,
};

export default function ChartArea({ setChart, setAreaSeries }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chartInstance = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#f3f4f6",
        },
        textColor: "#20546a",
        fontSize: 16,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: true,
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });

    setChart(chartInstance);

    const handleResize = () => {
      chartInstance.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const areaSeriesInstance = chartInstance.addAreaSeries({
      topColor: "#2cb4d4",
      bottomColor: "#f3f4f6",
      lineColor: "#1b7d9f",
      lineWidth: 4,
    });

    setAreaSeries(areaSeriesInstance);

    return () => {
      if (chartInstance) {
        chartInstance.remove();
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [setAreaSeries, setChart]);

  return <div className="h-full" ref={chartContainerRef}></div>;
}

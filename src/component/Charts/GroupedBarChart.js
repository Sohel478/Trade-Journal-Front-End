import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export function GroupedBarChart({ dataList }) {
  const [strategyROI, setStrategyROI] = useState({});

  useEffect(() => {
    if (dataList?.strategyGraph) {
      const strategies = structuredClone(dataList?.strategyGraph);
      setStrategyROI(strategies);
    }
  }, [dataList]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Strategy Wise Net Rate of Interest",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "ROI",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const datasets = Object.values(strategyROI).map((strategyData) => {
    // Filter out data points where y is 0
    const filteredData = strategyData.data.filter((dataPoint) => dataPoint.y !== 0);

    return {
      ...strategyData,
      data: filteredData,
    };
  });

  const data = {
    datasets,
  };

  return <Bar options={options} data={data} />;
}

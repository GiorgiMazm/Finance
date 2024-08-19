"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Spent } from "@/types/Spent";

ChartJS.register(ArcElement, Tooltip, Legend);

const processPieData = (spending: Spent[]) => {
  const categorySpending: { [key: string]: number } = {};

  spending.forEach(({ category, spent }) => {
    if (!categorySpending[category]) {
      categorySpending[category] = 0;
    }
    categorySpending[category] += parseFloat(spent);
  });

  const labels = Object.keys(categorySpending);
  const data = labels.map((label) => categorySpending[label]);
  const backgroundColor = labels.map((label) => getDistinctColor(label));

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
      },
    ],
  };
};

const getDistinctColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Food: "#FF6384",
    Rent: "#36A2EB",
    Utilities: "#FFCE56",
    Entertainment: "#4BC0C0",
  };
  return (
    colors[category] || `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
};

const PieChart: React.FC<{ spending: Spent[] }> = ({ spending }) => {
  const data = processPieData(spending);
  const totalSpending = data.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0,
  );

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.raw;
            const percentage = ((value / totalSpending) * 100).toFixed(2);
            label += `${parseFloat(value).toFixed(2)} (€) (${percentage}%)`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;

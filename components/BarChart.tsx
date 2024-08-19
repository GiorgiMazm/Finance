"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Spent } from "@/types/Spent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  spending: Spent[];
}

const BarChart: React.FC<BarChartProps> = ({ spending }) => {
  interface MonthlySpending {
    [key: string]: {
      [key: string]: number;
    };
  }

  const processData = (spending: Spent[]) => {
    const monthlySpending: MonthlySpending = {};

    spending.forEach(({ date, spent, category }) => {
      const month = new Date(date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!monthlySpending[month]) {
        monthlySpending[month] = {};
      }

      if (!monthlySpending[month][category]) {
        monthlySpending[month][category] = 0;
      }

      monthlySpending[month][category] += parseFloat(spent);
    });

    const labels = Object.keys(monthlySpending).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const categories = Array.from(
      new Set(spending.map((item) => item.category)),
    );
    const datasets = categories.map((category) => ({
      label: category,
      data: labels.map((month) => monthlySpending[month][category] || 0),
      backgroundColor: getDistinctColor(category),
    }));

    return { labels, datasets };
  };

  const getDistinctColor = (category: string) => {
    // Here you could implement a color scheme based on categories for consistency
    const colors: { [key: string]: string } = {
      Food: "#FF6384",
      Rent: "#36A2EB",
      Utilities: "#FFCE56",
      Entertainment: "#4BC0C0",
      // Add more categories and their respective colors
    };
    return (
      colors[category] ||
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
  };
  const data = processData(spending);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Spending by Category",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += parseFloat(context.raw).toFixed(2);
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount Spent (€)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

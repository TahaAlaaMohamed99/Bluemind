import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function ChartComponent({
  type = "bar",
  title = "Predictions Chart",
  dataType = "number", // "number" or "text"
  data = [], // could be array or object
}) {
  let labels = [];
  let values = [];

  // 🔹 Handle numeric data
  if (dataType === "number") {
    // extract predictions array if inside object
    let predictions = Array.isArray(data)
      ? data
      : Array.isArray(data.predictions)
      ? data.predictions
      : [];

    // Convert numeric strings to numbers
    predictions = predictions
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));

    // If data is too large, aggregate into groups
    if (predictions.length > 50) {
      const chunkSize = Math.ceil(predictions.length / 20);
      const aggregated = [];

      for (let i = 0; i < predictions.length; i += chunkSize) {
        const chunk = predictions.slice(i, i + chunkSize);
        const avg = chunk.reduce((a, b) => a + b, 0) / chunk.length;
        aggregated.push(avg);
      }

      labels = aggregated.map((_, i) => `Group ${i + 1}`);
      values = aggregated;
    } else {
      labels = predictions.map((_, i) => `Item ${i + 1}`);
      values = predictions;
    }
  }

  // 🔹 Handle text data
  if (dataType === "text") {
    const predictions =
      typeof data === "object" && !Array.isArray(data)
        ? data.predictions || data
        : {};
    const counts = {};
    Object.values(predictions).forEach((label) => {
      counts[label] = (counts[label] || 0) + 1;
    });
    labels = Object.keys(counts);
    values = Object.values(counts);
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  // Check for large data
  const isLargeData = values.length > 50;

  return (
    <div className="w-full mt-6">
      {title && (
        <h2 className="text-lg dark:text-titleColor-dark text-center font-semibold mb-4">
          {title}
        </h2>
      )}
      <div className={`${isLargeData ? "overflow-x-auto" : ""} w-full`}>
        <div
          className={`${
            isLargeData ? "min-w-[1500px]" : "w-[400px]"
          } h-[500px]`}
        >
          {type === "bar" && <Bar data={chartData} options={options} />}
          {type === "pie" && <Pie data={chartData} options={options} />}
          {type === "line" && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
}

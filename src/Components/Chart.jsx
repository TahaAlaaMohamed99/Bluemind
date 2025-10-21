import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ChartComponent({
  type = "bar",
  title = "Predictions Chart",
}) {
  // 🔹 Static Data Examples
  const dataNumber = {
    predictions: [45, 60, 75, 30, 90],
  };

  const dataText = {
    predictions: {
      "The product is amazing": "Positive",
      "The delivery was late": "Negative",
      "It’s okay but could be better": "Neutral",
      "Great service": "Positive",
      "Terrible packaging": "Negative",
    },
  };

  // 🟦 Choose which dataset to use
  const typeOfData = "text"; // "number" or "text"
  const predictions =
    typeOfData === "number" ? dataNumber.predictions : dataText.predictions;

  let labels = [];
  let values = [];

  if (typeOfData === "number") {
    labels = predictions.map((_, i) => `Item ${i + 1}`);
    values = predictions;
  } else {
    // Count occurrences of each label (Positive, Negative, etc.)
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
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
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

  return (
    <div className="w-full mt-6 ">
      {title && (
        <h2 className="text-lg dark:text-titleColor-dark text-center w-[400px]  font-semibold mb-2">
          {title}
        </h2>
      )}
      <div className="w-[400px] h-[400px]">
        {type === "bar" && <Bar data={chartData} options={options} />}
        {type === "pie" && <Pie data={chartData} options={options} />}
        {type === "line" && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
}

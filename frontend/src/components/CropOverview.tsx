"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

interface CropData {
  Tea: number;
  Coconut: number;
  Cinnamon: number;
  Other: number;
}

interface CropOverviewProps {
  incomeData: CropData; // Accept income data
  landData: CropData; // Accept land data
}

const CropOverview: React.FC<CropOverviewProps> = ({
  incomeData,
  landData,
}) => {
  const [activeTab, setActiveTab] = useState<"By Income" | "By Land">(
    "By Income"
  );

  // Prepare data for the Doughnut chart based on active tab
  const chartData = {
    labels: ["Teaa", "Coconut", "Cinnamon", "Other"],
    datasets: [
      {
        data:
          activeTab === "By Income"
            ? [
                incomeData.Tea,
                incomeData.Coconut,
                incomeData.Cinnamon,
                incomeData.Other,
              ]
            : [
                landData.Tea,
                landData.Coconut,
                landData.Cinnamon,
                landData.Other,
              ],
        backgroundColor: ["#FFCC00", "#6D9E32", "#A4DE02", "#FF5733"],
        hoverBackgroundColor: ["#FFB300", "#5D8A1E", "#8BCB01", "#FFC300"],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      // Custom plugin to display percentage inside the doughnut
      datalabels: {
        display: true,
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[
            context.datasetIndex
          ].data.reduce((acc: number, curr: number) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        },
        color: "#fff", // Change color as per your preference
      },
    },
    cutout: "60%", // Adjust for the donut thickness
  };

  return (
    <div
      className="p-4 bg-white rounded-2xl shadow-md"
      style={{ width: "600px" }}
    >
      <h3 className="font-semibold text-3xl mb-4 ml-2 flex justify-center items-center mt-2 ">
        Crops Overview
      </h3>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4 font-roboto">
        <button
          onClick={() => setActiveTab("By Income")}
          style={{ width: "300px" }}
          className={`py-2 px-4 ${
            activeTab === "By Income"
              ? "bg-green-100 text-green-600"
              : "text-gray-500"
          }`}
        >
          By Income
        </button>

        <button
          onClick={() => setActiveTab("By Land")}
          style={{ width: "300px" }}
          className={`py-2 px-4 ${
            activeTab === "By Land"
              ? "bg-green-100 text-green-600"
              : "text-gray-500"
          }`}
        >
          By Land
        </button>
      </div>

      {/* Display the Doughnut chart and data side by side */}
      <div className="flex items-start mt-8 mb-4">
        <div
          className="flex justify-center ml-8"
          style={{ width: "250px", height: "250px" }}
        >
          <Doughnut
            data={chartData}
            options={options}
            width={200}
            height={200}
          />
        </div>

        {/* Legend Section */}
        <div className="ml-20 font-roboto mt-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <span
                className="inline-block w-3 h-3"
                style={{ backgroundColor: "#FFB300" }}
              ></span>
              <div className="flex flex-col justify-center">
                <span>Tea</span>
                <span className="text-sm text-gray-600">
                  {activeTab === "By Income"
                    ? incomeData.Tea.toLocaleString()
                    : landData.Tea.toLocaleString()}
                </span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <span
                className="inline-block w-3 h-3"
                style={{ backgroundColor: "#5D8A1E" }}
              ></span>
              <div className="flex flex-col justify-center">
                <span>Coconut</span>
                <span className="text-sm text-gray-600">
                  {activeTab === "By Income"
                    ? incomeData.Coconut.toLocaleString()
                    : landData.Coconut.toLocaleString()}
                </span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <span
                className="inline-block w-3 h-3"
                style={{ backgroundColor: "#8BCB01" }}
              ></span>
              <div className="flex flex-col justify-center">
                <span>Cinnamon</span>
                <span className="text-sm text-gray-600">
                  {activeTab === "By Income"
                    ? incomeData.Cinnamon.toLocaleString()
                    : landData.Cinnamon.toLocaleString()}
                </span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <span
                className="inline-block w-3 h-3"
                style={{ backgroundColor: "#FF5733" }}
              ></span>
              <div className="flex flex-col justify-center">
                <span>Other</span>
                <span className="text-sm text-gray-600">
                  {activeTab === "By Income"
                    ? incomeData.Other.toLocaleString()
                    : landData.Other.toLocaleString()}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CropOverview;

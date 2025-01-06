"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CropGrowthMonitoring: React.FC = () => {
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "COOP Tea State",
        data: [300, 320, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410],
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
        pointRadius: 3, // Set point radius to show points
      },
      {
        label: "State-Kotapola",
        data: [200, 250, 230, 260, 270, 290, 300, 310, 320, 330, 340, 350],
        borderColor: "rgba(255, 215, 0, 1)",
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        fill: true,
        pointRadius: 3, // Set point radius to show points
      },
      {
        label: "Tourist Bangalore",
        data: [400, 390, 410, 400, 420, 430, 440, 450, 460, 470, 480, 490],
        borderColor: "rgba(0, 255, 0, 1)",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
        pointRadius: 3, // Set point radius to show points
      },
      {
        label: "Nursery",
        data: [150, 160, 140, 170, 180, 190, 200, 210, 220, 230, 240, 250],
        borderColor: "rgba(0, 0, 255, 1)",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
        pointRadius: 3, // Set point radius to show points
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true, // Enable tooltip on hover
        callbacks: {
          // Custom tooltip label
          label: function (tooltipItem: any) {
            return `Income: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        display: false,
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
          text: "Income",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md" style={{ width: '855px', height: '500px' }}>
      <h3 className="font-semibold text-3xl mb-4 flex justify-center mt-2">Monthly Income Monitoring</h3>

      <div className="bg-gray-100 rounded-sm " style={{ width: '820px', height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CropGrowthMonitoring;

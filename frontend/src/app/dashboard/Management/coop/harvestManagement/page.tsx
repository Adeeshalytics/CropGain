// src/app/dashboard/Management/harvestManagement/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const HarvestManagementPage = () => {
  // Initialize react-modal's app element inside useEffect
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const [selectedModule, setSelectedModule] = useState<string>(
    "Harvesting Scheduling"
  );

  // --------------------- Harvesting Scheduling ---------------------
  const [scheduledHarvests, setScheduledHarvests] = useState<
    Array<{ cropType: string; date: Date }>
  >([
    { cropType: "Tea", date: new Date("2025-05-20") },
    { cropType: "Coconut", date: new Date("2025-06-15") },
    { cropType: "Cinnamon", date: new Date("2025-07-10") },
    { cropType: "Mango", date: new Date("2025-08-05") },
    { cropType: "Banana", date: new Date("2025-09-12") },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cropType, setCropType] = useState<string>("");

  const handleAddHarvest = () => {
    if (selectedDate && cropType.trim() !== "") {
      setScheduledHarvests([
        ...scheduledHarvests,
        { cropType, date: selectedDate },
      ]);
      setSelectedDate(null);
      setCropType("");
    }
  };

  // --------------------- Harvesting Records Management ---------------------
  interface HarvestRecord {
    id: number;
    cropType: string;
    quantityHarvested: number;
    qualityAssessment: string;
    harvestingDate: string;
    responsiblePersonnel: string;
  }

  const [harvestRecords, setHarvestRecords] = useState<HarvestRecord[]>([
    {
      id: 1,
      cropType: "Tea",
      quantityHarvested: 500,
      qualityAssessment: "High",
      harvestingDate: "2025-05-20",
      responsiblePersonnel: "Alice Johnson",
    },
    {
      id: 2,
      cropType: "Coconut",
      quantityHarvested: 300,
      qualityAssessment: "Medium",
      harvestingDate: "2025-06-15",
      responsiblePersonnel: "Bob Smith",
    },
    {
      id: 3,
      cropType: "Cinnamon",
      quantityHarvested: 150,
      qualityAssessment: "High",
      harvestingDate: "2025-07-10",
      responsiblePersonnel: "Charlie Davis",
    },
    {
      id: 4,
      cropType: "Mango",
      quantityHarvested: 400,
      qualityAssessment: "Low",
      harvestingDate: "2025-08-05",
      responsiblePersonnel: "Diana Prince",
    },
    {
      id: 5,
      cropType: "Banana",
      quantityHarvested: 600,
      qualityAssessment: "Medium",
      harvestingDate: "2025-09-12",
      responsiblePersonnel: "Ethan Hunt",
    },
  ]);
  const [recordForm, setRecordForm] = useState<Partial<HarvestRecord>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editRecordId, setEditRecordId] = useState<number | null>(null);

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      recordForm.cropType &&
      recordForm.quantityHarvested &&
      recordForm.qualityAssessment &&
      recordForm.harvestingDate &&
      recordForm.responsiblePersonnel
    ) {
      if (isEditing && editRecordId !== null) {
        setHarvestRecords((prev) =>
          prev.map((record) =>
            record.id === editRecordId
              ? ({ ...record, ...recordForm } as HarvestRecord)
              : record
          )
        );
        setIsEditing(false);
        setEditRecordId(null);
      } else {
        const newRecord: HarvestRecord = {
          id: Date.now(),
          cropType: recordForm.cropType,
          quantityHarvested: recordForm.quantityHarvested,
          qualityAssessment: recordForm.qualityAssessment,
          harvestingDate: recordForm.harvestingDate,
          responsiblePersonnel: recordForm.responsiblePersonnel,
        };
        setHarvestRecords([...harvestRecords, newRecord]);
      }
      setRecordForm({});
    }
  };

  const handleEditRecord = (record: HarvestRecord) => {
    setIsEditing(true);
    setEditRecordId(record.id);
    setRecordForm(record);
  };

  const handleDeleteRecord = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setHarvestRecords((prev) => prev.filter((record) => record.id !== id));
    }
  };

  // --------------------- Harvest Tracking and Analytics ---------------------
  const harvestYieldData = {
    labels: ["Tea", "Coconut", "Cinnamon", "Mango", "Banana"],
    datasets: [
      {
        label: "Total Yield (kg)",
        data: harvestRecords.reduce((acc, record) => {
          acc[record.cropType] =
            (acc[record.cropType] || 0) + record.quantityHarvested;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  const harvestQualityData = {
    labels: ["High Quality", "Medium Quality", "Low Quality"],
    datasets: [
      {
        label: "Quality Assessment",
        data: [
          harvestRecords.filter((r) => r.qualityAssessment === "High").length,
          harvestRecords.filter((r) => r.qualityAssessment === "Medium").length,
          harvestRecords.filter((r) => r.qualityAssessment === "Low").length,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const harvestTrendData = {
    labels: harvestRecords.map((record) => record.harvestingDate),
    datasets: [
      {
        label: "Harvested Quantity (kg)",
        data: harvestRecords.map((record) => record.quantityHarvested),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  // --------------------- Integration with Planting and Growth Tracking ---------------------
  // Linked Planting Records based on Harvest Records
  const linkedPlantingRecords = harvestRecords.map((harvest) => ({
    ...harvest,
    plantingDate: "2025-03-10", // Placeholder data
    growthStage: "Flowering", // Placeholder data
  }));

  // --------------------- Notifications and Alerts ---------------------
  interface Notification {
    id: number;
    type: string;
    message: string;
    date: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "Reminder",
      message: "Harvesting for Tea in Section A is scheduled for 2025-05-20.",
      date: "2025-05-15",
    },
    {
      id: 2,
      type: "Alert",
      message:
        "Unexpected delay in harvesting Coconut in Section B due to weather conditions.",
      date: "2025-05-18",
    },
    {
      id: 3,
      type: "Reminder",
      message:
        "Harvesting for Cinnamon in Section C is scheduled for 2025-07-10.",
      date: "2025-07-05",
    },
    {
      id: 4,
      type: "Alert",
      message: "Pest infestation detected in Mango crops in Section D.",
      date: "2025-08-01",
    },
    {
      id: 5,
      type: "Reminder",
      message:
        "Harvesting for Banana in Section E is scheduled for 2025-09-12.",
      date: "2025-09-05",
    },
  ]);

  // --------------------- Render Selected Module ---------------------
  const renderModule = () => {
    switch (selectedModule) {
      case "Harvesting Scheduling":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Harvesting Scheduling</h2>

            {/* Automated Scheduling */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">
                Automated Scheduling
              </h3>
              <p className="mb-4">
                Harvest dates have been automatically suggested based on crop
                maturity and planting dates.
              </p>
              <ul className="list-disc list-inside">
                {scheduledHarvests.map((harvest, index) => (
                  <li key={index}>
                    <strong>{harvest.cropType}</strong> -{" "}
                    {harvest.date.toDateString()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Manual Adjustments */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Manual Adjustments
              </h3>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <label className="block text-gray-700 mb-1">
                    Select Harvest Date:
                  </label>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="w-full"
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <label className="block text-gray-700 mb-1">Crop Type:</label>
                  <input
                    type="text"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    placeholder="e.g., Tea"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <button
                    onClick={handleAddHarvest}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Add Harvest
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Harvesting Records Management":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Harvesting Records Management
            </h2>

            {/* Harvest Record Form */}
            <form
              onSubmit={handleRecordSubmit}
              className="mb-8 bg-white p-6 rounded-md shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {isEditing ? "Edit Harvest Record" : "Add Harvest Record"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Crop Type:</label>
                  <input
                    type="text"
                    value={recordForm.cropType || ""}
                    onChange={(e) =>
                      setRecordForm({ ...recordForm, cropType: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="e.g., Coconut"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Quantity Harvested:
                  </label>
                  <input
                    type="number"
                    value={recordForm.quantityHarvested || ""}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        quantityHarvested: Number(e.target.value),
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Quality Assessment:
                  </label>
                  <select
                    value={recordForm.qualityAssessment || ""}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        qualityAssessment: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select quality</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Harvesting Date:
                  </label>
                  <input
                    type="date"
                    value={recordForm.harvestingDate || ""}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        harvestingDate: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Responsible Personnel:
                  </label>
                  <input
                    type="text"
                    value={recordForm.responsiblePersonnel || ""}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        responsiblePersonnel: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="e.g., John Doe"
                  />
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Update Record" : "Add Record"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditRecordId(null);
                      setRecordForm({});
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Harvest Records Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Harvest Records</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity Harvested (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harvesting Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsible Personnel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {harvestRecords.length > 0 ? (
                    harvestRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.cropType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.quantityHarvested}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.qualityAssessment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.harvestingDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.responsiblePersonnel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEditRecord(record)}
                            className="text-blue-600 hover:underline mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-center"
                        colSpan={6}
                      >
                        No harvest records available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Harvest Tracking and Analytics":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Harvest Tracking and Analytics
            </h2>

            {/* Dashboards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Yield Bar Chart */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Total Yield per Crop
                </h3>
                <Bar
                  data={harvestYieldData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Total Yield per Crop",
                      },
                    },
                  }}
                />
              </div>

              {/* Harvested Quantity Line Chart */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Harvested Quantity Over Time
                </h3>
                <Line
                  data={harvestTrendData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Harvested Quantity Over Time",
                      },
                    },
                  }}
                />
              </div>

              {/* Quality Assessment Pie Chart */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Quality Assessment
                </h3>
                <Pie
                  data={harvestQualityData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Quality Assessment",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Reports Section */}
            <div className="mt-8 bg-white p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Generate Reports</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                Download Harvest Report
              </button>
            </div>
          </div>
        );

      case "Integration with Planting and Growth Tracking":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Integration with Planting and Growth Tracking
            </h2>

            {/* Linked Records */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">
                Linked Harvesting Records
              </h3>
              <p className="mb-4">
                Harvesting records are automatically associated with their
                corresponding planting records. This ensures comprehensive
                tracking of each crop from planting through harvesting.
              </p>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border">Crop Type</th>
                    <th className="px-6 py-3 border">Harvest Date</th>
                    <th className="px-6 py-3 border">Planting Date</th>
                    <th className="px-6 py-3 border">Growth Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedPlantingRecords.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 border">{record.cropType}</td>
                      <td className="px-6 py-4 border">
                        {record.harvestingDate}
                      </td>
                      <td className="px-6 py-4 border">
                        {record.plantingDate}
                      </td>
                      <td className="px-6 py-4 border">{record.growthStage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Progress Indicators */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Crop Progress Indicators
              </h3>
              <p className="mb-4">
                Monitor the status of crops as they progress from planting to
                harvesting. This includes visual indicators of growth stages and
                health status.
              </p>
              {/* Display progress indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {linkedPlantingRecords.map((record, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-md shadow-md"
                  >
                    <h4 className="text-xl font-semibold mb-2">
                      {record.cropType}
                    </h4>
                    <p>Planting Date: {record.plantingDate}</p>
                    <p>Harvesting Date: {record.harvestingDate}</p>
                    <p>Growth Stage: {record.growthStage}</p>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          record.growthStage === "Germination"
                            ? "bg-yellow-500"
                            : record.growthStage === "Vegetative"
                            ? "bg-blue-500"
                            : record.growthStage === "Flowering"
                            ? "bg-purple-500"
                            : "bg-green-500"
                        }`}
                      >
                        {record.growthStage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Notifications and Alerts":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Notifications and Alerts
            </h2>

            {/* Reminders */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Reminders</h3>
              {notifications
                .filter((notification) => notification.type === "Reminder")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white p-4 mb-4 rounded-md shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-yellow-600">
                        {notification.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {notification.date}
                      </span>
                    </div>
                    <p>{notification.message}</p>
                  </div>
                ))}
            </div>

            {/* Alerts */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">Alerts</h3>
              {notifications
                .filter((notification) => notification.type === "Alert")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white p-4 mb-4 rounded-md shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-red-600">
                        {notification.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {notification.date}
                      </span>
                    </div>
                    <p>{notification.message}</p>
                  </div>
                ))}
            </div>
          </div>
        );

      default:
        return <div>Select a module from the navigation bar.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-green-200 p-4">
        <ul className="flex space-x-4">
          {[
            "Harvesting Scheduling",
            "Harvesting Records Management",
            "Harvest Tracking and Analytics",
            "Integration with Planting and Growth Tracking",
            "Notifications and Alerts",
          ].map((module) => (
            <li
              key={module}
              className={`cursor-pointer px-3 py-2 rounded-md text-gray-800 font-medium ${
                selectedModule === module
                  ? "bg-green-400 text-white"
                  : "hover:bg-green-300"
              }`}
              onClick={() => setSelectedModule(module)}
            >
              {module}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {renderModule()}
      </div>
    </div>
  );
};

export default HarvestManagementPage;

// src/app/dashboard/Management/fertilizationManagement/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
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
import { FaBars, FaTimes } from "react-icons/fa";

// Register ChartJS components
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

// Initialize Modal
// Adjust if your app root is different
// For Next.js applications

const FertilizationManagementPage = () => {
  // State for Dropdown Menu
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // State for Navigation
  const [selectedModule, setSelectedModule] = useState<string>(
    "Fertilizer Scheduling"
  );

  // ---------- 1. Fertilizer Scheduling ----------
  interface FertilizerTask {
    id: number;
    cropType: string;
    fertilizerType: string;
    quantity: number;
    date: Date;
    method: string;
    recurring: boolean;
  }

  const [schedulingTasks, setSchedulingTasks] = useState<FertilizerTask[]>([
    {
      id: 1,
      cropType: "Tea",
      fertilizerType: "NPK 20-20-20",
      quantity: 50,
      date: new Date("2025-05-20"),
      method: "Spraying",
      recurring: false,
    },
    {
      id: 2,
      cropType: "Coconut",
      fertilizerType: "Urea 46-0-0",
      quantity: 30,
      date: new Date("2025-06-15"),
      method: "Broadcasting",
      recurring: false,
    },
  ]);

  const [schedulingModalOpen, setSchedulingModalOpen] =
    useState<boolean>(false);
  const [schedulingForm, setSchedulingForm] = useState<{
    cropType: string;
    fertilizerType: string;
    quantity: number;
    date: Date | null;
    method: string;
    recurring: boolean;
  }>({
    cropType: "",
    fertilizerType: "",
    quantity: 0,
    date: null,
    method: "",
    recurring: false,
  });

  const addSchedulingTask = () => {
    if (
      schedulingForm.cropType &&
      schedulingForm.fertilizerType &&
      schedulingForm.quantity > 0 &&
      schedulingForm.date &&
      schedulingForm.method
    ) {
      const newTask: FertilizerTask = {
        id: Date.now(),
        cropType: schedulingForm.cropType,
        fertilizerType: schedulingForm.fertilizerType,
        quantity: schedulingForm.quantity,
        date: schedulingForm.date,
        method: schedulingForm.method,
        recurring: schedulingForm.recurring,
      };
      setSchedulingTasks([...schedulingTasks, newTask]);
      setSchedulingModalOpen(false);
      setSchedulingForm({
        cropType: "",
        fertilizerType: "",
        quantity: 0,
        date: null,
        method: "",
        recurring: false,
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  // ---------- 2. Fertilizer Application Records ----------
  interface FertilizerRecord {
    id: number;
    cropType: string;
    fertilizerType: string;
    quantity: number;
    applicationDate: string;
    location: string;
    method: string;
    responsiblePersonnel: string;
    attachments?: File[];
  }

  const [applicationRecords, setApplicationRecords] = useState<
    FertilizerRecord[]
  >([
    {
      id: 1,
      cropType: "Tea",
      fertilizerType: "NPK 20-20-20",
      quantity: 50,
      applicationDate: "2025-05-20",
      location: "Section A",
      method: "Spraying",
      responsiblePersonnel: "Alice Johnson",
      attachments: [],
    },
    {
      id: 2,
      cropType: "Coconut",
      fertilizerType: "Urea 46-0-0",
      quantity: 30,
      applicationDate: "2025-06-15",
      location: "Section B",
      method: "Broadcasting",
      responsiblePersonnel: "Bob Smith",
      attachments: [],
    },
  ]);

  const [applicationModalOpen, setApplicationModalOpen] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<FertilizerRecord | null>(
    null
  );
  const [applicationForm, setApplicationForm] = useState<{
    cropType: string;
    fertilizerType: string;
    quantity: number;
    applicationDate: string;
    location: string;
    method: string;
    responsiblePersonnel: string;
    attachments: File[];
  }>({
    cropType: "",
    fertilizerType: "",
    quantity: 0,
    applicationDate: "",
    location: "",
    method: "",
    responsiblePersonnel: "",
    attachments: [],
  });

  const addApplicationRecord = () => {
    if (
      applicationForm.cropType &&
      applicationForm.fertilizerType &&
      applicationForm.quantity > 0 &&
      applicationForm.applicationDate &&
      applicationForm.location &&
      applicationForm.method &&
      applicationForm.responsiblePersonnel
    ) {
      const newRecord: FertilizerRecord = {
        id: Date.now(),
        cropType: applicationForm.cropType,
        fertilizerType: applicationForm.fertilizerType,
        quantity: applicationForm.quantity,
        applicationDate: applicationForm.applicationDate,
        location: applicationForm.location,
        method: applicationForm.method,
        responsiblePersonnel: applicationForm.responsiblePersonnel,
        attachments: applicationForm.attachments,
      };
      setApplicationRecords([...applicationRecords, newRecord]);
      setApplicationModalOpen(false);
      setApplicationForm({
        cropType: "",
        fertilizerType: "",
        quantity: 0,
        applicationDate: "",
        location: "",
        method: "",
        responsiblePersonnel: "",
        attachments: [],
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const updateApplicationRecord = () => {
    if (
      currentRecord &&
      applicationForm.cropType &&
      applicationForm.fertilizerType &&
      applicationForm.quantity > 0 &&
      applicationForm.applicationDate &&
      applicationForm.location &&
      applicationForm.method &&
      applicationForm.responsiblePersonnel
    ) {
      const updatedRecord: FertilizerRecord = {
        id: currentRecord.id,
        cropType: applicationForm.cropType,
        fertilizerType: applicationForm.fertilizerType,
        quantity: applicationForm.quantity,
        applicationDate: applicationForm.applicationDate,
        location: applicationForm.location,
        method: applicationForm.method,
        responsiblePersonnel: applicationForm.responsiblePersonnel,
        attachments: applicationForm.attachments,
      };
      setApplicationRecords(
        applicationRecords.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );
      setApplicationModalOpen(false);
      setCurrentRecord(null);
      setIsEditMode(false);
      setApplicationForm({
        cropType: "",
        fertilizerType: "",
        quantity: 0,
        applicationDate: "",
        location: "",
        method: "",
        responsiblePersonnel: "",
        attachments: [],
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const deleteApplicationRecord = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setApplicationRecords(
        applicationRecords.filter((record) => record.id !== id)
      );
    }
  };

  const openAddApplicationModal = () => {
    setIsEditMode(false);
    setCurrentRecord(null);
    setApplicationForm({
      cropType: "",
      fertilizerType: "",
      quantity: 0,
      applicationDate: "",
      location: "",
      method: "",
      responsiblePersonnel: "",
      attachments: [],
    });
    setApplicationModalOpen(true);
  };

  const openEditApplicationModal = (record: FertilizerRecord) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setApplicationForm({
      cropType: record.cropType,
      fertilizerType: record.fertilizerType,
      quantity: record.quantity,
      applicationDate: record.applicationDate,
      location: record.location,
      method: record.method,
      responsiblePersonnel: record.responsiblePersonnel,
      attachments: record.attachments || [],
    });
    setApplicationModalOpen(true);
  };

  // ---------- 3. Fertilizer Inventory Management ----------
  interface Supplier {
    id: number;
    name: string;
    contact: string;
    email: string;
  }

  interface FertilizerInventory {
    id: number;
    fertilizerType: string;
    currentStock: number;
    reorderLevel: number;
    supplier: Supplier;
    expiryDate: string;
  }

  const [inventory, setInventory] = useState<FertilizerInventory[]>([
    {
      id: 1,
      fertilizerType: "NPK 20-20-20",
      currentStock: 500,
      reorderLevel: 200,
      supplier: {
        id: 1,
        name: "ABC Suppliers",
        contact: "123-456-7890",
        email: "contact@abcsuppliers.com",
      },
      expiryDate: "2025-12-31",
    },
    {
      id: 2,
      fertilizerType: "Urea 46-0-0",
      currentStock: 300,
      reorderLevel: 150,
      supplier: {
        id: 2,
        name: "XYZ Fertilizers",
        contact: "987-654-3210",
        email: "info@xyzfertilizers.com",
      },
      expiryDate: "2026-06-30",
    },
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "ABC Suppliers",
      contact: "123-456-7890",
      email: "contact@abcsuppliers.com",
    },
    {
      id: 2,
      name: "XYZ Fertilizers",
      contact: "987-654-3210",
      email: "info@xyzfertilizers.com",
    },
  ]);

  const [inventoryModalOpen, setInventoryModalOpen] = useState<boolean>(false);
  const [isEditInventoryMode, setIsEditInventoryMode] =
    useState<boolean>(false);
  const [currentInventoryItem, setCurrentInventoryItem] =
    useState<FertilizerInventory | null>(null);
  const [inventoryForm, setInventoryForm] = useState<{
    fertilizerType: string;
    currentStock: number;
    reorderLevel: number;
    supplierId: number;
    expiryDate: string;
  }>({
    fertilizerType: "",
    currentStock: 0,
    reorderLevel: 0,
    supplierId: suppliers[0]?.id || 0,
    expiryDate: "",
  });

  const addInventoryItem = () => {
    const supplier = suppliers.find((s) => s.id === inventoryForm.supplierId);
    if (
      inventoryForm.fertilizerType &&
      inventoryForm.currentStock >= 0 &&
      inventoryForm.reorderLevel >= 0 &&
      supplier &&
      inventoryForm.expiryDate
    ) {
      const newItem: FertilizerInventory = {
        id: Date.now(),
        fertilizerType: inventoryForm.fertilizerType,
        currentStock: inventoryForm.currentStock,
        reorderLevel: inventoryForm.reorderLevel,
        supplier: supplier,
        expiryDate: inventoryForm.expiryDate,
      };
      setInventory([...inventory, newItem]);
      setInventoryModalOpen(false);
      setInventoryForm({
        fertilizerType: "",
        currentStock: 0,
        reorderLevel: 0,
        supplierId: suppliers[0]?.id || 0,
        expiryDate: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const updateInventoryItem = () => {
    if (
      currentInventoryItem &&
      inventoryForm.fertilizerType &&
      inventoryForm.currentStock >= 0 &&
      inventoryForm.reorderLevel >= 0 &&
      inventoryForm.expiryDate
    ) {
      const supplier = suppliers.find((s) => s.id === inventoryForm.supplierId);
      if (!supplier) {
        alert("Selected supplier not found.");
        return;
      }
      const updatedItem: FertilizerInventory = {
        id: currentInventoryItem.id,
        fertilizerType: inventoryForm.fertilizerType,
        currentStock: inventoryForm.currentStock,
        reorderLevel: inventoryForm.reorderLevel,
        supplier: supplier,
        expiryDate: inventoryForm.expiryDate,
      };
      setInventory(
        inventory.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setInventoryModalOpen(false);
      setCurrentInventoryItem(null);
      setIsEditInventoryMode(false);
      setInventoryForm({
        fertilizerType: "",
        currentStock: 0,
        reorderLevel: 0,
        supplierId: suppliers[0]?.id || 0,
        expiryDate: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const deleteInventoryItem = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  const openAddInventoryModal = () => {
    setIsEditInventoryMode(false);
    setCurrentInventoryItem(null);
    setInventoryForm({
      fertilizerType: "",
      currentStock: 0,
      reorderLevel: 0,
      supplierId: suppliers[0]?.id || 0,
      expiryDate: "",
    });
    setInventoryModalOpen(true);
  };

  const openEditInventoryModal = (item: FertilizerInventory) => {
    setIsEditInventoryMode(true);
    setCurrentInventoryItem(item);
    setInventoryForm({
      fertilizerType: item.fertilizerType,
      currentStock: item.currentStock,
      reorderLevel: item.reorderLevel,
      supplierId: item.supplier.id,
      expiryDate: item.expiryDate,
    });
    setInventoryModalOpen(true);
  };

  // ---------- 4. Fertilizer Usage Analytics ----------
  interface FertilizerUsageRecord {
    fertilizerType: string;
    quantity: number;
    cost: number; // Assuming cost per kg
    applicationDate: string;
  }

  const [usageRecords, setUsageRecords] = useState<FertilizerUsageRecord[]>([
    {
      fertilizerType: "NPK 20-20-20",
      quantity: 50,
      cost: 100, // 50kg * $2/kg
      applicationDate: "2025-05-20",
    },
    {
      fertilizerType: "Urea 46-0-0",
      quantity: 30,
      cost: 60, // 30kg * $2/kg
      applicationDate: "2025-06-15",
    },
    // Add more records as needed
  ]);

  // Aggregated Data for Charts
  const fertilizerTypes = Array.from(
    new Set(usageRecords.map((record) => record.fertilizerType))
  );

  const totalYieldData = {
    labels: fertilizerTypes,
    datasets: [
      {
        label: "Total Yield (kg)",
        data: fertilizerTypes.map((type) =>
          usageRecords
            .filter((record) => record.fertilizerType === type)
            .reduce((acc, curr) => acc + curr.quantity, 0)
        ),
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

  const usageTrendData = {
    labels: usageRecords.map((record) => record.applicationDate),
    datasets: [
      {
        label: "Fertilizer Quantity Applied (kg)",
        data: usageRecords.map((record) => record.quantity),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  const costAnalysisData = {
    labels: fertilizerTypes,
    datasets: [
      {
        label: "Total Cost ($)",
        data: fertilizerTypes.map((type) =>
          usageRecords
            .filter((record) => record.fertilizerType === type)
            .reduce((acc, curr) => acc + curr.cost, 0)
        ),
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const efficiencyMetrics = {
    labels: fertilizerTypes,
    datasets: [
      {
        label: "Efficiency (kg Yield per $)",
        data: fertilizerTypes.map((type) => {
          const totalQuantity = usageRecords
            .filter((record) => record.fertilizerType === type)
            .reduce((acc, curr) => acc + curr.quantity, 0);
          const totalCost = usageRecords
            .filter((record) => record.fertilizerType === type)
            .reduce((acc, curr) => acc + curr.cost, 0);
          return totalCost > 0
            ? parseFloat((totalQuantity / totalCost).toFixed(2))
            : 0;
        }),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  // ---------- 5. Integration with Crop Growth Tracking ----------
  interface CropGrowthRecord {
    id: number;
    cropType: string;
    plantingDate: string;
    growthStage: string;
    fertilizerApplications: number[]; // Array of FertilizerRecord IDs
  }

  const [cropGrowthRecords, setCropGrowthRecords] = useState<
    CropGrowthRecord[]
  >([
    {
      id: 1,
      cropType: "Tea",
      plantingDate: "2025-03-10",
      growthStage: "Flowering",
      fertilizerApplications: [1],
    },
    {
      id: 2,
      cropType: "Coconut",
      plantingDate: "2025-04-15",
      growthStage: "Vegetative",
      fertilizerApplications: [2],
    },
    // Add more records as needed
  ]);

  // ---------- 6. Notifications and Alerts ----------
  interface Notification {
    id: number;
    type: string; // "Reminder", "Alert"
    message: string;
    date: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "Reminder",
      message: "Fertilizer application for Tea in Section A on 2025-05-20.",
      date: "2025-05-15",
    },
    {
      id: 2,
      type: "Alert",
      message: "Low stock: NPK 20-20-20 approaching reorder level.",
      date: "2025-05-18",
    },
    {
      id: 3,
      type: "Reminder",
      message: "Fertilizer application for Coconut in Section B on 2025-06-15.",
      date: "2025-06-10",
    },
    {
      id: 4,
      type: "Alert",
      message: "Expiry Alert: Urea 46-0-0 in Inventory expires on 2026-06-30.",
      date: "2026-06-25",
    },
  ]);

  // ---------- 7. Fertilizer Recommendations ----------
  interface SoilAnalysis {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  }

  interface Recommendation {
    id: number;
    fertilizerType: string;
    recommendedFor: string;
    quantity: number;
  }

  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysis>({
    pH: 6.5,
    nitrogen: 30,
    phosphorus: 20,
    potassium: 25,
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 1,
      fertilizerType: "NPK 20-20-20",
      recommendedFor: "Tea",
      quantity: 50,
    },
    {
      id: 2,
      fertilizerType: "Urea 46-0-0",
      recommendedFor: "Coconut",
      quantity: 30,
    },
  ]);

  const generateRecommendations = () => {
    // Placeholder for recommendation logic
    // Implement soil analysis-based recommendations here
    // For demonstration, we'll use static recommendations
    alert("Fertilizer recommendations generated based on soil analysis.");
  };

  // ---------- 8. Compliance and Documentation ----------
  interface ComplianceDocument {
    id: number;
    title: string;
    file: File | null;
    uploadDate: string;
  }

  const [complianceDocuments, setComplianceDocuments] = useState<
    ComplianceDocument[]
  >([
    {
      id: 1,
      title: "Fertilizer Application Compliance Report",
      file: null,
      uploadDate: "2025-05-20",
    },
  ]);

  const [complianceModalOpen, setComplianceModalOpen] =
    useState<boolean>(false);
  const [complianceForm, setComplianceForm] = useState<{
    title: string;
    file: File | null;
  }>({
    title: "",
    file: null,
  });

  const addComplianceDocument = () => {
    if (complianceForm.title && complianceForm.file) {
      const newDoc: ComplianceDocument = {
        id: Date.now(),
        title: complianceForm.title,
        file: complianceForm.file,
        uploadDate: new Date().toISOString().split("T")[0],
      };
      setComplianceDocuments([...complianceDocuments, newDoc]);
      setComplianceModalOpen(false);
      setComplianceForm({
        title: "",
        file: null,
      });
    } else {
      alert("Please provide a title and select a file.");
    }
  };

  const deleteComplianceDocument = (id: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setComplianceDocuments(
        complianceDocuments.filter((doc) => doc.id !== id)
      );
    }
  };

  // ---------- 9. Reporting and Data Exporting ----------
  const [reportType, setReportType] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const handleGenerateReport = () => {
    // Placeholder for report generation logic
    // Implement data fetching and report creation here
    alert("Report generated successfully.");
  };

  const handleExportData = (format: string) => {
    // Placeholder for data exporting logic
    // Implement data export based on selected format
    alert(`Data exported as ${format}.`);
  };

  const handleScheduleReport = () => {
    // Placeholder for scheduled reporting logic
    alert("Reports scheduled successfully.");
  };

  // ---------- Render Module Function ----------
  const renderModule = () => {
    switch (selectedModule) {
      case "Fertilizer Scheduling":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Fertilizer Scheduling
            </h2>

            {/* Automated Scheduling Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Automated Scheduling
              </h3>
              <p className="mb-4 text-gray-600">
                Fertilizer application schedules have been automatically
                generated based on crop requirements, soil analysis, and
                historical data.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {schedulingTasks.map((task) => (
                  <li key={task.id} className="mb-2">
                    <strong>{task.cropType}</strong> - {task.fertilizerType} on{" "}
                    {task.date.toDateString()} via {task.method}
                    {task.recurring ? " (Recurring)" : ""}
                  </li>
                ))}
              </ul>
            </section>

            {/* Manual Adjustments Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Manual Scheduling Adjustments
              </h3>
              <button
                onClick={() => setSchedulingModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 mb-6 w-full md:w-auto"
              >
                Add Fertilizer Task
              </button>

              {/* Calendar Integration */}
              <div className="overflow-x-auto">
                <h4 className="text-xl font-semibold mb-2 text-gray-700">
                  Scheduled Tasks Calendar
                </h4>
                <Calendar
                  onChange={(date: Date) =>
                    setSchedulingForm({ ...schedulingForm, date })
                  }
                  value={schedulingForm.date}
                  tileContent={({ date, view }) => {
                    const dayTasks = schedulingTasks.filter(
                      (task) =>
                        task.date.getFullYear() === date.getFullYear() &&
                        task.date.getMonth() === date.getMonth() &&
                        task.date.getDate() === date.getDate()
                    );
                    return dayTasks.length > 0 ? (
                      <div className="text-xs bg-blue-200 rounded-full px-1 mt-1">
                        {dayTasks.length} Task{dayTasks.length > 1 ? "s" : ""}
                      </div>
                    ) : null;
                  }}
                />
              </div>
            </section>

            {/* Modal for Adding Task */}
            <Modal
              isOpen={schedulingModalOpen}
              onRequestClose={() => setSchedulingModalOpen(false)}
              contentLabel="Add Fertilizer Task"
              className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Add Fertilizer Task
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Select Date:
                  </label>
                  <Calendar
                    onChange={(date: Date) =>
                      setSchedulingForm({ ...schedulingForm, date })
                    }
                    value={schedulingForm.date}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Crop Type:</label>
                  <input
                    type="text"
                    value={schedulingForm.cropType}
                    onChange={(e) =>
                      setSchedulingForm({
                        ...schedulingForm,
                        cropType: e.target.value,
                      })
                    }
                    placeholder="e.g., Tea"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Fertilizer Type:
                  </label>
                  <input
                    type="text"
                    value={schedulingForm.fertilizerType}
                    onChange={(e) =>
                      setSchedulingForm({
                        ...schedulingForm,
                        fertilizerType: e.target.value,
                      })
                    }
                    placeholder="e.g., NPK 20-20-20"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Quantity (kg):
                  </label>
                  <input
                    type="number"
                    value={schedulingForm.quantity}
                    onChange={(e) =>
                      setSchedulingForm({
                        ...schedulingForm,
                        quantity: Number(e.target.value),
                      })
                    }
                    placeholder="Enter quantity"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Method of Application:
                  </label>
                  <select
                    value={schedulingForm.method}
                    onChange={(e) =>
                      setSchedulingForm({
                        ...schedulingForm,
                        method: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select method</option>
                    <option value="Spraying">Spraying</option>
                    <option value="Broadcasting">Broadcasting</option>
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Injection">Injection</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={schedulingForm.recurring}
                    onChange={(e) =>
                      setSchedulingForm({
                        ...schedulingForm,
                        recurring: e.target.checked,
                      })
                    }
                    className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="text-gray-700">Set as Recurring Task</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={addSchedulingTask}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setSchedulingModalOpen(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        );
      case "Fertilizer Application Records":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Fertilizer Application Records
            </h2>

            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Search by Crop Type"
                value={applicationForm.cropType}
                onChange={(e) =>
                  setApplicationForm({
                    ...applicationForm,
                    cropType: e.target.value,
                  })
                }
                className="w-full md:w-1/3 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={applicationForm.fertilizerType}
                onChange={(e) =>
                  setApplicationForm({
                    ...applicationForm,
                    fertilizerType: e.target.value,
                  })
                }
                className="w-full md:w-1/3 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Fertilizers</option>
                {Array.from(
                  new Set(
                    applicationRecords.map((record) => record.fertilizerType)
                  )
                ).map((fertilizer) => (
                  <option key={fertilizer} value={fertilizer}>
                    {fertilizer}
                  </option>
                ))}
              </select>
              <button
                onClick={openAddApplicationModal}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full md:w-auto"
              >
                Add Record
              </button>
            </div>

            {/* Records Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fertilizer Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsible Personnel
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attachments
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applicationRecords.length > 0 ? (
                    applicationRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.cropType}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.fertilizerType}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.applicationDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.location}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.method}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {record.responsiblePersonnel}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                          {record.attachments &&
                          record.attachments.length > 0 ? (
                            <a
                              href="#"
                              className="hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                // Handle file download or viewing
                                alert(
                                  "File download/view functionality to be implemented."
                                );
                              }}
                            >
                              {record.attachments.length} File
                              {record.attachments.length > 1 ? "s" : ""}
                            </a>
                          ) : (
                            "No Attachments"
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => openEditApplicationModal(record)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteApplicationRecord(record.id)}
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
                        className="px-4 py-4 whitespace-nowrap text-center text-gray-500"
                        colSpan={9}
                      >
                        No fertilizer application records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Add/Edit Application Record */}
            <Modal
              isOpen={applicationModalOpen}
              onRequestClose={() => {
                setApplicationModalOpen(false);
                setIsEditMode(false);
                setCurrentRecord(null);
              }}
              contentLabel={
                isEditMode
                  ? "Edit Fertilizer Application Record"
                  : "Add Fertilizer Application Record"
              }
              className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isEditMode
                  ? "Edit Fertilizer Application Record"
                  : "Add Fertilizer Application Record"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditMode
                    ? updateApplicationRecord()
                    : addApplicationRecord();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Crop Type:
                    </label>
                    <input
                      type="text"
                      value={applicationForm.cropType}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          cropType: e.target.value,
                        })
                      }
                      placeholder="e.g., Tea"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Fertilizer Type:
                    </label>
                    <input
                      type="text"
                      value={applicationForm.fertilizerType}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          fertilizerType: e.target.value,
                        })
                      }
                      placeholder="e.g., NPK 20-20-20"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Quantity (kg):
                    </label>
                    <input
                      type="number"
                      value={applicationForm.quantity}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          quantity: Number(e.target.value),
                        })
                      }
                      placeholder="Enter quantity"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Application Date:
                    </label>
                    <input
                      type="date"
                      value={applicationForm.applicationDate}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          applicationDate: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Location:
                    </label>
                    <input
                      type="text"
                      value={applicationForm.location}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g., Section A"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Method of Application:
                    </label>
                    <select
                      value={applicationForm.method}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          method: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select method</option>
                      <option value="Spraying">Spraying</option>
                      <option value="Broadcasting">Broadcasting</option>
                      <option value="Drip Irrigation">Drip Irrigation</option>
                      <option value="Injection">Injection</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Responsible Personnel:
                    </label>
                    <input
                      type="text"
                      value={applicationForm.responsiblePersonnel}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          responsiblePersonnel: e.target.value,
                        })
                      }
                      placeholder="e.g., John Doe"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">
                      Attachments:
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setApplicationForm({
                            ...applicationForm,
                            attachments: Array.from(e.target.files),
                          });
                        }
                      }}
                      className="w-full"
                    />
                    {applicationForm.attachments.length > 0 && (
                      <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                        {applicationForm.attachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                  >
                    {isEditMode ? "Update Record" : "Add Record"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationModalOpen(false);
                      setIsEditMode(false);
                      setCurrentRecord(null);
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Fertilizer Inventory Management":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Fertilizer Inventory Management
            </h2>

            {/* Add Inventory Button */}
            <div className="flex justify-end">
              <button
                onClick={openAddInventoryModal}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Add Inventory
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fertilizer Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reorder Level (kg)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.length > 0 ? (
                    inventory.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.fertilizerType}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.currentStock}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.reorderLevel}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.supplier.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.expiryDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => openEditInventoryModal(item)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
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
                        className="px-4 py-4 whitespace-nowrap text-center text-gray-500"
                        colSpan={6}
                      >
                        No inventory records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Add/Edit Inventory */}
            <Modal
              isOpen={inventoryModalOpen}
              onRequestClose={() => {
                setInventoryModalOpen(false);
                setIsEditInventoryMode(false);
                setCurrentInventoryItem(null);
              }}
              contentLabel={
                isEditInventoryMode
                  ? "Edit Fertilizer Inventory"
                  : "Add Fertilizer Inventory"
              }
              className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {isEditInventoryMode
                  ? "Edit Fertilizer Inventory"
                  : "Add Fertilizer Inventory"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditInventoryMode
                    ? updateInventoryItem()
                    : addInventoryItem();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Fertilizer Type:
                    </label>
                    <input
                      type="text"
                      value={inventoryForm.fertilizerType}
                      onChange={(e) =>
                        setInventoryForm({
                          ...inventoryForm,
                          fertilizerType: e.target.value,
                        })
                      }
                      placeholder="e.g., NPK 20-20-20"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Current Stock (kg):
                    </label>
                    <input
                      type="number"
                      value={inventoryForm.currentStock}
                      onChange={(e) =>
                        setInventoryForm({
                          ...inventoryForm,
                          currentStock: Number(e.target.value),
                        })
                      }
                      placeholder="Enter current stock"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Reorder Level (kg):
                    </label>
                    <input
                      type="number"
                      value={inventoryForm.reorderLevel}
                      onChange={(e) =>
                        setInventoryForm({
                          ...inventoryForm,
                          reorderLevel: Number(e.target.value),
                        })
                      }
                      placeholder="Enter reorder level"
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Supplier:
                    </label>
                    <select
                      value={inventoryForm.supplierId}
                      onChange={(e) =>
                        setInventoryForm({
                          ...inventoryForm,
                          supplierId: Number(e.target.value),
                        })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Expiry Date:
                    </label>
                    <input
                      type="date"
                      value={inventoryForm.expiryDate}
                      onChange={(e) =>
                        setInventoryForm({
                          ...inventoryForm,
                          expiryDate: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                  >
                    {isEditInventoryMode ? "Update Inventory" : "Add Inventory"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInventoryModalOpen(false);
                      setIsEditInventoryMode(false);
                      setCurrentInventoryItem(null);
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Fertilizer Usage Analytics":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Fertilizer Usage Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Total Yield Bar Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md h-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Total Yield per Fertilizer Type
                </h3>
                <Bar
                  data={totalYieldData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Total Yield per Fertilizer Type",
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  height={300}
                />
              </div>

              {/* Usage Trend Line Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md h-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Fertilizer Usage Over Time
                </h3>
                <Line
                  data={usageTrendData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Fertilizer Usage Over Time",
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  height={300}
                />
              </div>

              {/* Cost Analysis Pie Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md h-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Cost Analysis
                </h3>
                <Pie
                  data={costAnalysisData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Cost Analysis per Fertilizer Type",
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  height={300}
                />
              </div>

              {/* Efficiency Metrics Bar Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md h-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Efficiency Metrics
                </h3>
                <Bar
                  data={efficiencyMetrics}
                  options={{
                    responsive: true,
                    indexAxis: "y" as const,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Efficiency (kg Yield per $) per Fertilizer Type",
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  height={300}
                />
              </div>
            </div>
          </div>
        );
      case "Integration with Crop Growth Tracking":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Integration with Crop Growth Tracking
            </h2>

            {/* Linked Records Table */}
            <section className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Linked Fertilizer Applications
              </h3>
              <p className="mb-6 text-gray-600">
                Fertilizer applications are linked with specific crop growth
                stages and planting records.
              </p>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Planting Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth Stage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fertilizer Applications
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cropGrowthRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.cropType}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.plantingDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.growthStage}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.fertilizerApplications.length > 0
                          ? record.fertilizerApplications.join(", ")
                          : "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Impact Analysis Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Impact Analysis
              </h3>
              <p className="mb-4 text-gray-600">
                Evaluate how fertilization affects crop health and yield.
              </p>
              {/* Placeholder for charts or data visualization */}
              <div className="bg-gray-100 p-6 rounded-md h-64 flex items-center justify-center">
                <p className="text-gray-500">[Impact Analysis Charts/Graphs]</p>
              </div>
            </section>
          </div>
        );
      case "Notifications and Alerts":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Notifications and Alerts
            </h2>

            {/* Notifications Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reminders Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                  Reminders
                </h3>
                {notifications
                  .filter((n) => n.type === "Reminder")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="mb-4 p-4 bg-yellow-100 rounded-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-yellow-700">
                          {notification.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {notification.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{notification.message}</p>
                    </div>
                  ))}
                {notifications.filter((n) => n.type === "Reminder").length ===
                  0 && <p className="text-gray-500">No reminders available.</p>}
              </div>

              {/* Alerts Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                  Alerts
                </h3>
                {notifications
                  .filter((n) => n.type === "Alert")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="mb-4 p-4 bg-red-100 rounded-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-red-700">
                          {notification.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {notification.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{notification.message}</p>
                    </div>
                  ))}
                {notifications.filter((n) => n.type === "Alert").length ===
                  0 && <p className="text-gray-500">No alerts available.</p>}
              </div>
            </div>
          </div>
        );
      case "Fertilizer Recommendations":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Fertilizer Recommendations
            </h2>

            {/* Soil Analysis Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Soil Analysis Results
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">pH Level:</label>
                  <input
                    type="number"
                    value={soilAnalysis.pH}
                    onChange={(e) =>
                      setSoilAnalysis({
                        ...soilAnalysis,
                        pH: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="4"
                    max="8"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Nitrogen (kg/ha):
                  </label>
                  <input
                    type="number"
                    value={soilAnalysis.nitrogen}
                    onChange={(e) =>
                      setSoilAnalysis({
                        ...soilAnalysis,
                        nitrogen: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Phosphorus (kg/ha):
                  </label>
                  <input
                    type="number"
                    value={soilAnalysis.phosphorus}
                    onChange={(e) =>
                      setSoilAnalysis({
                        ...soilAnalysis,
                        phosphorus: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Potassium (kg/ha):
                  </label>
                  <input
                    type="number"
                    value={soilAnalysis.potassium}
                    onChange={(e) =>
                      setSoilAnalysis({
                        ...soilAnalysis,
                        potassium: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                  />
                </div>
              </form>
              <button
                onClick={generateRecommendations}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 w-full md:w-auto"
              >
                Generate Recommendations
              </button>
            </section>

            {/* Recommendations List */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Recommended Fertilizers
              </h3>
              {recommendations.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id}>
                      <strong>{rec.fertilizerType}</strong> recommended for{" "}
                      {rec.recommendedFor} - {rec.quantity} kg/ha
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recommendations available.</p>
              )}
            </section>
          </div>
        );
      case "Compliance and Documentation":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Compliance and Documentation
            </h2>

            {/* Add Document Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setComplianceModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Add Document
              </button>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complianceDocuments.length > 0 ? (
                    complianceDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {doc.title}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                          {doc.file ? (
                            <a
                              href={URL.createObjectURL(doc.file)}
                              download={doc.file.name}
                              className="hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            "No File"
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {doc.uploadDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => deleteComplianceDocument(doc.id)}
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
                        className="px-4 py-4 whitespace-nowrap text-center text-gray-500"
                        colSpan={4}
                      >
                        No compliance documents available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Adding Document */}
            <Modal
              isOpen={complianceModalOpen}
              onRequestClose={() => setComplianceModalOpen(false)}
              contentLabel="Add Compliance Document"
              className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Add Compliance Document
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComplianceDocument();
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-700 mb-1">
                    Document Title:
                  </label>
                  <input
                    type="text"
                    value={complianceForm.title}
                    onChange={(e) =>
                      setComplianceForm({
                        ...complianceForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter document title"
                    required
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Upload File:
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setComplianceForm({
                          ...complianceForm,
                          file: e.target.files[0],
                        });
                      }
                    }}
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                  >
                    Upload Document
                  </button>
                  <button
                    type="button"
                    onClick={() => setComplianceModalOpen(false)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Reporting and Data Exporting":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Reporting and Data Exporting
            </h2>

            {/* Custom Report Builder */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Custom Report Builder
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Report Type:
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select report type</option>
                    <option value="Fertilizer Usage">Fertilizer Usage</option>
                    <option value="Inventory Status">Inventory Status</option>
                    <option value="Cost Analysis">Cost Analysis</option>
                    <option value="Application Effectiveness">
                      Application Effectiveness
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Date Range:
                  </label>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full md:w-1/2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full md:w-1/2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto"
                >
                  Generate Report
                </button>
              </form>
            </section>

            {/* Predefined Reports */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Predefined Report Templates
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <button
                    onClick={() => handleExportData("CSV")}
                    className="text-blue-600 hover:underline"
                  >
                    Monthly Fertilizer Usage Report
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExportData("PDF")}
                    className="text-blue-600 hover:underline"
                  >
                    Quarterly Cost Analysis Report
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExportData("Excel")}
                    className="text-blue-600 hover:underline"
                  >
                    Annual Fertilizer Application Effectiveness Report
                  </button>
                </li>
              </ul>
            </section>

            {/* Export Options */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Export Data
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <button
                  onClick={() => handleExportData("CSV")}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full md:w-auto"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportData("PDF")}
                  className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 w-full md:w-auto"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExportData("Excel")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto"
                >
                  Export as Excel
                </button>
              </div>
            </section>

            {/* Scheduled Reporting */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Scheduled Reporting
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Report Frequency:
                  </label>
                  <select
                    onChange={(e) => {
                      // Implement scheduling logic here
                      alert(`Report scheduled to run ${e.target.value}.`);
                    }}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Email Addresses:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email addresses separated by commas"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleScheduleReport}
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 w-full md:w-auto"
                >
                  Schedule Reports
                </button>
              </form>
            </section>
          </div>
        );
      case "Compliance and Documentation":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Compliance and Documentation
            </h2>

            {/* Add Document Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setComplianceModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Add Document
              </button>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complianceDocuments.length > 0 ? (
                    complianceDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {doc.title}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                          {doc.file ? (
                            <a
                              href={URL.createObjectURL(doc.file)}
                              download={doc.file.name}
                              className="hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            "No File"
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {doc.uploadDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => deleteComplianceDocument(doc.id)}
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
                        className="px-4 py-4 whitespace-nowrap text-center text-gray-500"
                        colSpan={4}
                      >
                        No compliance documents available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Adding Document */}
            <Modal
              isOpen={complianceModalOpen}
              onRequestClose={() => setComplianceModalOpen(false)}
              contentLabel="Add Compliance Document"
              className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Add Compliance Document
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComplianceDocument();
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-700 mb-1">
                    Document Title:
                  </label>
                  <input
                    type="text"
                    value={complianceForm.title}
                    onChange={(e) =>
                      setComplianceForm({
                        ...complianceForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter document title"
                    required
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Upload File:
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setComplianceForm({
                          ...complianceForm,
                          file: e.target.files[0],
                        });
                      }
                    }}
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                  >
                    Upload Document
                  </button>
                  <button
                    type="button"
                    onClick={() => setComplianceModalOpen(false)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Reporting and Data Exporting":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Reporting and Data Exporting
            </h2>

            {/* Custom Report Builder */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Custom Report Builder
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Report Type:
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select report type</option>
                    <option value="Fertilizer Usage">Fertilizer Usage</option>
                    <option value="Inventory Status">Inventory Status</option>
                    <option value="Cost Analysis">Cost Analysis</option>
                    <option value="Application Effectiveness">
                      Application Effectiveness
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Date Range:
                  </label>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full md:w-1/2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full md:w-1/2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto"
                >
                  Generate Report
                </button>
              </form>
            </section>

            {/* Predefined Reports */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Predefined Report Templates
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <button
                    onClick={() => handleExportData("CSV")}
                    className="text-blue-600 hover:underline"
                  >
                    Monthly Fertilizer Usage Report
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExportData("PDF")}
                    className="text-blue-600 hover:underline"
                  >
                    Quarterly Cost Analysis Report
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExportData("Excel")}
                    className="text-blue-600 hover:underline"
                  >
                    Annual Fertilizer Application Effectiveness Report
                  </button>
                </li>
              </ul>
            </section>

            {/* Export Options */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Export Data
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <button
                  onClick={() => handleExportData("CSV")}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full md:w-auto"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportData("PDF")}
                  className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 w-full md:w-auto"
                >
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExportData("Excel")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full md:w-auto"
                >
                  Export as Excel
                </button>
              </div>
            </section>

            {/* Scheduled Reporting */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Scheduled Reporting
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Report Frequency:
                  </label>
                  <select
                    onChange={(e) => {
                      // Implement scheduling logic here
                      alert(`Report scheduled to run ${e.target.value}.`);
                    }}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Email Addresses:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email addresses separated by commas"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleScheduleReport}
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 w-full md:w-auto"
                >
                  Schedule Reports
                </button>
              </form>
            </section>
          </div>
        );
      default:
        return <div>Select a module from the dropdown menu.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with Dropdown Menu */}
      <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Fertilization Management Dashboard
        </h1>

        {/* Dropdown Menu */}
        <div className="relative inline-block text-left">
          <button
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="menu-button"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Menu
            {/* Icon for dropdown */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Panel */}
          {dropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                {[
                  "Fertilizer Scheduling",
                  "Fertilizer Application Records",
                  "Fertilizer Inventory Management",
                  "Fertilizer Usage Analytics",
                  "Integration with Crop Growth Tracking",
                  "Notifications and Alerts",
                  "Fertilizer Recommendations",
                  "Compliance and Documentation",
                  "Reporting and Data Exporting",
                ].map((module) => (
                  <button
                    key={module}
                    onClick={() => {
                      setSelectedModule(module);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {module}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto container mx-auto max-w-6xl">
        {renderModule()}
      </main>
    </div>
  );
};

export default FertilizationManagementPage;

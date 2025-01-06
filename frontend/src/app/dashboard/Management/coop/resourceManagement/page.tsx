// src/app/dashboard/Management/resourceManagement/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  FaBoxes,
  FaTools,
  FaBars,
  FaShoppingCart,
  FaWrench,
  FaCalendarAlt,
  FaTruck,
  FaChartBar,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Initialize Modal
// Adjust if your app root is different

const ResourceManagementPage = () => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  // State for Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // State for Selected Module
  const [selectedModule, setSelectedModule] = useState<string>(
    "Inventory Management"
  );

  // ---------- 1. Inventory Management ----------
  interface InventoryItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    minimumStock: number;
  }

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Fertilizer A",
      category: "Fertilizers",
      quantity: 100,
      minimumStock: 50,
    },
    {
      id: 2,
      name: "Seed B",
      category: "Seeds",
      quantity: 200,
      minimumStock: 100,
    },
  ]);

  const [addInventoryModalOpen, setAddInventoryModalOpen] =
    useState<boolean>(false);
  const [newInventory, setNewInventory] = useState<{
    name: string;
    category: string;
    quantity: number;
    minimumStock: number;
  }>({
    name: "",
    category: "",
    quantity: 0,
    minimumStock: 0,
  });

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    const item: InventoryItem = {
      id: Date.now(),
      name: newInventory.name,
      category: newInventory.category,
      quantity: newInventory.quantity,
      minimumStock: newInventory.minimumStock,
    };
    setInventoryItems([...inventoryItems, item]);
    setAddInventoryModalOpen(false);
    setNewInventory({
      name: "",
      category: "",
      quantity: 0,
      minimumStock: 0,
    });
  };

  // ---------- 2. Equipment and Asset Tracking ----------
  interface Equipment {
    id: number;
    name: string;
    purchaseDate: string;
    cost: number;
    condition: string;
    usageHours: number;
    location: string;
  }

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: 1,
      name: "Tractor Model X",
      purchaseDate: "2022-05-10",
      cost: 50000,
      condition: "Good",
      usageHours: 1200,
      location: "Field A",
    },
    {
      id: 2,
      name: "Sprayer Y",
      purchaseDate: "2023-01-15",
      cost: 15000,
      condition: "Fair",
      usageHours: 800,
      location: "Field B",
    },
  ]);

  const [addEquipmentModalOpen, setAddEquipmentModalOpen] =
    useState<boolean>(false);
  const [newEquipment, setNewEquipment] = useState<{
    name: string;
    purchaseDate: string;
    cost: number;
    condition: string;
    usageHours: number;
    location: string;
  }>({
    name: "",
    purchaseDate: "",
    cost: 0,
    condition: "",
    usageHours: 0,
    location: "",
  });

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    const equipment: Equipment = {
      id: Date.now(),
      name: newEquipment.name,
      purchaseDate: newEquipment.purchaseDate,
      cost: newEquipment.cost,
      condition: newEquipment.condition,
      usageHours: newEquipment.usageHours,
      location: newEquipment.location,
    };
    setEquipmentList([...equipmentList, equipment]);
    setAddEquipmentModalOpen(false);
    setNewEquipment({
      name: "",
      purchaseDate: "",
      cost: 0,
      condition: "",
      usageHours: 0,
      location: "",
    });
  };

  // ---------- 3. Procurement and Purchasing ----------
  interface PurchaseOrder {
    id: number;
    supplierName: string;
    item: string;
    quantity: number;
    orderDate: string;
    status: string;
    budgetAllocated: number;
  }

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: 1,
      supplierName: "Supplier A",
      item: "Fertilizer A",
      quantity: 50,
      orderDate: "2025-01-10",
      status: "Pending",
      budgetAllocated: 2500,
    },
    {
      id: 2,
      supplierName: "Supplier B",
      item: "Seed B",
      quantity: 100,
      orderDate: "2025-01-12",
      status: "Approved",
      budgetAllocated: 5000,
    },
  ]);

  const [addPurchaseOrderModalOpen, setAddPurchaseOrderModalOpen] =
    useState<boolean>(false);
  const [newPurchaseOrder, setNewPurchaseOrder] = useState<{
    supplierName: string;
    item: string;
    quantity: number;
    orderDate: string;
    status: string;
    budgetAllocated: number;
  }>({
    supplierName: "",
    item: "",
    quantity: 0,
    orderDate: "",
    status: "",
    budgetAllocated: 0,
  });

  const handleAddPurchaseOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const po: PurchaseOrder = {
      id: Date.now(),
      supplierName: newPurchaseOrder.supplierName,
      item: newPurchaseOrder.item,
      quantity: newPurchaseOrder.quantity,
      orderDate: newPurchaseOrder.orderDate,
      status: newPurchaseOrder.status,
      budgetAllocated: newPurchaseOrder.budgetAllocated,
    };
    setPurchaseOrders([...purchaseOrders, po]);
    setAddPurchaseOrderModalOpen(false);
    setNewPurchaseOrder({
      supplierName: "",
      item: "",
      quantity: 0,
      orderDate: "",
      status: "",
      budgetAllocated: 0,
    });
  };

  // ---------- 4. Maintenance Scheduling and Management ----------
  interface MaintenanceLog {
    id: number;
    equipmentName: string;
    maintenanceDate: string;
    tasksPerformed: string;
    cost: number;
  }

  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([
    {
      id: 1,
      equipmentName: "Tractor Model X",
      maintenanceDate: "2025-01-15",
      tasksPerformed: "Oil change and filter replacement",
      cost: 300,
    },
    {
      id: 2,
      equipmentName: "Sprayer Y",
      maintenanceDate: "2025-01-20",
      tasksPerformed: "Nozzle cleaning and calibration",
      cost: 150,
    },
  ]);

  const [addMaintenanceModalOpen, setAddMaintenanceModalOpen] =
    useState<boolean>(false);
  const [newMaintenance, setNewMaintenance] = useState<{
    equipmentName: string;
    maintenanceDate: string;
    tasksPerformed: string;
    cost: number;
  }>({
    equipmentName: "",
    maintenanceDate: "",
    tasksPerformed: "",
    cost: 0,
  });

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    const log: MaintenanceLog = {
      id: Date.now(),
      equipmentName: newMaintenance.equipmentName,
      maintenanceDate: newMaintenance.maintenanceDate,
      tasksPerformed: newMaintenance.tasksPerformed,
      cost: newMaintenance.cost,
    };
    setMaintenanceLogs([...maintenanceLogs, log]);
    setAddMaintenanceModalOpen(false);
    setNewMaintenance({
      equipmentName: "",
      maintenanceDate: "",
      tasksPerformed: "",
      cost: 0,
    });
  };

  // ---------- 5. Resource Allocation and Scheduling ----------
  interface ResourceAllocation {
    id: number;
    resourceName: string;
    projectName: string;
    allocatedTo: string;
    allocationDate: string;
    status: string;
  }

  const [resourceAllocations, setResourceAllocations] = useState<
    ResourceAllocation[]
  >([
    {
      id: 1,
      resourceName: "Tractor Model X",
      projectName: "Project Alpha",
      allocatedTo: "John Doe",
      allocationDate: "2025-01-18",
      status: "Active",
    },
    {
      id: 2,
      resourceName: "Fertilizer A",
      projectName: "Project Beta",
      allocatedTo: "Jane Smith",
      allocationDate: "2025-01-19",
      status: "Pending",
    },
  ]);

  const [addAllocationModalOpen, setAddAllocationModalOpen] =
    useState<boolean>(false);
  const [newAllocation, setNewAllocation] = useState<{
    resourceName: string;
    projectName: string;
    allocatedTo: string;
    allocationDate: string;
    status: string;
  }>({
    resourceName: "",
    projectName: "",
    allocatedTo: "",
    allocationDate: "",
    status: "",
  });

  const handleAddAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const allocation: ResourceAllocation = {
      id: Date.now(),
      resourceName: newAllocation.resourceName,
      projectName: newAllocation.projectName,
      allocatedTo: newAllocation.allocatedTo,
      allocationDate: newAllocation.allocationDate,
      status: newAllocation.status,
    };
    setResourceAllocations([...resourceAllocations, allocation]);
    setAddAllocationModalOpen(false);
    setNewAllocation({
      resourceName: "",
      projectName: "",
      allocatedTo: "",
      allocationDate: "",
      status: "",
    });
  };

  // ---------- 6. Supplier and Vendor Management ----------
  interface Supplier {
    id: number;
    name: string;
    contactInfo: string;
    rating: number;
    contractDetails: string;
  }

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "Supplier A",
      contactInfo: "contactA@example.com",
      rating: 4.5,
      contractDetails: "Contract signed on 2023-01-01, expires on 2025-01-01",
    },
    {
      id: 2,
      name: "Supplier B",
      contactInfo: "contactB@example.com",
      rating: 4.0,
      contractDetails: "Contract signed on 2022-06-15, expires on 2024-06-15",
    },
  ]);

  const [addSupplierModalOpen, setAddSupplierModalOpen] =
    useState<boolean>(false);
  const [newSupplier, setNewSupplier] = useState<{
    name: string;
    contactInfo: string;
    rating: number;
    contractDetails: string;
  }>({
    name: "",
    contactInfo: "",
    rating: 0,
    contractDetails: "",
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier: Supplier = {
      id: Date.now(),
      name: newSupplier.name,
      contactInfo: newSupplier.contactInfo,
      rating: newSupplier.rating,
      contractDetails: newSupplier.contractDetails,
    };
    setSuppliers([...suppliers, supplier]);
    setAddSupplierModalOpen(false);
    setNewSupplier({
      name: "",
      contactInfo: "",
      rating: 0,
      contractDetails: "",
    });
  };

  // ---------- 7. Reporting and Analytics ----------
  interface Report {
    id: number;
    title: string;
    description: string;
    dateCreated: string;
  }

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Inventory Report January",
      description: "Detailed inventory levels and reorder alerts for January.",
      dateCreated: "2025-01-31",
    },
    {
      id: 2,
      title: "Maintenance Report Q1",
      description: "Summary of maintenance activities and costs for Q1.",
      dateCreated: "2025-03-31",
    },
  ]);

  const [addReportModalOpen, setAddReportModalOpen] = useState<boolean>(false);
  const [newReport, setNewReport] = useState<{
    title: string;
    description: string;
    dateCreated: string;
  }>({
    title: "",
    description: "",
    dateCreated: "",
  });

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    const report: Report = {
      id: Date.now(),
      title: newReport.title,
      description: newReport.description,
      dateCreated: newReport.dateCreated,
    };
    setReports([...reports, report]);
    setAddReportModalOpen(false);
    setNewReport({
      title: "",
      description: "",
      dateCreated: "",
    });
  };

  // ---------- Notifications and Alerts ----------
  interface Notification {
    id: number;
    type: string;
    message: string;
    date: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "Alert",
      message: "Low stock alert: Fertilizer A below minimum levels.",
      date: "2025-01-10",
    },
    {
      id: 2,
      type: "Reminder",
      message: "Upcoming maintenance for Tractor Model X on 2025-01-20.",
      date: "2025-01-12",
    },
  ]);

  // ---------- Render Module Function ----------
  const renderModule = () => {
    switch (selectedModule) {
      case "Inventory Management":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Inventory Management</h2>
            <button
              onClick={() => setAddInventoryModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Inventory Item
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Category</th>
                    <th className="py-2 px-4 border">Quantity</th>
                    <th className="py-2 px-4 border">Minimum Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className="py-2 px-4 border">{item.name}</td>
                      <td className="py-2 px-4 border">{item.category}</td>
                      <td className="py-2 px-4 border">{item.quantity}</td>
                      <td className="py-2 px-4 border">{item.minimumStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Inventory Modal */}
            <Modal
              isOpen={addInventoryModalOpen}
              onRequestClose={() => setAddInventoryModalOpen(false)}
              contentLabel="Add Inventory Item"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">
                Add New Inventory Item
              </h3>
              <form onSubmit={handleAddInventory} className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={newInventory.name}
                    onChange={(e) =>
                      setNewInventory({ ...newInventory, name: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Category</label>
                  <input
                    type="text"
                    value={newInventory.category}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        category: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={newInventory.quantity}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block mb-1">Minimum Stock</label>
                  <input
                    type="number"
                    value={newInventory.minimumStock}
                    onChange={(e) =>
                      setNewInventory({
                        ...newInventory,
                        minimumStock: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddInventoryModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Equipment and Asset Tracking":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Equipment and Asset Tracking</h2>
            <button
              onClick={() => setAddEquipmentModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Equipment
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Purchase Date</th>
                    <th className="py-2 px-4 border">Cost</th>
                    <th className="py-2 px-4 border">Condition</th>
                    <th className="py-2 px-4 border">Usage Hours</th>
                    <th className="py-2 px-4 border">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.map((eq) => (
                    <tr key={eq.id} className="text-center">
                      <td className="py-2 px-4 border">{eq.name}</td>
                      <td className="py-2 px-4 border">{eq.purchaseDate}</td>
                      <td className="py-2 px-4 border">
                        ${eq.cost.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border">{eq.condition}</td>
                      <td className="py-2 px-4 border">{eq.usageHours}</td>
                      <td className="py-2 px-4 border">{eq.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Equipment Modal */}
            <Modal
              isOpen={addEquipmentModalOpen}
              onRequestClose={() => setAddEquipmentModalOpen(false)}
              contentLabel="Add Equipment"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Equipment</h3>
              <form onSubmit={handleAddEquipment} className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={newEquipment.name}
                    onChange={(e) =>
                      setNewEquipment({ ...newEquipment, name: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Purchase Date</label>
                  <input
                    type="date"
                    value={newEquipment.purchaseDate}
                    onChange={(e) =>
                      setNewEquipment({
                        ...newEquipment,
                        purchaseDate: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Cost</label>
                  <input
                    type="number"
                    value={newEquipment.cost}
                    onChange={(e) =>
                      setNewEquipment({
                        ...newEquipment,
                        cost: parseFloat(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block mb-1">Condition</label>
                  <select
                    value={newEquipment.condition}
                    onChange={(e) =>
                      setNewEquipment({
                        ...newEquipment,
                        condition: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Usage Hours</label>
                  <input
                    type="number"
                    value={newEquipment.usageHours}
                    onChange={(e) =>
                      setNewEquipment({
                        ...newEquipment,
                        usageHours: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block mb-1">Location</label>
                  <input
                    type="text"
                    value={newEquipment.location}
                    onChange={(e) =>
                      setNewEquipment({
                        ...newEquipment,
                        location: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddEquipmentModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Procurement and Purchasing":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Procurement and Purchasing</h2>
            <button
              onClick={() => setAddPurchaseOrderModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Purchase Order
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Supplier Name</th>
                    <th className="py-2 px-4 border">Item</th>
                    <th className="py-2 px-4 border">Quantity</th>
                    <th className="py-2 px-4 border">Order Date</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Budget Allocated</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((po) => (
                    <tr key={po.id} className="text-center">
                      <td className="py-2 px-4 border">{po.supplierName}</td>
                      <td className="py-2 px-4 border">{po.item}</td>
                      <td className="py-2 px-4 border">{po.quantity}</td>
                      <td className="py-2 px-4 border">{po.orderDate}</td>
                      <td className="py-2 px-4 border">{po.status}</td>
                      <td className="py-2 px-4 border">
                        ${po.budgetAllocated.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Purchase Order Modal */}
            <Modal
              isOpen={addPurchaseOrderModalOpen}
              onRequestClose={() => setAddPurchaseOrderModalOpen(false)}
              contentLabel="Create Purchase Order"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">
                Create New Purchase Order
              </h3>
              <form onSubmit={handleAddPurchaseOrder} className="space-y-4">
                <div>
                  <label className="block mb-1">Supplier Name</label>
                  <input
                    type="text"
                    value={newPurchaseOrder.supplierName}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        supplierName: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Item</label>
                  <input
                    type="text"
                    value={newPurchaseOrder.item}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        item: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={newPurchaseOrder.quantity}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={1}
                  />
                </div>
                <div>
                  <label className="block mb-1">Order Date</label>
                  <input
                    type="date"
                    value={newPurchaseOrder.orderDate}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        orderDate: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    value={newPurchaseOrder.status}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        status: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Received">Received</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Budget Allocated</label>
                  <input
                    type="number"
                    value={newPurchaseOrder.budgetAllocated}
                    onChange={(e) =>
                      setNewPurchaseOrder({
                        ...newPurchaseOrder,
                        budgetAllocated: parseFloat(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddPurchaseOrderModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Maintenance Scheduling and Management":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Maintenance Scheduling and Management
            </h2>
            <button
              onClick={() => setAddMaintenanceModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Maintenance Log
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Equipment Name</th>
                    <th className="py-2 px-4 border">Maintenance Date</th>
                    <th className="py-2 px-4 border">Tasks Performed</th>
                    <th className="py-2 px-4 border">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceLogs.map((log) => (
                    <tr key={log.id} className="text-center">
                      <td className="py-2 px-4 border">{log.equipmentName}</td>
                      <td className="py-2 px-4 border">
                        {log.maintenanceDate}
                      </td>
                      <td className="py-2 px-4 border">{log.tasksPerformed}</td>
                      <td className="py-2 px-4 border">
                        ${log.cost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Maintenance Modal */}
            <Modal
              isOpen={addMaintenanceModalOpen}
              onRequestClose={() => setAddMaintenanceModalOpen(false)}
              contentLabel="Add Maintenance Log"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">
                Add New Maintenance Log
              </h3>
              <form onSubmit={handleAddMaintenance} className="space-y-4">
                <div>
                  <label className="block mb-1">Equipment Name</label>
                  <input
                    type="text"
                    value={newMaintenance.equipmentName}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        equipmentName: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Maintenance Date</label>
                  <input
                    type="date"
                    value={newMaintenance.maintenanceDate}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        maintenanceDate: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Tasks Performed</label>
                  <textarea
                    value={newMaintenance.tasksPerformed}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        tasksPerformed: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-1">Cost</label>
                  <input
                    type="number"
                    value={newMaintenance.cost}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        cost: parseFloat(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMaintenanceModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Resource Allocation and Scheduling":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Resource Allocation and Scheduling
            </h2>
            <button
              onClick={() => setAddAllocationModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Allocate Resource
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Resource Name</th>
                    <th className="py-2 px-4 border">Project Name</th>
                    <th className="py-2 px-4 border">Allocated To</th>
                    <th className="py-2 px-4 border">Allocation Date</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceAllocations.map((alloc) => (
                    <tr key={alloc.id} className="text-center">
                      <td className="py-2 px-4 border">{alloc.resourceName}</td>
                      <td className="py-2 px-4 border">{alloc.projectName}</td>
                      <td className="py-2 px-4 border">{alloc.allocatedTo}</td>
                      <td className="py-2 px-4 border">
                        {alloc.allocationDate}
                      </td>
                      <td className="py-2 px-4 border">{alloc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Allocation Modal */}
            <Modal
              isOpen={addAllocationModalOpen}
              onRequestClose={() => setAddAllocationModalOpen(false)}
              contentLabel="Allocate Resource"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">Allocate Resource</h3>
              <form onSubmit={handleAddAllocation} className="space-y-4">
                <div>
                  <label className="block mb-1">Resource Name</label>
                  <input
                    type="text"
                    value={newAllocation.resourceName}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        resourceName: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newAllocation.projectName}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        projectName: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Allocated To</label>
                  <input
                    type="text"
                    value={newAllocation.allocatedTo}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        allocatedTo: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Allocation Date</label>
                  <input
                    type="date"
                    value={newAllocation.allocationDate}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        allocationDate: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    value={newAllocation.status}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        status: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Allocate
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddAllocationModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Supplier and Vendor Management":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Supplier and Vendor Management
            </h2>
            <button
              onClick={() => setAddSupplierModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Supplier
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Contact Info</th>
                    <th className="py-2 px-4 border">Rating</th>
                    <th className="py-2 px-4 border">Contract Details</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="text-center">
                      <td className="py-2 px-4 border">{supplier.name}</td>
                      <td className="py-2 px-4 border">
                        {supplier.contactInfo}
                      </td>
                      <td className="py-2 px-4 border">{supplier.rating}</td>
                      <td className="py-2 px-4 border">
                        {supplier.contractDetails}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Supplier Modal */}
            <Modal
              isOpen={addSupplierModalOpen}
              onRequestClose={() => setAddSupplierModalOpen(false)}
              contentLabel="Add Supplier"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Supplier</h3>
              <form onSubmit={handleAddSupplier} className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, name: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Contact Info</label>
                  <input
                    type="text"
                    value={newSupplier.contactInfo}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        contactInfo: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Rating</label>
                  <input
                    type="number"
                    value={newSupplier.rating}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    min={1}
                    max={5}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="block mb-1">Contract Details</label>
                  <textarea
                    value={newSupplier.contractDetails}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        contractDetails: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddSupplierModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Reporting and Analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Reporting and Analytics</h2>
            <button
              onClick={() => setAddReportModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Generate Report
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Title</th>
                    <th className="py-2 px-4 border">Description</th>
                    <th className="py-2 px-4 border">Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="text-center">
                      <td className="py-2 px-4 border">{report.title}</td>
                      <td className="py-2 px-4 border">{report.description}</td>
                      <td className="py-2 px-4 border">{report.dateCreated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Report Modal */}
            <Modal
              isOpen={addReportModalOpen}
              onRequestClose={() => setAddReportModalOpen(false)}
              contentLabel="Generate Report"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">
                Generate New Report
              </h3>
              <form onSubmit={handleAddReport} className="space-y-4">
                <div>
                  <label className="block mb-1">Title</label>
                  <input
                    type="text"
                    value={newReport.title}
                    onChange={(e) =>
                      setNewReport({ ...newReport, title: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Description</label>
                  <textarea
                    value={newReport.description}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        description: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-1">Date Created</label>
                  <input
                    type="date"
                    value={newReport.dateCreated}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        dateCreated: e.target.value,
                      })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Generate
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddReportModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      default:
        return <div>Select a module from the navigation bar.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-green-600 shadow-md">
        <div className="flex items-center">
          {/* Logo or Icon (Optional) */}
          {/* <FaBoxes className="text-white mr-2" size={24} /> */}
          {/* Title Removed as per request */}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          {[
            { name: "Inventory Management", icon: <FaBoxes /> },
            { name: "Equipment and Asset Tracking", icon: <FaTools /> },
            { name: "Procurement and Purchasing", icon: <FaShoppingCart /> },
            {
              name: "Maintenance Scheduling and Management",
              icon: <FaWrench />,
            },
            {
              name: "Resource Allocation and Scheduling",
              icon: <FaCalendarAlt />,
            },
            { name: "Supplier and Vendor Management", icon: <FaTruck /> },
            { name: "Reporting and Analytics", icon: <FaChartBar /> },
          ].map((module) => (
            <button
              key={module.name}
              onClick={() => setSelectedModule(module.name)}
              className={`flex items-center px-3 py-2 rounded-md hover:bg-green-700 transition-colors ${
                selectedModule === module.name
                  ? "bg-green-700 font-semibold"
                  : ""
              }`}
            >
              {module.icon}
              <span className="ml-2">{module.name}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-green-600 shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            {[
              { name: "Inventory Management", icon: <FaBoxes /> },
              { name: "Equipment and Asset Tracking", icon: <FaTools /> },
              { name: "Procurement and Purchasing", icon: <FaShoppingCart /> },
              {
                name: "Maintenance Scheduling and Management",
                icon: <FaWrench />,
              },
              {
                name: "Resource Allocation and Scheduling",
                icon: <FaCalendarAlt />,
              },
              { name: "Supplier and Vendor Management", icon: <FaTruck /> },
              { name: "Reporting and Analytics", icon: <FaChartBar /> },
            ].map((module) => (
              <button
                key={module.name}
                onClick={() => {
                  setSelectedModule(module.name);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center px-3 py-2 rounded-md hover:bg-green-700 transition-colors ${
                  selectedModule === module.name
                    ? "bg-green-700 font-semibold"
                    : ""
                }`}
              >
                {module.icon}
                <span className="ml-2">{module.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {renderModule()}
      </main>

      {/* Notifications Sidebar (Optional) */}
      {/* You can implement a notifications sidebar or dropdown similar to the Labor Management Module */}
    </div>
  );
};

export default ResourceManagementPage;

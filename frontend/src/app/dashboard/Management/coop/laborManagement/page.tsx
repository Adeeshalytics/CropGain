// src/app/dashboard/Management/laborManagement/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  FaTasks,
  FaClock,
  FaMoneyBill,
  FaChartLine,
  FaUser,
  FaFileAlt,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Initialize Modal
// Adjust if your app root is different

const LaborManagementPage = () => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  // State for Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // State for Selected Module
  const [selectedModule, setSelectedModule] = useState<string>(
    "Labor Scheduling and Planning"
  );

  // ---------- 1. Labor Scheduling and Planning ----------
  interface Task {
    id: number;
    description: string;
    assignedTo: string;
    shift: string;
    date: Date;
  }

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: "Planting Tea",
      assignedTo: "John Doe",
      shift: "Morning",
      date: new Date(),
    },
    {
      id: 2,
      description: "Harvesting Leaves",
      assignedTo: "Jane Smith",
      shift: "Afternoon",
      date: new Date(),
    },
  ]);

  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{
    description: string;
    assignedTo: string;
    shift: string;
    date: Date | null;
  }>({
    description: "",
    assignedTo: "",
    shift: "",
    date: null,
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newTask.description &&
      newTask.assignedTo &&
      newTask.shift &&
      newTask.date
    ) {
      const task: Task = {
        id: Date.now(),
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        shift: newTask.shift,
        date: newTask.date,
      };
      setTasks([...tasks, task]);
      setTaskModalOpen(false);
      setNewTask({
        description: "",
        assignedTo: "",
        shift: "",
        date: null,
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // ---------- 2. Attendance and Time Tracking ----------
  interface AttendanceRecord {
    id: number;
    laborerName: string;
    date: string;
    checkIn: string;
    checkOut: string;
    overtime: boolean;
  }

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      id: 1,
      laborerName: "Jane Smith",
      date: "2025-01-03",
      checkIn: "08:00",
      checkOut: "17:00",
      overtime: false,
    },
    {
      id: 2,
      laborerName: "John Doe",
      date: "2025-01-04",
      checkIn: "09:00",
      checkOut: "19:00",
      overtime: true,
    },
  ]);

  // ---------- 3. Payroll and Compensation ----------
  interface PayrollRecord {
    id: number;
    laborerName: string;
    baseSalary: number;
    overtimePay: number;
    deductions: number;
    netPay: number;
    paymentDate: string;
  }

  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([
    {
      id: 1,
      laborerName: "John Doe",
      baseSalary: 2000,
      overtimePay: 200,
      deductions: 150,
      netPay: 2050,
      paymentDate: "2025-01-31",
    },
    {
      id: 2,
      laborerName: "Jane Smith",
      baseSalary: 2200,
      overtimePay: 300,
      deductions: 200,
      netPay: 2300,
      paymentDate: "2025-01-31",
    },
  ]);

  // ---------- 4. Labor Performance Tracking ----------
  interface PerformanceRecord {
    id: number;
    laborerName: string;
    taskCompleted: number;
    efficiency: number;
    feedback: string;
    goals: string;
  }

  const [performanceRecords, setPerformanceRecords] = useState<
    PerformanceRecord[]
  >([
    {
      id: 1,
      laborerName: "Jane Smith",
      taskCompleted: 15,
      efficiency: 90,
      feedback: "Excellent work on the recent harvest.",
      goals: "Increase task completion by 10% next month.",
    },
    {
      id: 2,
      laborerName: "John Doe",
      taskCompleted: 12,
      efficiency: 85,
      feedback: "Good performance, but needs to improve time management.",
      goals: "Attend time management workshop.",
    },
  ]);

  // ---------- 5. Labor Records Management ----------
  interface LaborerProfile {
    id: number;
    name: string;
    contact: string;
    position: string;
    documents: string[]; // URLs or file names
  }

  const [laborerProfiles, setLaborerProfiles] = useState<LaborerProfile[]>([
    {
      id: 1,
      name: "John Doe",
      contact: "john.doe@example.com",
      position: "Field Worker",
      documents: ["Contract_JD.pdf", "Certification_JD.pdf"],
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "jane.smith@example.com",
      position: "Supervisor",
      documents: ["Contract_JS.pdf", "Certification_JS.pdf"],
    },
  ]);

  const [addLaborerModalOpen, setAddLaborerModalOpen] =
    useState<boolean>(false);
  const [newLaborer, setNewLaborer] = useState<{
    name: string;
    contact: string;
    position: string;
    documents: FileList | null;
  }>({
    name: "",
    contact: "",
    position: "",
    documents: null,
  });

  const handleAddLaborer = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newLaborer.name &&
      newLaborer.contact &&
      newLaborer.position &&
      newLaborer.documents
    ) {
      // Convert FileList to array of file names (dummy implementation)
      const docs = Array.from(newLaborer.documents).map((file) => file.name);

      const laborer: LaborerProfile = {
        id: Date.now(),
        name: newLaborer.name,
        contact: newLaborer.contact,
        position: newLaborer.position,
        documents: docs,
      };
      setLaborerProfiles([...laborerProfiles, laborer]);
      setAddLaborerModalOpen(false);
      setNewLaborer({
        name: "",
        contact: "",
        position: "",
        documents: null,
      });
    } else {
      alert("Please fill in all fields and upload at least one document.");
    }
  };

  // ---------- 6. Reporting and Analytics ----------
  // Placeholder for reporting functionalities

  // ---------- 7. Notifications and Alerts ----------
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
      message: "Overtime approval needed for John Doe.",
      date: "2025-01-05",
    },
    {
      id: 2,
      type: "Reminder",
      message: "Submit payroll reports by end of the week.",
      date: "2025-01-06",
    },
  ]);

  // ---------- Render Module Function ----------
  const renderModule = () => {
    switch (selectedModule) {
      case "Labor Scheduling and Planning":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Labor Scheduling and Planning
            </h2>
            <button
              onClick={() => setTaskModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Task
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Description</th>
                    <th className="py-2 px-4 border">Assigned To</th>
                    <th className="py-2 px-4 border">Shift</th>
                    <th className="py-2 px-4 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="text-center">
                      <td className="py-2 px-4 border">{task.description}</td>
                      <td className="py-2 px-4 border">{task.assignedTo}</td>
                      <td className="py-2 px-4 border">{task.shift}</td>
                      <td className="py-2 px-4 border">
                        {task.date.toDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Task Modal */}
            <Modal
              isOpen={taskModalOpen}
              onRequestClose={() => setTaskModalOpen(false)}
              contentLabel="Add Task"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
              <form onSubmit={addTask} className="space-y-4">
                <div>
                  <label className="block mb-1">Description</label>
                  <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Assigned To</label>
                  <input
                    type="text"
                    value={newTask.assignedTo}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assignedTo: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Shift</label>
                  <select
                    value={newTask.shift}
                    onChange={(e) =>
                      setNewTask({ ...newTask, shift: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Date</label>
                  <Calendar
                    onChange={(date: Date) => setNewTask({ ...newTask, date })}
                    value={newTask.date}
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
                    onClick={() => setTaskModalOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      case "Attendance and Time Tracking":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Attendance and Time Tracking</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Laborer Name</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Check-In</th>
                    <th className="py-2 px-4 border">Check-Out</th>
                    <th className="py-2 px-4 border">Overtime</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id} className="text-center">
                      <td className="py-2 px-4 border">{record.laborerName}</td>
                      <td className="py-2 px-4 border">{record.date}</td>
                      <td className="py-2 px-4 border">{record.checkIn}</td>
                      <td className="py-2 px-4 border">{record.checkOut}</td>
                      <td className="py-2 px-4 border">
                        {record.overtime ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Payroll and Compensation":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Payroll and Compensation</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Laborer Name</th>
                    <th className="py-2 px-4 border">Base Salary</th>
                    <th className="py-2 px-4 border">Overtime Pay</th>
                    <th className="py-2 px-4 border">Deductions</th>
                    <th className="py-2 px-4 border">Net Pay</th>
                    <th className="py-2 px-4 border">Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollRecords.map((payroll) => (
                    <tr key={payroll.id} className="text-center">
                      <td className="py-2 px-4 border">
                        {payroll.laborerName}
                      </td>
                      <td className="py-2 px-4 border">
                        ${payroll.baseSalary.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border">
                        ${payroll.overtimePay.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border">
                        ${payroll.deductions.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border">
                        ${payroll.netPay.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border">
                        {payroll.paymentDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Labor Performance Tracking":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Labor Performance Tracking</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Laborer Name</th>
                    <th className="py-2 px-4 border">Tasks Completed</th>
                    <th className="py-2 px-4 border">Efficiency (%)</th>
                    <th className="py-2 px-4 border">Feedback</th>
                    <th className="py-2 px-4 border">Goals</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceRecords.map((record) => (
                    <tr key={record.id} className="text-center">
                      <td className="py-2 px-4 border">{record.laborerName}</td>
                      <td className="py-2 px-4 border">
                        {record.taskCompleted}
                      </td>
                      <td className="py-2 px-4 border">{record.efficiency}</td>
                      <td className="py-2 px-4 border">{record.feedback}</td>
                      <td className="py-2 px-4 border">{record.goals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Labor Records Management":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Labor Records Management</h2>
            <button
              onClick={() => setAddLaborerModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Laborer
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Contact</th>
                    <th className="py-2 px-4 border">Position</th>
                    <th className="py-2 px-4 border">Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {laborerProfiles.map((profile) => (
                    <tr key={profile.id} className="text-center">
                      <td className="py-2 px-4 border">{profile.name}</td>
                      <td className="py-2 px-4 border">{profile.contact}</td>
                      <td className="py-2 px-4 border">{profile.position}</td>
                      <td className="py-2 px-4 border">
                        {profile.documents.map((doc, index) => (
                          <span
                            key={index}
                            className="block text-blue-600 hover:underline"
                          >
                            {doc}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Laborer Modal */}
            <Modal
              isOpen={addLaborerModalOpen}
              onRequestClose={() => setAddLaborerModalOpen(false)}
              contentLabel="Add Laborer"
              className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-lg overflow-auto max-h-[90vh]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Laborer</h3>
              <form onSubmit={handleAddLaborer} className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={newLaborer.name}
                    onChange={(e) =>
                      setNewLaborer({ ...newLaborer, name: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Contact</label>
                  <input
                    type="email"
                    value={newLaborer.contact}
                    onChange={(e) =>
                      setNewLaborer({ ...newLaborer, contact: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Position</label>
                  <input
                    type="text"
                    value={newLaborer.position}
                    onChange={(e) =>
                      setNewLaborer({ ...newLaborer, position: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Documents</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      setNewLaborer({
                        ...newLaborer,
                        documents: e.target.files,
                      })
                    }
                    required
                    className="w-full"
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
                    onClick={() => setAddLaborerModalOpen(false)}
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
            <p className="text-gray-700">
              Reporting functionalities will be implemented here.
            </p>
          </div>
        );
      case "Notifications and Alerts":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications and Alerts</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded ${
                    notification.type === "Alert"
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p
                      className={`font-semibold ${
                        notification.type === "Alert"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {notification.type}
                    </p>
                    <span className="text-sm text-gray-500">
                      {notification.date}
                    </span>
                  </div>
                  <p className="text-gray-700">{notification.message}</p>
                </div>
              ))}
              {notifications.length === 0 && <p>No notifications available.</p>}
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
      <header className="flex items-center justify-between p-4 bg-green-600 shadow-md">
        <div className="flex items-center">
          {/* Logo or Icon (Optional) */}
          {/* <FaUser className="text-white mr-2" size={24} /> */}
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
            { name: "Labor Scheduling and Planning", icon: <FaTasks /> },
            { name: "Attendance and Time Tracking", icon: <FaClock /> },
            { name: "Payroll and Compensation", icon: <FaMoneyBill /> },
            { name: "Labor Performance Tracking", icon: <FaChartLine /> },
            { name: "Labor Records Management", icon: <FaUser /> },
            { name: "Reporting and Analytics", icon: <FaFileAlt /> },
            { name: "Notifications and Alerts", icon: <FaBell /> },
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
              { name: "Labor Scheduling and Planning", icon: <FaTasks /> },
              { name: "Attendance and Time Tracking", icon: <FaClock /> },
              { name: "Payroll and Compensation", icon: <FaMoneyBill /> },
              { name: "Labor Performance Tracking", icon: <FaChartLine /> },
              { name: "Labor Records Management", icon: <FaUser /> },
              { name: "Reporting and Analytics", icon: <FaFileAlt /> },
              { name: "Notifications and Alerts", icon: <FaBell /> },
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
    </div>
  );
};

export default LaborManagementPage;

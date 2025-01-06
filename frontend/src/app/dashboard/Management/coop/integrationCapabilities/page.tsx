// src/app/dashboard/Management/integrationCapabilities/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  FaCloudSun,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaCog,
  FaBell,
  FaBars,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

// Initialize Modal
// Adjust if your app root is different

const IntegrationCapabilitiesPage = () => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  // State for Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // State for Selected Sub-Module
  const [selectedSubModule, setSelectedSubModule] = useState<string>(
    "Third-Party Services"
  );

  // ---------- 1. Third-Party Services ----------
  interface ThirdPartyService {
    id: number;
    name: string;
    status: string;
    details: string;
  }

  const [thirdPartyServices, setThirdPartyServices] = useState<
    ThirdPartyService[]
  >([
    {
      id: 1,
      name: "Weather API",
      status: "Connected",
      details: "Weather data integrated successfully.",
    },
    {
      id: 2,
      name: "GIS Mapping",
      status: "Disconnected",
      details: "No active connection.",
    },
  ]);

  const [addServiceModalOpen, setAddServiceModalOpen] =
    useState<boolean>(false);
  const [newService, setNewService] = useState<{
    name: string;
    apiKey: string;
    status: string;
    details: string;
  }>({
    name: "",
    apiKey: "",
    status: "Disconnected",
    details: "",
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const service: ThirdPartyService = {
      id: Date.now(),
      name: newService.name,
      status: newService.status,
      details: newService.details,
    };
    setThirdPartyServices([...thirdPartyServices, service]);
    setAddServiceModalOpen(false);
    setNewService({
      name: "",
      apiKey: "",
      status: "Disconnected",
      details: "",
    });
  };

  // ---------- 2. Mobile Access ----------
  interface MobileAccess {
    id: number;
    deviceName: string;
    status: string;
    lastSync: string;
  }

  const [mobileAccessList, setMobileAccessList] = useState<MobileAccess[]>([
    {
      id: 1,
      deviceName: "John's iPhone",
      status: "Active",
      lastSync: "2025-01-04 10:30 AM",
    },
    {
      id: 2,
      deviceName: "Jane's Android",
      status: "Inactive",
      lastSync: "2025-01-02 08:15 AM",
    },
  ]);

  const [addMobileAccessModalOpen, setAddMobileAccessModalOpen] =
    useState<boolean>(false);
  const [newMobileAccess, setNewMobileAccess] = useState<{
    deviceName: string;
    status: string;
    lastSync: string;
  }>({
    deviceName: "",
    status: "Active",
    lastSync: "",
  });

  const handleAddMobileAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const mobileAccess: MobileAccess = {
      id: Date.now(),
      deviceName: newMobileAccess.deviceName,
      status: newMobileAccess.status,
      lastSync: newMobileAccess.lastSync,
    };
    setMobileAccessList([...mobileAccessList, mobileAccess]);
    setAddMobileAccessModalOpen(false);
    setNewMobileAccess({
      deviceName: "",
      status: "Active",
      lastSync: "",
    });
  };

  // ---------- 3. Documentation Management ----------
  interface Documentation {
    id: number;
    title: string;
    link: string;
  }

  const [documentations, setDocumentations] = useState<Documentation[]>([
    {
      id: 1,
      title: "Weather API Integration Guide",
      link: "https://example.com/weather-api-guide",
    },
    {
      id: 2,
      title: "GIS Mapping Configuration",
      link: "https://example.com/gis-mapping-setup",
    },
  ]);

  const [addDocumentationModalOpen, setAddDocumentationModalOpen] =
    useState<boolean>(false);
  const [newDocumentation, setNewDocumentation] = useState<{
    title: string;
    link: string;
  }>({
    title: "",
    link: "",
  });

  const handleAddDocumentation = (e: React.FormEvent) => {
    e.preventDefault();
    const doc: Documentation = {
      id: Date.now(),
      title: newDocumentation.title,
      link: newDocumentation.link,
    };
    setDocumentations([...documentations, doc]);
    setAddDocumentationModalOpen(false);
    setNewDocumentation({
      title: "",
      link: "",
    });
  };

  // ---------- 4. Notifications and Alerts ----------
  interface IntegrationNotification {
    id: number;
    type: string;
    message: string;
    date: string;
  }

  const [integrationNotifications, setIntegrationNotifications] = useState<
    IntegrationNotification[]
  >([
    {
      id: 1,
      type: "Alert",
      message: "Failed to sync Weather API data.",
      date: "2025-01-05",
    },
    {
      id: 2,
      type: "Info",
      message: "GIS Mapping service connected successfully.",
      date: "2025-01-06",
    },
  ]);

  // ---------- Render Integration Capabilities Function ----------
  const renderIntegrationCapabilities = () => {
    return (
      <div className="space-y-8">
        {/* Third-Party Services */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Third-Party Services</h2>
          <button
            onClick={() => setAddServiceModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Service
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Service Name</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Details</th>
                </tr>
              </thead>
              <tbody>
                {thirdPartyServices.map((service) => (
                  <tr key={service.id} className="text-center">
                    <td className="py-2 px-4 border">{service.name}</td>
                    <td className="py-2 px-4 border">{service.status}</td>
                    <td className="py-2 px-4 border">{service.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Access */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Mobile Access</h2>
          <button
            onClick={() => setAddMobileAccessModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Mobile Device
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Device Name</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {mobileAccessList.map((device) => (
                  <tr key={device.id} className="text-center">
                    <td className="py-2 px-4 border">{device.deviceName}</td>
                    <td className="py-2 px-4 border">{device.status}</td>
                    <td className="py-2 px-4 border">{device.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documentation Management */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Documentation Management</h2>
          <button
            onClick={() => setAddDocumentationModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Documentation
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Link</th>
                </tr>
              </thead>
              <tbody>
                {documentations.map((doc) => (
                  <tr key={doc.id} className="text-center">
                    <td className="py-2 px-4 border">{doc.title}</td>
                    <td className="py-2 px-4 border">
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications and Alerts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Notifications and Alerts</h2>
          <div className="space-y-2">
            {integrationNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded ${
                  notification.type === "Alert" ? "bg-red-100" : "bg-yellow-100"
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
            {integrationNotifications.length === 0 && (
              <p>No notifications available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-green-600 shadow-md">
        <div className="flex items-center">
          {/* Logo or Icon (Optional) */}
          {/* <FaCloudSun className="text-white mr-2" size={24} /> */}
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
            { name: "Third-Party Services", icon: <FaCloudSun /> },
            { name: "GIS Mapping", icon: <FaMapMarkedAlt /> },
            { name: "Mobile Access", icon: <FaMobileAlt /> },
            { name: "Documentation Management", icon: <FaCog /> },
            { name: "Notifications and Alerts", icon: <FaBell /> },
          ].map((subModule) => (
            <button
              key={subModule.name}
              onClick={() => setSelectedSubModule(subModule.name)}
              className={`flex items-center px-3 py-2 rounded-md hover:bg-green-700 transition-colors ${
                selectedSubModule === subModule.name
                  ? "bg-green-700 font-semibold"
                  : ""
              }`}
            >
              {subModule.icon}
              <span className="ml-2">{subModule.name}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-green-600 shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            {[
              { name: "Third-Party Services", icon: <FaCloudSun /> },
              { name: "GIS Mapping", icon: <FaMapMarkedAlt /> },
              { name: "Mobile Access", icon: <FaMobileAlt /> },
              { name: "Documentation Management", icon: <FaCog /> },
              { name: "Notifications and Alerts", icon: <FaBell /> },
            ].map((subModule) => (
              <button
                key={subModule.name}
                onClick={() => {
                  setSelectedSubModule(subModule.name);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center px-3 py-2 rounded-md hover:bg-green-700 transition-colors ${
                  selectedSubModule === subModule.name
                    ? "bg-green-700 font-semibold"
                    : ""
                }`}
              >
                {subModule.icon}
                <span className="ml-2">{subModule.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {renderIntegrationCapabilities()}
      </main>
    </div>
  );
};

export default IntegrationCapabilitiesPage;

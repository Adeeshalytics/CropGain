"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar"; // Ensure to install react-calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { Line } from "react-chartjs-2"; // For charts
import "chart.js/auto"; // Required for Chart.js
import Modal from "react-modal"; // For photo viewing

const PlantingGrowthTracking = () => {
  const [showForm, setShowForm] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date on calendar
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [currentPhoto, setCurrentPhoto] = useState(null); // Currently viewed photo
  const [editingRecord, setEditingRecord] = useState(null); // Record being edited

  const [plantingRecords, setPlantingRecords] = useState([
    // Extended Dummy Data
    {
      id: 1,
      cropType: "Tea",
      section: "Section A",
      plantingDate: "2025-01-15",
      numberOfPlants: 200,
      growthStage: "Vegetative",
      healthStatus: "Healthy",
      growthMetrics: { days: 30, height: 15 },
      photos: [
        {
          url: "https://via.placeholder.com/150",
          date: "2025-01-20",
        },
      ],
    },
    {
      id: 2,
      cropType: "Coconut",
      section: "Section B",
      plantingDate: "2025-02-10",
      numberOfPlants: 150,
      growthStage: "Germination",
      healthStatus: "At Risk",
      growthMetrics: { days: 10, height: 5 },
      photos: [],
    },
    {
      id: 3,
      cropType: "Mango",
      section: "Section C",
      plantingDate: "2025-03-20",
      numberOfPlants: 180,
      growthStage: "Flowering",
      healthStatus: "Healthy",
      growthMetrics: { days: 45, height: 20 },
      photos: [
        {
          url: "https://via.placeholder.com/150",
          date: "2025-04-05",
        },
        {
          url: "https://via.placeholder.com/150",
          date: "2025-04-15",
        },
      ],
    },
    {
      id: 4,
      cropType: "Cinnamon",
      section: "Section D",
      plantingDate: "2025-04-12",
      numberOfPlants: 120,
      growthStage: "Fruiting",
      healthStatus: "Unhealthy",
      growthMetrics: { days: 60, height: 25 },
      photos: [],
    },
    {
      id: 5,
      cropType: "Banana",
      section: "Section E",
      plantingDate: "2025-05-18",
      numberOfPlants: 250,
      growthStage: "Vegetative",
      healthStatus: "Healthy",
      growthMetrics: { days: 35, height: 18 },
      photos: [
        {
          url: "https://via.placeholder.com/150",
          date: "2025-06-01",
        },
      ],
    },
    {
      id: 6,
      cropType: "Papaya",
      section: "Section F",
      plantingDate: "2025-06-25",
      numberOfPlants: 160,
      growthStage: "Germination",
      healthStatus: "At Risk",
      growthMetrics: { days: 12, height: 6 },
      photos: [],
    },
    {
      id: 7,
      cropType: "Orange",
      section: "Section G",
      plantingDate: "2025-07-14",
      numberOfPlants: 190,
      growthStage: "Flowering",
      healthStatus: "Healthy",
      growthMetrics: { days: 50, height: 22 },
      photos: [
        {
          url: "https://via.placeholder.com/150",
          date: "2025-08-03",
        },
      ],
    },
    {
      id: 8,
      cropType: "Avocado",
      section: "Section H",
      plantingDate: "2025-08-09",
      numberOfPlants: 140,
      growthStage: "Fruiting",
      healthStatus: "Unhealthy",
      growthMetrics: { days: 70, height: 28 },
      photos: [],
    },
    {
      id: 9,
      cropType: "Pineapple",
      section: "Section I",
      plantingDate: "2025-09-21",
      numberOfPlants: 220,
      growthStage: "Vegetative",
      healthStatus: "Healthy",
      growthMetrics: { days: 40, height: 19 },
      photos: [
        {
          url: "https://via.placeholder.com/150",
          date: "2025-10-01",
        },
      ],
    },
    {
      id: 10,
      cropType: "Guava",
      section: "Section J",
      plantingDate: "2025-10-30",
      numberOfPlants: 130,
      growthStage: "Germination",
      healthStatus: "At Risk",
      growthMetrics: { days: 15, height: 7 },
      photos: [],
    },
    // Add more records as needed
  ]);

  const [notifications, setNotifications] = useState([
    // Extended Dummy Notifications
    {
      id: 1,
      type: "Upcoming Planting",
      message: "Planting of Mango in Section C scheduled for 2025-03-20.",
      date: "2025-03-15",
    },
    {
      id: 2,
      type: "Health Alert",
      message:
        "Coconut trees in Section B are showing signs of nutrient deficiency.",
      date: "2025-02-20",
    },
    {
      id: 3,
      type: "Upcoming Harvest",
      message: "Harvest of Tea in Section A scheduled for 2025-04-25.",
      date: "2025-04-20",
    },
    {
      id: 4,
      type: "Health Alert",
      message:
        "Cinnamon plants in Section D are showing signs of pest infestation.",
      date: "2025-05-10",
    },
    {
      id: 5,
      type: "Upcoming Planting",
      message: "Planting of Banana in Section E scheduled for 2025-05-18.",
      date: "2025-05-13",
    },
    {
      id: 6,
      type: "Health Alert",
      message: "Papaya plants in Section F are experiencing water stress.",
      date: "2025-06-15",
    },
    {
      id: 7,
      type: "Upcoming Harvest",
      message: "Harvest of Mango in Section C scheduled for 2025-07-20.",
      date: "2025-07-10",
    },
    {
      id: 8,
      type: "Health Alert",
      message:
        "Avocado trees in Section H are showing signs of fungal infection.",
      date: "2025-09-05",
    },
    {
      id: 9,
      type: "Upcoming Planting",
      message: "Planting of Pineapple in Section I scheduled for 2025-09-21.",
      date: "2025-09-15",
    },
    {
      id: 10,
      type: "Health Alert",
      message:
        "Guava plants in Section J are showing signs of nutrient deficiency.",
      date: "2025-10-20",
    },
    // Add more notifications as needed
  ]);

  // Initialize react-modal's app element on client side
  useEffect(() => {
    if (typeof document !== "undefined") {
      const appElement = document.querySelector("#__next") || document.body;
      Modal.setAppElement(appElement);
    }
  }, []);

  const handleAddNewPlanting = () => {
    setEditingRecord(null); // Ensure no record is being edited
    setShowForm(true);
    setViewAll(false); // Hide table if form is shown
    setSearchQuery(""); // Reset search when adding a new planting
  };

  const handleViewAllPlantings = () => {
    setViewAll(true);
    setShowForm(false); // Hide form if table is shown
    setSearchQuery(""); // Reset search when viewing all plantings
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPlanting = {
      id: editingRecord ? editingRecord.id : Date.now(),
      cropType: form.cropType.value,
      section: form.section.value,
      plantingDate: form.plantingDate.value,
      numberOfPlants: parseInt(form.numberOfPlants.value, 10),
      growthStage: form.growthStage.value,
      healthStatus: form.healthStatus.value,
      growthMetrics: editingRecord
        ? editingRecord.growthMetrics
        : { days: 0, height: 0 },
      photos: editingRecord ? editingRecord.photos : [],
    };

    if (editingRecord) {
      // Update existing record
      setPlantingRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === editingRecord.id ? newPlanting : record
        )
      );
      setEditingRecord(null);
    } else {
      // Add new record
      setPlantingRecords([...plantingRecords, newPlanting]);
    }

    setShowForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle photo uploads
  const handlePhotoUpload = (e, plantingId) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const newPhotos = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file), // Temporary URL, replace with actual upload URL in production
      date: new Date().toISOString().split("T")[0],
    }));

    setPlantingRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === plantingId
          ? { ...record, photos: [...record.photos, ...newPhotos] }
          : record
      )
    );
  };

  // Function to open modal with selected photo
  const openModal = (photo) => {
    setCurrentPhoto(photo);
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPhoto(null);
  };

  // Function to handle edit
  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowForm(true);
    setViewAll(false);
  };

  // Function to handle delete
  const handleDelete = (recordId) => {
    if (
      window.confirm("Are you sure you want to delete this planting record?")
    ) {
      setPlantingRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== recordId)
      );
    }
  };

  // Filtered plantings based on search query
  const filteredPlantings = plantingRecords.filter(
    (record) =>
      record.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.healthStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sample data for growth progress chart
  const growthProgressData = {
    labels: plantingRecords.map((record) => record.cropType),
    datasets: [
      {
        label: "Growth Days",
        data: plantingRecords.map((record) => record.growthMetrics.days),
        fill: false,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
      },
      {
        label: "Height (cm)",
        data: plantingRecords.map((record) => record.growthMetrics.height),
        fill: false,
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
      },
    ],
  };

  // Highlighted dates for the calendar
  const highlightedDates = plantingRecords.map(
    (record) => new Date(record.plantingDate)
  );

  // Function to tile content in the calendar
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const hasPlanting = plantingRecords.some(
        (record) => record.plantingDate === formattedDate
      );
      return hasPlanting ? (
        <div className="dot bg-green-500 rounded-full w-2 h-2 mt-1 mx-auto"></div>
      ) : null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-md overflow-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
            onClick={handleAddNewPlanting}
          >
            Add New Planting
          </button>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
            onClick={handleViewAllPlantings}
          >
            View All Plantings
          </button>
        </div>

        {/* Search Bar */}
        {viewAll && (
          <div className="w-full lg:w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search plantings..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      {viewAll ? (
        <div>
          {/* Growth Progress Chart */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center lg:text-left">
              Growth Progress
            </h2>
            <div className="w-full h-64 sm:h-96">
              <Line
                data={growthProgressData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Planting Records Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 rounded-md shadow-md">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="text-left px-4 py-2">Crop Type</th>
                  <th className="text-left px-4 py-2">Section</th>
                  <th className="text-left px-4 py-2">Planting Date</th>
                  <th className="text-left px-4 py-2">Number of Plants</th>
                  <th className="text-left px-4 py-2">Growth Stage</th>
                  <th className="text-left px-4 py-2">Health Status</th>
                  <th className="text-left px-4 py-2">Photos</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlantings.length > 0 ? (
                  filteredPlantings.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{record.cropType}</td>
                      <td className="px-4 py-2">{record.section}</td>
                      <td className="px-4 py-2">{record.plantingDate}</td>
                      <td className="px-4 py-2">{record.numberOfPlants}</td>
                      <td className="px-4 py-2">{record.growthStage}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            record.healthStatus === "Healthy"
                              ? "bg-green-500"
                              : record.healthStatus === "At Risk"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {record.healthStatus}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {record.photos.length > 0 ? (
                          <div className="flex space-x-2">
                            {record.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo.url}
                                alt={`Plant ${record.cropType} ${index + 1}`}
                                className="w-12 h-12 object-cover cursor-pointer"
                                onClick={() => openModal(photo)}
                              />
                            ))}
                          </div>
                        ) : (
                          "No Photos"
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                        {/* Photo Upload Input */}
                        <div className="mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handlePhotoUpload(e, record.id)}
                            className="text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-semibold
                              file:bg-green-50 file:text-green-700
                              hover:file:bg-green-100"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center px-4 py-2 text-gray-600"
                    >
                      No plantings found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Notifications */}
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center lg:text-left">
              Notifications
            </h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 rounded-md ${
                    notification.type === "Upcoming Planting"
                      ? "bg-yellow-100 border border-yellow-300"
                      : "bg-red-100 border border-red-300"
                  }`}
                >
                  <p className="font-medium">{notification.type}</p>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo Viewing Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Photo Modal"
            className="max-w-lg sm:max-w-2xl mx-auto mt-20 bg-white p-4 rounded-md shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            {currentPhoto && (
              <div>
                <img
                  src={currentPhoto.url}
                  alt="Plant Growth"
                  className="w-full h-auto mb-4 rounded-md"
                />
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            )}
          </Modal>
        </div>
      ) : showForm ? (
        <form
          className="bg-gray-50 p-6 rounded-md shadow-md"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center lg:text-left">
            {editingRecord ? "Edit Planting" : "Add New Planting"}
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crop Type */}
            <div>
              <label
                htmlFor="cropType"
                className="block text-gray-700 font-medium mb-1"
              >
                Crop Type
              </label>
              <select
                id="cropType"
                name="cropType"
                required
                defaultValue={editingRecord ? editingRecord.cropType : ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select crop type</option>
                <option value="Tea">Tea</option>
                <option value="Coconut">Coconut</option>
                <option value="Cinnamon">Cinnamon</option>
                <option value="Mango">Mango</option>
                <option value="Banana">Banana</option>
                <option value="Papaya">Papaya</option>
                <option value="Orange">Orange</option>
                <option value="Avocado">Avocado</option>
                <option value="Pineapple">Pineapple</option>
                <option value="Guava">Guava</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Section */}
            <div>
              <label
                htmlFor="section"
                className="block text-gray-700 font-medium mb-1"
              >
                Section
              </label>
              <select
                id="section"
                name="section"
                required
                defaultValue={editingRecord ? editingRecord.section : ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select section</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
                <option value="Section D">Section D</option>
                <option value="Section E">Section E</option>
                <option value="Section F">Section F</option>
                <option value="Section G">Section G</option>
                <option value="Section H">Section H</option>
                <option value="Section I">Section I</option>
                <option value="Section J">Section J</option>
                {/* Add more sections as needed */}
              </select>
            </div>

            {/* Planting Date */}
            <div>
              <label
                htmlFor="plantingDate"
                className="block text-gray-700 font-medium mb-1"
              >
                Planting Date
              </label>
              <input
                id="plantingDate"
                name="plantingDate"
                type="date"
                required
                defaultValue={editingRecord ? editingRecord.plantingDate : ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Number of Plants */}
            <div>
              <label
                htmlFor="numberOfPlants"
                className="block text-gray-700 font-medium mb-1"
              >
                Number of Plants
              </label>
              <input
                id="numberOfPlants"
                name="numberOfPlants"
                type="number"
                min="1"
                required
                defaultValue={editingRecord ? editingRecord.numberOfPlants : ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter number of plants"
              />
            </div>

            {/* Growth Stage */}
            <div>
              <label
                htmlFor="growthStage"
                className="block text-gray-700 font-medium mb-1"
              >
                Growth Stage
              </label>
              <select
                id="growthStage"
                name="growthStage"
                required
                defaultValue={
                  editingRecord ? editingRecord.growthStage : "Germination"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select growth stage</option>
                <option value="Germination">Germination</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Fruiting">Fruiting</option>
                {/* Add more stages as needed */}
              </select>
            </div>

            {/* Health Status */}
            <div>
              <label
                htmlFor="healthStatus"
                className="block text-gray-700 font-medium mb-1"
              >
                Health Status
              </label>
              <select
                id="healthStatus"
                name="healthStatus"
                required
                defaultValue={
                  editingRecord ? editingRecord.healthStatus : "Healthy"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select health status</option>
                <option value="Healthy">Healthy</option>
                <option value="At Risk">At Risk</option>
                <option value="Unhealthy">Unhealthy</option>
                {/* Add more statuses as needed */}
              </select>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
            >
              {editingRecord ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingRecord(null);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
            Planting Schedule
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className="rounded-md shadow-md w-full"
              />
            </div>
          </div>

          <p className="text-gray-600 mt-4 text-center">
            Selected Date:{" "}
            <span className="font-medium">{selectedDate.toDateString()}</span>
          </p>

          {/* Plantings for Selected Date */}
          <div className="mt-6">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-center lg:text-left">
              Plantings on {selectedDate.toDateString()}
            </h3>
            <ul className="space-y-4">
              {plantingRecords
                .filter(
                  (record) =>
                    record.plantingDate ===
                    selectedDate.toISOString().split("T")[0]
                )
                .map((record) => (
                  <li
                    key={record.id}
                    className="p-4 bg-green-50 rounded-md shadow-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>
                        <span className="font-medium">Crop Type:</span>{" "}
                        {record.cropType}
                      </p>
                      <p>
                        <span className="font-medium">Section:</span>{" "}
                        {record.section}
                      </p>
                      <p>
                        <span className="font-medium">Number of Plants:</span>{" "}
                        {record.numberOfPlants}
                      </p>
                      <p>
                        <span className="font-medium">Growth Stage:</span>{" "}
                        {record.growthStage}
                      </p>
                      <p>
                        <span className="font-medium">Health Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            record.healthStatus === "Healthy"
                              ? "bg-green-500"
                              : record.healthStatus === "At Risk"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {record.healthStatus}
                        </span>
                      </p>
                    </div>
                    {/* Photos */}
                    {record.photos.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {record.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo.url}
                            alt={`Plant ${record.cropType} ${index + 1}`}
                            className="w-16 h-16 object-cover cursor-pointer rounded-md border"
                            onClick={() => openModal(photo)}
                          />
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              {plantingRecords.filter(
                (record) =>
                  record.plantingDate ===
                  selectedDate.toISOString().split("T")[0]
              ).length === 0 && (
                <p className="text-gray-600 text-center">
                  No plantings on this date.
                </p>
              )}
            </ul>
          </div>

          {/* Notifications */}
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center lg:text-left">
              Notifications
            </h2>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 rounded-md ${
                    notification.type === "Upcoming Planting"
                      ? "bg-yellow-100 border border-yellow-300"
                      : "bg-red-100 border border-red-300"
                  }`}
                >
                  <p className="font-medium">{notification.type}</p>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo Viewing Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Photo Modal"
            className="max-w-lg sm:max-w-2xl mx-auto mt-20 bg-white p-4 rounded-md shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            {currentPhoto && (
              <div>
                <img
                  src={currentPhoto.url}
                  alt="Plant Growth"
                  className="w-full h-auto mb-4 rounded-md"
                />
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default PlantingGrowthTracking;

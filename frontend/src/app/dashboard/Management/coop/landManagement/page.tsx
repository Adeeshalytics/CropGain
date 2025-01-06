"use client";

import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto"; 

export default function LandManagement() {
  const [selectedSection, setSelectedSection] = useState("Section A");
  const [showForm, setShowForm] = useState(false); 
  const [showSummary, setShowSummary] = useState(false); 
  const [editingCrop, setEditingCrop] = useState(null);

  const [cropsData, setCropsData] = useState({
    "Section A": [],
    "Section B": [],
    "Section C": [],
    "Section D": [],
    "Section E": [],
  });

  const getCropId = (crop) => {
    if (!crop) return null;
    if (typeof crop._id === 'string') return crop._id;
    if (crop._id?.$oid) return crop._id.$oid;
    if (crop.id) return crop.id;
    return null;
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    return date.split("T")[0]; // Extract YYYY-MM-DD from ISO format
  };

  const extractNumericValue = (value) => {
    if (!value) return "";
    return value.replace(/\D/g, ""); // Remove non-numeric characters
  };

  const landUsageData = {
    labels: ["Section A", "Section B", "Section C", "Section D", "Section E"],
    datasets: [
      {
        label: "Land Usage",
        data: ["Section A", "Section B", "Section C", "Section D", "Section E"].map(
          (section) =>
            Array.isArray(cropsData[section]) // Check if cropsData[section] is an array
              ? cropsData[section].reduce(
                  (sum, crop) => sum + parseFloat(crop.area || 0),
                  0
                )
              : 0 // Fallback to 0 if cropsData[section] is not an array
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
      },
    ],
  };
  
// Function to format the date (you can adjust the locale and options as needed)
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options); // 'en-GB' format: DD/MM/YYYY
};

  

useEffect(() => {
  fetch("http://localhost:5000/api/lands/land")
    .then((response) => response.json())
    .then((data) => {
      console.log("Raw crops data:", JSON.stringify(data, null, 2));
      setCropsData(data);
    })
    .catch((error) => console.error("Error fetching crops data:", error));
}, []);

  

  

const summaryBarData = {
  labels: ["Section A", "Section B", "Section C", "Section D", "Section E"],
  datasets: [
    {
      label: "Land Area (ha)",
      data: ["Section A", "Section B", "Section C", "Section D", "Section E"].map(
        (section) =>
          cropsData[section]?.reduce((sum, crop) => sum + parseFloat(crop.area || 0), 0) || 0
      ),
      backgroundColor: "#4CAF50",
    },
    {
      label: "Number of Plants",
      data: ["Section A", "Section B", "Section C", "Section D", "Section E"].map(
        (section) =>
          cropsData[section]?.filter((crop) => crop.numberOfPlants)
            .reduce((sum, crop) => sum + crop.numberOfPlants, 0) || 0
      ),
      backgroundColor: "#2196F3",
    },
  ],
};


  const handleAddCrop = () => {
    setShowForm(true);
  };

  //handleFormSubmit function

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const cropNameLand = form.cropNameLand.value;
    const area = form.area.value;
    const plantingDate = form.plantingDate.value;
    const harvestDate = form.harvestDate.value;
    const numberOfPlants = form.numberOfPlants.value || null;
  
    const newCrop = {
      cropNameLand: cropNameLand,
      area: area, // Ensure this matches the backend's expectation (e.g., "2 ha")
      plantingDate: plantingDate, // Ensure format is "YYYY-MM-DD"
      harvestDate: harvestDate, // Ensure format is "YYYY-MM-DD"
      numberOfPlants: numberOfPlants ? parseInt(numberOfPlants, 10) : null,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/lands/${encodeURIComponent(selectedSection)}/crops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCrop),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response from the backend
        throw new Error(errorData.message || "Failed to add crop");
      }
  
      const addedCrop = await response.json();
      console.log("Crop added successfully:", addedCrop);
  
      // Update the frontend state with the new crop
      setCropsData((prevData) => ({
        ...prevData,
        [selectedSection]: [...prevData[selectedSection], addedCrop], // Fix: Add the new crop instead of filtering
      }));
  
      setShowForm(false); 
    } catch (error) {
      console.error("Error adding crop:", error.message);
    }
  }; 
  



  //Edit Crop function
  const handleEditCrop = async (event, cropId) => {
    event.preventDefault();
  
    const form = event.target;
    const updatedCrop = {
      cropNameLand: form.cropNameLand.value,
      area: form.area.value,
      plantingDate: form.plantingDate.value,
      harvestDate: form.harvestDate.value,
      numberOfPlants: form.numberOfPlants.value ? parseInt(form.numberOfPlants.value, 10) : null,
    };
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/lands/${encodeURIComponent(selectedSection)}/crops/${encodeURIComponent(cropId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCrop),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update crop");
      }
  
      const updatedCropData = await response.json();
  
      // Update the frontend state
      setCropsData((prevData) => ({
        ...prevData,
        [selectedSection]: prevData[selectedSection].map((crop) =>
          getCropId(crop) === cropId ? updatedCropData : crop
        ),
      }));
  
      setShowForm(false); // Close the form
      setEditingCrop(null); // Reset editing state
    } catch (error) {
      console.error("Error updating crop:", error);
      alert(`Failed to update crop: ${error.message}`);
    }
  };



  //Delete Crop function

  const handleDeleteCrop = async (cropId: string) => {
    try {
      if (!cropId) {
        console.error("Attempted to delete crop with invalid ID");
        return;
      }
  
      // Add debugging log
      console.log('Delete request details:', {
        section: selectedSection,
        cropId: cropId,
        url: `http://localhost:5000/api/lands/${encodeURIComponent(selectedSection)}/crops/${encodeURIComponent(cropId)}`
      });
  
      const response = await fetch(
        `http://localhost:5000/api/lands/${encodeURIComponent(selectedSection)}/crops/${encodeURIComponent(cropId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );
  
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        let errorMessage;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage || `Failed to delete crop. Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Delete successful:", result);
  
      // Update the frontend state
      setCropsData((prevData) => ({
        ...prevData,
        [selectedSection]: prevData[selectedSection].filter(crop => {
          // Handle both string IDs and ObjectId formats
          const currentCropId = typeof crop._id === 'string' ? crop._id : crop._id.$oid;
          return currentCropId !== cropId;
        })
      }));
  
    } catch (error) {
      console.error("Error deleting crop:", error);
      // You might want to show this error to the user
      alert(`Failed to delete crop: ${error.message}`);
    }
  };

  return (
    <div className="flex-1 p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Land Management</h1>
        <div className="space-x-4">
        <button
  onClick={handleAddCrop}
  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
  aria-label="Add new crop"
>
  Add New Crop
</button>

          <button
            onClick={() => setShowSummary(true)} // Show Summary Modal
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            View Summary
          </button>
        </div>
      </div>

      {/* Section Buttons */}
      <div className="flex space-x-4 mb-6">
        {["Section A", "Section B", "Section C", "Section D", "Section E"].map(
          (section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-4 py-2 rounded-md ${
                selectedSection === section
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {section}
            </button>
          )
        )}
      </div>

      {/* Table Section */}
      <div className="bg-gray-50 p-4 border rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Crops in {selectedSection}
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Crop Name</th>
              <th className="px-4 py-2 text-left">Area</th>
              <th className="px-4 py-2 text-left">Number of Plants</th>
              
              <th className="px-4 py-2 text-left">Planting Date</th>
              <th className="px-4 py-2 text-left">Harvest Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>


          <tbody>
  {(cropsData[selectedSection] || []).length > 0 ? (
    cropsData[selectedSection].map((crop, index) => {
      const cropId = getCropId(crop);
      
      // Add this to debug the crop structure
      console.log('Processing crop:', crop);
      console.log('Extracted cropId:', cropId);
      
      return (
        <tr key={cropId || index} className="hover:bg-gray-100 border-b">
          <td className="px-4 py-2">{crop.cropNameLand}</td>
          <td className="px-4 py-2">{crop.area}</td>
          <td className="px-4 py-2">
            {crop.numberOfPlants != null ? crop.numberOfPlants : "N/A"}
          </td>
          <td className="px-4 py-2">{formatDate(crop.plantingDate)}</td>
          <td className="px-4 py-2">{formatDate(crop.harvestDate)}</td>
          <td className="px-4 py-2">
          <button
  onClick={() => {
    console.log("Editing crop:", crop); // Debugging
    setEditingCrop(crop);
    setShowForm(true);
  }}
  className="text-blue-600 hover:underline mr-2"
>
  Edit
</button>
            <button
  onClick={() => {
    const cropId = typeof crop._id === 'string' ? crop._id : crop._id.$oid;
    console.log('Crop object:', crop);
    console.log('Extracted ID:', cropId);
    handleDeleteCrop(cropId);
  }}
  className="text-red-600 hover:underline"
>
  Delete
</button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={6} className="text-center px-4 py-2 text-gray-500">
        No crops assigned yet.
      </td>
    </tr>
  )}
</tbody>




        </table>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-gray-50 p-4 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Land Usage</h2>
        <div className="max-w-md mx-auto">
          <Pie data={landUsageData} />
        </div>
      </div>

      {/* View Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-[80%] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Land Usage Summary</h2>

            {/* Summary Table */}
            <table className="min-w-full bg-gray-50 border border-gray-300 rounded-md mb-6">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Section</th>
                  <th className="px-4 py-2 text-left">Total Crops</th>
                  <th className="px-4 py-2 text-left">Total Area</th>
                  <th className="px-4 py-2 text-left">
                    Total Number of Plants
                  </th>
                  {/* New Column */}
                </tr>
              </thead>
              <tbody>
                {Object.keys(cropsData).map((section) => (
                  <tr key={section} className="hover:bg-gray-100 border-b">
                    <td className="px-4 py-2">{section}</td>
                    <td className="px-4 py-2">{cropsData[section].length}</td>
                    <td className="px-4 py-2">
                      {cropsData[section].reduce(
                        (sum, crop) => sum + parseFloat(crop.area),
                        0
                      )}
                      ha
                    </td>
                    <td className="px-4 py-2">
                      {cropsData[section]
                        .filter((crop) => crop.numberOfPlants)
                        .reduce((sum, crop) => sum + crop.numberOfPlants, 0) ||
                        "N/A"}
                    </td>
                    {/* Display Total Number of Plants */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary Bar Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Land Area by Section
              </h3>
              <Bar data={summaryBarData} />
            </div>

            <button
              onClick={() => setShowSummary(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Crop Form Modal */}
      {
  showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {editingCrop ? "Edit Crop" : "Add Crop to"} {selectedSection}
        </h2>
        <form onSubmit={editingCrop ? (e) => handleEditCrop(e, editingCrop._id) : handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Crop Name
            </label>
            <input
              type="text"
              name="cropNameLand"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter crop name"
              defaultValue={editingCrop ? editingCrop.cropNameLand : ""}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Area (in hectares)
            </label>
            <input
  type="number"
  name="area"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
  placeholder="Enter area"
  defaultValue={editingCrop ? extractNumericValue(editingCrop.area) : ""}
  required
/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Number of Plants
            </label>
            <input
              type="number"
              name="numberOfPlants"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter number of plants"
              defaultValue={editingCrop ? editingCrop.numberOfPlants : ""}
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Planting Date
            </label>
            <input
  type="date"
  name="plantingDate"
  defaultValue={editingCrop ? formatDateForInput(editingCrop.plantingDate) : ""}
  required
/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Harvest Date
            </label>
            <input
  type="date"
  name="harvestDate"
  defaultValue={editingCrop ? formatDateForInput(editingCrop.harvestDate) : ""}
  required
/>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingCrop(null); // Reset editing state
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
            >
              {editingCrop ? "Update Crop" : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


    </div>
  );
}

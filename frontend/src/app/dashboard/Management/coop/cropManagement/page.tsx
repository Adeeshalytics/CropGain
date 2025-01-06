"use client";

import React, { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

interface Crop {
  _id: string;
  cropName: string;
  scientificName: string;
  cropType: string;
  growthCycle: number;
  optimalGrowingConditions: string;
  soilTypePreference: string;
  expectedYieldValue: number; 
  expectedYieldUnit: string; 
  fertilizerType: string; 
  fertilizerQuantity: number; 
  fertilizerFrequency: string; 
  harvestFrequency: string;
  compatibleCrops: string[];
}

const CropManagement = () => {
  const [showForm, setShowForm] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null); // Use string | null
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [formValues, setFormValues] = useState({
    cropName: '',
    scientificName: '',
    cropType: '',
    growthCycle: '',
    optimalGrowingConditions: '',
    soilTypePreference: '',
    expectedYieldValue: '',
    expectedYieldUnit: 'kg/acre', 
    fertilizerType: '',
    fertilizerQuantity: '',
    fertilizerFrequency: '',
    harvestFrequency: '',
    compatibleCrops: '',
  });
  

  useEffect(() => {
    if (selectedCrop) {
      setFormValues({
        cropName: selectedCrop.cropName,
        scientificName: selectedCrop.scientificName,
        cropType: selectedCrop.cropType,
        growthCycle: selectedCrop.growthCycle.toString(),
        optimalGrowingConditions: selectedCrop.optimalGrowingConditions,
        soilTypePreference: selectedCrop.soilTypePreference,
        expectedYieldValue: selectedCrop.expectedYieldValue.toString(),
        expectedYieldUnit: selectedCrop.expectedYieldUnit,
        fertilizerType: selectedCrop.fertilizerType,
        fertilizerQuantity: selectedCrop.fertilizerQuantity.toString(),
        fertilizerFrequency: selectedCrop.fertilizerFrequency,
        harvestFrequency: selectedCrop.harvestFrequency,
        compatibleCrops: selectedCrop.compatibleCrops.join(", "),
      });
    } else {
      setFormValues({
        cropName: '',
        scientificName: '',
        cropType: '',
        growthCycle: '',
        optimalGrowingConditions: '',
        soilTypePreference: '',
        expectedYieldValue: '',
        expectedYieldUnit: '',
        fertilizerType: '',
        fertilizerQuantity: '',
        fertilizerFrequency: '',
        harvestFrequency: '',
        compatibleCrops: '',
      });
    }
  }, [selectedCrop]);
  
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setSelectedCropId(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  const handleAddNewCrop = () => {
    setShowForm(true);
    setViewAll(false);
    setSearchQuery("");
  };

  const handleViewAllCrops = async () => {
    setViewAll(true);
    setShowForm(false);
    setSearchQuery("");

    try {
      const response = await fetch("http://localhost:5000/api/crops", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch crops");
      }

      const data = await response.json();

      // Transform the data to handle MongoDB format
      const transformedData = data.map((crop: any) => ({
        ...crop,
        expectedYieldValue: crop.expectedYieldValue?.$numberInt
          ? parseInt(crop.expectedYieldValue.$numberInt, 10)
          : crop.expectedYieldValue || 0,
        expectedYieldUnit: crop.expectedYieldUnit || "N/A",
        fertilizerQuantity: crop.fertilizerQuantity?.$numberInt
          ? parseFloat(crop.fertilizerQuantity.$numberInt)
          : crop.fertilizerQuantity || 0,
        fertilizerType: crop.fertilizerType || "N/A",   
        fertilizerFrequency: crop.fertilizerFrequency || "N/A",
      }));

      setCrops(transformedData);
    } catch (error) {
      console.error("Error fetching crops:", error);
      alert("Failed to fetch crops. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const payload = {
    cropName: formValues.cropName.trim(),
    scientificName: formValues.scientificName.trim(),
    cropType: formValues.cropType,
    growthCycle: parseInt(formValues.growthCycle, 10),
    optimalGrowingConditions: formValues.optimalGrowingConditions,
    soilTypePreference: formValues.soilTypePreference,
    expectedYieldValue: parseFloat(formValues.expectedYieldValue),
    expectedYieldUnit: formValues.expectedYieldUnit,
    fertilizerType: formValues.fertilizerType,
    fertilizerQuantity: parseFloat(formValues.fertilizerQuantity),
    fertilizerFrequency: formValues.fertilizerFrequency,
    harvestFrequency: formValues.harvestFrequency,
    compatibleCrops: formValues.compatibleCrops
      ? formValues.compatibleCrops.split(",").map(s => s.trim()).filter(s => s !== "")
      : []
  };

  console.log("Sending payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch("http://localhost:5000/api/crops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    // Log the full response details
    const responseText = await response.text();
    console.log("Server Response Status:", response.status);
    console.log("Server Response Headers:", Object.fromEntries(response.headers));
    console.log("Server Response Body:", responseText);

    if (!response.ok) {
      let errorMessage;
      try {
        // Try to parse the response as JSON
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || responseText;
      } catch {
        // If parsing fails, use the raw text
        errorMessage = responseText;
      }
      throw new Error(`Server Error: ${errorMessage}`);
    }

    alert("Crop submitted successfully!");
    setShowForm(false);
    setSelectedCrop(null);
    handleViewAllCrops();
  } catch (error) {
    console.error("Full error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    alert(`Failed to submit crop data: ${error.message}`);
  }
};
  //render crops

  const renderCrops = () => {
    if (crops.length === 0) {
      return <p>No crops found.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table ref={tableRef}className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Crop Name</th>
              <th className="px-4 py-2 border">Scientific Name</th>
              <th className="px-4 py-2 border">Crop Type</th>
              <th className="px-4 py-2 border">Growth Cycle (Days)</th>
              <th className="px-4 py-2 border">Optimal Conditions</th>
              <th className="px-4 py-2 border">Soil Type</th>
              <th className="px-4 py-2 border">Expected Yield</th>
              <th className="px-4 py-2 border">Fertilizer</th>
              <th className="px-4 py-2 border">Harvest Frequency</th>
              <th className="px-4 py-2 border">Compatible Crops</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr
                key={crop._id}
                className={`px-4 py-2 border ${
                  selectedCropId === crop._id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedCropId(crop._id === selectedCropId ? null : crop._id)}
              >
                <td className="px-4 py-2 border">{crop.cropName}</td>
                <td className="px-4 py-2 border">{crop.scientificName}</td>
                <td className="px-4 py-2 border">{crop.cropType}</td>
                <td className="px-4 py-2 border">{crop.growthCycle}</td>
                <td className="px-4 py-2 border">{crop.optimalGrowingConditions}</td>
                <td className="px-4 py-2 border">{crop.soilTypePreference}</td>
                <td className="px-4 py-2 border">
                  {crop.expectedYieldValue} {crop.expectedYieldUnit}
                </td>
                <td className="px-4 py-2 border">
                  {crop.fertilizerType} ({crop.fertilizerQuantity} kg, {crop.fertilizerFrequency})
                </td>
                <td className="px-4 py-2 border">{crop.harvestFrequency}</td>
                <td className="px-4 py-2 border">{crop.compatibleCrops.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  const handleUpdate = (crop: Crop) => {
    if (crop && crop._id) {
      setSelectedCrop(crop);
      setShowForm(true);
      setViewAll(false);
    } else {
      console.error("Invalid crop selected for update.");
    }
  };

  const handleDelete = async (cropId: string) => {
    console.log('handleDelete called with cropId:', cropId);
    if (confirm("Are you sure you want to delete this crop?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/crops/${cropId}`, {
          method: "DELETE",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete crop");
        }
  
        alert("Crop deleted successfully!");
        setCrops((prevCrops) => prevCrops.filter((crop) => crop._id !== cropId));
        setSelectedCropId(null);
      } catch (error) {
        console.error("Error deleting crop:", error);
        alert("Failed to delete crop. Please try again.");
      }
    }
  };




  return (
    <div className="w-4/5 bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
            onClick={handleAddNewCrop}
          >
            Add New Crop
          </button>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
            onClick={handleViewAllCrops}
          >
            View All Crops
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          Add New Crop
        </h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Crop Name
          </label>
          <input
            type="text"
            name="cropName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter crop name"
            value={formValues.cropName}
  onChange={(e) => setFormValues({ ...formValues, cropName: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Scientific Name
          </label>
          <input
            type="text"
            name="scientificName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter scientific name (optional)"
            value={formValues.scientificName}
            onChange={(e) => setFormValues({ ...formValues, scientificName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Crop Type
          </label>
          <select
            name="cropType"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formValues.cropType}
    onChange={(e) => setFormValues({ ...formValues, cropType: e.target.value })}
            required
          >
            <option value="">Select crop type</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Spice">Spice</option>
            <option value="Grain">Grain</option>
            <option value="Oil">Oil</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Growth Cycle (Days)
          </label>
          <input
            type="number"
            name="growthCycle"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter growth cycle in days"
            value={formValues.growthCycle}
            onChange={(e) => setFormValues({ ...formValues, growthCycle: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Optimal Growing Conditions
          </label>
          <select
            name="optimalGrowingConditions"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formValues.optimalGrowingConditions}
  onChange={(e) => setFormValues({ ...formValues, optimalGrowingConditions: e.target.value })}
            required
          >
            <option value="">Select growing condition</option>
            <option value="Cool and Humid">Cool and Humid</option>
            <option value="Warm and Dry">Warm and Dry</option>
            <option value="Hot and Humid">Hot and Humid</option>
            <option value="Moderate with Partial Shade">
              Moderate with Partial Shade
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Soil Type Preference
          </label>
          <select
            name="soilTypePreference"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formValues.soilTypePreference}
  onChange={(e) => setFormValues({ ...formValues, soilTypePreference: e.target.value })}
            required
          >
            <option value="">Select soil type</option>
            <option value="Loamy">Loamy</option>
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Silty">Silty</option>
          </select>
        </div>

        <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1">
    Expected Yield per Unit Area
  </label>
  <div className="flex">
    <input
      type="number"
      name="expectedYieldValue"
      className="w-2/3 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
      placeholder="Enter yield"
      value={formValues.expectedYieldValue}
      onChange={(e) => setFormValues({ ...formValues, expectedYieldValue: e.target.value })}
      required
    />
    <select
      name="expectedYieldUnit"
      className="w-1/3 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-600"
      value={formValues.expectedYieldUnit}
      onChange={(e) => setFormValues({ ...formValues, expectedYieldUnit: e.target.value })}
      required
    >
      <option value="">Select unit</option>
      <option value="kg/acre">kg/acre</option>
      <option value="tons/hectare">tons/hectare</option>
      <option value="kg/hectare">kg/hectare</option>
    </select>
  </div>
</div>



        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Fertilizer Requirements
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <select
                name="fertilizerType"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formValues.fertilizerType}
                onChange={(e) => setFormValues({ ...formValues, fertilizerType: e.target.value })}
              >
                
                <option value="">Select fertilizer type</option>
                <option value="Nitrogen-based">Nitrogen-based</option>
                <option value="Phosphorus-based">Phosphorus-based</option>
                <option value="Potassium-based">Potassium-based</option>
                <option value="Organic">Organic</option>
                <option value="Compost">Compost</option>
              </select>


              <input
                type="number"
                name="fertilizerQuantity"
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Quantity (kg)"
                value={formValues.fertilizerQuantity}
  onChange={(e) => setFormValues({ ...formValues, fertilizerQuantity: e.target.value })}
              />
            </div>

            
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Frequency of Application
              </label>
              <select
                name="fertilizerFrequency"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={formValues.fertilizerFrequency}
                onChange={(e) => setFormValues({ ...formValues, fertilizerFrequency: e.target.value })}
              >
                
                <option value="">Select frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Bi-Annually">Bi-Annually</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Harvest Frequency
          </label>
          <select
            name="harvestFrequency"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formValues.harvestFrequency}
            onChange={(e) => setFormValues({ ...formValues, harvestFrequency: e.target.value })}
            required
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Compatible Crops for Rotation
          </label>
          <input
            type="text"
            name="compatibleCrops"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter compatible crops for rotation"
            value={formValues.compatibleCrops}
  onChange={(e) => setFormValues({ ...formValues, compatibleCrops: e.target.value })}
          />
        </div>

        <div className="flex space-x-4">
        <button
  type="submit"
  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
>
  {selectedCrop ? "Update" : "Submit"}
</button>
          
<button
  type="button"
  onClick={() => {
    setShowForm(false);
    setSelectedCrop(null);
    setFormValues({
      cropName: '',
      scientificName: '',
      cropType: '',
      growthCycle: '',
      optimalGrowingConditions: '',
      soilTypePreference: '',
      expectedYieldValue: '',
      expectedYieldUnit: '',
      fertilizerType: '',
      fertilizerQuantity: '',
      fertilizerFrequency: '',
      harvestFrequency: '',
      compatibleCrops: '',
    });
  }}
  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
>
  Cancel
</button>
        </div>
      </form>
      ) : viewAll ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground text-center">All Crops</h2>
            {selectedCropId && (
              <div className="flex space-x-2">
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                  onClick={() => handleUpdate(crops.find(crop => crop._id === selectedCropId)!)}
                >
                  Update
                </button>
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
                  onClick={() => handleDelete(selectedCropId)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {renderCrops()}
        </div>
      ) : null}
    </div>
  );
};

export default CropManagement;
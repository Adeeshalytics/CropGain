"use client";

import React, { use } from "react";

import CropOverview from "../../components/CropOverview";
import FarmDetails from "../../components/FarmDetails";
import CropGrowthMonitoring from "../../components/CropGrowthMonitoring";
import MyCrops from "../../components/MyCrops";
import Weather from "../../components/Weather";
import { useState, useEffect } from "react";
import axios from "axios";

interface Crop {
  crop: string;
  incomePerCrop: number;
}

// Defining the interface for the cropData state
interface CropData {
  [key: string]: number;
}

const App: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [cropData, setCropData] = useState<CropData>({});

  //fetching crops from the backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/Accounts/incomePerCrop"
        );
        setCrops(data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };
    fetchCrops();
  }, []);

  useEffect(() => {
    if (crops.length > 0) {
      const mappedData: CropData = {};
      crops.forEach((crop) => {
        mappedData[crop.crop] = crop.incomePerCrop;
      });
      setCropData(mappedData);
      console.log("Mapped cropData:", mappedData);
    }
  }, [crops]);
  let i = 0;
  console.log("cropData", cropData);
  console.log("crops", i);
  i = i + 1;

  const CropData = {
    Tea: 42,
    Coconut: 15,
    Cinnamon: 25,
    Other: 18,
  };

  const landData = {
    Tea: 20,
    Coconut: 5,
    Cinnamon: 3,
    Other: 2,
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <div
          className="text-gray-700 bg-blue-50 flex items-center space-x-4 font-roboto text-lg
          rounded-lg shadow-lg font-medium justify-center"
          style={{ width: "330px", height: "70px" }}
        >
          <Weather />
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-2">
          <CropOverview incomeData={CropData} landData={landData} />
        </section>

        <section
          className="lg:col-span-2 -ml-20 shadow-md"
          style={{ width: "112%", height: "430px" }}
        >
          <FarmDetails />
        </section>

        <section className="lg:col-span-2 flex gap-6 mt-6">
          <div className="flex-1">
            <CropGrowthMonitoring />
          </div>
          <div className="flex-1">
            <MyCrops />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

"use client";

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

// Define types for each entry
type FertilizerEntry = {
  id: number;
  appliedCrops: string;
  description: string;
  cost: string;
  units: string;
  sections: string;
};

type LabourEntry = {
  id: number;
  crops: string;
  employee: string;
  cost: string;
  sections: string;
};

type EquipmentEntry = {
  id: number;
  appliedCrops: string;
  description: string;
  cost: string;
  units: string;
  sections: string;
};

type CropInsuranceEntry = {
  id: number;
  crops: string;
  fields: string;
  coverageAmount: string;
  cost: string;
  entity: string;
};

// Define types for each entry
type UtilityBillEntry = {
  id: number;
  description: string;
  cost: string;
  units: string;
  sections: string;
};

type FuelEntry = {
  id: number;
  description: string;
  cost: string;
  units: string;
  amountPerPrice: string;
};

type GeneralExpenseEntry = {
  id: number;
  crops: string;
  description: string;
  cost: string;
  entity: string;
  section: string;
};

export default function Expenses() {
  // States to manage the list of entries
  const [fertilizers, setFertilizers] = useState<FertilizerEntry[]>([]);
  const [labour, setLabour] = useState<LabourEntry[]>([]);
  const [equipments, setEquipments] = useState<EquipmentEntry[]>([]);

  // Functions to handle adding new entries
  const handleAddFertilizer = () => {
    const newFertilizer: FertilizerEntry = {
      id: Date.now(),
      appliedCrops: '',
      description: '',
      cost: '',
      units: '',
      sections: '',
    };
    setFertilizers([...fertilizers, newFertilizer]);
  };

  const handleAddLabour = () => {
    const newLabour: LabourEntry = {
      id: Date.now(),
      crops: '',
      employee: '',
      cost: '',
      sections: '',
    };
    setLabour([...labour, newLabour]);
  };

  const handleAddEquipment = () => {
    const newEquipment: EquipmentEntry = {
      id: Date.now(),
      appliedCrops: '',
      description: '',
      cost: '',
      units: '',
      sections: '',
    };
    setEquipments([...equipments, newEquipment]);
  };

  // Functions to handle changes in input fields
  const handleChangeFertilizer = (id: number, field: keyof FertilizerEntry, value: string) => {
    setFertilizers(
      fertilizers.map((fertilizer) =>
        fertilizer.id === id ? { ...fertilizer, [field]: value } : fertilizer
      )
    );
  };

  const handleChangeLabour = (id: number, field: keyof LabourEntry, value: string) => {
    setLabour(
      labour.map((lab) =>
        lab.id === id ? { ...lab, [field]: value } : lab
      )
    );
  };

  const handleChangeEquipment = (id: number, field: keyof EquipmentEntry, value: string) => {
    setEquipments(
      equipments.map((equipment) =>
        equipment.id === id ? { ...equipment, [field]: value } : equipment
      )
    );
  };
  
  // Add a state to manage crop insurance entries
const [cropInsurances, setCropInsurances] = useState<CropInsuranceEntry[]>([]);

// Function to handle adding a new crop insurance entry
const handleAddCropInsurance = () => {
  const newInsurance: CropInsuranceEntry = {
    id: Date.now(),
    crops: '',
    fields: '',
    coverageAmount: '',
    cost: '',
    entity: '',
  };
  setCropInsurances([...cropInsurances, newInsurance]);
};

// Function to handle changes in crop insurance input fields
const handleChangeCropInsurance = (
  id: number,
  field: keyof CropInsuranceEntry,
  value: string
) => {
  setCropInsurances(
    cropInsurances.map((insurance) =>
      insurance.id === id ? { ...insurance, [field]: value } : insurance
    )
  );
};

const [utilityBills, setUtilityBills] = useState<UtilityBillEntry[]>([]);
const [fuelExpenses, setFuelExpenses] = useState<FuelEntry[]>([]);
const [generalExpenses, setGeneralExpenses] = useState<GeneralExpenseEntry[]>([]);

// Functions to handle adding new entries
const handleAddUtilityBill = () => {
  const newUtilityBill: UtilityBillEntry = {
    id: Date.now(),
    description: '',
    cost: '',
    units: '',
    sections: '',
  };
  setUtilityBills([...utilityBills, newUtilityBill]);
};

const handleAddFuelExpense = () => {
  const newFuel: FuelEntry = {
    id: Date.now(),
    description: '',
    cost: '',
    units: '',
    amountPerPrice: '',
  };
  setFuelExpenses([...fuelExpenses, newFuel]);
};

const handleAddGeneralExpense = () => {
  const newExpense: GeneralExpenseEntry = {
    id: Date.now(),
    crops: '',
    description: '',
    cost: '',
    entity: '',
    section: '',
  };
  setGeneralExpenses([...generalExpenses, newExpense]);
};

// Functions to handle changes in input fields
const handleChangeUtilityBill = (
  id: number,
  field: keyof UtilityBillEntry,
  value: string
) => {
  setUtilityBills(
    utilityBills.map((bill) =>
      bill.id === id ? { ...bill, [field]: value } : bill
    )
  );
};

const handleChangeFuelExpense = (
  id: number,
  field: keyof FuelEntry,
  value: string
) => {
  setFuelExpenses(
    fuelExpenses.map((fuel) =>
      fuel.id === id ? { ...fuel, [field]: value } : fuel
    )
  );
};

const handleChangeGeneralExpense = (
  id: number,
  field: keyof GeneralExpenseEntry,
  value: string
) => {
  setGeneralExpenses(
    generalExpenses.map((expense) =>
      expense.id === id ? { ...expense, [field]: value } : expense
    )
  );
};

//Delete Button
const handleDeleteFertilizer = (id: number) => {
  setFertilizers(fertilizers.filter((fertilizer) => fertilizer.id !== id));
};

const handleDeleteLabour = (id: number) => {
  setLabour(labour.filter((lab) => lab.id !== id));
};

const handleDeleteEquipment = (id: number) => {
  setEquipments(equipments.filter((equipment) => equipment.id !== id));
};

const handleDeleteCropInsurance = (id: number) => {
  setCropInsurances(cropInsurances.filter((insurance) => insurance.id !== id));
};

const handleDeleteUtilityBill = (id: number) => {
  setUtilityBills(utilityBills.filter((bill) => bill.id !== id));
};

const handleDeleteFuelExpense = (id: number) => {
  setFuelExpenses(fuelExpenses.filter((fuel) => fuel.id !== id));
};

const handleDeleteGeneralExpense = (id: number) => {
  setGeneralExpenses(generalExpenses.filter((expense) => expense.id !== id));
};

// Function to calculate total costs across all expenses
const calculateTotalCost = () => {
  const fertilizerTotal = fertilizers.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const labourTotal = labour.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const equipmentTotal = equipments.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const cropInsuranceTotal = cropInsurances.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const utilityBillTotal = utilityBills.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const fuelTotal = fuelExpenses.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);
  const generalExpenseTotal = generalExpenses.reduce((total, item) => total + parseFloat(item.cost || '0'), 0);

  // Return the total of all costs
  return fertilizerTotal + labourTotal + equipmentTotal + cropInsuranceTotal + utilityBillTotal + fuelTotal + generalExpenseTotal;
};




  return (
    <div className="flex min-h-screen">


      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between">
      <h1 className="text-5xl font-medium mb-12 mt-3">Expenses</h1>
      <div className="flex justify-end">
        <h1 className="text-5xl font-medium mb-12 mt-3 text-red-500 font-mono">
          {calculateTotalCost().toFixed(2)} LKR
        </h1>
      </div>
    </div>
    <div className="space-y-12">




            {/* Fertilizer Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Fertilizer & Chemicals</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Applied Crops
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Sections
                    </th>
                  </tr>
                </thead>
                
                <tbody>
  {fertilizers.map((fertilizer) => (
    <tr key={fertilizer.id}>
      <td className="px-6 py-4">
        <input
          type="text"
          value={fertilizer.appliedCrops}
          onChange={(e) =>
            handleChangeFertilizer(fertilizer.id, 'appliedCrops', e.target.value)
          }
          className="border p-2 w-full"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={fertilizer.description}
          onChange={(e) =>
            handleChangeFertilizer(fertilizer.id, 'description', e.target.value)
          }
          className="border p-2 w-full"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={fertilizer.cost}
          onChange={(e) =>
            handleChangeFertilizer(fertilizer.id, 'cost', e.target.value)
          }
          className="border p-2 w-full"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={fertilizer.units}
          onChange={(e) =>
            handleChangeFertilizer(fertilizer.id, 'units', e.target.value)
          }
          className="border p-2 w-full"
        />
      </td>
      <td className="px-6 py-4">
        <select
          value={fertilizer.sections}
          onChange={(e) =>
            handleChangeFertilizer(fertilizer.id, 'sections', e.target.value)
          }
          className="border p-2 w-full"
        >
          <option value="">Select</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => handleDeleteFertilizer(fertilizer.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} />

        </button>
      </td>
    </tr>
  ))}
  <tr>
    <td colSpan={6} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
      <button
        onClick={handleAddFertilizer}
        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
      >
        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
          +
        </span>
        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
          Add Fertilizer
        </span>
      </button>
    </td>
  </tr>
</tbody>
              </table>
            </section>

            {/* Labour Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Labour</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Crops
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Sections
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {labour.map((lab) => (
                    <tr key={lab.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={lab.crops}
                          onChange={(e) =>
                            handleChangeLabour(lab.id, 'crops', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={lab.employee}
                          onChange={(e) =>
                            handleChangeLabour(lab.id, 'employee', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={lab.cost}
                          onChange={(e) =>
                            handleChangeLabour(lab.id, 'cost', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lab.sections}
                          onChange={(e) =>
                            handleChangeLabour(lab.id, 'sections', e.target.value)
                          }
                          className="border p-2 w-full"
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="G">G</option>
                        </select>

                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteLabour(lab.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>

                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <button
                        onClick={handleAddLabour}
                        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                          +
                        </span>
                        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                          Add Labour
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Equipments Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Equipments, Machinery & Transportation</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Applied Crops
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Sections
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {equipments.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={equipment.appliedCrops}
                          onChange={(e) =>
                            handleChangeEquipment(equipment.id, 'appliedCrops', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={equipment.description}
                          onChange={(e) =>
                            handleChangeEquipment(equipment.id, 'description', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={equipment.cost}
                          onChange={(e) =>
                            handleChangeEquipment(equipment.id, 'cost', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={equipment.units}
                          onChange={(e) =>
                            handleChangeEquipment(equipment.id, 'units', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={equipment.sections}
                          onChange={(e) =>
                            handleChangeEquipment(equipment.id, 'sections', e.target.value)
                          }
                          className="border p-2 w-full"
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="G">G</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <button
                        onClick={handleAddEquipment}
                        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                          +
                        </span>
                        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                          Add Equipment
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

  
              {/* Crop Insurance Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Crop Insurance</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Crops
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Fields
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Coverage Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Entity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cropInsurances.map((insurance) => (
                    <tr key={insurance.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={insurance.crops}
                          onChange={(e) =>
                            handleChangeCropInsurance(insurance.id, 'crops', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={insurance.fields}
                          onChange={(e) =>
                            handleChangeCropInsurance(insurance.id, 'fields', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={insurance.coverageAmount}
                          onChange={(e) =>
                            handleChangeCropInsurance(
                              insurance.id,
                              'coverageAmount',
                              e.target.value
                            )
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={insurance.cost}
                          onChange={(e) =>
                            handleChangeCropInsurance(insurance.id, 'cost', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={insurance.entity}
                          onChange={(e) =>
                            handleChangeCropInsurance(insurance.id, 'entity', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteCropInsurance(insurance.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>

                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={5}
                      className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                    >
                      <button
                        onClick={handleAddCropInsurance}
                        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                          +
                        </span>
                        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                          Add Insurance
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

  {/* Utilities Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Utilities(Bills)</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Units</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Sections</th>
                  </tr>
                </thead>
                <tbody>
                  {utilityBills.map((bill) => (
                    <tr key={bill.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={bill.description}
                          onChange={(e) =>
                            handleChangeUtilityBill(bill.id, 'description', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={bill.cost}
                          onChange={(e) =>
                            handleChangeUtilityBill(bill.id, 'cost', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={bill.units}
                          onChange={(e) =>
                            handleChangeUtilityBill(bill.id, 'units', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                      <select
                          value={bill.sections}
                          onChange={(e) =>
                            handleChangeUtilityBill(bill.id, 'sections', e.target.value)
                          }
                          className="border p-2 w-full"
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="G">G</option>
                        </select>

                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUtilityBill(bill.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>

                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <button
                        onClick={handleAddUtilityBill}
                        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                          +
                        </span>
                        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                          Add Bill
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>


            {/* Fuel Section */}
            <section>
              <h2 className="text-3xl font-medium mb-4">Fuel</h2>
              <table className="w-full bg-white overflow-hidden mx-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Quantity Applied</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Cost</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {fuelExpenses.map((fuel) => (
                    <tr key={fuel.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={fuel.description}
                          onChange={(e) =>
                            handleChangeFuelExpense(fuel.id, 'description', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={fuel.units}
                          onChange={(e) =>
                            handleChangeFuelExpense(fuel.id, 'units', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={fuel.cost}
                          onChange={(e) =>
                            handleChangeFuelExpense(fuel.id, 'cost', e.target.value)
                          }
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteFuelExpense(fuel.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <button
                        onClick={handleAddFuelExpense}
                        className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                          +
                        </span>
                        <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                          Add Fuel
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>



{/* General Expenses Section */}
<section>
  <h2 className="text-3xl font-medium mb-4">General Expenses</h2>
  <table className="w-full bg-white overflow-hidden mx-auto">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Crops</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Description</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Cost</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Entity</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">Section</th>
      </tr>
    </thead>
    <tbody>
      {generalExpenses.map((expense) => (
        <tr key={expense.id}>
          <td className="px-6 py-4">
            <input
              type="text"
              value={expense.crops}
              onChange={(e) =>
                handleChangeGeneralExpense(expense.id, 'crops', e.target.value)
              }
              className="border p-2 w-full"
            />
          </td>
          <td className="px-6 py-4">
            <input
              type="text"
              value={expense.description}
              onChange={(e) =>
                handleChangeGeneralExpense(expense.id, 'description', e.target.value)
              }
              className="border p-2 w-full"
            />
          </td>
          <td className="px-6 py-4">
            <input
              type="number"
              value={expense.cost}
              onChange={(e) =>
                handleChangeGeneralExpense(expense.id, 'cost', e.target.value)
              }
              className="border p-2 w-full"
            />
          </td>
          <td className="px-6 py-4">
            <input
              type="text"
              value={expense.entity}
              onChange={(e) =>
                handleChangeGeneralExpense(expense.id, 'entity', e.target.value)
              }
              className="border p-2 w-full"
            />
          </td>
          <td className="px-6 py-4">
          <select
              value={expense.section}
              onChange={(e) =>
                handleChangeGeneralExpense(expense.id, 'section', e.target.value)
              }
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>

          </td>

          <td className="px-6 py-4 text-center">
            <button
              onClick={() => handleDeleteGeneralExpense(expense.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>

        </tr>
      ))}
      <tr>
        <td colSpan={5} className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500">
          <button
            onClick={handleAddGeneralExpense}
            className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
              +
            </span>
            <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
              Add Expenses
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</section>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
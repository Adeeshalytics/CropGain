const express = require("express");
const connectDB = require("./config/db");
const harvestIncome = require("./models/CoopStateAccount");
const crops = require("./data/crops");

const app = express(); // Initialize the 'app' first

connectDB(); // Connect to the database

console.log("crops", crops);

const importData = async () => {
  try {
    await harvestIncome.deleteMany();

    await harvestIncome.insertMany(crops);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1);
  }
};

importData();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

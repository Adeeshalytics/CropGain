// models/HarvestIncome.js

const mongoose = require("mongoose");

const HarvestIncomeSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    crop: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    numberOfUnits: {
      type: Number,
      required: true,
      min: 0,
    },
    incomePerCrop: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate totalIncome
HarvestIncomeSchema.pre("save", function (next) {
  this.incomePerCrop = this.pricePerUnit * this.noOfUnits;
  next();
});

const harvestIncome = mongoose.model("HarvestIncome", HarvestIncomeSchema);

module.exports = harvestIncome;

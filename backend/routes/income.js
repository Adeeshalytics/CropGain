const express = require("express");
const router = express.Router();
const Income = require("../models/CoopStateAccount");

router.get("/", async (req, res) => {
  const cropsPerIncome = await Income.find({});
  res.json(cropsPerIncome);
});

router.get("/:id", async (req, res) => {
  const cropPerIncome = await Income.findById(req.params.id);
  res.json(cropPerIncome);
});

module.exports = router;

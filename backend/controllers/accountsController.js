const express = require("express");
const router = express.Router();
const Account = require("../models/CoopStateAccount");

// Create a new account entry
router.post("/", async (req, res) => {
  try {
    const { date, previousMonth, description, subTotal, type } = req.body;
    const total = previousMonth + subTotal; // Calculate total
    const account = new Account({
      date,
      previousMonth,
      description,
      subTotal,
      total,
      type,
    });
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: "Error creating account entry", error });
  }
});

// Get all account entries
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
});

// Update an account entry
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, previousMonth, description, subTotal, type } = req.body;
    const total = previousMonth + subTotal; // Calculate total
    const account = await Account.findByIdAndUpdate(
      id,
      { date, previousMonth, description, subTotal, total, type },
      { new: true }
    );
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error updating account", error });
  }
});

// Delete an account entry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndDelete(id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error });
  }
});

module.exports = router;

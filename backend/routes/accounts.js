// routes/accounts.js

const express = require("express");
const {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountsController");

const router = express.Router();

router.get("/", getAccounts);
router.post("/", addAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router;

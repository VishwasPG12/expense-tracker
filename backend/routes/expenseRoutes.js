const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Add expense
router.post("/", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Delete expense
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;

const express = require('express');
const {
  createMonthlyList,
  deleteMonthlyList,
  addExpense,
  updateExpense,
  deleteExpense,
  getMonthlyLists,
  getMonthlyListById,
  updateMonthlyList,
} = require('../controllers/expenseController');

const router = express.Router();

// Create a new monthly list
router.post('/', createMonthlyList);

// Delete a monthly list
router.delete('/:id', deleteMonthlyList);

// Add an expense to a monthly list
router.post('/:id/expenses', addExpense);

// Update an expense in a monthly list
router.put('/:id/expenses/:expenseId', updateExpense);

// Delete an expense from a monthly list
router.delete('/:id/expenses/:expenseId', deleteExpense);

// Get all monthly lists (without expenses)
router.get('/', getMonthlyLists);

// Get a specific monthly list by ID (with all details, including expenses)
router.get('/:id', getMonthlyListById);

router.put('/:id', updateMonthlyList);

module.exports = router;
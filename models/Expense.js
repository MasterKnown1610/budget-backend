const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const MonthlyListSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  totalMoney: { type: Number, required: true }, 
  remainingMoney: { type: Number, required: true },
  expenses: [ExpenseSchema], 
});

module.exports = mongoose.model('MonthlyList', MonthlyListSchema);
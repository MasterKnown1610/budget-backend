const MonthlyList  = require('../models/Expense');

const createMonthlyList = async (req, res) => {
  const { name, totalMoney } = req.body;

  try {
    const newMonthlyList = new MonthlyList({
      name,
      totalMoney,
      remainingMoney: totalMoney, 
      expenses: [],
    });
    await newMonthlyList.save();
    res.status(201).json(newMonthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteMonthlyList = async (req, res) => {
  const { id } = req.params;

  try {
    await MonthlyList.findByIdAndDelete(id);
    res.status(200).json({ message: 'Monthly list deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;

  try {
    const monthlyList = await MonthlyList.findById(id);

    if (!monthlyList) {
      return res.status(404).json({ error: 'Monthly list not found' });
    }

    
    monthlyList.remainingMoney -= amount;

    
    monthlyList.expenses.push({ description, amount });

    await monthlyList.save();
    res.status(201).json(monthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateExpense = async (req, res) => {
  const { id, expenseId } = req.params;
  const { description, amount } = req.body;

  try {
    const monthlyList = await MonthlyList.findById(id);

    if (!monthlyList) {
      return res.status(404).json({ error: 'Monthly list not found' });
    }

    
    const expense = monthlyList.expenses.id(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    
    monthlyList.remainingMoney += expense.amount; 
    monthlyList.remainingMoney -= amount;

 
    expense.description = description;
    expense.amount = amount;

    await monthlyList.save();
    res.status(200).json(monthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteExpense = async (req, res) => {
  const { id, expenseId } = req.params;

  try {
    const monthlyList = await MonthlyList.findById(id);

    if (!monthlyList) {
      return res.status(404).json({ error: 'Monthly list not found' });
    }


    const expense = monthlyList.expenses.id(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }


    monthlyList.remainingMoney += expense.amount;


    monthlyList.expenses.pull(expenseId);

    await monthlyList.save();
    res.status(200).json(monthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMonthlyLists = async (req, res) => {
  try {
    const monthlyLists = await MonthlyList.find({}, { name: 1, totalMoney: 1, remainingMoney: 1 }); // Only return name, totalMoney, and remainingMoney
    res.status(200).json(monthlyLists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMonthlyListById = async (req, res) => {
  const { id } = req.params;

  try {
    const monthlyList = await MonthlyList.findById(id);

    if (!monthlyList) {
      return res.status(404).json({ error: 'Monthly list not found' });
    }

    res.status(200).json(monthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update monthly list details (name and total amount)
const updateMonthlyList = async (req, res) => {
  const { id } = req.params;
  const { name, totalMoney } = req.body;

  try {
    const monthlyList = await MonthlyList.findById(id);

    if (!monthlyList) {
      return res.status(404).json({ error: 'Monthly list not found' });
    }

    // Update the name if provided
    if (name) {
      monthlyList.name = name;
    }

    // Update the totalMoney if provided
    if (totalMoney) {
      const difference = totalMoney - monthlyList.totalMoney; // Calculate the difference
      monthlyList.totalMoney = totalMoney;
      monthlyList.remainingMoney += difference; // Adjust remainingMoney accordingly
    }

    await monthlyList.save();
    res.status(200).json(monthlyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMonthlyList,
  deleteMonthlyList,
  addExpense,
  updateExpense,
  deleteExpense,
  getMonthlyLists,
  getMonthlyListById,
  updateMonthlyList,
};
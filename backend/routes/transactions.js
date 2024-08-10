const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { createDebt, getUserDebts, updateDebt, deleteDebt } = require("../controllers/debt");
const { createGoal, getGoals, getGoalById, updateGoal, deleteGoal } = require('../controllers/goal');


const router = require('express').Router();

// Income Routes
router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)

        // Expense Routes
        .post('/add-expense', addExpense)
        .get('/get-expenses', getExpense)
        .delete('/delete-expense/:id', deleteExpense)

        // Debt Routes
        .post('/add-debt', createDebt)
        .get('/get-debt', getUserDebts)
        .put('/update-debt/:id', updateDebt)
        .delete('/delete-debt/:id', deleteDebt)

        // Goal Routes
        .post('/goals', createGoal)           // Create a new goal
        .get('/goals', getGoals)            // Get all goals
        .get('/goals/:id', getGoalById)      // Get a single goal by ID
        .put('/goals/:id', updateGoal)      // Update a goal by ID
        .delete('/goals/:id', deleteGoal);



module.exports = router
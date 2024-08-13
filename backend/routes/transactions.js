const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { createDebt, getUserDebts, updateDebt, deleteDebt } = require("../controllers/debt");
const { createGoal, getGoals, getGoalById, updateGoal, deleteGoal } = require('../controllers/goal');
const { authenticateJWT } = require("../middleware/jwtMiddleware")


const router = require('express').Router();

// Income Routes
router.post('/add-income', authenticateJWT, addIncome)
        .get('/get-incomes', authenticateJWT, getIncomes)
        .delete('/delete-income/:id', authenticateJWT, deleteIncome)

        // Expense Routes
        .post('/add-expense', authenticateJWT, addExpense)
        .get('/get-expenses', authenticateJWT, getExpense)
        .delete('/delete-expense/:id', authenticateJWT, deleteExpense)

        // Debt Routes
        .post('/add-debt', authenticateJWT, createDebt)
        .get('/get-debt', authenticateJWT, getUserDebts)
        .put('/update-debt/:id', authenticateJWT, updateDebt)
        .delete('/delete-debt/:id', authenticateJWT, deleteDebt)

        // Goal Routes
        .post('/goals', authenticateJWT, createGoal)           // Create a new goal
        .get('/goals', authenticateJWT, getGoals)            // Get all goals
        .get('/goals/:id', authenticateJWT, getGoalById)      // Get a single goal by ID
        .put('/goals/:id', authenticateJWT, updateGoal)      // Update a goal by ID
        .delete('/goals/:id', authenticateJWT, deleteGoal);



module.exports = router
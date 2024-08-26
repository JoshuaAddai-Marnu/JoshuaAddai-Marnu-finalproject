const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} = require("../controllers/income");
const {
  createDebt,
  getUserDebts,
  updateDebt,
  deleteDebt,
} = require("../controllers/debt");
const {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  addContribution,
  updateContribution,
  deleteContribution,
} = require("../controllers/goal");
const { createCategory, getCategories } = require("../controllers/categories");
const { authenticateJWT } = require("../middleware/jwtMiddleware");

const router = require("express").Router();

// Income Routes
router
  .post("/add-income", authenticateJWT, addIncome)
  .get("/get-incomes", authenticateJWT, getIncomes)
  .delete("/delete-income/:id", authenticateJWT, deleteIncome)
  .put("/update-income/:id", updateIncome)
  // Expense Routes
  .post("/add-expense", authenticateJWT, addExpense)
  .put("/update-expense/:id", updateExpense)
  .get("/get-expenses", authenticateJWT, getExpense)
  .delete("/delete-expense/:id", authenticateJWT, deleteExpense)
  .post("/categories", authenticateJWT, createCategory)
  .get("/categories", authenticateJWT, getCategories)

  // Debt Routes
  .post("/add-debt", authenticateJWT, createDebt)
  .get("/get-debt", authenticateJWT, getUserDebts)
  .put("/update-debt/:id", authenticateJWT, updateDebt)
  .delete("/delete-debt/:id", authenticateJWT, deleteDebt)

  // Goal Routes
  .post("/goals", authenticateJWT, createGoal) // Create a new goal
  .get("/goals", authenticateJWT, getGoals) // Get all goals
  .get("/goals/:id", authenticateJWT, getGoalById) // Get a single goal by ID
  .put("/goals/:id", authenticateJWT, updateGoal) // Update a goal by ID
  .delete("/goals/:id", authenticateJWT, deleteGoal)
  .post("/goals/:id/contributions", addContribution)
  .put(
    "/goals/:goalId/contributions/:contributionId",
    authenticateJWT,
    updateContribution
  )
  .delete(
    "/goals/:goalId/contributions/:contributionId",
    authenticateJWT,
    deleteContribution
  );

module.exports = router;

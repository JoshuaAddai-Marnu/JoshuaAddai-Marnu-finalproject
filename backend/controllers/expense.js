// Import the Expense model and User model from their respective files
const ExpenseSchema = require("../models/expenseModel");
const UserSchema = require("../models/userModel");

// Define an asynchronous function to add a new expense entry
exports.addExpense = async (req, res) => {
  // Extract the title, amount, category, description, and date from the request body.
  const { title, amount, category, description, date } = req.body;
  // Get the authenticated user from the request (usually set by middleware)
  const user = req.user;
  // Find the user's profile in the database using their email address
  const myProfile = await UserSchema.findOne({ email: user.email });

  // Create a new instance of the Expense model with the provided data
  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: myProfile, // Associate the expense with the user's profile
  });

  try {
    // Perform validations to ensure all required fields are present and valid
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    // Save the new expense entry to the database
    await income.save();
    // Respond with a success message
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    // Handle any errors that occur during the process and respond with a server error message
    res.status(500).json({ message: "Server Error" });
  }
};

// Define an asynchronous function to update an existing expense entry
exports.updateExpense = async (req, res) => {
  // Extract the expense ID from the request parameters
  const { id } = req.params;
  // Extract the updated fields from the request body
  const { title, amount, category, description, date } = req.body;

  try {
    // Get the authenticated user from the request
    const user = req.user;

    // Find the user's profile in the database using their email address
    const myProfile = await UserSchema.findOne({ email: user.email });

    // Find the expense entry by ID and ensure it belongs to the authenticated user
    const expense = await ExpenseSchema.findOne({ _id: id, user: myProfile });

    // If the expense entry is not found, return a 404 error
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Perform validations to ensure all required fields are present and valid
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Handle the amount field if it is passed as a string by converting it to a number
    let amountvalue = 0
    if (typeof (amount) == "string") {
      amountvalue = parseFloat(amount)
    }
    // Validate that the amount is a positive number
    if (amountvalue <= 0 || typeof amountvalue !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Update the expense entry with the new values or keep the old ones if not provided
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    // Save the updated expense entry to the database
    await expense.save();

    // Respond with a success message and the updated expense
    res.status(200).json({ message: "Expense successfully updated", expense });
  } catch (error) {
    // Handle any errors that occur during the process and respond with a server error message
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Define an asynchronous function to get all expenses associated with a user
exports.getExpense = async (req, res) => {
  try {
    // Get the authenticated user from the request
    const user = req.user;

    // Find the user's profile in the database using their email address
    const myProfile = await UserSchema.findOne({ email: user.email });

    // Retrieve all expenses linked to the user's profile, sorted by creation date (most recent first)
    const expenses = await ExpenseSchema.find({ user: myProfile }).sort({
      createdAt: -1,
    });
    // Respond with the list of expenses
    res.status(200).json(expenses);
  } catch (error) {
    // Handle any errors that occur during the process and respond with a server error message
    res.status(500).json({ message: "Server Error" });
  }
};

// Define a function to delete an expense entry by its ID
exports.deleteExpense = async (req, res) => {
  // Extract the expense ID from the request parameters
  const { id } = req.params;
  // Find the expense by its ID and delete it from the database
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      // Respond with a success message
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      // Handle any errors that occur during the process and respond with a server error message
      res.status(500).json({ message: "Server Error" });
    });
};

// Import the Income and User schemas/models from their respective files.
const IncomeSchema = require("../models/incomeModel");
const UserSchema = require("../models/userModel");

// Define and export an asynchronous function to handle adding a new income.
exports.addIncome = async (req, res) => {
  // Extract the title, amount, category, description, and date from the request body.
  const { title, amount, category, description, date } = req.body;

  // Retrieve the authenticated user from the request object.
  const user = req.user;

  console.log(user)

  // Find the user profile in the database using their email.
  const myProfile = await UserSchema.findOne({ email: user.email });

  // Create a new income instance with the provided data and associate it with the user's profile.
  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
    user: myProfile,
  });

  
  try {
    // Validations to ensure that all required fields are provided.
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // Check if the amount is a positive number.
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    // Save the new income record to the database.
    await income.save();
    // Respond with a success message if the income is successfully added.
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    // Handle any server errors and respond with a generic error message.
    res.status(500).json({ message: "Server Error" });
  }
};

// Define and export an asynchronous function to handle updating an existing income.
exports.updateIncome = async (req, res) => {
  // Retrieve the authenticated user and the ID of the income to be updated from the request.
  const user = req.user;
  const { id } = req.params;

  // Extract the updated fields from the request body.
  const { title, amount, category, description, date } = req.body;



  try {
    // Find the user's profile using their email.
    const myProfile = await UserSchema.findOne({ email: user.email });
    // Find the income record to be updated, ensuring it belongs to the authenticated user.
    const income = await IncomeSchema.findOne({ _id: id, user: myProfile });

    // If the income record is not found, return a 404 error.
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Validate that all required fields are provided.
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Ensure that the amount is a positive number.
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    // Update the income fields with the new values or retain the existing ones if no updates are provided.
    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    // Save the updated income record to the database.
    await income.save();

    // Respond with a success message and the updated income data.
    res.status(200).json({ message: "Income successfully updated", income });
  } catch (error) {
    // Handle any server errors, log the error, and respond with a generic error message.
    console.error("Error updating income:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Define and export an asynchronous function to retrieve all incomes for the authenticated user.
exports.getIncomes = async (req, res) => {
  try {
    // Retrieve the authenticated user from the request.
    const user = req.user;
    // Find the user's profile using their email.
    const myProfile = await UserSchema.findOne({ email: user.email });
    // Find all income records associated with the user, sorted by creation date (most recent first).
    const incomes = await IncomeSchema.find({ user: myProfile }).sort({
      createdAt: -1,
    });
    // Respond with the list of income records.
    res.status(200).json(incomes);
  } catch (error) {
    // Handle any server errors and respond with a generic error message.
    res.status(500).json({ message: "Server Error" });
  }
};

// Define and export an asynchronous function to handle deleting an income record.
exports.deleteIncome = async (req, res) => {
  // Retrieve the ID of the income to be deleted from the request parameters.
  const { id } = req.params;

  // Find the income by its ID and delete it from the database.
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      // Respond with a success message if the income is successfully deleted.
      res.status(200).json({ message: "Income successfully deleted" });
    })
    .catch((err) => {
      // Handle any server errors and respond with a generic error message.
      res.status(500).json({ message: "Server Error" });
    });
};

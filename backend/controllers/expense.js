const ExpenseSchema = require("../models/expenseModel");
const UserSchema = require("../models/userModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const user = req.user;
  const myProfile = await UserSchema.findOne({ email: user.email });

  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: myProfile,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getExpense = async (req, res) => {
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });

    const expenses = await ExpenseSchema.find({ user: myProfile }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

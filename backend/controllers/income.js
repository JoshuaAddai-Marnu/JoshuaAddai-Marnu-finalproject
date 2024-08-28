const IncomeSchema = require("../models/incomeModel");
const UserSchema = require("../models/userModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const user = req.user;

  console.log(user)

  const myProfile = await UserSchema.findOne({ email: user.email });

  const income = IncomeSchema({
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
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateIncome = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;



  try {
    const myProfile = await UserSchema.findOne({ email: user.email });
    const income = await IncomeSchema.findOne({ _id: id, user: myProfile });
  
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
  
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
  
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    // Update fields
    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    await income.save();

    res.status(200).json({ message: "Income successfully updated", income });
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });

    const incomes = await IncomeSchema.find({ user: myProfile }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income successfully deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};

const DebtSchema = require("../models/debtModel");
const UserSchema = require("../models/userModel");

exports.createDebt = async (req, res) => {
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });
    const { name, totalAmount } = req.body;
    const debt = new DebtSchema({
      user: myProfile,
      name,
      totalAmount,
    });

    await debt.save();
    res.status(201).json({ message: "Debt successfully created", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getUserDebts = async (req, res) => {
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });
    const debts = await DebtSchema.find({ user: myProfile });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateDebt = async (req, res) => {
  const { id } = req.params;
  try {
    const { paymentAmount } = req.body;
    const debt = await DebtSchema.findById(id);

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    debt.paidAmount += parseFloat(paymentAmount);
    await debt.save();

    res.status(200).json({ message: "Debt successfully updated", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteDebt = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });

    const debt = await DebtSchema.findOneAndDelete({
      _id: id,
      user: myProfile,
    });

    if (!debt) {
      return res.status(404).json({
        error:
          "Debt not found or you do not have permission to delete this debt",
      });
    }

    res.status(200).json({ message: "Debt successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

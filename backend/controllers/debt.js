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
      payments: [],
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
    const { paymentAmount, paymentDate } = req.body;

    if (!paymentAmount || !paymentDate) {
      return res
        .status(400)
        .json({ error: "Payment amount, and payment date are required" });
    }

    const debt = await DebtSchema.findById(id);

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    debt.paymentAmount = parseFloat(paymentAmount);
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

exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentDate } = req.body;

    if (!amount || !paymentDate) {
      return res
        .status(400)
        .json({ error: "Amount and payment date are required" });
    }

    const debt = await DebtSchema.findById(id);

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    debt.payments.push({ amount, date: paymentDate });
    debt.paidAmount += parseFloat(amount);

    await debt.save();
    res.status(200).json({ message: "Payment successfully added", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { debtId, paymentId } = req.params;
    const { amount, paymentDate } = req.body;

    if (!amount || !paymentDate) {
      return res
        .status(400)
        .json({ error: "Amount and payment date are required" });
    }

    const debt = await DebtSchema.findById(debtId);

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    const payment = debt.payments.id(paymentId);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    debt.paidAmount += parseFloat(amount);

    payment.amount = parseFloat(amount);
    payment.date = paymentDate;

    await debt.save();
    res.status(200).json({ message: "Payment successfully updated", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { debtId, paymentId } = req.params;
    const debt = await DebtSchema.findById(debtId);

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    const payment = debt.payments.id(paymentId);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    debt.paidAmount -= payment.amount;
    debt.payments.pull(paymentId);

    await debt.save();
    res.status(200).json({ message: "Payment successfully deleted", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

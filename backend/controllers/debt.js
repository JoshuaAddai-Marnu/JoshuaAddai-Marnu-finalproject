const DebtSchema = require("../models/debtModel");
const UserSchema = require("../models/userModel");

// Function to create a new debt entry
exports.createDebt = async (req, res) => {
  try {
    // Retrieves the authenticated user from the request
    const user = req.user;
    // Finds the user's profile based on their email
    const myProfile = await UserSchema.findOne({ email: user.email });
    // Destructure the name, totalAmount, and debtDate from the request body
    const { name, totalAmount, debtDate } = req.body;

    // Create a new debt document using the DebtSchema
    const debt = new DebtSchema({
      user: myProfile, // Associate the debt with the user's profile
      name,
      totalAmount,
      payments: [], // Initialize with an empty payments array
      date: debtDate,
    });

    await debt.save(); // Save the new debt to the database
    // Send a success response with the created debt
    res.status(201).json({ message: "Debt successfully created", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};

// Function to retrieve all debts for a specific user
exports.getUserDebts = async (req, res) => {
  try {
    // Retrieves the authenticated user from the request
    const user = req.user;
    // Finds the user's profile based on their email
    const myProfile = await UserSchema.findOne({ email: user.email });

    // Find all debts associated with the user's profile
    const debts = await DebtSchema.find({ user: myProfile });
    res.status(200).json(debts); // Send the list of debts in the response
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};


// Function to update an existing debt entry
exports.updateDebt = async (req, res) => {
  const { id } = req.params; // Extract the debt ID from the request parameters

  console.log(req)
  try {
    // Destructure the updated data from the request body
    const { name, totalAmount, debtDate } = req.body;

    // Validate that the total amount and debt date are provided
    if (!totalAmount || !debtDate) {
      return res
        .status(400)
        .json({ error: "Payment amount, and payment date are required" });
    }


    const debt = await DebtSchema.findById(id); // Find the debt by its ID

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" }); // Handle case where debt is not found
    }
    console.log(debt)

    // Update the debt's total amount and save the changes
    debt.totalAmount = parseFloat(totalAmount);
    await debt.save();

    // Send a success response with the updated debt
    res.status(200).json({ message: "Debt successfully updated", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};

// Function to delete a specific debt entry
exports.deleteDebt = async (req, res) => {
  const { id } = req.params; // Extract the debt ID from the request parameters
  try {
    const user = req.user; // Retrieve the authenticated user from the request

    // Find the user's profile based on their email
    const myProfile = await UserSchema.findOne({ email: user.email });
    // Find the debt by ID and associated user, then delete it
    const debt = await DebtSchema.findOneAndDelete({
      _id: id,
      user: myProfile,
    });

    // Handle case where debt is not found or user lacks permission
    if (!debt) {
      return res.status(404).json({
        error:
          "Debt not found or you do not have permission to delete this debt",
      });
    }

    // Send a success response for the deletion
    res.status(200).json({ message: "Debt successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};

// Function to add a payment to a specific debt
exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params; // Extract the debt ID from the request parameters

    // Destructure the payment details from the request body
    const { amount, paymentDate } = req.body;

    // Validate that the amount and payment date are provided
    if (!amount || !paymentDate) {
      return res
        .status(400)
        .json({ error: "Amount and payment date are required" });
    }

    const debt = await DebtSchema.findById(id); // Find the debt by its ID

    if (!debt) {
      // Handle case where debt is not found
      return res.status(404).json({ error: "Debt not found" });
    }

    // Add the new payment to the debt's payments array and update the paid amount
    debt.payments.push({ amount, date: paymentDate });
    debt.paidAmount += parseFloat(amount);

    await debt.save();// Save the changes to the debt
    // Send a success response with the updated debt
    res.status(200).json({ message: "Payment successfully added", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};


// Function to update an existing payment for a specific debt
exports.updatePayment = async (req, res) => {
  console.log(res)
  try {
    // Extract the debt ID and payment ID from the request parameters
    const { debtId, paymentId } = req.params;
    // Destructure the updated payment details from the request body
    const { amount, paymentDate } = req.body;

    // Validate that the amount and payment date are provided
    if (!amount || !paymentDate) {
      return res
        .status(400)
        .json({ error: "Amount and payment date are required" });
    }

    const debt = await DebtSchema.findById(debtId); // Find the debt by its ID

    if (!debt) {
      // Handle case where debt is not found
      return res.status(404).json({ error: "Debt not found" });
    }

    // Find the specific payment within the debt's payments array
    const payment = debt.payments.id(paymentId);

    if (!payment) {
      // Handle case where payment is not found
      return res.status(404).json({ error: "Payment not found" });
    }

    // Update the payment amount and date, and adjust the paid amount
    debt.paidAmount += parseFloat(amount);
    payment.amount = parseFloat(amount);
    payment.date = paymentDate;

    await debt.save(); // Save the changes to the debt

    // Send a success response with the updated debt
    res.status(200).json({ message: "Payment successfully updated", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};

// Function to delete a specific payment from a debt
exports.deletePayment = async (req, res) => {
  try {
    // Extract the debt ID and payment ID from the request parameters
    const { debtId, paymentId } = req.params;
    const debt = await DebtSchema.findById(debtId); // Find the debt by its ID

    if (!debt) {
      // Handle case where debt is not found
      return res.status(404).json({ error: "Debt not found" });
    }

    // Find the specific payment within the debt's payments array
    const payment = debt.payments.id(paymentId);

    if (!payment) {
      // Handle case where payment is not found
      return res.status(404).json({ error: "Payment not found" });
    }

    // Adjust the paid amount and remove the payment from the payments array
    debt.paidAmount -= payment.amount;
    debt.payments.pull(paymentId);

    await debt.save(); // Save the changes to the debt

    // Send a success response for the deletion
    res.status(200).json({ message: "Payment successfully deleted", debt });
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle server errors
  }
};

const mongoose = require("mongoose");

// Define the DebtSchema to structure debt-related data in the database
const DebtSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this debt, linking to the User model
    user: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId type, referencing the User model
      ref: "User",
      required: true,
    },

    // Name of the debt (e.g., "Car Loan", "Credit Card Debt")
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    // The total amount of the debt
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    // The amount that has already been paid towards the debt
    paidAmount: {
      type: Number,
      required: true,
      default: 0, // Default value is 0
      min: 0, // Ensures that the amount is non-negative
    },
    // The date associated with the debt (e.g., the date it was incurred or recorded)
    date: {
      type: Date,
    },

    // Timestamp for when the debt entry was created
    createdAt: {
      type: Date,
      default: Date.now, // Defaults to the current date and time
    },

    // An array to store payment records for this debt
    payments: [
      {
        amount: Number,
        date: {
          type: Date,
        },
      },
    ],
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps to the schema
    timestamps: true,
  }
);

// Method to calculate the remaining amount to be paid on the debt
DebtSchema.methods.remainingAmount = function () {
  return this.totalAmount - this.paidAmount; // Subtracts paidAmount from totalAmount
};


module.exports = mongoose.model("Debt", DebtSchema); // Exports the schema as a Mongoose model named "Debt"

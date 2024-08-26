const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    date: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

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
    timestamps: true,
  }
);

DebtSchema.methods.remainingAmount = function () {
  return this.totalAmount - this.paidAmount;
};

module.exports = mongoose.model("Debt", DebtSchema);

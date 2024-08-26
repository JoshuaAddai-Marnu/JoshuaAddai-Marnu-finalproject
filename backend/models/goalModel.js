const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    contributedAmount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
    },
    contributions: [
      {
        amount: Number,
        date: {
          type: Date,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to update `updatedAt` before saving a document
GoalSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Goal", GoalSchema);

const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    // Define a 'name' field for the goal, which is a required string representing the goal's name.
    name: {
      type: String,
      required: true,
    },
    // Define a 'targetAmount' field for the goal, which is a required number representing the financial target the user wants to achieve.
    targetAmount: {
      type: Number,
      required: true,
    },
    // Define a 'contributedAmount' field to track how much has been contributed towards the goal so far. It defaults to 0.
    contributedAmount: {
      type: Number,
      default: 0,
    },
    // Define a 'date' field that represents a specific date associated with the goal. It is an optional date field.
    date: {
      type: Date,
    },
    // Define a 'contributions' field, which is an array of objects. Each object contains the amount contributed and the date of the contribution.
    contributions: [
      {
        amount: Number,
        date: {
          type: Date,
        },
      },
    ],
    // Define a 'user' field that links the goal to a specific user. It uses the ObjectId type to reference the 'User' model.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Define a 'createdAt' field that records when the goal was created. It defaults to the current date and time.
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Define an 'updatedAt' field that records when the goal was last updated. It also defaults to the current date and time.
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // The 'timestamps' option automatically adds and manages 'createdAt' and 'updatedAt' fields.
);

// Middleware function that runs before saving a document to the database.
// This function updates the 'updatedAt' field to the current date and time before the document is saved.
GoalSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});


// Export the 'Goal' model, which is a compiled version of the schema and can be used to interact with the 'goals' collection in MongoDB.
// The first argument ('Goal') is the name of the model, and the second argument (GoalSchema) is the schema defined above.
module.exports = mongoose.model("Goal", GoalSchema);

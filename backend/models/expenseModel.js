// Import the Mongoose library, which is used to interact with MongoDB in a more structured and easy-to-use manner.
const mongoose = require("mongoose");

// Define a schema for the Expenses collection in MongoDB using Mongoose's Schema constructor.
// The schema outlines the structure and data types of the documents that will be stored in the Expenses collection.
const ExpenseSchema = new mongoose.Schema(
  {
    // Define a 'title' field for the expense document.
    title: {
      type: String,
      required: true,
      trim: true, // Automatically trims any leading or trailing whitespace from the title string.
      maxLength: 50,
    },
    // Define an 'amount' field for the expense document.
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    // Define a 'type' field to categorize the document as an expense.
    type: {
      type: String,
      default: "expense",
    },
    // Define a 'date' field to record when the expense occurred.
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    // Define a 'category' field to categorize the type of expense.
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // Define a 'description' field to provide additional details about the expense.
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    // Define a 'user' field to associate the expense document with a specific user.
    user: {
      type: mongoose.Schema.Types.ObjectId, // Specifies that the data type for 'user' is an ObjectId (a unique identifier in MongoDB).
      ref: "User", // Creates a reference to the 'User' model, linking this expense to a specific user.
      required: true, // Makes this field mandatory (the expense must be linked to a user).
    },
  },
  // Automatically adds 'createdAt' and 'updatedAt' fields to the document, 
  // which store the creation and last update times.
  { timestamps: true }
);

// Export the 'Expenses' model, which is a compiled version of the schema and can be used to interact with the 'expenses' collection in MongoDB.
// The first argument ('Expenses') is the name of the model, and the second argument (ExpenseSchema) is the schema defined above.
module.exports = mongoose.model("Expenses", ExpenseSchema);

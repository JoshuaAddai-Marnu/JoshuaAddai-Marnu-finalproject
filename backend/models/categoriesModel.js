const mongoose = require("mongoose");


// Define a schema for the Categories collection in MongoDB using Mongoose's Schema constructor.
// The schema outlines the structure and data types of the documents that will be stored in the Categories collection.
const CategorySchema = new mongoose.Schema(
  {
    // Define a 'label' field for the category document.
    label: { type: String, required: true },

    // Define a 'value' field for the category document.
    value: { type: String, required: true },

    // Define a 'type' field to categorize the document as either "expense" or "income".
    type: {
      type: String, required: true,
      enum: ["expense", "income"]
    }, // Limits the values for 'type' to either "expense" or "income"

    // Define a 'user' field to associate the category document with a specific user.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  // Define a 'user' field to associate the category document with a specific user.
  { timestamps: true }
);


// Export the 'Categories' model, which is a compiled version of the schema and can be used to interact with the 'categories' collection in MongoDB.
// The first argument ('Categories') is the name of the model, and the second argument (CategorySchema) is the schema defined above.
module.exports = mongoose.model("Categories", CategorySchema);

// Importing the Mongoose library, which is used for interacting with MongoDB in a structured manner.
const mongoose = require('mongoose');

// A schema is a blueprint that outlines the structure and rules for documents within a collection.
const IncomeSchema = new mongoose.Schema({
    // Defining the 'title' field for the income document.
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    // Defining the 'amount' field for the income document.
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    // Defining the 'type' field for the income document.
    type: {
        type: String,
        default: "income"
    },
    // Defining the 'date' field for the income document.
    date: {
        type: Date,
        required: true,
        trim: true
    },
    // Defining the 'category' field for the income document.
    category: {
        type: String,
        required: true,
        trim: true
    },
    // Defining the 'description' field for the income document.
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    // Defining a reference to the user who owns this income document.
    user: {
        type: mongoose.Schema.Types.ObjectId, // This field stores an ObjectId that references a User document.
        ref: 'User', // This references the 'User' model, creating a relationship between the Income and User collections.
        required: true // This field is mandatory; it must be provided.
    }
},
    // Automatically adds 'createdAt' and 'updatedAt' fields to the document.
    { timestamps: true })

// Exporting the 'Income' model, which is a compiled version of the schema and can be used to interact with the 'incomes' collection in MongoDB.
// The first argument ('Income') is the name of the model, and the second argument (IncomeSchema) is the schema defined above.
module.exports = mongoose.model('Income', IncomeSchema)


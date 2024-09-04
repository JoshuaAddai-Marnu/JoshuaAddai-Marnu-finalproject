// Import the Mongoose library, which is used for interacting with MongoDB 
//in a more structured and easy-to-use manner.
const mongoose = require('mongoose');

// Define a new schema for the User collection in MongoDB using Mongoose's Schema constructor.
// A schema is a blueprint for the documents that will be stored in the collection.
const UserSchema = new mongoose.Schema({
    // Define a 'name' field for the user document.
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        lower: true
    },
    // Define an 'email' field for the user document.
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // Define a 'password' field for the user document.
    password: {
        type: String,
        required: true
    }
},
    // Automatically adds 'createdAt' and 'updatedAt' fields to the document, 
    // which store the creation and last update times.
    { timestamps: true })


// Export the 'User' model, which is a compiled version of the schema and can 
// be used to interact with the 'users' collection in MongoDB.
//  The first argument ('User') is the name of the model, and the second argument 
//  (UserSchema) is the schema defined above.
module.exports = mongoose.model('User', UserSchema)
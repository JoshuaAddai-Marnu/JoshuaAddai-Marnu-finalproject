// Import the Category and User models from their respective files
const CategorySchema = require("../models/categoriesModel");
const UserSchema = require("../models/userModel");

// Function to create a new category
exports.createCategory = async (req, res) => {
  // Extract 'label' and 'type' from the request body
  const { label, type } = req.body;

  // Get the authenticated user from the request (set by authentication middleware)
  const user = req.user;

  try {
    // Validate the 'type' to ensure it is either 'expense' or 'income'
    if (type !== "expense" && type !== "income") {
      return res
        .status(400)
        .json({ message: "Type must be either 'expense' or 'income'" });
    }

    // Find the user's profile in the database using their email
    const myProfile = await UserSchema.findOne({ email: user.email });
    if (!myProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a category with the same label and type already exists for the user
    const existingCategory = await CategorySchema.findOne({
      label,
      type,
      user: myProfile._id,
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category already exists for this type" });
    }

    // Create a new category if it doesn't already exist
    const newCategory = await CategorySchema.create({
      label,
      value: label.toLowerCase().split(" ").join("_"),  // Generate a value from the label
      type,
      user: myProfile._id, // Associate the category with the user's profile
    });

    // Respond with a success message if the category is created successfully
    res.status(201).json({ message: "Category successfully created" });
  } catch (error) {
    // Handle errors and respond with a server error message
    console.error("Error in createCategory:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Function to retrieve categories based on the user and optional type filter
exports.getCategories = async (req, res) => {
  // Get the authenticated user from the request
  const user = req.user;

  // Extract the 'type' from the query parameters
  const { type } = req.query;

  try {
    // Find the user's profile in the database using their email
    const myProfile = await UserSchema.findOne({ email: user.email });
    if (!myProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    // Prepare the query to retrieve categories associated with the user
    let query = { user: myProfile._id };

    // If a type is provided and is valid, add it to the query
    if (type && (type === "expense" || type === "income")) {
      query.type = type;
    }

    // Retrieve the categories from the database, sorted by creation date (most recent first)
    const categories = await CategorySchema.find(query).sort({ createdAt: -1 });

    // Respond with the list of categories
    res.status(200).json(categories);
  } catch (error) {
    // Handle errors and respond with a server error message
    console.error("Error in getCategories:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const CategorySchema = require("../models/categoriesModel");
const UserSchema = require("../models/userModel");

exports.createCategory = async (req, res) => {
  const { label, type } = req.body;
  const user = req.user;

  try {
    // Validate type
    if (type !== "expense" && type !== "income") {
      return res
        .status(400)
        .json({ message: "Type must be either 'expense' or 'income'" });
    }

    // Find the user's profile
    const myProfile = await UserSchema.findOne({ email: user.email });
    if (!myProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the category already exists for the given type and user
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

    // Create the new category
    const newCategory = await CategorySchema.create({
      label,
      value: label.toLowerCase().split(" ").join("_"),
      type,
      user: myProfile._id,
    });

    res.status(201).json({ message: "Category successfully created" });
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  const user = req.user;
  const { type } = req.query;

  try {
    const myProfile = await UserSchema.findOne({ email: user.email });
    if (!myProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    let query = { user: myProfile._id };

    // If type is provided, add it to the query
    if (type && (type === "expense" || type === "income")) {
      query.type = type;
    }

    const categories = await CategorySchema.find(query).sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

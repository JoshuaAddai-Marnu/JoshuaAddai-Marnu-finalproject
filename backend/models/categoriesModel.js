const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, required: true, enum: ["expense", "income"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategorySchema);

// Importing the GoalSchema and UserSchema models to interact with the Goal and User collections in the MongoDB database.
const GoalSchema = require("../models/goalModel");
const UserSchema = require("../models/userModel");

// Function to create a new goal for a user.
exports.createGoal = async (req, res) => {
  try {
    // Extracting the name, targetAmount, and goalDate from the request body.
    const { name, targetAmount, goalDate } = req.body;

    // Validate that all required fields are provided.
    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    // Retrieve the user making the request from the request object.
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });

    // Create a new Goal document using the GoalSchema.
    const goal = new GoalSchema({
      name,
      targetAmount,
      user: myProfile,
      date: goalDate,
    });

    // Save the new goal to the database.
    await goal.save();
    res.status(201).json({ message: "Goal successfully created", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to retrieve all goals associated with the authenticated user.
exports.getGoals = async (req, res) => {
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });
    const goals = await GoalSchema.find({ user: myProfile });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to retrieve a specific goal by its ID.
exports.getGoalById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the goal ID from the request parameters.
    const goal = await GoalSchema.findById(id);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to update an existing goal by its ID.
exports.updateGoal = async (req, res) => {
  const { id } = req.params; // Extract the goal ID from the request parameters.
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });
    const { name, targetAmount, contributedAmount, goalDate } = req.body;

    // Validate that the goal date is a valid date.
    if (isNaN(new Date(goalDate))) {
      return res.status(400).json({ error: "Invalid goal date" });
    }

    // Validate that required fields are provided.
    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    // Find the goal by its ID.
    const goal = await GoalSchema.findById(id);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Update the goal fields if new values are provided.
    goal.name = name || goal.name;
    goal.targetAmount = targetAmount || goal.targetAmount;
    if (contributedAmount) {
      const contributedAmountNum = parseFloat(contributedAmount);
      if (isNaN(contributedAmountNum)) {
        return res.status(400).json({ error: "Invalid contributed amount" });
      }
      goal.contributedAmount += contributedAmountNum;
    }
    goal.date = goalDate;

    // Save the updated goal to the database.
    await goal.save();
    res.status(200).json({ message: "Goal successfully updated", goal });
  } catch (error) {
    console.error("Error saving goal:", error.message, error.stack);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Function to delete an existing goal by its ID.
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params; // Extract the goal ID from the request parameters

    const goal = await GoalSchema.findByIdAndDelete(id);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json({ message: "Goal successfully deleted" });
  } catch (error) {
    console.error("Error saving goal:", error.message, error.stack);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Function to add a contribution to an existing goal.
exports.addContribution = async (req, res) => {
  try {
    const { id } = req.params; // Extract the goal ID from the request parameters
    const { amount, contributionDate } = req.body;

    // Validate that the amount and contribution date are provided.
    if (!amount || !contributionDate) {
      return res
        .status(400)
        .json({ error: "Amount and contribution date are required" });
    }

    // Find the goal by its ID.
    const goal = await GoalSchema.findById(id);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Add the contribution to the goal's contributions array and update the contributed amount.
    goal.contributions.push({ amount, date: contributionDate });
    goal.contributedAmount += parseFloat(amount);

    // Save the updated goal to the database.
    await goal.save();
    res.status(200).json({ message: "Contribution successfully added", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to update an existing contribution within a goal.
exports.updateContribution = async (req, res) => {
  try {
    const { goalId, contributionId } = req.params; // Extract the goal and contribution IDs from the request parameters.
    const { amount, contributionDate } = req.body;

    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    // Find the goal by its ID.
    const goal = await GoalSchema.findById(goalId);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Find the contribution by its ID within the goal's contributions array.
    const contribution = goal.contributions.id(contributionId);

    // If the contribution is not found, return a 404 error.
    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    // Update the contribution amount and adjust the goal's contributed amount.
    goal.contributedAmount -= contribution.amount;
    goal.contributedAmount += parseFloat(amount);

    contribution.amount = parseFloat(amount);

    // Save the updated goal to the database.
    await goal.save();
    res
      .status(200)
      .json({ message: "Contribution successfully updated", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to delete a contribution from an existing goal.
exports.deleteContribution = async (req, res) => {
  try {
    const { goalId, contributionId } = req.params; // Extract the goal and contribution IDs from the request parameters.
    const goal = await GoalSchema.findById(goalId);

    // If the goal is not found, return a 404 error.
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Find the contribution by its ID within the goal's contributions array.
    const contribution = goal.contributions.id(contributionId);

    // If the contribution is not found, return a 404 error.
    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    // Adjust the goal's contributed amount and remove the contribution.
    goal.contributedAmount -= contribution.amount;
    goal.contributions.pull(contributionId);

    // Save the updated goal to the database.
    await goal.save();
    res
      .status(200)
      .json({ message: "Contribution successfully deleted", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

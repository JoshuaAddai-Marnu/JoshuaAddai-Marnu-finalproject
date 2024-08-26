const GoalSchema = require("../models/goalModel");
const UserSchema = require("../models/userModel");

exports.createGoal = async (req, res) => {
  try {
    const { name, targetAmount, goalDate } = req.body;

    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });

    const goal = new GoalSchema({
      name,
      targetAmount,
      user: myProfile,
      date: goalDate,
    });
    console.log("body", { name, targetAmount });
    console.log("goal", goal);

    await goal.save();
    res.status(201).json({ message: "Goal successfully created", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

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

exports.getGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await GoalSchema.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;
    const myProfile = await UserSchema.findOne({ email: user.email });
    const { name, targetAmount, contributedAmount, goalDate } = req.body;

    if (isNaN(new Date(goalDate))) {
      return res.status(400).json({ error: "Invalid goal date" });
    }

    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    const goal = await GoalSchema.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

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

    console.log(goal);

    await goal.save();
    res.status(200).json({ message: "Goal successfully updated", goal });
  } catch (error) {
    console.error("Error saving goal:", error.message, error.stack);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await GoalSchema.findByIdAndDelete(id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json({ message: "Goal successfully deleted" });
  } catch (error) {
    console.error("Error saving goal:", error.message, error.stack);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.addContribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, contributionDate } = req.body;

    if (!amount || !contributionDate) {
      return res
        .status(400)
        .json({ error: "Amount and contribution date are required" });
    }

    const goal = await GoalSchema.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    goal.contributions.push({ amount, date: contributionDate });
    goal.contributedAmount += parseFloat(amount);

    await goal.save();
    res.status(200).json({ message: "Contribution successfully added", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateContribution = async (req, res) => {
  try {
    const { goalId, contributionId } = req.params;
    const { amount, contributionDate } = req.body;

    if (!name || !targetAmount || !goalDate) {
      return res
        .status(400)
        .json({ error: "Name, target amount, and goal date are required" });
    }

    const goal = await GoalSchema.findById(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    const contribution = goal.contributions.id(contributionId);

    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    goal.contributedAmount -= contribution.amount;
    goal.contributedAmount += parseFloat(amount);

    contribution.amount = parseFloat(amount);

    await goal.save();
    res
      .status(200)
      .json({ message: "Contribution successfully updated", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteContribution = async (req, res) => {
  try {
    const { goalId, contributionId } = req.params;

    const goal = await GoalSchema.findById(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    const contribution = goal.contributions.id(contributionId);

    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    goal.contributedAmount -= contribution.amount;
    goal.contributions.pull(contributionId);

    await goal.save();
    res
      .status(200)
      .json({ message: "Contribution successfully deleted", goal });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

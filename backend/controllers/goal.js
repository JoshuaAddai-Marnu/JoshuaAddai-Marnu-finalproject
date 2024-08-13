const GoalSchema = require('../models/goalModel');
const UserSchema = require("../models/userModel")


exports.createGoal = async (req, res) => {
    try {
        const { name, targetAmount } = req.body;

        const user = req.user
        const myProfile = await UserSchema.findOne({ email: user.email })

        const goal = new GoalSchema({
            name,
            targetAmount,
            user: myProfile
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const user = req.user
        const myProfile = await UserSchema.findOne({ email: user.email })
        const goals = await GoalSchema.find({ user: myProfile });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await GoalSchema.findById(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const user = req.user
        const myProfile = await UserSchema.findOne({ email: user.email })
        const { name, targetAmount, contributedAmount } = req.body;

        const goal = await GoalSchema.findOne({ id, user: myProfile });

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        goal.name = name || goal.name;
        goal.targetAmount = targetAmount || goal.targetAmount;
        goal.contributedAmount = contributedAmount || goal.contributedAmount;

        await goal.save();
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await GoalSchema.findByIdAndDelete(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const DebtSchema = require('../models/debtModel');

exports.createDebt = async (req, res) => {
    try {
        const { name, totalAmount } = req.body;
        const debt = new DebtSchema({
            user: req.user._id,
            name,
            totalAmount
        });

        await debt.save();
        res.status(201).json(debt);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getUserDebts = async (req, res) => {
    try {
        const debts = await DebtSchema.find({ user: req.user._id });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.updateDebt = async (req, res) => {
    try {
        const { debtId, paymentAmount } = req.body;
        const debt = await DebtSchema.findById(debtId);

        if (!debt) {
            return res.status(404).json({ error: 'Debt not found' });
        }

        debt.paidAmount += parseFloat(paymentAmount);
        await debt.save();

        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const Debt = require('../models/debtModel'); // Make sure to import the Debt model

exports.deleteDebt = async (req, res) => {
    try {
        const { debtId } = req.params; // Get the debt ID from the request parameters
        const userId = req.user._id; // Assuming you have user authentication and can access the user's ID

        // Find the debt by ID and ensure it belongs to the logged-in user
        const debt = await Debt.findOneAndDelete({ _id: debtId, user: userId });

        if (!debt) {
            return res.status(404).json({ error: 'Debt not found or you do not have permission to delete this debt' });
        }

        res.status(200).json({ message: 'Debt successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};




import React, { useContext, useState } from "react"
import axios from 'axios'

const Debt = require('../models/debtModel');

exports.createDebt = async (req, res) => {
    try {
        const { name, totalAmount } = req.body;
        const debt = new Debt({
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
        const debts = await Debt.find({ user: req.user._id });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.updateDebt = async (req, res) => {
    try {
        const { debtId, paymentAmount } = req.body;
        const debt = await Debt.findById(debtId);

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

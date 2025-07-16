const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


router.post('/', async (req, res) => {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
});


router.get('/:userId', async (req, res) => {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
});

module.exports = router;

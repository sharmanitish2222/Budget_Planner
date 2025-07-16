const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');


router.post('/', async (req, res) => {
    const newBudget = new Budget(req.body);
    const saved = await newBudget.save();
    res.status(201).json(saved);
});


router.get('/:userId', async (req, res) => {
    const budgets = await Budget.find({ userId: req.params.userId });
    res.json(budgets);
});

module.exports = router;

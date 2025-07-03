const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let budgets = [];

// POST - Add budget
router.post('/', (req, res) => {
    const budget = {
        id: budgets.length + 1,
        userId: req.body.userId,
        category: req.body.category,
        amount: req.body.amount,
        period: req.body.period,
        date: new Date()
    };
    budgets.push(budget);
    res.status(201).json(budget);
});

// GET - Get budgets by userId
router.get('/:userId', (req, res) => {
    const result = budgets.filter(b => b.userId === req.params.userId);
    res.json(result);
});

module.exports = router;

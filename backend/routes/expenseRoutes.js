const express = require('express');
const router = express.Router();

let expenses = []; 


router.post('/', (req, res) => {
    const expense = {
        id: expenses.length + 1,
        userId: req.body.userId,
        category: req.body.category,
        amount: parseFloat(req.body.amount),
        date: req.body.date
    };
    expenses.push(expense);
    res.status(201).json(expense);
});


router.get('/:userId', (req, res) => {
    const userExpenses = expenses.filter(e => e.userId === req.params.userId);
    res.json(userExpenses);
});

module.exports = router;

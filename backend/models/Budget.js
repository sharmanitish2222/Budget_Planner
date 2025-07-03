const mongoose = require('mongoose');
const BudgetSchema = new mongoose.Schema({
    userId: String,
    category: String,
    amount: Number,
    period: String,
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Budget', BudgetSchema);

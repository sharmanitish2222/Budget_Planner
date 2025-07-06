const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const budgetRoutes = require('./routes/budgetRoutes');
app.use('/api/budgets', budgetRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

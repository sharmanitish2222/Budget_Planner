// Toggle Dark Mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('budgetForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const period = document.getElementById('period').value;

    // POST request to add budget
    await fetch('http://localhost:5000/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, category, amount, period })
    });

    loadBudgets(userId); // reload after adding
});

// Load budgets
async function loadBudgets(userId) {
    const res = await fetch(`http://localhost:5000/api/budgets/${userId}`);
    const data = await res.json();
    const container = document.getElementById('budgetContainer');
    container.innerHTML = '';
    data.forEach(b => {
        const div = document.createElement('div');
        div.textContent = `${b.category}: ₹${b.amount} (${b.period})`;
        container.appendChild(div);
    });
}

document.getElementById('expenseForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = document.getElementById('expUserId').value;
    const category = document.getElementById('expCategory').value;
    const amount = document.getElementById('expAmount').value;
    const date = document.getElementById('expDate').value;

    await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, category, amount, date })
    });

    loadExpenses(userId);
});

async function loadExpenses(userId) {
    const res = await fetch(`http://localhost:5000/api/expenses/${userId}`);
    const data = await res.json();

    const container = document.getElementById('expenseContainer');
    container.innerHTML = '';
    data.forEach(exp => {
        const div = document.createElement('div');
        div.textContent = `${exp.category}: ₹${exp.amount} on ${exp.date}`;
        container.appendChild(div);
    });
}

async function showSummary() {
    const userId = document.getElementById('userId').value || document.getElementById('expUserId').value;

    if (!userId) {
        alert("Please enter User ID first.");
        return;
    }

    // Fetch budgets & expenses
    const [budgetsRes, expensesRes] = await Promise.all([
        fetch(`http://localhost:5000/api/budgets/${userId}`),
        fetch(`http://localhost:5000/api/expenses/${userId}`)
    ]);

    const budgets = await budgetsRes.json();
    const expenses = await expensesRes.json();

    // Calculate summary by category
    const summary = budgets.map(b => {
        const spent = expenses
            .filter(e => e.category === b.category)
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            category: b.category,
            budget: b.amount,
            spent,
            remaining: b.amount - spent
        };
    });

    // Render the table
    const tbody = document.querySelector('#summaryTable tbody');
    tbody.innerHTML = ''; // Clear previous

    summary.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.category}</td>
          <td>₹${row.budget}</td>
          <td>₹${row.spent}</td>
          <td>₹${row.remaining}</td>
        `;
        tbody.appendChild(tr);
    });
}


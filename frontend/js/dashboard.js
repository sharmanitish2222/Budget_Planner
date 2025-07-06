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

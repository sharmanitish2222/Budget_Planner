fetch('http://localhost:5000/api/budgets/user123')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('budgetContainer');
    data.forEach(b => {
        const div = document.createElement('div');
        div.textContent = `${b.category}: ₹${b.amount}`;
        container.appendChild(div);
    });
  })
  .catch(err => console.error(err));

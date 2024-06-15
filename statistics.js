// totals.js
document.addEventListener('DOMContentLoaded', () => {
    const incomeTable = document.getElementById('income-table');
    const expenseTable = document.getElementById('expense-table');
    
    function loadTransactions() {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let income = {};
        let expenses = {};
        transactions.forEach(transaction => {
            if (transaction.category === 'income') {
                if (income[transaction.category]) {
                    income[transaction.category] += parseFloat(transaction.amount);
                } else {
                    income[transaction.category] = parseFloat(transaction.amount);
                }
            } else if (transaction.type === 'expense') {
                if (expenses[transaction.category]) {
                    expenses[transaction.category] += parseFloat(transaction.amount);
                } else {
                    expenses[transaction.category] = parseFloat(transaction.amount);
                }
            }
        });

        displayTotals(income, incomeTable);
        displayTotals(expenses, expenseTable);
    }

    function displayTotals(totals, table) {
        for (let category in totals) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category}</td>
                <td>${totals[category].toFixed(2)}</td>
            `;
            table.appendChild(row);
        }
    }

    loadTransactions();
});

document.addEventListener('DOMContentLoaded', () => {
    const incomeTable = document.getElementById('income-table');
    const expenseTable = document.getElementById('expense-table');
    const totalIncomeElem = document.getElementById('total-income');
    const totalExpensesElem = document.getElementById('total-expenses');

    function loadTransactions() {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.transaction_title}</td>
                <td>${parseFloat(transaction.amount).toFixed(2)}</td>
            `;

            if (transaction.category === 'income') {
                incomeTable.appendChild(row);
                totalIncome += parseFloat(transaction.amount);
            } else if (transaction.category === 'expense') {
                expenseTable.appendChild(row);
                totalExpenses += parseFloat(transaction.amount);
            }
        });

        // Add total row for income
        const incomeTotalRow = document.createElement('tr');
        incomeTotalRow.innerHTML = `
            <td><strong>Total Income</strong></td>
            <td><strong>₦${totalIncome.toFixed(2)}</strong></td>
        `;
        incomeTable.appendChild(incomeTotalRow);

        // Add total row for expenses
        const expenseTotalRow = document.createElement('tr');
        expenseTotalRow.innerHTML = `
            <td><strong>Total Expenses</strong></td>
            <td><strong>₦${totalExpenses.toFixed(2)}</strong></td>
        `;
        expenseTable.appendChild(expenseTotalRow);

        // Update total amounts at the bottom of the page
        totalIncomeElem.textContent = totalIncome.toFixed(2);
        totalExpensesElem.textContent = totalExpenses.toFixed(2);

        generatePieChart(totalIncome, totalExpenses)
    }

    function generatePieChart(totalIncome, totalExpenses) {
        const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
        const incomeExpenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    label: 'Income vs Expenses',
                    data: [totalIncome, totalExpenses],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)', // Income color
                        'rgba(255, 99, 132, 0.6)'  // Expenses color
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });
                            }
                        }
                    }
                }
            }
        });
    }

    loadTransactions();
});
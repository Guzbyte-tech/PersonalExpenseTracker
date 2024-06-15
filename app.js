// app.js
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('transaction-form');
    const transactionTable = document.getElementById('transaction-table');

    const addTransaction = (transaction) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', transaction.id)
        row.innerHTML = `
            <td>${transaction.category}</td>
            <td>${transaction.transaction_title}</td>
            <td>${transaction.amount}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;

        transactionTable.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTransaction(transaction.id)
            row.remove();
        });
    }

    const saveTransaction = (transaction) => {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    const loadTransactions = () => {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.forEach(transaction => addTransaction(transaction));
    }

    function deleteTransaction(id) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions = transactions.filter(transaction => transaction.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }



    loadTransactions()

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const transaction_title = document.getElementById('transaction_title').value;
        const amount = document.getElementById('amount').value;
        if (transaction_title === '' || amount === '') {
            alert('Please fill in all fields');
            return;
        }        
        const transaction = {
            id: Date.now(),
            category,
            transaction_title,
            amount,
        }
        console.log(transaction)
        addTransaction(transaction);
        saveTransaction(transaction);
        form.reset();
    });


});

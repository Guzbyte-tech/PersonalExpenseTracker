// app.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionTable = document.getElementById('transaction-table');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;

        if (category === '' || amount === '') {
            alert('Please fill in all fields');
            return;
        }

        addTransaction(type, category, amount);
        form.reset();
    });

    function addTransaction(type, category, amount) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${type}</td>
            <td>${category}</td>
            <td>${amount}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;

        transactionTable.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
        });
    }
});

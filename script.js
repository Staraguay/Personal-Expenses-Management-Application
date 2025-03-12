// Dummy Data (Replace with actual functionality later)
let totalIncome = 2000;
let totalExpenses = 500;

// Function to update dashboard values
function updateDashboard() {
    document.getElementById("income").innerText = `$${totalIncome}`;
    document.getElementById("expenses").innerText = `$${totalExpenses}`;
    document.getElementById("balance").innerText = `$${totalIncome - totalExpenses}`;
}

// Show dashboard (default)
function showDashboard() {
    alert("Showing Dashboard");
}

// Show transactions (Placeholder function)
function showTransactions() {
    alert("Redirecting to Transactions Page...");
}

// Show settings (Placeholder function)
function showSettings() {
    alert("Redirecting to Settings Page...");
}

// Initialize dashboard on load
document.addEventListener("DOMContentLoaded", updateDashboard);

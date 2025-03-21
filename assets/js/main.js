// Function to Save Settings
function saveSettings() {
  const currency = document.getElementById("currency").value;
  const nickname = document.getElementById("nickname").value.trim();
  const job = document.getElementById("job").value.trim();

  // Store in LocalStorage
  localStorage.setItem("currency", currency);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("job", job);

  // Show confirmation message
  const message = document.getElementById("savedMessage");
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

// Function to Load Saved Settings
function loadSettings() {
  document.getElementById("currency").value = localStorage.getItem("currency") || "USD";
  document.getElementById("nickname").value = localStorage.getItem("nickname") || "";
  document.getElementById("job").value = localStorage.getItem("job") || "";
}
// Load settings when page loads
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("main.js loaded");
});

const firstitem = {
  "id": 1,
  "transaction": "Report 1",
  "Amount" : 1000,
  "Category" : "Category 1",
  "Date" : "2025-01-01",
}
const Secoitem = {
  "id": 2,
  "transaction": "Report 2",
  "Amount" : 1000,
  "Category" : "Category 2",
  "Date" : "2025-01-01",
}  
const ListTransactions = [
  firstitem, Secoitem
]
$(document).ready(function () {
  
$("#list-transaction").DataTable(
  {
    data: ListTransactions,
    lengthMenu: [[10,25,50,100,-1],[10,25,50,100,"All"]],
    pageLength: 10,
    columns: [
      { data: 'id' },
      { data: 'transaction' },
      { data: 'Amount' },
      { data: 'Category' },
      { data: 'Date' },

    ]

  }
);
});

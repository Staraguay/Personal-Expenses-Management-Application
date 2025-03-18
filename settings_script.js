// Function to Save Settings
function saveSettings() {
    const currency = document.getElementById("currency").value;
    const nickname = document.getElementById("nickname").value;
    const job = document.getElementById("job").value;

    // Store in LocalStorage
    localStorage.setItem("currency", currency);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("job", job);

    // Show confirmation message
    document.getElementById("savedMessage").style.display = "block";
}

// Function to Load Saved Settings
function loadSettings() {
    document.getElementById("currency").value = localStorage.getItem("currency") || "USD";
    document.getElementById("nickname").value = localStorage.getItem("nickname") || "";
    document.getElementById("job").value = localStorage.getItem("job") || "";
}

// Load settings when page loads
document.addEventListener("DOMContentLoaded", loadSettings);

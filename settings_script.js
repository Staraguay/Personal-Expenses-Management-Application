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
document.addEventListener("DOMContentLoaded", loadSettings);

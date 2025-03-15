window.addEventListener("DOMContentLoaded", (event) => {
  console.log("main.js loaded");
});

// JS to render de donut graph in the dashboard

// Chart data
const firstColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--first-color').trim();
const secondColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--second-color').trim();
const thirdColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--third-color').trim();
const fourthColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--fourth-color').trim();
const fiveColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--five-color').trim();
const sixColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--six-color').trim();


const data = {
  labels: ["Grocery", "Transport", "Rent", "Bills", "Food", "Others"],
  datasets: [{
      data: [20, 15, 25, 10, 18, 12], // Percentages of each category
      backgroundColor: [firstColor, secondColor, thirdColor, fourthColor, fiveColor, sixColor],
      hoverOffset: 10
  }]
};

// Chart settings
const config = {
    type: "doughnut",
    data: data,
    options: {
        plugins: {
            legend: { display: false },
        },
        cutout: "60%" // Make the hole in the center
    }
};

// Render the graph
const myChart = new Chart(
    document.getElementById("myChart"),
    config
);

// Generate the custom legend
const legendContainer = document.getElementById("chartLegend");
data.labels.forEach((label, index) => {
    const legendItem = document.createElement("div");
    legendItem.className = "legend-child";
    legendItem.innerHTML = `<span style="background-color: ${data.datasets[0].backgroundColor[index]};"></span> ${label}`;
    legendContainer.appendChild(legendItem);
});
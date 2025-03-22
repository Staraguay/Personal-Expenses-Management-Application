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
//data initialization
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

//linechart option2

// data per moth
const dataIncoming = [65, 59, 80, 81, 56, 55, 40];
const dataExpenses = [115, 79, 18, 71, 62, 45, 0];

const labelsMix = ["Octuber","November","December","January","February","March","April"]
const dataMix = {
  labels: labelsMix,
  datasets: [
    {
      label: 'Expenses',
      data: dataExpenses,
      borderColor: 'rgb(235, 67, 52)',
      backgroundColor: 'rgba(235, 67, 52,0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Incomings',
      data: dataIncoming,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192,0.5)',
      yAxisID: 'y1',
    }
  ]
};

const totalDuration = 5000;
const delayBetweenPoints = totalDuration / dataMix.datasets[0].data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

const configMix = {
    type: 'line',
    data: dataMix,
    options: {
      animation,
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Incomings vs Expenses'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
  
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
  };

  const myChartMix = new Chart(
    document.getElementById("myChartMix"),
    configMix
);


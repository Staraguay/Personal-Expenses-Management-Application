import { getLocalStorageData } from "./libs/initializeMockData.js";

export const afterInitEvent = new Event("afterInitEvent");

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

    //add event listener to settings button
    const btnForm = document.getElementById("settingsBtn");
    if (btnForm) {
      btnForm.addEventListener("click", saveSettings);
    }

    // Function to Load Saved Settings
    function loadSettings() {
      if (document.getElementById("currency")) {
        document.getElementById("currency").value =
          localStorage.getItem("currency") || "USD";
        document.getElementById("nickname").value =
          localStorage.getItem("nickname") || "";
        document.getElementById("job").value =
          localStorage.getItem("job") || "";
      }
    }
    // Load settings when page loads
    window.addEventListener("DOMContentLoaded", (event) => {
      if(window.location.pathname === "/configurations/"){
        loadSettings();
      };
    });

window.addEventListener('afterInitEvent', ()=> {
  

 
     // color variables

    const firstColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--first-color")
      .trim();
    const secondColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--second-color")
      .trim();
    const thirdColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--third-color")
      .trim();
    const fourthColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--fourth-color")
      .trim();
    const fiveColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--five-color")
      .trim();
    const sixColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--six-color")
      .trim();

    // generate a new color

    function generateNewColor() {
      let symbols, color;
      symbols = "0123456789ABCDEF";
      color = "#";

      for (let i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)];
      }

      return color;
    }

    // Render the donut graph in the dashboard
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      let labelsUnique = {};
      let last6monthsExpenses = {};
      let last6monthsIncomings = {};
      let donutColors = [];
      let totalExpenses = 0;
      let totalIncomings = 0;
      let totalExpensesLastMonth = 0;
      let totalIncomingsLastMonth = 0;
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      let currency = localStorage.getItem("currency");
      if (!currency) {
        currency = "USD";
      }

      document.getElementById(
        "date-period"
      ).innerHTML = `*${months[currentMonth]} data`;
      let nickname = document.getElementById("nickname");
      let jobTitle = document.getElementById("job");
      const savedNickname = localStorage.getItem("nickname");
      const savedJob = localStorage.getItem("job");

      savedNickname ? nickname.innerHTML = ` ${savedNickname}` : "";
      savedJob ? jobTitle.innerHTML = `-${savedJob}` : "";


      const data = getLocalStorageData();
      data.forEach((element) => {
        if (
          element["transaction"] == "expense" &&
          new Date(element["date"].replace(/-/g, "/")).getMonth() ===
            currentMonth
        ) {
          labelsUnique[element["category"]] = 0;
          totalExpenses += Number(element["amount"]);
        } else if (
          element["transaction"] == "incomings" &&
          new Date(element["date"].replace(/-/g, "/")).getMonth() ===
            currentMonth
        ) {
          totalIncomings += Number(element["amount"]);
        } else if (
          element["transaction"] == "expense" &&
          new Date(element["date"].replace(/-/g, "/")).getMonth() ===
            currentMonth - 1
        ) {
          // get the last month stadistics
          totalExpensesLastMonth += Number(element["amount"]);
        } else if (
          element["transaction"] == "incomings" &&
          new Date(element["date"].replace(/-/g, "/")).getMonth() ===
            currentMonth - 1
        ) {
          // get the last month stadistics
          totalIncomingsLastMonth += Number(element["amount"]);
        }
      });

      // get the percentage per each unique label
      Object.keys(labelsUnique).forEach((label) => {
        let sum = 0;

        data.forEach((element) => {
          if (
            element["transaction"] == "expense" &&
            element["category"] == label &&
            new Date(element["date"].replace(/-/g, "/")).getMonth() ===
              currentMonth
          ) {
            sum += Number(element["amount"]);
          }
        });

        labelsUnique[label] = (sum / totalExpenses) * 100;
      });

      // generate random colors
      for (let i = 0; i < Object.keys(labelsUnique).length; i++) {
        let newColor = generateNewColor();
        if (!donutColors[newColor]) {
          donutColors.push(generateNewColor());
        }
      }

      // configuration of graph
      const chartData = {
        labels: Object.keys(labelsUnique), // unique labels
        datasets: [
          {
            data: Object.values(labelsUnique), // Percentages of each category
            backgroundColor: donutColors, // arrays of unique random colors
            hoverOffset: 10,
          },
        ],
      };

      // Chart settings
      const config = {
        type: "doughnut",
        data: chartData,
        options: {
          plugins: {
            legend: { display: false },
          },
          cutout: "60%", // Make the hole in the center
        },
      };

      //render de donut
      const myChart = new Chart(document.getElementById("myChart"), config);

      // Generate the custom legend for the donut
      const legendContainer = document.getElementById("chartLegend");
      chartData.labels.forEach((label, index) => {
        const legendItem = document.createElement("div");
        legendItem.className = "legend-child";
        legendItem.innerHTML = `<span style="background-color: ${chartData.datasets[0].backgroundColor[index]};"></span> ${label}`;
        legendContainer.appendChild(legendItem);
      });

      // fill the main cards
      document.getElementById(
        "total-expenses"
      ).innerHTML = `${new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: currency,
      }).format(totalExpenses)}`;
      document.getElementById(
        "total-incomings"
      ).innerHTML = `${new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: currency,
      }).format(totalIncomings)}`;
      //get the biggest expense
      let sortedExpensesArray = Object.entries(labelsUnique).sort(
        (a, b) => b[1] - a[1]
      );
      document.getElementById(
        "biggest-expense-category"
      ).innerHTML = `in ${sortedExpensesArray[0][0]}`;
      let max = (Number(sortedExpensesArray[0][1]) * totalExpenses) / 100;
      document.getElementById(
        "biggest-expense"
      ).innerHTML = `${new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: currency,
      }).format(max)}`;
      //get last month stadistics
      let stadisticsExpenses = 0;
      if (totalExpensesLastMonth > 0) {
        stadisticsExpenses = (
          ((totalExpenses - totalExpensesLastMonth) / totalExpensesLastMonth) *
          100
        ).toFixed(2);
      }
      document.getElementById(
        "stadistics-expenses"
      ).innerHTML = `${stadisticsExpenses}% than the previous month`;
      let stadisticsIncomings = 0;
      if (totalIncomingsLastMonth > 0) {
        stadisticsIncomings = (
          ((totalIncomings - totalIncomingsLastMonth) /
            totalIncomingsLastMonth) *
          100
        ).toFixed(2);
      }
      document.getElementById(
        "stadistics-incomings"
      ).innerHTML = `${stadisticsIncomings}% than the previous month`;

      // Init the dictinaries of historical data
      for (let i = 1; i <= 6; i++) {
        let monthIndex = (currentMonth - i + 12) % 12;
        let yearOffset = currentMonth - i < 0 ? -1 : 0;
        let monthKey = `${currentYear + yearOffset}-${String(
          monthIndex + 1
        ).padStart(2, "0")}`;

        last6monthsExpenses[monthKey] = 0;
        last6monthsIncomings[monthKey] = 0;
      }

      // get the sum of each last 6 months
      data.forEach((element) => {
        let dateObj = new Date(element["date"].replace(/-/g, "/"));
        let elementMonth = dateObj.getMonth();
        let elementYear = dateObj.getFullYear();

        let monthKey = `${elementYear}-${String(elementMonth + 1).padStart(
          2,
          "0"
        )}`;

        if (
          last6monthsExpenses.hasOwnProperty(monthKey) &&
          element["transaction"] === "expense"
        ) {
          last6monthsExpenses[monthKey] += Number(element["amount"]);
        } else if (
          last6monthsIncomings.hasOwnProperty(monthKey) &&
          element["transaction"] === "incomings"
        ) {
          last6monthsIncomings[monthKey] += Number(element["amount"]);
        }
      });

      //sort the dic base on the date
      let sorted6mExpenses = Object.fromEntries(
        Object.entries(last6monthsExpenses).sort(
          (a, b) => new Date(a[0]) - new Date(b[0])
        )
      );

      let sorted6mIncomings = Object.fromEntries(
        Object.entries(last6monthsIncomings).sort(
          (a, b) => new Date(a[0]) - new Date(b[0])
        )
      );

      //linechart option2

      // data per moth
      const dataIncoming = Object.values(sorted6mExpenses);
      const dataExpenses = Object.values(sorted6mIncomings);

      const labelsMix = Object.keys(sorted6mExpenses);
      const dataMix = {
        labels: labelsMix,
        datasets: [
          {
            label: "Expenses",
            data: dataExpenses,
            borderColor: "rgb(235, 67, 52)",
            backgroundColor: "rgba(235, 67, 52,0.5)",
            yAxisID: "y",
          },
          {
            label: "Incomings",
            data: dataIncoming,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192,0.5)",
            yAxisID: "y1",
          },
        ],
      };

      // animation for the graph
      const totalDuration = 5000;
      const delayBetweenPoints =
        totalDuration / dataMix.datasets[0].data.length;
      const previousY = (ctx) =>
        ctx.index === 0
          ? ctx.chart.scales.y.getPixelForValue(100)
          : ctx.chart
              .getDatasetMeta(ctx.datasetIndex)
              .data[ctx.index - 1].getProps(["y"], true).y;
      const animation = {
        x: {
          type: "number",
          easing: "linear",
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx) {
            if (ctx.type !== "data" || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
        y: {
          type: "number",
          easing: "linear",
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx) {
            if (ctx.type !== "data" || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
      };

      //configuration of the graph
      const configMix = {
        type: "line",
        data: dataMix,
        options: {
          animation,
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: "Incomings vs Expenses",
            },
          },
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",

              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          },
        },
      };
      // render the graph
      const myChartMix = new Chart(
        document.getElementById("myChartMix"),
        configMix
      );
      // resize canvas
      window.addEventListener("resize", () => {
        myChartMix.resize();
      });
    } 
})




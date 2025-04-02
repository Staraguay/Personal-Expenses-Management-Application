import { getLocalStorageData } from "../libs/initializeMockData.js";

const setDataToList = () => {
  const listElement = $("#list-transaction");
  const items = getLocalStorageData();

  listElement.DataTable({
    order: [[5, "desc"]],
    data: items,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "transaction" },
      { data: "category" },
      { data: "amount", render: (data, type, row) =>{

        let currencySetting = localStorage.getItem("currency");
        if (!currencySetting) {
          currencySetting = "USD";
        }
        return `${new Intl.NumberFormat(navigator.language, {style: "currency", currency: currencySetting,}).format(data)}`
        } 
      },
      { data: "date" },
      { data: "shop" },
      {
        data: null,
      render: (data, type, row) => {
        // Create a dynamic link using the row ID 
        const editLink = `../../../reports/edit/?id=${row.id}`;
          return `<a class='btn btn-outline-secondary' href='${editLink}'>Edit</a>`;
        },
      },
      
    ],
  });
};

const initialize = async () => {
  setDataToList();
};

window.addEventListener("DOMContentLoaded", () => {
  initialize();
});

const saveBtn = document.getElementById("saveData");
saveBtn.addEventListener("click", () => {

  const jsonData = JSON.stringify(getLocalStorageData(), null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sampleData.json";   
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);


});
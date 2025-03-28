import { getLocalStorageData } from "../libs/initializeMockData.js";

const setDataToList = () => {
  const listElement = $("#list-transaction");
  const items = getLocalStorageData();

  listElement.DataTable({
    order: [[3, "desc"]],
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
      { data: "amount" },
      { data: "date" },
      { data: "shop" },
      {
        data: null,
      render: (data, type, row) => {
        // Create a dynamic link using the row ID
        const editLink = `/reports/edit/?id=${row.id}`;
          return `<a class='btn btn-outline-primary' href='${editLink}'>Edit</a>`;
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

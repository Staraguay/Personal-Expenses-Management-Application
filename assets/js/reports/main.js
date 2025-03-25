import { getLocalStorageData } from "../libs/initializeMockData.js";

const setDataToList = () => {
  const listElement = $("#list-transaction");
  const items = getLocalStorageData();

  listElement.DataTable({
    data: items,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    columns: [
      { data: "id" },
      { data: "transaction" },
      { data: "amount" },
      { data: "category" },
      { data: "date" },
    ],
  });
};

const initialize = async () => {
  setDataToList();
};

window.addEventListener("DOMContentLoaded", () => {
  initialize();
});

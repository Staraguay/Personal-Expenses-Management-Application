// function to read de JSON data
const loadData = async () => {
  try {
    const response = await fetch("../../sampleData.json");
    return await response.json();
  } catch (error) {
    return console.error("Error al cargar el JSON:", error);
  }
};

// function to read de JSON data
const setMockDataToLocalStorage = async () => {
  try {
    const response = await loadData();
    localStorage.setItem("reportData", JSON.stringify(response));
  } catch (error) {
    return console.error("Error al cargar el JSON:", error);
  }
};

const checkDataLocalStorage = () => {
  const array = localStorage.getItem("reportData");

  if (array) {
    return true;
  } else {
    return false;
  }
};

const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("reportData"));
};

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
  if (!checkDataLocalStorage()) {
    await setMockDataToLocalStorage();
  }

  setDataToList();
};

window.addEventListener("DOMContentLoaded", (event) => {
  initialize();
});

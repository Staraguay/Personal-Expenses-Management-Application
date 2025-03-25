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

export const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("reportData"));
};

export const initialize = async () => {
  if (!checkDataLocalStorage()) {
    await setMockDataToLocalStorage();
  }
};

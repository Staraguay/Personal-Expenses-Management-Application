// function to read de JSON data
// const loadData = async () => {
//   try {
//     const response = await fetch("../../sampleData.json");
//     return await response.json();
//   } catch (error) {
//     return console.error("Error al cargar el JSON:", error);
//   }
// };

function readJSONfile(event) {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    if (!file) {
      reject("No se seleccionó ningún archivo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        console.log("Datos cargados:", data);
        resolve(data);
      } catch (error) {
        reject("Error al leer el JSON: " + error);
      }
    };
    reader.readAsText(file);
  });
}


const setMockDataToLocalStorage = async (event) => {
  try {
    const data = await readJSONfile(event); 
    localStorage.setItem("reportData", JSON.stringify(data));
    
    const modalEl = document.getElementById("JSONmodal");
    
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkDataLocalStorage = () => {
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

export const initialize = () => {

  const JSONmodal = document.getElementById("JSONmodal");

  if(!checkDataLocalStorage()){
    // Button to load the file
    document.getElementById("inputJSON").addEventListener("change", setMockDataToLocalStorage);
    // button to start from scratch
    document.getElementById("scratch").addEventListener("click", () =>{

      const modalEl = document.getElementById("JSONmodal");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
        location.reload();
      }
      localStorage.setItem("reportData", JSON.stringify([]));
    });

    // Create a Bootstrap modal instance
    const modalInstance = new bootstrap.Modal(JSONmodal);
    modalInstance.show();
  }
};

import Toast from "../../libs/Toast.js";

window.addEventListener("DOMContentLoaded", (event) => {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }

  const form = document.getElementById("form-create");
  const toast = new Toast({
    toastId: "liveToast",
  });
  // Get the modal element
  const modalElement = document.getElementById("exampleModal");
  // Create a Bootstrap modal instance
  const modalInstance = new bootstrap.Modal(modalElement);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const category = formData.get("category");
    const price = formData.get("price");
    const date = formData.get("date");
    const shop = formData.get("shop");
    const payment = formData.get("paymentType");

    const formValues = {
      name,
      category,
      price,
      date,
      shop,
      payment,
    };

    // Store form values in localStorage
    const array = localStorage.getItem("reportData");

    if (array) {
      const reportData = JSON.parse(array);
      console.log(reportData);
      reportData.push(formValues);
      localStorage.setItem("reportData", JSON.stringify(reportData));
    } else {
      const reportData = [formValues];
      localStorage.setItem("reportData", JSON.stringify(reportData));
    }

    modalInstance.hide();
    toast.show();
  });
});

import Toast from "../../libs/Toast.js";
import { TYPE, switchCategoryType, trackTransaction } from "../libs/common.js";

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
    const amount = formData.get("amount");
    const date = formData.get("date");
    const shop = formData.get("shop");
    const transaction = formData.get("transaction");

    const formValues = {
      name,
      transaction,
      amount,
      category,
      date,
      shop,
    };

    // Store form values in localStorage
    const array = localStorage.getItem("reportData");

    if (array) {
      const reportData = JSON.parse(array);

      const ids = reportData.map((item) => {
        return Number(item.id);
      });
      const latestId = Math.max(...ids);

      const data = {
        id: `${latestId + 1}`,
        ...formValues,
      };

      const newData = [...reportData, data];
      localStorage.setItem("reportData", JSON.stringify(newData));
    } else {
      const reportData = [formValues];
      localStorage.setItem("reportData", JSON.stringify(reportData));
    }

    modalInstance.hide();
    toast.show();
  });

  switchCategoryType(TYPE.expense);
  trackTransaction();
});

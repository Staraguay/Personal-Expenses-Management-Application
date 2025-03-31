import Toast from "../../libs/Toast.js";
import { getLocalStorageData } from "../../libs/initializeMockData.js";
import {
  TYPE,
  switchCategoryType,
  trackTransaction,
  handleCurrency,
} from "../libs/common.js";

window.addEventListener("DOMContentLoaded", (event) => {
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");

  // Get the modal element
  const modalElement = document.getElementById("exampleModal");
  // Create a Bootstrap modal instance
  const modalInstance = new bootstrap.Modal(modalElement);

  let reportId = null;

const submit = (e) => {
  e.preventDefault();

  const toast = new Toast({
    toastId: "liveToast",
  });
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
    const data = {
      id: `${reportId}`,
      ...formValues,
    };

    const reportData = JSON.parse(array);
    const newReportData = reportData.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    localStorage.setItem("reportData", JSON.stringify(newReportData));
  } else {
    const reportData = [formValues];
    localStorage.setItem("reportData", JSON.stringify(reportData));
  }

  toast.show();
  modalInstance.hide();
};

const getUrlParamsId = () => {
  // Get the current URL's query string
  const queryString = window.location.search;

  // Parse the query string
  const urlParams = new URLSearchParams(queryString);

  // Get specific parameters
  const id = urlParams.get("id"); // "123"

  return id;
};

const initialize = () => {
  reportId = getUrlParamsId();

  const items = getLocalStorageData();
  const targetItem = items.find((item) => item.id === reportId);

  const nameElement = document.getElementById("nameInput");
  const categoryElement = document.getElementById("categorySelect");
  const amountElement = document.getElementById("amountInput");
  const dateElement = document.getElementById("dateInput");
  const shopElement = document.getElementById("shopInput");
  const transactionElement = document.getElementById("transactionSelect");

  switchCategoryType(
    targetItem.transaction === TYPE.income ? "income" : "expense"
  );

  if (targetItem) {
    nameElement.value = targetItem.name;
    categoryElement.value = targetItem.category;
    amountElement.value = targetItem.amount;
    dateElement.value = targetItem.date;
    shopElement.value = targetItem.shop;
    transactionElement.value = targetItem.transaction;
  }

  trackTransaction();
  handleCurrency();
};

  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }

  initialize();

  const form = document.getElementById("form-edit");
  form.addEventListener("submit", submit);
});

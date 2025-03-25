import Toast from "../../libs/Toast.js";
import { getLocalStorageData } from "../../libs/initializeMockData.js";

const TYPE = {
  income: "incoming",
  expense: "expense",
};

const submit = (e) => {
  e.preventDefault();

  const toast = new Toast({
    toastId: "liveToast",
  });
  // Get the modal element
  const modalElement = document.getElementById("exampleModal");
  // Create a Bootstrap modal instance
  const modalInstance = new bootstrap.Modal(modalElement);
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
  const id = getUrlParamsId();
  const items = getLocalStorageData();
  const targetItem = items.find((item) => item.id === id);

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
};

const switchCategoryType = (type) => {
  const incomeDataName = "[data-category-type='incoming']";
  const expenseDataName = "[data-category-type='expense']";

  const target = {
    display: type === TYPE.expense ? expenseDataName : incomeDataName,
    hide: type === TYPE.expense ? incomeDataName : expenseDataName,
  };

  const optionsDisplay = document.querySelectorAll(target.display);
  const optionsHide = document.querySelectorAll(target.hide);

  Array.from(optionsDisplay).forEach((option) => {
    option.style.display = "block";
  });

  Array.from(optionsHide).forEach((option) => {
    option.style.display = "none";
  });
};

const trackTransaction = () => {
  const transactionElement = document.getElementById("transactionSelect");
  const categoryElement = document.getElementById("categorySelect");

  transactionElement.addEventListener("change", (e) => {
    const value = e.target.value;
    categoryElement.value = "0";
    switchCategoryType(value);
  });
};

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

  initialize();

  const form = document.getElementById("form-create");
  form.addEventListener("submit", submit);
});

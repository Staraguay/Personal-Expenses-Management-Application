export const TYPE = {
  income: "incoming",
  expense: "expense",
};

export const switchCategoryType = (type) => {
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

export const trackTransaction = () => {
  const transactionElement = document.getElementById("transactionSelect");
  const categoryElement = document.getElementById("categorySelect");

  transactionElement.addEventListener("change", (e) => {
    const value = e.target.value;
    categoryElement.value = "0";
    switchCategoryType(value);
  });
};

const cash = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const purchaseBtn = document.querySelector("#purchase-btn");
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

purchaseBtn.addEventListener("click", () => {
  const cashValue = Number(cash.value);
  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashValue === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    console.log(cashValue === price);
  } else {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    console.log("cash value: ", cashValue, "price: ", price);
  }
});

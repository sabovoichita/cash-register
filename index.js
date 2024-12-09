const cash = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const purchaseBtn = document.querySelector("#purchase-btn");
const priceScreen = document.getElementById("price-screen");

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

const DENOMINATIONS = [
  { name: "ONE HUNDRED", value: 10000 },
  { name: "TWENTY", value: 2000 },
  { name: "TEN", value: 1000 },
  { name: "FIVE", value: 500 },
  { name: "ONE", value: 100 },
  { name: "QUARTER", value: 25 },
  { name: "DIME", value: 10 },
  { name: "NICKEL", value: 5 },
  { name: "PENNY", value: 1 },
];

const handlePurchase = () => {
  const cashInput = Number(cash.value);

  if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashInput === price) {
    const display = changeDue;
    display.innerHTML = "No change due - customer paid with exact cash";
    return;
  }
};

const updatePriceDisplay = () => {
  priceScreen.textContent = `Total: $${price.toFixed(2)}`;
};

purchaseBtn.addEventListener("click", handlePurchase);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlePurchase();
  }
});

updatePriceDisplay();

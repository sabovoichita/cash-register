const cash = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const purchaseBtn = document.querySelector("#purchase-btn");
const drawerDisplay = document.getElementById("cash-drawer-display");
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

const calculateChange = (price, cash, cashInDrawer) => {
  const changeDue = Math.round((cash - price) * 100);
  let remainingChange = changeDue;
  // console.log("Change Due in cents:", changeDue);
  const totalDrawer = cashInDrawer.reduce(
    (sum, [_, amount]) => sum + Math.round(amount * 100),
    0
  );
  // console.log("Total Cash in Drawer (cents):", totalDrawer);

  if (remainingChange > totalDrawer) {
    // console.log("Not enough money in the drawer to provide change.");
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  const changeArray = DENOMINATIONS.map((denom) => {
    const [denomName, totalAvailable] = cashInDrawer.find(
      ([name]) => name === denom.name
    ) || [denom.name, 0];
    const totalAvailableCents = Math.round(totalAvailable * 100);
    // console.log(`\nChecking ${denomName}:`);
    // console.log("Total Available (cents):", totalAvailableCents);

    const amountToGive = Math.min(
      Math.floor(remainingChange / denom.value) * denom.value,
      totalAvailableCents
    );
    // console.log("Amount to Give (cents):", amountToGive);

    remainingChange -= amountToGive;
    // console.log("Remaining Change (cents):", remainingChange);

    return [denomName, amountToGive / 100];
  }).filter(([_, amount]) => amount > 0);

  if (remainingChange > 0) {
    // console.log(
    //   "Cannot provide exact change. Remaining Change (cents):",
    //   remainingChange
    // );
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  const remainingDrawer = cashInDrawer.reduce((sum, [_, amount], i) => {
    const remainingForDenom =
      Math.round(amount * 100) - (changeArray[i]?.[1] || 0) * 100;
    // console.log(
    //   `Remaining in drawer for ${cashInDrawer[i][0]}:`,
    //   remainingForDenom / 100
    // );
    return sum + remainingForDenom;
  }, 0);

  const status = remainingDrawer === 0 ? "CLOSED" : "OPEN";
  // console.log("Remaining Drawer Total (cents):", remainingDrawer);
  // console.log("Final Status:", status);
  return {
    status,
    change: changeArray,
  };
};

// Pure function to update the UI state
const updateCashDrawer = (cashInDrawer, change) =>
  cashInDrawer.map(([denomination, amount]) => {
    const changeForDenom =
      change.find(([name]) => name === denomination)?.[1] || 0;
    return [denomination, Math.round((amount - changeForDenom) * 100) / 100];
  });

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

  const result = calculateChange(price, cashInput, cid);
  displayChange(result);

  // Update drawer if status is OPEN
  if (result.status === "OPEN") {
    cid = updateCashDrawer(cid, result.change);
    displayDrawer(cid);
  }
};

// Helper functions for UI updates
const displayChange = ({ status, change }) => {
  const display = changeDue;
  display.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(([denomination, amount]) => {
    display.innerHTML += `<p>${denomination}: $${amount.toFixed(2)}</p>`;
  });
};

const displayDrawer = (cashDrawer) => {
  drawerDisplay.innerHTML = cashDrawer
    .map(
      ([denomination, amount]) =>
        `<p>${denomination}: $${amount.toFixed(2)}</p>`
    )
    .join("");
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
displayDrawer(cid);

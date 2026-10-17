
"use strict";

// Sample cart data
const cartItems = [
  { name: "Notebook", price: 1500, qty: 2 },
  { name: "Pen", price: 300, qty: 5 },
  { name: "Bag", price: 12000, qty: 1 }
];

// Select HTML elements
const cartTable = document.querySelector("#cart-items");
const calculateButton = document.querySelector("#calculate-btn");
const clearButton = document.querySelector("#clear-btn");
const cartResult = document.querySelector("#cart-result");

const consoleButton = document.querySelector("#console-btn");

const saveStorageButton = document.querySelector("#save-storage-btn");
const readStorageButton = document.querySelector("#read-storage-btn");
const clearStorageButton = document.querySelector("#clear-storage-btn");
const storageResult = document.querySelector("#storage-result");

// Display cart items in the table
function renderCart() {
  cartTable.innerHTML = "";

  cartItems.forEach(function (item) {
    const row = document.createElement("tr");
    row.className = "border-b border-slate-100";

    const nameCell = document.createElement("td");
    nameCell.className = "py-4 pr-4 font-medium";
    nameCell.textContent = item.name;

    const priceCell = document.createElement("td");
    priceCell.className = "py-4 pr-4";
    priceCell.textContent = item.price.toLocaleString() + " RWF";

    const qtyCell = document.createElement("td");
    qtyCell.className = "py-4";
    qtyCell.textContent = item.qty;

    row.append(nameCell, priceCell, qtyCell);
    cartTable.appendChild(row);
  });
}

// Calculate subtotal
function getSubtotal(items) {
  let subtotal = 0;

  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }

  return subtotal;
}

// Return the discount rate
function getDiscount(subtotal) {
  if (subtotal > 20000) {
    return 0.2;
  }

  if (subtotal > 10000) {
    return 0.1;
  }

  return 0;
}

// Calculate the final total
function getTotal(items) {
  const subtotal = getSubtotal(items);
  const discountRate = getDiscount(subtotal);
  const discountAmount = subtotal * discountRate;

  return {
    subtotal,
    discountRate,
    discountAmount,
    total: subtotal - discountAmount
  };
}

// Format Rwandan francs
function formatRWF(amount) {
  return amount.toLocaleString("en-US") + " RWF";
}

// Calculate button
calculateButton.addEventListener("click", function () {
  console.group("Cart calculation");

  const result = getTotal(cartItems);

  console.log("Cart items:", cartItems);
  console.log("Subtotal:", result.subtotal);
  console.log("Discount rate:", result.discountRate);
  console.log("Discount amount:", result.discountAmount);
  console.log("Final total:", result.total);

  console.groupEnd();

  cartResult.textContent =
    "Subtotal: " + formatRWF(result.subtotal) +
    " | Discount: " + formatRWF(result.discountAmount) +
    " | Final total: " + formatRWF(result.total);

  cartResult.className =
    "mt-5 rounded-lg bg-emerald-50 p-4 text-emerald-900";
});

// Clear the displayed calculation
clearButton.addEventListener("click", function () {
  cartResult.textContent = "Click Calculate total to start.";
  cartResult.className = "mt-5 rounded-lg bg-slate-100 p-4 text-slate-700";
});

consoleButton.addEventListener("click", function () {
  console.count("Count this click");
});

saveStorageButton.addEventListener("click", function () {
  const sampleData = {
    workshop: "Week 4 Debugging Workshop",
    student: "Practice Student",
    completed: false
  };

  try {
    localStorage.setItem("debugWorkshop", JSON.stringify(sampleData));

    storageResult.textContent =
      "Sample data saved successfully. Open DevTools → Application → Local Storage.";
    storageResult.className =
      "mt-4 break-words rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900";

    console.log("Saved data:", sampleData);
  } catch (error) {
    console.error("Could not save data:", error);
    storageResult.textContent = "Unable to save data. Check the Console.";
  }
});

readStorageButton.addEventListener("click", function () {
  try {
    const savedData = localStorage.getItem("debugWorkshop");

    if (savedData === null) {
      storageResult.textContent = "No saved data found. Click Save sample data first.";
      return;
    }

    const parsedData = JSON.parse(savedData);
    storageResult.textContent = JSON.stringify(parsedData, null, 2);

    console.table([parsedData]);
  } catch (error) {
    console.error("Could not read saved data:", error);
    storageResult.textContent = "Unable to read saved data. Check the Console.";
  }
});

clearStorageButton.addEventListener("click", function () {
  localStorage.removeItem("debugWorkshop");
  storageResult.textContent = "Saved workshop data has been cleared.";
});

renderCart();

console.log("DebugLab is ready.");

const menuButton = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", function () {
    const isExpanded =
      menuButton.getAttribute("aria-expanded") === "true";

    mobileMenu.classList.toggle("hidden");

    menuButton.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    menuButton.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

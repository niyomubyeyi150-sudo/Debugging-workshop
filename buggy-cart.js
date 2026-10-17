
"use strict";

const cart = [
  // FIX 1: The original price was "1500", a string.
  // Multiplication worked through automatic type conversion,
  // but prices should be stored as numbers.
  { name: "Notebook", price: 1500, qty: 2 },
  { name: "Pen", price: 300, qty: 5 },
  { name: "Bag", price: 12000, qty: 1 }
];

function getSubtotal(items) {
  let subtotal = 0;

  // FIX 2: The original condition was i <= items.length.
  // That accessed an index beyond the last item and caused
  // an error when reading properties of undefined.
  // The error was identified by inspecting i and items[i]
  // while stepping through the loop in DevTools.
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }

  return subtotal;
}

function getDiscount(subtotal) {
  // FIX 3: Check the higher discount first.
  // The original 10% condition matched totals above 20000
  // before the 20% condition could be reached.
  // This was identified by testing a subtotal above 20000.
  if (subtotal > 20000) {
    return 0.2;
  }

  if (subtotal > 10000) {
    return 0.1;
  }

  return 0;
}

function getTotal(items) {
  const subtotal = getSubtotal(items);
  const discountRate = getDiscount(subtotal);

  // FIX 4: The original code subtracted the discount rate
  // directly from the subtotal. A rate such as 0.1 is not
  // the discount amount in money.
  // Calculate the actual discount amount before subtracting.
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  return total;
}

console.log("Final cart total:", getTotal(cart), "RWF");

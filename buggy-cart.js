"use strict";

// FIX 1: The original Notebook price was the string "1500".
// I found this by inspecting the cart data in DevTools.
// Prices should be numbers, so I changed "1500" to 1500.
const cart = [
  { name: "Notebook", price: 1500, qty: 2 },
  { name: "Pen", price: 300, qty: 5 },
  { name: "Bag", price: 12000, qty: 1 }
];

function getSubtotal(items) {
  let subtotal = 0;

  // FIX 2: The original loop used i <= items.length.
  // This allowed the loop to access an index outside the array.
  // I found the bug by stepping through the loop in DevTools
  // and checking the values of i and items[i].
  // Using i < items.length stops at the last valid index.
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }

  return subtotal;
}

function getDiscount(subtotal) {
  // FIX 3: The original code checked the 10% discount first.
  // A subtotal above 20000 also matched the condition above 10000,
  // so the 20% discount could never be applied.
  // I found this by testing a subtotal greater than 20000.
  // Checking the higher threshold first fixes the problem.
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

  // FIX 4: The original code subtracted the discount rate itself.
  // For example, 0.1 represents 10%, not the money to subtract.
  // I found the bug by checking the calculation of the final total.
  // Multiplying the subtotal by the rate gives the discount amount.
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  return total;
}

console.log("Final cart total:", getTotal(cart), "RWF");

"use strict";

const cart = [
  // Fix 3: Use a number for price to keep data consistent.
  { name: "Notebook", price: 1500, qty: 2 },
  { name: "Pen", price: 300, qty: 5 },
  { name: "Bag", price: 12000, qty: 1 }
];

function getSubtotal(items) {
  let subtotal = 0;

  // Fix 1: Use < instead of <=.
  // The last valid array index is items.length - 1.
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }

  return subtotal;
}

function getDiscount(subtotal) {
  // Fix 2: Check the higher threshold first.
  // Otherwise, a subtotal above 20000 would match the 10000 condition first.
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

  // Fix 3: Convert the percentage rate into a money amount.
  // Subtracting 0.1 directly would subtract only 0.1, not 10%.
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  return total;
}

console.log("Final cart total:", getTotal(cart));

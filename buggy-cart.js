
"use strict";

const cart = [
 
  { name: "Notebook", price: 1500, qty: 2 },
  { name: "Pen", price: 300, qty: 5 },
  { name: "Bag", price: 12000, qty: 1 }
];

function getSubtotal(items) {
  let subtotal = 0;

  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }

  return subtotal;
}

function getDiscount(subtotal) {
  
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
  const discountRate = getDiscount(subtotal)

  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  return total;
}

console.log("Final cart total:", getTotal(cart));

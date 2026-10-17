
"use strict";

// 1. Students array for console.table()
const students = [
  { name: "Aline", age: 20, score: 85 },
  { name: "Eric", age: 22, score: 90 },
  { name: "Diane", age: 21, score: 78 }
];

// Display the students as a table in the Console
console.log("Students list:");
console.table(students);


// 2. Measure the time taken by a loop of 1,000,000 iterations
console.time("One million iterations");

let total = 0;

for (let i = 0; i < 1000000; i++) {
  total += i;
}

console.timeEnd("One million iterations");
console.log("Loop result:", total);


// 3. Use console.count() to count function calls
function renderPage() {
  console.count("render");
}

renderPage();
renderPage();
renderPage();


// Additional Console practice from the workshop
const price = 1000;
const qty = 3;
const cartTotal = price * qty;

console.log("Cart total:", cartTotal);
console.log({ price, qty, cartTotal });

console.warn("This is a warning example.");
console.error("This is an error example.");

console.group("Checkout");
console.log("Price:", price);
console.log("Quantity:", qty);
console.log("Total:", cartTotal);
console.groupEnd();


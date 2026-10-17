
"use strict";

const students = [
  { name: "Aline", marks: 85 },
  { name: "Eric", marks: 72 },
  { name: "Diane", marks: 91 }
];

// Show an array of objects in a table
console.table(students);

// Show values with meaningful labels
const price = 1500;
const quantity = 2;
const total = price * quantity;

console.log("Price:", price);
console.log({ price, quantity, total });

// Show a warning and an error example
console.warn("Practice warning: check your input.");
console.error("Practice error: this is an example.");

// Group related messages
console.group("Student results");
console.log("Number of students:", students.length);
console.log("First student:", students[0].name);
console.groupEnd();

// Measure loop performance
console.time("One million iterations");

let sum = 0;

for (let i = 0; i < 1000000; i++) {
  sum += i;
}

console.timeEnd("One million iterations");
console.log("Loop sum:", sum);

// Test an assertion
console.assert(total > 0, "Total should be positive");

// Count function calls
function showStudent(name) {
  console.count("showStudent called");
  console.log("Student:", name);
}

showStudent("Aline");
showStudent("Eric");
showStudent("Diane");

# Week 4 Debugging Workshop — Exercise 1

## Snippet 1: Greeting

**Error type:** ReferenceError

**Broken code:**
javascript
const studentName = "Aline";
console.log("Welcome, " + studentname);


**What it means:** JavaScript cannot find the variable `studentname` because JavaScript is case-sensitive. The variable was declared as `studentName`.

**Fix:**
javascript
const studentName = "Aline";
console.log("Welcome, " + studentName);


## Snippet 2: Shouting

**Error type:** TypeError

**Broken code:**
javascript
const city = "Kigali";
console.log(city.toUppercase());


**What it means:** `toUppercase()` is not a valid string method. JavaScript uses the exact method name `toUpperCase()`.

**Fix:**
javascript
const city = "Kigali";
console.log(city.toUpperCase());


## Snippet 3: Page title

**Error type:** TypeError

**Broken code:**
```javascript
const title = document.querySelector("#page-titel");
title.textContent = "My Tasks";
```

**What it means:** The selector contains a spelling mistake. The actual element has the ID `page-title`, so `querySelector()` returns `null`. Setting `textContent` on `null` causes a TypeError.

**Fix:**
```javascript
const title = document.querySelector("#page-title");
title.textContent = "My Tasks";
```

## Snippet 4: Score counter

**Error type:** TypeError

**Broken code:**
```javascript
const score = 0;
score = score + 10;
console.log(score);
```

**What it means:** A variable declared with `const` cannot be reassigned. The program throws an error when it tries to change `score`.

**Fix:**
```javascript
let score = 0;
score = score + 10;
console.log(score);
```

## Snippet 5: Shopping list

**Error type:** SyntaxError

**Broken code:**
```javascript
const fruits = ["mango", "avocado" "banana"];
console.log(fruits.length);
```

**What it means:** A comma is missing between `"avocado"` and `"banana"`. JavaScript cannot parse the array correctly, so the script fails before it runs.

**Fix:**
```javascript
const fruits = ["mango", "avocado", "banana"];
console.log(fruits.length);
```

## Snippet 6: Countdown

**Error type:** RangeError (Maximum call stack size exceeded)

**Broken code:**
```javascript
function countdown(n) {
  console.log(n);
  countdown(n - 1);
}
countdown(5);
```

**What it means:** The function calls itself repeatedly without a stopping condition. The value keeps decreasing, but the function never stops, eventually exceeding the call stack limit.

**Fix:**
```javascript
function countdown(n) {
  if (n < 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(5);
```

The corrected function prints the numbers from 5 down to 0 and then stops.

## Conclusion

Chrome DevTools helps identify JavaScript errors by showing error messages, error types, and line numbers in the Console. Reading these messages and inspecting the code makes it easier to find the cause, correct the code, and test the solution.
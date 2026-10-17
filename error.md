# Week 4 Debugging Workshop
## Debugging and Browser DevTools Deep Dive

## 1. Introduction

The purpose of this workshop was to learn how to identify, understand, and fix JavaScript errors using a systematic debugging process. I practiced reading error messages, using the browser Console, inspecting variables, working with breakpoints, and testing Local Storage.

I also worked on a shopping cart program to understand how incorrect loop conditions, data types, discount conditions, and calculations can cause errors.

## 2. The Three Main Types of Bugs

### 2.1 Syntax Error

**Meaning:** A syntax error occurs when JavaScript code does not follow the correct language rules. The browser cannot parse the affected code correctly.

**Example of incorrect code:**

javascript
console.log("Hello"


**Cause:** The closing parenthesis is missing.

**Fix:**

javascript
console.log("Hello");


**How to identify it:** Check the Console for a `SyntaxError` message and inspect the line indicated by the error.

### 2.2 Runtime Error

**Meaning:** A runtime error occurs while JavaScript is executing.

**Example of incorrect code:**

javascript
let user;
console.log(user.name);


**Cause:** The variable `user` is `undefined`, so JavaScript cannot read its `name` property.

**Fix:**

javascript
let user = { name: "Nadine" };
console.log(user.name);


**How to identify it:** Read the error message in the Console, locate the relevant line, and inspect the variable's value in DevTools.

### 2.3 Logic Error

**Meaning:** A logic error occurs when the program runs but produces an incorrect result.

**Example:**

javascript
console.log("10" + 20);


**Problem:** The output is `"1020"` because the `+` operator joins the string and number.

**Fix:**

javascript
console.log(Number("10") + 20);


**Expected output:** `30`

**How to identify it:** Compare the actual output with the expected result. Use logging, breakpoints, and variable inspection to find the cause.


## 3. Exercise 1 — Six Error Explanations

The workshop instructions specify six broken snippets in the instructor's `errors.html` file. The original six snippets must be checked before their exact errors and fixes can be documented.

For each snippet, record the following:

1. **Error type:** Syntax, runtime, or logic error.
2. **Meaning:** What is wrong with the code.
3. **Evidence:** The Console message, line number, or unexpected result.
4. **Fix:** The corrected code and how it works.

**Important:** The six original snippets were not included in the project code shared for review. Their exact errors must be confirmed from `errors.html` before this section can be considered complete.

---

## 4. Exercise 2 — Console Practice

In `console-practice.js`, I practiced several Console methods.

| Console method | Purpose |
|---|---|
| `console.log()` | Displays messages and variable values. |
| `console.table()` | Displays arrays of objects in a table. |
| `console.warn()` | Displays a warning message. |
| `console.error()` | Displays an error message. |
| `console.group()` | Groups related messages together. |
| `console.time()` | Starts measuring execution time. |
| `console.timeEnd()` | Displays the elapsed time. |
| `console.assert()` | Displays an assertion message if a condition is false. |
| `console.count()` | Counts how many times a labelled operation runs. |

The program displays student records, calculates a sample total, measures a loop of one million iterations, and counts function calls.

**What I learned:** Console tools make it easier to inspect values, follow program execution, identify unexpected results, and measure execution time.


## 5. Exercise 3 — Shopping Cart Debugging

The original `buggy-cart.js` exercise contained three logic/runtime bugs and one risky data value.

### Bug 1: Incorrect loop condition

**Original code:**

javascript
for (let i = 0; i <= items.length; i++) {
  subtotal += items[i].price * items[i].qty;
}


**Problem:** Array indexes start at `0`. The last valid index is `items.length - 1`. Using `i <= items.length` accesses one extra index, where `items[i]` is `undefined`.

**Correction:**

javascript
for (let i = 0; i < items.length; i++) {
  subtotal += items[i].price * items[i].qty;
}


**How to investigate:** Set a breakpoint inside the loop and inspect `i`, `items.length`, and `items[i]` in the Scope panel. Step through the loop to observe the extra iteration.

### Bug 2: Price stored as a string

**Original data:**

javascript
{ name: "Notebook", price: "1500", qty: 2 }


**Problem:** The price is a string rather than a number. Multiplication automatically converts `"1500"` to `1500`, so the calculation happens to work in this case. However, relying on automatic conversion can cause unexpected results in other calculations.

**Correction:**

javascript
{ name: "Notebook", price: 1500, qty: 2 }


**How to investigate:** Inspect `typeof items[0].price` in the Console or add it to the Watch panel. It returns `"string"` for the original value and `"number"` for the corrected value.

### Bug 3: Discount conditions in the wrong order

**Original code:**

javascript
if (subtotal > 10000) return 0.1;
else if (subtotal > 20000) return 0.2;


**Problem:** Any subtotal above `20000` also satisfies `subtotal > 10000`. Therefore, the first condition returns a 10% discount and prevents the 20% condition from being reached.

**Correction:**

javascript
if (subtotal > 20000) return 0.2;
if (subtotal > 10000) return 0.1;
return 0;


**How to investigate:** Test a subtotal above `20000` and inspect which condition executes. The larger discount must be checked first.

### Bug 4: Subtracting the discount rate instead of the amount

**Original code:**

javascript
const discount = getDiscount(subtotal);
const total = subtotal - discount;


**Problem:** `getDiscount()` returns a rate, such as `0.1`, not the money amount to subtract. Subtracting `0.1` from a subtotal does not apply a 10% discount.

**Correction:**

javascript
const discountRate = getDiscount(subtotal);
const discountAmount = subtotal * discountRate;
const total = subtotal - discountAmount;


**How to investigate:** Inspect the values of `subtotal`, `discountRate`, `discountAmount`, and `total` in DevTools.

### Corrected cart result

The cart contains:

| Item | Price | Quantity | Subtotal |
|---|---:|---:|---:|
| Notebook | 1,500 RWF | 2 | 3,000 RWF |
| Pen | 300 RWF | 5 | 1,500 RWF |
| Bag | 12,000 RWF | 1 | 12,000 RWF |
| **Total** | | | **16,500 RWF** |

The subtotal is `16,500 RWF`. Since it is greater than `10,000 RWF` but not greater than `20,000 RWF`, the discount rate is 10%.

- Discount amount: `16,500 × 0.10 = 1,650 RWF`
- Final total: `16,500 − 1,650 = 14,850 RWF`

**Expected output:**

Final cart total: 14850 RWF


## 6. Exercise 4 — Chrome DevTools

### Sources panel and breakpoints

The Sources panel allows developers to pause JavaScript execution and inspect variables.

A breakpoint can be set by clicking the line number beside the code. When execution pauses, the Scope panel displays the values of variables available at that point.


### Conditional breakpoint

A conditional breakpoint pauses execution only when a specified condition is true.

For example:

javascript
i === 2


When placed inside the cart loop, this condition pauses execution when the loop index equals `2`.

### Elements panel

The Elements panel allows developers to inspect and temporarily modify HTML elements and CSS styles.

In the DebugLab project, the navbar uses the Tailwind class `h-20`. Changing this class or its computed height in DevTools helps demonstrate live DOM and CSS inspection.

### Network panel

The Network panel displays files requested by the page, their status codes, sizes, and loading times. Slow network throttling can help developers investigate how a website behaves under limited connectivity.

### Application panel and Local Storage

The Application panel allows developers to inspect browser storage.

In `app.js`, the workshop saves sample data using:

 javascript
localStorage.setItem(
  "debugWorkshop",
  JSON.stringify(sampleData)
);


The saved value can be inspected in **DevTools → Application → Local Storage → your website's origin**.

The project also provides buttons to save, read, and clear the sample data.


## 7. Debugging Process

The workshop introduced a repeatable process for solving programming problems:

1. Reproduce the problem.
2. Read the error message and locate the relevant line.
3. Form a hypothesis about the cause.
4. Test the hypothesis using breakpoints, variable inspection, or Console output.
5. Fix one problem at a time.
6. Run the code again and verify the result.
7. Explain the cause and document the correction.

This process helps prevent random changes and makes debugging more systematic.


## Conclusion

This workshop helped me understand the differences between syntax, runtime, and logic errors. I practiced using Console methods, stepping through JavaScript with breakpoints, inspecting variable values, correcting shopping cart calculations, and exploring browser Local Storage.

The main lesson is to investigate the cause of an error before changing the code and to test the correction before considering the problem solved.
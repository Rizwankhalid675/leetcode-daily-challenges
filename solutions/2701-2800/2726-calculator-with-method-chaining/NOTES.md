# 2726. Calculator with Method Chaining

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/calculator-with-method-chaining/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Write a calculator class whose arithmetic methods can be chained (`new Calculator(2).multiply(5).power(2).getResult()`). Division by zero must throw a specific message.

## Approach
Store the running result in the instance. Every operation updates it and returns `this`, which is what makes chaining possible. `divide` checks for a zero divisor first and throws `new Error('Division by zero is not allowed')`. The judge reports the error's message.

## Edge cases
- Divisor `0`: throw instead of producing `Infinity`.
- Fractional results are compared within 10^-5 by the judge.
- `power` with fractional exponents uses `**`.

## Complexity
- Time: O(1) per operation
- Space: O(1)

## Testing note
The official examples, a same-instance check, fractional cases, and random chains checked against a direct fold of the same operations.

## Reusable pattern
**Fluent interface: mutate, then `return this`.**

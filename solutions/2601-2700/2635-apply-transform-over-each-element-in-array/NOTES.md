# 2635. Apply Transform Over Each Element in Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/apply-transform-over-each-element-in-array/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Reimplement `map` yourself: build a new array where each slot is `fn(element, index)`, without using the built-in.

## Approach
Preallocate a result array of the same length and fill it with a `for` loop.

## Edge cases
- Empty input gives an empty output.
- `fn` may ignore its arguments (constant mapping).
- The input array is never mutated.

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Testing note
The official examples, random comparison against the real `Array.prototype.map` (used only as the oracle), and a guard that temporarily breaks the built-in to prove the solution doesn't call it.

## Reusable pattern
**Higher-order function = loop + callback.** Write it once by hand and `map`, `filter` and `reduce` are no longer magic.

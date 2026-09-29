# 2626. Array Reduce Transformation

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/array-reduce-transformation/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Reimplement `reduce` with a mandatory initial value: fold the array left to right with `fn(acc, element)` and return the final accumulator (or `init` if the array is empty).

## Approach
Start with `acc = init` and overwrite it with `fn(acc, nums[i])` for each element in order.

## Edge cases
- An empty array returns `init` unchanged, and `fn` is never called.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
The official examples, random comparison against the real `reduce` using a non-commutative fold (so order bugs would show), and a guard that breaks the built-in.

## Reusable pattern
**Left fold**: sum, product, max, grouping and building a map are all this loop with a different `fn`.

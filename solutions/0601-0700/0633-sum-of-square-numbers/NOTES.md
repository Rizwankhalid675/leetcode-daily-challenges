# 633. Sum of Square Numbers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, two-pointers, binary-search |
| Link | https://leetcode.com/problems/sum-of-square-numbers/ |
| Context | Quest: DSA / Sorting Plateau / Binary Search |

## What it asks (own words)
Can the non-negative integer c be written as a² + b² with integers a, b ≥ 0?

## Key constraints
- c up to 2³¹ − 1. Squares stay below 2³², so JS numbers are exact; just avoid 32-bit bitwise ops on the sums.

## Approach
Two pointers on the sorted list of squares: a from 0 upward, b from ⌊√c⌋ downward. If the sum is too small, a larger a is needed; if too big, a smaller b. Stop when they cross.

## Why it works
When a² + b² < c, no b' ≤ b helps with this a, so a can advance safely; symmetrically for b. No valid pair gets skipped.

## Edge cases
- c = 0 (0² + 0²), c = 1, and a perfect square (b = √c, a = 0).
- `Math.sqrt` on a perfect square below 2³¹ is exact, so ⌊√c⌋ is correct.

## Complexity
- Time: O(√c) ≈ 46341 iterations at most
- Space: O(1)

## Testing note
Exhaustive check for c < 3000 against a per-a sqrt brute force, plus the values near 2³¹ − 1.

## Reusable pattern
**Two pointers over a monotone set** turn a pair search into a linear scan (compare 167).

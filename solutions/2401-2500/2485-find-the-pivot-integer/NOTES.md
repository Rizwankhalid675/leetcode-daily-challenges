# 2485. Find the Pivot Integer

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, prefix-sum |
| Link | https://leetcode.com/problems/find-the-pivot-integer/ |
| Context | Quest: Maths / Arithmetic Reasoning Terminal Station / Arithmetic & Basic Reasoning |

## What it asks (own words)
Find x so that 1 + ... + x equals x + ... + n, or report -1.

## Approach
Write S = n(n+1)/2. The left sum is x(x+1)/2 and the right sum is S − x(x−1)/2. Setting them equal gives x² = S. So x is the square root of S when S is a perfect square.

## Why it works
There is at most one positive root, so the pivot is unique if it exists. Rounding the floating square root and checking x·x === S exactly guards against floating error (S ≤ 500500, far below 2^53).

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
Exhaustively compared with a direct sum-both-sides search for every allowed n.

## Reusable pattern
**Turn "find the balance point" into algebra**: when both sides are closed-form sums, solve the equation instead of scanning.

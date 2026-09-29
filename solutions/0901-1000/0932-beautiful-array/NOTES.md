# 932. Beautiful Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, divide-and-conquer |
| Link | https://leetcode.com/problems/beautiful-array/ |
| Context | Quest: DSA / Sorting Plateau / Divide and Conquer |

## What it asks (own words)
Produce any permutation of 1..n where no element sits between two others as their arithmetic mean.

## Approach
Two facts: an affine map x → 2x − 1 or x → 2x keeps the property, and if all odds come before all evens, no triple can straddle the halves (odd + even is odd, so its half is never an integer). Starting from [1], each round maps the current array to its odd images followed by its even images, discarding anything > n. Removing elements never breaks the property, so the result stays beautiful.

## Why it works
Within the odd block the triples are images of triples in the previous array (already fine); within the even block likewise; across blocks the sum is odd.

## Complexity
- Time: O(n) overall (sizes roughly double each round)
- Space: O(n)

## Testing note
Multiple answers are valid, so tests check the property directly (permutation + O(n²) pair check with a position map) for every n ≤ 300 and for n = 1000.

## Reusable pattern
**Divide by parity and use invariance under affine maps** to build a structure recursively.

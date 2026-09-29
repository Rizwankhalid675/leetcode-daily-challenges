# 3479. Fruits Into Baskets III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, segment-tree, ordered-set |
| Link | https://leetcode.com/problems/fruits-into-baskets-iii/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Assignment II (quiz) |

## What it asks (own words)
Process fruits in order; each goes into the leftmost unused basket with enough capacity, or is left out. Count the left-out fruits.

## Key constraints
n up to 10^5, so scanning baskets per fruit (O(n²)) is too slow.

## Approach
A max segment tree over basket capacities (padded to a power of two with zeros).
- If the root max is below the fruit, no basket fits: count it.
- Otherwise walk down: go left whenever the left child's max is enough, else right. This lands on the **leftmost** fitting basket.
- Mark the basket used by setting its leaf to 0 and recompute maxima up to the root.

## Why it works
A subtree's max tells whether it contains any fitting basket, so preferring the left child whenever it qualifies finds the smallest index.

## Edge cases
- Capacities are at least 1, so 0 safely means "used" (and padding leaves never fit).
- n need not be a power of two.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared with the direct O(n²) greedy on random inputs; timing test at n = 10^5.

## Reusable pattern
**"Leftmost element ≥ x" with deletions: max segment tree + top-down descent.**

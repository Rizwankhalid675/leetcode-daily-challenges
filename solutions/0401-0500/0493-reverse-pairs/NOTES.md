# 493. Reverse Pairs

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, binary-search, divide-and-conquer, binary-indexed-tree, segment-tree, merge-sort, ordered-set, treap |
| Link | https://leetcode.com/problems/reverse-pairs/ |
| Context | Quest: DSA / Sorting Plateau / Divide and Conquer |

## What it asks (own words)
Count index pairs i < j where nums[i] is more than twice nums[j].

## Key constraints
- n ≤ 5·10⁴ → O(n²) (~1.25·10⁹) is too slow.
- Values span the full 32-bit range; 2·x reaches ±2³², which is exact in JS doubles (no overflow as in Java/C++).

## Approach
Merge sort. When two neighbouring runs are each sorted, every pair crossing them has its left element in the left run and right element in the right run. As i walks up the left run, the set of right-run elements with left[i] > 2·right[j] only grows, so one pointer j sweeps once per merge and adds j − mid for each i. Then merge normally. Done bottom-up so there's no recursion.

## Why it works
Every pair (i, j) is counted exactly once: at the unique merge level where i and j first land in sibling runs. Sorting within runs doesn't change which side each element is on.

## Edge cases
- Negative numbers (e.g. −2³¹ > 2·(−2³¹)).
- Strict inequality: x > 2x never holds for x ≥ 0.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Random small arrays against an O(n²) brute force, extreme 32-bit values, and a 5·10⁴ random full-range timing test (with a 2000-element prefix cross-checked by brute force).

## Reusable pattern
**Count cross pairs during merge sort** (compare 315 Count of Smaller Numbers After Self, inversion counting).

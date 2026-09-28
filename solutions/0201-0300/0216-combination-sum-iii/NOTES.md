# 216. Combination Sum III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, backtracking |
| Link | https://leetcode.com/problems/combination-sum-iii/ |
| Study plan | LeetCode 75 (Backtracking) |

## What it asks (own words)
List every set of k distinct digits from 1–9 that adds up to n.

## Key constraints
- Only 2⁹ = 512 subsets exist in total, so this is about clean enumeration.

## Approach
Backtrack, choosing digits in **increasing** order (each call starts after the last chosen digit). Prune when the
digit exceeds the remaining sum. Record a path when it has k numbers and the remaining sum is 0.

## Why it works
Increasing order means each set is generated exactly once, as its sorted sequence. Pruning only skips branches whose
sums would already overshoot.

## Edge cases
- Impossible targets (e.g. k = 4, n = 1) → [].
- k = 9 forces n = 45.

## Complexity
- Time: O(C(9, k) · k), at most a few hundred operations
- Space: O(k) recursion

## Testing note
Exhaustively compared against a bitmask enumeration of all 512 subsets, for every k in 2..9 and every n in 1..60.
That's the whole input space.

## Reusable pattern
**Combinations without duplicates: iterate from `start` and recurse with `i + 1`.** For "unlimited reuse" variants
(39), recurse with `i` instead.

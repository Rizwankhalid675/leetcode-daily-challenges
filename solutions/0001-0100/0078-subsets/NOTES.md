# 78. Subsets

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, backtracking, bit-manipulation |
| Link | https://leetcode.com/problems/subsets/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Return the power set of an array of distinct numbers, in any order.

## Approach
Count `mask` from 0 to 2ⁿ − 1. Each mask picks the elements whose bit is set, giving each subset exactly once.

## Edge cases
- The empty subset (mask 0) must be included.

## Complexity
- Time: O(n · 2ⁿ)
- Space: O(n · 2ⁿ) for the output

## Testing note
For n = 1..10 on random distinct values: exactly 2ⁿ results, all distinct as sets, every element taken from the input without repetition.

## Reusable pattern
**Bitmask enumeration of subsets** when n is small (≤ ~20).

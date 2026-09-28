# 80. Remove Duplicates from Sorted Array II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers |
| Link | https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Like 26, but each value may appear up to **twice**. Compact in place and return the new length.

## Key constraints
- Up to 3·10⁴ elements, sorted, and O(1) extra space.

## Approach
Write pointer k. Always keep the first two elements. After that, write x only if `x !== nums[k − 2]`, i.e. the value
two slots back in the *output* is different.

## Why it works
In sorted output, if `nums[k−2] === x`, then `nums[k−1]` is also x (it's sandwiched between them), so two copies are
already kept. Otherwise fewer than two copies of x are present, and x is kept.

## Edge cases
- Arrays of length ≤ 2 are unchanged.
- Long runs are cut to exactly two.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**"At most k copies" in a sorted array: compare with `nums[write − k]`.** This single template covers 26 (k = 1) and
80 (k = 2).

# 35. Search Insert Position

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/search-insert-position/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
In a sorted array of distinct values, return the target's index, or the index where it would be inserted to keep the order.

## Approach
Binary search for the **lower bound**: the first index with `nums[i] >= target`. Use a half-open range `[lo, hi)` with `hi = n`, so "after the end" is a possible answer.

## Edge cases
- Target larger than everything: returns `n`.
- Target smaller than everything: returns 0.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Compared with a linear "first index with value ≥ target" scan on random sorted arrays.

## Reusable pattern
**Lower bound with a half-open range** is the building block for insert position, first occurrence and counting (see 34).

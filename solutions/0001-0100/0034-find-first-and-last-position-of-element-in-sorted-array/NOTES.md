# 34. Find First and Last Position of Element in Sorted Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
In a non-decreasing array, return the first and last index of the target, or `[-1, -1]`, in O(log n).

## Approach
One lower-bound helper (first index with value ≥ x):
- `start = lowerBound(target)`. If it's past the end or doesn't hold the target, the target is absent.
- `end = lowerBound(target + 1) − 1`, which works because the values are integers.

## Edge cases
- Empty array.
- The whole array equal to the target.
- `target + 1` is safe in JS numbers (no 32-bit overflow at 10⁹).

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Compared with `indexOf` / `lastIndexOf` on random sorted arrays with many duplicates.

## Reusable pattern
**Equal range = [lowerBound(x), lowerBound(x+1))** for integer keys.

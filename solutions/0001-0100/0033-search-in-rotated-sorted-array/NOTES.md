# 33. Search in Rotated Sorted Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/search-in-rotated-sorted-array/ |
| Context | Quest: DSA / Sorting Plateau / Binary Search |

## What it asks (own words)
A sorted array of distinct values was rotated at an unknown point; find a target's index in O(log n).

## Approach
At any mid, at least one of [lo, mid] and [mid, hi] is in sorted order (the one that doesn't contain the rotation point). If `nums[lo] <= nums[mid]` the left half is sorted: keep it only if the target is inside its value range. Otherwise the right half is sorted and we test its range instead.

## Edge cases
- `<=` in `nums[lo] <= nums[mid]` matters when lo === mid (two-element windows).
- Unrotated arrays and single elements.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Every rotation of random sorted arrays, every target in a range covering both present and absent values, compared with `indexOf`.

## Reusable pattern
**Find the sorted half, then range-check** (compare 81 with duplicates, 153 for the minimum).

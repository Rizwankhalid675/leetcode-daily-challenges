# 153. Find Minimum in Rotated Sorted Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
A sorted array of distinct values was rotated some number of times; find its minimum in O(log n).

## Approach
Compare the middle with the **right end**:
- `nums[mid] > nums[hi]`: the drop (and the minimum) is strictly right of `mid`.
- Otherwise `mid..hi` is increasing, so the minimum is at `mid` or to its left.

Shrink until `lo === hi`.

## Why compare with the right end
The right end is always part of the rotated range, so the comparison is correct even when the array isn't rotated. Comparing with the left end needs an extra special case.

## Edge cases
- No rotation (or n rotations): returns `nums[0]`.
- One element.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Every rotation of random sorted arrays is tested; the answer must always be the smallest value.

## Reusable pattern
**Binary search on a predicate** ("is this index past the drop?") rather than on a value.

# 88. Merge Sorted Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, two-pointers, sorting |
| Link | https://leetcode.com/problems/merge-sorted-array/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Merge sorted `nums2` into sorted `nums1`, which has empty slots at the end, in place.

## Key constraints
- Lengths ≤ 200, and the follow-up asks for O(m + n).

## Approach
Merge **from the back**: pointers i (the last real element of nums1), j (the last element of nums2), and w (the last
slot). Place the larger tail at w and move that pointer. Stop when nums2 is exhausted; any remaining nums1 elements are
already in place.

## Why it works
Writing at w never destroys an unread nums1 value, because w − i = the number of unplaced nums2 elements ≥ 0. Placing
the largest remaining value at the end is exactly how a descending merge works.

## Edge cases
- m = 0 (all from nums2) or n = 0 (nothing to do).
- Equal values: either order is fine.

## Complexity
- Time: O(m + n)
- Space: O(1)

## Reusable pattern
**Fill from the back when the output shares space with an input** to avoid overwriting data you haven't read yet.

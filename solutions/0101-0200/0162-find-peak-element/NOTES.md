# 162. Find Peak Element

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/find-peak-element/ |
| Study plan | LeetCode 75 (Binary Search) |

## What it asks (own words)
Return the index of any element strictly greater than both its neighbours (the outside of the array counts as −∞),
in O(log n) time. Neighbours are never equal.

## Key constraints
- n ≤ 1000, but O(log n) is required.

## Approach
Binary search on the **slope**:
- If `nums[mid] < nums[mid+1]`, the array is rising at mid. Walking right, it must eventually fall (it ends at −∞), so a
  peak exists in `(mid, hi]` → `lo = mid + 1`.
- Otherwise it's falling at mid, so a peak exists in `[lo, mid]` → `hi = mid`.

## Why it works
Invariant: [lo, hi] always contains a peak. It's true initially because of the −∞ boundaries, and each step keeps a
half that must contain one. When lo = hi, that single index is a peak.

## Edge cases
- One element → index 0.
- Strictly increasing → the last index. Strictly decreasing → 0.
- Any peak is accepted, so the tests check the peak property rather than a specific index.

## Complexity
- Time: O(log n)
- Space: O(1)

## Reusable pattern
**Binary search without a sorted array:** all you need is a predicate that tells you which half is guaranteed to
contain an answer. This is "binary search on a monotone property".

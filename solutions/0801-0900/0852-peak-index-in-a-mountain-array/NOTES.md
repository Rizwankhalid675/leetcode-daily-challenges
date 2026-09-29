# 852. Peak Index in a Mountain Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, ternary-search |
| Link | https://leetcode.com/problems/peak-index-in-a-mountain-array/ |
| Context | Quest: DSA / Sorting Plateau / Binary Search |

## What it asks (own words)
The array strictly rises then strictly falls; return the index of the top, in O(log n).

## Approach
Look at the pair (mid, mid+1). An upward step means we're on the rising side, so the peak is after mid. A downward step means mid is on the falling side or is the peak itself. Shrink [lo, hi] until it's a single index.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Random strictly-up-then-down arrays with a known peak position.

## Reusable pattern
**Binary search on a predicate** (here "is the slope rising?"), not on a target value (compare 162).

# 148. Sort List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers, divide-and-conquer, sorting, merge-sort |
| Link | https://leetcode.com/problems/sort-list/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Sort a singly linked list in ascending order (follow-up: O(n log n) time and O(1) memory).

## Approach
Bottom-up merge sort on the list itself:
1. Count the length.
2. For `size = 1, 2, 4, …`: walk the list, cut off two runs of `size` nodes each, merge them, and attach the merged run after the previous one (`tail`).
3. After the pass where `size ≥ length / 2`, the whole list is one sorted run.

`split` cuts after `size` nodes and returns the rest; `merge` splices two sorted runs after `tail` and returns the new tail.

## Why not top-down
The recursive "find middle, sort halves" version is simpler but uses O(log n) stack, and naive recursive merges use O(n) stack, which can overflow on 5·10⁴ nodes. The bottom-up version has no recursion at all.

## Edge cases
- Empty list or a single node: the loop never runs.
- Many equal values: `<=` keeps the merge stable (not required, but harmless).

## Complexity
- Time: O(n log n)
- Space: O(1) extra

## Testing note
Random lists compared with `Array.prototype.sort`, including a check that the result reuses the original nodes. Sorted, reversed and random lists of 5·10⁴ nodes check speed and that there is no deep recursion.

## Reusable pattern
**Bottom-up merge sort** for linked lists: split, merge, relink, doubling the run size each pass.

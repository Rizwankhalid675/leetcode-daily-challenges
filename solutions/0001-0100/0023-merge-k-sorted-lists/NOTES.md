# 23. Merge k Sorted Lists

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | linked-list, divide-and-conquer, heap-priority-queue, merge-sort, tournament-sort |
| Link | https://leetcode.com/problems/merge-k-sorted-lists/ |
| Context | Quest: DSA / Sorting Plateau / Assignment II (quiz) |

## What it asks (own words)
Combine k individually sorted linked lists into a single sorted list.

## Key constraints
- k up to 10⁴ and at most 10⁴ nodes in total; some lists may be empty.

## Approach
Merge lists in pairs, like the levels of merge sort: first (0,1), (2,3), …; then (0,2), (4,6), …; doubling the step until everything is in list 0. Each round is a standard two-pointer merge that relinks existing nodes.

## Why it works
There are ⌈log₂ k⌉ rounds and every node is touched at most once per round, which matches a heap-based k-way merge without needing a heap.

## Edge cases
- `lists = []` → null; lists containing only empty lists → null.

## Complexity
- Time: O(N log k), N = total nodes
- Space: O(1) extra (nodes are relinked in place)

## Testing note
Random inputs compared with flattening and sorting; 10⁴ single-node lists as a timing check.

## Reusable pattern
**Pairwise merging (tournament)** as an alternative to a min-heap for k-way merge (compare 373).

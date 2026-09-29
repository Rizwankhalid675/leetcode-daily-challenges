# 147. Insertion Sort List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, sorting |
| Link | https://leetcode.com/problems/insertion-sort-list/ |
| Context | Quest: DSA / Sorting Plateau / Counting Sort / Merge Sort / Quickselect |

## What it asks (own words)
Sort a linked list by the insertion-sort procedure: grow a sorted prefix one node at a time.

## Key constraints
- Up to 5000 nodes → O(n²) comparisons (~1.25·10⁷) is fine.

## Approach
Keep a dummy head in front of the sorted part and remember its last node. If the next node is at least that tail value it simply extends the sorted part. Otherwise detach it, walk from the dummy to the first node whose successor is larger, and splice it in there.

## Edge cases
- Empty list or one node.
- Equal values stay stable (`<=` when walking).

## Complexity
- Time: O(n²) worst case, O(n) on already sorted input
- Space: O(1)

## Testing note
Random lists compared with a numeric array sort, plus a reversed 5000-node timing check.

## Reusable pattern
**Dummy head + tail shortcut** for in-place list insertion.

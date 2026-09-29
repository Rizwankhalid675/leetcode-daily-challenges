# 82. Remove Duplicates from Sorted List II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers |
| Link | https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
In a sorted linked list, drop every value that appears more than once (all copies of it), keeping only values that occur exactly once.

## Approach
Build the answer by appending to a `tail` behind a dummy head. At each node, check whether the next node has the same value:
- If yes, skip the whole run of that value.
- If no, the value is unique; append the node.
At the end set `tail.next = null` so a skipped run at the end of the list is cut off.

## Edge cases
- Empty list returns null.
- The last run is duplicated: the final `tail.next = null` is what removes it.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with a count-then-filter oracle on 1000 random sorted arrays with many repeats.

## Reusable pattern
**Rebuild a list through a dummy + tail**, and always terminate the tail explicitly.

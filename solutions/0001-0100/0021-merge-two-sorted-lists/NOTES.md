# 21. Merge Two Sorted Lists

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | linked-list, recursion |
| Link | https://leetcode.com/problems/merge-two-sorted-lists/ |
| Study plan | Top Interview 150 (Linked List) |

## What it asks (own words)
Merge two sorted linked lists into one sorted list by relinking the existing nodes.

## Key constraints
- Up to 50 nodes each.

## Approach
A dummy head plus a tail pointer. Repeatedly attach the smaller front node and advance that list. When one list runs
out, attach the rest of the other in one step.

## Why it works
This is the merge step of merge sort. The smaller of the two fronts is the smallest remaining element overall.

## Edge cases
- One or both lists empty.
- Equal values: taking from list1 first (`<=`) makes the merge stable.

## Complexity
- Time: O(m + n)
- Space: O(1) (nodes are reused)

## Reusable pattern
**Dummy head + tail pointer for building lists.** It's used for sorting a list (148) and merging k lists (23).

# 1019. Next Greater Node In Linked List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, linked-list, stack, monotonic-stack |
| Link | https://leetcode.com/problems/next-greater-node-in-linked-list/ |
| Context | Quest: DSA / Association Slope / Assignment (quiz) |

## What it asks (own words)
For every node of a linked list, report the first strictly larger value that appears later in the list (0 if none).

## Approach
Read the list into an array. Sweep left to right with a stack of indices whose answer is still unknown; their values are non-increasing from bottom to top. When a bigger value arrives, pop and answer everything smaller than it, then push the new index.

## Edge cases
- Equal values do not count as larger (strict `<` when popping).
- Leftover indices keep their default 0.

## Complexity
- Time: O(n): each index is pushed and popped once
- Space: O(n)

## Testing note
Compared with a quadratic forward scan on random lists with many ties.

## Reusable pattern
**Monotonic stack for "next greater element"** (compare 496, 739, 1475).

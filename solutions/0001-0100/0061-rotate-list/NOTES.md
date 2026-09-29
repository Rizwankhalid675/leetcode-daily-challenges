# 61. Rotate List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers |
| Link | https://leetcode.com/problems/rotate-list/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Shift a linked list to the right by k places: the last k nodes move to the front.

## Key constraints
- k can be up to 2·10⁹ while the list has at most 500 nodes, so k must be reduced modulo the length.

## Approach
1. Walk to the tail and count the length.
2. `k %= len`; if it is 0 the list is unchanged.
3. The new tail is node number len − k (1-indexed). Cut after it, and link the old tail to the old head.

## Edge cases
- Empty or single-node list: returned as is.
- k a multiple of the length: unchanged.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with rotating an array one step at a time on 1000 random cases, plus k = 2·10⁹.

## Reusable pattern
**Reduce a rotation amount modulo the length** before doing any pointer work.

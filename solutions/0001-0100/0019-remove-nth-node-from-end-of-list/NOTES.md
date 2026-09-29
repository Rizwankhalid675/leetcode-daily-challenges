# 19. Remove Nth Node From End of List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers |
| Link | https://leetcode.com/problems/remove-nth-node-from-end-of-list/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Delete the node that is n-th from the end of a linked list and return the head.

## Approach
1. Put a dummy before the head so deleting the head needs no special case.
2. Advance `lead` n + 1 steps from the dummy, so there are exactly n nodes between `trail` and `lead`.
3. Move both until `lead` is null. `trail` is then right before the target; unlink it.

## Edge cases
- n equals the length: the head is removed and the dummy's next changes.
- Single node: the result is an empty list.

## Complexity
- Time: O(n), one pass
- Space: O(1)

## Testing note
Compared with `Array.prototype.splice` on 1000 random lists.

## Reusable pattern
**Fixed-gap two pointers** find the k-th node from the end in one pass.

# 86. Partition List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers |
| Link | https://leetcode.com/problems/partition-list/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Rearrange a linked list so that nodes with values below x come before the rest, keeping the original order inside each group.

## Approach
Walk once and append each node to one of two chains (each behind its own dummy): "less" or "greater or equal". Terminate the second chain with null, and link the end of the first chain to the start of the second.

## Edge cases
- Forgetting `more.next = null` can leave a cycle, because the last "more" node may still point to a "less" node.
- All nodes on one side: one chain is empty and the dummies make it work anyway.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with two stable array filters on 1000 random cases.

## Reusable pattern
**Stable partition of a list = two dummy-headed chains, then concatenate.**

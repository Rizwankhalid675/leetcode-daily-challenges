# 25. Reverse Nodes in k-Group

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | linked-list, recursion |
| Link | https://leetcode.com/problems/reverse-nodes-in-k-group/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Reverse the list in consecutive blocks of k nodes. A final block shorter than k keeps its order. Only links may change, not values.

## Key constraints
- 1 ≤ k ≤ n ≤ 5000. The follow-up asks for O(1) extra memory, so no recursion or arrays.

## Approach
Keep `groupPrev`, the node right before the current group (a dummy at first).
1. Step k nodes ahead to find `kth`. If the list runs out first, stop: the tail stays as is.
2. Reverse the group by flipping pointers, starting `prev` at `groupNext` (the node after the group), so the old first node ends up pointing at the next group.
3. Point `groupPrev.next` at `kth` (the new first node). The old first node is now the group's last, so it becomes the next `groupPrev`.

## Edge cases
- k = 1: every group reverses to itself.
- n divisible by k: the loop stops when `kth` becomes null on the last check.

## Complexity
- Time: O(n) (each node is visited twice: once while counting, once while reversing)
- Space: O(1)

## Testing note
Compared with reversing k-sized chunks of a plain array on 1000 random cases, plus a 5000-node list.

## Reusable pattern
**Reverse a segment by starting `prev` at the segment's successor**: the reversed segment is then already linked to what follows it.

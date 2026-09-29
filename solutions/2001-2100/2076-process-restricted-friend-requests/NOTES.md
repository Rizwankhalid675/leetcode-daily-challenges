# 2076. Process Restricted Friend Requests

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | union-find, graph |
| Link | https://leetcode.com/problems/process-restricted-friend-requests/ |
| Context | Quest: DSA / Graph Theory Peaks / Union Find |

## What it asks (own words)
Process friend requests in order. A request is accepted only if joining the two people's friend groups would not put any "forbidden pair" into the same group. Report accept/reject for each request.

## Key constraints
- n, restrictions, requests ≤ 1000 each, so scanning all restrictions for every request (10⁶ finds) is fine.

## Approach
Keep friend groups in a DSU. For request (u, v), let a = find(u) and b = find(v):
- a === b: they are already connected, so accept.
- Otherwise, for each restriction (x, y), reject if {find(x), find(y)} equals {a, b}.
- If nothing blocks it, union a and b.

## Why it works
Before the merge, no restricted pair shares a group (that holds after every step). A merge of a and b only creates new same-group pairs across a and b. So the only restrictions that can break are the ones with one end in each group.

## Edge cases
- A repeated request or an already-connected pair → true, even if a restriction mentions them. That can't happen anyway, since the invariant forbids it.
- Empty restrictions → all true.

## Complexity
- Time: O(q · r · α(n))
- Space: O(n)

## Testing note
Compared with a brute force that tentatively adds the edge, recomputes the components from scratch, and rolls back on a violation.

## Reusable pattern
**Conditional union: check the invariant against the two roots before merging.** Rejected merges leave the DSU untouched, so there's nothing to undo.

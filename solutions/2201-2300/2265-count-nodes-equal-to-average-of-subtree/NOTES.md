# 2265. Count Nodes Equal to Average of Subtree

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-10 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Tree, Depth-First Search, Binary Tree |
| Link | https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/ |
| Result | Accepted, 139/139 tests, 52 ms, 59.5 MB (submission 2156488210) |

## What it asks (own words)
For every node in a binary tree, average the values of the node and all its descendants (rounded down). Count the
nodes whose own value equals that average.

## Key constraints
- Up to 1000 nodes, values 0..1000 → sums ≤ 10⁶, so there are no overflow concerns.
- Recursion depth can reach 1000 on a degenerate (chain) tree. That's fine for JS's default stack.

## Reasoning
A naive approach recomputes each node's subtree sum from scratch: O(n²) in the worst case. But a subtree's sum and
size are simple combinations of its children's: `sum = left.sum + right.sum + val`,
`count = left.count + right.count + 1`. So compute them **bottom-up in one post-order traversal** and check each
node as soon as its children are done.

## Algorithm
`dfs(node)` returns `[sum, count]`:
- `null` → `[0, 0]`.
- Otherwise recurse left and right, combine, and if `⌊sum / count⌋ === node.val` increment the counter. Return
  `[sum, count]`.

## Why it works
Post-order guarantees both children's aggregates are final before the parent uses them, so every node sees its
exact subtree sum and size.

## JavaScript implementation details
- Returning a two-element array and destructuring (`const [s, c] = dfs(...)`) is a clean way to return multiple
  values.
- The counter lives in the enclosing scope and the arrow function closes over it. That avoids threading a third
  return value.
- `Math.floor(sum / count)` implements "rounded down". Values are non-negative, so floor and truncation agree.
- Tests use a small helper (`tests/helpers/tree.js`) that builds trees from LeetCode's level-order array format.

## Edge cases
- Single node: the average is itself, so it counts.
- Rounding: subtree {1, 2} with root 1 → ⌊1.5⌋ = 1 → counts.
- Leaves always count (the average of one value is itself).
- 1000-node chain: deepest recursion; tested.

## Bugs / debugging
None.

## Alternatives considered
- Per-node subtree traversal: O(n²), fine at n = 1000 but wasteful.
- Iterative post-order with an explicit stack: avoids recursion limits for much larger trees, at the cost of more
  complex code.

## Complexity
- Time: O(n).
- Space: O(h) recursion stack (h = tree height, O(n) worst case).

## Reusable pattern
**Tree DP by returning aggregates from children (post-order).** Sum, size, height, min/max and "is BST" all follow
the same shape: each call returns a small tuple the parent combines in O(1).

## What to take away personally
If a tree question asks something "for every subtree", the answer is almost always one post-order DFS that returns
what the parent needs.

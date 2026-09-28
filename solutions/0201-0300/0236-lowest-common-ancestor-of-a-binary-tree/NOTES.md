# 236. Lowest Common Ancestor of a Binary Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
Given two nodes p and q in a binary tree (not a search tree), find the deepest node that has both as descendants. A
node counts as its own descendant.

## Key constraints
- Up to 10⁵ nodes, so a recursive solution risks a JS stack overflow on a degenerate tree.
- p ≠ q, and both exist.

## Approach (iterative)
1. Traverse with an explicit stack, recording `parent[node]`, until both p and q have been seen.
2. Walk up from p, collecting all its ancestors (including p) in a Set.
3. Walk up from q; the first node found in that Set is the LCA.

## Why it works
The ancestors of p form a root-to-p path. Walking up from q, the first node on that path is the lowest node that is an
ancestor of both, which is the definition of the LCA.

## Recursive alternative
```js
const lca = (n) => { if (!n || n === p || n === q) return n;
  const l = lca(n.left), r = lca(n.right); return l && r ? n : l || r; };
```
It's elegant and O(n), and the tests use it as the reference. But its recursion depth equals the tree height (up to
10⁵ here).

## Edge cases
- One node is an ancestor of the other → it's the answer (example 2).
- Comparing **node references**, not values. Map/Set keys are object identities.

## Complexity
- Time: O(n)
- Space: O(n) for the parent map

## Reusable pattern
**Parent pointers + ancestor set** turns a tree question into "intersection of two upward paths". With depths
recorded, the two pointers can also be walked up in lockstep, using O(1) extra space beyond the parent map.

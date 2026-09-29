# 440. K-th Smallest in Lexicographical Order

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | trie |
| Link | https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Trie |

## What it asks (own words)
Sort 1..n as strings (dictionary order) and return the k-th entry, with n up to 10^9.

## Key constraints
n up to 10^9, so listing or even DFS-visiting every number is too slow.

## Approach
Dictionary order is a pre-order walk of the tree where the children of prefix p are p0..p9.
- `countUnder(p)`: numbers in [1, n] that start with p. Level by level the range is [first, last] = [p, p], [p·10, p·10+9], ...; each level contributes `min(n, last) - first + 1` while `first <= n`.
- Start at 1 with k-1 steps left. If the whole subtree of `cur` fits in the remaining steps, skip it (`cur++`). Otherwise descend (`cur *= 10`), which costs one step.

## Why it works
Pre-order visits a node and then its whole subtree before moving to the next sibling, so a subtree is either entirely before the target or contains it.

## Edge cases
- k = 1 returns 1 immediately.
- `last` can grow past 10^10 but stays far below 2^53.

## Complexity
- Time: O(log²n) (at most ~10 siblings per level times ~10 levels, each count O(log n))
- Space: O(1)

## Testing note
Every k for many small n, plus random n up to 5000, compared against sorting the numbers as strings. Spot checks at n = 10^9.

## Reusable pattern
**Implicit trie + subtree counting**: skip whole subtrees by size instead of enumerating them.

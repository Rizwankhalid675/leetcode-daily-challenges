# 129. Sum Root to Leaf Numbers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/sum-root-to-leaf-numbers/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Each root-to-leaf path spells a decimal number with one digit per node. Return the sum of those numbers.

## Key constraints
- Depth ≤ 10, so each number fits in 10 digits, and the answer is guaranteed to fit in 32 bits.

## Approach
DFS with a stack of (node, number so far). Arriving at a node extends the number as `prev * 10 + digit`; leaves add their number to the total.

## Edge cases
- Leading zeros (root 0) are fine: they just contribute nothing.

## Complexity
- Time: O(n)
- Space: O(h)

## Testing note
Compared with an oracle that concatenates digit strings and parses them, on 1000 random digit trees.

## Reusable pattern
**Carry path state down the tree** so leaves can finish the computation without a second pass.

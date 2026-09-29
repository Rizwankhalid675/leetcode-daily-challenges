# 337. House Robber III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming, tree, depth-first-search, binary-tree, dp-on-trees |
| Link | https://leetcode.com/problems/house-robber-iii/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Houses form a binary tree; you can't rob a house and its direct parent together. Maximize the total robbed.

## Key constraints
- Up to 10⁴ nodes, so a skewed tree can be 10⁴ deep.

## Approach
For each node compute two numbers: **take** (node robbed, so both children must be skipped: val + skip(left) + skip(right)) and **skip** (node not robbed, each child independently takes its better option). The answer is the better of the two at the root. To stay safe on deep trees, collect nodes in preorder with an explicit stack and process them in reverse, which guarantees children are finished before their parent.

## Why it works
The only constraint is between a node and its children, so once a node's state is fixed the two subtrees are independent — the two-value summary captures everything a parent needs.

## Edge cases
- Single node: its value.
- Chain (linked-list shaped) tree: reduces to the classic House Robber.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with enumerating every subset of nodes that has no parent-child pair (trees up to 14 nodes from random level-order arrays). A 10⁴-deep chain is checked against the linear House Robber DP and for stack safety.

## Reusable pattern
**Tree DP returning a pair (with node, without node)**; do the post-order iteratively via reversed preorder when depth may be large.

# 608. Tree Node

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/tree-node/ |
| Context | Quest: Database / Grouping & Join Aggregation Library / Grouping & Aggregation |

## What it asks (own words)
Label every node in a tree as Root, Inner or Leaf.

## Approach
A `CASE` checked in priority order:
1. No parent: **Root** (this comes first, so a lone root is still Root and not Leaf).
2. Some other node has it as `p_id`: **Inner**.
3. Otherwise: **Leaf**.

## Edge cases
- Single-node tree: the node is Root (the first branch wins).
- `EXISTS` is used instead of `id NOT IN (SELECT p_id ...)`. The `p_id` column contains the root's NULL, and `NOT IN` against a list containing NULL is never TRUE, which would mislabel nodes.

## Reusable pattern
**Classify nodes of an adjacency list with ordered CASE + `EXISTS` for "has children".** Avoid `NOT IN` on nullable columns.

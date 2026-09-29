# 2672. Number of Adjacent Elements With the Same Color

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array |
| Link | https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Interview Benchmark I (quiz) |

## What it asks (own words)
An array starts with every cell uncoloured (0). Each query paints one cell. After each query, report how many neighbouring pairs share the same non-zero colour.

## Key constraints
- n and the number of queries are each up to 10^5, so recounting after every query (O(n * q)) is too slow.

## Approach
Only the pairs touching the painted cell can change. Keep a running total:
1. If the cell was already coloured, subtract its matches with the left and right neighbours.
2. Paint it.
3. Add its matches with the neighbours under the new colour.

Colours are at least 1, so after painting, a match with a neighbour means that neighbour is coloured too.

## Edge cases
- Repainting a cell with its current colour removes and re-adds the same pairs, so the total does not change.
- n = 1 has no pairs.
- Uncoloured neighbours never match, because the old colour is only compared when it is non-zero.

## Complexity
- Time: O(n + q)
- Space: O(n)

## Testing note
Compared with a full recount after every query on 1000 random small cases, plus a 10^5-query timing run.

## Reusable pattern
**Maintain a global count by subtracting local contributions before an update and adding them back after it.**

# 433. Minimum Genetic Mutation

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, breadth-first-search, bidirectional-search |
| Link | https://leetcode.com/problems/minimum-genetic-mutation/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Genes are 8-letter strings over A/C/G/T. One mutation changes one letter, and every intermediate gene (and the target) must be in the bank. Find the fewest mutations from start to end, or -1.

## Approach
Unweighted shortest path, so BFS level by level:
- From each gene in the current frontier, try all 8 × 3 single-letter changes.
- Keep only changes that are in the bank and unseen; return the step count as soon as one equals `endGene`.

## Edge cases
- `startGene === endGene`: 0 mutations (checked before anything else).
- `endGene` not in the bank: -1 immediately.
- `startGene` itself need not be in the bank.

## Complexity
- Time: O(B · 8 · 4) set lookups (B = bank size, ≤ 10), each on 8-character strings
- Space: O(B)

## Testing note
Oracle: all-pairs shortest paths (Floyd-Warshall) over start + bank. Random genes use only two letters so the graphs are dense enough to have interesting paths.

## Reusable pattern
**Implicit-graph BFS**: generate neighbors by editing the state, filter through a set of allowed states (same shape as Word Ladder, 127).

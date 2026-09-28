# 62. Unique Paths

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, dynamic-programming, combinatorics |
| Link | https://leetcode.com/problems/unique-paths/ |
| Study plan | LeetCode 75 (DP - Multidimensional) |

## What it asks (own words)
Count the paths from the top-left to the bottom-right of an m×n grid moving only right or down.

## Key constraints
- m, n ≤ 100, and the answer is guaranteed ≤ 2·10⁹.

## Approach
Grid DP: the ways to reach a cell = the ways from above + the ways from the left. The first row and first column have
exactly one way each. Keep a single row: `row[c] += row[c−1]`, where `row[c]` still holds the value from the row above.

## Why it works
Every path into a cell arrives from exactly one of its two predecessors, so the counts add.

## Closed form
Any path is a sequence of (m−1) downs and (n−1) rights in some order, so the count is C(m+n−2, m−1). The tests compare
the DP with this binomial, computed in BigInt, across the whole 100×100 input range wherever the answer is within the
guarantee.

## Edge cases
- m = 1 or n = 1 → 1.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Reusable pattern
**2-D grid DP compressed to one row** (updating in place left to right). And the lesson that a counting DP often has a
combinatorial closed form worth using as a test oracle.

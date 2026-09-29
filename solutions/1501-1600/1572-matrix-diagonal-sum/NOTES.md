# 1572. Matrix Diagonal Sum

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, matrix |
| Link | https://leetcode.com/problems/matrix-diagonal-sum/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Add up the main diagonal and the anti-diagonal of a square matrix, counting the shared centre cell only once.

## Approach
One loop adds both diagonal cells of each row. For odd n the centre lies on both diagonals, so subtract it once.

## Edge cases
- n = 1: the single cell, counted once.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with scanning every cell and adding those with `i === j` or `i + j === n − 1`, for n = 1..30.

## Reusable pattern
**Inclusion–exclusion for overlapping index sets.**

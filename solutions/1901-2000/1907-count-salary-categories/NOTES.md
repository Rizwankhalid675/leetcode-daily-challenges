# 1907. Count Salary Categories

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/count-salary-categories/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Count the accounts in each of three income bands (below 20000, 20000 to 50000 inclusive, above 50000). All three bands must be listed, even the empty ones.

## Approach
One `SELECT` per band, each returning a constant label and `COUNT(*)` of the matching rows, glued with `UNION ALL`.

## Why it works
An aggregate query without `GROUP BY` returns exactly one row even when no rows match, and `COUNT(*)` is then 0. That is what guarantees the zero rows. A `GROUP BY category` over a `CASE` would never produce a group for an empty band. `SUM(income < 20000)` would also fail on an empty table, because `SUM` of nothing is NULL, not 0.

## Edge cases
- Boundaries: 20000 and 50000 are "Average" (`BETWEEN` is inclusive). 19999 is Low, 50001 is High.
- Empty table: three rows, all 0.

## Reusable pattern
**Fixed list of categories that must all appear: one aggregate branch per category with `UNION ALL`** (or `LEFT JOIN` a small category table to the counts).

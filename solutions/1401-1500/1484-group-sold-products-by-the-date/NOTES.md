# 1484. Group Sold Products By The Date

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/group-sold-products-by-the-date/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each date, give the number of different products sold and a comma-separated, alphabetically sorted list of their names. Order by date.

## Approach
`GROUP BY sell_date` with two aggregates:
- `COUNT(DISTINCT product)`.
- `GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',')`. MySQL's `GROUP_CONCAT` can deduplicate, sort and choose the separator inside the call.

## Edge cases
- The same product sold twice on a date (Mask in the example) is listed and counted once.
- Sorting is by the column's collation. Ties between names differing only by case are not an issue in practice.
- `GROUP_CONCAT` output is capped by `group_concat_max_len` (1024 bytes by default), which is far more than these lists need.

## Reusable pattern
**List aggregation in MySQL: `GROUP_CONCAT(DISTINCT x ORDER BY x SEPARATOR ',')`** (PostgreSQL: `STRING_AGG`).

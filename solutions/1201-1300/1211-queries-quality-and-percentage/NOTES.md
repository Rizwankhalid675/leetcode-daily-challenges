# 1211. Queries Quality and Percentage

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/queries-quality-and-percentage/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each query name, report two numbers rounded to 2 decimals: the average of rating divided by position, and the percentage of its results with a rating under 3.

## Approach
One `GROUP BY query_name` with two aggregates:
- `AVG(rating / position)` for quality.
- `AVG(rating < 3) * 100` for the poor percentage, because a comparison is 0 or 1 in MySQL.

## Why it works
In MySQL `rating / position` is decimal division (4 extra digits of scale), so no integer truncation. The average of the 0/1 flags is the fraction of poor rows.

## Edge cases
- Duplicate rows count separately, as the problem says the table may have them.
- The `WHERE query_name IS NOT NULL` guard drops rows with no name. The judge has a test containing such a row, and the NULL group is not part of the expected output.

## Reusable pattern
**Percentage of rows meeting a condition = `AVG(condition) * 100`.** It avoids a separate `SUM(...)/COUNT(*)`.

# 176. Second Highest Salary

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/second-highest-salary/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Return the second-largest **distinct** salary, or NULL if there is no second distinct value.

## Approach
Inner query: distinct salaries in descending order, skip the first and take the next (`LIMIT 1 OFFSET 1`). Wrap it as a scalar subquery in an outer `SELECT`.

## Why it works
On its own, the inner query returns **zero rows** when there is no second salary, but the judge expects one row containing NULL. A scalar subquery that finds no row evaluates to NULL, so the outer `SELECT` always produces exactly one row.

## Edge cases
- Only one employee, or everybody earning the same: NULL (thanks to `DISTINCT` the "second" is really the second distinct value).
- Ties for the top salary do not count as the second highest.

## Reusable pattern
**"Value or NULL": wrap the query in `SELECT (subquery) AS col`.** **N-th distinct value: `SELECT DISTINCT v ORDER BY v DESC LIMIT 1 OFFSET N-1`.**

# 619. Biggest Single Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/biggest-single-number/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Among the numbers that appear exactly once, return the largest, or NULL if there are none.

## Approach
1. Inner query: `GROUP BY num HAVING COUNT(*) = 1` gives the numbers that occur once.
2. Outer query: `MAX(num)` over them.

## Why it works
An aggregate without `GROUP BY` always returns exactly one row. Over an empty input `MAX` returns NULL, so the "report null" case needs no special handling. (A plain `ORDER BY num DESC LIMIT 1` would return zero rows instead of a NULL row.)

## Edge cases
- No single numbers: one row containing NULL.
- Negative numbers: `MAX` still works.

## Reusable pattern
**Need "a value, or NULL if none"? Wrap the query in an aggregate (`MAX`/`MIN`) or a scalar subquery.** Both always produce exactly one row.

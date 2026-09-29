# 1789. Primary Department for Each Employee

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/primary-department-for-each-employee/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Report each employee's primary department. An employee in several departments has one flagged 'Y'. An employee in only one department has it flagged 'N', and that one department is their answer.

## Approach
Keep a row if it is flagged 'Y', **or** if its employee appears only once in the table.

## Why it works
The two cases never overlap in a way that duplicates output: a multi-department employee has exactly one 'Y' row, and a single-department employee has exactly one row. Each employee therefore yields exactly one row.

## Edge cases
- A single-department employee whose flag is 'N' (the normal case) is still reported.
- A single-department employee flagged 'Y' matches both conditions, but it is one row, so it is reported once.

## Reusable pattern
**"The flagged row, else the only row": `WHERE flag = 'Y' OR key IN (... GROUP BY key HAVING COUNT(*) = 1)`.**

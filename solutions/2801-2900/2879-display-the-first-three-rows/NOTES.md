# 2879. Display the First Three Rows

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/display-the-first-three-rows/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Return only the first three rows of the employees table, with all columns kept.

## Approach
`employees.head(3)` slices the first three rows by position.

## Pandas notes
- `head(n)` is positional and safe when the table has fewer than `n` rows (it returns what exists).
- Equivalent: `employees.iloc[:3]`.

## Reusable pattern
`head(n)` / `tail(n)` for the first/last n rows.

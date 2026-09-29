# 2884. Modify Columns

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/modify-columns/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Double every value in the `salary` column, replacing the old values.

## Approach
Assign back to the same column name: `employees['salary'] = employees['salary'] * 2`.

## Pandas notes
- Assigning to an existing column replaces it and keeps its position.
- `employees['salary'] *= 2` does the same thing.

## Reusable pattern
Update a column in place with `df[col] = f(df[col])`.

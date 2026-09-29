# 2881. Create a New Column

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/create-a-new-column/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Append a new column `bonus` whose value is double each employee's salary.

## Approach
Assign a vectorised expression to a new column name: `employees['bonus'] = employees['salary'] * 2`. New columns are appended at the end, which gives the required order `name, salary, bonus`.

## Pandas notes
- Arithmetic on a Series is element-wise; no loop is needed.
- The integer dtype is preserved (`int64 * 2` stays `int64`).

## Reusable pattern
`df['new'] = expression_of_other_columns` to derive a column.

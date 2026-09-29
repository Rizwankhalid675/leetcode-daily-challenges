# 2880. Select Data

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/select-data/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Find the student whose id is 101 and return just their `name` and `age`.

## Approach
Build a boolean mask `students['student_id'] == 101` and use `.loc[mask, [cols]]` to filter rows and choose columns in one step.

## Pandas notes
- `.loc[row_selector, column_list]` filters rows and projects columns together.
- Passing a list of columns keeps the result a DataFrame (a single string would give a Series).
- Column order in the output follows the list: `name`, then `age`.

## Reusable pattern
`df.loc[condition, ['col1', 'col2']]` is the pandas version of `SELECT col1, col2 FROM df WHERE condition`.

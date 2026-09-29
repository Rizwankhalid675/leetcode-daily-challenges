# 2878. Get the Size of a DataFrame

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/get-the-size-of-a-dataframe/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Report how many rows and how many columns the table has, as a two-element list.

## Approach
`players.shape` already holds `(n_rows, n_cols)`. Convert the tuple to a list to match the return type.

## Pandas notes
- `df.shape` is an attribute, not a method (no parentheses).
- `len(df)` gives rows only; `len(df.columns)` gives columns only.

## Reusable pattern
Use `df.shape` for dimensions; wrap it in `list()` when an array is required.

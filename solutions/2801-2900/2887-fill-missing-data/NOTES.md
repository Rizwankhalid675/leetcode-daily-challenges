# 2887. Fill Missing Data

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/fill-missing-data/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Wherever `quantity` is missing, put 0 instead. Leave every other column alone.

## Approach
Take the `quantity` Series, call `fillna(0)` and assign it back to the column.

## Pandas notes
- Filling only the one column avoids touching nulls elsewhere (`products.fillna(0)` would fill every column).
- A column containing NaN is float-typed, so after filling the values may be `0.0` / `779.0`. The judge compares values, so this is accepted. Add `.astype(int)` if a strict integer dtype is ever needed.
- Prefer assignment over `fillna(..., inplace=True)` on a column selection, which newer pandas warns about (chained assignment).

## Reusable pattern
`df[col] = df[col].fillna(default)` for per-column defaults.

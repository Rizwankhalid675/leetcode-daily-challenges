# 2888. Reshape Data: Concatenate

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/reshape-data-concatenate/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Stack two tables that share the same columns: all rows of `df1`, then all rows of `df2`.

## Approach
`pd.concat([df1, df2], axis=0)` appends rows. `ignore_index=True` renumbers the index 0..n-1 so labels are not duplicated.

## Pandas notes
- `axis=0` (the default) stacks rows; `axis=1` would place the frames side by side.
- `DataFrame.append` was removed in pandas 2.0; `concat` replaces it.

## Reusable pattern
`pd.concat([...], ignore_index=True)` to union tables with the same schema.

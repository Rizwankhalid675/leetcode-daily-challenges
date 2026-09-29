# 2890. Reshape Data: Melt

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/reshape-data-melt/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Unpivot the wide quarterly report so that each row is one product in one quarter, with its sales.

## Approach
`pd.melt(report, id_vars=['product'], var_name='quarter', value_name='sales')`. Every non-id column is unpivoted: its header goes into `quarter` and its value into `sales`.

## Pandas notes
- `melt` outputs column by column (all rows for `quarter_1`, then `quarter_2`, ...), which is exactly the order in the example.
- `var_name` and `value_name` set the output column names; otherwise they default to `variable` / `value`.

## Reusable pattern
`melt` for wide to long; it is the inverse of `pivot`.

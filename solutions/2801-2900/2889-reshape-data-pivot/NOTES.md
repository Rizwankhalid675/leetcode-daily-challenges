# 2889. Reshape Data: Pivot

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/reshape-data-pivot/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Reshape long data (one row per city and month) into a wide grid: one row per month, one column per city, with temperatures in the cells.

## Approach
`pivot(index='month', columns='city', values='temperature')`. pandas sorts both the index and the new columns, which gives the alphabetical order in the example (April, February, ...; ElPaso, Jacksonville).

## Pandas notes
- `pivot` requires each (month, city) pair to be unique. Use `pivot_table` with an `aggfunc` when duplicates are possible.
- The result has `month` as its index. LeetCode's judge shows the index as the first column, which matches the expected output.

## Reusable pattern
`pivot(index, columns, values)` for long to wide.

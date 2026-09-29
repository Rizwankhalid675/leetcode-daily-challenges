# 2883. Drop Missing Data

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Language | Python 3 (pandas) |
| Link | https://leetcode.com/problems/drop-missing-data/ |
| Context | Study plan: Introduction to Pandas |

## What it asks (own words)
Remove every row whose `name` is missing.

## Approach
`dropna(subset=['name'])` drops rows where `name` is null (None or NaN), looking at no other column.

## Pandas notes
- `dropna()` with no arguments drops a row if any column is null. The task only concerns `name`, so `subset` keeps the rule exact.
- pandas treats both `None` and `NaN` as missing.

## Reusable pattern
`dropna(subset=[cols])` to filter out rows missing specific fields.

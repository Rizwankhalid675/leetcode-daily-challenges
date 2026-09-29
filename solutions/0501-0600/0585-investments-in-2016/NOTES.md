# 585. Investments in 2016

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/investments-in-2016/ |
| Context | Quest: Database / SQL Advanced Operation Center / SQL II |

## What it asks (own words)
Add up the 2016 investment values of the policyholders whose 2015 value matches at least one other policyholder's, but whose (lat, lon) location is shared by nobody else. Round to 2 decimals.

## Approach
Two window counts computed on the whole table in one pass:
- `COUNT(*) OVER (PARTITION BY tiv_2015)`: how many rows share this 2015 value (must be > 1);
- `COUNT(*) OVER (PARTITION BY lat, lon)`: how many rows share this location (must be exactly 1).

Filter on both in an outer query, then `ROUND(SUM(tiv_2016), 2)`.

## Why it works
The windows are computed **before** the outer filter, so both counts are relative to the full table. Filtering first (for example with a `WHERE` in the same query) would shrink the partitions and break the counts.

## Edge cases
- The location must be unique as a **pair**; two rows sharing just `lat` are fine.
- If no row qualifies, `SUM` returns NULL (one row with NULL), the same as the reference output.

## Reusable pattern
**"Value occurs more than once / exactly once" per row: `COUNT(*) OVER (PARTITION BY key)`** in a subquery, then filter outside.

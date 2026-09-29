# 1070. Product Sales Analysis III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/product-sales-analysis-iii/ |
| Context | Quest: Database / SQL Advanced Operation Center / SQL II |

## What it asks (own words)
For each product, find the earliest year it was sold and return **all** of its sales from that year.

## Approach
Attach the product's earliest year to every row with `MIN(year) OVER (PARTITION BY product_id)`, then keep rows whose own year equals it.

## Edge cases
- Several sales of the same product in its first year: all are returned (a plain `GROUP BY product_id` with `MIN(year)` would collapse them).
- Output columns are renamed: `year` becomes `first_year`.

## Reusable pattern
**"All rows at the group's minimum": `WHERE col = MIN(col) OVER (PARTITION BY g)`** (or `(g, col) IN (SELECT g, MIN(col) ... GROUP BY g)`).

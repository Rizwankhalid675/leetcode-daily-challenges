# 1251. Average Selling Price

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/average-selling-price/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each product, compute the average price per unit actually sold, weighting each sale by its units, rounded to 2 decimals. A product that sold nothing has average 0.

## Approach
- Join every price period to the sales of that product whose date falls inside the period (`BETWEEN start_date AND end_date`, both ends inclusive).
- Per product: revenue `SUM(price * units)` divided by `SUM(units)`.
- Start from `Prices` with a `LEFT JOIN` so products with no sales survive. Their sums are NULL, NULL / NULL is NULL, and `IFNULL` makes it 0.

## Why it works
Periods of one product never overlap, so each sale matches exactly one price row and nothing is double-counted. In MySQL `/` is exact decimal division, so there is no integer truncation.

## Edge cases
- Product with no sales: 0 (this is the classic trap; an inner join loses these products).
- Duplicate sale rows are separate sales and both count, since the join keeps both.
- Sales on a boundary date (start or end of a period) are included, because `BETWEEN` is inclusive.

## Reusable pattern
**Range join: `ON t.date BETWEEN r.start AND r.end`** attaches each event to the interval it falls in. **Weighted average = `SUM(w * x) / SUM(w)`**, not `AVG(x)`.

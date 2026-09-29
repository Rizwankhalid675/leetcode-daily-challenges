# 1327. List the Products Ordered in a Period

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/list-the-products-ordered-in-a-period/ |
| Context | Quest: Database / Filtering & Aggregation Operation Cabin / Assignment (quiz) |

## What it asks (own words)
Which products had at least 100 units ordered in total during February 2020, and what was that total?

## Approach
Keep only February 2020 orders in `WHERE`, join to get the name, group by product, and filter with `HAVING SUM(unit) >= 100`.

## Edge cases
- 2020 is a leap year, so February ends on the 29th.
- Duplicate order rows are real orders and must be summed (no DISTINCT).
- Group by `product_id` (not just the name) so two products could never merge; the `HAVING` repeats `SUM(o.unit)` instead of using the alias `unit`, which would clash with the column name.
- Exactly 100 qualifies.

## Reusable pattern
**Filter rows in `WHERE`, filter groups in `HAVING`.** Pushing the date filter into `WHERE` makes the sum cover only the target month.

# 1174. Immediate Food Delivery II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/immediate-food-delivery-ii/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Look only at each customer's earliest order. What percentage of those first orders asked for delivery on the same day they were placed? Round to 2 decimals.

## Approach
1. The subquery finds `(customer_id, first order date)` for every customer.
2. The row-value `IN` keeps exactly those orders.
3. `AVG(order_date = customer_pref_delivery_date) * 100` is the share of immediate ones.

## Why it works
The statement guarantees each customer has exactly one first order, so the filter yields one row per customer and the average is over customers.

## Edge cases
- A customer's later immediate orders do not count, only the first.
- Result 0.00 or 100.00 is possible.

## Reusable pattern
**"First/last row per group": filter with `(key, date) IN (SELECT key, MIN(date) ... GROUP BY key)`**, or use `ROW_NUMBER() OVER (PARTITION BY key ORDER BY date)`.

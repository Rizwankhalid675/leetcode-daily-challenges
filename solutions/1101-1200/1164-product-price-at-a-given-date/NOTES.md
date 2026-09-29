# 1164. Product Price at a Given Date

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/product-price-at-a-given-date/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Every product starts at price 10 and changes over time. What was each product's price on 2019-08-16?

## Approach
Split the products into two disjoint groups and `UNION ALL` them:
1. Products changed on or before the date: their price is `new_price` from the latest such change (row-value `IN` with `MAX(change_date)`).
2. Products whose earliest change is after the date: still the initial price 10.

## Why it works
A product either has a change on or before the date (group 1) or all its changes are later (group 2, `MIN(change_date) > date`). Exactly one holds, so each product appears once.

## Edge cases
- A change exactly on 2019-08-16 counts (`<=`), as with product 1 in the example.
- A product with only later changes gets 10.
- `(product_id, change_date)` is unique, so group 1 cannot produce duplicates.

## Reusable pattern
**"Value as of date D": latest row with `date <= D` per key, plus a default for keys with no such row.**

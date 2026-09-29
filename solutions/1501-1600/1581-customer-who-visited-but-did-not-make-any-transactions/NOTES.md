# 1581. Customer Who Visited but Did Not Make Any Transactions

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each customer, count the visits in which they bought nothing. Only customers with at least one such visit are listed.

## Approach
1. `LEFT JOIN` every visit to its transactions.
2. Keep only visits where the join found nothing (`t.transaction_id IS NULL`). This is the anti-join.
3. `GROUP BY customer_id` and `COUNT(*)`.

## Why it works
A visit with transactions produces one or more joined rows, all with a non-NULL `transaction_id`, so all of them are filtered out. A visit with no transactions produces exactly one row with NULLs on the right side, so the count is exactly the number of empty visits.

## Edge cases
- A visit with several transactions is removed entirely and is not over-counted.
- Customers whose visits all had purchases do not appear, which is what the problem wants.

## Reusable pattern
**Anti-join: `A LEFT JOIN B ... WHERE B.key IS NULL`** means "rows of A with no partner in B". `NOT EXISTS` is an equivalent way to write it.

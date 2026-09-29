# 586. Customer Placing the Largest Number of Orders

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/customer-placing-the-largest-number-of-orders/ |
| Context | Quest: Database / Filtering & Aggregation Operation Cabin / Filtering & Aggregation |

## What it asks (own words)
Which customer placed the most orders? There's guaranteed to be a single winner.

## Approach
`GROUP BY customer_number`, order the groups by `COUNT(*) DESC`, and `LIMIT 1`.

## Edge cases
- Ties can't happen by the problem's guarantee. For the follow-up (return every tied customer) use `HAVING COUNT(*) = (SELECT MAX(cnt) FROM (...counts...) t)` or `RANK() OVER (ORDER BY COUNT(*) DESC) = 1`.
- The table name is written `orders` to match the case in LeetCode's schema script.

## Reusable pattern
**Arg-max over groups: `GROUP BY ... ORDER BY agg DESC LIMIT 1`** when unique; switch to `RANK()` when ties must all be returned.

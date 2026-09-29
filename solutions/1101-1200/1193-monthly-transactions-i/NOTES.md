# 1193. Monthly Transactions I

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/monthly-transactions-i/ |
| Context | Quest: Database / Filtering & Aggregation Operation Cabin / Filtering & Aggregation |

## What it asks (own words)
For every month and country, report how many transactions there were and their total amount, plus the same two numbers restricted to approved transactions.

## Approach
Group by the `YYYY-MM` form of the date (`DATE_FORMAT(trans_date, '%Y-%m')`) and `country`. The "all" figures are `COUNT(*)` and `SUM(amount)`. The "approved" figures use conditional aggregation: `SUM(state = 'approved')` (a MySQL boolean is 0/1) and `SUM(CASE WHEN approved THEN amount ELSE 0 END)`.

## Edge cases
- A month/country with no approved transactions must show 0, not NULL. A CASE without ELSE yields NULL for non-approved rows, and SUM over only NULLs is NULL, so the `ELSE 0` matters. (`SUM(state = 'approved')` is always 0 or more, never NULL.)
- `country` can be NULL in the hidden tests; `GROUP BY` treats NULL as its own group, which is what's expected.

## Reusable pattern
**Conditional aggregation: `SUM(CASE WHEN cond THEN x ELSE 0 END)`** computes several filtered totals in one pass over one grouping.

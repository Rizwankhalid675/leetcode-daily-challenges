# 1321. Restaurant Growth

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/restaurant-growth/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For every day that has a full 7-day history (the day itself plus the 6 before), report the total paid over those 7 days and the daily average (total / 7, 2 decimals). Order by date.

## Approach
1. `daily`: several customers can visit on one day, so first sum to one row per date.
2. `windowed`: a sliding sum over the current row and the 6 before it, plus a row number.
3. Keep rows from the 7th day on, where the window is full, and divide by 7.

## Why it works
The statement guarantees at least one customer every day, so dates are consecutive and "the previous 6 rows" is exactly "the previous 6 days". A window starting before day 7 would hold fewer than 7 days, which is why `rn >= 7` filters them out. The divisor is always 7 days, not the number of customers.

## Edge cases
- Several customers on one day (2019-01-10 in the example) are summed together first.
- Fewer than 7 distinct days: empty result.
- Without the per-day guarantee, a `RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW` frame, or a self-join on `DATEDIFF BETWEEN 0 AND 6`, would be needed.

## Reusable pattern
**Moving window: aggregate to one row per period first, then `SUM(...) OVER (ORDER BY period ROWS BETWEEN n-1 PRECEDING AND CURRENT ROW)`**, and drop the incomplete leading windows.

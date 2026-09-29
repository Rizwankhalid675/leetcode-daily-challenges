# 197. Rising Temperature

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/rising-temperature/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Return the ids of the days that were warmer than the calendar day right before them.

## Approach
Self-join `Weather`: pair each row `w1` with the row `w2` exactly one day earlier, using `DATEDIFF(w1.recordDate, w2.recordDate) = 1`, then keep pairs where `w1` is warmer.

## Why it works
The comparison must be with **yesterday by date**, not with the previous row. Rows are not stored in date order, and dates can have gaps. If the day before is missing, the join finds no partner and the day is correctly skipped. Ordering by id and using `LAG` would compare with the previous *recorded* day, which is wrong when dates are missing.

## Edge cases
- Gaps in dates: no partner, so the row is not reported.
- Month and year boundaries (Jan 31 to Feb 1, Dec 31 to Jan 1): `DATEDIFF` handles them. Doing arithmetic on the numeric form of the date would not.
- Equal temperatures do not count (strictly higher).

## Reusable pattern
**"Compare with the previous calendar day": self-join on `DATEDIFF(a.d, b.d) = 1`** (or `b.d = DATE_SUB(a.d, INTERVAL 1 DAY)`), never on `id - 1`.

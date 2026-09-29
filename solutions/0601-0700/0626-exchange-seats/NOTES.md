# 626. Exchange Seats

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/exchange-seats/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Swap the students in seats 1 and 2, 3 and 4, and so on. If the count is odd, the last student stays put. Output ordered by seat id.

## Approach
Keep the ids and move the names:
- Even id: takes the previous student (`LAG`).
- Odd id that is the last row (`LEAD(id)` is NULL): keeps its own student.
- Any other odd id: takes the next student (`LEAD`).

## Why it works
Ids start at 1 and have no gaps, so the neighbour in id order is the swap partner. Testing `LEAD(id) IS NULL` rather than `LEAD(student) IS NULL` detects "last row" correctly even if a student name were NULL.

## Edge cases
- One student only: no change.
- Odd count: the last seat keeps its student. Even count: every pair swaps.

## Reusable pattern
**Neighbour access by position: `LAG`/`LEAD` over `ORDER BY id`.** The id-arithmetic alternative (`CASE WHEN id % 2 = 1 AND id <> max THEN id + 1 ...`) works too, but needs a subquery for the max.

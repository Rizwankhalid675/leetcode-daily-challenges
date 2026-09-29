# 550. Game Play Analysis IV

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/game-play-analysis-iv/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
What fraction of players logged in again on the day right after their very first login? Round to 2 decimals.

## Approach
1. Derived table `f`: each player's first login date.
2. Join back to `Activity` looking for a row exactly one day later (`DATEDIFF(...) = 1`). Each player matches at most once, because `(player_id, event_date)` is unique.
3. Divide the number of matches by the total number of distinct players.

## Why it works
Only the day after the **first** login counts. Two consecutive days later on do not qualify, which is why the first date is computed before looking for the next day.

## Edge cases
- Players with a single login contribute to the denominator only.
- Month and year boundaries are handled by `DATEDIFF`.
- If nobody qualifies, `COUNT` is 0 and the result is 0.00.

## Reusable pattern
**Day-1 retention: first date per user, then a self-join on `DATEDIFF = 1`, divided by the user count.**

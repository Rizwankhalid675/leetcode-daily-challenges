# 1204. Last Person to Fit in the Bus

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/last-person-to-fit-in-the-bus/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
People board one at a time in `turn` order until the next person would push the total past 1000 kg. Who is the last person to board?

## Approach
Compute the running total with `SUM(weight) OVER (ORDER BY turn)`, keep the rows whose running total is at most 1000, and take the one with the largest `turn`.

## Why it works
Weights are positive, so the running total only grows. The rows with total at most 1000 are therefore exactly a prefix of the queue: once someone does not fit, nobody after them is considered, even a light person such as Bob in the example. The last row of that prefix is the answer. `turn` values are unique, so the window has no ties.

## Edge cases
- A total of exactly 1000 still fits (`<=`).
- Everyone fits: the last person in the queue is returned.
- The first person always fits (guaranteed), so the result is never empty.

## Reusable pattern
**Running total: `SUM(x) OVER (ORDER BY k)`.** "Last row before the running total crosses a limit" means filter on `total <= limit`, then take the max of `k`.

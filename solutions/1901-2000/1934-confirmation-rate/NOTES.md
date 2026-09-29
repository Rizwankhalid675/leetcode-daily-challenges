# 1934. Confirmation Rate

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/confirmation-rate/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For every signed-up user, compute the share of their confirmation requests that were confirmed, rounded to 2 decimals, using 0 for users who never requested one.

## Approach
- `LEFT JOIN` from `Signups`, so every user is present.
- In MySQL a comparison is 1 or 0, so `AVG(c.action = 'confirmed')` is exactly "confirmed / total".
- A user with no requests has only one joined row, with NULL `action`. `AVG` ignores NULLs and returns NULL for that group, and `IFNULL(..., 0)` turns it into 0.

## Why it works
The comparison is NULL for the padding row of a user with no requests, so that row does not affect the average of users who do have requests (they have no padding row anyway).

## Edge cases
- No requests: rate 0.00 (the `IFNULL`).
- All timeouts: 0.00. All confirmed: 1.00.

## Reusable pattern
**Rate of a condition = `AVG(condition)`** in MySQL, because booleans are 0/1. Wrap it in `IFNULL(..., 0)` when the group can be empty after a `LEFT JOIN`.

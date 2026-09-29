# 1729. Find Followers Count

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/find-followers-count/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each user who appears in the table, count their followers, ordered by user id ascending.

## Approach
`GROUP BY user_id` and count. `(user_id, follower_id)` is unique, so there are no duplicate follow rows to worry about.

## Edge cases
- Users with no followers do not appear in `Followers`, so they are not listed (as the example shows).
- The required order is by `user_id`.

## Reusable pattern
**Per-key count with a sorted output: `GROUP BY k ORDER BY k`.**

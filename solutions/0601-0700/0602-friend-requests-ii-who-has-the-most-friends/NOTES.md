# 602. Friend Requests II: Who Has the Most Friends

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Friendship is mutual once a request is accepted. Find the person with the most friends and how many they have (there is a unique winner).

## Approach
Each row gives both people a friend, so stack both id columns into one column with `UNION ALL`, count each id's occurrences, and take the largest.

## Why it works
`UNION ALL` keeps every occurrence. Plain `UNION` would remove duplicates and make everyone's count 1. `(requester_id, accepter_id)` is unique, so each friendship is counted once per side.

## Edge cases
- A person who only sends, or only accepts, requests is still counted.
- Follow-up (ties): use `RANK() OVER (ORDER BY COUNT(*) DESC)` and keep rank 1, instead of `LIMIT 1`.

## Reusable pattern
**Undirected edges stored once: `UNION ALL` both endpoint columns, then `GROUP BY` to get each node's degree.**

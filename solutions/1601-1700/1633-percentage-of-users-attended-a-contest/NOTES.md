# 1633. Percentage of Users Attended a Contest

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/percentage-of-users-attended-a-contest/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each contest, what percentage of all users registered for it (2 decimals)? Sort by that percentage, highest first, breaking ties by contest id.

## Approach
Count the registrations per contest and divide by the total number of users, taken from a scalar subquery on `Users`. Multiply by 100 **before** dividing.

## Why it works
`(contest_id, user_id)` is unique, so `COUNT(*)` per contest is the number of distinct users. The denominator is all users, not all registered users. MySQL `/` gives a decimal, so there is no integer truncation.

## Edge cases
- Ties in percentage: broken by ascending `contest_id`.
- The percentage can be 100 exactly.

## Reusable pattern
**Share of a global total: divide a group count by a scalar subquery `(SELECT COUNT(*) FROM T)`.**

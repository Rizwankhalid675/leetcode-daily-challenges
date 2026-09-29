# 262. Trips and Users

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/trips-and-users/ |
| Context | Quest: Database / Window Functions & Ranking Analysis Room / Window Functions & Ranking |

## What it asks (own words)
For each day from 2013-10-01 to 2013-10-03, what fraction of trips were cancelled, counting only trips where neither the client nor the driver is banned? Round to 2 decimals and skip days with no such trips.

## Approach
- Two inner joins to `Users` (one for the client, one for the driver), each requiring `banned = 'No'`, drop every trip that involves a banned user.
- `status <> 'completed'` is 1 for either kind of cancellation and 0 otherwise, so its **average** per day is the cancellation rate.

## Why it works
AVG of a 0/1 flag = (number of 1s) / (number of rows), which is exactly cancelled / total. Days with no qualifying trip have no rows, so they don't appear, as required.

## Edge cases
- Both cancellation statuses count; only `completed` is a non-cancel.
- `request_at` is a varchar in `YYYY-MM-DD` form, so the string `BETWEEN` compares correctly.
- MySQL's AVG over integers returns an exact DECIMAL, so `ROUND(...,2)` rounds the same way as `ROUND(SUM/COUNT, 2)`.
- The output column name contains a space, hence the backticks.

## Reusable pattern
**Rate of a condition = `AVG(condition)`** (a boolean is 0/1 in MySQL). Filtering by attributes of two roles means joining the lookup table twice.

# 584. Find Customer Referee

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/find-customer-referee/ |
| Context | Quest: Database / SQL Basic Query Workstation / SQL I |

## What it asks (own words)
List customers who were not referred by customer 2, including those with no referrer at all.

## Approach
`referee_id <> 2` alone is not enough, because for NULL it evaluates to UNKNOWN and the row is filtered out. Add `OR referee_id IS NULL`.

## Why it works
SQL uses three-valued logic: any comparison with NULL is UNKNOWN, and `WHERE` only keeps TRUE. Will, Jane and Bill in the example have NULL referees and would be lost without the explicit NULL check.

## Edge cases
- Every customer referred by 2 is excluded; everyone else, NULL or not, stays.

## Reusable pattern
**"Not equal to X" on a nullable column: `col IS NULL OR col <> X`** (or `COALESCE(col, sentinel) <> X`).

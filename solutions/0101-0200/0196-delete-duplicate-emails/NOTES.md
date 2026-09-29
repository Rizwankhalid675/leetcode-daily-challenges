# 196. Delete Duplicate Emails

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/delete-duplicate-emails/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Change the `Person` table in place, removing duplicate emails so that only the row with the smallest id remains for each email. It must be a `DELETE`, not a `SELECT`.

## Approach
Compute the id to keep for each email (`MIN(id) GROUP BY email`) and delete every row whose id is not in that set.

## Why it works
MySQL refuses to delete from a table that the same statement also reads in a subquery (error 1093, "can't specify target table for update in FROM clause"). Wrapping the subquery in one more derived table (`AS keepers`) forces MySQL to materialise it into a temporary result first, which lifts the restriction. `keep_id` is never NULL (ids are a primary key), so `NOT IN` has no NULL trap.

## Edge cases
- No duplicates: nothing is deleted.
- Three or more copies of an email: all but the smallest id are deleted.
- Emails contain no uppercase letters (given), so case-insensitive comparison does not merge different emails.

## Reusable pattern
**Dedupe in place: delete where id is not the group's `MIN(id)`.** The MySQL-only alternative is the multi-table form `DELETE p1 FROM Person p1 JOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id`.

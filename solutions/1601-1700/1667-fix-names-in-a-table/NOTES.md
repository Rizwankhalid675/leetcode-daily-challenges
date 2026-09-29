# 1667. Fix Names in a Table

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/fix-names-in-a-table/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Normalise each name so the first letter is uppercase and the rest are lowercase, ordered by user id.

## Approach
`SUBSTRING(name, 1, 1)` is the first character and `SUBSTRING(name, 2)` is the rest. Upper-case the first, lower-case the rest, and join them with `CONCAT`.

## Edge cases
- A one-letter name: `SUBSTRING(name, 2)` is the empty string, so the result is just the upper-cased letter.
- The name is already in the right form: unchanged.
- MySQL `SUBSTRING` positions are 1-based.

## Reusable pattern
**Capitalise: `CONCAT(UPPER(LEFT(s, 1)), LOWER(SUBSTRING(s, 2)))`.**

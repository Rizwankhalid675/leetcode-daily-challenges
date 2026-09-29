# 620. Not Boring Movies

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/not-boring-movies/ |
| Context | Quest: Database / SQL Basic Query Workstation / SQL I |

## What it asks (own words)
Show the movies that have an odd id and aren't described as "boring", best-rated first.

## Approach
A plain `WHERE` with two conditions (`id % 2 = 1` and `description <> 'boring'`) plus `ORDER BY rating DESC`.

## Edge cases
- The table name is written as `cinema` to match the case in LeetCode's schema script (MySQL table names can be case-sensitive on Linux).
- MySQL's default collation compares strings case-insensitively, so a description of `Boring` is also excluded. The expected output is produced by MySQL too, so that's consistent.

## Reusable pattern
**Parity filter: `col % 2 = 1`** (or `MOD(col, 2) = 1`).

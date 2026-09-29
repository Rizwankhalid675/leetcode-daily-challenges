# 1378. Replace Employee ID With The Unique Identifier

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For every employee, show their unique id next to their name, or NULL if they do not have one.

## Approach
`Employees` must be kept in full, so it goes on the left of a `LEFT JOIN` on `id`.

## Edge cases
- Employees with no unique id: the join finds nothing, so `unique_id` comes back NULL.
- Column order in the output is `unique_id, name`.

## Reusable pattern
**"Show X for everyone, NULL when missing" means `everyone LEFT JOIN X`.**

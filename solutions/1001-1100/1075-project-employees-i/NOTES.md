# 1075. Project Employees I

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/project-employees-i/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For each project, give the average years of experience of the people working on it, rounded to 2 decimals.

## Approach
Join `Project` to `Employee` to pick up `experience_years`, then `GROUP BY project_id` and `ROUND(AVG(...), 2)`.

## Edge cases
- `experience_years` is guaranteed non-NULL, so `AVG` divides by the real headcount.
- An employee on several projects counts once in each project, which is correct.

## Reusable pattern
**Per-group average of an attribute stored in another table: join, then `GROUP BY` the group key.**

# 1731. The Number of Employees Which Report to Each Employee

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For every employee who has at least one direct report, show their id, name, how many people report to them, and those people's average age rounded to a whole number. Order by id.

## Approach
Self-join: `m` is the manager and `r` is each report (`r.reports_to = m.employee_id`). The inner join keeps only employees who have reports. Group by the manager and aggregate.

## Why it works
In MySQL `AVG` of an integer column returns an exact DECIMAL, and `ROUND` on a DECIMAL rounds halves away from zero, so 38.5 becomes 39 as the example requires. (With a DOUBLE, halves could be rounded to even instead.)

## Edge cases
- Employees who manage nobody are not listed.
- Only direct reports count, not the whole subtree (example 2: Michael has 2, not 5).
- A manager with a NULL `reports_to` is still listed, because that column plays no part in their manager role.

## Reusable pattern
**Hierarchy one level down: self-join `child.parent_id = parent.id` and group by the parent.**

# 570. Managers with at Least 5 Direct Reports

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/managers-with-at-least-5-direct-reports/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
Return the names of the employees who have five or more people reporting directly to them.

## Approach
1. Group employees by `managerId` and keep the groups with at least 5 rows. Those are the ids of busy managers.
2. Join the ids back to `Employee` to get their names.

## Why it works
Grouping by the manager's **id**, not by name, keeps two different managers who happen to share a name apart. The join also drops a `managerId` that has no matching employee row, so no NULL name is ever printed.

## Edge cases
- Exactly 5 reports qualifies (`>=`).
- `managerId` NULL (top of the hierarchy) is excluded from the grouping.
- Duplicate names: each qualifying manager is reported once, because the grouping is by id.

## Reusable pattern
**"Entities with at least k related rows": aggregate the child table with `GROUP BY fk HAVING COUNT(*) >= k`, then join back for attributes.**

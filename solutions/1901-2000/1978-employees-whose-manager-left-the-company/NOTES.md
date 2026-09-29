# 1978. Employees Whose Manager Left the Company

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/employees-whose-manager-left-the-company/ |
| Context | Quest: Database / SQL Basic Query Workstation / Assignment (quiz) |

## What it asks (own words)
Find the employees earning under 30000 whose manager has left, meaning their `manager_id` points at an id that's no longer in the table.

## Approach
Anti-join: keep a row only if **no** row in `Employees` has `employee_id = manager_id`. Rows without a manager at all (`manager_id` NULL) are excluded first, since they never had a manager to lose.

## Edge cases
- `manager_id` NULL: excluded explicitly (otherwise `NOT EXISTS` would be true for them).
- `NOT EXISTS` avoids the classic `NOT IN` pitfall where a NULL in the subquery makes the whole predicate UNKNOWN.
- Salary exactly 30000 is not included (strictly less).
- Output must be sorted by `employee_id`.

## Reusable pattern
**"References something that doesn't exist": `NOT EXISTS (SELECT 1 FROM T WHERE T.key = outer.fk)`.**

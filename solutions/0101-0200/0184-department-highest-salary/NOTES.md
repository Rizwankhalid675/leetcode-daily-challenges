# 184. Department Highest Salary

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/department-highest-salary/ |
| Context | Quest: Database / SQL Advanced Operation Center / SQL II |

## What it asks (own words)
For each department, list the employee(s) with the highest salary there, together with the department name.

## Approach
`MAX(salary) OVER (PARTITION BY departmentId)` puts the department's top salary on every row; keep rows where the salary equals it, then join `Department` for the name.

## Edge cases
- Ties: every employee matching the maximum is returned (Jim and Max in the example), which a `GROUP BY ... LIMIT 1` approach would miss.
- Departments without employees don't appear, which is the expected behaviour.

## Reusable pattern
**Top-per-group with ties: compare against `MAX(...) OVER (PARTITION BY group)`** (equivalent to `RANK() = 1`).

# 185. Department Top Three Salaries

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/department-top-three-salaries/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
In each department, list everyone whose salary is among the three highest **distinct** salary values of that department.

## Approach
Rank salaries inside each department with `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`, keep ranks at most 3, and join `Department` for the name.

## Why it works
`DENSE_RANK` gives equal salaries the same rank and leaves no gaps. So rank 3 is the third distinct salary, however many people share the top ones. `RANK` would leave gaps (85000, 85000 would push 70000 to rank 4), and `ROW_NUMBER` would split ties.

## Edge cases
- Ties at any level: everyone tied is included (Joe and Randy in the example).
- A department with fewer than 3 distinct salaries: all of its employees are listed.
- A department with no employees does not appear.

## Reusable pattern
**"Top N distinct values per group": `DENSE_RANK() OVER (PARTITION BY g ORDER BY v DESC) <= N`.** Choose `ROW_NUMBER` / `RANK` / `DENSE_RANK` according to how ties should count.

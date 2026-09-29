# 181. Employees Earning More Than Their Managers

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/employees-earning-more-than-their-managers/ |
| Context | Quest: Database / SQL Basic Query Workstation / SQL I |

## What it asks (own words)
Name every employee whose salary is strictly higher than their own manager's.

## Approach
Join `Employee` to itself: alias `e` is the worker, alias `m` is the row whose `id` equals `e.managerId`. Then just compare the two salaries.

## Edge cases
- Employees with no manager (`managerId` NULL) find no partner in the inner join, so they're correctly excluded.
- Equal salaries don't count (strict `>`).

## Reusable pattern
**Hierarchy stored as a parent-id column: self-join with two aliases** to put a row next to its parent.

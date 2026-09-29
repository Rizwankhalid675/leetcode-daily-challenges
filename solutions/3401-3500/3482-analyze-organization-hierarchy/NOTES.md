# 3482. Analyze Organization Hierarchy

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/analyze-organization-hierarchy/ |
| Context | Quest: Database / SQL Advanced Operation Center / Assignment (quiz) |

## What it asks (own words)
For every employee, report their depth in the org chart (CEO = 1), how many people are below them directly or indirectly, and the total salary of themselves plus everyone below them. Sort by level, then budget (high to low), then name.

## Approach
Build the **transitive closure** of the reporting tree with a recursive CTE:
- Anchor: every employee paired with themselves, `(e, e)`.
- Step: if `(a, d)` is in the closure, then `(a, x)` is too for every `x` whose manager is `d`.

Then the closure answers all three questions:
- **team_size** of `a` = rows with ancestor `a`, minus 1 (the self pair).
- **budget** of `a` = sum of the salaries of those descendants (the self pair includes `a`'s own salary).
- **level** of `e` = number of rows with descendant `e` = `e` plus all of `e`'s managers up the chain. The CEO has only the self pair, so level 1.

## Why it works
Starting a walk down the tree from every employee gives each (manager, report) pair exactly once, because each employee has one manager and so there is exactly one downward path between an ancestor and a descendant. That means the counts and sums over the closure are exact, with no double counting.

## Edge cases
- Employees with no reports (individual contributors) still appear, with `team_size = 0` and `budget` = their own salary.
- Budget ties within a level are broken by `employee_name` ascending (Ivy before Judy in the example).
- Level is derived by counting ancestors instead of walking down from the CEO, so it doesn't depend on there being a single row with `manager_id` NULL.
- The recursion runs once per level of the hierarchy, well under MySQL's default `cte_max_recursion_depth` of 1000 for any realistic org chart.

## Reusable pattern
**Tree aggregates in SQL: materialise the (ancestor, descendant) closure with `WITH RECURSIVE`, then `GROUP BY ancestor` for subtree totals and `GROUP BY descendant` for depth.**

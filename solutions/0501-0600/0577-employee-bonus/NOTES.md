# 577. Employee Bonus

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/employee-bonus/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
List each employee's name and bonus when the bonus is below 1000, including employees who got no bonus at all (shown as NULL).

## Approach
`LEFT JOIN` to keep employees without a bonus row, then filter with `b.bonus < 1000 OR b.bonus IS NULL`.

## Why it works
`NULL < 1000` is UNKNOWN, not TRUE, so the `IS NULL` branch is what keeps employees who have no bonus. Without it they would silently disappear.

## Edge cases
- Bonus exactly 1000 is excluded (strictly less).
- Putting the `< 1000` test in the `ON` clause instead of `WHERE` would be a bug: employees with big bonuses would stay in the result with a NULL bonus.

## Reusable pattern
**NULL never satisfies a comparison.** When "missing" should count as matching, add an explicit `OR col IS NULL` (or use `COALESCE`).

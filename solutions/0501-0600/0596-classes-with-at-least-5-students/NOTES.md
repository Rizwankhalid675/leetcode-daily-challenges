# 596. Classes With at Least 5 Students

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/classes-with-at-least-5-students/ |
| Context | Quest: Database / Filtering & Aggregation Operation Cabin / Filtering & Aggregation |

## What it asks (own words)
Which classes have five or more students enrolled?

## Approach
Group by `class` and filter the groups with `HAVING COUNT(DISTINCT student) >= 5`.

## Edge cases
- `(student, class)` is unique, so `COUNT(*)` would also work; `DISTINCT` keeps it correct even if duplicate rows appeared.
- Exactly 5 counts (`>=`).

## Reusable pattern
**Filter on an aggregate with `HAVING`, not `WHERE`.** `WHERE` runs before grouping and can't see `COUNT`.

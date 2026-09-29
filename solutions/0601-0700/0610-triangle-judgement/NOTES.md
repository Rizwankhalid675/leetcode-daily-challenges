# 610. Triangle Judgement

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | database |
| Language | MySQL |
| Link | https://leetcode.com/problems/triangle-judgement/ |
| Context | Study plan: SQL 50 |

## What it asks (own words)
For every row of three lengths, say 'Yes' if they can be the sides of a triangle and 'No' otherwise.

## Approach
Use the triangle inequality: all three pairwise sums must be strictly greater than the remaining side. A `CASE` expression produces the label.

## Edge cases
- Degenerate case (e.g. 1, 2, 3, where a sum equals the third side) is 'No', because the inequality is strict.
- Zero lengths give 'No'.

## Reusable pattern
**Derived label column: `CASE WHEN cond THEN 'A' ELSE 'B' END AS label`.**

# 1232. Check If It Is a Straight Line

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math, geometry |
| Link | https://leetcode.com/problems/check-if-it-is-a-straight-line/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Do all the given (distinct) points lie on one straight line?

## Approach
Use the first two points to define a direction `(dx, dy)`. A point lies on the line exactly when the cross product `dx·(y − y0) − dy·(x − x0)` is zero. This avoids slopes, so vertical lines and division by zero are no issue.

## Edge cases
- Exactly two points → always true.
- Vertical and horizontal lines.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Hand cases for vertical/horizontal/two points; random collinear point sets (all true) and the same sets with one point nudged off the line (false). Coordinates ≤ 10⁴ keep products far below 2⁵³.

## Reusable pattern
**Cross product for collinearity / orientation** instead of comparing slopes.

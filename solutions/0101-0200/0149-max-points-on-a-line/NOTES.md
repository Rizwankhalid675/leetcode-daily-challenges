# 149. Max Points on a Line

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, math, geometry, euclidean-algorithm, greatest-common-divisor |
| Link | https://leetcode.com/problems/max-points-on-a-line/ |
| Context | Quest: Maths / Geometric Configuration Mecha Workshop / Geometry |

## What it asks (own words)
Given distinct points, find the largest number that lie on one straight line.

## Approach
Fix an anchor i. Every other point j defines a direction (dx, dy); points on the same line through i share the same direction up to scaling and sign. Reduce by gcd and make the sign canonical (dx > 0, or dx = 0 and dy > 0), then count equal directions in a Map. Only points after i are needed, because a line's first point in the list will be the anchor that sees all the others.

## Why it works
Two vectors are parallel exactly when their gcd-reduced, sign-normalised forms match. Everything stays integer, so there is none of the rounding trouble a floating slope (dy/dx) has with nearly equal slopes, and vertical lines need no special case.

## Edge cases
- 1 or 2 points: answer is the point count.
- Vertical and horizontal lines (gcd(0, d) = d gives (0, 1) and (1, 0)).
- The numeric key dx·100000 + dy is collision-free because |dy| ≤ 20000.

## Complexity
- Time: O(n² log C), C = coordinate range (gcd)
- Space: O(n)

## Testing note
Compared with an O(n³) cross-product brute force on random dense point sets (many collinear triples), plus near-equal-slope cases and a 300-point timing check.

## Reusable pattern
**Exact direction keys**: normalise (dx, dy) by gcd and sign instead of dividing.

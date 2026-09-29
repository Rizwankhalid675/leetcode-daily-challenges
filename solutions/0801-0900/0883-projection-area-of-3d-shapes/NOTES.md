# 883. Projection Area of 3D Shapes

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math, geometry, matrix |
| Link | https://leetcode.com/problems/projection-area-of-3d-shapes/ |
| Context | Quest: Maths / Geometric Configuration Mecha Workshop / Geometry |

## What it asks (own words)
Towers of unit cubes stand on an n×n grid. Add up the areas of the shadows seen from above, from the front and from the side.

## Approach
- From above, every cell with at least one cube shows one unit square.
- Looking along a row, each column of the shadow is as tall as the tallest tower in that line, so the view contributes the row maximum; the perpendicular view contributes each column maximum.

## Complexity
- Time: O(n²)
- Space: O(1)

## Testing note
Compared with a brute force that projects every individual cube onto the three planes and counts distinct squares.

## Reusable pattern
**A projection keeps only the maximum along the viewing direction.**
